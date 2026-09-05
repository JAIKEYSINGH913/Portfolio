"use client";

import { useEffect } from "react";

/**
 * ViewportHeightHandler
 *
 * Sets the --content-height CSS custom property to the actual
 * window.innerHeight in pixels. This is critical for mobile browsers
 * (especially iOS Safari) where `100vh` includes the browser chrome
 * and causes scroll-snap sections to overflow incorrectly.
 *
 * The globals.css scroll-section class uses `height: var(--content-height)`
 * instead of `height: 100vh` to avoid this issue.
 */
export function ViewportHeightHandler() {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty(
        "--content-height",
        `${vh}px`
      );
    };

    // Set on mount
    setVh();

    // Update on resize (handles orientation changes too)
    window.addEventListener("resize", setVh);
    // Also update on visualViewport resize for iOS keyboard appearance
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", setVh);
    }

    return () => {
      window.removeEventListener("resize", setVh);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", setVh);
      }
    };
  }, []);

  // This component renders nothing — it's purely a side-effect hook
  return null;
}
