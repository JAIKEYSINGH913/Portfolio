"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export type ShapeType = "cube" | "wave" | "line" | "lorenz" | "chalice" | "ambient";

interface GlobalStateContextType {
  activeSection: number;
  setActiveSection: (sec: number) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  shapeState: ShapeType;
  setShapeState: (shape: ShapeType) => void;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [activeSection, setActiveSectionState] = useState<number>(0);
  const [animationSpeed, setAnimationSpeed] = useState<number>(2.0); // ranges from 1.0 (Steady) to 11.0 (Faster)
  const [shapeState, setShapeState] = useState<ShapeType>("cube");

  // Automatically update the shape state based on the pathname and current home section
  useEffect(() => {
    if (pathname === "/") {
      const shapes: ShapeType[] = ["cube", "wave", "line", "lorenz", "chalice"];
      if (activeSection >= 0 && activeSection < shapes.length) {
        setShapeState(shapes[activeSection]);
      }
    } else if (pathname === "/work") {
      setShapeState("wave"); // Work page defaults to wave or ambient
    } else if (pathname === "/about") {
      setShapeState("lorenz"); // About page defaults to lorenz or ambient
    } else {
      setShapeState("ambient");
    }
  }, [pathname, activeSection]);

  const setActiveSection = (sec: number) => {
    setActiveSectionState(sec);
  };

  return (
    <GlobalStateContext.Provider
      value={{
        activeSection,
        setActiveSection,
        animationSpeed,
        setAnimationSpeed,
        shapeState,
        setShapeState,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
