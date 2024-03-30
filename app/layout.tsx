import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ConsolePrinter from "@/components/ConsolePrinter";
import Navbar from "@/components/Navbar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dcard 2024 Frontend",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="mx-4 my-4 sm:mx-8">{children}</main>
        <ScrollToTopButton />
        <Toaster />
        <ConsolePrinter message="曾經聽說：「如果有人叫你在這裡複製貼上那絕對是在騙你 ¯\_(ツ)_/¯」，但我相信您肯定知道您在做什麼，期望有幸能夠與您面談！" />
      </body>
    </html>
  );
}
