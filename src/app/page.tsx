'use client';

import { motion } from 'framer-motion';
import { Suspense, useRef } from 'react';
import Image from 'next/image';
import GenerativeArt from './components/GenerativeArt';
import { useScrollColorChange } from './hooks/useScrollColorChange';

export default function Home() {
  const scrollRef = useRef<HTMLElement>(null);
  const { textColor, textScale, textOpacity } = useScrollColorChange(scrollRef);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-neutral-900 py-20">
        <div className="absolute inset-0 z-0 opacity-30">
          <Suspense fallback={null}>
            <GenerativeArt />
          </Suspense>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-[7rem] lg:text-[8rem] leading-[0.9] bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent dark:from-white dark:via-gray-200 dark:to-gray-400 from-neutral-900 via-neutral-800 to-neutral-700 mb-12 py-4"
            >
              Relling Systems
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-3xl text-gray-400 max-w-4xl mx-auto italic"
            >
              New age testing infrastructure to accelerate hardware time to deployment
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-20 flex justify-center max-w-[90vw] mx-auto"
            >
              <div className="relative aspect-[16/9] w-full max-w-5xl group mt-32">
                <Image
                  src="/images/reactor.png"
                  alt="Reactor Testing"
                  fill
                  className="object-contain mix-blend-screen opacity-60 group-hover:opacity-90 transition-opacity duration-500 scale-[1.35]"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Artistic Text Reveal Section */}
      <section
        ref={scrollRef}
        className="min-h-screen relative flex items-center bg-gradient-to-b from-neutral-900 to-black py-32"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="max-w-6xl mx-auto"
            style={{
              color: textColor,
              scale: textScale,
              opacity: textOpacity,
            }}
          >
            <p className="text-4xl md:text-7xl lg:text-8xl leading-tight font-light">
              Relling Systems is building testing infrastructure to accelerate modern hardware innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="min-h-screen relative py-32 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            {/* Node Product */}
            <div className="space-y-8">
              <h2 className="text-7xl md:text-9xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Node
              </h2>
              <p className="text-2xl md:text-3xl text-gray-400 max-w-lg italic">
                Your powerful central hub for seamless system integration. Testing so easy your mechE can do it.
              </p>
              <div className="text-lg text-gray-300 mb-8 max-w-2xl font-sans">
                Node is a modular I/O system designed for instant integration in R&D and industrial environments. It eliminates the complexity of wiring and programming, allowing engineers to connect and collect data in seconds.
              </div>
              <div className="space-y-8">
                <div className="relative bg-[linear-gradient(147deg,rgba(146,60,181,0.7)_0%,rgba(0,0,0,0.9)_74%)] rounded-lg backdrop-blur-sm border border-white/5 group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(146,60,181,0.1)_0%,rgba(0,0,0,0.6)_100%)]"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-[#923cb5]/5 via-[#923cb5]/10 to-black/70"></div>
                  {/* Product Image */}
                  <div className="relative aspect-square w-full p-4 flex items-center justify-center">
                    <Image
                      src="/images/untitled2.png"
                      alt="Node Product Render"
                      fill
                      className="object-contain mix-blend-screen scale-110"
                      priority
                    />
                  </div>
                  {/* Extended Gradient Space */}
                  <div className="relative bg-black">
                    {/* Specs Section */}
                    <div className="p-6">
                      <div className="grid grid-cols-4 gap-6 font-mono text-sm tracking-tight">
                        <div className="space-y-1">
                          <div className="text-gray-400 text-xs uppercase tracking-wider">Dimensions</div>
                          <div className="text-white font-mono">130x50x120mm</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-gray-400 text-xs uppercase tracking-wider">Latency</div>
                          <div className="text-white font-mono">0.5ms</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-gray-400 text-xs uppercase tracking-wider">Max Channels</div>
                          <div className="text-white font-mono">64 Ch</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-gray-400 text-xs uppercase tracking-wider">Voltage Range</div>
                          <div className="text-white font-mono">±10V</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-gray-400 text-xs uppercase tracking-wider">Current Range</div>
                          <div className="text-white font-mono">0-20mA</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-gray-400 text-xs uppercase tracking-wider">Resolution</div>
                          <div className="text-white font-mono">16-bit</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-gray-400 text-xs uppercase tracking-wider">Power Supply</div>
                          <div className="text-white font-mono">24V DC ±20%</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-gray-400 text-xs uppercase tracking-wider">Isolation</div>
                          <div className="text-white font-mono">500V Ch-Ch</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal Product */}
            <div className="space-y-8">
              <h2 className="text-7xl md:text-9xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent text-right">
                Terminal
              </h2>
              <p className="text-2xl md:text-3xl text-gray-400 max-w-lg italic ml-auto text-right">
                Advanced command center for ultimate control. The new age testing powerhouse for test engineers.
              </p>
              <div className="text-lg text-gray-300 mb-8 max-w-2xl ml-auto text-right font-sans">
                Terminal is a real-time, AI-driven test automation platform designed for R&D labs and industrial validation. It replaces slow, proprietary test systems with hardware-accelerated processing, vendor-agnostic connectivity, and AI-optimized testing.
              </div>
              <div className="space-y-8">
                <div className="relative bg-[linear-gradient(315deg,#003366_0%,#242124_74%)] rounded-lg backdrop-blur-sm border border-white/5 group">
                  {/* Product Image */}
                  <div className="relative aspect-square w-full p-4 flex items-center justify-end">
                    <div className="relative w-[120%] h-full ml-20 -mr-24">
                      <Image
                        src="/images/terminal.png"
                        alt="Terminal Product Render"
                        fill
                        className="object-contain mix-blend-screen scale-[1.4]"
                        priority
                      />
                    </div>
                  </div>
                  {/* Extended Gradient Space */}
                  <div className="relative bg-black">
                    {/* Specs Section */}
                    <div className="p-6">
                      <div className="grid grid-cols-4 gap-6 font-mono text-sm tracking-tight">
                        <div className="space-y-1">
                          <div className="text-gray-400 text-xs uppercase tracking-wider">Form Factor</div>
                          <div className="text-white font-mono">4U Rack</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-gray-400 text-xs uppercase tracking-wider">Timing</div>
                          <div className="text-white font-mono">±50ns</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-gray-400 text-xs uppercase tracking-wider">Loop Speed</div>
                          <div className="text-white font-mono">1kHz</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-gray-400 text-xs uppercase tracking-wider">Sample Rate</div>
                          <div className="text-white font-mono">5GHz</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-gray-400 text-xs uppercase tracking-wider">Throughput</div>
                          <div className="text-white font-mono">40Gbps</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-gray-400 text-xs uppercase tracking-wider">Analog Ch</div>
                          <div className="text-white font-mono">128 Ch</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-gray-400 text-xs uppercase tracking-wider">Digital I/O</div>
                          <div className="text-white font-mono">256 Ch</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-gray-400 text-xs uppercase tracking-wider">FPGA Perf</div>
                          <div className="text-white font-mono">500 GOPS</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)]" />
        <div className="relative container mx-auto px-4 py-32">
          <div className="max-w-5xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl leading-tight text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-24"
            >
              Testing in browser?
              <span className="block text-2xl md:text-4xl mt-4 text-gray-400">
                Hell yes. It&apos;s that powerful.
              </span>
            </motion.p>

            <p className="text-2xl md:text-4xl leading-relaxed text-gray-400 italic mb-16">
              All of our solutions come with a purpose-built software solution that renders complex tests into Python. Our products are designed with precision, built for reliability, and optimized for performance.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="p-6 rounded-lg bg-gradient-to-br from-red-900/40 to-orange-900/40 backdrop-blur-sm border border-white/5">
                <p className="text-gray-200 text-lg mb-3 font-sans">
                  Experience the future of hardware testing directly in your browser. No complex setup required&mdash;just open, configure, and start testing.
                </p>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent font-sans">
                  Browser-Native Testing
                </h3>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-lg bg-gradient-to-br from-orange-900/40 to-amber-900/40 backdrop-blur-sm border border-white/5">
                <p className="text-gray-200 text-lg mb-3 font-sans">
                  Connect and control any hardware through our vendor-agnostic platform. Break free from proprietary ecosystems and choose the best tools for your needs.
                </p>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent font-sans">
                  Universal Hardware Support
                </h3>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-lg bg-gradient-to-br from-amber-900/40 to-yellow-900/40 backdrop-blur-sm border border-white/5">
                <p className="text-gray-200 text-lg mb-3 font-sans">
                  Build complex test suites with our intuitive drag-and-drop interface. Abstract away driver integrations and focus on what matters&mdash;your test logic.
                </p>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent font-sans">
                  Visual Test Builder
                </h3>
              </div>

              {/* Feature 4 */}
              <div className="p-6 rounded-lg bg-gradient-to-br from-yellow-900/40 to-red-900/40 backdrop-blur-sm border border-white/5">
                <p className="text-gray-200 text-lg mb-3 font-sans">
                  Every test configuration compiles into clean, maintainable Python and YAML. Empower your entire team to work in the language they know and love.
                </p>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent font-sans">
                  Python-First Architecture
                </h3>
              </div>

              {/* Feature 5 */}
              <div className="p-6 rounded-lg bg-gradient-to-br from-red-900/40 to-orange-900/40 backdrop-blur-sm border border-white/5">
                <p className="text-gray-200 text-lg mb-3 font-sans">
                  AI-powered test optimization gets you up and running in minutes, not days. Automatically tune parameters and identify optimal test configurations.
                </p>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent font-sans">
                  AI-Driven Optimization
                </h3>
              </div>

              {/* Feature 6 */}
              <div className="p-6 rounded-lg bg-gradient-to-br from-orange-900/40 to-amber-900/40 backdrop-blur-sm border border-white/5">
                <p className="text-gray-200 text-lg mb-3 font-sans">
                  Create, save, and share test configurations across your organization. Build a library of reusable test suites that grow with your needs.
                </p>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent font-sans">
                  Configurable Test Library
                </h3>
              </div>
            </div>
          </div>
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
