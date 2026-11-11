import { useEffect, useRef, useState } from "react";
import { bootSequence, type BootLine } from "@/data/bootSequence";
import { useAssetGate } from "@/hooks/useAssetGate";
import { useBootDone } from "@/hooks/useBootDone";
import { finishBoot } from "@/lib/bootSession";

const MIN_DISPLAY_TIME = 1800;
const HARD_TIMEOUT = 3500;

export function Preloader() {
  const assetReady = useAssetGate();
  const bootDone = useBootDone();
  const [lines, setLines] = useState<BootLine[]>([]);
  const [typed, setTyped] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [spinner, setSpinner] = useState("-");
  const [exiting, setExiting] = useState<"skip" | "complete" | null>(null);
  const [mounted, setMounted] = useState(true);
  const [liveMessage, setLiveMessage] = useState("Loading portfolio");
  const completed = useRef(false);
  const cleanupTimer = useRef<number | null>(null);
  const startedAt = useRef(performance.now());
  const index = useRef(0);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);

  useEffect(() => {
    if (cleanupTimer.current !== null) {
      window.clearTimeout(cleanupTimer.current);
      cleanupTimer.current = null;
    }
    return () => {
      cleanupTimer.current = window.setTimeout(() => finishBoot(), 0);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      finishBoot();
      setMounted(false);
      return;
    }
    let cancelled = false;
    const finish = () => {
      if (cancelled || completed.current) return;
      completed.current = true;
      finishBoot();
      setLiveMessage("Portfolio loaded");
      setExiting("complete");
      window.setTimeout(() => {
        if (!cancelled) setMounted(false);
      }, 700);
    };
    const timeout = window.setTimeout(finish, HARD_TIMEOUT);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || completed.current) return;
    let cancelled = false;
    let timer = 0;
    const step = () => {
      if (cancelled || completed.current) return;
      const current = bootSequence[index.current];
      if (!current) return;
      setLines((previous) => [...previous.slice(-29), current]);
      index.current += 1;
      if (current.typed) {
        let character = 0;
        const typing = window.setInterval(() => {
          if (cancelled) {
            window.clearInterval(typing);
            return;
          }
          character += 1;
          setTyped(current.message.slice(0, character));
          if (character >= current.message.length) {
            window.clearInterval(typing);
            timer = window.setTimeout(step, 140);
          }
        }, 16);
        return;
      }
      if (current.wait && !assetReady) {
        setWaiting(true);
        return;
      }
      timer = window.setTimeout(step, Math.max(20, current.delay * (assetReady ? 0.35 : 1)));
    };
    timer = window.setTimeout(step, 40);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [assetReady, reducedMotion]);

  useEffect(() => {
    if (assetReady) setWaiting(false);
  }, [assetReady]);

  useEffect(() => {
    if (!waiting) return;
    const frames = ["-", "\\", "|", "/"];
    let frame = 0;
    const timer = window.setInterval(() => {
      frame = (frame + 1) % frames.length;
      setSpinner(frames[frame]);
    }, 180);
    return () => window.clearInterval(timer);
  }, [waiting]);

  useEffect(() => {
    if (reducedMotion || !assetReady || index.current < bootSequence.length) return;
    const remaining = Math.max(0, MIN_DISPLAY_TIME - (performance.now() - startedAt.current));
    const timer = window.setTimeout(() => {
      if (!completed.current) {
        completed.current = true;
        finishBoot();
        setLiveMessage("Portfolio loaded");
        setExiting("complete");
        window.setTimeout(() => setMounted(false), 700);
      }
    }, remaining);
    return () => window.clearTimeout(timer);
  }, [assetReady, reducedMotion, typed]);

  const skip = () => {
    if (completed.current) return;
    completed.current = true;
    finishBoot();
    setLiveMessage("Portfolio loaded");
    setExiting("skip");
    window.setTimeout(() => setMounted(false), 300);
  };

  if (reducedMotion || !mounted || bootDone) {
    return null;
  }

  return (
    <div className={`boot-overlay ${exiting ? `is-${exiting}` : ""}`} onClick={skip}>
      <button className="boot-skip focus-ring" type="button" onClick={skip}>
        {coarsePointer ? "Tap to skip" : "Esc to skip"}
      </button>
      <div className="boot-terminal" aria-hidden="true">
        {lines.map((line, lineIndex) => {
          const isPrompt = line.tag === "prompt" && lineIndex === lines.length - 1;
          return (
            <div className={`boot-line boot-${line.tag}`} key={`${line.timestamp}-${line.tag}`}>
              <span className="boot-timestamp">{line.timestamp}</span>{" "}
              <span className="boot-tag">{line.tag.padEnd(9, " ")}</span>{" "}
              <span className="boot-message">
                {line.wait && waiting ? `${spinner} waiting for interface` : isPrompt ? typed : line.message}
                {isPrompt && <span className="boot-cursor" />}
              </span>
            </div>
          );
        })}
      </div>
      <div className="sr-only" role="status" aria-live="polite">{liveMessage}</div>
    </div>
  );
}
