'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Html, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { scrollToId } from '@/lib/lenis'

// =========================
// Fallback stylized 911 GT3 — shown when no GLB is uploaded
// =========================
function FallbackGT3({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const matsRef = useRef<THREE.MeshStandardMaterial[] | null>(null)

  const carBodyMat = new THREE.MeshStandardMaterial({ color: '#9E221D', metalness: 0.85, roughness: 0.2 })
  const darkTrimMat = new THREE.MeshStandardMaterial({ color: '#141414', metalness: 0.6, roughness: 0.35 })
  const glassMat = new THREE.MeshStandardMaterial({ color: '#2C2C2E', metalness: 0.9, roughness: 0.05, transparent: true, opacity: 0.85 })
  const wheelMat = new THREE.MeshStandardMaterial({ color: '#0a0a0a', metalness: 0.5, roughness: 0.45 })
  const rotorMat = new THREE.MeshStandardMaterial({ color: '#d4d4d4', metalness: 0.95, roughness: 0.15 })
  const hubMat = new THREE.MeshStandardMaterial({ color: '#e5e5e5', metalness: 0.9, roughness: 0.25 })
  const headlightMat = new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#e5e5e5', emissiveIntensity: 0.6, metalness: 0.4, roughness: 0.2 })

  useEffect(() => {
    matsRef.current = [carBodyMat, darkTrimMat, glassMat, wheelMat, rotorMat, hubMat, headlightMat]
     
  }, [])

  useEffect(() => {
    matsRef.current?.forEach((m) => {
      m.wireframe = wireframe
    })
  }, [wireframe])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.3
      groupRef.current.position.y = -0.4 + Math.sin(state.clock.elapsedTime * 0.6) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.4, 0]} scale={1.4}>
      {/* Main body — long sloping 911 silhouette */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.7, 1.8]} />
        <primitive object={carBodyMat} attach="material" />
      </mesh>
      <mesh position={[1.7, 0.35, 0]} rotation={[0, 0, -0.08]} castShadow>
        <boxGeometry args={[1.0, 0.4, 1.75]} />
        <primitive object={carBodyMat} attach="material" />
      </mesh>
      <mesh position={[-0.6, 1.05, 0]} castShadow>
        <boxGeometry args={[2.0, 0.55, 1.65]} />
        <primitive object={carBodyMat} attach="material" />
      </mesh>
      <mesh position={[-1.4, 0.95, 0]} rotation={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[1.0, 0.5, 1.6]} />
        <primitive object={carBodyMat} attach="material" />
      </mesh>
      <mesh position={[0.5, 1.0, 0]} rotation={[0, 0, -0.6]} castShadow>
        <boxGeometry args={[1.1, 0.6, 1.55]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      <mesh position={[-0.6, 1.15, 0.82]}>
        <boxGeometry args={[1.8, 0.35, 0.05]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      <mesh position={[-0.6, 1.15, -0.82]}>
        <boxGeometry args={[1.8, 0.35, 0.05]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      <mesh position={[-1.7, 1.0, 0]} rotation={[0, 0, 0.5]} castShadow>
        <boxGeometry args={[0.9, 0.6, 1.5]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      {/* Iconic GT3 swan-neck wing */}
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
      {/* Tail lights */}
      <mesh position={[-2.18, 0.55, 0.5]}>
        <boxGeometry args={[0.05, 0.12, 0.5]} />
        <meshStandardMaterial color="#9E221D" emissive="#C83228" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[-2.18, 0.55, -0.5]}>
        <boxGeometry args={[0.05, 0.12, 0.5]} />
        <meshStandardMaterial color="#9E221D" emissive="#C83228" emissiveIntensity={0.8} />
      </mesh>
      {/* Wheels */}
      {[[-1.35, 0.9], [1.35, 0.9], [-1.35, -0.9], [1.35, -0.9]].map(([x, z], i) => (
        <group key={i} position={[x, -0.05, z]} rotation={[0, 0, Math.PI / 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.55, 0.55, 0.32, 32]} />
            <primitive object={wheelMat} attach="material" />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
            <primitive object={rotorMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.34, 6]} />
            <primitive object={hubMat} attach="material" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// =========================
// Uploaded GLB model (if present)
// =========================
function UploadedModel({ url, wireframe }: { url: string; wireframe: boolean }) {
  const { scene } = useGLTF(url)
  const groupRef = useRef<THREE.Group>(null)
  const { invalidate } = useThree()

  useEffect(() => {
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
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
    invalidate()
  }, [scene, invalidate])

  useEffect(() => {
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (mesh.isMesh && mesh.material) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        mats.forEach((m) => {
          (m as THREE.MeshStandardMaterial).wireframe = wireframe
        })
      }
    })
    invalidate()
  }, [wireframe, scene, invalidate])

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

function ModelWithFallback({ wireframe }: { wireframe: boolean }) {
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
      <Suspense fallback={<Html center><div style={{ color: '#525252' }}>Loading model…</div></Html>}>
        <UploadedModel url={modelUrl} wireframe={wireframe} />
      </Suspense>
    )
  }
  if (tried) return <FallbackGT3 wireframe={wireframe} />
  return null
}

function Ground() {
  return (
    <>
      <ContactShadows position={[0, -0.6, 0]} opacity={0.28} scale={22} blur={2.8} far={4} color="#1a1a1a" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.62, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#ececea" metalness={0.05} roughness={0.9} />
      </mesh>
    </>
  )
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 5]} intensity={1.6} castShadow />
      <pointLight position={[-5, 4, -5]} intensity={0.4} color="#9E221D" />
      <pointLight position={[5, 4, 5]} intensity={0.35} color="#ffffff" />
    </>
  )
}

