import type { Metadata, Viewport } from "next";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import InstallPrompt from "../component/installPrompt";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "AFTMS - Football Tournament System",
  description: "Addis Football Tournament Management System",
  appleWebApp: {
    capable: true,
    title: "AFTMS",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/image/logo.png",
    apple: "/image/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#450a0a",
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

        {/* PWA INSTALL PROMPT */}
        <InstallPrompt />
      </body>
    </html>
  );
}
