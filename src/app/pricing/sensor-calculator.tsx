'use client';

import React, { useState } from 'react';

interface Sensor {
  id: string;
  name: string;
  channels: number;
  category: string;
  description: string;
}

interface Machine {
  id: string;
  name: string;
  sensors: Sensor[];
  description: string;
}

const commonSensors: Sensor[] = [
  // Temperature Sensors
  { id: 'temp-rtd', name: 'RTD Temperature Sensor', channels: 1, category: 'Temperature', description: 'Resistance Temperature Detector for precise temperature measurement' },
  { id: 'temp-thermocouple', name: 'Thermocouple', channels: 1, category: 'Temperature', description: 'Temperature sensor for high-temperature applications' },
  { id: 'temp-ir', name: 'Infrared Temperature Sensor', channels: 1, category: 'Temperature', description: 'Non-contact temperature measurement' },
  
  // Pressure Sensors
  { id: 'press-gauge', name: 'Pressure Gauge', channels: 1, category: 'Pressure', description: 'Measures fluid or gas pressure' },
  { id: 'press-differential', name: 'Differential Pressure Sensor', channels: 2, category: 'Pressure', description: 'Measures pressure difference between two points' },
  
  // Flow Sensors
  { id: 'flow-mag', name: 'Magnetic Flow Meter', channels: 2, category: 'Flow', description: 'Measures flow rate of conductive liquids' },
  { id: 'flow-ultrasonic', name: 'Ultrasonic Flow Meter', channels: 2, category: 'Flow', description: 'Non-invasive flow measurement' },
  
  // Level Sensors
  { id: 'level-ultrasonic', name: 'Ultrasonic Level Sensor', channels: 1, category: 'Level', description: 'Measures liquid or solid levels' },
  { id: 'level-radar', name: 'Radar Level Sensor', channels: 1, category: 'Level', description: 'High-precision level measurement' },
  
  // Vibration Sensors
  { id: 'vib-accelerometer', name: 'Vibration Accelerometer', channels: 3, category: 'Vibration', description: '3-axis vibration measurement' },
  
  // Gas Sensors
  { id: 'gas-co', name: 'CO Sensor', channels: 1, category: 'Gas', description: 'Carbon monoxide detection' },
  { id: 'gas-o2', name: 'O2 Sensor', channels: 1, category: 'Gas', description: 'Oxygen level measurement' },
];

const commonMachines: Machine[] = [
  {
    id: 'pump',
    name: 'Industrial Pump',
    sensors: [
      { id: 'pump-temp', name: 'Bearing Temperature', channels: 2, category: 'Temperature', description: 'Temperature monitoring for pump bearings' },
      { id: 'pump-vib', name: 'Vibration', channels: 3, category: 'Vibration', description: 'Vibration monitoring for pump health' },
      { id: 'pump-flow', name: 'Flow Rate', channels: 1, category: 'Flow', description: 'Pump output flow measurement' },
    ],
    description: 'Standard industrial pump with temperature, vibration, and flow monitoring'
  },
  {
    id: 'boiler',
    name: 'Industrial Boiler',
    sensors: [
      { id: 'boiler-temp', name: 'Steam Temperature', channels: 2, category: 'Temperature', description: 'Steam temperature monitoring' },
      { id: 'boiler-pressure', name: 'Steam Pressure', channels: 1, category: 'Pressure', description: 'Steam pressure monitoring' },
      { id: 'boiler-level', name: 'Water Level', channels: 1, category: 'Level', description: 'Boiler water level measurement' },
      { id: 'boiler-gas', name: 'O2 Level', channels: 1, category: 'Gas', description: 'Oxygen level in combustion chamber' },
    ],
    description: 'Industrial boiler with comprehensive monitoring'
  },
  {
    id: 'tank',
    name: 'Storage Tank',
    sensors: [
      { id: 'tank-level', name: 'Level Sensor', channels: 1, category: 'Level', description: 'Tank level measurement' },
      { id: 'tank-temp', name: 'Temperature', channels: 1, category: 'Temperature', description: 'Content temperature monitoring' },
      { id: 'tank-pressure', name: 'Pressure', channels: 1, category: 'Pressure', description: 'Tank pressure monitoring' },
    ],
    description: 'Standard storage tank with level, temperature, and pressure monitoring'
  },
];

interface CostCalculation {
  totalChannels: number;
  nodeCost: number;
  scadaCost: number;
  savings: number;
}

