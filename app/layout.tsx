import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {ClerkProvider} from "@clerk/nextjs";
import "./globals.css";
import ToastProvider from "@/components/provider/provider-toast";
import React from "react";
import {ConfettiProvider} from "@/components/provider/confetti-provider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider afterSignOutUrl={'/'}>
        <html lang="en" className={"scroll-smooth"}>
        <body className={inter.className}>
        <ConfettiProvider/>
        <ToastProvider/>
        {children}
        </body>
        </html>
      </ClerkProvider>
  );
}
