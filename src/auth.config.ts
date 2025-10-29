import type { NextAuthConfig } from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { z } from 'zod';
import { db } from '@/libs/DB';
import { Env } from '@/libs/Env';
import { verifyPassword } from '@/libs/password';
import * as schema from '@/models/Schema';

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

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
    Credentials({
      name: 'Email and password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        const parsed = credentialsSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const existingUser = await db.query.users.findFirst({
          where: (usersTable, { eq: eqFn }) => eqFn(usersTable.email, parsed.data.email),
        });

        if (!existingUser?.passwordHash) {
          return null;
        }

        const isValid = await verifyPassword(parsed.data.password, existingUser.passwordHash);

        if (!isValid) {
          return null;
        }

        return {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
        };
      },
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
