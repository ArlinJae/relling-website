'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  channels: number;
  Node: number;
  SCADA: number;
  difference: number;
}

const CostComparisonChart = () => {
  // Constants for cost calculations
  const NODE_INITIAL_COST = 6000;
  const NODE_COST_PER_CHANNEL = 150;
  
  // SCADA cost model - more expensive initial setup, lower per-channel costs at mid-range, very expensive at scale
  const SCADA_INITIAL_COST = 45000;
  const SCADA_LICENSE_COST = 15000; // Annual license 
  const SCADA_COST_PER_CHANNEL_SMALL = 250; // More expensive per channel initially
  const SCADA_COST_PER_CHANNEL_MEDIUM = 120; // Cheaper in the mid-range
  const SCADA_COST_PER_CHANNEL_LARGE = 180; // Expensive at scale (implementation complexity)
  const SCADA_INTEGRATION_COST_FACTOR = 1.2; // Additional cost factor as scale increases

  // Generate data points
  const generateData = (): DataPoint[] => {
    const data: DataPoint[] = [];
    const channelCounts = [5, 10, 25, 50, 75, 100, 150, 200, 300, 500, 750, 1000];
    
    for (const channels of channelCounts) {
      // Node cost calculation
      const nodeCost = NODE_INITIAL_COST + (channels * NODE_COST_PER_CHANNEL);
      
      // SCADA cost calculation with different per-channel costs based on scale
      let scadaChannelCost;
      if (channels <= 50) {
        scadaChannelCost = channels * SCADA_COST_PER_CHANNEL_SMALL;
      } else if (channels <= 150) {
        scadaChannelCost = channels * SCADA_COST_PER_CHANNEL_MEDIUM;
      } else {
        scadaChannelCost = channels * SCADA_COST_PER_CHANNEL_LARGE;
      }
      
      // Add increasing integration costs as scale increases
      const integrationFactor = 1 + (channels / 1000) * SCADA_INTEGRATION_COST_FACTOR;
      const scadaCost = SCADA_INITIAL_COST + SCADA_LICENSE_COST + (scadaChannelCost * integrationFactor);
      
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
    <div className="w-full h-full p-4 bg-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Node vs SCADA: Annual Cost Comparison</h2>
        <p className="text-gray-600">
          Cost comparison based on number of channels/sensors connected
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 30, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="channels" 
              label={{ value: 'Number of Channels/Sensors', position: 'bottom', offset: 0 }} 
            />
            <YAxis 
              tickFormatter={(tick) => `$${(tick/1000).toFixed(0)}k`}
              label={{ value: 'Annual Cost (USD)', angle: -90, position: 'insideLeft' }} 
            />
            <Tooltip formatter={(value) => formatCurrency(value as number)} />
            <Legend verticalAlign="top" />
            
            <Line 
              type="monotone" 
              dataKey="Node" 
              stroke="#00B5E2" 
              strokeWidth={3} 
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
              name="Node"
            />
            <Line 
              type="monotone" 
              dataKey="SCADA" 
              stroke="#3D4C5C" 
              strokeWidth={3}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
              name="Traditional SCADA"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Key Insights:</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li className="text-gray-700">
            <span className="font-semibold">Lower startup cost:</span> Node&apos;s initial investment of $6,000 makes it ideal for R&D environments and startups (vs $45K+ for SCADA)
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">Consistent pricing:</span> Node&apos;s simple $150/channel pricing makes budgeting predictable
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">Enterprise scalability:</span> Node becomes increasingly cost-effective at larger deployments (500+ channels) as SCADA integration complexity grows exponentially
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">Hidden savings:</span> This comparison doesn&apos;t even include the weeks of engineering time saved with Node&apos;s 2-line setup (vs custom programming)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <CostComparisonChart />
    </main>
  );
} 
