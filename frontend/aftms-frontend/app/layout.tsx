import type { Metadata } from "next";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "AFTMS - Football Tournament System",
  description: "Addis Football Tournament Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-slate-50">
        {/* GLOBAL NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="flex-1">{children}</main>

        {/* GLOBAL FOOTER */}
        <Footer />
      </body>
    </html>
  );
}