// =========================
// Featured model cards (Dream Drive style)
// =========================
const CARS = [
  {
    name: '911 GT3',
    tag: 'The icon',
    img: '/images/gt3.jpg',
    specs: [
      { k: 'Power', v: '502 hp' },
      { k: '0–100 km/h', v: '3.4 s' },
      { k: 'Top speed', v: '318 km/h' },
    ],
  },
  {
    name: '911 GT3 RS',
    tag: 'Race bred',
    img: '/images/gt3-rs.jpg',
    specs: [
      { k: 'Power', v: '518 hp' },
      { k: '0–100 km/h', v: '3.2 s' },
      { k: 'Top speed', v: '296 km/h' },
    ],
  },
  {
    name: '911 GT3 Touring',
    tag: 'Understated',
    img: '/images/gt3-touring.jpg',
    specs: [
      { k: 'Power', v: '502 hp' },
      { k: '0–100 km/h', v: '3.4 s' },
      { k: 'Top speed', v: '318 km/h' },
    ],
  },
]

export default function PortfolioSection() {
  const [autoRotate, setAutoRotate] = useState(true)
  const [wireframe, setWireframe] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true)
        setInView(entries[0].isIntersecting)
      },
      { threshold: 0.08 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // Render the 3D scene only when the section is on screen (and honor autoRotate)
  const frameloop: 'always' | 'demand' | 'never' = !inView ? 'never' : autoRotate ? 'always' : 'demand'

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative w-full bg-white border-t border-black/5"
      style={{ padding: '110px 0 100px' }}
    >
      <div className={`reveal-section ${visible ? 'visible' : ''} max-w-6xl mx-auto px-6 sm:px-10`}>
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="kicker">Portfolio</div>
            <h2
              className="font-display mt-5 font-bold tracking-tight text-[#0a0a0a]"
              style={{ fontSize: 'clamp(2rem, 4.2vw, 3.4rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
            >
              The 911 GT3 family.
            </h2>
          </div>
          <p className="text-neutral-600 text-[0.9rem] leading-relaxed max-w-sm">
            Drag, rotate, zoom — explore the GT3 in real time, then compare
            the three road-legal derivatives.
          </p>
        </div>

        {/* 3D Viewer */}
        <div
          className="mt-12 relative rounded-3xl border border-black/8 overflow-hidden bg-[#f4f4f2]"
          style={{ height: 'clamp(420px, 62vh, 640px)' }}
        >
          {/* Badge */}
          <div className="absolute top-5 left-5 z-10 flex items-center gap-2 bg-white/85 backdrop-blur border border-black/8 rounded-full px-4 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9E221D] animate-pulse" />
            <span className="text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-neutral-700">
              Live 3D · 911 GT3
            </span>
          </div>

          {/* Controls */}
          <div className="absolute top-5 right-5 z-10 flex gap-2">
            <button
              onClick={() => setAutoRotate((v) => !v)}
              className={`px-4 py-2 rounded-full text-[0.65rem] font-semibold tracking-[0.12em] uppercase border backdrop-blur transition-all cursor-pointer ${
                autoRotate
                  ? 'bg-[#0a0a0a] text-white border-[#0a0a0a]'
                  : 'bg-white/85 text-neutral-600 border-black/10 hover:border-black/30'
              }`}
            >
              <i className="fa-solid fa-rotate mr-1.5" aria-hidden="true" />
              Auto-rotate
            </button>
            <button
              onClick={() => setWireframe((v) => !v)}
              className={`px-4 py-2 rounded-full text-[0.65rem] font-semibold tracking-[0.12em] uppercase border backdrop-blur transition-all cursor-pointer ${
                wireframe
                  ? 'bg-[#0a0a0a] text-white border-[#0a0a0a]'
                  : 'bg-white/85 text-neutral-600 border-black/10 hover:border-black/30'
              }`}
            >
              <i className="fa-solid fa-cube mr-1.5" aria-hidden="true" />
              Wireframe
            </button>
          </div>

          {/* Bottom info bar */}
          <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-wrap items-center justify-between gap-4 bg-white/85 backdrop-blur border border-black/8 rounded-2xl px-5 py-3.5">
            <div className="flex items-center gap-3 text-neutral-500 text-[0.65rem] font-semibold tracking-[0.14em] uppercase">
              <span><i className="fa-solid fa-hand-pointer mr-1.5" aria-hidden="true" />Drag</span>
              <span><i className="fa-solid fa-magnifying-glass mr-1.5" aria-hidden="true" />Scroll</span>
              <span className="hidden sm:inline"><i className="fa-solid fa-up-down-left-right mr-1.5" aria-hidden="true" />Right-click</span>
            </div>
            <div className="flex gap-5">
              {[
                { l: 'HP', v: '502' },
                { l: 'NM', v: '465' },
                { l: 'RPM', v: '9k' },
                { l: 'KG', v: '1,418' },
              ].map((m, i) => (
                <div key={i} className={`text-center ${i < 3 ? 'sm:border-r sm:border-black/10 sm:pr-5' : ''}`}>
                  <div className="font-display text-base font-bold text-[#0a0a0a] leading-none">{m.v}</div>
                  <div className="text-[0.55rem] font-semibold tracking-[0.18em] text-neutral-400 uppercase mt-1">{m.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div className="canvas-container">
            <Canvas
              shadows
              dpr={[1, 1.5]}
              camera={{ position: [6, 2.5, 6], fov: 35 }}
              style={{ background: 'transparent' }}
              frameloop={frameloop}
            >
              <Lighting />
              <Suspense fallback={null}>
                <Environment preset="studio" />
              </Suspense>
              <ModelWithFallback wireframe={wireframe} />
              <Ground />
              <OrbitControls
                enablePan
                enableZoom
                enableRotate
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

        {/* Featured cards */}
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {CARS.map((car, i) => (
            <article
              key={i}
              className="min-card overflow-hidden group"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `all 0.7s ${0.2 + i * 0.12}s cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
            >
              <div className="relative h-52 overflow-hidden rounded-t-[17px]">
                { }
                <img
                  src={car.img}
                  alt={`Porsche ${car.name}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[0.6rem] font-semibold tracking-[0.16em] uppercase text-neutral-700 px-3 py-1.5 rounded-full">
                  {car.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-[#0a0a0a]">{car.name}</h3>
                <div className="mt-4 grid grid-cols-3 border-t border-black/8 pt-4">
                  {car.specs.map((s, j) => (
                    <div key={j} className={j > 0 ? 'border-l border-black/8 pl-3' : ''}>
                      <div className="font-display text-sm font-bold text-[#0a0a0a]">{s.v}</div>
                      <div className="text-[0.55rem] font-semibold tracking-[0.14em] uppercase text-neutral-400 mt-1">
                        {s.k}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-medium">Price on request</span>
                  <button
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0a0a0a] hover:text-[#9E221D] transition-colors cursor-pointer"
                    onClick={() => scrollToId('contact')}
                  >
                    Configure
                    <i className="fa-solid fa-arrow-right text-[0.65rem]" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
