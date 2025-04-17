import { usePageData } from '@rspress/runtime';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const { page } = usePageData();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{page?.title ?? 'Rspress Site'}</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
