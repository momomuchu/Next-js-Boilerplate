import type { NextAuthConfig } from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { db } from '@/libs/DB';
import { Env } from '@/libs/Env';
import * as schema from '@/models/Schema';

export const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
    authenticatorsTable: schema.authenticators,
  }),
  secret: Env.AUTH_SECRET,
  session: {
    strategy: 'database',
  },
  providers: [
    GitHub({
      clientId: Env.GITHUB_CLIENT_ID,
      clientSecret: Env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: Env.GOOGLE_CLIENT_ID,
      clientSecret: Env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        (session.user as { id?: string }).id = user.id;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
