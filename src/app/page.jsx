"use client";
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import {useTranslations} from 'next-intl';
import { Swiper , SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import "swiper/css/navigation";
import "devicon/devicon.min.css"; // Import once in _app.js or component
import Card from "../components/ui/card";
import GithubIcon from '@mui/icons-material/GitHub';
import UserIcon from '@mui/icons-material/Person';
import Image from 'next/image';
import { FitScreen } from '@mui/icons-material';

extend({ MeshLineGeometry, MeshLineMaterial })
useGLTF.preload('/assets/tag.glb')
useTexture.preload('/assets/vercel.jpg')

export default function App() {

  const [dragged, drag] = useState(false)
  const [hovered, hover] = useState(false)
  const [heightCheck, setHeightCheck] = useState(false)
  const [currentHeight, setHeight] = useState(0);
  const [cardBlock, setCardBlock] = useState(false)
  const [isXL, setIsXL] = useState(true); // Track screen size

  const landing = useTranslations("Landing");
  const projectsTranslations = useTranslations("Projects");
  const expTranslations = useTranslations("Experience");

  useEffect(() => {
    setHeightCheck(true)
    setTimeout(() => setHeightCheck(false), 2000)
  }, [dragged])

  useEffect(() => {
    if (currentHeight > 5) {
      setCardBlock(true)
    }
  }, [currentHeight])

  useEffect(() => {
    const checkScreenSize = () => {
      setIsXL(window.innerWidth >= 1280); // xl breakpoint (1280px)
    };

    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const content = (
    <>
      <div className="flex items-center flex-col w-full bg-transparent">
        <section className="w-3/4 flex-col">
          <h1 className="text-white xl:text-6xl text-2xl font-extrabold font-poppins">
            {landing("title")}
          </h1>
          <div className="text-white xl:text-2xl text-xl font-light font-poppins">
            {landing("greeting")}
          </div>
          <div
            className="mt-10 tracking-tighter text-white xl:text-7xl text-4xl mb-2 font-extrabold"
            style={{ fontFamily: '"Over the Rainbow", cursive' }}
          >
            {landing("whoami")}
          </div>
          <p className="text-white xl:text-xl text-sm font-light font-poppins">
            {landing("presentation")}
          </p>
        </section>
      </div>
    </>
  );

  const projects = (
    <>
      <div className="flex items-center flex-col w-full bg-transparent mt-24">
        <section className="w-3/4 flex-col">
          <h1 className="text-white xl:text-6xl text-xl font-extrabold font-poppins">
            {projectsTranslations("title")}
          </h1>
          <div
            className="text-white xl:text-4xl text-2xl mt-4 font-extrabold"
            style={{ fontFamily: '"Over the Rainbow", cursive' }}
          >
            {projectsTranslations("subtitle")}
          </div>
          <div className="flex mt-10">
            <a href="https://github.com/Yassin-Pellicer" target="_blank">
              <GithubIcon
                style={{
                  fontSize: 60,
                  color: "white",
                  fontFamily: '"Over the Rainbow", cursive',
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              />{" "}
              <span className="text-white">
                {projectsTranslations("github")}
              </span>
            </a>
          </div>
        </section>
      </div>
    </>
  );

  const pinpoint = (
    <div>
      <div className="flex items-center h-full flex-col w-full bg-transparent mt-14 pb-8">
        <section className="w-3/4 flex-col">
          <div>
            <h1 className="text-white xl:text-6xl text-xl font-extrabold font-poppins">
              {projectsTranslations("pinpoint.title")}
            </h1>
          </div>
          <div className="text-white xl:text-xl font-poppins text-1xl mt-4">
            {projectsTranslations("pinpoint.description")}
          </div>
          <video
            autoPlay
            loop
            muted
            className="rounded-2xl mt-4 mb-4 object-cover z-0 h-[300px]"
          >
            <source src="/videos/ppdemo.mp4" type="video/mp4" />
          </video>
          <div className="flex flex-row justify-between">
            <a
              href="https://github.com/Yassin-Pellicer/pinpoint"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon
                style={{
                  fontSize: 50,
                  cursor: "pointer",
                  marginRight: "10px",
                  color: "white",
                }}
              />
            </a>
            <div>
              <i className="devicon-postgresql-plain text-white text-5xl mr-4"></i>
              <i className="devicon-react-original text-white text-5xl mr-4"></i>
              <i className="devicon-tailwindcss-plain text-white text-5xl mr-4"></i>
              <i className="devicon-typescript-original text-white text-5xl mr-4"></i>
              <i className="devicon-nextjs-plain text-white text-5xl"></i>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const compiler = (
    <div>
      <div className="flex items-center h-full flex-col w-full bg-transparent mt-14 mb-8">
        <section className="w-3/4 flex-col">
          <div>
            <h1 className="text-white xl:text-6xl text-xl font-extrabold font-poppins">
              {projectsTranslations("compiler.title")}
            </h1>
          </div>
          <div className="text-white xl:text-xl font-poppins text-1xl mt-4">
            {projectsTranslations("compiler.description")}
          </div>
          <div className="text-white xl:text-xl font-poppins text-1xl mt-4 mb-4">
            {projectsTranslations("compiler.explanation")}
          </div>
          <div className="flex flex-row justify-between">
            <a
              href="https://github.com/Yassin-Pellicer/pinpoint"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon
                style={{
                  fontSize: 50,
                  cursor: "pointer",
                  marginRight: "10px",
                  color: "white",
                }}
              />
            </a>
            <div>
              <i className="devicon-c-plain text-white text-5xl mr-4"></i>
              <i className="devicon-linux-plain text-white text-5xl"></i>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const scraper = (
    <div>
      <div className="flex items-center h-full flex-col w-full bg-transparent mt-14 mb-8">
        <section className="w-3/4 flex-col">
          <div>
            <h1 className="text-white xl:text-6xl text-xl font-extrabold font-poppins">
              {projectsTranslations("scraper.title")}
            </h1>
          </div>
          <div className="text-white xl:text-xl font-poppins text-1xl mt-4 mb-4">
            <div
              dangerouslySetInnerHTML={{
                __html: projectsTranslations("scraper.description"),
              }}
            />
          </div>
          <div className="flex flex-row justify-between">
            <a
              href="https://github.com/Yassin-Pellicer/pinpoint"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon
                style={{
                  fontSize: 50,
                  cursor: "pointer",
                  marginRight: "10px",
                  color: "white",
                }}
              />
            </a>
            <div>
              <i className="devicon-python-plain text-white text-5xl mr-4"></i>
              <i className="devicon-bash-plain text-white text-5xl mr-4"></i>
              <i className="devicon-json-plain text-white text-5xl "></i>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const portfolio = (
    <div>
      <div className="flex items-center h-full flex-col w-full bg-transparent mt-14 mb-8">
        <section className="w-3/4 flex-col">
          <div>
            <h1 className="text-white xl:text-6xl text-xl font-extrabold font-poppins">
              {projectsTranslations("portfolio.title")}
            </h1>
          </div>
          <div className="text-white xl:text-xl font-poppins text-1xl mt-4 mb-4">
            {projectsTranslations("portfolio.description")}
          </div>
          <Canvas
          style={{
            height: "300px",
            borderRadius: "16px",
          }}
          camera={{ position: [0, 0, 12], fov: 25 }}
        >
          <ambientLight intensity={Math.PI} />
          <Physics
            interpolate
            gravity={[0, -40, 0]}
            timeStep={1 / 60}
            solverIterations={20}
          >
              <Band
                dragged={dragged}
                hovered={hovered}
                currentHeight={currentHeight}
                setHeight={setHeight}
                drag={drag}
                hover={hover}
                displacementX={0}
                displacementY={4.5}
                displacementZ={0}
                delay={2000}
              />
          </Physics>
          <Environment background blur={1}>
            <color attach="background" args={["#335994"]} />
          </Environment>
        </Canvas>
        <div className="flex flex-row justify-between mt-4">
            <a
              href="https://github.com/Yassin-Pellicer/pinpoint"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon
                style={{
                  fontSize: 50,
                  cursor: "pointer",
                  color: "white",
                  marginRight: "10px",
                }}
              />
            </a>
            <div>
              <i className="devicon-nextjs-plain text-white text-5xl mr-4"></i>
              <i className="devicon-react-original text-white text-5xl mr-4"></i>
              <i className="devicon-threejs-original text-white text-5xl mr-4"></i>
              <i className="devicon-blender-original text-white text-5xl"></i>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const miscellaneous = (
    <div>
      <div className="flex items-center h-full flex-col w-full bg-transparent mt-14 mb-8">
        <section className="w-3/4 flex-col">
          <div>
            <h1 className="text-white xl:text-6xl text-xl font-extrabold font-poppins">
              {projectsTranslations("miscellaneous.title")}
            </h1>
          </div>
          <div className="flex 2xl:flex-row flex-col items-center justify-center align-center mt-8 mb-12">
          <div className="text-white xl:text-xl 3xl:mb-0 mb-8 font-poppins text-1xl w-auto mr-8">
            {projectsTranslations("miscellaneous.description")}
          </div>
            <img
              src="/assets/games.png"
              alt="Games"
              className="border-2 w-50 h-auto"
            />
          </div>
          <div className="flex flex-row justify-between">
            <a
              href="https://github.com/Yassin-Pellicer/pinpoint"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon
                style={{
                  fontSize: 50,
                  cursor: "pointer",
                  marginRight: "10px",
                  color: "white",
                }}
              />
            </a>
            <div>
              <i className="devicon-cplusplus-plain text-white text-5xl mr-4"></i>
              <i className="devicon-javascript-plain text-white text-5xl mr-4"></i>
              <i className="devicon-html5-plain text-white text-5xl mr-4"></i>
              <i className="devicon-css3-plain text-white text-5xl mr-4"></i>
              <i className="devicon-python-plain text-white text-5xl"></i>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const experience = (
    <>
      <div className="flex items-center flex-col w-full bg-transparent">
        <section className="w-3/4 flex-col">
          <h1 className="text-white xl:text-6xl text-xl font-extrabold font-poppins">
            {expTranslations("title")}
          </h1>
          <div
            className="text-white xl:text-4xl text-2xl mt-4 font-extrabold"
            style={{ fontFamily: '"Over the Rainbow", cursive' }}
          >
            {expTranslations("subtitle")}
          </div>
          <div className="flex mt-8 ">
          </div>
          <div className="mt-4">
            <div className="border-b-2 px-10 border-white pb-10 pt-12 hover:cursor-pointer hover:bg-blue-600 transition duration-300">
              <h2 className="text-white xl:text-2xl text-xl font-extrabold font-poppins">
                {expTranslations("solverpay.title")}
              </h2>
              <p className="text-white xl:text-xl text-lg font-poppins">
                {expTranslations("solverpay.subtitle")}
              </p>
            </div>

            <div className="border-b-2 px-10 border-white pb-10 pt-12 hover:cursor-pointer hover:bg-blue-600 transition duration-300">
              <h2 className="text-white xl:text-2xl text-xl font-extrabold font-poppins">
                {expTranslations("smartpos.title")}
              </h2>
              <p className="text-white xl:text-xl text-lg font-poppins">
                {expTranslations("smartpos.subtitle")}
              </p>
            </div>

            <div className="border-b-2 px-10 border-white pb-10 pt-12 hover:cursor-pointer hover:bg-blue-600 transition duration-300">
              <h2 className="text-white xl:text-2xl text-xl font-extrabold font-poppins">
                {expTranslations("carrefour.title")}
              </h2>
              <p className="text-white xl:text-xl text-lg font-poppins">
                {expTranslations("carrefour.subtitle")}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );

  return (
    <div className="bg-black overflow-x-hidden">
      {!heightCheck && !cardBlock && (
        <div className="absolute bottom-10 left-1/2 tracking-tight font-bold text-5xl transform -translate-x-1/2 text-white p-4 z-10">
          <p className="font-poppins text-center text-2xl">
            pull down and let go
          </p>
          <p className="font-poppins text-center text-5xl">&#8595;</p>
        </div>
      )}

      {(isXL || !cardBlock) && (
        <Canvas
          style={{
            width: "100vw",
            height: "100vh",
          }}
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
                displacementY={4}
                displacementZ={0}
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
                displacementX={2.5}
                displacementY={4.5}
                displacementZ={0}
                delay={2000}
              />
            )}
          </Physics>
          <Environment background blur={1}>
            <color attach="background" args={["#005994"]} />
            <Lightformer
              intensity={2}
              color="#FFFFFF"
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
      )}
      {cardBlock && (
        <div className="overflow-x-hidden">
          <div className="h-full justify-center top-0 items-center xl:absolute z-50 xl:w-[60vw] flex">
            {content}
          </div>
          <div className="h-full justify-center top-0 items-center z-50 xl:w-[60vw] flex">
            {projects}
          </div>
          <div className="mt-24">
            <Swiper
              spaceBetween={50}
              slidesPerView={isXL ? 2.3 : 1.1}
              centeredSlides={true}
              loop={true}
              grabCursor={true}
              freeMode={true}
              simulateTouch={true}
              onSlideChange={() => console.log("slide change")}
            >
              <SwiperSlide>
                <Card children={pinpoint}></Card>
              </SwiperSlide>
              <SwiperSlide>
                <Card children={compiler}></Card>
              </SwiperSlide>
              <SwiperSlide>
                <Card children={scraper}></Card>
              </SwiperSlide>
              <SwiperSlide>
                <Card children={portfolio}></Card>
              </SwiperSlide>
              <SwiperSlide>
                <Card children={miscellaneous}></Card>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="flex xl:flex-row flex-col items-center mb-44 mt-44">
            <div className="h-full justify-center top-0 items-center z-50 xl:w-[60vw] xl:mr-12 flex">
              {experience}
            </div>
            <img
              src="/assets/cv.png"
              alt="Games"
              className="w-2/7 rounded-3xl xl:mt-0 mt-24"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Band({ maxSpeed = 30, minSpeed = 5, dragged, hovered, drag, hover, currentHeight, setHeight, displacementX, displacementY, displacementZ, delay }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef() // prettier-ignore
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3() // prettier-ignore
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2}
  const { nodes, materials } = useGLTF('/assets/tag.glb')
  const texture = useTexture('/assets/vercel.jpg')
  const { width, height } = useThree((state) => state.size)
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))

  const [prevPosition] = useState(new THREE.Vector3())
  const [movementFilter] = useState(new THREE.Vector3())
  

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]) // prettier-ignore


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
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
    }

    setHeight(card.current?.translation().y.toFixed(2))
    
    if (fixed.current) {
      // Fix most of the jitter when over pulling the card
      ;[j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })
      // Calculate catmul curve
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())
      band.current.geometry.setPoints(curve.getPoints(32))
      // Tilt it back towards the screen
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
    }
  })

  curve.curveType = 'chordal'
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  return (
    <>
      <group position={[displacementX, displacementY, displacementZ]}>
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
                      roughness={0.1}
                      metalness={0.6}
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