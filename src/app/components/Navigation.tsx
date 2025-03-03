'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto flex justify-end items-center"
      >
        <Link 
          href="/manifesto" 
          className={`text-xl tracking-wider hover:opacity-70 transition-opacity ${
            pathname === '/mission' ? 'text-white' : 'text-gray-400'
          }`}
        >
          Manifesto
        </Link>
      </motion.div>
    </nav>
  );
} 