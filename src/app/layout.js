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

export const metadata = {
  title: "Mano Andriasat",
  description: "Mano Andriasat - Creative Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="Andriasatarintsoa Manohisoa Alain, Mano Andriasat, Mano Andriasatarintsoa, Manohisoa Alain Andriasatarintsoa, Manohisoa Alain Andriasat, Mano Andriasatarintsoa, Mano Andriasat, Mano Andriasatarintsoa, Manohisoa Alain" />
        <meta name="author" content="Mano Andriasat - Creative Developer" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Mano Andriasat - Creative Developer" />
        <meta property="og:description" content="Innover votre présentation pour mieux vous démarquer." />
        <meta property="og:image" content="./logo.ico" />
        <meta property="og:url" content="https://mano-andriasat.me" />

        <meta name="twitter:card" content="./logo.ico" />
        <meta name="twitter:title" content="Mano Andriasat" />
        <meta name="twitter:description" content="Découvrez nos services innovants." />
        <meta name="twitter:image" content="./logo.ico" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://mano-andriasat.me",
              "name": "Mano Andriasat",
              "description": "Innover votre présentation pour mieux vous démarquer.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://mano-andriasat.me/?s={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://mano-andriasat.me"
              },
              "hasPart": [
                {
                  "@type": "SiteNavigationElement",
                  "name": "Home",
                  "url": "https://mano-andriasat.me/#landing"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "About",
                  "url": "https://mano-andriasat.me/#about"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Work",
                  "url": "https://mano-andriasat.me/#work"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Skills",
                  "url": "https://mano-andriasat.me/#skills"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Contact",
                  "url": "https://mano-andriasat.me/#contact"
                }
              ]
            })
          }}
        />


        <script async src="https://www.googletagmanager.com/gtag/js?id=G-76MZXLNDG4"></script>
        <script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-76MZXLNDG4');`}
        </script>

        <link rel="icon" href="/logo.ico" />
        <link rel="apple-touch-icon" href="/logo.ico" />
        <link rel="shortcut icon" href="/logo.ico" />
        <link rel="icon" type="image/x-icon" href="/logo.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
