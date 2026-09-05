"use client";

import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════
   HEX BRAIN CANVAS
   — Neural hexagonal grid with skill labels
   — Scrolls into view with zoom-from-portrait effect
   ═══════════════════════════════════════════════ */

const SKILLS_HEX = [
  "Java 17", "Spring Boot", "React", "Next.js",
  "Python", "GraphRAG", "Neo4j", "Firebase",
  "PostgreSQL", "Docker", "GCP", "TypeScript",
  "LLMs / AI", "Flutter", "CI/CD", "REST APIs",
  "TDD", "System Design", "NLP", "Agile SDLC",
  "MongoDB", "Redis", "FastAPI", "JWT / OAuth",
];

type Hex = {
  q: number; r: number;       // grid coords
  cx: number; cy: number;     // pixel center
  label: string;
  pulse: number;              // 0–1 glow intensity
  pulseDir: number;           // +1 / -1
  lit: boolean;               // is currently highlighted
  litTimer: number;
  ring: number;               // distance from center
};

function buildHexGrid(W: number, H: number, size: number): Hex[] {
  const hexes: Hex[] = [];
  const labels = [...SKILLS_HEX];
  let labelIdx = 0;
  const rows = Math.ceil(H / (size * 1.75)) + 2;
  const cols = Math.ceil(W / (size * Math.sqrt(3))) + 2;

  for (let r = -1; r < rows; r++) {
    for (let q = -1; q < cols; q++) {
      const cx = (q + (r % 2) * 0.5) * size * Math.sqrt(3) + size;
      const cy = r * size * 1.5 + size;
      const dx = cx - W / 2;
      const dy = cy - H / 2;
      const ring = Math.sqrt(dx * dx + dy * dy) / size;
      hexes.push({
        q, r, cx, cy,
        label: labels[labelIdx++ % labels.length],
        pulse: Math.random(),
        pulseDir: Math.random() > 0.5 ? 1 : -1,
        lit: false,
        litTimer: 0,
        ring,
      });
    }
  }
  return hexes;
}

function hexPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 30);
    const x = cx + size * Math.cos(angle);
    const y = cy + size * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
}

export function HexBrainCanvas({ visible }: { visible: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const hexesRef = useRef<Hex[]>([]);
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);
  const alphaRef = useRef(0); // fade-in progress

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const HEX_SIZE = 56;
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    hexesRef.current = buildHexGrid(W, H, HEX_SIZE);

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      hexesRef.current = buildHexGrid(W, H, HEX_SIZE);
    };
    window.addEventListener("resize", resize);

    // Periodically light up random hexes
    const lightInterval = setInterval(() => {
      const hexes = hexesRef.current;
      // Ripple from center
      const center = hexes.reduce((best, h) => h.ring < best.ring ? h : best, hexes[0]);
      const rippleFrom = hexes[Math.floor(Math.random() * Math.min(5, hexes.length))];
      hexes.forEach(h => {
        const d = Math.sqrt((h.cx - rippleFrom.cx) ** 2 + (h.cy - rippleFrom.cy) ** 2);
        if (d < HEX_SIZE * 4 && Math.random() > 0.5) {
          h.lit = true;
          h.litTimer = 60 + Math.random() * 80;
        }
      });
    }, 600);

    const draw = () => {
      tRef.current += 0.012;
      const t = tRef.current;

      // Fade in
      if (visible && alphaRef.current < 1) alphaRef.current = Math.min(1, alphaRef.current + 0.018);
      if (!visible && alphaRef.current > 0) alphaRef.current = Math.max(0, alphaRef.current - 0.025);

      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = alphaRef.current;

      // Dark BG
      ctx.fillStyle = "#080604";
      ctx.fillRect(0, 0, W, H);

      // Radial brain glow from center
      const grd = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.55);
      grd.addColorStop(0, "rgba(200,90,42,0.12)");
      grd.addColorStop(0.45, "rgba(100,50,20,0.05)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      hexesRef.current.forEach(h => {
        // Pulse animation
        h.pulse += h.pulseDir * 0.008;
        if (h.pulse > 1 || h.pulse < 0) h.pulseDir *= -1;

        if (h.lit) h.litTimer--;
        if (h.litTimer <= 0) h.lit = false;

        const dist = h.ring;
        const breathe = Math.sin(t * 0.8 + dist * 0.4) * 0.5 + 0.5;
        const glow = h.lit ? 0.85 : breathe * 0.18 + 0.04;

        // Hex fill
        hexPath(ctx, h.cx, h.cy, HEX_SIZE - 2);
        const alpha = glow;
        ctx.fillStyle = h.lit
          ? `rgba(200,90,42,${alpha * 0.18})`
          : `rgba(30,24,18,${alpha * 3})`;
        ctx.fill();

        // Hex border
        hexPath(ctx, h.cx, h.cy, HEX_SIZE - 2);
        ctx.strokeStyle = h.lit
          ? `rgba(220,110,50,${alpha * 0.9})`
          : `rgba(120,90,60,${alpha * 1.1 + 0.04})`;
        ctx.lineWidth = h.lit ? 1.5 : 0.7;
        ctx.stroke();

        // Skill label (only inner hexes)
        if (dist < HEX_SIZE * 4.5 || h.lit) {
          const textAlpha = h.lit ? 0.95 : Math.max(0, (1 - dist / (HEX_SIZE * 5))) * 0.65;
          if (textAlpha > 0.05) {
            ctx.globalAlpha = alphaRef.current * textAlpha;
            ctx.font = `bold ${h.lit ? 11 : 9}px 'Space Mono', monospace`;
            ctx.fillStyle = h.lit ? "#FF9060" : "#A08060";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            // Truncate long labels
            const label = h.label.length > 11 ? h.label.slice(0, 10) + "…" : h.label;
            ctx.fillText(label, h.cx, h.cy);
            ctx.globalAlpha = alphaRef.current;
          }
        }

        // Inner dot for lit hexes
        if (h.lit) {
          ctx.beginPath();
          ctx.arc(h.cx, h.cy - 12, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,140,80,0.8)";
          ctx.fill();
        }
      });

      // Brain pulse rings from center
      for (let ring = 0; ring < 3; ring++) {
        const r = ((t * 0.4 + ring * 0.33) % 1) * W * 0.6;
        const ringAlpha = (1 - r / (W * 0.6)) * 0.06;
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200,90,42,${ringAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(lightInterval);
      window.removeEventListener("resize", resize);
    };
  }, [visible]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}

