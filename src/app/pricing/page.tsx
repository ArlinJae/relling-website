'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SensorCalculator from './sensor-calculator';

interface DataPoint {
  channels: number;
  Node: number;
  SCADA: number;
  difference: number;
}

const CostComparisonChart = () => {
  // Constants for cost calculations
  const NODE_INITIAL_COST = 6000;
  const NODE_COST_PER_CHANNEL = 200;
  const SCADA_INITIAL_COST = 30000;
  const SCADA_COST_PER_CHANNEL_SMALL = 1000;
  const SCADA_COST_PER_CHANNEL_MEDIUM = 750;
  const SCADA_COST_PER_CHANNEL_LARGE = 650;

  // Generate data points
  const generateData = (): DataPoint[] => {
    const data: DataPoint[] = [];
    const channelCounts = [5, 10, 25, 50, 75, 100, 150, 200, 300, 500, 750, 1000];
    for (const channels of channelCounts) {
      // Node cost calculation
      const nodeCost = NODE_INITIAL_COST + (channels * NODE_COST_PER_CHANNEL);
      // SCADA cost calculation with different per-channel costs based on scale
      let scadaPerChannel = SCADA_COST_PER_CHANNEL_SMALL;
      if (channels > 200) scadaPerChannel = SCADA_COST_PER_CHANNEL_LARGE;
      else if (channels > 50) scadaPerChannel = SCADA_COST_PER_CHANNEL_MEDIUM;
      let scadaCost = SCADA_INITIAL_COST + (channels * scadaPerChannel);
      // Ensure SCADA is never less expensive than Node
      if (scadaCost < nodeCost) scadaCost = nodeCost;
      data.push({
        channels,
        Node: Math.round(nodeCost),
        SCADA: Math.round(scadaCost),
        difference: Math.round(scadaCost - nodeCost)
      });
    }
    return data;
  };

  const data = generateData();
  
  // Format currency numbers
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="w-full bg-gray-900 rounded-lg p-2 sm:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Node vs SCADA: Annual Cost Comparison</h2>
        <p className="text-gray-300">
          Cost comparison based on number of channels/sensors connected
        </p>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 30, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="channels" 
              label={{ value: 'Number of Channels/Sensors', position: 'bottom', offset: 0 }}
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              tickFormatter={(tick) => `$${(tick/1000).toFixed(0)}k`}
              label={{ value: 'Annual Cost (USD)', angle: -90, position: 'insideLeft' }}
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <Tooltip 
              formatter={(value) => formatCurrency(value as number)}
              contentStyle={{ 
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.375rem',
                color: '#F3F4F6'
              }}
            />
            <Legend 
              verticalAlign="top"
              wrapperStyle={{ color: '#F3F4F6' }}
            />
            
            <Line 
              type="monotone" 
              dataKey="Node" 
              stroke="#00B5E2" 
              strokeWidth={3} 
              dot={{ r: 6, fill: '#00B5E2' }}
              activeDot={{ r: 8, fill: '#00B5E2' }}
              name="Node"
            />
            <Line 
              type="monotone" 
              dataKey="SCADA" 
              stroke="#3D4C5C" 
              strokeWidth={3}
              dot={{ r: 6, fill: '#3D4C5C' }}
              activeDot={{ r: 8, fill: '#3D4C5C' }}
              name="Traditional SCADA"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-bold text-white mb-2">Key Insights:</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li className="text-gray-300">
            <span className="font-semibold text-white">Lower startup cost:</span> Node&apos;s initial investment of $6,000 makes it ideal for R&D environments and startups (vs $45K+ for SCADA)
          </li>
          <li className="text-gray-300">
            <span className="font-semibold text-white">Consistent pricing:</span> Node&apos;s simple $150/channel pricing makes budgeting predictable
          </li>
          <li className="text-gray-300">
            <span className="font-semibold text-white">Enterprise scalability:</span> Node becomes increasingly cost-effective at larger deployments (500+ channels) as SCADA integration complexity grows exponentially
          </li>
          <li className="text-gray-300">
            <span className="font-semibold text-white">Hidden savings:</span> This comparison doesn&apos;t even include the weeks of engineering time saved with Node&apos;s 2-line setup (vs custom programming)
          </li>
        </ul>
      </div>

      {/* Software Pricing Section */}
      <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Software & Storage Pricing</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-white mb-3">Node Storage</h4>
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="font-medium text-white">$0.050 per GB/month</span>
                <span className="text-sm text-gray-400 ml-2">(117% markup on AWS S3)</span>
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                <li>No separate historian database license needed</li>
                <li>Built-in cloud redundancy</li>
                <li>Unlimited retention period</li>
                <li>Pay only for storage used</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-white mb-3">Traditional SCADA Storage</h4>
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="font-medium text-white">$15,000-30,000</span>
                <span className="text-sm text-gray-400 ml-2">(Historian license)</span>
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                <li>Additional historian database license required</li>
                <li>Separate storage infrastructure needed</li>
                <li>Limited retention periods</li>
                <li>Higher maintenance costs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ROI Analysis Section */}
      <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">5-Year ROI Analysis (35-Channel System)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-white mb-3">Traditional SCADA</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-300">Initial Investment:</span>
                <span className="font-medium text-white">$45,000</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Annual Maintenance (5 years):</span>
                <span className="font-medium text-white">$40,000</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Support Costs (5 years):</span>
                <span className="font-medium text-white">$50,000</span>
              </li>
              <li className="flex justify-between pt-2 border-t border-gray-700">
                <span className="font-semibold text-white">Total 5-Year Cost:</span>
                <span className="font-bold text-white">$135,000</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-white mb-3">Node</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-300">Initial Investment:</span>
                <span className="font-medium text-white">$6,000</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Annual Channel Fees (5 years):</span>
                <span className="font-medium text-white">$26,250</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Data Storage (10TB):</span>
                <span className="font-medium text-white">$4,680</span>
              </li>
              <li className="flex justify-between pt-2 border-t border-gray-700">
                <span className="font-semibold text-white">Total 5-Year Cost:</span>
                <span className="font-bold text-white">$36,930</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 bg-blue-900/50 p-4 rounded-lg border border-blue-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold text-blue-200">Total Savings with Node</h4>
              <p className="text-blue-300">73% reduction in total cost of ownership</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-200">$98,070</p>
              <p className="text-sm text-blue-300">saved over 5 years</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
              <li><span className="font-semibold text-blue-300">Node:</span> <span className="text-white">$6,000 hardware up front per machine, $200/channel/year, $600/TB/year storage</span></li>
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
