import type { NextFetchEvent, NextRequest } from 'next/server';
import { detectBot } from '@arcjet/next';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import arcjet from '@/libs/Arcjet';
import { getI18nPath } from '@/utils/Helpers';
import { routing } from './libs/I18nRouting';

const handleI18nRouting = createMiddleware(routing);

const protectedRoutePatterns = [
  /^\/dashboard(\/.*)?$/,
  /^\/[^/]+\/dashboard(\/.*)?$/,
];

const authRoutePatterns = [
  /^\/sign-in(\/.*)?$/,
  /^\/[^/]+\/sign-in(\/.*)?$/,
  /^\/sign-up(\/.*)?$/,
  /^\/[^/]+\/sign-up(\/.*)?$/,
];

const matchesRoute = (pathname: string, patterns: RegExp[]) => {
  return patterns.some(pattern => pattern.test(pathname));
};

const resolveLocaleFromPathname = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  const potentialLocale = segments[0];

  if (potentialLocale && routing.locales.includes(potentialLocale)) {
    return potentialLocale;
  }

  return routing.defaultLocale;
};

// Improve security with Arcjet
const aj = arcjet.withRule(
  detectBot({
    mode: 'LIVE',
    // Block all bots except the following
    allow: [
      // See https://docs.arcjet.com/bot-protection/identifying-bots
      'CATEGORY:SEARCH_ENGINE', // Allow search engines
      'CATEGORY:PREVIEW', // Allow preview links to show OG images
      'CATEGORY:MONITOR', // Allow uptime monitoring services
    ],
  }),
);

// Currently, with database connections, Webpack is faster than Turbopack in production environment at runtime.
// Then, unfortunately, Webpack doesn't support `proxy.ts` on Vercel yet, here is the error: "Error: ENOENT: no such file or directory, lstat '/vercel/path0/.next/server/proxy.js'"
export default async function middleware(
  request: NextRequest,
  _event: NextFetchEvent,
) {
  // Verify the request with Arcjet
  // Use `process.env` instead of Env to reduce bundle size in middleware
  if (process.env.ARCJET_KEY) {
    const decision = await aj.protect(request);

    if (decision.isDenied()) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  // Protect authenticated routes while preserving i18n-aware routing
  const { pathname } = request.nextUrl;
  const locale = resolveLocaleFromPathname(pathname);
  const isProtectedRoute = matchesRoute(pathname, protectedRoutePatterns);
  const isAuthRoute = matchesRoute(pathname, authRoutePatterns);
  const shouldInspectSession = isProtectedRoute || isAuthRoute;
  const token = shouldInspectSession ? await getToken({ req: request }) : null;

  if (isProtectedRoute && !token) {
    const signInPath = getI18nPath('/sign-in', locale);
    const signInUrl = new URL(signInPath, request.url);

    return NextResponse.redirect(signInUrl);
  }

  if (isAuthRoute && token) {
    const dashboardPath = getI18nPath('/dashboard/', locale);
    const dashboardUrl = new URL(dashboardPath, request.url);

    return NextResponse.redirect(dashboardUrl);
  }

  return handleI18nRouting(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/_next`, `/_vercel` or `monitoring`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!_next|_vercel|monitoring|.*\\..*).*)',
  runtime: 'nodejs',
};
