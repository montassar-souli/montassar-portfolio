import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Montassar Souli - Full Stack Developer",
  description:
    "Full stack developer specializing in Next.js, NestJS, and modern web technologies. Building fast, scalable web applications.",
  keywords: ["Full Stack Developer", "Next.js", "NestJS", "React", "TypeScript", "Web Development"],
  authors: [{ name: "Montassar Souli" }],
  creator: "Montassar Souli",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://montassar-souli.vercel.app",
    title: "Montassar Souli - Full Stack Developer",
    description: "Full stack developer specializing in Next.js, NestJS, and modern web technologies.",
    siteName: "Montassar Souli Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Montassar Souli - Full Stack Developer",
    description: "Full stack developer specializing in Next.js, NestJS, and modern web technologies.",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <div className="flex flex-col bg-white">
          <Navigation />
          <main className="mt-16 lg:mt-20">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
