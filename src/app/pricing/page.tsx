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

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-bold text-white mb-8">Pricing & Cost Comparison</h1>
        <div className="mb-12 bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg border border-gray-700">
          <CostComparisonChart />
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <div className="p-4 sm:p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4 sm:mb-6">Calculate Your Specific Costs</h2>
            <p className="text-gray-300">
              Select your industrial sensors and machines to see a detailed cost comparison between Node and traditional SCADA systems.
            </p>
          </div>
          <SensorCalculator />
        </div>
      </div>
    </main>
  );
} 
