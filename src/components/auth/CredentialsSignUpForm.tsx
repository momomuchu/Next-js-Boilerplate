'use client';

import { signIn } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { registerUser } from '@/actions/register-user';

type CredentialsSignUpFormProps = {
  redirectPath: string;
  labels: {
    heading: string;
    helper: string;
    name: string;
    email: string;
    password: string;
    submit: string;
    errorTaken: string;
    errorGeneric: string;
  };
};

export const CredentialsSignUpForm = ({
  redirectPath,
  labels,
}: CredentialsSignUpFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await registerUser({
        name: name || undefined,
        email,
        password,
      });

      if (!result.success) {
        if (result.code === 'ACCOUNT_EXISTS') {
          setError(labels.errorTaken);
          return;
        }

        if (result.code === 'INVALID_INPUT') {
          setError(labels.errorGeneric);
          return;
        }

        setError(labels.errorGeneric);
        return;
      }

      const signInResult = await signIn('credentials', {
        email,
        password,
        redirectTo: redirectPath,
      });

      if (signInResult?.error) {
        setError(labels.errorGeneric);
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
          <label className="theme-label" htmlFor="signup-name">
            {labels.name}
          </label>
          <input
            id="signup-name"
            name="name"
            type="text"
            autoComplete="name"
            className="theme-input"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </div>

        <div>
          <label className="theme-label" htmlFor="signup-email">
            {labels.email}
          </label>
          <input
            id="signup-email"
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
          <label className="theme-label" htmlFor="signup-password">
            {labels.password}
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            minLength={8}
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
