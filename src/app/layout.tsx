import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header/page";
import Footer from "./components/Footer/page";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pink Dot - Modern Fashion & Lifestyle",
  description: "Discover our unique collection of thoughtfully curated items",
  icons: {
    icon: '/images/icon.png',
    shortcut: '/images/icon.png',
    apple: '/images/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning={true}
      >
        <Header />
        <main className="app-main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
