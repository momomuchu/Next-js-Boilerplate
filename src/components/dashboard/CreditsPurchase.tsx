'use client';

import { useMemo, useState, useTransition } from 'react';
import type { CreditPackageId } from '@/config/credits';
import { creditPackageCatalog } from '@/config/credits';
import { createCreditsCheckoutSession } from '@/actions/stripe';
import { useTranslations } from 'next-intl';

type PurchaseState = 'idle' | 'processing' | 'error';

export function CreditsPurchase() {
  const t = useTranslations('DashboardPayments');
  const [purchaseState, setPurchaseState] = useState<PurchaseState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const packages = useMemo(() => {
    const packageOrder: CreditPackageId[] = ['starter', 'builder', 'scale'];

    return packageOrder.map((id) => {
      const pkg = creditPackageCatalog[id];
      const formatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: pkg.currency.toUpperCase(),
        minimumFractionDigits: 2,
      });
      const formatted = formatter.format(pkg.amount / 100);

      return {
        id,
        price: formatted,
        credits: pkg.credits,
      };
    });
  }, []);

  const handlePurchase = (packageId: CreditPackageId) => {
    setPurchaseState('processing');
    setErrorMessage(null);

    startTransition(async () => {
      const result = await createCreditsCheckoutSession(packageId);

      if (result.success && result.url) {
        window.location.href = result.url;

        return;
      }

      setPurchaseState('error');

      if (!result.success) {
        switch (result.code) {
          case 'UNAUTHENTICATED':
            setErrorMessage(t('error_unauthenticated'));
            break;
          case 'VALIDATION_ERROR':
            setErrorMessage(t('error_validation'));
            break;
          case 'STRIPE_ERROR':
            setErrorMessage(t('error_stripe'));
            break;
          default:
            setErrorMessage(t('generic_error'));
        }
      } else {
        setErrorMessage(t('generic_error'));
      }
    });
  };

  return (
    <div className="flex h-full flex-col gap-6 rounded-3xl border border-surface-border bg-surface-card p-6 text-text-on-surface shadow-elevated transition-colors">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-text-muted-on-surface">
          {t('label')}
        </p>
        <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
          {t('title')}
        </h2>
        <p className="text-sm text-text-muted-on-surface sm:text-base">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid gap-3">
        {packages.map(pkg => (
          <button
            key={pkg.id}
            type="button"
            onClick={() => handlePurchase(pkg.id)}
            disabled={isPending}
            className="group flex items-center justify-between rounded-2xl border border-surface-border bg-bg-secondary/60 px-4 py-3 text-left text-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-900/40"
          >
            <span className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-text-on-surface sm:text-base">
                {t(`packages.${pkg.id}.name`)}
              </span>
              <span className="text-xs text-text-muted-on-surface sm:text-sm">
                {t('credits_included', { credits: pkg.credits })}
              </span>
            </span>
            <span className="flex items-center gap-2 text-sm font-semibold tracking-tight text-primary sm:text-base">
              {pkg.price}
              <svg
                className="size-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-xs text-primary sm:text-sm">
        {t('note')}
      </div>

      {purchaseState === 'error' && errorMessage && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs text-red-400">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
