import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";

import ConsolePrinter from "@/components/ConsolePrinter";
import Navbar from "@/components/Navbar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const notoSansTC = Noto_Sans_TC({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dcard 2024 Frontend",
    template: "Dcard 2024 Frontend | %s",
  },
  description:
    "歡迎來到丹尼爾的部落格！這是Willy_Awkward為了Dcard 2024 Frontend Intern而建立的部落格，希望您能夠喜歡！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant-TW">
      <body className={`${notoSansTC.className}`}>
        <Navbar />
        <main className="mx-4 my-4 sm:mx-8">{children}</main>
        <ScrollToTopButton />
        <Toaster />
        <ConsolePrinter message="曾經聽說：「如果有人叫你在這裡複製貼上那絕對是在騙你 ¯\_(ツ)_/¯」，但我相信您肯定知道您在做什麼，期望有幸能夠與您面談！" />
      </body>
    </html>
  );
}
