import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Fallback static illustration when WebGL is unsupported or reduced motion is active
export function HeroFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-neutral-200/50 blur-3xl"></div>
      <div className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-neutral-300 flex items-center justify-center p-4 bg-white/90 backdrop-blur-xl shadow-xl">
        <div className="text-center font-mono space-y-2">
          <div className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 font-mono">LA</div>
          <div className="text-xs text-neutral-700 font-semibold tracking-wider uppercase">Full-Stack Core</div>
          <div className="text-[11px] text-neutral-500 font-medium">PHP • JS • Node • SQL</div>
        </div>
      </div>
    </div>
  );
}

// Tech node in 3D orbit
function OrbitingNode({ 
  position, 
  color, 
  size = 0.35, 
  label 
}: { 
  position: [number, number, number]; 
  color: string; 
  size?: number; 
  label: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1.0} floatIntensity={1.2} position={position}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[size, 0]} />
        <meshStandardMaterial 
          color="#1e293b" 
          wireframe 
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
}

// Particle field
function Particles({ count = 60 }) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 12;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 12;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return coords;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.035} 
        color="#94a3b8" 
        transparent 
        opacity={0.5} 
        sizeAttenuation 
      />
    </points>
  );
}

// Central glowing core
function CentralCore() {
  const coreRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <group ref={coreRef}>
      {/* Outer organic distorted sphere */}
      <Sphere args={[1.2, 48, 48]}>
        <MeshDistortMaterial
          color="#334155"
          roughness={0.3}
          metalness={0.7}
          distort={0.25}
          speed={1.5}
          wireframe
        />
      </Sphere>

      {/* Inner geometric core */}
      <Sphere args={[0.6, 24, 24]}>
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.5}
        />
      </Sphere>
      
      {/* Orbital wireframe rings */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[2.0, 2.03, 64]} />
        <meshBasicMaterial color="#94a3b8" side={THREE.DoubleSide} transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <ringGeometry args={[2.5, 2.53, 64]} />
        <meshBasicMaterial color="#64748b" side={THREE.DoubleSide} transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ mouse }) => {
    if (groupRef.current) {
      // Smooth parallax reaction to mouse
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.35, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.25, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 5]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.9} color="#e2e8f0" />

      <CentralCore />
      <Particles count={50} />

      {/* Tech Nodes in Orbital Space */}
      <OrbitingNode position={[2.6, 1.2, 0.5]} color="#475569" label="PHP" />
      <OrbitingNode position={[-2.4, -1.4, 0.8]} color="#475569" label="React" />
      <OrbitingNode position={[1.8, -2.1, -0.6]} color="#475569" label="Next.js" />
      <OrbitingNode position={[-2.2, 1.8, -0.8]} color="#475569" label="Node.js" />
      <OrbitingNode position={[0, 2.7, -1.2]} color="#475569" label="PostgreSQL" />
      <OrbitingNode position={[-0.8, -2.6, 1.1]} color="#475569" label="MySQL" />
      <OrbitingNode position={[2.8, -0.4, 1.2]} color="#475569" label="Tailwind" />
    </group>
  );
}

export default function Hero3D() {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [prefersReduced, setPrefersReduced] = useState<boolean>(false);
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(motionQuery.matches);

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasMounted) {
    return <HeroFallback />;
  }

  if (prefersReduced || !hasWebGL) {
    return <HeroFallback />;
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[560px] select-none">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
