import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { AppProviders } from "@/components/providers/AppProviders";
import { SkipLink } from "@/components/ui/SkipLink";
import { absoluteAsset, asset, siteConfig, siteUrl } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const ogImage = absoluteAsset(siteConfig.ogImage);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: "Francisco Florit — Portfolio",
  authors: [{ name: siteConfig.name, url: siteConfig.github }],
  creator: siteConfig.name,
  keywords: [
    "Francisco Florit",
    "Full Stack Developer",
    "Java",
    "Spring Boot",
    "React",
    "TypeScript",
    "React Native",
    "Buenos Aires",
    "Portfolio",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImage],
  },
  icons: {
    icon: [{ url: asset("/icon.svg"), type: "image/svg+xml" }],
    apple: [{ url: asset("/apple-icon.png"), sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "technology",
};

const themeScript = `(function(){try{var t=localStorage.getItem("portfolio-theme");var d=t==="dark"||((!t||t==="system")&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";var l=localStorage.getItem("portfolio-locale");if(l==="es"||l==="en"){document.documentElement.lang=l;}else if(navigator.language.toLowerCase().startsWith("en")){document.documentElement.lang="en";}}catch(e){}})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: "Full Stack Developer",
  description: siteConfig.description,
  url: siteUrl,
  email: `mailto:${siteConfig.email}`,
  image: absoluteAsset(siteConfig.photo),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressCountry: "AR",
  },
  sameAs: [siteConfig.github, siteConfig.linkedin],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidad de Buenos Aires",
  },
  knowsLanguage: ["es", "en"],
  knowsAbout: [
    "Java",
    "Spring Boot",
    "React",
    "TypeScript",
    "React Native",
    "PostgreSQL",
    "Oracle",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <AppProviders>
          <SkipLink />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
