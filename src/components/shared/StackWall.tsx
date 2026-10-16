import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  stack,
  stackCategories,
  type StackFilter,
  type StackItem,
} from "@/data/stack";
import type { CSSProperties } from "react";

function StackIcon({ item }: { item: StackItem }) {
  if (item.id === "chatgpt") {
    return (
      <svg
        aria-hidden="true"
        className="stack-tile-icon stack-brand-icon"
        style={{ color: item.color }}
        viewBox="0 0 24 24"
      >
        <path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z" />
      </svg>
    );
  }
  if (item.id === "windows") {
    return (
      <svg aria-hidden="true" className="stack-tile-icon" viewBox="0 0 40 40">
        <path fill={item.color} d="M4 6.5 18.5 4v14.5H4V6.5Zm17  -3L36 1v17.5H21V3.5ZM4 21.5h14.5V36L4 33.5v-12Zm17 0h15V39l-15-2.5v-15Z" />
      </svg>
    );
  }
  if (item.id === "vscode") {
    return (
      <svg aria-hidden="true" className="stack-tile-icon" viewBox="0 0 40 40">
        <path fill={item.color} d="m31 4 5 2.5v27L31 36 15 23.5 8 29l-4-3 9-10L4 6l4-3 7 5.5L31 4Zm0 7-11 8 11 8V11Z" />
      </svg>
    );
  }
  if (item.icon) {
    return (
      <span
        aria-hidden="true"
        className="stack-tile-icon"
        style={{ color: item.color }}
        dangerouslySetInnerHTML={{ __html: item.icon }}
      />
    );
  }
  return (
    <span
      className={`stack-monogram ${item.monogram && item.monogram.length > 2 ? "is-wide" : ""}`}
      style={{ color: item.color }}
      aria-hidden="true"
    >
      {item.monogram}
    </span>
  );
}

function StackTile({
  item,
  index,
  decorative = false,
}: {
  item: StackItem;
  index: number;
  decorative?: boolean;
}) {
  return (
    <motion.button
      type="button"
      className={`stack-tile ${item.preferred ? "is-preferred" : ""}`}
      style={{ "--stack-delay": `${Math.min(index * 18, 700)}ms` } as CSSProperties}
      tabIndex={decorative ? -1 : 0}
      aria-label={`${item.name}, ${item.category}${item.preferred ? ", preferred" : ""}`}
      title={`${item.name} — ${item.category}${item.preferred ? " · Preferred" : ""}`}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.018, 0.7), ease: "easeOut" }}
    >
      {item.preferred && <span className="stack-star" aria-hidden="true">★</span>}
      <StackIcon item={item} />
      <span className="stack-tooltip" role="tooltip">
        <strong>{item.name}</strong>
        <small className="mono">{item.category}</small>
        {item.preferred && <em>Preferred</em>}
      </span>
    </motion.button>
  );
}

export function StackWall() {
  const wallRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<StackFilter>("All");
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("stack");
    const match = stackCategories.find(
      (category) => category.toLowerCase().replaceAll(" ", "-") === value,
    );
    if (match) setFilter(match);
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    const node = wallRef.current;
    if (!node) return;
    let frame = 0;
    let point = { x: 0, y: 0 };
    const moveSpotlight = (event: PointerEvent) => {
      if (event.pointerType === "touch" || reducedMotion) return;
      point = { x: event.clientX, y: event.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        node.style.setProperty("--mx", `${point.x - rect.left}px`);
        node.style.setProperty("--my", `${point.y - rect.top}px`);
        frame = 0;
      });
    };
    node.addEventListener("pointermove", moveSpotlight);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.12,
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      node.removeEventListener("pointermove", moveSpotlight);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  const visible = useMemo(
    () =>
      stack.filter((item) => {
        if (filter === "All") return true;
        if (filter === "Preferred") return item.preferred;
        return item.category === filter;
      }),
    [filter],
  );
  const preferredCount = stack.filter((item) => item.preferred).length;
  const rows = [0, 1, 2].map((row) =>
    stack.filter((_, index) => index % 3 === row),
  );
  const setFilterAndUrl = (next: StackFilter) => {
    setFilter(next);
    const params = new URLSearchParams(window.location.search);
    if (next === "All") params.delete("stack");
    else params.set("stack", next.toLowerCase().replaceAll(" ", "-"));
    const query = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`);
  };
  const moveFilter = (current: StackFilter, direction: 1 | -1) => {
    const index = stackCategories.indexOf(current);
    const nextIndex = (index + direction + stackCategories.length) % stackCategories.length;
    setFilterAndUrl(stackCategories[nextIndex]);
  };

  return (
    <div className="stack-wall-wrap">
      <div className="stack-header-row">
        <p className="mono stack-kicker">Tools / Stack</p>
        <p className="mono stack-legend">★ Preferred</p>
      </div>
      <h3 className="stack-title">Tools I build, secure, and ship with.</h3>
      <p className="stack-support">
        A practical toolkit across interfaces, data, delivery, creative work, and AI-assisted workflows.
      </p>
      <div className="stack-summary mono">
        <span>{stack.length} tools / {preferredCount} preferred</span>
        <span aria-live="polite">{visible.length} shown</span>
      </div>
      <div className="stack-filters" role="tablist" aria-label="Filter stack tools">
        {stackCategories.map((category) => (
          <button
            type="button"
            role="tab"
            aria-selected={filter === category}
            className={filter === category ? "is-active" : ""}
            key={category}
            onClick={() => setFilterAndUrl(category)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                moveFilter(category, 1);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                moveFilter(category, -1);
              }
            }}
          >
            {category}
          </button>
        ))}
      </div>
      <div
        className="stack-wall"
        ref={wallRef}
        data-paused={paused || !inView || reducedMotion}
      >
        <div className="stack-blueprint" aria-hidden="true" />
        {filter === "All" && !reducedMotion ? (
          <div className="stack-marquee-wall" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            {rows.map((row, rowIndex) => (
              <div className={`stack-marquee stack-marquee-${rowIndex + 1}`} key={rowIndex}>
                {[...row, ...row].map((item, index) => (
                  <div aria-hidden="true" className="stack-marquee-copy" key={`${item.id}-${index}`}>
                    <StackTile item={item} index={index + rowIndex} decorative />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <motion.div className="stack-grid" layout>
            {visible.map((item, index) => <StackTile item={item} index={index} key={item.id} />)}
          </motion.div>
        )}
      </div>
      <div className="stack-controls">
        <button type="button" className="mono stack-pause" onClick={() => setPaused((value) => !value)}>
          {paused ? "Resume motion" : "Pause motion"}
        </button>
        <p className="stack-screen-reader">
          {stack.map((item) => `${item.name}${item.preferred ? " (preferred)" : ""}`).join(", ")}
        </p>
      </div>
    </div>
  );
}
