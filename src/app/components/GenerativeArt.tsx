'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, Suspense } from 'react';
import * as THREE from 'three';
import React from 'react';

function Lines() {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < 50; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      p.push(new THREE.Vector3(x, y, z));
    }
    return p;
  }, []);

  const lineRef = useRef();

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    lineRef.current.rotation.x = elapsed * 0.1;
    lineRef.current.rotation.y = elapsed * 0.15;
    points.forEach((point, i) => {
      const wave = Math.sin(elapsed + i * 0.1) * 0.5;
      point.y += wave * 0.01;
    });
    lineRef.current.geometry.setFromPoints(points);
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color="#ffffff" linewidth={1} opacity={0.1} transparent />
    </line>
  );
}

function FloatingParticles() {
  const count = 100;
  const mesh = useRef();
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    mesh.current.rotation.x = elapsed * 0.05;
    mesh.current.rotation.y = elapsed * 0.075;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        opacity={0.2}
        transparent
        sizeAttenuation
      />
    </points>
  );
}

export default function GenerativeArt() {
  // Add error boundary handling
  const handleError = (error: any) => {
    console.error('WebGL Error:', error);
    return null;
  };

  return (
    <ErrorBoundary fallback={<FallbackGradient />}>
      <Suspense fallback={<FallbackGradient />}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          onError={handleError}
        >
          <ambientLight intensity={0.5} />
          <Lines />
          <FloatingParticles />
        </Canvas>
      </Suspense>
    </ErrorBoundary>
  );
}

// Fallback component when WebGL fails
function FallbackGradient() {
  return (
    <div 
      className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-purple-500/5 to-transparent"
      style={{
        background: 'radial-gradient(circle at center, rgba(59,130,246,0.05), rgba(147,51,234,0.05), transparent)'
      }}
    />
  );
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
} 