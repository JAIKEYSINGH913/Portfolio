"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function FoldingGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

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
    const cols = Math.floor(width / size) + 12;
    const rows = 35; // How far into the distance it renders
    
    let flying = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const isDark = resolvedTheme !== "light";
      
      // Styling
      const strokeColor = isDark ? "rgba(200, 90, 42, 0.4)" : "rgba(0, 0, 0, 0.15)";
      const fillColor = isDark ? "#080604" : "#F5F5F5";
      
      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = fillColor;
      ctx.lineWidth = 1.5;

      flying -= 0.04; // Speed of forward motion
      
      // Generate terrain heights using intersecting sine waves for "folding zig-zag"
      const terrain: number[][] = [];
      let yOff = flying;
      for (let y = 0; y < rows; y++) {
        let xOff = 0;
        terrain[y] = [];
        for (let x = 0; x < cols; x++) {
          // Creates a zig-zag folding pattern
          terrain[y][x] = Math.sin(xOff) * Math.cos(yOff) * 80;
          xOff += 0.3;
        }
        yOff += 0.3;
      }

      ctx.save();
      // Center the origin
      ctx.translate(width / 2, height / 2 + 50);

      // 3D to 2D projection function
      const project = (x: number, y: number, z: number) => {
        // World coordinates
        const wx = (x - cols / 2) * size;
        const wy = z; // elevation
        const wz = y * size; // depth into screen

        // Camera position
        const camY = 250; // height above grid
        const camZ = -200; 

        const rx = wx;
        const ry = wy - camY;
        const rz = wz - camZ;

        if (rz < 0.1) return null;

        const fov = 700;
        const scale = fov / rz;

        return { x: rx * scale, y: ry * scale, scale };
      };

      // Render back-to-front for proper overlapping (Painter's Algorithm)
      for (let y = rows - 2; y >= 0; y--) {
        for (let x = 0; x < cols - 1; x++) {
          // Calculate grid offset to make perfectly equilateral/isometric triangles
          const xOffsetCurrentRow = (y % 2 === 0) ? 0 : 0.5;
          const xOffsetNextRow = ((y + 1) % 2 === 0) ? 0 : 0.5;

          const p1 = project(x + xOffsetCurrentRow, y, terrain[y][x]);
          const p2 = project(x + 1 + xOffsetCurrentRow, y, terrain[y][x + 1]);
          const p3 = project(x + xOffsetNextRow, y + 1, terrain[y + 1][x]);
          const p4 = project(x + 1 + xOffsetNextRow, y + 1, terrain[y + 1][x + 1]);

          if (!p1 || !p2 || !p3 || !p4) continue;

          // Fade out in the distance based on scale
          const alpha = Math.min(1, Math.max(0, (p1.scale * 2.5) - 0.2));
          ctx.strokeStyle = isDark ? `rgba(200, 90, 42, ${alpha * 0.6})` : `rgba(0, 0, 0, ${alpha * 0.3})`;
          
          // To create a shading effect on the folds, we vary the fill slightly
          // based on the slope of the triangle.
          const slope1 = terrain[y][x] - terrain[y+1][x];
          const shade1 = isDark ? Math.max(0, slope1 * 0.5) : Math.max(0, slope1 * 0.5);
          ctx.fillStyle = isDark ? `rgb(${8 + shade1}, ${6 + shade1}, ${4 + shade1})` : `rgb(${245 - shade1}, ${245 - shade1}, ${245 - shade1})`;

          // Triangle 1 (Left/Top)
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

          // Triangle 2 (Right/Bottom)
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
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        maskImage: "linear-gradient(to top, black 20%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 100%)",
      }}
    />
  );
}
