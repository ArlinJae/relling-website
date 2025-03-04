'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import { ErrorBoundary } from 'react-error-boundary';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});

function ErrorFallback() {
  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl mb-4">Something went wrong</h1>
        <Link href="/" className="text-gray-400 hover:text-white">
          Return to home
        </Link>
      </div>
    </div>
  );
}

export default function Manifesto() {
  useEffect(() => {
    // Ensure smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <main className="min-h-screen bg-black text-white pt-20">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <Link
            href="/"
            className="inline-block mb-20 text-lg hover:opacity-70 transition-opacity"
          >
            ← Back to home
          </Link>

          {/* Manifesto Content */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-24"
            >
              <h1 className={`text-7xl md:text-9xl font-normal mb-12 ${playfair.className}`}>
                The Relling Manifesto
              </h1>
              <p className="text-2xl md:text-3xl text-gray-400 max-w-3xl">
                A manifesto is a beacon of hope - something we want our employees, our customers,
                our investors and our industry to hold us accountable to.
              </p>
            </motion.div>

            <div className="space-y-32">
              {/* Preamble Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <h2 className={`text-4xl md:text-6xl font-normal ${playfair.className}`}>What We Believe</h2>
                <div className="space-y-6">
                  <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                    The pace of hardware innovation is throttled by testing infrastructure.
                    Complex compliance and regulations shouldn&apos;t slow down innovation.
                    Testing should be a catalyst, not a constraint.
                  </p>
                  <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                    Engineers should focus on building, not wrestling with test setups.
                    Hardware testing is stuck in the past while the rest of technology races forward.
                    The tools, methodologies, and infrastructure that validate our most critical
                    systems remain fragmented, inefficient, and siloed.
                  </p>
                  <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                    We&apos;re building a future where continuous testing accelerates innovation instead of impeding it.
                  </p>
                </div>
              </motion.div>

              {/* Testing Crisis Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <h2 className={`text-4xl md:text-6xl font-normal ${playfair.className}`}>The Testing Crisis</h2>
                <div className="space-y-6">
                  <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                    The story of American innovation has always been a story of validation. From Edison&apos;s
                    1,000 attempts at the light bulb to the relentless verification behind the Apollo missions,
                    breakthrough technologies emerge through rigorous testing. Yet today, we face a fundamental
                    bottleneck that silently constrains our capacity to innovate at scale.
                  </p>
                  <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                    In the decades since WWII, software development has reinvented itself with continuous
                    integration, automated testing, and DevOps philosophies. Meanwhile, hardware validation
                    methodologies remain largely anchored to paradigms established in the 1950s.
                  </p>
                  <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                    The spectral analyzer validating a modern communications system shares more DNA with
                    its Vietnam-era predecessor than with contemporary software testing frameworks. Test
                    procedures that should be parametric and version-controlled instead live in binders
                    and spreadsheets.
                  </p>
                </div>
              </motion.div>

              {/* Testing Is Broken Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <h2 className={`text-4xl md:text-6xl font-normal ${playfair.className}`}>Testing Is VERY Broken</h2>
                <div className="space-y-6">
                  <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                    This verification inertia throttles innovation in ways both visible and hidden:
                  </p>
                  <ul className="text-xl md:text-2xl text-gray-400 max-w-3xl space-y-4 list-disc pl-8">
                    <li>Design cycles stretch 2-3x beyond their theoretical minimum path</li>
                    <li>Our most talented engineers spend the majority of their time debugging test setups rather than pushing technological boundaries</li>
                    <li>Companies independently reinvent near-identical test infrastructure, fragmenting institutional knowledge that should be standardized</li>
                    <li>Critical national security and infrastructure modernization stalls in verification purgatory</li>
                    <li>Compliance frameworks become innovation killers rather than quality enhancers</li>
                  </ul>
                  <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                    The technical debt extends beyond schedule and capital. When validation is slow and unreliable,
                    engineers unconsciously constrain their design space. They optimize for what can be efficiently
                    verified rather than what could be truly transformative.
                  </p>
                </div>
              </motion.div>

              {/* Core Principles Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <h2 className={`text-4xl md:text-6xl font-normal ${playfair.className}`}>Core Principles</h2>
                <div className="space-y-12">
                  <div className="space-y-4">
                    <h3 className={`text-2xl md:text-3xl font-normal text-white ${playfair.className}`}>Standardization Creates the Foundation for Rapid, Sustained Innovation</h3>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                      The future of testing requires breaking free from proprietary islands of equipment.
                      When test infrastructure becomes truly modular and interoperable, setup times collapse
                      from days to minutes. Engineers can redirect their energy from wrestling with incompatible
                      systems to actual innovation.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className={`text-2xl md:text-3xl font-normal text-white ${playfair.className}`}>Test Infrastructure Should Be as Deployable and Reproducible as Modern Software</h3>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                      Hardware testing must escape its physical constraints by adopting the principles that
                      revolutionized software development. When test configurations live in code repositories
                      rather than engineers&apos; heads, they become reproducible, shareable assets rather than
                      fragile, one-off setups.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className={`text-2xl md:text-3xl font-normal text-white ${playfair.className}`}>Automation Should Be the Default State of Operation, Not a Special Case</h3>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                      Modern test systems must assume automation at every step, creating environments where
                      human intervention becomes a deliberate choice rather than a requirement. This shift
                      doesn&apos;t just eliminate tedious work&mdash;it fundamentally changes what&apos;s possible in
                      hardware development.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className={`text-2xl md:text-3xl font-normal text-white ${playfair.className}`}>Complex Systems Are Best Tested Through Networks of Simple, Focused Components</h3>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                      The most resilient test architectures decompose complex validation into networks of
                      single-purpose components. When each testing module follows the Unix philosophy of
                      doing one thing exceptionally well, the entire system becomes easier to understand,
                      maintain, and evolve.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className={`text-2xl md:text-3xl font-normal text-white ${playfair.className}`}>Physical Location Should Never Limit the Speed or Quality of Hardware Development</h3>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                      Testing infrastructure must transcend physical locations, enabling truly distributed
                      hardware development. When configurations, data, and insights flow seamlessly through
                      cloud interfaces, teams can collaborate across continents as effectively as across rooms.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className={`text-2xl md:text-3xl font-normal text-white ${playfair.className}`}>Actionable Insights Matter More Than Raw Data Collection and Storage</h3>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                      Engineers don&apos;t need more data&mdash;they need clarity. Modern testing platforms must transform
                      gigabytes of signals into sharp, actionable insights that illuminate root causes rather
                      than symptoms. This evolution from raw measurement to automated analysis doesn&apos;t just
                      save time&mdash;it fundamentally changes how engineers interact with their designs.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Path Forward Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <h2 className={`text-4xl md:text-6xl font-normal ${playfair.className}`}>Path Forward</h2>
                <div className="space-y-12">
                  <div className="space-y-4">
                    <h3 className={`text-2xl md:text-3xl font-normal text-white ${playfair.className}`}>Without a Testing Revolution, America&apos;s Manufacturing Renaissance Will Fail</h3>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                      The push to restore American manufacturing capacity faces a critical bottleneck in testing
                      infrastructure. Reshoring production without modernizing testing simply recreates outdated
                      systems on domestic soil. Building new manufacturing capacity gives us a once-in-a-generation
                      opportunity to rethink testing from first principles.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className={`text-2xl md:text-3xl font-normal text-white ${playfair.className}`}>The Consumer-Industrial Convergence Will Redefine Test Economics Forever</h3>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                      The distinction between &quot;industrial-grade&quot; and &quot;consumer&quot; hardware is collapsing before our eyes.
                      When a $50 sensor with open-source firmware can match the reliability of its $5,000 &quot;industrial&quot;
                      counterpart, the economics of testing fundamentally change. This hybrid approach delivers 90% of
                      the performance at 10% of the cost, unlocking testing capabilities for teams that could never
                      afford legacy solutions.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className={`text-2xl md:text-3xl font-normal text-white ${playfair.className}`}>Building Custom Test Infrastructure Is the Million-Dollar Mistake That Kills Hardware Companies</h3>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                      Building custom test infrastructure burns millions of dollars and months of engineering time
                      recreating capabilities that should be standardized. The most innovative hardware companies are
                      shifting from &quot;build everything&quot; to &quot;build only what creates competitive advantage.&quot;
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className={`text-2xl md:text-3xl font-normal text-white ${playfair.className}`}>Test Data Must Speak a Universal Language or Testing Will Remain Fragmented</h3>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                      The industry desperately needs a standard format for hardware test results &mdash; something like
                      JSON Schema but purpose-built for physical measurements. Right now, every testing platform
                      creates its own proprietary data formats, turning simple data comparison into a nightmare of
                      conversion scripts and compatibility issues.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className={`text-2xl md:text-3xl font-normal text-white ${playfair.className}`}>The Future Belongs to Products That Test Themselves Continuously in the Field</h3>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                      The artificial separation between testing and monitoring no longer makes sense. Modern hardware
                      should constantly evaluate its own performance against expected parameters, effectively testing
                      itself throughout its lifecycle. This approach transforms testing from a discrete phase in
                      development to a continuous process that extends into deployment.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="pt-16 border-t border-gray-800"
              >
                <h2 className={`text-4xl md:text-6xl font-normal mb-8 ${playfair.className}`}>Call to Action</h2>
                <div className="space-y-6">
                  <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                    The testing revolution has begun, and we&apos;re building the tools to accelerate it. Today, we&apos;re launching
                    two products that embody our principles:
                  </p>
                  <div className="space-y-4 pl-4 border-l-4 border-gray-700 py-2">
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                      <span className="text-white font-medium">Node</span> is built for mechanical engineers who want to focus on mechanical engineering&mdash;not wiring,
                      not programming, not data infrastructure. It eliminates the complexity of sensor integration,
                      providing instant connectivity for the full spectrum of industrial sensors, actuators, and controls.
                    </p>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                      <span className="text-white font-medium">Terminal</span> is our high-performance data acquisition system with integrated FPGA and real-time
                      processing capabilities. Unlike traditional vendor-locked solutions, Terminal is deliberately
                      vendor-agnostic, allowing engineers to select the best measurement tools for each specific challenge.
                    </p>
                  </div>
                  <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
                    Join us in rebuilding America&apos;s testing foundation. Let&apos;s create the infrastructure that unleashes
                    the full potential of our engineering talent and reclaims our position as the global leader
                    in hardware innovation.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Footer with Relling Systems */}
          <footer className="relative bg-gradient-to-b from-black via-neutral-950 to-black py-32">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)]" />
            <div className="container mx-auto px-4 relative">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`text-6xl md:text-[8rem] lg:text-[10rem] leading-[0.9] bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent text-center mb-16 py-4 ${playfair.className}`}
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
        </div>
      </main>
    </ErrorBoundary>
  );
}
