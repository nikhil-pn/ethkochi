import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Canonical site URL. Override with NEXT_PUBLIC_SITE_URL once the real domain is
// live so Open Graph / Twitter image URLs and the canonical link resolve to it.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ethkochi.com";
const SITE_NAME = "ethKochi";
const DESCRIPTION =
  "ethKochi — an Ethereum hackathon in Kochi, God's Own City. Coming soon.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ethKochi — Coming Soon",
    template: "%s · ethKochi",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "ethKochi",
    "ethkochi",
    "Ethereum",
    "hackathon",
    "Kochi",
    "Kerala",
    "web3",
    "web3kerala",
    "blockchain",
    "Devcon",
    "crypto",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "ethKochi — Coming Soon",
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ethKochi — Coming Soon",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
