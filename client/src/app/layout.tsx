
import Providers from '@/components/Providers';
import '@/globals.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
