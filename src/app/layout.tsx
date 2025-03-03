import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Relling Systems",
  description: "Purpose-built software solutions for modern systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-black">
      <body className={`${playfair.className} min-h-screen bg-black overflow-x-hidden antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
