'use client';

import React from 'react';
import SensorCalculator from './sensor-calculator';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Transparent Pricing</h1>
        <p className="text-lg mb-8 text-center text-gray-400">
          Compare the true cost of Node vs. traditional SCADA. See your 5-year savings instantly.
        </p>
        {/* Cost Comparison Chart */}
        <section className="mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">Cost Comparison: Node vs. SCADA</h2>
            <ul className="mb-6 space-y-2">
              <li><span className="font-semibold text-blue-300">Node:</span> <span className="text-white">$6,000 hardware up front per machine, $200/channel/year, $0.05/GB/month storage ($50/TB/year)</span></li>
              <li><span className="font-semibold text-pink-300">SCADA:</span> <span className="text-white">$30,000 up front, $1,000/$750/$650/channel/year (tiered), $70/TB/year storage</span></li>
              <li><span className="font-semibold text-yellow-300">Storage:</span> <span className="text-white">1 TB per 6 sensors (rounded up)</span></li>
            </ul>
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex-1">
                <p className="mb-2 text-gray-300">Node&apos;s pricing is simple and transparent. SCADA systems often have hidden costs and require custom engineering.</p>
                <p className="mb-2 text-gray-300">All costs below are calculated for a 5-year period, including up-front and annual fees.</p>
                <p className="mb-2 text-gray-300">Savings are <span className="font-bold text-green-400">guaranteed</span> for most use cases.</p>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-green-900/80 border border-green-700 rounded-lg p-6 text-center">
                  <span className="block text-2xl font-bold text-green-300 mb-2">5-Year Savings Example</span>
                  <span className="block text-4xl font-extrabold text-green-400 mb-1">$100,000+</span>
                  <span className="block text-lg text-green-200">Typical savings for a 48-channel system</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ROI Explanation Section */}
        <section className="mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">How the Savings Add Up</h2>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li><span className="font-semibold text-blue-300">No custom programming:</span> Node&apos;s setup is plug-and-play, saving weeks of engineering time.</li>
              <li><span className="font-semibold text-blue-300">No hidden fees:</span> All costs are shown up front. No surprise maintenance or license bills.</li>
              <li><span className="font-semibold text-blue-300">Lower storage costs:</span> Node&apos;s cloud storage is <span className="font-bold">over 10x cheaper</span> than typical SCADA vendors.</li>
              <li><span className="font-semibold text-blue-300">Simple scaling:</span> Add channels or machines at a flat, predictable rate.</li>
            </ul>
            <div className="bg-blue-900/60 border border-blue-800 rounded-lg p-4 text-center">
              <span className="text-lg font-bold text-blue-200">Calculate your exact savings below!</span>
            </div>
          </div>
        </section>
        {/* Sensor Calculator Section */}
        <section className="mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">Interactive Cost Calculator</h2>
            <p className="mb-4 text-gray-300">Select your sensors and machines to see a detailed 5-year cost breakdown for both Node and SCADA. All numbers use the pricing model above.</p>
            <SensorCalculator />
          </div>
        </section>
        {/* Final Call to Action */}
        <section className="mb-12">
          <div className="bg-green-900/80 border border-green-700 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-extrabold text-green-300 mb-2">Ready to save?</h2>
            <p className="text-lg text-green-200 mb-4">Contact us for a custom quote or to see a live demo. Most customers save <span className="font-bold text-green-400">$100,000+</span> over 5 years compared to SCADA.</p>
            <a href="/contact" className="inline-block mt-4 px-6 py-3 bg-green-500 hover:bg-green-400 text-gray-900 font-bold rounded-lg transition">Get Started</a>
          </div>
        </section>
      </div>
    </main>
  );
} 
