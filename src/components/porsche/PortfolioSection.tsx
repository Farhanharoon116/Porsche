'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Html, useGLTF, Float, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// =========================
// Fallback stylized 911 GT3
// Built from primitives - shown if no GLB model uploaded.
// Designed to be recognizably a 911 silhouette from the side.
// =========================
function FallbackGT3() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.3
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.02
    }
  })

  // Materials
  const carBodyMat = new THREE.MeshStandardMaterial({
    color: '#9E221D',
    metalness: 0.9,
    roughness: 0.15,
  })
  const darkTrimMat = new THREE.MeshStandardMaterial({
    color: '#141414',
    metalness: 0.7,
    roughness: 0.3,
  })
  const glassMat = new THREE.MeshStandardMaterial({
    color: '#2C2C2E',
    metalness: 0.9,
    roughness: 0.05,
    transparent: true,
    opacity: 0.85,
  })
  const wheelMat = new THREE.MeshStandardMaterial({
    color: '#0a0a0a',
    metalness: 0.6,
    roughness: 0.4,
  })
  const rotorMat = new THREE.MeshStandardMaterial({
    color: '#EAEAEA',
    metalness: 0.95,
    roughness: 0.1,
  })
  const headlightMat = new THREE.MeshStandardMaterial({
    color: '#EAEAEA',
    emissive: '#EAEAEA',
    emissiveIntensity: 0.5,
    metalness: 0.5,
    roughness: 0.2,
  })

  return (
    <group ref={groupRef} position={[0, -0.4, 0]} scale={1.4}>
      {/* Main body - long sloping hood of a 911 */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.7, 1.8]} />
        <primitive object={carBodyMat} attach="material" />
      </mesh>

      {/* Sloping front hood (lower) */}
      <mesh position={[1.7, 0.35, 0]} rotation={[0, 0, -0.08]} castShadow>
        <boxGeometry args={[1.0, 0.4, 1.75]} />
        <primitive object={carBodyMat} attach="material" />
      </mesh>

      {/* Cabin/Greenhouse - characteristic 911 sloping roof */}
      <mesh position={[-0.6, 1.05, 0]} castShadow>
        <boxGeometry args={[2.0, 0.55, 1.65]} />
        <primitive object={carBodyMat} attach="material" />
      </mesh>

      {/* Roof tapering back (fastback) */}
      <mesh position={[-1.4, 0.95, 0]} rotation={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[1.0, 0.5, 1.6]} />
        <primitive object={carBodyMat} attach="material" />
      </mesh>

      {/* Windshield (front) */}
      <mesh position={[0.5, 1.0, 0]} rotation={[0, 0, -0.6]} castShadow>
        <boxGeometry args={[1.1, 0.6, 1.55]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* Side windows L/R */}
      <mesh position={[-0.6, 1.15, 0.82]}>
        <boxGeometry args={[1.8, 0.35, 0.05]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      <mesh position={[-0.6, 1.15, -0.82]}>
        <boxGeometry args={[1.8, 0.35, 0.05]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* Rear window (back glass) */}
      <mesh position={[-1.7, 1.0, 0]} rotation={[0, 0, 0.5]} castShadow>
        <boxGeometry args={[0.9, 0.6, 1.5]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* Iconic GT3 rear wing */}
      <mesh position={[-2.05, 0.95, 0]} castShadow>
        <boxGeometry args={[0.1, 0.4, 1.8]} />
        <primitive object={darkTrimMat} attach="material" />
      </mesh>
      <mesh position={[-2.15, 1.15, 0]} castShadow>
        <boxGeometry args={[0.5, 0.08, 1.85]} />
        <primitive object={darkTrimMat} attach="material" />
      </mesh>

      {/* Front splitter */}
      <mesh position={[2.15, 0.18, 0]} castShadow>
        <boxGeometry args={[0.3, 0.08, 1.8]} />
        <primitive object={darkTrimMat} attach="material" />
      </mesh>

      {/* Side skirts */}
      <mesh position={[0, 0.15, 0.9]}>
        <boxGeometry args={[3.5, 0.1, 0.08]} />
        <primitive object={darkTrimMat} attach="material" />
      </mesh>
      <mesh position={[0, 0.15, -0.9]}>
        <boxGeometry args={[3.5, 0.1, 0.08]} />
        <primitive object={darkTrimMat} attach="material" />
      </mesh>

      {/* Headlights */}
      <mesh position={[2.05, 0.65, 0.55]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <primitive object={headlightMat} attach="material" />
      </mesh>
      <mesh position={[2.05, 0.65, -0.55]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <primitive object={headlightMat} attach="material" />
      </mesh>

      {/* Tail lights (Carmine strip) */}
      <mesh position={[-2.18, 0.55, 0.5]}>
        <boxGeometry args={[0.05, 0.12, 0.5]} />
        <meshStandardMaterial color="#9E221D" emissive="#C83228" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[-2.18, 0.55, -0.5]}>
        <boxGeometry args={[0.05, 0.12, 0.5]} />
        <meshStandardMaterial color="#9E221D" emissive="#C83228" emissiveIntensity={0.8} />
      </mesh>

      {/* Wheels — 4 with rims */}
      {[[-1.35, 0.9], [1.35, 0.9], [-1.35, -0.9], [1.35, -0.9]].map(([x, z], i) => (
        <group key={i} position={[x, -0.05, z]} rotation={[0, 0, Math.PI / 2]}>
          {/* Tire */}
          <mesh castShadow>
            <cylinderGeometry args={[0.55, 0.55, 0.32, 32]} />
            <primitive object={wheelMat} attach="material" />
          </mesh>
          {/* Brake disc */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
            <primitive object={rotorMat} attach="material" />
          </mesh>
          {/* Center hub with spokes */}
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.34, 6]} />
            <meshStandardMaterial color="#EAEAEA" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// =========================
// Try to load a real GLB model if present in /public/models/porsche-911-gt3/
// We attempt multiple candidate filenames.
// =========================
function UploadedModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    // Center and scale the model by wrapping it in a group transform
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 3.5 / maxDim
    if (groupRef.current) {
      groupRef.current.scale.setScalar(scale)
      groupRef.current.position.x = -center.x * scale
      groupRef.current.position.y = -center.y * scale + 0.4
      groupRef.current.position.z = -center.z * scale
    }
    // Walk the scene to enable shadows (read-only traversal)
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.3
      groupRef.current.position.y = -0.4 + Math.sin(state.clock.elapsedTime * 0.6) * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

function ModelWithFallback() {
  const [modelUrl, setModelUrl] = useState<string | null>(null)
  const [tried, setTried] = useState(false)

  useEffect(() => {
    const candidates = [
      '/models/porsche-911-gt3/scene.glb',
      '/models/porsche-911-gt3/porsche-911-gt3.glb',
      '/models/porsche-911-gt3/model.glb',
    ]
    let cancelled = false
    ;(async () => {
      for (const url of candidates) {
        try {
          const res = await fetch(url, { method: 'HEAD' })
          if (res.ok && res.headers.get('content-type') !== 'text/html; charset=UTF-8') {
            if (!cancelled) setModelUrl(url)
            return
          }
        } catch {
          /* try next */
        }
      }
      if (!cancelled) setTried(true)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (modelUrl) {
    return (
      <Suspense fallback={<Html center><div style={{ color: '#EAEAEA' }}>Loading model…</div></Html>}>
        <UploadedModel url={modelUrl} />
      </Suspense>
    )
  }
  if (tried) {
    return <FallbackGT3 />
  }
  return null
}

// =========================
// Ground reflection
// =========================
function Ground() {
  return (
    <>
      <ContactShadows
        position={[0, -0.6, 0]}
        opacity={0.6}
        scale={20}
        blur={2.5}
        far={4}
        color="#000000"
      />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.62, 0]}
        receiveShadow
      >
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.7}
          roughness={0.4}
        />
      </mesh>
    </>
  )
}

// =========================
// Lighting rig
// =========================
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
      <pointLight position={[-5, 4, -5]} intensity={0.6} color="#9E221D" />
      <pointLight position={[5, 4, 5]} intensity={0.4} color="#C83228" />
      <spotLight position={[0, 6, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#EAEAEA" />
    </>
  )
}

export default function PortfolioSection() {
  const [autoRotate, setAutoRotate] = useState(true)
  const [wireframe, setWireframe] = useState(false)
  const [colorMode, setColorMode] = useState<'carmine' | 'obsidian' | 'scarlet'>('carmine')

  return (
    <section
      id="portfolio"
      className="relative w-full"
      style={{
        background:
          'linear-gradient(180deg, #0a0a0a 0%, #141414 50%, #0a0a0a 100%)',
        padding: '140px 0 120px',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px',
              padding: '6px 16px',
              borderRadius: '50px',
              border: '1px solid rgba(158, 34, 29, 0.3)',
              background: 'rgba(20, 20, 20, 0.5)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#9E221D',
                boxShadow: '0 0 8px #9E221D',
              }}
            />
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '4px',
                color: '#C83228',
                textTransform: 'uppercase',
              }}
            >
              In 3D
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 5rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: '#EAEAEA',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                background: 'linear-gradient(180deg, #EAEAEA 0%, #9E221D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              MEET THE GT3
            </span>
            <br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(234, 234, 234, 0.4)' }}>
              IN THREE DIMENSIONS
            </span>
          </h2>
          <p
            style={{
              maxWidth: '640px',
              margin: '0 auto',
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: 'rgba(234, 234, 234, 0.7)',
            }}
          >
            Drag, rotate, zoom. Every curve, every vent, every panel of the
            911 GT3 — rendered in real-time. The most beautiful shape in
            motorsport.
          </p>
        </div>

        {/* 3D Viewer container */}
        <div
          className="neo-card"
          style={{
            position: 'relative',
            height: 'clamp(420px, 70vh, 720px)',
            width: '100%',
            overflow: 'hidden',
            borderRadius: '24px',
          }}
        >
          {/* Top-left badge */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              zIndex: 10,
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(20, 20, 20, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(158, 34, 29, 0.3)',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '2px',
              color: '#C83228',
              textTransform: 'uppercase',
            }}
          >
            911 GT3 · Live Render
          </div>

          {/* Top-right controls */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 10,
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => setAutoRotate((v) => !v)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                background: autoRotate
                  ? 'rgba(158, 34, 29, 0.25)'
                  : 'rgba(20, 20, 20, 0.7)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${autoRotate ? 'rgba(158, 34, 29, 0.5)' : 'rgba(234, 234, 234, 0.1)'}`,
                color: autoRotate ? '#EAEAEA' : 'rgba(234, 234, 234, 0.7)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '1px',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              <i className="fa-solid fa-rotate" style={{ marginRight: 6 }} />
              Auto-rotate
            </button>
            <button
              onClick={() => setWireframe((v) => !v)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                background: wireframe
                  ? 'rgba(158, 34, 29, 0.25)'
                  : 'rgba(20, 20, 20, 0.7)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${wireframe ? 'rgba(158, 34, 29, 0.5)' : 'rgba(234, 234, 234, 0.1)'}`,
                color: wireframe ? '#EAEAEA' : 'rgba(234, 234, 234, 0.7)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '1px',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              <i className="fa-solid fa-cube" style={{ marginRight: 6 }} />
              Wireframe
            </button>
          </div>

          {/* Bottom info panel */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              right: '20px',
              zIndex: 10,
              padding: '16px 22px',
              borderRadius: '12px',
              background: 'rgba(20, 20, 20, 0.7)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(234, 234, 234, 0.06)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '3px',
                  color: '#C83228',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                Drag to rotate · Scroll to zoom · Right-click to pan
              </div>
              <div
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#EAEAEA',
                }}
              >
                Porsche 911 GT3 — Type 992.2
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { label: 'HP', val: '502' },
                { label: 'NM', val: '465' },
                { label: 'RPM', val: '9k' },
                { label: 'KG', val: '1,570' },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: 'center',
                    padding: '0 12px',
                    borderRight:
                      i < 3 ? '1px solid rgba(234, 234, 234, 0.1)' : 'none',
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      color: '#EAEAEA',
                    }}
                  >
                    {m.val}
                  </div>
                  <div
                    style={{
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      letterSpacing: '1.5px',
                      color: 'rgba(234, 234, 234, 0.5)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div className="canvas-container" style={{ width: '100%', height: '100%' }}>
            <Canvas
              shadows
              dpr={[1, 1.5]}
              camera={{ position: [6, 2.5, 6], fov: 35 }}
              style={{ background: 'transparent' }}
              frameloop={autoRotate ? 'always' : 'demand'}
            >
              <Lighting />
              <Suspense fallback={null}>
                <Environment preset="night" />
              </Suspense>
              <group>
                <ModelWithFallback />
              </group>
              <Ground />
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                autoRotate={autoRotate}
                autoRotateSpeed={0.5}
                minDistance={4}
                maxDistance={12}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2.1}
                enableDamping
                dampingFactor={0.05}
              />
            </Canvas>
          </div>
        </div>

        {/* Feature highlights row */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ marginTop: '60px' }}
        >
          {[
            {
              icon: 'fa-solid fa-circle-half-stroke',
              title: 'Wheelbase',
              value: '2,457 mm',
              desc: 'A long wheelbase for stability at 300+ km/h — yet nimble in switchbacks.',
            },
            {
              icon: 'fa-solid fa-ruler-combined',
              title: 'Dimensions',
              value: '4,577 × 1,852 × 1,279',
              desc: 'Length × Width × Height (mm) — aerodynamically sculpted, dimensionally pure.',
            },
            {
              icon: 'fa-solid fa-scale-unbalanced',
              title: 'Dry Weight',
              value: '1,418 kg',
              desc: 'Lightweight construction: aluminum doors, magnesium roof, carbon-fibre parts.',
            },
          ].map((f, i) => (
            <div key={i} className="neo-card p-6">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <i className={f.icon} style={{ color: '#C83228', fontSize: '1.4rem' }} />
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '2.5px',
                    color: 'rgba(234, 234, 234, 0.5)',
                    textTransform: 'uppercase',
                  }}
                >
                  {f.title}
                </span>
              </div>
              <div
                style={{
                  fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                  fontWeight: 800,
                  color: '#EAEAEA',
                  letterSpacing: '-0.01em',
                  marginBottom: '10px',
                }}
              >
                {f.value}
              </div>
              <p
                style={{
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                  color: 'rgba(234, 234, 234, 0.6)',
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
