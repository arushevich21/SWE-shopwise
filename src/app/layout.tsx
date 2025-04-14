import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "./dashboard/_components/footer";
import { Divider } from "@heroui/react";
import NavigationWrapper from "./_components/navigationWrapper"; // 👈 We'll create this

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopWise",
  description: "Find the best prices across grocery stores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-[100vh]">
          <Providers>
            <NavigationWrapper /> {/* 👈 wrap NavigationBar in a client component */}
            {children}
          </Providers>
        </div>
        <Divider className="mb-4" />
        <Footer />
      </body>
    </html>
  );
}
