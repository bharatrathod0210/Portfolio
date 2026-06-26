/**
 * Hero 3D — cleaner “crystal core” look, scroll-reactive (works with Lenis + ScrollTrigger proxy).
 */
import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function useHeroScrollProgress() {
  const progress = useRef(0);
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return undefined;

    const st = ScrollTrigger.create({
      scroller: document.documentElement,
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.65,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    return () => st.kill();
  }, []);
  return progress;
}

function CrystalCore() {
  const outer = useRef();
  const halo = useRef();
  const inner = useRef();
  const scrollP = useHeroScrollProgress();
  const { mouse } = useThree();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = scrollP.current;
    const mx = mouse.x * 0.42;
    const my = mouse.y * 0.32;

    if (outer.current) {
      outer.current.rotation.y = t * 0.11 + p * 1.4;
      outer.current.rotation.x = Math.sin(t * 0.25) * 0.06 + p * 0.45;
      outer.current.position.x = THREE.MathUtils.damp(outer.current.position.x, mx * 0.9, 3.2, delta);
      outer.current.position.y = THREE.MathUtils.damp(outer.current.position.y, my * 0.9, 3.2, delta);
      outer.current.position.z = -p * 2.1;
    }
    if (halo.current) {
      halo.current.rotation.z = t * 0.09 - p * 0.8;
      halo.current.rotation.x = t * 0.14 + p * 0.2;
      halo.current.position.x = THREE.MathUtils.damp(halo.current.position.x, mx * 0.5, 2.8, delta);
      halo.current.position.y = THREE.MathUtils.damp(halo.current.position.y, my * 0.5, 2.8, delta);
    }
    if (inner.current) {
      inner.current.rotation.y = t * -0.18;
      inner.current.rotation.x = t * 0.12;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.85}>
      <group ref={outer}>
        <mesh ref={halo} rotation={[Math.PI / 2.2, 0, 0]}>
          <torusGeometry args={[2.15, 0.014, 16, 100]} />
          <meshBasicMaterial
            color="#67e8f9"
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        <mesh scale={1.55}>
          <icosahedronGeometry args={[1, 3]} />
          <MeshDistortMaterial
            color="#05030a"
            emissive="#9333ea"
            emissiveIntensity={1.05}
            distort={0.28}
            speed={1.6}
            roughness={0.14}
            metalness={0.88}
            transparent
            opacity={0.9}
          />
        </mesh>

        <mesh ref={inner} scale={0.62}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#0a1620"
            emissive="#22d3ee"
            emissiveIntensity={1.85}
            metalness={0.82}
            roughness={0.18}
            transparent
            opacity={0.78}
          />
        </mesh>

        <mesh scale={2.05}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial
            color="#c084fc"
            wireframe
            transparent
            opacity={0.11}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      <Sparkles count={48} scale={5.2} size={2} speed={0.32} opacity={0.5} color="#22d3ee" />
      <Sparkles count={32} scale={4} size={1.5} speed={0.26} opacity={0.4} color="#e9d5ff" />
    </Float>
  );
}

function Rig() {
  const { camera, mouse } = useThree();
  useFrame((_, delta) => {
    camera.position.x = THREE.MathUtils.damp(camera.position.x, mouse.x * 0.55, 2.4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, mouse.y * 0.38, 2.4, delta);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.2], fov: 48 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[8, 6, 8]} intensity={1.2} color="#c084fc" />
      <pointLight position={[-8, -4, -6]} intensity={0.85} color="#22d3ee" />
      <spotLight position={[0, 10, 6]} intensity={0.9} color="#a78bfa" angle={0.55} penumbra={1} />

      <group position={[0.95, 0.1, 0]}>
        <CrystalCore />
      </group>
      <Rig />
    </Canvas>
  );
}
