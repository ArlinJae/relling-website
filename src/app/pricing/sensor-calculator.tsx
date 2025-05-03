// FULL DARK MODE ENFORCED
'use client';

import React, { useState, useMemo } from 'react';
import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Sensor {
  id: string;
  name: string;
  channels: number;
  category: string;
  description: string;
  commonUses?: string[];
}

interface SelectedSensor {
  sensor: Sensor;
  quantity: number;
}

interface Machine {
  id: string;
  name: string;
  sensors: Sensor[];
  description: string;
  commonUses?: string[];
}

interface Preset {
  id: string;
  name: string;
  description: string;
  sensors: SelectedSensor[];
  machines: Machine[];
}

const commonSensors: Sensor[] = [
  { id: 'temp-rtd', name: 'RTD Temperature Sensor', channels: 1, category: 'Temperature', description: 'Precision temperature measurement' },
  { id: 'temp-array-8', name: '8-Channel Thermocouple Array', channels: 8, category: 'Temperature', description: 'Multi-point temperature monitoring' },
  { id: 'temp-array-32', name: '32-Channel Temp DAQ', channels: 32, category: 'Temperature', description: 'High-density temperature DAQ' },
  { id: 'press-gauge', name: 'Pressure Gauge', channels: 1, category: 'Pressure', description: 'Fluid/gas pressure' },
  { id: 'press-array-16', name: '16-Channel Pressure Array', channels: 16, category: 'Pressure', description: 'Multi-point pressure' },
  { id: 'flow-mag', name: 'Magnetic Flow Meter', channels: 2, category: 'Flow', description: 'Conductive liquid flow' },
  { id: 'flow-array-8', name: '8-Channel Flow DAQ', channels: 8, category: 'Flow', description: 'Multi-point flow' },
  { id: 'level-ultrasonic', name: 'Ultrasonic Level Sensor', channels: 1, category: 'Level', description: 'Liquid/solid level' },
  { id: 'level-array-12', name: '12-Channel Level Array', channels: 12, category: 'Level', description: 'Multi-point level' },
  { id: 'vib-accelerometer', name: '3-Axis Vibration Accelerometer', channels: 3, category: 'Vibration', description: '3-axis vibration' },
  { id: 'vib-array-16', name: '16-Channel Vibration Array', channels: 16, category: 'Vibration', description: 'Multi-point vibration' },
  { id: 'gas-co', name: 'CO Sensor', channels: 1, category: 'Gas', description: 'Carbon monoxide' },
  { id: 'gas-array-8', name: '8-Channel Gas DAQ', channels: 8, category: 'Gas', description: 'Multi-point gas' },
  { id: 'humidity-capacitive', name: 'Capacitive Humidity Sensor', channels: 1, category: 'Humidity', description: 'Relative humidity' },
  { id: 'humidity-array-8', name: '8-Channel Humidity DAQ', channels: 8, category: 'Humidity', description: 'Multi-point humidity' },
  { id: 'current-ct', name: 'Current Transformer', channels: 1, category: 'Electrical', description: 'AC current' },
  { id: 'daq-32', name: '32-Channel Universal DAQ', channels: 32, category: 'Electrical', description: 'Universal DAQ' },
  { id: 'strain-gauge', name: 'Strain Gauge', channels: 1, category: 'Strain', description: 'Strain measurement' },
  { id: 'strain-array-16', name: '16-Channel Strain Array', channels: 16, category: 'Strain', description: 'Multi-point strain' },
  { id: 'load-cell', name: 'Load Cell', channels: 1, category: 'Force', description: 'Force/load measurement' },
  { id: 'load-array-8', name: '8-Channel Load Cell Array', channels: 8, category: 'Force', description: 'Multi-point force' },
  { id: 'ph-sensor', name: 'pH Sensor', channels: 1, category: 'Chemical', description: 'pH measurement' },
  { id: 'ph-array-8', name: '8-Channel pH Array', channels: 8, category: 'Chemical', description: 'Multi-point pH' },
  { id: 'torque-sensor', name: 'Torque Sensor', channels: 1, category: 'Mechanical', description: 'Torque measurement' },
  { id: 'torque-array-8', name: '8-Channel Torque Array', channels: 8, category: 'Mechanical', description: 'Multi-point torque' },
  { id: 'light-sensor', name: 'Light Sensor', channels: 1, category: 'Optical', description: 'Light intensity' },
  { id: 'light-array-16', name: '16-Channel Light Array', channels: 16, category: 'Optical', description: 'Multi-point light' },
  { id: 'sound-sensor', name: 'Sound Sensor', channels: 1, category: 'Acoustic', description: 'Sound level' },
  { id: 'sound-array-8', name: '8-Channel Sound Array', channels: 8, category: 'Acoustic', description: 'Multi-point sound' },
  // ...add more as needed
];

