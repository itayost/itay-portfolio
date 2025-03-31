import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

export const metadata = {
  title: "Itay Ostraich | Portfolio",
  description: "Personal portfolio website of Itay Ostraich",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--background)] text-[var(--foreground)] font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}