import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { lenis } from '../lenis'
import './ParticleField.css'

const PARTICLE_COUNT = 1200
const CUBE_MIN = -8
const CUBE_MAX = 8
const CAMERA_Z_START = 5
const CAMERA_Z_END = 3

function Particles() {
    const pointsRef = useRef(null)

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry()
        const positions = new Float32Array(PARTICLE_COUNT * 3)
        const colors = new Float32Array(PARTICLE_COUNT * 3)
        const white = new THREE.Color('#eeebe4')
        const gold = new THREE.Color('#c9a84c')

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3
            positions[i3] = THREE.MathUtils.lerp(CUBE_MIN, CUBE_MAX, Math.random())
            positions[i3 + 1] = THREE.MathUtils.lerp(CUBE_MIN, CUBE_MAX, Math.random())
            positions[i3 + 2] = THREE.MathUtils.lerp(CUBE_MIN, CUBE_MAX, Math.random())

            const color = Math.random() < 0.15 ? gold : white
            colors[i3] = color.r
            colors[i3 + 1] = color.g
            colors[i3 + 2] = color.b
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        return geo
    }, [])

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.0003
        }

        const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight
        const progress =
            maxScroll > 0 ? Math.min(1, Math.max(0, lenis.scroll / maxScroll)) : 0
        const targetZ = CAMERA_Z_START - progress * (CAMERA_Z_START - CAMERA_Z_END)

        state.camera.position.z = THREE.MathUtils.lerp(
            state.camera.position.z,
            targetZ,
            0.08
        )
    })

    return (
        <points ref={pointsRef} geometry={geometry}>
            <pointsMaterial
                size={0.015}
                vertexColors
                transparent
                opacity={0.55}
                depthWrite={false}
                sizeAttenuation
            />
        </points>
    )
}

function ParticleField() {
    const reduceMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
        return null
    }

    return (
        <div className="particle-field" aria-hidden="true">
            <Canvas
                camera={{ position: [0, 0, CAMERA_Z_START], fov: 60 }}
                gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
                dpr={[1, 1.5]}
            >
                <Particles />
            </Canvas>
        </div>
    )
}

export default ParticleField
