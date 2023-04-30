import '../styles/global.css';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <h1>From root layout!</h1>
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Collection app',
  description: 'Collect anything, remember everything.',
};