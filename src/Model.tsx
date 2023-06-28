import React, { useEffect, useMemo, useRef, useState } from "react";
import { Euler, Vector3, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Tilt } from "react-tilt";
import { animated, useSpring } from "@react-spring/three";
import * as THREE from 'three';


export function Model({ isAnimating, setIsAnimating }: {isAnimating: boolean, setIsAnimating: any}) {

  const gltf = useLoader(GLTFLoader, "scene.gltf"); // Replace with the path to your glTF model file
  const modelRef: React.Ref<THREE.Group> = useRef(null);

  const { position, rotation } = useSpring({
    from: { position: [0, -2.5, 0], rotation: [0, -1.55, 0] },
    to: async (next) => {
      if (isAnimating) {
        await next({ position: [0, -1.6, 0], rotation: [0, -1.55, 0] });
        await next({
          position: [0, -2.5, 0],
          rotation: [0, -1.55 + Math.PI * 2, 0],
        });
        setIsAnimating(false);
      }
      await next({ position: [0, -2.5, 0], rotation: [0, -1.55, 0] });
    },
    config: { mass: 1, tension: 1000, friction: 120 }, // Adjust these values to control the speed
    
  });

  const newPos: [number, number, number] = [position[0], position[1], position[2]]
  const newRot: [number, number, number] = [rotation[0], rotation[1], rotation[2]]

  return isAnimating ? (
    <animated.group name={"model"} ref={modelRef} position={newPos} rotation={newRot} >
      <primitive object={gltf.scene} castShadow/>
    </animated.group>
  ) : (
    <group name={"model"} ref={modelRef} position= {[0, -2.5, 0]} rotation= {[0, -1.55, 0]}>
      <primitive object={gltf.scene} castShadow/>
    </group>
  );
}

export function GlassPanel({ position, text, onClick }: { position: [number, number], text: string, onClick: ()=>void }) {
  return (
    <Tilt
      onClick={() => onClick()}
      perspective={1000}
      style={{
        position: "absolute",
        top: position[1] * 100 + "%",
        left: position[0] * 100 + "%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(31, 31, 56, 0.50)",
        borderRadius: "8px",
        padding: "8px 12px",
        color: "#ffffff",
        fontSize: "10px",
        backdropFilter: "blur(8px)",
        gap: "8px",
      }}
    >
      <img src="icons/daimond.svg" alt="" width={12} height={12}/>
      {text}
    </Tilt>
  );
}

export function Stand({ radiusTop, radiusBottom, height, radialSegments, heightSegments, color, position, rotation } : { radiusTop: number, radiusBottom: number, height: number, radialSegments: number, heightSegments: number, color: THREE.ColorRepresentation, position: Vector3, rotation: Euler} ) {

  return (
    <group name="stand" position={position} rotation={rotation}>
      <mesh
        geometry={new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments)}
        material={new THREE.MeshStandardMaterial({ color: color, metalness: 1, roughness: .35 })}
        castShadow receiveShadow
      />
    </group>
  );
}