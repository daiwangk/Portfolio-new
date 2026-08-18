'use client'

import { useRef, useEffect, useMemo, type RefObject } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const VERT = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const FRAG = /* glsl */`
precision mediump float;
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

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

void main() {
  // Animated grain — frame varies with time
  float grain = hash(vUv * 580.0 + floor(uTime * 24.0) * vec2(7.3, 13.7));

  // Cursor warmth — grain subtly intensifies near cursor
  vec2 cursor = uMouse * 0.5 + 0.5; // convert NDC to UV
  float d = length(vUv - cursor);
  float warm = smoothstep(0.3, 0.0, d);
  
  // Organic noise layer near cursor for texture depth
  float org = noise(vUv * 12.0 + uTime * 0.3) * warm * 0.4;
  
  float alpha = (grain * 0.038 + org * 0.012);

  // Near-black grain on warm off-white bg
  gl_FragColor = vec4(0.118, 0.112, 0.108, alpha);
}
`

function GrainPlane({ mouseRef }: { mouseRef: RefObject<{ nx: number; ny: number }> }) {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport } = useThree()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), [])

  useFrame(({ clock }) => {
    if (!matRef.current) return
    matRef.current.uniforms.uTime.value = clock.elapsedTime
    if (mouseRef.current) {
      matRef.current.uniforms.uMouse.value.set(
        mouseRef.current.nx,
        mouseRef.current.ny,
      )
    }
  })

  useEffect(() => {
    return () => {
      // Explicit disposal on unmount
      if (matRef.current) matRef.current.dispose()
    }
  }, [])

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.MultiplyBlending}
      />
    </mesh>
  )
}

export { GrainPlane }
