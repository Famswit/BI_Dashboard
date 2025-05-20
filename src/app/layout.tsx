import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomThemeProvider from "../lib/Theme-context";
import { AuthProvider } from "@/lib/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Business Intelligence Dashboard",
  description: "A mini business intelligence tool with data visualization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CustomThemeProvider>{children}</CustomThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
