"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollStore";

export function PaperPlane() {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Procedural Paper Plane BufferGeometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();

    // Triangle vertices for origami dart plane
    const vertices = new Float32Array([
      // Left Upper Wing
      0, 0, 1.4,
      -1.5, 0.2, -1.2,
      0, 0.05, -1.1,

      // Right Upper Wing
      0, 0, 1.4,
      0, 0.05, -1.1,
      1.5, 0.2, -1.2,

      // Left Fold Under-wing
      0, 0, 1.4,
      0, -0.3, -1.1,
      -1.5, 0.2, -1.2,

      // Right Fold Under-wing
      0, 0, 1.4,
      1.5, 0.2, -1.2,
      0, -0.3, -1.1,

      // Keel Fuselage Center
      0, 0, 1.4,
      0, 0.05, -1.1,
      0, -0.35, -1.1,
    ]);

    geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  // CatmullRom 3D flight trajectory from Journey Partner to Airplane Window
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(5.5, 3.0, -3.0),
      new THREE.Vector3(2.2, 1.2, -1.5),
      new THREE.Vector3(-1.8, 0.2, -0.8),
      new THREE.Vector3(0.5, -1.0, -0.2),
      new THREE.Vector3(-0.6, -2.2, 0.4),
      new THREE.Vector3(0.0, -3.2, 1.0),
    ]);
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const upVec = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  useFrame(() => {
    if (!groupRef.current) return;

    // journeyProgress is 0 when JourneyPartner enters view, reaching 1 at TravelPersonal
    const t = Math.max(0, Math.min(scrollState.journeyProgress, 1));

    // Only render/animate when active in journey range
    if (t <= 0.001 || t >= 0.999) {
      groupRef.current.visible = false;
      return;
    }

    groupRef.current.visible = true;

    // Get position and tangent from spline curve
    const pos = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();

    dummy.position.copy(pos);

    // Compute banking / roll based on curve tangent turn rate
    const lookAtPos = pos.clone().add(tangent);
    dummy.lookAt(lookAtPos);

    // Add dynamic banking roll
    const bankAngle = (tangent.x * -0.65) + Math.sin(t * Math.PI * 4) * 0.15;
    dummy.rotateZ(bankAngle);

    groupRef.current.position.copy(dummy.position);
    groupRef.current.quaternion.copy(dummy.quaternion);

    // Fade out near the end as it flies into the airplane window
    if (materialRef.current) {
      let opacity = 1.0;
      if (t < 0.1) {
        opacity = t / 0.1;
      } else if (t > 0.85) {
        opacity = (1.0 - t) / 0.15;
      }
      materialRef.current.opacity = Math.max(0, Math.min(opacity, 1));
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      <mesh geometry={geometry} scale={[0.42, 0.42, 0.42]}>
        <meshStandardMaterial
          ref={materialRef}
          color="#FAF6EE"
          roughness={0.65}
          metalness={0.05}
          flatShading={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