/* ═══════════════════════════════════════════════
   PAPER HAND — folded origami style
   ═══════════════════════════════════════════════ */
export function PaperHandLeft({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        left: 0,
        bottom: "10%",
        width: "min(280px, 30vw)",
        zIndex: 5,
        transform: visible ? "translateX(0) rotate(-8deg)" : "translateX(-110%) rotate(-18deg)",
        transition: "transform 1.2s cubic-bezier(0.34,1.1,0.64,1)",
        transformOrigin: "bottom left",
        pointerEvents: "none",
      }}
    >
      <svg viewBox="0 0 180 280" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%", height: "auto",
          filter: "drop-shadow(4px 8px 24px rgba(0,0,0,0.5))",
          animation: visible ? "handShake 2.4s ease-in-out infinite" : "none",
        }}>
        {/* Palm */}
        <polygon points="30,280 20,160 60,120 90,115 120,120 155,160 150,280"
          fill="#D4B896" stroke="#A07850" strokeWidth="1.5"/>
        {/* Palm crease lines */}
        <line x1="30" y1="220" x2="150" y2="210" stroke="#B09070" strokeWidth="0.8" opacity="0.6"/>
        <line x1="35" y1="190" x2="145" y2="182" stroke="#B09070" strokeWidth="0.8" opacity="0.5"/>
        {/* Fold shadow on palm */}
        <polygon points="30,280 20,160 60,200 60,280" fill="rgba(0,0,0,0.10)"/>
        {/* Thumb */}
        <polygon points="20,160 0,130 10,105 30,120 30,165"
          fill="#CEAD8A" stroke="#A07850" strokeWidth="1.2"/>
        <line x1="10" y1="115" x2="25" y2="140" stroke="#B09070" strokeWidth="0.7" opacity="0.5"/>
        {/* Index finger */}
        <polygon points="45,120 38,60 50,38 65,55 72,120"
          fill="#D4B896" stroke="#A07850" strokeWidth="1.2"/>
        <line x1="43" y1="90" x2="68" y2="92" stroke="#B09070" strokeWidth="0.7" opacity="0.5"/>
        <line x1="42" y1="70" x2="64" y2="71" stroke="#B09070" strokeWidth="0.7" opacity="0.4"/>
        {/* Fold on finger tip */}
        <polygon points="38,60 50,38 65,55 56,62 44,63" fill="rgba(0,0,0,0.08)"/>
        {/* Middle finger */}
        <polygon points="72,118 68,50 80,28 96,45 100,118"
          fill="#DDBE9E" stroke="#A07850" strokeWidth="1.2"/>
        <line x1="70" y1="88" x2="97" y2="88" stroke="#B09070" strokeWidth="0.7" opacity="0.5"/>
        <line x1="70" y1="68" x2="94" y2="67" stroke="#B09070" strokeWidth="0.7" opacity="0.4"/>
        {/* Ring finger */}
        <polygon points="100,118 98,58 110,42 124,56 126,118"
          fill="#D4B896" stroke="#A07850" strokeWidth="1.2"/>
        <line x1="100" y1="88" x2="124" y2="88" stroke="#B09070" strokeWidth="0.7" opacity="0.5"/>
        {/* Pinky */}
        <polygon points="126,120 126,75 135,62 148,72 150,122"
          fill="#CEAD8A" stroke="#A07850" strokeWidth="1.2"/>
        <line x1="128" y1="97" x2="147" y2="96" stroke="#B09070" strokeWidth="0.7" opacity="0.5"/>
        {/* Paper texture overlay */}
        <rect x="0" y="0" width="180" height="280" fill="url(#paperTex)" opacity="0.12"/>
        <defs>
          <pattern id="paperTex" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill="white"/>
            <path d="M0 4L4 0" stroke="#888" strokeWidth="0.3"/>
          </pattern>
        </defs>
      </svg>
    </div>
  );
}

