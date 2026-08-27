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
  icons: {
    icon: [
      { url: "/logo.jpeg", type: "image/jpeg" },
    ],
    shortcut: ["/logo.jpeg"],
    apple: [
      { url: "/logo.jpeg" },
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
        <link rel="icon" href="/logo.jpeg" type="image/jpeg" />
        <link rel="shortcut icon" href="/logo.jpeg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpeg" />
        <meta name="google-site-verification" content="QLeGh1kl2PRDF97EFo0fZPprznesEjHV7Cm88oAnG44" />
        <meta name="google-site-verification" content="TirE6t0RVKEmMHM-xUkBXl031MGIZeYx_MsZxXJKkr4" />
        {/* Google tag (gtag.js) */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}

