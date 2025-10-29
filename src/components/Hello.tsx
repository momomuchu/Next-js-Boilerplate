import { getTranslations } from 'next-intl/server';
import { auth } from '@/auth';
import { Sponsors } from './Sponsors';

export const Hello = async () => {
  const t = await getTranslations('Dashboard');
  const session = await auth();
  const email = session?.user?.email ?? '';

  return (
    <>
      <p>
        {`👋 `}
        {t('hello_message', { email })}
      </p>
      <p>
        {t.rich('alternative_message', {
          url: () => (
            <a
              className="text-blue-700 hover:border-b-2 hover:border-blue-700"
              href="https://nextjs-boilerplate.com/pro-saas-starter-kit"
            >
              Next.js Boilerplate SaaS
            </a>
          ),
        })}
      </p>
      <Sponsors />
    </>
  );
};
