import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise.js";

// Procedural Terrain Component
const ProceduralTerrain = () => {
  const meshRef = useRef();
  const size = 100; // Grid Size
  const noise = new SimplexNoise();

  // Generate procedural heightmap with Simplex noise
  const geometry = useMemo(() => {
    const terrainGeometry = new THREE.PlaneGeometry(10, 10, size, size);
    terrainGeometry.rotateX(-Math.PI / 2);

    const vertices = terrainGeometry.attributes.position.array;

    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      vertices[i + 2] = noise.noise(x * 0.1, y * 0.1) * 2; // Adjust scale and amplitude
    }

    terrainGeometry.computeVertexNormals();
    return terrainGeometry;
  }, [size, noise]);

  // Animate terrain wave effect
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const vertices = meshRef.current.geometry.attributes.position.array;

    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      vertices[i + 2] = noise.noise(x * 0.1 + time * 0.1, y * 0.1 + time * 0.1) * 2;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color="green" wireframe={false} />
    </mesh>
  );
};

// Main React Component
const ProceduralScene = () => {
  return (
    <div>
      <h1>Procedural Scene</h1>
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <ProceduralTerrain />
      </Canvas>
    </div>
  );
};

export default ProceduralScene;