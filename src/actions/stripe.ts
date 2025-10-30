'use server';

import Stripe from 'stripe';
import { headers } from 'next/headers';
import { z } from 'zod';
import { auth } from '@/auth';
import { Env } from '@/libs/Env';
import { logger } from '@/libs/Logger';
import { db } from '@/libs/DB';
import {
  checkoutSessionSchema,
  createCheckoutSession,
  type CheckoutSessionInput,
} from '@/libs/StripeCheckout';
import { payments } from '@/models/Schema';

export type CreateCheckoutSessionResult
  = | {
    success: true;
    sessionId: string;
    url: string | null;
  }
  | {
    success: false;
    code: 'VALIDATION_ERROR' | 'STRIPE_ERROR' | 'UNKNOWN_ERROR';
    message: string;
    issues?: z.ZodIssue[];
  };

const oneTimeCheckoutSchema = z.object({
  amount: z.number().int().positive(),
  currency: z.string().min(1).default('usd'),
  productName: z.string().min(1),
  productDescription: z.string().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  allowPromotionCodes: z.boolean().optional(),
  successPath: z.string().optional(),
  cancelPath: z.string().optional(),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

export type CreateOneTimeCheckoutSessionInput = z.infer<typeof oneTimeCheckoutSchema>;

export type CreateOneTimeCheckoutSessionResult
  = | {
    success: true;
    sessionId: string;
    url: string | null;
  }
  | {
    success: false;
    code: 'UNAUTHENTICATED' | 'VALIDATION_ERROR' | 'STRIPE_ERROR' | 'UNKNOWN_ERROR';
    message: string;
    issues?: z.ZodIssue[];
  };

const deriveBaseUrl = async () => {
  if (Env.NEXT_PUBLIC_APP_URL) {
    return Env.NEXT_PUBLIC_APP_URL;
  }

  const headersList = await headers();
  const protocol = headersList.get('x-forwarded-proto') ?? 'http';
  const host = headersList.get('host') ?? 'localhost:3000';

  return `${protocol}://${host}`;
};

export const createOneTimeCheckoutSession = async (
  input: CreateOneTimeCheckoutSessionInput,
): Promise<CreateOneTimeCheckoutSessionResult> => {
  const parsed = oneTimeCheckoutSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      code: 'VALIDATION_ERROR',
      message: 'Validation failed.',
      issues: parsed.error.issues,
    };
  }

  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      code: 'UNAUTHENTICATED',
      message: 'You must be signed in to start a payment.',
    };
  }

  try {
    const baseUrl = await deriveBaseUrl();
    const stripeSession = await createCheckoutSession({
      mode: 'payment',
      lineItems: [
        {
          priceData: {
            currency: parsed.data.currency,
            unitAmount: parsed.data.amount,
            productName: parsed.data.productName,
            productDescription: parsed.data.productDescription,
          },
          quantity: 1,
        },
      ],
      metadata: parsed.data.metadata,
      allowPromotionCodes: parsed.data.allowPromotionCodes,
      successUrl: parsed.data.successUrl,
      cancelUrl: parsed.data.cancelUrl,
    }, {
      baseUrl,
      successPath: parsed.data.successPath,
      cancelPath: parsed.data.cancelPath,
    });

    const paymentIntentId = typeof stripeSession.payment_intent === 'string'
      ? stripeSession.payment_intent
      : stripeSession.payment_intent?.id ?? null;

    await db.insert(payments).values({
      userId: session.user.id,
      stripeSessionId: stripeSession.id,
      stripePaymentIntentId: paymentIntentId,
      amount: parsed.data.amount,
      currency: parsed.data.currency.toLowerCase(),
      status: 'pending',
      productName: parsed.data.productName,
      metadata: parsed.data.metadata ?? null,
    });

    return {
      success: true,
      sessionId: stripeSession.id,
      url: stripeSession.url,
    };
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      logger.error('Stripe one-time checkout session creation failed', {
        requestId: error.requestId,
        type: error.type,
        code: error.code,
        message: error.message,
      });

      return {
        success: false,
        code: 'STRIPE_ERROR',
        message: 'Unable to create checkout session.',
      };
    }

    logger.error('Unexpected error in createOneTimeCheckoutSession', { error });

    return {
      success: false,
      code: 'UNKNOWN_ERROR',
      message: 'Unexpected error while creating checkout session.',
    };
  }
};

export const createStripeCheckoutSession = async (input: CheckoutSessionInput): Promise<CreateCheckoutSessionResult> => {
  const parsed = checkoutSessionSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      code: 'VALIDATION_ERROR',
      message: 'Validation failed.',
      issues: parsed.error.issues,
    };
  }

  try {
    const baseUrl = await deriveBaseUrl();
    const session = await createCheckoutSession(parsed.data, { baseUrl });

    return {
      success: true,
      sessionId: session.id,
      url: session.url,
    };
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      logger.error('Stripe checkout session creation failed inside server action', {
        requestId: error.requestId,
        type: error.type,
        code: error.code,
        message: error.message,
      });

      return {
        success: false,
        code: 'STRIPE_ERROR',
        message: 'Unable to create checkout session.',
      };
    }

    logger.error('Unexpected error in createStripeCheckoutSession server action', { error });

    return {
      success: false,
      code: 'UNKNOWN_ERROR',
      message: 'Unexpected error while creating checkout session.',
    };
  }
};
