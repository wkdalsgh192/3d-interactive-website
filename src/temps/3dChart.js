import * as THREE from "three";
import TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

export const render3dChart = (data, container) => {
  // Early return if container is not ready
  if (!container) return;

  // Wait for next frame to ensure container is rendered
  requestAnimationFrame(() => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const cameraOffset = 10;
    const camera = new THREE.OrthographicCamera(
      -cameraOffset,
      cameraOffset,
      cameraOffset,
      -cameraOffset,
      1,
      1000
    );
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Camera position
    const gui = new dat.GUI();
    scene.add(new THREE.GridHelper(100, 100));
    camera.position.set(-10, 20, 10);
    camera.zoom = 1;
    camera.updateProjectionMatrix();

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 11, 0);
    controls.enableDamping = true;

    const allColors = [
      0xfeffc8, 0xfffec0, 0xfffcb7, 0xfffaaf, 0xfff7a7, 0xfff39f, 0xffef96,
      0xffeb8e, 0xffe686, 0xffe17e, 0xffdb75, 0xffd56d, 0xffce65, 0xffc75c,
      0xffc054, 0xffb84c, 0xffaf44, 0xffa63b, 0xff9d33, 0xff932b, 0xff8922,
      0xff7e1a, 0xff7312, 0xff670a, 0xff5b01, 0xf85100, 0xf04700, 0xe83e00,
      0xdf3600, 0xd72e00,
    ];
  
    // Add your data visualization here
    const svgList = document.querySelectorAll("svg.population-chart");
    const loader = new SVGLoader();
    const fontLoader = new FontLoader();
    const textMaterial = new THREE.MeshStandardMaterial(0xffffff);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const HOVER_SCALE = 1.1;
    const CLICK_OFFSET = 2; // How far the mesh pulls out when clicked
    let selectedMesh = null; // Track currently selected mesh

    const dataDisplay = document.createElement('div');
    dataDisplay.style.cssText = `
        position: absolute;
        width: 300px;
        height: 300px;
        top: 50%;
        right: 10%;
        transform: translateY(-50%);
        padding: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        border-radius: 8px;
        font-size: 24px;
        pointer-events: none;
        display: none;
        z-index: 100;
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    container.appendChild(dataDisplay);

    // Create a TWEEN group
    const tweenGroup = new TWEEN.Group();

    const onClick = (event) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      // Reset previous selection
      if (selectedMesh) {
        // Animate back to original position
        new TWEEN.Tween(selectedMesh.position, tweenGroup)
        .to({ x: selectedMesh.userData.originalPosition.x }, 500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
        selectedMesh = null;
        dataDisplay.style.display = 'none';
      }

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        if (intersectedObject.userData.isChart) {
          selectedMesh = intersectedObject;
          
          // Store original position if not already stored
          if (!selectedMesh.userData.originalPosition) {
            selectedMesh.userData.originalPosition = selectedMesh.position.clone();
          }

          console.log(selectedMesh.userData);
          // Show data for the selected country
          const countryData = data[selectedMesh.userData.index];
          const popuCount = countryData["Values"][57]["Count"];
          const popuCountFormatted = (popuCount / 1000000).toFixed(2) + "M";

          // Update the data display
          dataDisplay.innerHTML = `
            <h3 style="margin: 0 0 12px 0; color: #fff; font-size: 18px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 8px;">
              ${countryData.Country}
            </h3>
            <div style="margin-bottom: 8px; font-size: 16px;">
              Population: <strong>${popuCountFormatted}</strong>
            </div>
            <div style="font-size: 12px; color: #aaa; margin-top: 12px;">
              Click anywhere else to close
            </div>
          `;

          // Show the display
          dataDisplay.style.display = 'block';

          // Animate to pulled out position
          new TWEEN.Tween(selectedMesh.position, tweenGroup)
            .to({ x: selectedMesh.userData.originalPosition.x - CLICK_OFFSET }, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
        } else {
          dataDisplay.style.display = 'none';
        }
      }
    };

    for (let i = 0; i < svgList.length; ++i) {
      const svgData = loader.parse(svgList[i].outerHTML);
      const shape = svgData.paths[0].toShapes(true)[0];

      const geometry2 = new THREE.ExtrudeGeometry(shape, {
        steps: 2,
        depth: 16,
      });

      const cubeMaterial = new THREE.MeshStandardMaterial({
        color: allColors[svgList.length - i - 1],
        // color: 0xffffff,
      });

      let mesh = new THREE.Mesh(geometry2, cubeMaterial);
      mesh.userData.isChart = true;
      mesh.userData.index = i;
      mesh.userData.originalPosition = mesh.position.clone();
      scene.add(mesh);
      mesh.scale.set(0.01, 0.01, 0.01);
      mesh.rotation.set(0, Math.PI, Math.PI);
      if (i === 0) {
        mesh.position.set(0, 15, -10 + i / 3);
      } else {
        mesh.position.set(0, 15, -10 + i / 3);
      }
      // Store original position AFTER setting it
      mesh.userData.originalPosition = mesh.position.clone();

      mesh.castShadow = true; //default is false
      mesh.receiveShadow = true;

      fontLoader.load("/fonts/ibm_plex.json", (font) => {
        const textGeometry = new TextGeometry(data[i].Country.toUpperCase(), {
          font: font,
          size: 0.15,
          depth: 0.04,
        });
  
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.geometry.computeBoundingBox();
        textMesh.geometry.translate(-textMesh.geometry.boundingBox.max.x, 0, 0);
        textMesh.rotation.set(-Math.PI / 2, 0, 0);
        textMesh.position.set(-0.2, 0.1, -10 + i / 3);
  
        scene.add(textMesh);
      });

    }

    const allPoints = [
      [new THREE.Vector3(-1, 1, -10.2), new THREE.Vector3(0, 1, -10.2)],
      [new THREE.Vector3(-1, 5, -10.2), new THREE.Vector3(0, 5, -10.2)],
      [new THREE.Vector3(-1, 10, -10.2), new THREE.Vector3(0, 10, -10.2)],
      [new THREE.Vector3(-1, 15, -10.2), new THREE.Vector3(3.5, 15, -10.2)],
      [new THREE.Vector3(6, 16, -10.2), new THREE.Vector3(6, 16, -3)],
      [new THREE.Vector3(5, 5, 0), new THREE.Vector3(5, 5, 1)],
      [new THREE.Vector3(5, 2, 0), new THREE.Vector3(5, 2, 1)],
    ];
  
    const lineMaterial = new THREE.LineDashedMaterial({
      color: 0xffffff,
      linewidth: 1,
      dashSize: 0.1,
      gapSize: 0.1,
    });
  
    for (let i = 0; i < allPoints.length; i++) {
      const dataPoints = allPoints[i];
      const lineGeom = new THREE.BufferGeometry().setFromPoints(dataPoints);
      const line = new THREE.Line(lineGeom, lineMaterial);
      line.computeLineDistances();
      scene.add(line);
    }

    const normalLineMaterial = new THREE.LineBasicMaterial(0xffffff);
    // Axis Lines
    for (let i = 0; i < 11; i++) {
      const points = [];
      let lineZEnd = i === 0 || i === 10 ? 1.5 : 0.5;
      const xOffset = 2;

      points.push(new THREE.Vector3(i / xOffset, 0, -0.2));
      points.push(new THREE.Vector3(i / xOffset, 0, lineZEnd));

      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        normalLineMaterial
      );
      line.computeLineDistances();
      scene.add(line);
    }

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(5, 30, 31);

    const spotLight2 = new THREE.SpotLight(0xffffff, 0.8);
    spotLight2.position.set(-25, 3, 2);

    const spotLight3 = new THREE.SpotLight(0xffffff, 0.2);
    spotLight3.position.set(6, 14, 35);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // spotLight.castShadow = true;
    spotLight2.castShadow = true;
    spotLight3.castShadow = true;

    spotLight3.shadow.mapSize.width = 1024;
    spotLight3.shadow.mapSize.height = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.mapSize.width = 1024;
    spotLight2.shadow.mapSize.height = 1024;
    spotLight2.shadow.mapSize.width = 1024;

    scene.add(spotLight);
    scene.add(spotLight2);
    scene.add(spotLight3);

    // Add click event listener
    container.addEventListener('click', onClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      tweenGroup.update(); // Update our specific group
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('click', onClick);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  });
};