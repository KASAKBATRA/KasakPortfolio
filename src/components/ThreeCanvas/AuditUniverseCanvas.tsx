import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';

interface AuditUniverseCanvasProps {
  onProgressChange?: (progress: number, stageName: string) => void;
}

interface ParticleLayout {
  chaosX: Float32Array;
  chaosY: Float32Array;
  chaosZ: Float32Array;
  chaosColorR: Float32Array;
  chaosColorG: Float32Array;
  chaosColorB: Float32Array;
  gridX: Float32Array;
  gridY: Float32Array;
  gridZ: Float32Array;
  gridColorR: Float32Array;
  gridColorG: Float32Array;
  gridColorB: Float32Array;
  isDuplicate: Uint8Array;
  isAnomaly: Uint8Array;
  driftSpeed: Float32Array;
  driftPhase: Float32Array;
}

export const AuditUniverseCanvas: React.FC<AuditUniverseCanvasProps> = ({ onProgressChange }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [currentStage, setCurrentStage] = useState<'00' | '01'>('00');
  const [stageProgressPercent, setStageProgressPercent] = useState(0);
  const [collapsedCount, setCollapsedCount] = useState(0);

  // Mouse coords normalized (-1 to 1)
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

    // Detect mobile or reduced motion
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 850 : 2800;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Three.js Core Components
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0e0d0b, 0.022);

    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      200
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

    // Camera Flight Curve for Stage 0 -> Stage 1
    // Stage 0: wide observation of chaotic floating telemetry
    // Stage 1: deep dive down into structured ledger planes
    const cameraPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 26),
      new THREE.Vector3(2.5, -3.0, 20),
      new THREE.Vector3(0.5, -8.0, 14),
      new THREE.Vector3(0, -12.0, 9),
    ]);

    const cameraLookAt = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.5, -3.5, 0),
      new THREE.Vector3(0, -8.5, 0),
      new THREE.Vector3(0, -12.5, 0),
    ]);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xff6a2b, 1.2);
    dirLight.position.set(12, 18, 15);
    scene.add(dirLight);

    const tealLight = new THREE.PointLight(0x2dd4bf, 1.5, 30);
    tealLight.position.set(-8, -6, 10);
    scene.add(tealLight);

    // Precalculate instance layouts
    const boxGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    const boxMat = new THREE.MeshStandardMaterial({
      roughness: 0.25,
      metalness: 0.1,
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
      isDuplicate: new Uint8Array(count),
      isAnomaly: new Uint8Array(count),
      driftSpeed: new Float32Array(count),
      driftPhase: new Float32Array(count),
    };

    // Color definitions
    // Red error: #ef4444
    const errR = 0.94, errG = 0.26, errB = 0.26;
    // Orange anomaly: #ff6a2b
    const orangeR = 1.0, orangeG = 0.41, orangeB = 0.17;
    // Validated Teal: #2dd4bf
    const tealR = 0.17, tealG = 0.83, tealB = 0.75;
    // Audit Ledger Off-White: #e6e2d8
    const whiteR = 0.90, whiteG = 0.88, whiteB = 0.84;
    // Muted Telemetry Grey: #6e6b65
    const mutedR = 0.43, mutedG = 0.42, mutedB = 0.39;

    // Populate Layouts
    // Grid dimensions: e.g. 50 columns x rows, centered
    const cols = isMobile ? 30 : 60;
    const spacingX = 0.55;
    const spacingY = 0.48;
    const totalDuplicates = Math.floor(count * 0.18); // 18% duplicates

    for (let i = 0; i < count; i++) {
      // 1. Stage 0: Chaos
      // Distribute randomly in a spherical/box cloud with subtle clustering
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 18;
      const sinPhi = Math.sin(phi);

      layout.chaosX[i] = r * sinPhi * Math.cos(theta);
      layout.chaosY[i] = (r * sinPhi * Math.sin(theta)) * 0.75;
      layout.chaosZ[i] = r * Math.cos(phi) * 0.8;

      layout.driftSpeed[i] = 0.2 + Math.random() * 0.8;
      layout.driftPhase[i] = Math.random() * Math.PI * 2;

      // Classify particles
      const isRedError = i < count * 0.05; // 5% errors
      const isOrangeAnomaly = !isRedError && i < count * 0.16; // 11% flagged
      const isDup = !isRedError && !isOrangeAnomaly && i < totalDuplicates + count * 0.16;

      layout.isAnomaly[i] = isOrangeAnomaly ? 1 : 0;
      layout.isDuplicate[i] = isDup ? 1 : 0;

      if (isRedError) {
        layout.chaosColorR[i] = errR;
        layout.chaosColorG[i] = errG;
        layout.chaosColorB[i] = errB;
      } else if (isOrangeAnomaly) {
        layout.chaosColorR[i] = orangeR;
        layout.chaosColorG[i] = orangeG;
        layout.chaosColorB[i] = orangeB;
      } else {
        const grey = 0.55 + Math.random() * 0.35;
        layout.chaosColorR[i] = grey;
        layout.chaosColorG[i] = grey * 0.96;
        layout.chaosColorB[i] = grey * 0.92;
      }

      // 2. Stage 1: Validation Grid (Experience Stage)
      // Tabular ledger rows at Y approx -6 to -16
      const col = i % cols;
      const row = Math.floor(i / cols);
      const gridBaseX = (col - cols / 2) * spacingX;
      const gridBaseY = -8.0 - row * spacingY;
      const layerOffsetZ = ((col + row) % 3) * 0.25;

      if (isDup) {
        // Target position collapses into its parent record (i - 10)
        const parentIdx = Math.max(0, i - 12);
        const pCol = parentIdx % cols;
        const pRow = Math.floor(parentIdx / cols);
        layout.gridX[i] = (pCol - cols / 2) * spacingX;
        layout.gridY[i] = -8.0 - pRow * spacingY;
        layout.gridZ[i] = 0.0;

        // Fades into validated background
        layout.gridColorR[i] = mutedR * 0.5;
        layout.gridColorG[i] = mutedG * 0.5;
        layout.gridColorB[i] = mutedB * 0.5;
      } else if (isOrangeAnomaly) {
        // Anomalies pop slightly forward along Z (+0.8) and keep orange glow
        layout.gridX[i] = gridBaseX;
        layout.gridY[i] = gridBaseY;
        layout.gridZ[i] = layerOffsetZ + 0.8;
        layout.gridColorR[i] = orangeR;
        layout.gridColorG[i] = orangeG;
        layout.gridColorB[i] = orangeB;
      } else if (isRedError) {
        // Red errors are resolved or categorized
        layout.gridX[i] = gridBaseX;
        layout.gridY[i] = gridBaseY;
        layout.gridZ[i] = layerOffsetZ;
        layout.gridColorR[i] = tealR;
        layout.gridColorG[i] = tealG;
        layout.gridColorB[i] = tealB;
      } else {
        // Standard validated rows: alternating cool teal and crisp off-white
        layout.gridX[i] = gridBaseX;
        layout.gridY[i] = gridBaseY;
        layout.gridZ[i] = layerOffsetZ;
        if (row % 4 === 0) {
          layout.gridColorR[i] = tealR;
          layout.gridColorG[i] = tealG;
          layout.gridColorB[i] = tealB;
        } else {
          layout.gridColorR[i] = whiteR;
          layout.gridColorG[i] = whiteG;
          layout.gridColorB[i] = whiteB;
        }
      }
    }

    // Matrix and Vector scratchpads for 60fps render
    const dummyMatrix = new THREE.Matrix4();
    const dummyPosition = new THREE.Vector3();
    const dummyRotation = new THREE.Euler();
    const dummyScale = new THREE.Vector3();
    const dummyColor = new THREE.Color();
    const raycaster = new THREE.Raycaster();
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouseWorldPos = new THREE.Vector3();

    // Scroll listeners
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mouse movement listener (Desktop nudge effect)
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

    // Resize listener
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

      // Smooth scroll lerping for fluid cinematic feel
      // Measure progress from Hero (scrollY = 0) to Experience section
      const expEl = document.getElementById('experience');
      const maxScrollDistance = expEl 
        ? Math.max(expEl.offsetTop - 120, window.innerHeight * 0.9) 
        : window.innerHeight * 1.2;

      const rawTargetProgress = Math.min(Math.max(scrollYRef.current / maxScrollDistance, 0), 1);
      smoothScrollRef.current += (rawTargetProgress - smoothScrollRef.current) * 0.08;
      const t = prefersReducedMotion ? rawTargetProgress : smoothScrollRef.current;

      // Update UI state callback
      const stage = t < 0.35 ? '00' : '01';
      setCurrentStage(stage);
      const pct = Math.round(t * 100);
      setStageProgressPercent(pct);
      const currentCollapsed = Math.round(t * totalDuplicates);
      setCollapsedCount(currentCollapsed);

      if (onProgressChange) {
        const stageName = t < 0.25 
          ? '00 // CHAOS: UNSTRUCTURED TELEMETRY' 
          : t < 0.75 
            ? `VALIDATION & DEDUPLICATION (${pct}%)` 
            : '01 // EXPERIENCE: AUDIT-READY GRID';
        onProgressChange(t, stageName);
      }

      // Camera position along CatmullRomCurve3
      const camP = cameraPath.getPointAt(t);
      const camLook = cameraLookAt.getPointAt(t);
      camera.position.copy(camP);
      camera.lookAt(camLook);

      // Mouse Raycast for desktop point repulsion
      if (mouse.current.active && !isMobile) {
        raycaster.setFromCamera(new THREE.Vector2(mouse.current.x, mouse.current.y), camera);
        raycaster.ray.intersectPlane(mousePlane, mouseWorldPos);
      }

      // Update InstancedMesh instances
      // Smooth easing function for transition
      // S-curve: 3t^2 - 2t^3
      const easeT = t * t * (3 - 2 * t);

      for (let i = 0; i < count; i++) {
        // Natural chaotic drift in Stage 0
        const drift = Math.sin(elapsedTime * layout.driftSpeed[i] + layout.driftPhase[i]);
        const driftX = drift * (1 - easeT) * 0.45;
        const driftY = Math.cos(elapsedTime * layout.driftSpeed[i] * 0.8) * (1 - easeT) * 0.45;
        const driftZ = Math.sin(elapsedTime * 0.5 + layout.driftPhase[i]) * (1 - easeT) * 0.5;

        // Base lerp position between Chaos and Validation Grid
        const startX = layout.chaosX[i] + driftX;
        const startY = layout.chaosY[i] + driftY;
        const startZ = layout.chaosZ[i] + driftZ;

        const targetX = layout.gridX[i];
        const targetY = layout.gridY[i];
        const targetZ = layout.gridZ[i];

        let posX = startX + (targetX - startX) * easeT;
        let posY = startY + (targetY - startY) * easeT;
        let posZ = startZ + (targetZ - startZ) * easeT;

        // Desktop mouse repulsion nudge
        if (mouse.current.active && !isMobile) {
          const dx = posX - mouseWorldPos.x;
          const dy = posY - mouseWorldPos.y;
          const distSq = dx * dx + dy * dy;
          const repelRadiusSq = 12.0;

          if (distSq < repelRadiusSq && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const repelStrength = (1 - dist / Math.sqrt(repelRadiusSq)) * 1.2;
            posX += (dx / dist) * repelStrength;
            posY += (dy / dist) * repelStrength;
            posZ += repelStrength * 0.4;
          }
        }

        // Duplicate collapse behavior:
        // As t approaches 1, duplicate points shrink down into nothingness or into their parent record
        let scale = 1.0;
        if (layout.isDuplicate[i] === 1) {
          // Collapse scale smoothly starting from t = 0.35 to 0.9
          if (easeT > 0.3) {
            const collapseFactor = Math.min((easeT - 0.3) / 0.6, 1.0);
            scale = 1.0 - collapseFactor * 0.85; // shrinks to tiny collapsed seed
          }
        } else if (layout.isAnomaly[i] === 1 && easeT > 0.5) {
          // Anomalies pulse slightly in Stage 1
          scale = 1.0 + Math.sin(elapsedTime * 3.0 + i) * 0.2 * easeT;
        }

        dummyPosition.set(posX, posY, posZ);

        // Rotation: tumbling in chaos, settling upright in grid
        const rotX = (1 - easeT) * (elapsedTime * 0.4 + layout.driftPhase[i]);
        const rotY = (1 - easeT) * (elapsedTime * 0.3 + layout.driftPhase[i]);
        dummyRotation.set(rotX, rotY, 0);

        dummyScale.set(scale, scale, scale);
        dummyMatrix.makeRotationFromEuler(dummyRotation);
        dummyMatrix.scale(dummyScale);
        dummyMatrix.setPosition(dummyPosition);

        instancedMesh.setMatrixAt(i, dummyMatrix);

        // Color interpolation
        const cR = layout.chaosColorR[i] + (layout.gridColorR[i] - layout.chaosColorR[i]) * easeT;
        const cG = layout.chaosColorG[i] + (layout.gridColorG[i] - layout.chaosColorG[i]) * easeT;
        const cB = layout.chaosColorB[i] + (layout.gridColorB[i] - layout.chaosColorB[i]) * easeT;

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

    // Cleanup
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
        /* Accessible Fallback when WebGL is unavailable or fails */
        <div className="w-full h-full bg-[#0e0d0b] opacity-40 flex items-center justify-center">
          <div className="w-full h-full bg-[radial-gradient(#ff6a2b_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>
      )}

      {/* Floating 3D Narrative Telemetry HUD (Non-obtrusive Stage Pill) */}
      <div className="absolute top-24 right-4 sm:right-8 z-30 pointer-events-auto">
        <aside
          role="region"
          aria-label="3D Journey Stage Status"
          className="hidden md:flex flex-col gap-1.5 px-3.5 py-2.5 rounded-lg border border-white/10 bg-[#0e0d0b]/85 backdrop-blur-md shadow-2xl transition-all duration-300 max-w-xs"
        >
          <div className="flex items-center justify-between gap-3 text-[11px] font-mono tracking-wider">
            <span className="text-[#ff6a2b] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ff6a2b] animate-ping" />
              STAGE {currentStage}
            </span>
            <span className="text-[var(--text-muted)]">
              {stageProgressPercent}% SYNCED
            </span>
          </div>

          <p className="text-[12px] font-mono font-medium text-[var(--text-primary)] leading-tight">
            {currentStage === '00'
              ? 'CHAOS: Unstructured Records Drifting'
              : 'VALIDATION: Order Restored & Deduplicated'}
          </p>

          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-gradient-to-r from-[#ff6a2b] to-[#2dd4bf] transition-all duration-150"
              style={{ width: `${Math.max(5, stageProgressPercent)}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)] mt-0.5">
            <span>Duplicates Collapsed: {collapsedCount}</span>
            <span className="text-[#2dd4bf]">WebGL 60FPS</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AuditUniverseCanvas;