const commonMachines: Machine[] = [
  {
    id: 'pump',
    name: 'Industrial Pump',
    sensors: [
      { id: 'pump-temp', name: 'Bearing Temperature', channels: 2, category: 'Temperature', description: 'Temperature monitoring for pump bearings' },
      { id: 'pump-vib', name: 'Vibration', channels: 3, category: 'Vibration', description: 'Vibration monitoring for pump health' },
      { id: 'pump-flow', name: 'Flow Rate', channels: 1, category: 'Flow', description: 'Pump output flow measurement' },
      { id: 'pump-current', name: 'Motor Current', channels: 1, category: 'Electrical', description: 'Motor current monitoring' },
      { id: 'pump-pressure', name: 'Suction/Discharge Pressure', channels: 2, category: 'Pressure', description: 'Pump pressure monitoring' },
    ],
    description: 'Standard industrial pump with comprehensive monitoring',
    commonUses: ['Water treatment', 'Chemical processing', 'HVAC systems']
  },
  {
    id: 'boiler',
    name: 'Industrial Boiler',
    sensors: [
      { id: 'boiler-temp', name: 'Steam Temperature', channels: 2, category: 'Temperature', description: 'Steam temperature monitoring' },
      { id: 'boiler-pressure', name: 'Steam Pressure', channels: 1, category: 'Pressure', description: 'Steam pressure monitoring' },
      { id: 'boiler-level', name: 'Water Level', channels: 1, category: 'Level', description: 'Boiler water level measurement' },
      { id: 'boiler-gas', name: 'O2 Level', channels: 1, category: 'Gas', description: 'Oxygen level in combustion chamber' },
      { id: 'boiler-flow', name: 'Feed Water Flow', channels: 1, category: 'Flow', description: 'Feed water flow measurement' },
      { id: 'boiler-fuel', name: 'Fuel Flow', channels: 1, category: 'Flow', description: 'Fuel consumption monitoring' },
      { id: 'boiler-stack', name: 'Stack Temperature', channels: 1, category: 'Temperature', description: 'Exhaust gas temperature' },
    ],
    description: 'Industrial boiler with comprehensive monitoring',
    commonUses: ['Power generation', 'Process heating', 'Steam generation']
  },
  {
    id: 'tank',
    name: 'Storage Tank',
    sensors: [
      { id: 'tank-level', name: 'Level Sensor', channels: 1, category: 'Level', description: 'Tank level measurement' },
      { id: 'tank-temp', name: 'Temperature', channels: 1, category: 'Temperature', description: 'Content temperature monitoring' },
      { id: 'tank-pressure', name: 'Pressure', channels: 1, category: 'Pressure', description: 'Tank pressure monitoring' },
      { id: 'tank-flow', name: 'Inlet/Outlet Flow', channels: 2, category: 'Flow', description: 'Tank flow monitoring' },
    ],
    description: 'Standard storage tank with level, temperature, and pressure monitoring',
    commonUses: ['Chemical storage', 'Fuel storage', 'Process tanks']
  },
  {
    id: 'compressor',
    name: 'Air Compressor',
    sensors: [
      { id: 'comp-temp', name: 'Discharge Temperature', channels: 1, category: 'Temperature', description: 'Compressed air temperature' },
      { id: 'comp-pressure', name: 'Discharge Pressure', channels: 1, category: 'Pressure', description: 'Compressed air pressure' },
      { id: 'comp-vib', name: 'Vibration', channels: 3, category: 'Vibration', description: 'Compressor vibration monitoring' },
      { id: 'comp-current', name: 'Motor Current', channels: 1, category: 'Electrical', description: 'Motor current monitoring' },
      { id: 'comp-flow', name: 'Air Flow', channels: 1, category: 'Flow', description: 'Compressed air flow measurement' },
      { id: 'comp-oil', name: 'Oil Temperature', channels: 1, category: 'Temperature', description: 'Lubrication oil temperature' },
    ],
    description: 'Industrial air compressor with comprehensive monitoring',
    commonUses: ['Manufacturing', 'Pneumatic systems', 'Process air']
  },
  {
    id: 'chiller',
    name: 'Industrial Chiller',
    sensors: [
      { id: 'chiller-temp', name: 'Water Temperature', channels: 2, category: 'Temperature', description: 'Supply/return water temperature' },
      { id: 'chiller-pressure', name: 'Refrigerant Pressure', channels: 2, category: 'Pressure', description: 'High/low side pressure' },
      { id: 'chiller-flow', name: 'Water Flow', channels: 1, category: 'Flow', description: 'Chilled water flow' },
      { id: 'chiller-current', name: 'Compressor Current', channels: 1, category: 'Electrical', description: 'Compressor motor current' },
      { id: 'chiller-vib', name: 'Vibration', channels: 3, category: 'Vibration', description: 'Compressor vibration' },
    ],
    description: 'Industrial chiller with comprehensive monitoring',
    commonUses: ['Process cooling', 'HVAC', 'Manufacturing']
  },
  {
    id: 'mixer',
    name: 'Industrial Mixer',
    sensors: [
      { id: 'mixer-temp', name: 'Bearing Temperature', channels: 2, category: 'Temperature', description: 'Bearing temperature monitoring' },
      { id: 'mixer-vib', name: 'Vibration', channels: 3, category: 'Vibration', description: 'Mixer vibration monitoring' },
      { id: 'mixer-current', name: 'Motor Current', channels: 1, category: 'Electrical', description: 'Motor current monitoring' },
      { id: 'mixer-torque', name: 'Torque', channels: 1, category: 'Electrical', description: 'Mixer torque monitoring' },
    ],
    description: 'Industrial mixer with comprehensive monitoring',
    commonUses: ['Chemical processing', 'Food & beverage', 'Pharmaceutical']
  },
  {
    id: 'conveyor',
    name: 'Industrial Conveyor',
    sensors: [
      { id: 'conv-speed', name: 'Speed Sensor', channels: 1, category: 'Electrical', description: 'Conveyor speed monitoring' },
      { id: 'conv-current', name: 'Motor Current', channels: 1, category: 'Electrical', description: 'Motor current monitoring' },
      { id: 'conv-temp', name: 'Bearing Temperature', channels: 2, category: 'Temperature', description: 'Bearing temperature monitoring' },
      { id: 'conv-vib', name: 'Vibration', channels: 3, category: 'Vibration', description: 'Conveyor vibration monitoring' },
    ],
    description: 'Industrial conveyor with comprehensive monitoring',
    commonUses: ['Manufacturing', 'Material handling', 'Packaging']
  },
  {
    id: 'oven',
    name: 'Industrial Oven',
    sensors: [
      { id: 'oven-temp', name: 'Temperature Zones', channels: 4, category: 'Temperature', description: 'Multiple zone temperature monitoring' },
      { id: 'oven-gas', name: 'Gas Sensors', channels: 2, category: 'Gas', description: 'Combustion gas monitoring' },
      { id: 'oven-flow', name: 'Air Flow', channels: 1, category: 'Flow', description: 'Air flow monitoring' },
      { id: 'oven-pressure', name: 'Pressure', channels: 1, category: 'Pressure', description: 'Internal pressure monitoring' },
    ],
    description: 'Industrial oven with comprehensive monitoring',
    commonUses: ['Heat treatment', 'Drying', 'Curing']
  },
  {
    id: 'reactor',
    name: 'Chemical Reactor',
    sensors: [
      { id: 'reactor-temp', name: 'Temperature Zones', channels: 3, category: 'Temperature', description: 'Multiple zone temperature monitoring' },
      { id: 'reactor-pressure', name: 'Pressure', channels: 1, category: 'Pressure', description: 'Reactor pressure monitoring' },
      { id: 'reactor-level', name: 'Level', channels: 1, category: 'Level', description: 'Reactor level monitoring' },
      { id: 'reactor-flow', name: 'Flow', channels: 2, category: 'Flow', description: 'Inlet/outlet flow monitoring' },
      { id: 'reactor-ph', name: 'pH Sensor', channels: 1, category: 'Electrical', description: 'pH monitoring' },
    ],
    description: 'Chemical reactor with comprehensive monitoring',
    commonUses: ['Chemical processing', 'Pharmaceutical', 'Food & beverage']
  },
  {
    id: 'generator',
    name: 'Industrial Generator',
    sensors: [
      { id: 'gen-voltage', name: 'Voltage', channels: 3, category: 'Electrical', description: 'Three-phase voltage monitoring' },
      { id: 'gen-current', name: 'Current', channels: 3, category: 'Electrical', description: 'Three-phase current monitoring' },
      { id: 'gen-temp', name: 'Temperature', channels: 2, category: 'Temperature', description: 'Generator temperature monitoring' },
      { id: 'gen-vib', name: 'Vibration', channels: 3, category: 'Vibration', description: 'Generator vibration monitoring' },
      { id: 'gen-flow', name: 'Coolant Flow', channels: 1, category: 'Flow', description: 'Coolant flow monitoring' },
    ],
    description: 'Industrial generator with comprehensive monitoring',
    commonUses: ['Power generation', 'Backup power', 'Cogeneration']
  }
];

