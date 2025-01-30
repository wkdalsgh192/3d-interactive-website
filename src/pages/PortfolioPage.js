import React, { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import "./PortfolioPage.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProjectPopup from '../components/ProjectPopup';
import WebTechModal from '../components/WebTechModal';
import GraphicsModal from '../components/GraphicsModal';
import DataVisualsModal from '../components/DataVisualsModal';
import { projectsData } from '../data/projectsData';

const PortfolioPage = () => {

    const mountRef = useRef(null);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [selectedProject, setSelectedProject] = useState(null);
    
    // Add refs for the variables we need to access outside useEffect
    const boatRef = useRef(null);
    const cameraRef = useRef(null);
    const sizesRef = useRef({
        width: window.innerWidth,
        height: window.innerHeight
    });

    // Separate state for each modal
    const [showWebTechModal, setShowWebTechModal] = useState(false);
    const [showGraphicsModal, setShowGraphicsModal] = useState(false);
    const [showDataVisualsModal, setShowDataVisualsModal] = useState(false);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene
        const scene = new THREE.Scene();
        const canvas = mountRef.current; // Use the existing canvas directly

        // Sizes
        const sizes = {
            width: canvas.clientWidth,
            height: canvas.clientHeight
        }
        sizesRef.current = sizes;

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
                console.log('island loaded successfully');
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
                // renderer.render(scene, camera);
            },
            function(xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function(error) {
                console.error('An error happened while loading the model:', error);
            }
        );

        let boat;
        let mixer2;
        let action2;
        gltfLoader.load(
            '/assets/boat2.glb', 
            function(gltf) {
                console.log('boat loaded successfully');
                boat = gltf.scene;
                boatRef.current = boat;  // Store boat reference
                
                // Adjust scale and position as needed
                boat.scale.set(.5, .5, .5);  // Reduced scale to try different size
                boat.rotation.set(0, Math.PI, 0);
                boat.position.set(0, 2.2, 10);  // Centered position
                
                // Setup animation
                if (gltf.animations && gltf.animations.length) {
                    mixer2 = new THREE.AnimationMixer(boat);
                    const action2 = mixer2.clipAction(gltf.animations[0]);
                    action2.timeScale = 1;  // Changed from 0 to 1 to make animation play
                    action2.play();
                }
                
                // Setup shadows
                gltf.scene.traverse(function(node) {
                    if (node.isMesh) { 
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });
                
                scene.add(boat);
                
            },
            // Add loading progress callback
            function(xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // Add error callback
            function(error) {
                console.error('An error happened while loading the boat:', error);
            });

            let bird;
            let mixer3;
            let action3;
            gltfLoader.load(
                '/assets/bird.glb', 
                function(gltf) {
                    console.log('bird loaded successfully');
                    bird = gltf.scene;
                    
                    // Log animations to check if they exist
                    console.log('Available animations:', gltf.animations);
                    
                    mixer3 = new THREE.AnimationMixer(bird);
                    action3 = mixer3.clipAction(gltf.animations[0]);
                    
                    // Set up proper looping
                    action3.setLoop(THREE.LoopRepeat);  // Make sure it loops
                    action3.clampWhenFinished = false;   // Don't clamp at the end
                    action3.timeScale = 1;               // Normal speed
                    action3.play();

                    // Log animation details
                    console.log("Animation Duration:", action3.getClip().duration);
                    console.log("Loop Mode:", action3.loop);
                    
                    // Rest of your bird setup code...
                    bird.scale.set(0.5, 0.5, 0.5);
                    bird.position.set(0, 5, 10);
            
                    // 🔄 첫 번째 자식 객체에 회전 적용
                    if (bird.children.length > 0) {
                        bird.children[0].rotation.set(Math.PI/2, Math.PI, 0);  // 180도 회전
                    }
            
                    // 🌟 그림자 설정
                    gltf.scene.traverse(function(node) {
                        if (node.isMesh) { 
                            node.castShadow = true;
                            node.receiveShadow = true;
                        }
                    });
                    
                    scene.add(bird);
                },
                function(xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                function(error) {
                    console.error('An error happened while loading the bird:', error);
                }
            );

        // Camera
        const camera = new THREE.PerspectiveCamera(48, sizes.width / sizes.height, 1, 90);
        camera.position.set(0,15,15);
        cameraRef.current = camera;  // Store camera reference
        scene.add(camera);
        console.log(camera.rotation);

        // Controls
        const controls = new OrbitControls(camera, canvas);
        controls.target.set(0,3,0);
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
            canvas: canvas,  // Use existing canvas
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        scene.background = new THREE.Color('#87CEEB');

        renderer.outputEncoding = THREE.SRGBColorSpace;
        renderer.shadowMap.enabled = false;
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
        // Add these after scene creation
        const axesHelper = new THREE.AxesHelper(5);  // Shows X (red), Y (green), Z (blue) axes
        scene.add(axesHelper);

        const gridHelper = new THREE.GridHelper(10, 10);  // Shows a 10x10 grid on the ground
        scene.add(gridHelper);

        // Optional: Add camera helper to see camera's position and view
        const cameraHelper = new THREE.CameraHelper(camera);
        scene.add(cameraHelper);

        // Cursor
        const cursor = {
            x: 0,
            y: 0
        }

        // Render
        // stats.begin()
        renderer.render(scene, camera)

        // Add animation loop at the end of useEffect (before the return statement)
        /**
         * Animate
         */
        let azimuthalAngle;
        let cyclePos = 0;
        let i = 0;
        let g = 0.8;

        const popups = document.getElementsByClassName("popup");
        // 🌊 물 높이를 계산하는 함수 (예제: sine 함수 기반 물결)
        // const getWaterHeightAt = (x, z) => {
        //     return Math.sin(x * 0.3) * 0.5 + Math.cos(z * 0.2) * 0.5;
        // };
        const clock = new THREE.Clock();
        const animate = () => {
            // Update controls
            controls.update()

            spotLight.position.x = Math.sin(azimuthalAngle) * 12.4;
            spotLight.position.z = Math.cos(azimuthalAngle) * 12.4;
            spotLight.target.position.x = Math.sin(azimuthalAngle) * 9;
            spotLight.target.position.z = Math.cos(azimuthalAngle) * 9;

            const delta = clock.getDelta();  // Get delta time once
            const elapsedTime = clock.getElapsedTime();

            if (mixer3) mixer3.update(delta);

            // Update cyclist position
            azimuthalAngle = controls.getAzimuthalAngle();
            cyclePos = azimuthalAngle / (Math.PI*2);
            if ( cyclePos < 0 ) {
                cyclePos = 0.5 + ( 0.5 + cyclePos);
            }

            if ( bird ) {
                bird.position.x = Math.sin(azimuthalAngle) * 11.4;
                bird.position.z = Math.cos(azimuthalAngle) * 11.4;
                bird.rotation.y = azimuthalAngle - Math.PI/2;

                // // 🌊 물 높이를 계산하여 보트 높이 조정
                // const waterHeight = getWaterHeightAt(boatRef.current.position.x, boatRef.current.position.z);
                // boatRef.current.position.y = 2.2 - (waterHeight / 2.2);
                // console.log(waterHeight);
                
                // Update popup position
                updatePopupPosition();
            }

            // Rolling effect
            if (boat) boat.rotation.z = Math.sin(elapsedTime * 2) * 0.05; // 진폭 0.1, 주파수 3
            
            renderer.render(scene, camera);
            // console.log("azimuthalAngle: ", azimuthalAngle);
            
            // Call tick again on the next frame
            window.requestAnimationFrame(animate)
        };

        animate();

        // Cleanup
        return () => {
            renderer.dispose();
            // Any other cleanup needed
        };
    }, [])

    const updatePopupPosition = () => {
        if (boatRef.current) {
            // Get the position vector of the boat
            const vector = new THREE.Vector3();
            boatRef.current.getWorldPosition(vector);
            
            // Project the 3D position to 2D screen space
            vector.project(cameraRef.current);
            
            // Convert to screen coordinates
            const x = (vector.x * 0.5 + 0.5) * sizesRef.current.width;
            const y = (-vector.y * 0.5 + 0.5) * sizesRef.current.height;
            
            setPopupPosition({ x, y });
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <canvas ref={mountRef} style={{ width: "100vw", height: "100vh" }} />
            
            <ProjectPopup 
                position="20%"
                thumbnail="https://cdn.sanity.io/images/jidqpryp/production/645a401b93a88802f8808d7f7e5a22e8fd56248e-160x160.jpg"
                title="Web Development"
                subtitle="An engaging exhibit about seismologic research."
                onClickView={() => setShowWebTechModal(true)}
            />

            <ProjectPopup 
                position="50%"
                thumbnail="https://cdn.sanity.io/images/jidqpryp/production/ebf9aeb33aa30583baebb61989b6647ca6bae174-160x160.jpg"
                title="3D Graphics"
                subtitle="Advanced 3D Graphics rendering techniques."
                onClickView={() => setShowGraphicsModal(true)}
            />

            <ProjectPopup 
                position="80%"
                thumbnail="https://cdn.sanity.io/images/jidqpryp/production/ebf9aeb33aa30583baebb61989b6647ca6bae174-160x160.jpg"
                title="Interactive Visualization"
                subtitle="An series of experiments with interactive visualizations."
                onClickView={() => setShowDataVisualsModal(true)}
            />

            {/* Render all modals with their respective state */}
            <WebTechModal 
                isOpen={showWebTechModal}
                onClose={() => setShowWebTechModal(false)}
            />
            
            <GraphicsModal 
                isOpen={showGraphicsModal}
                onClose={() => setShowGraphicsModal(false)}
            />
            
            <DataVisualsModal 
                isOpen={showDataVisualsModal}
                onClose={() => setShowDataVisualsModal(false)}
            />
        </div>
    );
}


export default PortfolioPage;

