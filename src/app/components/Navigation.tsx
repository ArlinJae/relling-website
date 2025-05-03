'use client';

import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import { useScrollColorChange } from '../hooks/useScrollColorChange';
import { useRef } from 'react';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const { textColor } = useScrollColorChange(navRef);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-end h-20">
          <Link
            href="/manifesto"
            className={`text-xl md:text-2xl ${playfair.className} hover:opacity-80 transition-opacity`}
            style={{ color: textColor }}
          >
            Manifesto
          </Link>
        </div>
      </div>
    </nav>
  );
}
