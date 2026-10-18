"use client";

import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollStore";

// Custom Paper Shader with fibers, speckles, vignette, and mouse lamp
const PaperShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(1920, 1080) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // Simple pseudo-random hash
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    // 2D Value Noise
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    // Fractal Brownian Motion for paper fiber texture
    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 4; i++) {
        v += a * noise(p);
        p *= 2.02;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 st = gl_FragCoord.xy / uResolution.xy;
      
      // Warm Paper Base Palette (#FBF8F2 top to #F3EADB bottom)
      vec3 paperTop = vec3(0.984, 0.972, 0.949);
      vec3 paperBottom = vec3(0.953, 0.917, 0.859);
      vec3 color = mix(paperTop, paperBottom, st.y);

      // Paper Fibers
      vec2 fiberCoord = st * vec2(uResolution.x / 18.0, uResolution.y / 18.0);
      float fiber = fbm(fiberCoord);
      color -= (fiber - 0.5) * 0.028;

      // Sparse Dark Speckles
      float speckleNoise = hash(floor(st * 480.0));
      if (speckleNoise > 0.994) {
        float speckleStrength = (speckleNoise - 0.994) / 0.006;
        color -= vec3(0.12, 0.10, 0.08) * speckleStrength * 0.35;
      }

      // Soft Warm Mouse Lamp Light
      float distToMouse = distance(st, uMouse);
      float lampLight = smoothstep(0.7, 0.0, distToMouse) * 0.045;
      color += vec3(0.06, 0.04, 0.01) * lampLight;

      // Soft Vignette at screen edges
      vec2 uvNorm = (vUv - 0.5) * 2.0;
      float vignette = 1.0 - dot(uvNorm, uvNorm) * 0.07;
      color *= clamp(vignette, 0.92, 1.0);

      gl_FragColor = vec4(color, 0.96);
    }
  `,
};

export function PaperShader() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [size]
  );

  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  useFrame((state, delta) => {
    if (meshRef.current) {
      uniforms.uTime.value += delta;
      uniforms.uResolution.value.set(size.width, size.height);

      // Ease mouse coordinates from scrollStore
      targetMouse.current.set(
        (scrollState.mouseX + 1.0) * 0.5,
        1.0 - (scrollState.mouseY + 1.0) * 0.5
      );
      uniforms.uMouse.value.lerp(targetMouse.current, 0.06);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        args={[PaperShaderMaterial]}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
