"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export function FoldingGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setSize();
    window.addEventListener("resize", setSize);

    // Grid configuration
    const size = 90; // Size of each cell
    const cols = Math.floor(height / size) + 40; // Now represents vertical segments
    const rows = 35; // Depth into the screen
    
    let flying = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const isDark = resolvedTheme !== "light";
      
      // Styling
      const strokeColor = isDark ? "rgba(200, 90, 42, 0.4)" : "rgba(0, 0, 0, 0.15)";
      const fillColor = isDark ? "var(--canvas)" : "#F5F5F5";
      
      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = fillColor;
      ctx.lineWidth = 1.5;

      flying -= 0.01; // Reduced speed of forward motion
      
      // Generate terrain heights (protrusions from the wall)
      const terrain: number[][] = [];
      let yOff = flying;
      for (let y = 0; y < rows; y++) {
        let xOff = 0;
        terrain[y] = [];
        for (let x = 0; x < cols; x++) {
          terrain[y][x] = Math.sin(xOff) * Math.cos(yOff) * 80;
          xOff += 0.3;
        }
        yOff += 0.3;
      }

      ctx.save();
      // Center origin at the middle of the RIGHT wall
      ctx.translate(width, height / 2);

      // 3D to 2D projection function for a right wall
      const project = (x: number, y: number, z: number) => {
        // x goes from 0 to cols (vertical span)
        // y goes from 0 to rows (depth into screen)
        // z goes from -80 to 80 (protrusion)

        const wx = -z; // Protrudes left from the right wall
        const wy = (x - cols / 2) * size; // Vertical span
        const wz = y * size; // Depth

        // Camera position (stand slightly to the left, look right)
        const camX = 150; 
        const camY = 0; 
        const camZ = -200; 

        const rx = wx - camX;
        const ry = wy - camY;
        const rz = wz - camZ;

        if (rz < 0.1) return null;

        const fov = 700;
        const scale = fov / rz;

        return { x: rx * scale, y: ry * scale, scale };
      };

      // Render back-to-front
      for (let y = rows - 2; y >= 0; y--) {
        for (let x = 0; x < cols - 1; x++) {
          const xOffsetCurrentRow = (y % 2 === 0) ? 0 : 0.5;
          const xOffsetNextRow = ((y + 1) % 2 === 0) ? 0 : 0.5;

          const p1 = project(x + xOffsetCurrentRow, y, terrain[y][x]);
          const p2 = project(x + 1 + xOffsetCurrentRow, y, terrain[y][x + 1]);
          const p3 = project(x + xOffsetNextRow, y + 1, terrain[y + 1][x]);
          const p4 = project(x + 1 + xOffsetNextRow, y + 1, terrain[y + 1][x + 1]);

          if (!p1 || !p2 || !p3 || !p4) continue;

          const alpha = Math.min(1, Math.max(0, (p1.scale * 2.5) - 0.2));
          ctx.strokeStyle = isDark ? `rgba(200, 90, 42, ${alpha * 0.6})` : `rgba(0, 0, 0, ${alpha * 0.3})`;
          
          const slope1 = terrain[y][x] - terrain[y+1][x];
          const shade1 = isDark ? Math.max(0, slope1 * 0.5) : Math.max(0, slope1 * 0.5);
          ctx.fillStyle = isDark ? `rgb(${8 + shade1}, ${6 + shade1}, ${4 + shade1})` : `rgb(${245 - shade1}, ${245 - shade1}, ${245 - shade1})`;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          const slope2 = terrain[y][x+1] - terrain[y+1][x+1];
          const shade2 = isDark ? Math.max(0, slope2 * 0.5) : Math.max(0, slope2 * 0.5);
          ctx.fillStyle = isDark ? `rgb(${8 + shade2}, ${6 + shade2}, ${4 + shade2})` : `rgb(${245 - shade2}, ${245 - shade2}, ${245 - shade2})`;

          ctx.beginPath();
          ctx.moveTo(p2.x, p2.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      }
      
      ctx.restore();
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(animationId);
    };
  }, [resolvedTheme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
