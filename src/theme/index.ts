'use client';

export type ThemePalette = {
  primary: string;
  secondary: string;
};

const isBrowser = () => typeof window !== 'undefined';

export const setThemePalette = ({ primary, secondary }: ThemePalette) => {
  if (!isBrowser()) {
    return;
  }

  const root = document.documentElement;

  root.style.setProperty('--color-primary', primary);
  root.style.setProperty('--color-secondary', secondary);
};

export const getThemePalette = (): ThemePalette | null => {
  if (!isBrowser()) {
    return null;
  }

  const root = document.documentElement;

  return {
    primary: getComputedStyle(root).getPropertyValue('--color-primary').trim(),
    secondary: getComputedStyle(root).getPropertyValue('--color-secondary').trim(),
  };
};
