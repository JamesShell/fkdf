import React, { useEffect, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Tilt } from "react-tilt";
import { animated, useSpring } from "@react-spring/three";
import * as THREE from 'three';


export function Model({ isAnimating, setIsAnimating }) {

  const gltf = useLoader(GLTFLoader, "scene.gltf"); // Replace with the path to your glTF model file
  const modelRef = useRef();

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

  

  return isAnimating ? (
    <animated.group ref={modelRef} position={position} rotation={rotation}>
      <primitive object={gltf.scene} />
    </animated.group>
  ) : (
    <group ref={modelRef} position= {[0, -2.5, 0]} rotation= {[0, -1.55, 0]}>
      <primitive object={gltf.scene}/>
    </group>
  );
}

export function GlassPanel({ position, text, onClick }) {
  return (
    <div
      onClick={() => onClick()}
      perspective={1000}
      style={{
        position: "absolute",
        top: position[1] * 100 + "%",
        left: position[0] * 100 + "%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(31, 31, 56, 0.70)",
        borderRadius: "8px",
        padding: "6px 12px",
        color: "#ffffff",
        fontSize: "11px",
        backdropFilter: "blur(10px)",
      }}
    >
      {text}
    </div>
  );
}

export function Stand ({ radiusTop, radiusBottom, height, radialSegments, heightSegments, color, position, rotation }) {
  const cylinderRef = useRef(null);

  useEffect(() => {
    const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments);
    // reflective material light bounce on edges
    const material = new THREE.MeshPhysicalMaterial({
      metalness: 1, // Reflective material
      roughness: 0, // Smooth surface
      side: THREE.DoubleSide // Render both sides of the faces
    });

    //remove a
    // Create lighting area for the cylinder
    const light = new THREE.PointLight(0xffffff, 10, 300);
    light.position.set(4, 4, 0);
    const light2 = new THREE.PointLight(0xffffff, 10, 300);
    light2.position.set(-4, 4, 0);
    cylinderRef.current.add(light2);
    cylinderRef.current.add(light);



    const cylinderMesh = new THREE.Mesh(geometry, material);

    cylinderMesh.position.set(0, height / 2, 0);
    cylinderRef.current.add(cylinderMesh);

    return () => {
      // Clean up the cylinder mesh when the component unmounts
      cylinderRef.current.remove(cylinderMesh);
      geometry.dispose();
      material.dispose();
    };
  }, [radiusTop, radiusBottom, height, radialSegments, heightSegments, color, position, rotation]);

  return <group ref={cylinderRef} position={position} rotation={rotation}/>;
};
