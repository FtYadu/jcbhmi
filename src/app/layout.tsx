import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { fonts } from "./font";
import { siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
});

const title = `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`;
const description = siteConfig.hero.subhead;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.brand.url),
  title: {
    default: title,
    template: `%s · ${siteConfig.brand.name}`,
  },
  description,
  openGraph: {
    type: "website",
    siteName: siteConfig.brand.name,
    title,
    description,
    url: siteConfig.brand.url,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.map((font) => font.variable).join(" ")}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
