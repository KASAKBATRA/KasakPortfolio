import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface AuditUniverseCanvasProps {
  onProgressChange?: (progress: number, stageName: string) => void;
}

interface ParticleLayout {
  // Stage 0: Chaos
  chaosX: Float32Array;
  chaosY: Float32Array;
  chaosZ: Float32Array;
  chaosColorR: Float32Array;
  chaosColorG: Float32Array;
  chaosColorB: Float32Array;

  // Stage 1: Validation Grid
  gridX: Float32Array;
  gridY: Float32Array;
  gridZ: Float32Array;
  gridColorR: Float32Array;
  gridColorG: Float32Array;
  gridColorB: Float32Array;

  // Stage 2: Projects Focus
  projectX: Float32Array;
  projectY: Float32Array;
  projectZ: Float32Array;

  // Stage 3: Constellation
  constellationX: Float32Array;
  constellationY: Float32Array;
  constellationZ: Float32Array;

  isDuplicate: Uint8Array;
  isAnomaly: Uint8Array;
  driftSpeed: Float32Array;
  driftPhase: Float32Array;
}

export const AuditUniverseCanvas: React.FC<AuditUniverseCanvasProps> = ({ onProgressChange }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [currentStage, setCurrentStage] = useState<'00' | '01' | '02' | '03' | '04'>('00');
  const [stageProgressPercent, setStageProgressPercent] = useState(0);
  const [stageTitle, setStageTitle] = useState('00 // CHAOS TELEMETRY');

  const mouse = useRef({ x: 0, y: 0, active: false });
  const scrollYRef = useRef(0);
  const smoothScrollRef = useRef(0);

  useEffect(() => {
    // Check WebGL availability
    const checkWebGL = () => {
      try {
        const testCanvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && 
          (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')));
      } catch {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebglSupported(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 900 : 2600;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Three.js Core Components
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0e0d0b, 0.02);

    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      250
    );
    camera.position.set(0, 0, 26);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Multi-Stage Cinematic Camera Curve traversing 0.0 to 1.0 (Page Start to Page End)
    const cameraPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 26),        // 0.00: Hero (front wide)
      new THREE.Vector3(2.5, -3.0, 20),    // 0.20: Stats & Benchmarks
      new THREE.Vector3(-1.8, -9.0, 15),   // 0.40: Experience dive
      new THREE.Vector3(3.2, -15.0, 18),   // 0.60: Projects curve
      new THREE.Vector3(-2.0, -22.0, 16),  // 0.80: Research & Constellation
      new THREE.Vector3(0, -28.0, 12),     // 1.00: Contact & Resolved Horizon
    ]);

    const cameraLookAt = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.5, -3.5, 0),
      new THREE.Vector3(0, -9.5, 0),
      new THREE.Vector3(0.5, -15.5, 0),
      new THREE.Vector3(0, -22.5, 0),
      new THREE.Vector3(0, -28.5, 0),
    ]);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xff6a2b, 1.4);
    dirLight.position.set(15, 20, 18);
    scene.add(dirLight);

    const tealLight = new THREE.PointLight(0x2dd4bf, 2.0, 45);
    tealLight.position.set(-12, -8, 12);
    scene.add(tealLight);

    const warmLight = new THREE.PointLight(0xff8c42, 1.8, 40);
    warmLight.position.set(10, -20, 10);
    scene.add(warmLight);

    // 3D Geometric Floating Objects (Audit Crystals & Rings)
    const geometricGroup = new THREE.Group();
    scene.add(geometricGroup);

    // 1. Rotating Wireframe Icosahedron (The Anomaly Core)
    const icoGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0xff6a2b,
      wireframe: true,
      emissive: 0xff6a2b,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.75,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(7.5, 2, -2);
    geometricGroup.add(icoMesh);

    // 2. Concentric Scanner Rings
    const ringGeo1 = new THREE.TorusGeometry(3.6, 0.03, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x2dd4bf, transparent: true, opacity: 0.45 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.8;
    icoMesh.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(4.4, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xff6a2b, transparent: true, opacity: 0.3 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3;
    icoMesh.add(ring2);

    // 3. Second Geometric Node in lower depth (Stage 2/3 landmark)
    const octGeo = new THREE.OctahedronGeometry(2.8, 1);
    const octMat = new THREE.MeshStandardMaterial({
      color: 0x2dd4bf,
      wireframe: true,
      emissive: 0x2dd4bf,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.65,
    });
    const octMesh = new THREE.Mesh(octGeo, octMat);
    octMesh.position.set(-6.5, -16, 2);
    geometricGroup.add(octMesh);

    // Instanced Mesh for Particles
    const boxGeo = new THREE.BoxGeometry(0.19, 0.19, 0.19);
    const boxMat = new THREE.MeshStandardMaterial({
      roughness: 0.3,
      metalness: 0.2,
      vertexColors: true,
    });

    const instancedMesh = new THREE.InstancedMesh(boxGeo, boxMat, count);
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.setUsage(THREE.DynamicDrawUsage);
    }
    scene.add(instancedMesh);

    // Layout Buffers
    const layout: ParticleLayout = {
      chaosX: new Float32Array(count),
      chaosY: new Float32Array(count),
      chaosZ: new Float32Array(count),
      chaosColorR: new Float32Array(count),
      chaosColorG: new Float32Array(count),
      chaosColorB: new Float32Array(count),

      gridX: new Float32Array(count),
      gridY: new Float32Array(count),
      gridZ: new Float32Array(count),
      gridColorR: new Float32Array(count),
      gridColorG: new Float32Array(count),
      gridColorB: new Float32Array(count),

      projectX: new Float32Array(count),
      projectY: new Float32Array(count),
      projectZ: new Float32Array(count),

      constellationX: new Float32Array(count),
      constellationY: new Float32Array(count),
      constellationZ: new Float32Array(count),

      isDuplicate: new Uint8Array(count),
      isAnomaly: new Uint8Array(count),
      driftSpeed: new Float32Array(count),
      driftPhase: new Float32Array(count),
    };

    // Color definitions
    const errR = 0.95, errG = 0.25, errB = 0.25;
    const orangeR = 1.0, orangeG = 0.41, orangeB = 0.17;
    const tealR = 0.17, tealG = 0.83, tealB = 0.75;
    const whiteR = 0.94, whiteG = 0.92, whiteB = 0.88;
    const mutedR = 0.45, mutedG = 0.43, mutedB = 0.40;

    const cols = isMobile ? 30 : 54;
    const spacingX = 0.58;
    const spacingY = 0.50;
    const totalDuplicates = Math.floor(count * 0.18);

    for (let i = 0; i < count; i++) {
      // 1. Stage 0: Chaos Cloud
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 20;
      const sinPhi = Math.sin(phi);

      layout.chaosX[i] = r * sinPhi * Math.cos(theta);
      layout.chaosY[i] = (r * sinPhi * Math.sin(theta)) * 0.8;
      layout.chaosZ[i] = r * Math.cos(phi) * 0.85;

      layout.driftSpeed[i] = 0.2 + Math.random() * 0.8;
      layout.driftPhase[i] = Math.random() * Math.PI * 2;

      const isRedError = i < count * 0.05;
      const isOrangeAnomaly = !isRedError && i < count * 0.16;
      const isDup = !isRedError && !isOrangeAnomaly && i < totalDuplicates + count * 0.16;

      layout.isAnomaly[i] = isOrangeAnomaly ? 1 : 0;
      layout.isDuplicate[i] = isDup ? 1 : 0;

      if (isRedError) {
        layout.chaosColorR[i] = errR; layout.chaosColorG[i] = errG; layout.chaosColorB[i] = errB;
      } else if (isOrangeAnomaly) {
        layout.chaosColorR[i] = orangeR; layout.chaosColorG[i] = orangeG; layout.chaosColorB[i] = orangeB;
      } else {
        const grey = 0.55 + Math.random() * 0.35;
        layout.chaosColorR[i] = grey; layout.chaosColorG[i] = grey * 0.96; layout.chaosColorB[i] = grey * 0.92;
      }

      // 2. Stage 1: Validation Grid (Experience)
      const col = i % cols;
      const row = Math.floor(i / cols);
      const gridBaseX = (col - cols / 2) * spacingX;
      const gridBaseY = -8.0 - row * spacingY;
      const layerOffsetZ = ((col + row) % 3) * 0.25;

      if (isDup) {
        const parentIdx = Math.max(0, i - 12);
        const pCol = parentIdx % cols;
        const pRow = Math.floor(parentIdx / cols);
        layout.gridX[i] = (pCol - cols / 2) * spacingX;
        layout.gridY[i] = -8.0 - pRow * spacingY;
        layout.gridZ[i] = 0.0;
        layout.gridColorR[i] = mutedR * 0.4; layout.gridColorG[i] = mutedG * 0.4; layout.gridColorB[i] = mutedB * 0.4;
      } else if (isOrangeAnomaly) {
        layout.gridX[i] = gridBaseX;
        layout.gridY[i] = gridBaseY;
        layout.gridZ[i] = layerOffsetZ + 0.9;
        layout.gridColorR[i] = orangeR; layout.gridColorG[i] = orangeG; layout.gridColorB[i] = orangeB;
      } else {
        layout.gridX[i] = gridBaseX;
        layout.gridY[i] = gridBaseY;
        layout.gridZ[i] = layerOffsetZ;
        if (row % 4 === 0) {
          layout.gridColorR[i] = tealR; layout.gridColorG[i] = tealG; layout.gridColorB[i] = tealB;
        } else {
          layout.gridColorR[i] = whiteR; layout.gridColorG[i] = whiteG; layout.gridColorB[i] = whiteB;
        }
      }

      // 3. Stage 2: Projects Spiral
      const projAngle = i * 0.035;
      const projRadius = 4.0 + (i % 5) * 1.6;
      layout.projectX[i] = Math.cos(projAngle) * projRadius;
      layout.projectY[i] = -15.0 + Math.sin(projAngle) * 3.5 + ((i % 12) - 6) * 0.4;
      layout.projectZ[i] = Math.sin(projAngle) * projRadius * 0.7;

      // 4. Stage 3: Constellation Galaxy (Research & Skills)
      const arms = 4;
      const armIndex = i % arms;
      const armAngle = (armIndex * (2 * Math.PI / arms)) + (i * 0.008);
      const distFromCenter = Math.sqrt(i / count) * 14.0;
      layout.constellationX[i] = Math.cos(armAngle) * distFromCenter;
      layout.constellationY[i] = -23.0 + ((i % 7) - 3.5) * 0.8;
      layout.constellationZ[i] = Math.sin(armAngle) * distFromCenter * 0.85;
    }

    const dummyMatrix = new THREE.Matrix4();
    const dummyPosition = new THREE.Vector3();
    const dummyRotation = new THREE.Euler();
    const dummyScale = new THREE.Vector3();
    const dummyColor = new THREE.Color();
    const raycaster = new THREE.Raycaster();
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouseWorldPos = new THREE.Vector3();

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current.active = true;
    };

    const handleMouseLeave = () => {
      mouse.current.active = false;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Full document scroll progress 0.0 to 1.0
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1000);
      const rawTargetProgress = Math.min(Math.max(scrollYRef.current / maxScroll, 0), 1);
      smoothScrollRef.current += (rawTargetProgress - smoothScrollRef.current) * 0.06;
      const t = prefersReducedMotion ? rawTargetProgress : smoothScrollRef.current;

      // Rotate geometric landmarks
      icoMesh.rotation.x = elapsedTime * 0.35 + t * 4.0;
      icoMesh.rotation.y = elapsedTime * 0.25;
      ring1.rotation.z = elapsedTime * 0.5;
      ring2.rotation.z = -elapsedTime * 0.4;
      octMesh.rotation.x = -elapsedTime * 0.25;
      octMesh.rotation.y = elapsedTime * 0.3 + t * 3.0;

      // Parallax mouse tilt on geometric group
      if (mouse.current.active && !isMobile) {
        geometricGroup.rotation.y = mouse.current.x * 0.15;
        geometricGroup.rotation.x = -mouse.current.y * 0.15;
      }

      // Determine Story Stage
      let stage: '00' | '01' | '02' | '03' | '04' = '00';
      let title = '00 // CHAOS TELEMETRY';
      if (t < 0.20) {
        stage = '00';
        title = '00 // CHAOS TELEMETRY';
      } else if (t < 0.42) {
        stage = '01';
        title = '01 // ORDER & RECONCILIATION';
      } else if (t < 0.65) {
        stage = '02';
        title = '02 // ANOMALIES & SYSTEMS';
      } else if (t < 0.85) {
        stage = '03';
        title = '03 // NEURAL CONSTELLATION';
      } else {
        stage = '04';
        title = '04 // AUDIT-READY HORIZON';
      }

      setCurrentStage(stage);
      setStageTitle(title);
      const pct = Math.round(t * 100);
      setStageProgressPercent(pct);

      if (onProgressChange) {
        onProgressChange(t, title);
      }

      // Camera Fly-Through
      const camP = cameraPath.getPointAt(t);
      const camLook = cameraLookAt.getPointAt(t);

      // Subtle mouse sway on camera
      if (!isMobile && mouse.current.active) {
        camP.x += mouse.current.x * 0.8;
        camP.y += mouse.current.y * 0.6;
      }

      camera.position.copy(camP);
      camera.lookAt(camLook);

      // Raycast for desktop mouse repulsion
      if (mouse.current.active && !isMobile) {
        raycaster.setFromCamera(new THREE.Vector2(mouse.current.x, mouse.current.y), camera);
        raycaster.ray.intersectPlane(mousePlane, mouseWorldPos);
      }

      // S-curve interpolation for stages
      for (let i = 0; i < count; i++) {
        let posX = 0, posY = 0, posZ = 0;
        let cR = 0, cG = 0, cB = 0;
        let scale = 1.0;

        const drift = Math.sin(elapsedTime * layout.driftSpeed[i] + layout.driftPhase[i]);
        const driftX = drift * 0.4;
        const driftY = Math.cos(elapsedTime * layout.driftSpeed[i] * 0.8) * 0.4;
        const driftZ = Math.sin(elapsedTime * 0.5 + layout.driftPhase[i]) * 0.4;

        if (t < 0.28) {
          // Stage 0 -> Stage 1 (Chaos to Grid)
          const localT = t / 0.28;
          const easeT = localT * localT * (3 - 2 * localT);

          const sX = layout.chaosX[i] + driftX * (1 - easeT);
          const sY = layout.chaosY[i] + driftY * (1 - easeT);
          const sZ = layout.chaosZ[i] + driftZ * (1 - easeT);

          posX = sX + (layout.gridX[i] - sX) * easeT;
          posY = sY + (layout.gridY[i] - sY) * easeT;
          posZ = sZ + (layout.gridZ[i] - sZ) * easeT;

          cR = layout.chaosColorR[i] + (layout.gridColorR[i] - layout.chaosColorR[i]) * easeT;
          cG = layout.chaosColorG[i] + (layout.gridColorG[i] - layout.chaosColorG[i]) * easeT;
          cB = layout.chaosColorB[i] + (layout.gridColorB[i] - layout.chaosColorB[i]) * easeT;

          if (layout.isDuplicate[i] === 1 && easeT > 0.3) {
            scale = 1.0 - Math.min((easeT - 0.3) / 0.7, 1.0) * 0.85;
          }
        } else if (t < 0.60) {
          // Stage 1 -> Stage 2 (Grid to Projects Spiral)
          const localT = (t - 0.28) / 0.32;
          const easeT = localT * localT * (3 - 2 * localT);

          posX = layout.gridX[i] + (layout.projectX[i] - layout.gridX[i]) * easeT;
          posY = layout.gridY[i] + (layout.projectY[i] - layout.gridY[i]) * easeT;
          posZ = layout.gridZ[i] + (layout.projectZ[i] - layout.gridZ[i]) * easeT;

          // Color transition: anomalies shine orange, others settle into cool teal and off-white
          if (layout.isAnomaly[i] === 1) {
            cR = orangeR; cG = orangeG; cB = orangeB;
            scale = 1.2 + Math.sin(elapsedTime * 3.0 + i) * 0.3;
          } else {
            cR = layout.gridColorR[i]; cG = layout.gridColorG[i]; cB = layout.gridColorB[i];
          }
        } else if (t < 0.85) {
          // Stage 2 -> Stage 3 (Projects Spiral to Constellation)
          const localT = (t - 0.60) / 0.25;
          const easeT = localT * localT * (3 - 2 * localT);

          posX = layout.projectX[i] + (layout.constellationX[i] - layout.projectX[i]) * easeT;
          posY = layout.projectY[i] + (layout.constellationY[i] - layout.projectY[i]) * easeT;
          posZ = layout.projectZ[i] + (layout.constellationZ[i] - layout.projectZ[i]) * easeT;

          cR = (i % 3 === 0) ? orangeR : (i % 2 === 0) ? tealR : whiteR;
          cG = (i % 3 === 0) ? orangeG : (i % 2 === 0) ? tealG : whiteG;
          cB = (i % 3 === 0) ? orangeB : (i % 2 === 0) ? tealB : whiteB;
          scale = 0.9 + Math.sin(elapsedTime * 2.0 + i * 0.2) * 0.2;
        } else {
          // Stage 4 (Contact: Harmonic cyber plane)
          const localT = (t - 0.85) / 0.15;
          const easeT = Math.min(localT * localT * (3 - 2 * localT), 1);

          const col = i % cols;
          const row = Math.floor(i / cols);
          const targetX = (col - cols / 2) * spacingX * 1.3;
          const targetY = -28.0;
          const targetZ = -row * spacingY * 1.2;

          posX = layout.constellationX[i] + (targetX - layout.constellationX[i]) * easeT;
          posY = layout.constellationY[i] + (targetY - layout.constellationY[i]) * easeT;
          posZ = layout.constellationZ[i] + (targetZ - layout.constellationZ[i]) * easeT;

          cR = (row % 2 === 0) ? orangeR : whiteR;
          cG = (row % 2 === 0) ? orangeG : whiteG;
          cB = (row % 2 === 0) ? orangeB : whiteB;
        }

        // Desktop mouse repulsion nudge
        if (mouse.current.active && !isMobile) {
          const dx = posX - mouseWorldPos.x;
          const dy = posY - mouseWorldPos.y;
          const distSq = dx * dx + dy * dy;
          const repelRadiusSq = 14.0;

          if (distSq < repelRadiusSq && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const repelStrength = (1 - dist / Math.sqrt(repelRadiusSq)) * 1.4;
            posX += (dx / dist) * repelStrength;
            posY += (dy / dist) * repelStrength;
            posZ += repelStrength * 0.5;
          }
        }

        dummyPosition.set(posX, posY, posZ);

        const rotX = elapsedTime * 0.3 + layout.driftPhase[i] + t * 2.0;
        const rotY = elapsedTime * 0.2 + layout.driftPhase[i];
        dummyRotation.set(rotX, rotY, 0);

        dummyScale.set(scale, scale, scale);
        dummyMatrix.makeRotationFromEuler(dummyRotation);
        dummyMatrix.scale(dummyScale);
        dummyMatrix.setPosition(dummyPosition);

        instancedMesh.setMatrixAt(i, dummyMatrix);

        dummyColor.setRGB(cR, cG, cB);
        instancedMesh.setColorAt(i, dummyColor);
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
      if (instancedMesh.instanceColor) {
        instancedMesh.instanceColor.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      }
      boxGeo.dispose();
      boxMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      octGeo.dispose();
      octMat.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 3D WebGL Canvas Mount */}
      {webglSupported ? (
        <div ref={mountRef} className="w-full h-full" />
      ) : (
        <div className="w-full h-full bg-[#0e0d0b] opacity-40 flex items-center justify-center">
          <div className="w-full h-full bg-[radial-gradient(#ff6a2b_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>
      )}

      {/* Floating 3D Narrative Telemetry HUD (Glassmorphism Pill) */}
      <div className="absolute top-24 right-4 sm:right-8 z-30 pointer-events-auto">
        <aside
          role="region"
          aria-label="3D Journey Stage Status"
          className="hidden md:flex flex-col gap-1.5 px-3.5 py-2.5 rounded-2xl border border-white/10 bg-[#0e0d0b]/80 backdrop-blur-xl shadow-2xl transition-all duration-300 max-w-xs"
          style={{
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          <div className="flex items-center justify-between gap-3 text-[11px] font-mono tracking-wider">
            <span className="text-[#ff6a2b] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ff6a2b] animate-ping" />
              STAGE {currentStage}
            </span>
            <span className="text-[var(--text-muted)] font-semibold">
              {stageProgressPercent}% SCROLLED
            </span>
          </div>

          <p className="text-[12px] font-mono font-medium text-[var(--text-primary)] leading-tight">
            {stageTitle}
          </p>

          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-gradient-to-r from-[#ff6a2b] via-[#2dd4bf] to-[#ff6a2b] transition-all duration-150"
              style={{ width: `${Math.max(5, stageProgressPercent)}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)] mt-0.5">
            <span>Spatial Depth Engine</span>
            <span className="text-[#2dd4bf] font-semibold">WebGL 60FPS</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AuditUniverseCanvas;
