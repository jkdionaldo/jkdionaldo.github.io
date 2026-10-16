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
