"use client";

import React, { useRef, useState } from "react";
import { useGlobalState } from "@/context/GlobalState";

export const SpeedSlider: React.FC = () => {
  const { animationSpeed, setAnimationSpeed } = useGlobalState();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const SLIDER_HEIGHT = 140;
  const MIN_SPEED = 1.0;
  const MAX_SPEED = 11.0;

  const getPercentage = () => {
    const fraction = (animationSpeed - MIN_SPEED) / (MAX_SPEED - MIN_SPEED);
    return (1 - fraction) * 100;
  };

  const updateSpeedFromClientY = (clientY: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    let y = clientY - rect.top;
    y = Math.max(0, Math.min(SLIDER_HEIGHT, y));
    const fraction = 1 - y / SLIDER_HEIGHT;
    const speed = MIN_SPEED + fraction * (MAX_SPEED - MIN_SPEED);
    setAnimationSpeed(Number(speed.toFixed(1)));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateSpeedFromClientY(e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateSpeedFromClientY(e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 select-none">
      <div
        className="bg-white/95 backdrop-blur-sm rounded-r-[40px] py-5 px-4 pr-5 flex flex-col items-center gap-0.5 shadow-xl"
        style={{ fontFamily: "var(--font-oxanium), sans-serif" }}
      >
        {/* Faster label */}
        <span className="text-[8px] text-black/40 uppercase tracking-[0.15em] font-medium">
          Faster
        </span>

        {/* Speed value */}
        <span className="text-black font-bold text-sm tracking-wide">
          {animationSpeed.toFixed(1)}
        </span>

        {/* Slider Track */}
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative w-6 flex justify-center cursor-ns-resize py-1 touch-none my-1"
          style={{ height: `${SLIDER_HEIGHT}px` }}
        >
          {/* Track Line */}
          <div className="absolute top-0 bottom-0 w-[2px] bg-black/15 rounded-full" />

          {/* Active Track */}
          <div
            className="absolute bottom-0 w-[2px] bg-black/50 rounded-full transition-all duration-75"
            style={{ height: `${100 - getPercentage()}%` }}
          />

          {/* Handle */}
          <div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-black rounded-full shadow-md cursor-grab active:cursor-grabbing transition-all duration-75"
            style={{ top: `${getPercentage()}%` }}
          >
            {isDragging && (
              <div className="absolute inset-0 rounded-full bg-black/30 animate-ping" />
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="w-5 h-[1px] bg-black/10 my-1" />

        {/* Steady label */}
        <span className="text-[8px] text-black/40 uppercase tracking-[0.15em] font-medium">
          Steady
        </span>
      </div>
    </div>
  );
};
