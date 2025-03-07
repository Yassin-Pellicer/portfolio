"use client";
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })
useGLTF.preload('/assets/tag.glb')
useTexture.preload('/assets/vercel.png')

export default function App() {

  const [dragged, drag] = useState(false)
  const [hovered, hover] = useState(false)
  const [heightCheck, setHeightCheck] = useState(false)
  const [currentHeight, setHeight] = useState(0);
  const [cardBlock, setCardBlock] = useState(false)

  useEffect(() => {
    setHeightCheck(true)
    setTimeout(() => setHeightCheck(false), 2000)
  }, [dragged])

  useEffect(() => {
    if (currentHeight > 5) {
      setCardBlock(true)
    }
  }, [currentHeight])

  return (
    <>
      {!heightCheck && !cardBlock && (
        <div className="absolute bottom-10 left-1/2 tracking-tight font-bold text-5xl transform -translate-x-1/2 text-white p-4 z-10">
          <p className="font-poppins text-2xl">pull down and let go</p>
          <p className="font-poppins text-center text-5xl">&#8595;</p>
        </div>
      )}
      {cardBlock && (
        <div className="absolute z-50 flex flex-row-reverse">
          <div className="justify-center flex flex-col items-center 2xl:align-center bg-transparent w-[50vw] h-[100vh]">
            <p className="text-white text-3xl font-extrabold font-poppins">Yassin Pellicer Lamla</p>{" "}
            <p className="text-white text-md font-light font-poppins">Software Developer</p>{" "}
          </div>
        </div>
      )}
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        camera={{ position: [0, 0, 12], fov: 25 }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics
          interpolate
          gravity={[0, -40, 0]}
          timeStep={1 / 60}
          solverIterations={20}
        >
          {!cardBlock && (
            <Band
              dragged={dragged}
              hovered={hovered}
              currentHeight={currentHeight}
              setHeight={setHeight}
              drag={drag}
              hover={hover}
              displacementX={0}
            />
          )}
          {cardBlock && (
            <Band
              dragged={dragged}
              hovered={hovered}
              currentHeight={currentHeight}
              setHeight={setHeight}
              drag={drag}
              hover={hover}
              displacementX={2}
              delay={2000}
            />
          )}
        </Physics>
        <Environment background blur={1}>
          <color attach="background" args={["#0b212a"]} />
          <Lightformer
            intensity={2}
            color="#a9b5c7"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="#a9b5c7"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="#a9b5c7"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={2}
            color="#a9b5c7"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </>
  );
}

function Band({ maxSpeed = 30, minSpeed = 5, dragged, hovered, drag, hover, currentHeight, setHeight, displacementX, delay }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef() // prettier-ignore
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3() // prettier-ignore
  // Increase damping for more stability
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 3 }
  const { nodes, materials } = useGLTF('/assets/tag.glb')
  const texture = useTexture('/assets/vercel.png')
  const { width, height } = useThree((state) => state.size)
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))

  const [prevPosition] = useState(new THREE.Vector3())
  const [movementFilter] = useState(new THREE.Vector3())
  
  // Configure joints with slight dampening
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1], { damping: 10 })
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1], { damping: 10 })
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1], { damping: 10 })
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]], { damping: 5 })

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => void (document.body.style.cursor = 'auto')
    }
  }, [hovered, dragged])

  useEffect(() => {
    if (delay) {
      const timeoutId = setTimeout(() => {
        card.current?.wakeUp();
      }, delay);

      card.current?.setNextKinematicTranslation(prevPosition);

      return () => clearTimeout(timeoutId);
    }
  }, [delay, prevPosition]);

  useFrame((state, delta) => {
    if (dragged) {
      // Calculate pointer position in 3D space
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      
      // Apply smooth movement with filtering
      if (!prevPosition.equals(new THREE.Vector3())) {
        // Create a filtered position that lerps between previous and current
        movementFilter.copy(vec).sub(dragged).sub(prevPosition);
        // Scale the movement for smoother transition
        movementFilter.multiplyScalar(0.92);
        movementFilter.add(prevPosition);
      } else {
        movementFilter.copy(vec).sub(dragged);
      }

      // Store current position for next frame
      prevPosition.copy(movementFilter);
      
      // Wake up all physics bodies
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      
      // Set the position with filtered movement
      card.current?.setNextKinematicTranslation({ 
        x: movementFilter.x, 
        y: movementFilter.y, 
        z: movementFilter.z 
      })
    } else {
      // Reset previous position when not dragging
      prevPosition.set(0, 0, 0);
    }

    setHeight(card.current?.translation().y.toFixed(2))
    
    if (fixed.current) {
      // Apply stronger smoothing to reduce jitter
      ;[j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        // Use a smaller delta multiplier for smoother interpolation
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })
      
      // Create a smooth curve for the band
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())
      band.current.geometry.setPoints(curve.getPoints(32))
      
      // Add stability to card rotation with gentler correction
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.20, z: ang.z })
    }
  })

  curve.curveType = 'chordal'
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  return (
    <>
      <group position={[displacementX, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
          mass={0.2}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={1.25}
            position={[0, 0, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (
              e.target.releasePointerCapture(e.pointerId), drag(false)
            )}
            onPointerDown={(e) => (
              e.target.setPointerCapture(e.pointerId),
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              )
            )}
          >
            <group rotation={[Math.PI / 2, Math.PI / 2, 0]}>
              {nodes.card.children && nodes.card.children.map((child, i) => {
                if (!child.geometry) {
                  return null;
                }

                return (
                  <mesh
                    key={i}
                    geometry={child.geometry}
                    material={child.material}
                  >
                    <meshPhysicalMaterial
                      {...child.material}
                      clearcoat={1}
                      clearcoatRoughness={0.15}
                      roughness={0.3}
                      metalness={0.5}
                    />
                  </mesh>
                );
              })}
            </group>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={texture}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}