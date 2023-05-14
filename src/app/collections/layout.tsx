export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex-column container flex min-h-screen max-w-screen-lg'>
      {children}
    </div>
  );
}
