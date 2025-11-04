import Link from 'next/link';

export function CTA() {
  return (
    <section className="bg-gradient-hero relative overflow-hidden py-24 sm:py-32 md:py-40">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
        <span
          className="animate-float absolute left-1/2 top-1/2 block size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[140px]"
          style={{ background: 'color-mix(in srgb, var(--color-primary) 45%, var(--color-secondary) 55%)' }}
        />
        <span
          className="animate-float absolute left-1/4 top-1/4 block size-64 rounded-full opacity-30 blur-[100px] [animation-delay:1.5s]"
          style={{ background: 'color-mix(in srgb, var(--color-secondary) 60%, white 40%)' }}
        />
        <span
          className="animate-float absolute bottom-1/4 right-1/4 block size-80 rounded-full opacity-30 blur-[100px] [animation-delay:3s]"
          style={{ background: 'color-mix(in srgb, var(--color-primary) 60%, white 40%)' }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="animate-fade-in-down mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur-md">
            <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span>Start building in minutes</span>
          </div>

          {/* Headline */}
          <h2 className="text-hero-foreground animate-fade-in-up mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl [animation-delay:100ms]">
            Ready to Build Something
            {' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-white via-white to-white blur-2xl opacity-40" aria-hidden="true" />
              <span className="relative bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text text-transparent">
                Amazing?
              </span>
            </span>
          </h2>

          {/* Subheadline */}
          <p className="text-hero-foreground/85 animate-fade-in-up mx-auto mb-12 max-w-2xl text-lg leading-relaxed sm:text-xl md:text-2xl [animation-delay:200ms]">
            Join thousands of developers who are building faster with our
            production-ready boilerplate. Start your next project today - completely free.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row [animation-delay:300ms]">
            <Link
              href="/sign-up/"
              className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-white px-10 py-5 text-base font-bold text-gray-900 shadow-glow-primary transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] sm:w-auto"
            >
              <div className="absolute inset-0 bg-shimmer opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
              <span className="relative">Start Building Now</span>
              <svg
                className="relative size-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="https://github.com/ixartz/Next-js-Boilerplate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-hero-foreground group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border border-white/30 bg-white/5 px-10 py-5 text-base font-bold backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-white/50 hover:bg-white/10 sm:w-auto"
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
              <span>View on GitHub</span>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="text-hero-foreground/75 animate-fade-in-up flex flex-wrap items-center justify-center gap-8 text-sm font-medium [animation-delay:400ms]">
            <div className="group flex items-center gap-2.5 transition-all duration-300 hover:scale-110">
              <div className="flex size-6 items-center justify-center rounded-full bg-white/20">
                <svg
                  className="size-4 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span>No credit card required</span>
            </div>
            <div className="group flex items-center gap-2.5 transition-all duration-300 hover:scale-110">
              <div className="flex size-6 items-center justify-center rounded-full bg-white/20">
                <svg
                  className="size-4 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span>Open source & MIT license</span>
            </div>
            <div className="group flex items-center gap-2.5 transition-all duration-300 hover:scale-110">
              <div className="flex size-6 items-center justify-center rounded-full bg-white/20">
                <svg
                  className="size-4 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span>Production ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
