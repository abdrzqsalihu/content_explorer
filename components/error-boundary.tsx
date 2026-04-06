import { ReactNode } from 'react';

export function ErrorBoundary({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
