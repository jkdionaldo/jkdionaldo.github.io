import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";

export function ProjectThumbnail({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const isRevealed = isHovered || isInView;

  useEffect(() => {
    const thumbnail = thumbnailRef.current;
    if (!thumbnail || typeof window === "undefined") return;
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (canHover) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.6, rootMargin: "-10% 0px -10% 0px" },
    );
    observer.observe(thumbnail);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !project.video) return;

    if (isRevealed) {
      video.play().catch((error: unknown) => {
        console.warn("Project preview video could not play.", error);
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isRevealed, project.video]);

  return (
    <div
      ref={thumbnailRef}
      className={`project-thumbnail${isRevealed ? " is-revealed" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="project-thumbnail-image"
        src={project.image}
        alt={`${project.title} interface`}
        width="1313"
        height="875"
        loading="lazy"
        draggable={false}
        style={{ objectPosition: project.focus ?? "top center" }}
      />
      {project.video && (
        <video
          ref={videoRef}
          className="project-thumbnail-video"
          src={project.video}
          poster={project.image}
          width="1313"
          height="875"
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          style={{ objectPosition: project.focus ?? "top center" }}
        />
      )}
      <span className="project-thumbnail-tint" aria-hidden="true" />
      <span className="project-thumbnail-gradient" aria-hidden="true" />
      <span className="work-arrow" aria-hidden="true">
        <ArrowUpRight size={19} />
      </span>
    </div>
  );
}
