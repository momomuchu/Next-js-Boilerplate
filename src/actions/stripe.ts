'use server';

import Stripe from 'stripe';
import { headers } from 'next/headers';
import { z } from 'zod';
import { Env } from '@/libs/Env';
import { logger } from '@/libs/Logger';
import {
  checkoutSessionSchema,
  createCheckoutSession,
  type CheckoutSessionInput,
} from '@/libs/StripeCheckout';

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

const deriveBaseUrl = async () => {
  if (Env.NEXT_PUBLIC_APP_URL) {
    return Env.NEXT_PUBLIC_APP_URL;
  }

  const headersList = await headers();
  const protocol = headersList.get('x-forwarded-proto') ?? 'http';
  const host = headersList.get('host') ?? 'localhost:3000';

  return `${protocol}://${host}`;
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
