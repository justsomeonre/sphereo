import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { AnnouncementBar } from '../components/layout/AnnouncementBar';

export const metadata: Metadata = {
  title: 'SphereO — AI that respects human hands | Global Artisan Marketplace',
  description:
    'Discover verified Indian artisans across Jaipur Blue Pottery, Lacquer Bangles, Kutch Ajrakh, and Bastar Dhokra. Create custom heirloom designs with artisan-aware intelligence.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-sphereo-ivory text-sphereo-charcoal selection:bg-sphereo-terracotta/20 selection:text-sphereo-terracotta">
        <AnnouncementBar />
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
