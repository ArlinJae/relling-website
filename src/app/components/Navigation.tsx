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
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className={`text-lg font-medium text-gray-900 hover:text-gray-700 transition-colors`}
          >
            Relling Systems
          </Link>
          <div className="flex items-center space-x-8">
            <Link
              href="/manifesto"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Manifesto
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
