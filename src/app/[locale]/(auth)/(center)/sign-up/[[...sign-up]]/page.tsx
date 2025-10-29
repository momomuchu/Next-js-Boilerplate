import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { AuthSignInButton } from '@/components/AuthButtons';
import { getI18nPath } from '@/utils/Helpers';

type ISignUpPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ISignUpPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'SignUp',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function SignUpPage(props: ISignUpPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const session = await auth();

  if (session) {
    redirect(getI18nPath('/dashboard/', locale));
  }

  const t = await getTranslations({
    locale,
    namespace: 'SignUp',
  });
  const callbackUrl = getI18nPath('/dashboard/', locale);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-3xl font-semibold">{t('meta_title')}</h1>
      <p className="text-gray-600">{t('meta_description')}</p>
      <AuthSignInButton
        className="rounded bg-gray-900 px-6 py-2 font-medium text-white transition hover:bg-gray-700"
        callbackUrl={callbackUrl}
      >
        {t('cta_github')}
      </AuthSignInButton>
      <AuthSignInButton
        className="rounded border border-gray-300 px-6 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
        provider="google"
        callbackUrl={callbackUrl}
      >
        {t('cta_google')}
      </AuthSignInButton>
      <p className="text-sm text-gray-500">
        {t('helper')}
      </p>
    </div>
  );
};