export function PaperHandRight({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        right: 0,
        bottom: "10%",
        width: "min(280px, 30vw)",
        zIndex: 5,
        transform: visible ? "translateX(0) rotate(8deg)" : "translateX(110%) rotate(18deg)",
        transition: "transform 1.2s cubic-bezier(0.34,1.1,0.64,1) 0.15s",
        transformOrigin: "bottom right",
        pointerEvents: "none",
      }}
    >
      <svg viewBox="0 0 180 280" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%", height: "auto",
          transform: "scaleX(-1)",
          filter: "drop-shadow(-4px 8px 24px rgba(0,0,0,0.5))",
          animation: visible ? "handShakeRight 2.4s ease-in-out infinite 0.4s" : "none",
        }}>
        {/* Same hand mirrored */}
        <polygon points="30,280 20,160 60,120 90,115 120,120 155,160 150,280"
          fill="#C8A882" stroke="#8C6840" strokeWidth="1.5"/>
        <line x1="30" y1="220" x2="150" y2="210" stroke="#A08060" strokeWidth="0.8" opacity="0.6"/>
        <line x1="35" y1="190" x2="145" y2="182" stroke="#A08060" strokeWidth="0.8" opacity="0.5"/>
        <polygon points="30,280 20,160 60,200 60,280" fill="rgba(0,0,0,0.10)"/>
        <polygon points="20,160 0,130 10,105 30,120 30,165"
          fill="#C0A070" stroke="#8C6840" strokeWidth="1.2"/>
        <polygon points="45,120 38,60 50,38 65,55 72,120"
          fill="#C8A882" stroke="#8C6840" strokeWidth="1.2"/>
        <line x1="43" y1="90" x2="68" y2="92" stroke="#A08060" strokeWidth="0.7" opacity="0.5"/>
        <line x1="42" y1="70" x2="64" y2="71" stroke="#A08060" strokeWidth="0.7" opacity="0.4"/>
        <polygon points="72,118 68,50 80,28 96,45 100,118"
          fill="#D0B290" stroke="#8C6840" strokeWidth="1.2"/>
        <line x1="70" y1="88" x2="97" y2="88" stroke="#A08060" strokeWidth="0.7" opacity="0.5"/>
        <polygon points="100,118 98,58 110,42 124,56 126,118"
          fill="#C8A882" stroke="#8C6840" strokeWidth="1.2"/>
        <polygon points="126,120 126,75 135,62 148,72 150,122"
          fill="#C0A070" stroke="#8C6840" strokeWidth="1.2"/>
        {/* Fold accent lines (paper art) */}
        <line x1="60" y1="120" x2="90" y2="115" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
        <line x1="90" y1="115" x2="120" y2="120" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
        {/* Crease for 3D folded feel */}
        <polygon points="90,115 60,180 90,200 120,180" fill="rgba(255,255,255,0.06)"/>
      </svg>
    </div>
  );
}
