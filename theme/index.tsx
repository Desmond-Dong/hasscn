// .rspress/theme/layout.tsx
import DefaultTheme from 'rspress/theme';
import type { ReactNode } from 'react';

const { Layout: DefaultLayout } = DefaultTheme;

export default function Layout(props: { children: ReactNode }) {
  return (
    <>
      <meta name="referrer" content="origin-when-cross-origin" />
      <DefaultLayout {...props} />
    </>
  );
}