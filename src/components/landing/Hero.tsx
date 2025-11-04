import Link from 'next/link';

export function Hero() {
  return (
    <section className="bg-gradient-hero relative overflow-hidden py-20 sm:py-28 md:py-32 lg:py-40">
      {/* Animated background gradient mesh */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        <span className="animate-float absolute -top-32 left-1/2 block size-96 -translate-x-1/2 rounded-full opacity-40 blur-[140px] animate-pulse-slow" style={{ background: 'color-mix(in srgb, var(--color-primary) 45%, white 55%)' }} />
        <span className="animate-float absolute -bottom-24 left-[30%] block size-64 rounded-full opacity-40 blur-[120px] [animation-delay:1s]" style={{ background: 'color-mix(in srgb, var(--color-secondary) 50%, white 50%)' }} />
        <span className="animate-float absolute top-[20%] right-[-3rem] block size-72 rounded-full opacity-30 blur-[130px] [animation-delay:2s]" style={{ background: 'color-mix(in srgb, var(--color-secondary) 30%, rgba(56, 189, 248, 0.75) 70%)' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" aria-hidden="true" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge with shimmer effect */}
          <div className="animate-fade-in-down group border-surface-border bg-surface-card/60 relative mb-8 inline-flex items-center gap-2.5 overflow-hidden rounded-full border px-5 py-2.5 text-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-glow-primary">
            <div className="absolute inset-0 bg-shimmer opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative flex size-2">
              <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-75" />
              <span className="bg-primary animate-glow relative inline-flex size-2 rounded-full" />
            </span>
            <span className="text-text-on-surface relative font-medium">
              🚀 Now available - Next.js 16
            </span>
          </div>

          {/* Headline with gradient and animation */}
          <h1 className="text-hero-foreground animate-fade-in-up mb-6 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl [animation-delay:100ms]">
            Build Modern Web Apps
            {' '}
            <span className="from-primary via-primary-soft to-secondary animate-glow relative inline-block bg-gradient-to-r bg-clip-text text-transparent">
              <span className="absolute inset-0 blur-2xl opacity-50 bg-gradient-to-r from-primary via-primary-soft to-secondary" aria-hidden="true" />
              <span className="relative">Lightning Fast</span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-hero-foreground/85 animate-fade-in-up mx-auto mb-12 max-w-2xl text-lg leading-relaxed sm:text-xl md:text-2xl [animation-delay:200ms]">
            A production-ready Next.js boilerplate with TypeScript, Tailwind CSS,
            authentication, database, testing, and deployment - all configured
            and ready to go.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up flex flex-col items-center justify-center gap-4 sm:flex-row [animation-delay:300ms]">
            <Link
              href="/sign-up/"
              className="bg-primary text-primary-foreground shadow-glow-primary hover:shadow-glow-primary hover:bg-primary-strong group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-1 sm:w-auto"
            >
              <div className="absolute inset-0 bg-shimmer opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
              <span className="relative">Get Started Free</span>
              <svg
                className="size-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="https://github.com/ixartz/Next-js-Boilerplate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-hero-foreground hover:shadow-soft group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl border border-white/30 bg-white/5 px-8 py-4 text-base font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-white/50 hover:bg-white/10 sm:w-auto"
            >
              <svg
                className="size-5 transition-transform duration-300 group-hover:rotate-12"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="relative">View on GitHub</span>
            </Link>
          </div>

          {/* Social proof with animations */}
          <div className="text-hero-foreground/70 animate-fade-in-up mt-16 flex flex-wrap items-center justify-center gap-8 text-sm font-medium [animation-delay:400ms]">
            <div className="group flex items-center gap-2.5 transition-all duration-300 hover:scale-110">
              <svg
                className="text-secondary size-5 transition-transform duration-300 group-hover:rotate-12"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>14.5k+ GitHub Stars</span>
            </div>
            <div className="group flex items-center gap-2.5 transition-all duration-300 hover:scale-110">
              <svg
                className="text-primary size-5 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span>100k+ Developers</span>
            </div>
            <div className="group flex items-center gap-2.5 transition-all duration-300 hover:scale-110">
              <svg
                className="text-secondary-soft size-5 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Production Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
