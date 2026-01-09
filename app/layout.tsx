"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isApp = pathname.startsWith("/app");

  return (
    <html lang="en">
      <body className="bg-gray-50">
        {/* Navbar only for website */}
        {!isApp && <Navbar />}
        <main className="min-h-screen">{children}</main>

        {/* Footer only for website */}
        {!isApp && <Footer />}
      </body>
    </html>
  );
}
