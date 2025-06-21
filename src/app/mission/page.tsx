'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Mission() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-white overflow-hidden">
      {/* Mission Content */}
      <section className="relative min-h-screen py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)]" />
        <div className="container mx-auto px-4 relative">
          {/* Back button */}
          <Link
            href="/"
            className="inline-block mb-20 text-lg hover-underline"
          >
            ← Back to home
          </Link>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mb-32"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-[7rem] lg:text-[8rem] leading-[0.9] bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-12 py-4"
            >
              Relling Systems
            </motion.h1>

            <div className="space-y-12 text-xl">
              <p className="leading-relaxed text-gray-300">
                At Relling Systems, we&apos;re driven by a singular vision: to revolutionize
                how systems interact and operate in the modern world. We believe that
                purpose-built software solutions are the key to unlocking unprecedented
                efficiency and reliability in system operations.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-lg backdrop-blur-sm border border-white/5">
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">Innovation</h3>
                  <p className="text-gray-300">
                    We push the boundaries of what&apos;s possible, creating solutions that
                    anticipate tomorrow&apos;s challenges while solving today&apos;s problems.
                  </p>
                </div>

                <div className="p-6 rounded-lg backdrop-blur-sm border border-white/5">
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">Reliability</h3>
                  <p className="text-gray-300">
                    Our products are built on a foundation of robust engineering and
                    rigorous testing, ensuring dependable performance when it matters most.
                  </p>
                </div>

                <div className="p-6 rounded-lg backdrop-blur-sm border border-white/5">
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">Integration</h3>
                  <p className="text-gray-300">
                    We create seamless connections between systems, enabling efficient
                    communication and operation across your entire infrastructure.
                  </p>
                </div>

                <div className="p-6 rounded-lg backdrop-blur-sm border border-white/5">
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">Excellence</h3>
                  <p className="text-gray-300">
                    Every line of code, every interface, and every feature is crafted
                    with meticulous attention to detail and a commitment to excellence.
                  </p>
                </div>
              </div>

              <p className="leading-relaxed text-gray-300">
                Through our flagship products, Node and Terminal, we&apos;re building the
                future of system integration and control. Join us in shaping the next
                generation of software solutions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-black via-neutral-950 to-black py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)]" />
        <div className="container mx-auto px-4 relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-[8rem] lg:text-[10rem] leading-[0.9] bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent text-center mb-16 py-4"
          >
            Relling Systems
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <a
              href="mailto:ping@rellingsystems.com"
              className="text-xl text-gray-400 hover:text-white transition-colors duration-300"
            >
              ping@rellingsystems.com
            </a>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}
