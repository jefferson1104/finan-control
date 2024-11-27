import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

import { TransactionsProvider } from "@/app/_contexts/transactions-context";

import "./globals.css";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Finan Control",
  description:
    "A financial management platform that uses AI to monitor your transactions and offer personalized insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.className} dark antialiased`}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <TransactionsProvider>
            <NextTopLoader color="#55B02E" showSpinner={false} />
            <div className="flex h-full flex-col overflow-hidden">
              {children}
            </div>
          </TransactionsProvider>
        </ClerkProvider>
        <Toaster />
      </body>
    </html>
  );
}
