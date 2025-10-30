'use client';

import { signIn } from 'next-auth/react';
import { useState, useTransition } from 'react';

type CredentialsSignInFormProps = {
  redirectPath: string;
  labels: {
    heading: string;
    email: string;
    password: string;
    submit: string;
    helper: string;
    error: string;
  };
};

export const CredentialsSignInForm = ({
  redirectPath,
  labels,
}: CredentialsSignInFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await signIn('credentials', {
        email,
        password,
        redirectTo: redirectPath,
      });

      if (result?.error) {
        setError(labels.error);
      }
    });
  };

  return (
    <div className="theme-card">
      <h2 className="theme-card__title">
        {labels.heading}
      </h2>
      <p className="theme-card__subtitle">
        {labels.helper}
      </p>
      <form className="theme-card__form" onSubmit={handleSubmit}>
        <div>
          <label className="theme-label" htmlFor="signin-email">
            {labels.email}
          </label>
          <input
            id="signin-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="theme-input"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label className="theme-label" htmlFor="signin-password">
            {labels.password}
          </label>
          <input
            id="signin-password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="theme-input"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>

        {error
          ? (
              <p className="theme-error">
                {error}
              </p>
            )
          : null}

        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={isPending}
        >
          {labels.submit}
        </button>
      </form>
    </div>
  );
};
