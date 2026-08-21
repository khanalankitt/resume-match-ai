import type { Metadata, Viewport } from "next";
import { Fraunces, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://airesumematch.khanalankit.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "AI Resume Match — Know your match before you apply",
    template: "%s — AI Resume Match",
  },
  description:
    "Upload your resume, paste a job description, and get an AI-powered compatibility report with match score, skills gaps, ATS keywords, and exact resume fixes.",

  keywords: [
    "resume analyzer",
    "ATS checker",
    "job description match",
    "resume scoring",
    "AI resume tool",
    "resume optimization",
    "job application",
    "career tools",
  ],

  authors: [{ name: "Ankit Khanal", url: "https://khanalankit.com" }],
  creator: "Ankit Khanal",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "AI Resume Match",
    title: "AI Resume Match — Know your match before you apply",
    description:
      "AI-powered resume analysis — match score, skills gaps & exact fixes. See how your resume stacks up against any job description in seconds.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AI Resume Match — Know your match before you apply",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Resume Match — Know your match before you apply",
    description:
      "AI-powered resume analysis — match score, skills gaps & exact fixes.",
    images: ["/opengraph-image"],
    creator: "@khanalankitt",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#F1F1EC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${publicSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
