import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WIPO Platform",
  description: "WIPO Next.js Platform - Light Green & White Theme",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-gray-800`}>
        {/* Navbar */}
        <header className="bg-green-50 border-b border-green-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-green-700">
              WIPO
            </Link>

            {/* Main Nav */}
            <nav className="flex gap-6 text-green-700 font-medium">
              <Link href="/about" className="hover:text-green-900 transition">
                About
              </Link>
              <Link href="/admin" className="hover:text-green-900 transition">
                Admin
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="min-h-[calc(100vh-80px)]">{children}</main>

        {/* Footer */}
        <footer className="bg-green-50 border-t border-green-100 mt-10">
          <div className="max-w-6xl mx-auto px-6 py-6 text-center text-green-700 text-sm">
            © {new Date().getFullYear()} WIPO Platform. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