const calculateCosts = (totalChannels: number): CostCalculation => {
  const NODE_INITIAL_COST = 6000;
  const NODE_COST_PER_CHANNEL = 150;
  const SCADA_INITIAL_COST = 45000;
  const SCADA_LICENSE_COST = 15000;
  
  let scadaChannelCost;
  if (totalChannels <= 50) {
    scadaChannelCost = totalChannels * 250;
  } else if (totalChannels <= 150) {
    scadaChannelCost = totalChannels * 120;
  } else {
    scadaChannelCost = totalChannels * 180;
  }
  
  const integrationFactor = 1 + (totalChannels / 1000) * 1.2;
  const nodeCost = NODE_INITIAL_COST + (totalChannels * NODE_COST_PER_CHANNEL);
  const scadaCost = SCADA_INITIAL_COST + SCADA_LICENSE_COST + (scadaChannelCost * integrationFactor);
  
  return {
    totalChannels,
    nodeCost: Math.round(nodeCost),
    scadaCost: Math.round(scadaCost),
    savings: Math.round(scadaCost - nodeCost)
  };
};

export default function SensorCalculator() {
  const [selectedSensors, setSelectedSensors] = useState<Sensor[]>([]);
  const [selectedMachines, setSelectedMachines] = useState<Machine[]>([]);
  const [costs, setCosts] = useState<CostCalculation | null>(null);

  const addSensor = (sensor: Sensor) => {
    setSelectedSensors([...selectedSensors, sensor]);
  };

  const removeSensor = (sensorId: string) => {
    setSelectedSensors(selectedSensors.filter(s => s.id !== sensorId));
  };

  const addMachine = (machine: Machine) => {
    setSelectedMachines([...selectedMachines, machine]);
  };

  const removeMachine = (machineId: string) => {
    setSelectedMachines(selectedMachines.filter(m => m.id !== machineId));
  };

  const calculateTotalChannels = () => {
    const sensorChannels = selectedSensors.reduce((sum, sensor) => sum + sensor.channels, 0);
    const machineChannels = selectedMachines.reduce((sum, machine) => 
      sum + machine.sensors.reduce((sensorSum, sensor) => sensorSum + sensor.channels, 0), 0);
    return sensorChannels + machineChannels;
  };

  const updateCosts = () => {
    const totalChannels = calculateTotalChannels();
    setCosts(calculateCosts(totalChannels));
  };

  React.useEffect(() => {
    updateCosts();
  }, [selectedSensors, selectedMachines]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Industrial Sensor Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Available Sensors */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Available Sensors</h3>
          <div className="space-y-4">
            {commonSensors.map(sensor => (
              <div key={sensor.id} className="border p-4 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{sensor.name}</h4>
                    <p className="text-sm text-gray-600">{sensor.description}</p>
                    <p className="text-sm text-gray-500">Channels: {sensor.channels}</p>
                  </div>
                  <button
                    onClick={() => addSensor(sensor)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Machines */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Available Machines</h3>
          <div className="space-y-4">
            {commonMachines.map(machine => (
              <div key={machine.id} className="border p-4 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{machine.name}</h4>
                    <p className="text-sm text-gray-600">{machine.description}</p>
                    <p className="text-sm text-gray-500">
                      Sensors: {machine.sensors.map(s => s.name).join(', ')}
                    </p>
                    <p className="text-sm text-gray-500">
                      Total Channels: {machine.sensors.reduce((sum, s) => sum + s.channels, 0)}
                    </p>
                  </div>
                  <button
                    onClick={() => addMachine(machine)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Items */}
        <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Selected Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Selected Sensors</h4>
              {selectedSensors.map(sensor => (
                <div key={sensor.id} className="flex justify-between items-center p-2 bg-gray-50 rounded mb-2">
                  <span>{sensor.name} ({sensor.channels} channels)</span>
                  <button
                    onClick={() => removeSensor(sensor.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-medium mb-2">Selected Machines</h4>
              {selectedMachines.map(machine => (
                <div key={machine.id} className="flex justify-between items-center p-2 bg-gray-50 rounded mb-2">
                  <span>{machine.name} ({machine.sensors.reduce((sum, s) => sum + s.channels, 0)} channels)</span>
                  <button
                    onClick={() => removeMachine(machine.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cost Comparison */}
        {costs && (
          <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Cost Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded">
                <h4 className="font-medium text-blue-800">Total Channels</h4>
                <p className="text-2xl font-bold text-blue-900">{costs.totalChannels}</p>
              </div>
              <div className="p-4 bg-green-50 rounded">
                <h4 className="font-medium text-green-800">Node Cost</h4>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(costs.nodeCost)}</p>
              </div>
              <div className="p-4 bg-red-50 rounded">
                <h4 className="font-medium text-red-800">SCADA Cost</h4>
                <p className="text-2xl font-bold text-red-900">{formatCurrency(costs.scadaCost)}</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h4 className="font-medium text-gray-800">Potential Savings with Node</h4>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(costs.savings)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
