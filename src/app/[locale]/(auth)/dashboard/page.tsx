import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Hello } from '@/components/Hello';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Dashboard',
  });

  return {
    title: t('meta_title'),
  };
}

export default function Dashboard() {
  return (
    <main className="relative min-h-screen bg-bg-primary px-6 py-12 text-text-primary transition-colors sm:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="absolute right-[-12rem] top-[-6rem] hidden size-[28rem] rounded-full bg-[var(--color-primary)] opacity-20 blur-[120px] lg:inline" />
        <span className="absolute bottom-[-10rem] left-[-8rem] hidden size-[24rem] rounded-full bg-[var(--color-secondary)] opacity-15 blur-[140px] md:inline" />
      </div>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
            Dashboard
          </p>
          <Hello />
        </header>
      </section>
    </main>
  );
}