const presets: Preset[] = [
  {
    id: 'basic-process',
    name: 'Basic Process Monitoring',
    description: 'Essential sensors for basic process monitoring and control',
    sensors: [
      { sensor: commonSensors.find(s => s.id === 'temp-rtd')!, quantity: 4 },
      { sensor: commonSensors.find(s => s.id === 'press-gauge')!, quantity: 2 },
      { sensor: commonSensors.find(s => s.id === 'level-ultrasonic')!, quantity: 1 },
      { sensor: commonSensors.find(s => s.id === 'flow-mag')!, quantity: 1 },
    ],
    machines: [commonMachines.find(m => m.id === 'pump')!]
  },
  {
    id: 'advanced-process',
    name: 'Advanced Process Control',
    description: 'Comprehensive monitoring for critical processes with high precision',
    sensors: [
      { sensor: commonSensors.find(s => s.id === 'temp-pt100')!, quantity: 6 },
      { sensor: commonSensors.find(s => s.id === 'press-differential')!, quantity: 3 },
      { sensor: commonSensors.find(s => s.id === 'flow-mag')!, quantity: 2 },
      { sensor: commonSensors.find(s => s.id === 'level-radar')!, quantity: 2 },
      { sensor: commonSensors.find(s => s.id === 'vib-accelerometer')!, quantity: 1 },
      { sensor: commonSensors.find(s => s.id === 'current-ct')!, quantity: 2 },
    ],
    machines: [
      commonMachines.find(m => m.id === 'pump')!,
      commonMachines.find(m => m.id === 'tank')!
    ]
  },
  {
    id: 'safety-critical',
    name: 'Safety Critical Systems',
    description: 'Comprehensive monitoring for safety-critical applications with redundant sensors',
    sensors: [
      { sensor: commonSensors.find(s => s.id === 'gas-co')!, quantity: 2 },
      { sensor: commonSensors.find(s => s.id === 'gas-o2')!, quantity: 2 },
      { sensor: commonSensors.find(s => s.id === 'press-absolute')!, quantity: 3 },
      { sensor: commonSensors.find(s => s.id === 'temp-thermocouple')!, quantity: 4 },
      { sensor: commonSensors.find(s => s.id === 'level-radar')!, quantity: 2 },
      { sensor: commonSensors.find(s => s.id === 'vib-accelerometer')!, quantity: 2 },
    ],
    machines: [
      commonMachines.find(m => m.id === 'boiler')!,
      commonMachines.find(m => m.id === 'reactor')!
    ]
  },
  {
    id: 'energy-management',
    name: 'Energy Management System',
    description: 'Comprehensive monitoring for energy efficiency and management',
    sensors: [
      { sensor: commonSensors.find(s => s.id === 'current-ct')!, quantity: 6 },
      { sensor: commonSensors.find(s => s.id === 'voltage-potential')!, quantity: 3 },
      { sensor: commonSensors.find(s => s.id === 'temp-rtd')!, quantity: 4 },
      { sensor: commonSensors.find(s => s.id === 'flow-mag')!, quantity: 2 },
      { sensor: commonSensors.find(s => s.id === 'press-gauge')!, quantity: 2 },
    ],
    machines: [
      commonMachines.find(m => m.id === 'compressor')!,
      commonMachines.find(m => m.id === 'chiller')!,
      commonMachines.find(m => m.id === 'generator')!
    ]
  },
  {
    id: 'manufacturing-line',
    name: 'Manufacturing Line',
    description: 'Comprehensive monitoring for manufacturing processes',
    sensors: [
      { sensor: commonSensors.find(s => s.id === 'temp-rtd')!, quantity: 4 },
      { sensor: commonSensors.find(s => s.id === 'vib-accelerometer')!, quantity: 3 },
      { sensor: commonSensors.find(s => s.id === 'current-ct')!, quantity: 4 },
      { sensor: commonSensors.find(s => s.id === 'flow-mag')!, quantity: 2 },
      { sensor: commonSensors.find(s => s.id === 'press-gauge')!, quantity: 2 },
    ],
    machines: [
      commonMachines.find(m => m.id === 'conveyor')!,
      commonMachines.find(m => m.id === 'mixer')!,
      commonMachines.find(m => m.id === 'oven')!
    ]
  }
];

