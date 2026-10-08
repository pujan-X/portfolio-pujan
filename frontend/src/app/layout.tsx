import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { CommandMenu } from "@/components/CommandMenu";
import { Footer } from "@/components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const jetBrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pujan Suthar | Java & Spring Boot Developer",
  description: "Backend and full-stack developer from Mumbai building AI-integrated applications with Java, Spring Boot, and MySQL.",
  keywords: ["Java", "Spring Boot", "Backend Developer", "Full-Stack", "Mumbai", "AI Integration", "Pujan Suthar"],
  authors: [{ name: "Pujan Suthar" }],
  openGraph: {
    title: "Pujan Suthar | Java & Spring Boot Developer",
    description: "Backend and full-stack developer from Mumbai building AI-integrated applications.",
    type: "website",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Pujan Suthar",
    "jobTitle": "Java & Spring Boot Developer",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressCountry": "IN"
    },
    "email": "pujansuthar345@gmail.com",
    "sameAs": [
      "https://github.com/pujan-x"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <meta name="theme-color" content="#09090b" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${geistSans.variable} ${jetBrainsMono.variable} font-sans antialiased min-h-screen flex flex-col cursor-none`}>
        {/* Dot-grid texture */}
        <div className="dot-grid-bg" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />

        <Providers>
          <Navbar />
          <CommandMenu />
          <main id="main-content" className="flex-grow relative z-10">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
