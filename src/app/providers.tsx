import JotaiProvider from '@/components/jotai-provider';
import { ClerkProvider } from '@clerk/nextjs';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <ClerkProvider>{children}</ClerkProvider>
    </JotaiProvider>
  );
}
