"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useGlobalState, ShapeType } from "@/context/GlobalState";

const PARTICLE_COUNT = 3000;

export const BackgroundCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { shapeState, animationSpeed } = useGlobalState();
  const stateRef = useRef({ shapeState, animationSpeed });

  // Keep ref up to date to avoid re-triggering effects
  useEffect(() => {
    stateRef.current = { shapeState, animationSpeed };
  }, [shapeState, animationSpeed]);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- 1. Scene Setup ---
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- 2. Create Glowing Particle Texture ---
    const createCircleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.3, "rgba(230, 245, 255, 0.8)");
        gradient.addColorStop(0.6, "rgba(100, 180, 255, 0.2)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createCircleTexture();

    // --- 3. Particles Setup ---
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const targetPositions = new Float32Array(PARTICLE_COUNT * 3);

    // Initialize current and target positions randomly in a sphere
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = Math.random() * 5;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      targetPositions[i * 3] = x;
      targetPositions[i * 3 + 1] = y;
      targetPositions[i * 3 + 2] = z;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xffffff,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // --- 4. Precompute Lorenz Attractor Trajectory ---
    const lorenzPoints: THREE.Vector3[] = [];
    let lx = 0.1, ly = 0, lz = 0;
    const sigma = 10, rho = 28, beta = 8 / 3;
    const dt = 0.01;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const dx = sigma * (ly - lx) * dt;
      const dy = (lx * (rho - lz) - ly) * dt;
      const dz = (lx * ly - beta * lz) * dt;

      lx += dx;
      ly += dy;
      lz += dz;

      // Center and scale Lorenz points to fit screen (z is [0, 50], x/y are roughly [-20, 20])
      lorenzPoints.push(
        new THREE.Vector3(
          lx * 0.15,
          (ly * 0.15) - 0.5,
          (lz - 25) * 0.15
        )
      );
    }

    // --- 5. Steam Particle Phases ---
    // Steam particles will have their own ages and angles
    const steamAges = new Float32Array(1000);
    const steamAngles = new Float32Array(1000);
    for (let i = 0; i < 1000; i++) {
      steamAges[i] = Math.random();
      steamAngles[i] = Math.random() * Math.PI * 2;
    }

    // --- 6. Animation Loop ---
    let time = 0;
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.005 * stateRef.current.animationSpeed;

      const currentShape = stateRef.current.shapeState;
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      // Compute targets based on the current shape
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        let tx = 0, ty = 0, tz = 0;

        if (currentShape === "cube") {
          // Three nested cubes
          const cubeIndex = i % 3; // 0, 1, or 2
          const localI = Math.floor(i / 3);
          const edge = localI % 12;
          const t = ((localI / 12) / (PARTICLE_COUNT / 36)) * 2 - 1; // -1 to 1

          let cx = 0, cy = 0, cz = 0;
          const S = 1.8; // Cube edge half-size

          // Distribute along edges
          if (edge === 0) { cx = -S; cy = -S; cz = t * S; }
          else if (edge === 1) { cx = -S; cy = S; cz = t * S; }
          else if (edge === 2) { cx = S; cy = -S; cz = t * S; }
          else if (edge === 3) { cx = S; cy = S; cz = t * S; }
          else if (edge === 4) { cx = -S; cy = t * S; cz = -S; }
          else if (edge === 5) { cx = -S; cy = t * S; cz = S; }
          else if (edge === 6) { cx = S; cy = t * S; cz = -S; }
          else if (edge === 7) { cx = S; cy = t * S; cz = S; }
          else if (edge === 8) { cx = t * S; cy = -S; cz = -S; }
          else if (edge === 9) { cx = t * S; cy = -S; cz = S; }
          else if (edge === 10) { cx = t * S; cy = S; cz = -S; }
          else if (edge === 11) { cx = t * S; cy = S; cz = S; }

          // Rotate each cube group differently
          const angleX = time * (cubeIndex === 0 ? 0.3 : cubeIndex === 1 ? -0.2 : 0.1);
          const angleY = time * (cubeIndex === 0 ? 0.2 : cubeIndex === 1 ? 0.4 : -0.3);
          const angleZ = time * (cubeIndex === 0 ? -0.1 : cubeIndex === 1 ? 0.1 : 0.5);

          // Apply rotation
          // Rotate X
          let ry = cy * Math.cos(angleX) - cz * Math.sin(angleX);
          let rz = cy * Math.sin(angleX) + cz * Math.cos(angleX);
          cy = ry; cz = rz;

          // Rotate Y
          let rx = cx * Math.cos(angleY) + cz * Math.sin(angleY);
          rz = -cx * Math.sin(angleY) + cz * Math.cos(angleY);
          cx = rx; cz = rz;

          // Rotate Z
          rx = cx * Math.cos(angleZ) - cy * Math.sin(angleZ);
          ry = cx * Math.sin(angleZ) + cy * Math.cos(angleZ);
          cx = rx; cy = ry;

          tx = cx;
          ty = cy;
          tz = cz;

        } else if (currentShape === "wave") {
          // Undulating grid waveform
          const gridWidth = 60;
          const gridHeight = 50;
          const col = i % gridWidth;
          const row = Math.floor(i / gridWidth);

          const wx = -6 + 12 * (col / gridWidth);
          const wz = -6 + 12 * (row / gridHeight);
          // Wave height formula
          const wy = Math.sin(wx * 0.8 + time * 1.5) * Math.cos(wz * 0.8 + time * 1.5) * 0.7;

          // Gentle rotation of the whole wave
          const cosR = Math.cos(time * 0.05);
          const sinR = Math.sin(time * 0.05);

          tx = wx * cosR - wz * sinR;
          ty = wy - 0.5; // Offset slightly down
          tz = wx * sinR + wz * cosR;

        } else if (currentShape === "line") {
          // Flat horizontal line
          const lx = -6 + 12 * (i / PARTICLE_COUNT);
          // Add organic vibrations
          const ly = Math.sin(lx * 3.0 + time * 5.0) * 0.04;
          const lz = Math.cos(lx * 3.0 + time * 5.0) * 0.04;

          tx = lx;
          ty = ly;
          tz = lz;

        } else if (currentShape === "lorenz") {
          // Flowing Lorenz Attractor
          // Each particle targets a precomputed point, offset by time to simulate flow
          const stepOffset = Math.floor(time * 50);
          const ptIndex = (i + stepOffset) % PARTICLE_COUNT;
          const pt = lorenzPoints[ptIndex];

          tx = pt.x;
          ty = pt.y;
          tz = pt.z;

        } else if (currentShape === "chalice") {
          // Chalice cup + rising steam
          if (i < 2000) {
            // Chalice base and bowl
            const theta = (i / 2000) * Math.PI * 2 * 25; // helicoid distribution
            const hFraction = (i / 2000) * 4 - 2; // height from -2 to 2

            let r = 0.2;
            if (hFraction < -1) {
              r = 1.2 * (-1 - hFraction) + 0.3; // base flare
            } else if (hFraction > -0.5) {
              r = 0.3 + 1.0 * Math.pow(hFraction + 0.5, 0.7); // bowl flare
            }

            tx = r * Math.cos(theta);
            tz = r * Math.sin(theta);
            ty = hFraction - 0.5;
          } else {
            // Rising Steam particles (1000 particles)
            const sIndex = i - 2000;
            // Update age
            steamAges[sIndex] += 0.003 * stateRef.current.animationSpeed;
            if (steamAges[sIndex] > 1.0) {
              steamAges[sIndex] = 0;
              steamAngles[sIndex] = Math.random() * Math.PI * 2;
            }

            const age = steamAges[sIndex];
            const theta = steamAngles[sIndex] + age * 4 + time * 0.5;
            const r = (0.3 + 1.0 * Math.pow(2.5, 0.7)) * (1.0 - age * 0.7); // Tapers up
            const h = 1.5 + age * 2.5; // Starts at top rim (height ~1.5) and rises

            tx = r * Math.cos(theta) + Math.sin(time + h * 2) * 0.15;
            tz = r * Math.sin(theta) + Math.cos(time + h * 2) * 0.15;
            ty = h - 0.5;
          }

          // Gentle rotation of the whole chalice
          const cosR = Math.cos(time * 0.1);
          const sinR = Math.sin(time * 0.1);
          const tempX = tx;
          tx = tempX * cosR - tz * sinR;
          tz = tempX * sinR + tz * cosR;

        } else {
          // "ambient" slow floating noise
          const theta = (i / PARTICLE_COUNT) * Math.PI * 2 * 10;
          const phi = Math.acos((i / PARTICLE_COUNT) * 2 - 1);
          const r = 2.5 + Math.sin(time * 0.2 + i) * 0.5;

          tx = r * Math.sin(phi) * Math.cos(theta);
          ty = r * Math.sin(phi) * Math.sin(theta);
          tz = r * Math.cos(phi);
        }

        // Apply Lerp towards target position
        // Tweak lerp factor dynamically to make morphs fast but smooth
        const lerpFactor = 0.03 + (stateRef.current.animationSpeed * 0.003);
        posArray[i * 3] += (tx - posArray[i * 3]) * lerpFactor;
        posArray[i * 3 + 1] += (ty - posArray[i * 3 + 1]) * lerpFactor;
        posArray[i * 3 + 2] += (tz - posArray[i * 3 + 2]) * lerpFactor;
      }

      posAttr.needsUpdate = true;

      // Gentle rotation of the overall points object for extra depth
      particleSystem.rotation.y = time * 0.05;
      particleSystem.rotation.x = Math.sin(time * 0.02) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // --- 7. Window Resize ---
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      material.dispose();
      particleTexture.dispose();
      geometry.dispose();
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-50 bg-black pointer-events-none overflow-hidden"
      style={{ mixBlendMode: "screen" }}
    />
  );
};
