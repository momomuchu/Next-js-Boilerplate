export function Features() {
  const features = [
    {
      icon: (
        <svg
          className="size-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: 'Lightning Fast',
      description:
        'Built on Next.js 16 with App Router for optimal performance and instant page transitions.',
      color: 'primary',
    },
    {
      icon: (
        <svg
          className="size-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: 'Authentication Ready',
      description:
        'Pre-configured Auth.js with GitHub, Google, and email/password authentication flows.',
      color: 'secondary',
    },
    {
      icon: (
        <svg
          className="size-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
      title: 'Database Included',
      description:
        'DrizzleORM with PGlite for local development. Zero Docker configuration needed.',
      color: 'primary',
    },
    {
      icon: (
        <svg
          className="size-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
      title: 'Beautiful UI',
      description:
        'Tailwind CSS 4 with custom theming system. Modern, responsive, and accessible components.',
      color: 'secondary',
    },
    {
      icon: (
        <svg
          className="size-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: 'Security First',
      description:
        'Arcjet integration for bot detection, rate limiting, and attack protection out of the box.',
      color: 'primary',
    },
    {
      icon: (
        <svg
          className="size-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
          />
        </svg>
      ),
      title: 'Testing Suite',
      description:
        'Vitest, React Testing Library, and Playwright configured for unit and E2E testing.',
      color: 'secondary',
    },
    {
      icon: (
        <svg
          className="size-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
          />
        </svg>
      ),
      title: 'i18n Support',
      description:
        'Multi-language support with next-intl. Easily localize your app for global audiences.',
      color: 'primary',
    },
    {
      icon: (
        <svg
          className="size-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: 'Monitoring & Analytics',
      description:
        'Sentry error tracking, PostHog analytics, and Better Stack logging integrated.',
      color: 'secondary',
    },
    {
      icon: (
        <svg
          className="size-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      title: 'Type Safe',
      description:
        'Full TypeScript support with strict mode. Catch errors before they reach production.',
      color: 'primary',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 top-0 size-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-32 bottom-0 size-96 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section header */}
        <div className="animate-fade-in-up mb-20 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Features
          </span>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Everything You Need to
            {' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Build & Scale
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
            A complete toolkit with best practices built-in. Start building
            instead of configuring.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="animate-fade-in-up group relative rounded-3xl border border-gray-200 bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-elevated"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Gradient glow effect on hover */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-${feature.color}/5 to-${feature.color}/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              
              {/* Icon */}
              <div className={`relative mb-5 inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-${feature.color}/10 to-${feature.color}/5 text-${feature.color} ring-1 ring-${feature.color}/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-${feature.color}`}>
                {feature.icon}
              </div>
              
              {/* Content */}
              <h3 className="relative mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="relative text-base leading-relaxed text-gray-600">
                {feature.description}
              </p>

              {/* Decorative corner accent */}
              <div className={`absolute right-8 top-8 size-24 rounded-full bg-gradient-to-br from-${feature.color}/10 to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100`} />
            </div>
          ))}
        </div>

        {/* CTA below features */}
        <div className="animate-fade-in-up mt-20 text-center [animation-delay:600ms]">
          <p className="mb-6 text-lg text-gray-600">
            And many more features included
          </p>
          <a
            href="https://github.com/ixartz/Next-js-Boilerplate#features"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-6 py-3 font-semibold text-gray-900 ring-1 ring-gray-200 transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-soft"
          >
            View All Features
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
