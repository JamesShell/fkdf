import React, { Suspense, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { GlassPanel, Model, Stand } from "./Model";
import { PerspectiveCamera } from "three";
import * as THREE from 'three'

// Custom Camera component
const MyCamera = () => {
  const { camera } = useThree();

  // Adjust camera properties here
  const zoomLevel = 6;
  const cameraPosition: [number, number, number] = [0, 0, zoomLevel];

  camera.position.set(...cameraPosition);

  return null;
};

const CinematicLight = () => {
  const { scene } = useThree();
  const lightGroupRef: React.Ref<THREE.Group> = useRef(null);

  useFrame(() => {
    if (lightGroupRef.current) {
      lightGroupRef.current.rotation.y += 0.02;
    }
  });

  const target = scene.getObjectByName("stand");

  return (
    <group ref={lightGroupRef} rotation={[0, 0, 0]} position={[0, 3, 0]}>
      <directionalLight color={0x333399} intensity={1} position={[0, 0, 2]} target={target} castShadow />
      <directionalLight color={0x6600cc} intensity={.5} position={[0, 0, -2]} target={target} castShadow />
    </group>
  );
};

function Phone({animate, setAnimate}) {

    return (
        <div className="position-relative h-100">
              <Canvas shadows className="canvas h-100 w-100">
                <Suspense>
                <Model isAnimating={animate} setIsAnimating={setAnimate} />
                <Stand
        radiusTop={3}
        radiusBottom={3}
        height={.2}
        radialSegments={100}
        heightSegments={1}
        color={0xffffff} // Green color
        position={[0, -2.55, 0]}
        rotation={[-.22, 0, 0]}
      />
      <Stand
        radiusTop={2.8}
        radiusBottom={3}
        height={.22}
        radialSegments={100}
        heightSegments={1}
        color={0xffffff} // Green color
        position={[0, -2.55, 0]}
        rotation={[-.22, 0, 0]}
      />
      <Stand
        radiusTop={2}
        radiusBottom={3}
        height={.24}
        radialSegments={100}
        heightSegments={1}
        color={0xffffff} // Green color
        position={[0, -2.55, 0]}
        rotation={[-.22, 0, 0]}
      />
      
      <CinematicLight />
      <ambientLight intensity={.5}/>
                </Suspense>
                
      <MyCamera /> {/* Include the custom camera component */}
              </Canvas>
              <GlassPanel
                position={[0.08, 0.2]}
                text="Got it, so a mix of performance"
                onClick={() => {console.log("clicked")}}
              />
              <GlassPanel
                position={[0.1, 0.5]}
                text="Got it, so a mix of performance"
                onClick={() => setAnimate(true)}
              />
              <GlassPanel
                position={[0.58, 0.6]}
                text="Got it, so a mix of performance"
                onClick={() => setAnimate(true)}
              />
              <GlassPanel
                position={[0.6, 0.3]}
                text="Got it, so a mix of performance"
                onClick={() => setAnimate(true)}
              />
            </div>
    );
}

export default Phone;