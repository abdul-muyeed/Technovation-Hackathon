import Header from '@/components/Header';
import Nav from '@/components/Nav';
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
        <AppRouterCacheProvider>
           {children}
+        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
