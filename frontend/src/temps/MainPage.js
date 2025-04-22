import React, { useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const MainPage = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add these settings to the renderer
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1); // Set background color to black to see if canvas is working

    // Adjust camera position
    camera.position.set(5, 5, 5); // Move camera back on Z axis

    // Initialize loaders
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/'); // Use CDN path
    dracoLoader.preload();

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    // Load 3D Model
    let model;

    loader.load(
      '/assets/ruins.gltf',
      function ( gltf ) {
        const model = gltf.scene;
        
        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Position model at origin
        model.position.set(-center.x, 0, -center.z); // Place directly at center
        
        // Set a fixed scale
        const scale = 1; // Try a much smaller scale
        model.scale.setScalar(scale);
        
        scene.add(model);
        
        // Add bounding box helper to visualize model bounds
        const boxHelper = new THREE.BoxHelper(model, 0xff0000);
        scene.add(boxHelper);
        
        // Add axes helper to show coordinate system
        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);
        
        // Set camera to a good viewing position
        camera.position.set(10, 10, 10);
        camera.lookAt(0, 0, 0);
        
        // Log for debugging
        console.log('Model loaded');
        console.log('Model position:', model.position);
        console.log('Model scale:', model.scale);
        console.log('Model size:', size);
        console.log('Camera position:', camera.position);
        
        // Log model hierarchy
        console.log('Model hierarchy:');
        model.traverse((child) => {
          console.log(child.type, child.name, child.position);
        });
        
        // If you have animations
        if (gltf.animations && gltf.animations.length) {
          const mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
          });
        }
      },
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      function ( error ) {
        console.error( 'Error loading model:', error );
      }
    );

    // Make grid helper larger
    const gridHelper = new THREE.GridHelper(20, 20);
    scene.add(gridHelper);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add a point light
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    // Adjust OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1;
    controls.maxDistance = 100;

    // Initial camera position
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (model) {
        // Add rotation animation
        model.rotation.y += 0.01; // Adjust speed by changing this number
      }
      
      // controls.update();
      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      dracoLoader.dispose();
      
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      if (model) {
        scene.remove(model);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    />
  );
};

export default MainPage;
