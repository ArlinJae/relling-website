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

export default function Page() {
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
    <main className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
        <h1 className="text-3xl font-bold text-white mb-8">Pricing & Cost Comparison</h1>
        <div className="mb-12 bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg border border-gray-700">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 40, right: 30, left: 50, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="channels" 
                  label={{ value: 'Number of Channels/Sensors', position: 'insideBottom', offset: -10 }}
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                />
                <YAxis 
                  tickFormatter={(tick) => `$${(tick/1000).toFixed(0)}k`}
                  label={{ value: 'Annual Cost (USD)', angle: -90, position: 'insideLeft', offset: 20 }}
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
