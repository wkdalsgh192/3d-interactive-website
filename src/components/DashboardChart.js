import React, { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as d3 from 'd3';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom styled components
const StyledFormControl = styled(FormControl)({
  position: 'absolute',
  top: 20,
  right: 20,
  width: 200,
  zIndex: 1000,
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(12px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
    }
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(0, 0, 0, 0.7)',
    fontWeight: 500,
    textShadow: '0 1px 2px rgba(255, 255, 255, 0.2)',
    '&.Mui-focused': {
      color: 'rgba(0, 0, 0, 0.8)',
    }
  },
  '& .MuiSelect-select': {
    padding: '12px 14px',
    color: 'rgba(0, 0, 0, 0.8)',
  }
});

const StyledMenuItem = styled(MenuItem)({
  padding: '12px 20px',
  margin: '4px 8px',
  borderRadius: '12px',
  backdropFilter: 'blur(12px)',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.35)',
    }
  }
});

const DashboardChart = () => {
  const mountRef = useRef(null);
  const [chartType, setChartType] = useState('bars'); // 'bars', 'circles', 'spiral'
  const sceneRef = useRef(null);

  const createBars = (scene, data, xScale, yScale, colorScale) => {
    data.forEach((d, i) => {
      const height = yScale(d.value);
      const width = xScale.bandwidth();
      
      const geometry = new THREE.BoxGeometry(width, height, width);
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(colorScale(i)),
        transparent: true,
        opacity: 0.8
      });
      
      const bar = new THREE.Mesh(geometry, material);
      bar.position.x = xScale(d.month) + width/2;
      bar.position.y = height/2;
      bar.position.z = 0;
      bar.userData = { ...d };
      
      scene.add(bar);
    });
  };

  const createCircles = (scene, data, xScale, yScale, colorScale) => {
    data.forEach((d, i) => {
      const radius = yScale(d.value) / 3;
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(colorScale(i)),
        transparent: true,
        opacity: 0.8
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.x = xScale(d.month) + xScale.bandwidth()/2;
      sphere.position.y = radius;
      sphere.position.z = 0;
      sphere.userData = { ...d };
      
      scene.add(sphere);
    });
  };

  const createSpiral = (scene, data, yScale, colorScale) => {
    data.forEach((d, i) => {
      const height = yScale(d.value);
      const angle = (i / data.length) * Math.PI * 4;
      const radius = 5 + (i * 0.5);
      
      const geometry = new THREE.ConeGeometry(0.5, height, 32);
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(colorScale(i)),
        transparent: true,
        opacity: 0.8
      });
      
      const cone = new THREE.Mesh(geometry, material);
      cone.position.x = Math.cos(angle) * radius;
      cone.position.y = height/2;
      cone.position.z = Math.sin(angle) * radius;
      cone.userData = { ...d };
      
      scene.add(cone);
    });
  };

  const clearScene = (scene) => {
    while(scene.children.length > 0){ 
      const object = scene.children[0];
      if(object.geometry) object.geometry.dispose();
      if(object.material) object.material.dispose();
      scene.remove(object);
    }
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create tooltip div
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('padding', '10px')
      .style('background', 'rgba(0, 0, 0, 0.7)')
      .style('border-radius', '4px')
      .style('color', 'white')
      .style('font-family', 'Arial')
      .style('font-size', '14px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('z-index', 100);

    // Chart data
    const data = [
      { month: "Jan", value: 30 },
      { month: "Feb", value: 50 },
      { month: "Mar", value: 80 },
      { month: "Apr", value: 40 },
      { month: "May", value: 100 },
      { month: "Jun", value: 65 }
    ];

    // D3 scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.month))
      .range([-10, 10])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([0, 10]);

    const colorScale = d3.scaleSequential()
      .domain([0, data.length])
      .interpolator(d3.interpolateViridis);

    // Create visualization based on chartType
    switch(chartType) {
      case 'bars':
        createBars(scene, data, xScale, yScale, colorScale);
        break;
      case 'circles':
        createCircles(scene, data, xScale, yScale, colorScale);
        break;
      case 'spiral':
        createSpiral(scene, data, yScale, colorScale);
        break;
      default:
        createBars(scene, data, xScale, yScale, colorScale);
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Camera position
    camera.position.set(15, 15, 15);
    camera.lookAt(0, 0, 0);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredObject = null;

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (hoveredObject) {
        hoveredObject.material.opacity = 0.8;
      }

      tooltip.style('opacity', 0);

      if (intersects.length > 0 && intersects[0].object.userData.month) {
        hoveredObject = intersects[0].object;
        hoveredObject.material.opacity = 1;
        
        const { month, value } = hoveredObject.userData;
        tooltip
          .style('opacity', 1)
          .style('left', (event.clientX + 10) + 'px')
          .style('top', (event.clientY - 10) + 'px')
          .html(`
            <strong>${month}</strong><br/>
            Value: ${value}
          `);
      }
    };

    const onMouseLeave = () => {
      tooltip.style('opacity', 0);
      if (hoveredObject) {
        hoveredObject.material.opacity = 0.8;
        hoveredObject = null;
      }
    };

    mountRef.current.addEventListener('mousemove', onMouseMove);
    mountRef.current.addEventListener('mouseleave', onMouseLeave);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeEventListener('mousemove', onMouseMove);
      mountRef.current?.removeEventListener('mouseleave', onMouseLeave);
      mountRef.current?.removeChild(renderer.domElement);
      tooltip.remove();
      renderer.dispose();
    };
  }, [chartType]);

  return (
    <>
      <StyledFormControl>
        <InputLabel>Visualization Type</InputLabel>
        <Select
          value={chartType}
          label="Visualization Type"
          onChange={(e) => setChartType(e.target.value)}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                marginTop: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                '& .MuiList-root': {
                  padding: '8px',
                }
              }
            }
          }}
        >
          <StyledMenuItem value="bars">
            Bar Chart
          </StyledMenuItem>
          <StyledMenuItem value="circles">
            Bubble Chart
          </StyledMenuItem>
          <StyledMenuItem value="spiral">
            Spiral Chart
          </StyledMenuItem>
        </Select>
      </StyledFormControl>
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
    </>
  );
};

export default DashboardChart;