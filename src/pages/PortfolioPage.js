import React, { useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const PortfolioPage = () => {

    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return; // Prevent running if the ref is not attached

        // Scene
        const scene = new THREE.Scene();
        const canvas = document.createElement("canvas");
        mountRef.current.appendChild(canvas); // Append canvas inside div

        // Sizes
        const sizes = {
            width: mountRef.current.clientWidth,
            height: mountRef.current.clientHeight
        }

        /**
         * Loaders
         */
        const loadingManager = new THREE.LoadingManager(
            // Called when everything is loaded
            () => {
                console.log('Loading complete!');
            },
            // Called while loading is progressing
            (itemUrl, itemsLoaded, itemsTotal) => {
                console.log(`Loading file: ${itemUrl}. ${itemsLoaded} of ${itemsTotal} files.`);
            },
            // Called when loading has errors
            (url) => {
                console.error('There was an error loading ' + url);
            }
        );

        // Draco loader
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/'); // Updated path to use CDN

        // GLTF loader
        const gltfLoader = new GLTFLoader(loadingManager);
        gltfLoader.setDRACOLoader(dracoLoader);

        let island;
        gltfLoader.load(
            '/assets/island2.glb',  // Make sure this path is correct relative to your public folder
            function(gltf) {
                console.log('Model loaded successfully');
                island = gltf.scene;
                gltf.scene.traverse(function(node) {
                    if (node.isMesh) { 
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });
                // Add these lines to help position and scale the model if needed
                island.scale.set(0.4, 0.4, 0.4);  // Adjust scale if needed
                island.position.set(0, 0, 0);  // Adjust position if needed
                scene.add(island);
                
                // Force a render after adding the model
                renderer.render(scene, camera);
            },
            function(xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function(error) {
                console.error('An error happened while loading the model:', error);
            }
        );

        // Camera
        const camera = new THREE.PerspectiveCamera(64, sizes.width / sizes.height, 1, 90);
        camera.position.set(0,10,10);
        scene.add(camera);

        // Controls
        const controls = new OrbitControls(camera, canvas);
        controls.target.set(0,0,0);
        controls.enablePan = false;
        controls.minPolarAngle = Math.PI/2.4;
        controls.maxPolarAngle = Math.PI/2.15;
        controls.minDistance = 16;
        controls.maxDistance = 30;
        controls.enableDamping = true;
        controls.rotateSpeed = 0.25;

        // Renderer
        THREE.Cache.enabled = true;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            canvas: canvas
        })
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        // renderer.setClearColor( 0xffffff, 0);
        // scene.background = null;
        scene.background = new THREE.Color('#87CEEB'); 

        renderer.outputEncoding = THREE.SRGBColorSpace;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.VSMShadowMap;

        // Lights
        const hemiLight = new THREE.HemisphereLight( 0xfff, 0xfff, 0.6 );
        hemiLight.color.setHSL( 0.6, 1, 0.6 );
        hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
        hemiLight.position.set( 0, 500, 0 );
        scene.add( hemiLight );

        let shadowMapSize = 13;
        const sunLight = new THREE.DirectionalLight(0xffffff, 1, 100);
        sunLight.position.set(0,12,12);
        sunLight.color.setHSL( 0.1, 1, 0.95 );
        sunLight.visible = true;
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        sunLight.shadow.camera.near = 0.5; 
        sunLight.shadow.camera.far = shadowMapSize*2;
        sunLight.shadow.camera.top = shadowMapSize;
        sunLight.shadow.camera.bottom = -shadowMapSize;
        sunLight.shadow.camera.left = -shadowMapSize;
        sunLight.shadow.camera.right = shadowMapSize;
        sunLight.shadow.normalBias = 0.02;
        scene.add(sunLight);
        scene.add( sunLight.target );

        // const helper = new THREE.CameraHelper( sunLight.shadow.camera );
        // scene.add( helper );

        const spotLight = new THREE.SpotLight(0xffffff, 4, 6, Math.PI/4, 1, 1);
        spotLight.position.set( 0, 3.5, 0 );
        spotLight.visible = false;
        spotLight.castShadow = false;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.camera.near = 0.5; 
        spotLight.shadow.camera.far = 2;
        spotLight.shadow.normalBias = 0.02;
        scene.add( spotLight );
        scene.add( spotLight.target );

        // const helper2 = new THREE.CameraHelper( spotLight.shadow.camera );
        // scene.add( helper2 );

        // Cursor
        const cursor = {
            x: 0,
            y: 0
        }

        // Render
        // stats.begin()
        renderer.render(scene, camera)

        // Add animation loop at the end of useEffect (before the return statement)
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

    }, [])

    return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
}


export default PortfolioPage;

