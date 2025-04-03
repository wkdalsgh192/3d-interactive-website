import React, { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import ProjectPopup from '../components/ProjectPopup';
import WebTechModal from "../components/WebTechModal";
import DataVisualsModal from "../components/DataVisualsModal";
import TWEEN from '@tweenjs/tween.js';
import "./PortfolioPage.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PortfolioPage = ({ startAnimation }) => {

    const mountRef = useRef(null);
    
    // Add refs for the variables we need to access outside useEffect
    const boatRef = useRef(null);
    const cameraRef = useRef(null);
    const sizesRef = useRef({
        width: window.innerWidth,
        height: window.innerHeight
    });
    
    const [showWebTechModal, setShowWebTechModal] = useState(false);
    const [showDataVisualModal, setShowDataVisualModal] = useState(false);

    const tweenGroup = new TWEEN.Group();

    useEffect(() => {
        if (!mountRef.current) return;

        /**
         * Loaders
         */
        const loadingManager = new THREE.LoadingManager(
            () => {
              console.log('Loading complete!');
            },
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
                '/assets/flamingo.glb', 
                function(gltf) {
                    console.log('bird loaded successfully');
                    bird = gltf.scene;
                    
                    mixer3 = new THREE.AnimationMixer(bird);
                    action3 = mixer3.clipAction(gltf.animations[0]);
                    
                    // Set up proper looping
                    action3.setLoop(THREE.LoopRepeat);  // Make sure it loops
                    action3.clampWhenFinished = false;   // Don't clamp at the end
                    action3.timeScale = 1;               // Normal speed
                    action3.play();

                    // Rest of your bird setup code...
                    bird.scale.set(0.01, 0.01, 0.01);
                    bird.position.set(0, 5, 10);
            
                    if (bird.children.length > 0) {
                        bird.children[0].rotation.set(Math.PI/2, Math.PI, 0);  // 180도 회전
                    }
            
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

        
        // Scene
        const scene = new THREE.Scene();
        const canvas = mountRef.current; // Use the existing canvas directly

        // Sizes
        const sizes = {
            width: canvas.clientWidth,
            height: canvas.clientHeight
        }
        sizesRef.current = sizes;


        // Camera
        const camera = new THREE.PerspectiveCamera(48, sizes.width / sizes.height, 1, 90);
        camera.position.set(0,20,36);
        cameraRef.current = camera;  // Store camera reference
        scene.add(camera);
        console.log(camera.rotation);

        // Controls
        const controls = new OrbitControls(camera, canvas);
        controls.enabled = false;
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

        scene.traverse((object) => {
            if (object.isMesh) {
                object.castShadow = true; // Enable shadow casting
                object.receiveShadow = true; // Enable shadow receiving
            }
        });

        if (startAnimation) {
            console.log("Starting camera animation:", camera.position);
    
            const tween = new TWEEN.Tween(camera.position)
                .to({ x: 0, y: 8, z: 18 }, 1000)
                .easing(TWEEN.Easing.Cubic.Out)
                .onStart(() => {
                    console.log("Animation started", camera.position);
                    controls.enabled = false;
                })
                .onComplete(() => {
                    console.log("Animation completed", camera.position);
                    controls.enabled = true;
                })
                .start();
            tweenGroup.add(tween);
        }

        // Render
        renderer.render(scene, camera)

        // Add animation loop at the end of useEffect (before the return statement)
        /**
         * Animate
         */
        let azimuthalAngle;
        let birdPos = 0;

        const popups = document.getElementsByClassName("popup");
        const clock = new THREE.Clock();

        const animate = () => {
            const delta = clock.getDelta();
            
            // Update controls and TWEEN
            controls.update();
            tweenGroup.update();   // Update your custom tween group (if used)
            
            spotLight.position.x = Math.sin(azimuthalAngle) * 12.4;
            spotLight.position.z = Math.cos(azimuthalAngle) * 12.4;
            spotLight.target.position.x = Math.sin(azimuthalAngle) * 9;
            spotLight.target.position.z = Math.cos(azimuthalAngle) * 9;

            const elapsedTime = clock.getElapsedTime();

            if (mixer3) mixer3.update(delta);

            // Update cyclist position
            azimuthalAngle = controls.getAzimuthalAngle();
            
            birdPos = azimuthalAngle / (Math.PI*2);
            if ( birdPos < 0 ) {
                birdPos = 0.5 + ( 0.5 + birdPos);
            }

            for (let i = 0; i < popups.length; i++ ){
                if (birdPos >= 0.025 + i/popups.length && birdPos < 0.08 + i/popups.length) {
                    popups[i].classList.remove("hidden");
                    popups[i].classList.add("visible");
                }
                else {
                    popups[i].classList.add("hidden");
                    popups[i].classList.remove("visible");
                }
            }

            if ( bird ) {
                bird.position.x = Math.sin(azimuthalAngle) * 11.4;
                bird.position.z = Math.cos(azimuthalAngle) * 11.4;
                bird.rotation.y = azimuthalAngle - Math.PI/2;

            }

            // Rolling effect
            if (boat) boat.rotation.z = Math.sin(elapsedTime * 2) * 0.05; // 진폭 0.1, 주파수 3
            
            renderer.render(scene, camera);
            window.requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            renderer.dispose();
            // Any other cleanup needed
        };
    }, [startAnimation])

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <canvas ref={mountRef} style={{ width: "100vw", height: "100vh" }} />
            <ProjectPopup 
                position="50%"
                thumbnail="/images/notification_system.png"
                title="Real-Time Multi-Channel Notification System"
                subtitle="Enhancing Engagement and Reliability with Asynchronous Messaging"
                onClickView={() => setShowWebTechModal(true)}
            />
            <WebTechModal 
                isOpen={showWebTechModal}
                onClose={() => setShowWebTechModal(false)}
            />

            <ProjectPopup
                position="50%"
                thumbnail="/images/3d-population-preview.png"
                title="Data Visualization Project"
                subtitle="Data Visualization Project"
                onClickView={() => setShowDataVisualModal(true)}
            />
            <DataVisualsModal
                isOpen={showDataVisualModal}
                onClose={() => setShowDataVisualModal(false)}
            />
        </div>
    );
}

export default PortfolioPage;