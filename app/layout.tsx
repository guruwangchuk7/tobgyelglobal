import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://www.tobgyelglobalxpos.com"),
  title: {
    default: "Tobgyel Global Expos | Bhutan's Gateway to International Trade & Events",
    template: "%s | Tobgyel Global Expos",
  },
  description: "Connecting global businesses, investors, innovators, and communities through world-class exhibitions and events in Bhutan.",
  verification: {
    google: "QLeGh1kl2PRDF97EFo0fZPprznesEjHV7Cm88oAnG44",
  },
};

import ScrollToTop from "./components/ScrollToTop";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="google-site-verification" content="QLeGh1kl2PRDF97EFo0fZPprznesEjHV7Cm88oAnG44" />
        <meta name="google-site-verification" content="TirE6t0RVKEmMHM-xUkBXl031MGIZeYx_MsZxXJKkr4" />
      </head>
      <body className="min-h-full flex flex-col">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
