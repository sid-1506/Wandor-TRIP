"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollStore";

const COUNT = 120;

export function Dust() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Particle properties
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < COUNT; i++) {
      data.push({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 12,
        z: -1 + Math.random() * 2,
        speed: 0.12 + Math.random() * 0.28,
        swaySpeed: 0.4 + Math.random() * 0.8,
        swayAmplitude: 0.08 + Math.random() * 0.14,
        phase: Math.random() * Math.PI * 2,
        size: 0.02 + Math.random() * 0.035,
        color:
          Math.random() > 0.4
            ? new THREE.Color("#FAF6EE") // Cream
            : new THREE.Color("#D9A877"), // Sand / Pollen
      });
    }
    return data;
  }, []);

  // Set initial colors on the instanced mesh
  React.useEffect(() => {
    if (meshRef.current) {
      particles.forEach((p, i) => {
        meshRef.current?.setColorAt(i, p.color);
      });
      if (meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
      }
    }
  }, [particles]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const velocityFactor = Math.min(Math.abs(scrollState.velocity || 0) * 0.02, 1.5);

    particles.forEach((p, i) => {
      // Drift upward, reacting to scroll velocity
      p.y += (p.speed + velocityFactor * 0.4) * delta;
      if (p.y > 6.5) {
        p.y = -6.5;
        p.x = (Math.random() - 0.5) * 16;
      }

      // Horizontal sway
      const sway = Math.sin(state.clock.elapsedTime * p.swaySpeed + p.phase) * p.swayAmplitude;
      const velocitySway = (scrollState.velocity || 0) * 0.005;

      dummy.position.set(p.x + sway + velocitySway, p.y, p.z);
      dummy.scale.set(p.size, p.size, p.size);
      dummy.updateMatrix();

      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]} position={[0, 0, 0]}>
      <circleGeometry args={[1, 8]} />
      <meshBasicMaterial
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </instancedMesh>
  );
}
