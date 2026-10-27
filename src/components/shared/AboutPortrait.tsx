import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type AboutPortraitProps = {
  src: string;
  focal: { x: number; y: number };
  focalMobile: { x: number; y: number };
};

export function AboutPortrait({ src, focal, focalMobile }: AboutPortraitProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const portrait = portraitRef.current;
    if (!portrait || typeof window === "undefined") return;
    if (window.matchMedia("(hover: hover)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsRevealed(entry.isIntersecting),
      { threshold: 0.6, rootMargin: "-15% 0px -15% 0px" },
    );
    observer.observe(portrait);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={portraitRef}
      className={`about-portrait${isRevealed ? " is-revealed" : ""}`}
      style={
        {
          "--portrait-focal-x": `${focal.x}%`,
          "--portrait-focal-y": `${focal.y}%`,
          "--portrait-focal-mobile-x": `${focalMobile.x}%`,
          "--portrait-focal-mobile-y": `${focalMobile.y}%`,
        } as CSSProperties
      }
      tabIndex={0}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
      onFocus={() => setIsRevealed(true)}
      onBlur={() => setIsRevealed(false)}
    >
      <img
        src={src}
        alt="Jan Kevin B. Dionaldo seated in an armchair, wearing a barong"
        width="704"
        height="880"
        loading="lazy"
        draggable={false}
      />
      <span className="about-portrait-tint" aria-hidden="true" />
      <span className="about-portrait-gradient" aria-hidden="true" />
    </div>
  );
}
