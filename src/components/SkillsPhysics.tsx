"use client";

import React, { useEffect, useRef } from "react";

interface SkillCircle {
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  isHovered: boolean;
}

const SKILL_NAMES = [
  "Java",
  "Spring Boot",
  "Python",
  "Kotlin",
  "Dart",
  "Flutter",
  "React.js",
  "KMP",
  "FastAPI",
  "MongoDB",
  "Neo4j",
  "SQL",
  "GCP",
  "Firebase",
  "GraphRAG",
];

export const SkillsPhysics: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    circles: SkillCircle[];
    draggedIndex: number | null;
    mouseX: number;
    mouseY: number;
    lastMouseX: number;
    lastMouseY: number;
    mouseVx: number;
    mouseVy: number;
  }>({
    circles: [],
    draggedIndex: null,
    mouseX: 0,
    mouseY: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    mouseVx: 0,
    mouseVy: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width || 500;
      canvas.height = rect.height || 500;

      if (stateRef.current.circles.length === 0) {
        initCircles(canvas.width, canvas.height);
      }
    };

    const initCircles = (width: number, height: number) => {
      const tempCircles: SkillCircle[] = [];
      const cols = 4;

      SKILL_NAMES.forEach((name, idx) => {
        const radius = Math.max(38, Math.min(58, 28 + name.length * 3));
        const col = idx % cols;
        const row = Math.floor(idx / cols);

        const startX = (width / cols) * (col + 0.5) + (Math.random() - 0.5) * 20;
        const startY = (height / 3) * (row + 0.5) + (Math.random() - 0.5) * 20;

        tempCircles.push({
          name,
          x: startX,
          y: startY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius,
          mass: radius * radius * Math.PI,
          isHovered: false,
        });
      });

      stateRef.current.circles = tempCircles;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const getMouseCoords = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        if (e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          return null;
        }
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      const coords = getMouseCoords(e);
      if (!coords) return;

      const state = stateRef.current;
      state.mouseX = coords.x;
      state.mouseY = coords.y;
      state.lastMouseX = coords.x;
      state.lastMouseY = coords.y;
      state.mouseVx = 0;
      state.mouseVy = 0;

      for (let i = state.circles.length - 1; i >= 0; i--) {
        const c = state.circles[i];
        const dist = Math.hypot(coords.x - c.x, coords.y - c.y);
        if (dist < c.radius) {
          state.draggedIndex = i;
          c.vx = 0;
          c.vy = 0;
          break;
        }
      }
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const coords = getMouseCoords(e);
      if (!coords) return;

      const state = stateRef.current;
      state.mouseX = coords.x;
      state.mouseY = coords.y;

      state.mouseVx = coords.x - state.lastMouseX;
      state.mouseVy = coords.y - state.lastMouseY;
      state.lastMouseX = coords.x;
      state.lastMouseY = coords.y;

      state.circles.forEach((c) => {
        const dist = Math.hypot(coords.x - c.x, coords.y - c.y);
        c.isHovered = dist < c.radius;
      });

      if (state.draggedIndex !== null) {
        const dragged = state.circles[state.draggedIndex];
        dragged.x = coords.x;
        dragged.y = coords.y;
        dragged.vx = state.mouseVx;
        dragged.vy = state.mouseVy;
      }
    };

    const handleEnd = () => {
      const state = stateRef.current;
      if (state.draggedIndex !== null) {
        const dragged = state.circles[state.draggedIndex];
        dragged.vx = Math.max(-10, Math.min(10, state.mouseVx * 0.8));
        dragged.vy = Math.max(-10, Math.min(10, state.mouseVy * 0.8));
        state.draggedIndex = null;
      }
    };

    const handleLeave = () => {
      stateRef.current.draggedIndex = null;
      stateRef.current.circles.forEach((c) => {
        c.isHovered = false;
      });
    };

    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("mouseleave", handleLeave);

    canvas.addEventListener("touchstart", handleStart, { passive: true });
    canvas.addEventListener("touchmove", handleMove, { passive: true });
    canvas.addEventListener("touchend", handleEnd);
    canvas.addEventListener("touchcancel", handleEnd);

    let animId: number;
    const elasticity = 0.75;
    const gravity = 0.05;
    const damping = 0.985;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!ctx || !canvas) return;

      const state = stateRef.current;
      const circles = state.circles;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Physics
      circles.forEach((c, idx) => {
        if (idx === state.draggedIndex) return;

        c.vy += gravity;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const toCenterX = centerX - c.x;
        const toCenterY = centerY - c.y;
        c.vx += toCenterX * 0.0001;
        c.vy += toCenterY * 0.0001;

        if (state.draggedIndex === null && state.mouseX > 0 && state.mouseY > 0) {
          const distToMouse = Math.hypot(state.mouseX - c.x, state.mouseY - c.y);
          if (distToMouse < c.radius + 100) {
            const force = (1 - distToMouse / (c.radius + 100)) * 0.6;
            const dirX = (c.x - state.mouseX) / distToMouse;
            const dirY = (c.y - state.mouseY) / distToMouse;
            c.vx += dirX * force;
            c.vy += dirY * force;
          }
        }

        c.vx *= damping;
        c.vy *= damping;

        c.x += c.vx;
        c.y += c.vy;

        if (c.x - c.radius < 0) {
          c.x = c.radius;
          c.vx = -c.vx * elasticity;
        } else if (c.x + c.radius > canvas.width) {
          c.x = canvas.width - c.radius;
          c.vx = -c.vx * elasticity;
        }

        if (c.y - c.radius < 0) {
          c.y = c.radius;
          c.vy = -c.vy * elasticity;
        } else if (c.y + c.radius > canvas.height) {
          c.y = canvas.height - c.radius;
          c.vy = -c.vy * elasticity;
        }
      });

      // Collisions
      for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
          const c1 = circles[i];
          const c2 = circles[j];

          const dx = c2.x - c1.x;
          const dy = c2.y - c1.y;
          const dist = Math.hypot(dx, dy);
          const minDist = c1.radius + c2.radius;

          if (dist < minDist) {
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;

            const pushX = nx * overlap * 0.5;
            const pushY = ny * overlap * 0.5;

            if (i === state.draggedIndex) {
              c2.x += nx * overlap;
              c2.y += ny * overlap;
            } else if (j === state.draggedIndex) {
              c1.x -= nx * overlap;
              c1.y -= ny * overlap;
            } else {
              c1.x -= pushX;
              c1.y -= pushY;
              c2.x += pushX;
              c2.y += pushY;
            }

            const kx = c1.vx - c2.vx;
            const ky = c1.vy - c2.vy;
            const vn = kx * nx + ky * ny;

            if (vn > 0) {
              const impulse = (2 * vn) / (c1.mass + c2.mass);
              const impX = impulse * nx;
              const impY = impulse * ny;

              if (i !== state.draggedIndex) {
                c1.vx -= impX * c2.mass * elasticity;
                c1.vy -= impY * c2.mass * elasticity;
              }
              if (j !== state.draggedIndex) {
                c2.vx += impX * c1.mass * elasticity;
                c2.vy += impY * c1.mass * elasticity;
              }
            }
          }
        }
      }

      // Draw - SOLID WHITE circles with DARK text
      circles.forEach((c) => {
        ctx.save();

        // Drop shadow
        ctx.shadowBlur = c.isHovered ? 16 : 8;
        ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
        ctx.shadowOffsetY = 2;

        // Solid white/off-white fill
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        ctx.fillStyle = c.isHovered
          ? "rgba(255, 255, 255, 1.0)"
          : "rgba(240, 240, 240, 0.95)";
        ctx.fill();

        // Very subtle border
        ctx.strokeStyle = "rgba(200, 200, 200, 0.3)";
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Dark text label
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        ctx.fillStyle = c.isHovered ? "#000000" : "#1a1a1a";
        ctx.font = `600 ${c.radius * 0.28}px var(--font-oxanium), sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(c.name, c.x, c.y);

        ctx.restore();
      });
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleEnd);
      canvas.removeEventListener("touchcancel", handleEnd);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px] relative overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 cursor-grab active:cursor-grabbing block" />
    </div>
  );
};
