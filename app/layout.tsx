import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: ["/icon.png"],
    apple: [
      { url: "/icon.png" },
    ],
  },
  verification: {
    google: "QLeGh1kl2PRDF97EFo0fZPprznesEjHV7Cm88oAnG44",
  },
};

import ScrollToTop from "./components/ScrollToTop";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-3FX8T6WSRE";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="shortcut icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="google-site-verification" content="QLeGh1kl2PRDF97EFo0fZPprznesEjHV7Cm88oAnG44" />
        <meta name="google-site-verification" content="TirE6t0RVKEmMHM-xUkBXl031MGIZeYx_MsZxXJKkr4" />
      </head>
      <body className="min-h-full flex flex-col">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}


