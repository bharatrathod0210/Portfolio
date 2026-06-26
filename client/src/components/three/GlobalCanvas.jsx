import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[1, 0]} position={[2, 0, -5]}>
        <MeshDistortMaterial
          color="#D4AF37"
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={2}
          wireframe={true}
        />
      </Icosahedron>
    </Float>
  );
}

function FloatingGeometryPlatinum() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * -0.12;
      meshRef.current.rotation.y = state.clock.elapsedTime * -0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
      <Icosahedron ref={meshRef} args={[1.5, 0]} position={[-3, -2, -8]}>
        <MeshDistortMaterial
          color="#E5E4E2"
          roughness={0.1}
          metalness={0.9}
          distort={0.2}
          speed={1.5}
          wireframe={true}
          transparent
          opacity={0.3}
        />
      </Icosahedron>
    </Float>
  );
}

export default function GlobalCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#D4AF37" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#E5E4E2" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} color="#D4AF37" />
        <FloatingGeometry />
        <FloatingGeometryPlatinum />
      </Canvas>
    </div>
  );
}
