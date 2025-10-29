import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { CredentialsSignInForm } from '@/components/auth/CredentialsSignInForm';
import { AuthSignInButton } from '@/components/AuthButtons';
import { GitHubIcon, GoogleIcon } from '@/components/icons/BrandIcons';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';

type ISignInPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ISignInPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'SignIn',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function SignInPage(props: ISignInPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const session = await auth();

  if (session) {
    redirect(getI18nPath('/dashboard/', locale));
  }

  const t = await getTranslations({
    locale,
    namespace: 'SignIn',
  });
  const dashboardPath = getI18nPath('/dashboard/', locale);
  const dashboardUrl = `${getBaseUrl()}${dashboardPath}`;
  const credentialsLabels = {
    heading: t('credentials_heading'),
    helper: t('credentials_helper'),
    email: t('email_label'),
    password: t('password_label'),
    submit: t('credentials_submit'),
    error: t('credentials_error'),
  };

  return (
    <div className="theme-hero">
      <div className="theme-hero__glow">
        <span className="theme-hero__orb theme-hero__orb--primary" />
        <span className="theme-hero__orb theme-hero__orb--secondary" />
        <span className="theme-hero__orb theme-hero__orb--accent" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 md:flex-row md:items-start md:justify-between">
        <div className="flex w-full max-w-xl flex-col items-center text-center text-white md:items-start md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold tracking-widest text-white/80 uppercase ring-1 ring-white/20">
            {t('badge_title')}
          </span>
          <h1 className="mt-6 text-4xl leading-tight font-semibold md:text-5xl">
            {t('hero_heading')}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
            {t('hero_subheading')}
          </p>

          <div className="mt-8 flex w-full flex-col gap-4">
            <AuthSignInButton
              className="btn btn-primary w-full"
              callbackUrl={dashboardUrl}
            >
              <GitHubIcon className="text-[var(--color-primary-foreground)]" />
              {t('cta_github')}
            </AuthSignInButton>
            <AuthSignInButton
              className="btn btn-outline w-full"
              provider="google"
              callbackUrl={dashboardUrl}
            >
              <GoogleIcon />
              {t('cta_google')}
            </AuthSignInButton>
          </div>

          <p className="mt-6 text-sm text-white/60">
            {t('helper')}
          </p>
        </div>

        <div className="w-full md:w-[420px]">
          <CredentialsSignInForm
            redirectPath={dashboardPath}
            labels={credentialsLabels}
          />
        </div>
      </div>
    </div>
  );
};
