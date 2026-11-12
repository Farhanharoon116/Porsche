import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Porsche 911 GT3 — Born to perform. Built to dominate.",
  description: "Experience the Porsche 911 GT3 — a 3D interactive journey through precision engineering, raw power, and timeless design. From the legendary flat-six engine to the aerodynamic silhouette, every detail tells a story.",
  keywords: ["Porsche", "911 GT3", "sports car", "3D model", "performance", "luxury car", "supercar"],
  authors: [{ name: "Porsche AG" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Porsche 911 GT3",
    description: "Born to perform. Built to dominate.",
    siteName: "Porsche 911 GT3",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Porsche 911 GT3",
    description: "Born to perform. Built to dominate.",
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBjH0g=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
        style={{ backgroundColor: "#0a0a0a", color: "#EAEAEA" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
