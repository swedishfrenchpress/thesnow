import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Memoria",
  description: "Exclusive collection of AI-generated artwork. Purchase unique digital art with Bitcoin.",
  keywords: ["Bitcoin", "AI Art", "Midjourney", "Digital Art", "NFT", "Cryptocurrency"],
  openGraph: {
    title: "Memoria",
    description: "Alternative realities that should exist. Sci-fi worlds made in Midjourney, available to purchase with Bitcoin.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Memoria - AI-Generated Artwork Collection",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

