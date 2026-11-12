import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Porsche 911 GT3 — Engineered for the track. Tamed for the road.",
  description:
    "Experience the Porsche 911 GT3 — a 3D interactive journey through precision engineering, raw power, and timeless design. 502 hp naturally aspirated flat-six, 9,000 rpm redline, 318 km/h.",
  keywords: ["Porsche", "911 GT3", "sports car", "3D model", "performance", "luxury car", "supercar"],
  authors: [{ name: "Porsche AG" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Porsche 911 GT3",
    description: "Engineered for the track. Tamed for the road.",
    siteName: "Porsche 911 GT3",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Porsche 911 GT3",
    description: "Engineered for the track. Tamed for the road.",
  },
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${grotesk.variable} ${manrope.variable} antialiased bg-background text-foreground`}
        style={{ backgroundColor: "#ffffff", color: "#0a0a0a" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
