import { AppContextProvider } from '@/context/app.context';
import LayoutNav from './layout-nav';
import ReactQueryProviders from '@/lib/providers/reactQueryProviders';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata = {
  title: 'FITBUDDY',
  description: 'A Social network for fitness lovers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          <ReactQueryProviders>
            <Toaster position="top-center" />
            <LayoutNav>{children}</LayoutNav>
          </ReactQueryProviders>
        </AppContextProvider>
      </body>
    </html>
  );
}
