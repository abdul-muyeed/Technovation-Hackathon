import Header from '@/components/Header';
import Nav from '@/components/Nav';
import '@/globals.css'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <Nav/>
        {children}
      </body>
    </html>
  );
}
