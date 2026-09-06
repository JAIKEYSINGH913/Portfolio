"use client";

import { useEffect } from "react";

/**
 * ScrollToTopOnLoad
 * Disables the browser's built-in scroll restoration and smoothly
 * scrolls to the top of the page whenever the component mounts
 * (i.e. on every page load / hard refresh).
 */
export function ScrollToTopOnLoad() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // Small delay ensures the page has painted before scrolling
    const id = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 80);
    return () => clearTimeout(id);
  }, []);

  return null;
}
