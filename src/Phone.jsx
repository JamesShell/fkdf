import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Canvas } from "@react-three/fiber";
import { GlassPanel, Model, Stand } from "./Model";

function Phone({animate, setAnimate}) {
    return (
        <div className="position-relative h-100">
              <Canvas className="canvas max-h-100 max-w-100">
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Model isAnimating={animate} setIsAnimating={setAnimate} />
                <Stand
        radiusTop={3}
        radiusBottom={3}
        height={.3}
        radialSegments={32}
        heightSegments={1}
        color={0xffffff} // Green color
        position={[0, -2.8, 0]}
        rotation={[-.3, 0, 0]}
      />
      <Stand
        radiusTop={2.8}
        radiusBottom={3}
        height={.35}
        radialSegments={32}
        heightSegments={1}
        color={0xffffff} // Green color
        position={[0, -2.8, 0]}
        rotation={[-.3, 0, 0]}
      />
      <Stand
        radiusTop={2}
        radiusBottom={3}
        height={.4}
        radialSegments={32}
        heightSegments={1}
        color={0xffffff} // Green color
        position={[0, -2.8, 0]}
        rotation={[-.3, 0, 0]}
      />
              </Canvas>

              <GlassPanel
                position={[0.08, 0.2]}
                text="Got it, so a mix of performance"
                onClick={() => console.log("clicked")}
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