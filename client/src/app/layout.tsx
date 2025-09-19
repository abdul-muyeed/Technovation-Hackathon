
import Providers from '@/components/Providers';
import '@/globals.css'
import { cookies } from 'next/headers';


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cooki = await cookies();
  const token = cooki.get('access_token')?.value ?? null;
  return (
    <html lang="en">
      <body>
        <Providers token={token}>
            {children}
        </Providers>
      </body>
    </html>
  );
}
