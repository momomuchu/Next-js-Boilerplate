import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { AuthSignOutButton } from '@/components/AuthButtons';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { BaseTemplate } from '@/templates/BaseTemplate';
import { getI18nPath } from '@/utils/Helpers';

export default async function DashboardLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const session = await auth();

  if (!session) {
    redirect(getI18nPath('/sign-in', locale));
  }
  const t = await getTranslations({
    locale,
    namespace: 'DashboardLayout',
  });
  const dashboardUrl = getI18nPath('/dashboard/', locale);
  const profileUrl = getI18nPath('/dashboard/user-profile/', locale);
  const afterSignOutUrl = getI18nPath('/', locale);

  return (
    <BaseTemplate
      leftNav={(
        <>
          <li>
            <Link
              href={dashboardUrl}
              className="border-none text-gray-700 hover:text-gray-900"
            >
              {t('dashboard_link')}
            </Link>
          </li>
          <li>
            <Link
              href={profileUrl}
              className="border-none text-gray-700 hover:text-gray-900"
            >
              {t('user_profile_link')}
            </Link>
          </li>
        </>
      )}
      rightNav={(
        <>
          <li>
            <AuthSignOutButton
              className="border-none text-gray-700 hover:text-gray-900"
              callbackUrl={afterSignOutUrl}
            >
              {t('sign_out')}
            </AuthSignOutButton>
          </li>

          <li>
            <LocaleSwitcher />
          </li>
        </>
      )}
    >
      {props.children}
    </BaseTemplate>
  );
}
