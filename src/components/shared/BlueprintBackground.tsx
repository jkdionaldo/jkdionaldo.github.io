import { useEffect, useRef, useState } from "react";

export function BlueprintBackground() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [spotlightVisible, setSpotlightVisible] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || typeof window === "undefined") return;
    const canUseSpotlight =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canUseSpotlight) return;

    let frameRequested = false;
    let x = 0;
    let y = 0;
    const update = () => {
      frameRequested = false;
      frame.style.setProperty("--mx", `${x}px`);
      frame.style.setProperty("--my", `${y}px`);
    };
    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      setSpotlightVisible(true);
      if (!frameRequested) {
        frameRequested = true;
        requestAnimationFrame(update);
      }
    };
    const leave = () => setSpotlightVisible(false);

    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className={`blueprint-background${spotlightVisible ? " is-active" : ""}`}
      aria-hidden="true"
    >
      <div className="blueprint-pattern" />
      <div className="blueprint-spotlight" />
    </div>
  );
}
