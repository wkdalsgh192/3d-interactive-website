import React, { useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

const DashboardModel = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Sample data for donut chart
    const data = [
      { label: "Segment 1", value: 30, color: 0xff4444 },
      { label: "Segment 2", value: 20, color: 0x44ff44 },
      { label: "Segment 3", value: 15, color: 0x4444ff },
      { label: "Segment 4", value: 35, color: 0xffff44 }
    ];

    // Create donut chart segments
    const outerRadius = 5;
    const innerRadius = 3; // Added inner radius for donut
    const height = 2;
    const totalValue = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = 0;

    data.forEach(segment => {
      const angle = (segment.value / totalValue) * Math.PI * 2;
      
      // Create segment geometry with inner circle
      const shape = new THREE.Shape();
      
      // Starting point at inner radius
      shape.moveTo(innerRadius * Math.cos(startAngle), innerRadius * Math.sin(startAngle));
      
      // Draw line to outer radius
      shape.lineTo(outerRadius * Math.cos(startAngle), outerRadius * Math.sin(startAngle));
      
      // Draw outer arc
      const outerArc = new THREE.Path();
      outerArc.absarc(0, 0, outerRadius, startAngle, startAngle + angle, false);
      shape.add(outerArc);
      
      // Draw line back to inner radius
      shape.lineTo(innerRadius * Math.cos(startAngle + angle), innerRadius * Math.sin(startAngle + angle));
      
      // Draw inner arc
      const innerArc = new THREE.Path();
      innerArc.absarc(0, 0, innerRadius, startAngle + angle, startAngle, true);
      shape.add(innerArc);

      const extrudeSettings = {
        steps: 1,
        depth: height,
        bevelEnabled: false
      };

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const material = new THREE.MeshPhongMaterial({
        color: segment.color,
        side: THREE.DoubleSide,
        shininess: 100
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = Math.PI / 2;
      scene.add(mesh);

      startAngle += angle;
    });

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Camera position
    camera.position.set(0, 15, 15);
    camera.lookAt(0, 0, 0);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // GUI controls
    const gui = new dat.GUI();
    const chartControls = {
      rotationSpeed: 0.01,
      height: height,
      innerRadius: innerRadius,
      outerRadius: outerRadius
    };

    gui.add(chartControls, 'rotationSpeed', 0, 0.05);
    gui.add(chartControls, 'height', 0.1, 5).onChange(value => {
      scene.children.forEach(child => {
        if (child.type === 'Mesh') {
          child.scale.y = value / height;
        }
      });
    });

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the entire chart
      scene.rotation.y += chartControls.rotationSpeed;
      
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      gui.destroy();
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
export default DashboardModel;