export default function SensorCalculator() {
  const [selectedSensors, setSelectedSensors] = useState<SelectedSensor[]>([]);
  const [selectedMachines, setSelectedMachines] = useState<Machine[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSensors = useMemo(() => {
    return commonSensors.filter(sensor => {
      const matchesSearch = sensor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sensor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sensor.commonUses?.some(use => use.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    });
  }, [searchTerm]);

  const addSensor = (sensor: Sensor) => {
    setSelectedSensors(prev => {
      const existing = prev.find(s => s.sensor.id === sensor.id);
      if (existing) {
        return prev.map(s => 
          s.sensor.id === sensor.id 
            ? { ...s, quantity: s.quantity + 1 }
            : s
        );
      }
      return [...prev, { sensor, quantity: 1 }];
    });
  };

  const removeSensor = (sensorId: string) => {
    setSelectedSensors(prev => {
      const existing = prev.find(s => s.sensor.id === sensorId);
      if (existing && existing.quantity > 1) {
        return prev.map(s => 
          s.sensor.id === sensorId 
            ? { ...s, quantity: s.quantity - 1 }
            : s
        );
      }
      return prev.filter(s => s.sensor.id !== sensorId);
    });
  };

  const applyPreset = (preset: Preset) => {
    setSelectedSensors(preset.sensors);
    setSelectedMachines(preset.machines);
  };

  const addMachine = (machine: Machine) => {
    setSelectedMachines(prev => {
      if (!prev.find(m => m.id === machine.id)) {
        return [...prev, machine];
      }
      return prev;
    });
  };

  const totalChannels = (() => {
    const sensorChannels = selectedSensors.reduce((sum, { sensor, quantity }) => sum + (sensor.channels * quantity), 0);
    const machineChannels = selectedMachines.reduce((sum, machine) => sum + machine.sensors.reduce((sensorSum, sensor) => sensorSum + sensor.channels, 0), 0);
    return { total: sensorChannels + machineChannels, machineChannels };
  })();
  const numMachines = selectedMachines.length;
  const numSensors = selectedSensors.length + totalChannels.machineChannels;
  const storageTB = Math.ceil(numSensors / 6);
  // Node
  const nodeHardwareCost = numMachines * 6000;
  const nodeAnnualChannelCost = totalChannels.total * 200;
  const nodeAnnualStorageCost = storageTB * 50;
  const nodeAnnualTotal = nodeAnnualChannelCost + nodeAnnualStorageCost;
  const nodeFiveYearTotal = nodeHardwareCost + (nodeAnnualTotal * 5);
  // SCADA
  const scadaDevCost = 30000;
  let scadaPerChannel = 1000;
  if (totalChannels.total > 200) scadaPerChannel = 650;
  else if (totalChannels.total > 50) scadaPerChannel = 750;
  const scadaAnnualChannelCost = totalChannels.total * scadaPerChannel;
  const scadaAnnualStorageCost = storageTB * 70;
  const scadaAnnualTotal = scadaAnnualChannelCost + scadaAnnualStorageCost;
  const scadaFiveYearTotal = scadaDevCost + (scadaAnnualTotal * 5);
  const savings = Math.max(scadaFiveYearTotal - nodeFiveYearTotal, 0);

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="p-2 sm:p-6 bg-gray-900 rounded-b-lg">
      {/* Presets Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Start Presets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-left transition-colors border border-gray-700"
            >
              <h4 className="font-medium text-white mb-1">{preset.name}</h4>
              <p className="text-sm text-gray-300">{preset.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search sensors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Selected Items Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Selected Sensors & Machines</h3>
        <div className="space-y-4">
          {selectedSensors.map(({ sensor, quantity }) => (
            <div key={sensor.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div>
                <h4 className="font-medium text-white">{sensor.name}</h4>
                <p className="text-sm text-gray-300">{sensor.channels} channels</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeSensor(sensor.id)}
                    className="p-1 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="text-white font-medium">{quantity}</span>
                  <button
                    onClick={() => addSensor(sensor)}
                    className="p-1 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => removeSensor(sensor.id)}
                  className="p-1 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
          {selectedSensors.length === 0 && (
            <p className="text-gray-400 text-center py-4">No sensors selected</p>
          )}
        </div>
      </div>

      {/* Available Sensors Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Available Sensors</h3>
        <div className="space-y-4">
          {filteredSensors.map((sensor) => (
            <button
              key={sensor.id}
              onClick={() => addSensor(sensor)}
              className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-left transition-colors border border-gray-700"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-white">{sensor.name}</h4>
                <span className="text-sm text-gray-400">{sensor.channels} channels</span>
              </div>
              <p className="text-sm text-gray-300 mb-2">{sensor.description}</p>
              <div className="flex flex-wrap gap-2">
                {sensor.commonUses?.map((use) => (
                  <span key={use} className="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">
                    {use}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Available Machines Section */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Available Machines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {commonMachines.map((machine) => (
            <button
              key={machine.id}
              onClick={() => addMachine(machine)}
              className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-left transition-colors border border-gray-700"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-white">{machine.name}</h4>
                <span className="text-sm text-gray-400">{machine.sensors.reduce((sum, s) => sum + s.channels, 0)} channels</span>
              </div>
              <p className="text-sm text-gray-300 mb-2">{machine.description}</p>
              <div className="flex flex-wrap gap-2">
                {machine.sensors.map((sensor) => (
                  <span key={sensor.id} className="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">
                    {sensor.name}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cost Summary Section */}
      <div className="mt-8 p-4 sm:p-6 bg-gray-800 rounded-lg border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Cost Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Node</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Hardware/Development (one-time):</span>
                <span className="font-medium text-white">{formatCurrency(nodeHardwareCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Annual Channel Fees:</span>
                <span className="font-medium text-white">{formatCurrency(nodeAnnualChannelCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Annual Storage ({storageTB} TB):</span>
                <span className="font-medium text-white">{formatCurrency(nodeAnnualStorageCost)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-700">
                <span className="font-semibold text-white">Annual Total:</span>
                <span className="font-bold text-white">{formatCurrency(nodeAnnualTotal)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-700">
                <span className="font-semibold text-white">5-Year Total:</span>
                <span className="font-bold text-white">{formatCurrency(nodeFiveYearTotal)}</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Traditional SCADA</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Development/Deployment (one-time):</span>
                <span className="font-medium text-white">{formatCurrency(scadaDevCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Annual Channel Fees:</span>
                <span className="font-medium text-white">{formatCurrency(scadaAnnualChannelCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Annual Storage ({storageTB} TB):</span>
                <span className="font-medium text-white">{formatCurrency(scadaAnnualStorageCost)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-700">
                <span className="font-semibold text-white">Annual Total:</span>
                <span className="font-bold text-white">{formatCurrency(scadaAnnualTotal)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-700">
                <span className="font-semibold text-white">5-Year Total:</span>
                <span className="font-bold text-white">{formatCurrency(scadaFiveYearTotal)}</span>
              </div>
            </div>
          </div>
        </div>
        {/* 5-Year Savings Section */}
        <div className="mt-8 p-6 bg-gray-700 rounded-xl text-center shadow-lg">
          <h4 className="text-2xl font-extrabold text-gray-300 mb-2">5-Year Savings with Node</h4>
          <div className="text-4xl font-extrabold text-gray-400 mb-2">{formatCurrency(savings)}</div>
          <div className="text-lg text-gray-200 mb-4">Total savings over 5 years compared to SCADA</div>
          <div className="text-base text-gray-100 max-w-2xl mx-auto">
            <span className="font-semibold">How is this calculated?</span> <br />
            <span>
              We add up all up-front and annual costs for both systems over 5 years, including hardware, development, channel fees, and storage. Node&apos;s simple pricing and lower storage costs mean you save more as you scale.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 
