import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  ArrowUpRight,
  Command,
  ChevronDown,
  Download,
  ExternalLink,
  Mail,
  Moon,
  Sun,
  X,
} from "lucide-react";
import {
  ArrowRightIcon,
  CodeIcon,
  HamburgerMenuIcon,
  LightningBoltIcon,
  LockClosedIcon,
} from "@svg-animated-icons/react";
import {
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { portfolio, type Project } from "@/data/portfolio";
import {
  experienceRoles,
  proofEntries,
  type ExperienceNiche,
  type ExperienceRole,
} from "@/data/experience";
import { StackWall } from "@/components/shared/StackWall";
import { ProjectThumbnail } from "@/components/shared/ProjectThumbnail";
import { AboutPortrait } from "@/components/shared/AboutPortrait";
import { BlueprintBackground } from "@/components/shared/BlueprintBackground";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useTheme } from "@/hooks/useTheme";
import "@/styles/globals.css";

type FormValues = { name: string; email: string; message: string };
type Niche = "all" | "development" | "security";
const caseStudyChapters = [
  { id: "case-story", label: "01 / Story" },
  { id: "case-problem", label: "02 / Problem" },
  { id: "case-decisions", label: "03 / Decisions" },
  { id: "case-architecture", label: "04 / How it works" },
  { id: "case-security", label: "05 / Security & data" },
];
const navItems = [
  { label: "Work", href: "#work" },
  { label: "Expertise", href: "#expertise" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function navigateToSection(
  event: ReactMouseEvent<HTMLAnchorElement>,
  href: string,
) {
  if (!href.startsWith("#")) return;
  const target = document.querySelector<HTMLElement>(href);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  history.pushState(null, "", href);
}

function SectionHeading({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <p className="mono eyebrow">{index}</p>
      <h2>{title}</h2>
      {children && <p className="section-lede">{children}</p>}
    </div>
  );
}

function Section({
  id,
  className = "",
  surface = "transparent",
  children,
}: {
  id?: string;
  className?: string;
  surface?: "transparent" | "solid";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`section ${className}`.trim()}
      data-surface={surface}
    >
      {children}
    </section>
  );
}

function AboutBio({ bio }: { bio: string }) {
  const bioRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = bioRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const [before, after] = bio.split("cybersecurity");
  return (
    <span ref={bioRef} className={isVisible ? "is-visible" : ""}>
      {before}
      <mark className="marker-highlight">cybersecurity</mark>
      {after}
    </span>
  );
}

function Header({ openPalette }: { openPalette: () => void }) {
  const active = useScrollSpy(["work", "expertise", "about", "contact"]);
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!header) return;
    const updateHeight = () =>
      document.documentElement.style.setProperty(
        "--header-h",
        `${header.getBoundingClientRect().height}px`,
      );
    const resetHeightForBreakpoint = () => {
      document.documentElement.style.removeProperty("--header-h");
      requestAnimationFrame(updateHeight);
    };
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    addEventListener("resize", resetHeightForBreakpoint);
    updateHeight();
    return () => {
      observer.disconnect();
      removeEventListener("resize", resetHeightForBreakpoint);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="container-shell header-inner">
        <a
          className="brand focus-ring"
          href="#top"
          onClick={(event) => {
            navigateToSection(event, "#top");
            setOpen(false);
          }}
        >
          JK<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <motion.a
                className={`focus-ring nav-link ${isActive ? "is-active" : ""}`}
                href={item.href}
                key={item.href}
                onClick={(event) => navigateToSection(event, item.href)}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    className="nav-indicator"
                    layoutId="active-nav-indicator"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </motion.a>
            );
          })}
          <button
            className="palette-hint focus-ring"
            onClick={openPalette}
            aria-label="Open command palette"
          >
            <Command size={14} />
            <span>K</span>
          </button>
          <button
            className="icon-button focus-ring"
            onClick={toggle}
            aria-label="Toggle color theme"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a
            className="header-cta focus-ring"
            href="#contact"
            onClick={(event) => navigateToSection(event, "#contact")}
          >
            Get in touch
          </a>
        </nav>
        <div className="mobile-actions">
          <button
            className="icon-button focus-ring"
            onClick={toggle}
            aria-label="Toggle color theme"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            className="icon-button focus-ring"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <HamburgerMenuIcon className="animated-icon" />
          </button>
        </div>
      </div>
      {open && (
        <div
          className="mobile-sheet"
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="mobile-sheet-top">
            <a
              className="brand focus-ring"
              href="#top"
              onClick={(event) => {
                navigateToSection(event, "#top");
                setOpen(false);
              }}
            >
              JK<span>.</span>
            </a>
            <button
              className="icon-button focus-ring"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          <nav aria-label="Mobile navigation links">
            {navItems.map((item) => (
              <a
                className={active === item.href.slice(1) ? "is-active" : ""}
                href={item.href}
                key={item.href}
                onClick={(event) => {
                  navigateToSection(event, item.href);
                  setOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              className="mobile-sheet-cta"
              href="#contact"
              onClick={(event) => {
                navigateToSection(event, "#contact");
                setOpen(false);
              }}
            >
              Get in touch
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function CommandPalette({ open, close }: { open: boolean; close: () => void }) {
  const [query, setQuery] = useState("");
  const commands = [
    { label: "View selected work", href: "#work" },
    { label: "Explore expertise", href: "#expertise" },
    { label: "Read about Kevin", href: "#about" },
    { label: "Get in touch", href: "#contact" },
  ];
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open, close]);
  if (!open) return null;
  return (
    <div className="palette-backdrop" role="presentation" onMouseDown={close}>
      <div
        className="command-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Quick navigation"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="palette-input">
          <Command size={17} />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Jump to..."
            aria-label="Search navigation"
          />
        </div>
        <div className="palette-results">
          {commands
            .filter((item) =>
              item.label.toLowerCase().includes(query.toLowerCase()),
            )
            .map((item, index) => (
              <a
                href={item.href}
                onClick={(event) => {
                  navigateToSection(event, item.href);
                  close();
                }}
                key={item.href}
              >
                <span className="mono">0{index + 1}</span>
                {item.label}
                <ArrowUpRight size={15} />
              </a>
            ))}
        </div>
        <p className="mono palette-footer">ESC close · ENTER select</p>
      </div>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(true);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 50, damping: 20 });
  const y = useSpring(py, { stiffness: 50, damping: 20 });
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(node);
    const move = (event: MouseEvent) => {
      if (matchMedia("(pointer: coarse)").matches) return;
      px.set((event.clientX / innerWidth - 0.5) * 8);
      py.set((event.clientY / innerHeight - 0.5) * 5);
    };
    addEventListener("mousemove", move, { passive: true });
    return () => {
      observer.disconnect();
      removeEventListener("mousemove", move);
    };
  }, [px, py]);
  return (
    <section className="hero" ref={ref} data-surface="transparent">
      <motion.div
        className="hero-portrait"
        style={reducedMotion ? undefined : { x, y }}
        animate={
          reducedMotion || !active ? { scale: 1 } : { scale: [1, 1.015, 1] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src={portfolio.photo}
          alt=""
          width="704"
          height="768"
          fetchPriority="high"
        />
      </motion.div>
      <div className="hero-scan" aria-hidden="true" />
      <div className="hero-wash" />
      <div className="container-shell hero-content">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="mono status-line">
            <span>●</span> Available for Work
          </p>
          <p className="mono hero-label">Jan Kevin B. Dionaldo / Developer</p>
          <h1 className="hero-title">Security-minded software engineer.</h1>
          <p className="hero-copy">
            I build and improve digital systems so people can use them with
            confidence.
          </p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href="#work"
              onClick={(event) => navigateToSection(event, "#work")}
            >
              View selected work <ArrowRightIcon className="animated-icon" />
            </a>
            <a
              className="button button-secondary"
              href="#contact"
              onClick={(event) => navigateToSection(event, "#contact")}
            >
              Get in touch
            </a>
          </div>
          <p className="mono focus-row">
            Web Development <span>·</span> Software Development <span>·</span>{" "}
            Security
          </p>
        </motion.div>
      </div>
      <div className="hero-index mono">01 / 04</div>
    </section>
  );
}

function NicheToggle({
  value,
  onChange,
}: {
  value: Niche;
  onChange: (value: Niche) => void;
}) {
  return (
    <div
      className="niche-toggle"
      role="group"
      aria-label="Filter work by niche"
    >
      {(["all", "development", "security"] as Niche[]).map((item) => (
        <button
          className={`focus-ring ${value === item ? "is-selected" : ""}`}
          onClick={() => onChange(item)}
          key={item}
        >
          {item === "all"
            ? "All work"
            : item === "development"
              ? "Development"
              : "Cybersecurity"}
        </button>
      ))}
    </div>
  );
}

function CaseDialog({
  project,
  close,
  nextProject,
  openNext,
}: {
  project: Project | null;
  close: () => void;
  nextProject: Project | null;
  openNext: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const previousProjectTitleRef = useRef<string | null>(null);
  const [isSwitchingProject, setIsSwitchingProject] = useState(false);
  const isOpen = project !== null;

  useLayoutEffect(() => {
    if (!project) return;

    const previousFocus = document.activeElement;
    const previousBodyStyles = {
      overflow: document.body.style.overflow,
    };
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    closeButtonRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab") return;
      const dialog = document.querySelector<HTMLElement>(".case-dialog");
      if (!dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, a[href], video[controls], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyStyles.overflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [close, isOpen]);

  useLayoutEffect(() => {
    if (!project) {
      previousProjectTitleRef.current = null;
      return;
    }

    const previousTitle = previousProjectTitleRef.current;
    previousProjectTitleRef.current = project.title;
    if (!previousTitle || previousTitle === project.title) {
      scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
    setIsSwitchingProject(true);
    const timeoutId = window.setTimeout(() => {
      setIsSwitchingProject(false);
    }, 180);

    return () => window.clearTimeout(timeoutId);
  }, [project]);

  if (!project) return null;
  return (
    <div
      className="dialog-backdrop"
      role="presentation"
      onClick={close}
      onWheel={(event) => {
        if (event.target === event.currentTarget) event.preventDefault();
      }}
      onTouchMove={(event) => {
        if (event.target === event.currentTarget) event.preventDefault();
      }}
    >
      <motion.div
        className={`case-dialog${isSwitchingProject ? " is-switching-project" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
        tabIndex={-1}
        //For open animation
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        //until here
        onClick={(event) => event.stopPropagation()}
        onDragStart={(event) => event.preventDefault()}
      >
        <header className="case-dialog-header">
          <span className="dialog-drag-handle" aria-hidden="true" />
          <button
            ref={closeButtonRef}
            className="dialog-close focus-ring"
            onClick={close}
            aria-label="Close case study"
          >
            <X size={17} />
          </button>
          {project.caseStudy && (
            <CaseStudyChapterHeader scrollRootRef={scrollRef} />
          )}
        </header>
        <div className="case-dialog-scroll" ref={scrollRef}>
          <div className="case-dialog-column">
            <CaseStudyMedia project={project} />
            <p className="mono eyebrow">Case study</p>
            <h2>{project.title}</h2>
        {project.caseStudy ? (
          <>
            <CaseStudyMeta project={project} />
            <CaseStudyBody
              project={project}
              nextProject={nextProject}
              openNext={openNext}
              close={close}
            />
          </>
        ) : (
          <LegacyCaseStudy project={project} />
        )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CaseStudyMeta({ project }: { project: Project }) {
  const [role, type] = project.role.split("·").map((part) => part.trim());
  return (
    <div className="case-study-meta mono">
      <span>{role}</span>
      <span>{project.year}</span>
      <span>{type || "Project"}</span>
    </div>
  );
}

function LegacyCaseStudy({ project }: { project: Project }) {
  return (
    <>
      <p className="dialog-result">
        <strong>Result</strong> {project.outcome}
      </p>
      <dl>
        <div>
          <dt>Role</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>{project.tags.join(" · ")}</dd>
        </div>
        <div>
          <dt>Scope</dt>
          <dd>{project.description}</dd>
        </div>
      </dl>
    </>
  );
}

const experienceFilters: { value: "all" | ExperienceNiche; label: string }[] = [
  { value: "all", label: "All" },
  { value: "development", label: "Development" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "admin", label: "Admin" },
  { value: "creative", label: "Creative" },
];

function formatExperienceDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}-01T00:00:00`));
}

function durationInMonths(role: ExperienceRole) {
  const start = new Date(`${role.start}-01T00:00:00`);
  const end = new Date(`${role.end}-01T00:00:00`);
  return Math.max(
    1,
    (end.getFullYear() - start.getFullYear()) * 12 +
      end.getMonth() -
      start.getMonth() +
      1,
  );
}

function NumberTicker({ value }: { value: number }) {
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(reducedMotion ? value : 0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(value);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 650, 1);
          setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, value]);

  return <span ref={ref}>{display}</span>;
}

function ProofCard({ entry, index }: { entry: (typeof proofEntries)[number]; index: number }) {
  return (
    <article className={`proof-card${index === 0 ? " is-featured" : ""}`}>
      <span className="proof-marker" aria-hidden="true" />
      <strong>{entry.result}</strong>
      <p>{entry.event}</p>
      {entry.team && <p>{entry.team}</p>}
      <time className="mono" dateTime={String(entry.year)}>
        {entry.year}
      </time>
    </article>
  );
}

function ExperienceSection() {
  const [filter, setFilter] = useState<"all" | ExperienceNiche>("all");
  const [openRole, setOpenRole] = useState<string | null>(null);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const filterButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const timelineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reachedRoles, setReachedRoles] = useState<string[]>([]);
  const reducedMotion = useReducedMotion();
  const visibleRoles = filter === "all"
    ? experienceRoles
    : experienceRoles.filter((role) => role.niche === filter);
  const availableFilters = experienceFilters.filter(
    (item) =>
      item.value === "all" ||
      experienceRoles.some((role) => role.niche === item.value) ||
      (item.value === "cybersecurity" && proofEntries.length > 0),
  );
  const earliest = new Date(
    `${experienceRoles[experienceRoles.length - 1].start}-01T00:00:00`,
  );
  const yearsActive = Math.max(
    0,
    new Date().getFullYear() -
      earliest.getFullYear() -
      (new Date().getMonth() < earliest.getMonth() ? 1 : 0),
  );

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("exp");
    if (experienceFilters.some((item) => item.value === value)) {
      setFilter(value as "all" | ExperienceNiche);
    }
  }, []);

  useEffect(() => {
    filterButtonRefs.current[filter]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [filter]);

  useEffect(() => {
    const update = () => {
      const node = timelineRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      const nextProgress = Math.min(1, Math.max(0, (viewport * 0.72 - rect.top) / rect.height));
      setProgress(nextProgress);
      const rows = Array.from(node.querySelectorAll<HTMLElement>(".experience-row"));
      const dots = Array.from(node.querySelectorAll<HTMLElement>(".timeline-dot"));
      const progressEnd = rect.top + nextProgress * rect.height;
      const nextReachedRoles = reducedMotion
        ? visibleRoles.map((role) => role.id)
        : rows
            .map((row, index) => {
              const dot = dots[index];
              if (!dot) return null;
              const dotCenter = dot.getBoundingClientRect().top + dot.offsetHeight / 2;
              return dotCenter <= progressEnd ? row.dataset.role ?? null : null;
            })
            .filter((roleId): roleId is string => Boolean(roleId));
      setReachedRoles((current) => (
        current.length === nextReachedRoles.length &&
        current.every((roleId, index) => roleId === nextReachedRoles[index])
          ? current
          : nextReachedRoles
      ));
      const center = viewport / 2;
      const nearest = rows
        .map((row) => ({ row, distance: Math.abs(row.getBoundingClientRect().top + row.offsetHeight / 2 - center) }))
        .sort((a, b) => a.distance - b.distance)[0];
      setActiveRole(nearest?.row.dataset.role ?? null);
    };
    let frame = 0;
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); });
    };
    update();
    addEventListener("scroll", scroll, { passive: true });
    return () => {
      removeEventListener("scroll", scroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reducedMotion, visibleRoles]);

  const changeFilter = (value: "all" | ExperienceNiche) => {
    setFilter(value);
    setOpenRole(null);
    const params = new URLSearchParams(window.location.search);
    if (value === "all") params.delete("exp");
    else params.set("exp", value);
    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`,
    );
  };

  const projectForRole = (role: ExperienceRole) =>
    role.project
      ? portfolio.projects.find((project) => project.title === role.project)
      : undefined;

  return (
    <div className="container-shell proof-layout">
      <div className="proof-intro">
        <p className="mono eyebrow">04 / Proof & Experience</p>
        <h2>Earned through practice.</h2>
        <div className="proof-summary">
          <div><span className="mono">Years active</span><strong><NumberTicker value={yearsActive} /></strong></div>
          <div><span className="mono">Roles</span><strong><NumberTicker value={experienceRoles.length} /></strong></div>
          <div><span className="mono">Competition results</span><strong><NumberTicker value={proofEntries.length} /></strong></div>
        </div>
        <div className="experience-filter" role="group" aria-label="Filter experience">
          {availableFilters.map((item) => {
            const count = item.value === "all"
              ? experienceRoles.length
              : item.value === "cybersecurity"
                ? proofEntries.length
                : experienceRoles.filter((role) => role.niche === item.value).length;
            return (
              <button
                type="button"
                key={item.value}
                className={filter === item.value ? "is-selected" : ""}
                ref={(element) => {
                  filterButtonRefs.current[item.value] = element;
                }}
                onClick={() => changeFilter(item.value)}
                aria-pressed={filter === item.value}
              >
                {item.label} <span>{count}</span>
              </button>
            );
          })}
        </div>
        <p className="visually-hidden" aria-live="polite">
          {visibleRoles.length} roles shown
        </p>
      </div>
      <div className="proof-content">
        <section aria-labelledby="proof-heading">
          <div className="proof-subheading">
            <p id="proof-heading" className="mono eyebrow">Proof</p>
            <span className="mono">Competition results</span>
          </div>
          <div className="proof-cards">
            {proofEntries.map((entry, index) => <ProofCard key={entry.id} entry={entry} index={index} />)}
          </div>
        </section>
        <section aria-labelledby="experience-heading">
          <div className="proof-subheading">
            <p id="experience-heading" className="mono eyebrow">Experience</p>
            <span className="mono">{visibleRoles.length} roles</span>
          </div>
          {visibleRoles.length ? (
            <div className="experience-timeline" ref={timelineRef}>
              <span className="timeline-base" aria-hidden="true" />
              <span
                className="timeline-progress"
                aria-hidden="true"
                style={{ transform: `scaleY(${reducedMotion ? 1 : progress})` }}
              />
              <ol>
                {visibleRoles.map((role, index) => {
                  const expanded = openRole === role.id;
                  const project = projectForRole(role);
                  const expandable = Boolean(role.details?.length || project);
                  return (
                    <motion.li
                      layout
                      key={role.id}
                      className={`experience-row${expanded ? " is-open" : ""}`}
                      data-role={role.id}
                      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.3, delay: index * 0.04 }}
                    >
                      <span
                        className={`timeline-dot${reachedRoles.includes(role.id) ? " is-reached" : ""}`}
                        aria-hidden="true"
                      />
                      {expandable ? (
                        <button
                          type="button"
                          className="experience-row-button focus-ring"
                          aria-expanded={expanded}
                          aria-controls={`experience-${role.id}`}
                          onClick={() => setOpenRole(expanded ? null : role.id)}
                        >
                          <ExperienceRowContent role={role} active={activeRole === role.id} />
                          <ChevronDown className="experience-chevron" size={18} />
                        </button>
                      ) : (
                        <div className="experience-row-button">
                          <ExperienceRowContent role={role} active={activeRole === role.id} />
                        </div>
                      )}
                      {expanded && (
                        <motion.div
                          id={`experience-${role.id}`}
                          className="experience-details"
                          initial={reducedMotion ? false : { opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {role.details?.map((detail) => <p key={detail}>{detail}</p>)}
                          {project && (
                            <button
                              type="button"
                              className="experience-project-link mono"
                              onClick={() => window.dispatchEvent(new CustomEvent("open-project", { detail: project }))}
                            >
                              View the project <ArrowUpRight size={14} />
                            </button>
                          )}
                        </motion.div>
                      )}
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          ) : (
            <div className="experience-empty">
              <p>No roles are currently tagged with this niche.</p>
              <button type="button" className="button button-secondary" onClick={() => changeFilter("all")}>Show all roles</button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function ExperienceRowContent({ role, active }: { role: ExperienceRole; active: boolean }) {
  return (
    <span className="experience-row-content">
      <span className="experience-date mono">
        <time dateTime={role.start}>{formatExperienceDate(role.start)}</time>
        {" – "}
        <time dateTime={role.end}>{formatExperienceDate(role.end)}</time>
        <small>{durationInMonths(role)} mo</small>
      </span>
      <strong className={active ? "is-active" : ""}>{role.title}</strong>
      {(role.org || role.place) && <span className="experience-org">{[role.org, role.place].filter(Boolean).join(" · ")}</span>}
      <span className="experience-niche mono">{role.niche}</span>
      {role.current && <span className="experience-now mono">● Now</span>}
    </span>
  );
}

function CaseStudyBody({
  project,
  nextProject,
  openNext,
  close,
}: {
  project: Project;
  nextProject: Project | null;
  openNext: () => void;
  close: () => void;
}) {
  const caseStudy = project.caseStudy;
  if (!caseStudy) return null;
  const demoLink = caseStudy.links?.demo;
  const sourceLink = caseStudy.links?.source;
  const reducedMotion = useReducedMotion();
  const animation = reducedMotion
    ? undefined
    : { opacity: 1, y: 0 };
  const initial = reducedMotion ? undefined : { opacity: 0, y: 12 };

  return (
    <div className="case-study-body">
      {caseStudy.confirmed.story && (
        <motion.section
          id="case-story"
          className="case-study-section case-study-story"
          initial={initial}
          whileInView={animation}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
        >
          <p className="mono case-study-label">01 / Story</p>
          <p className="case-study-story-text">{caseStudy.story}</p>
        </motion.section>
      )}

      {caseStudy.confirmed.problem && (
        <CaseStudySection id="case-problem" label="02 / Problem">
          <p>{caseStudy.problem.context}</p>
          <div className="problem-contrast">
            <div>
              <span className="mono">Before</span>
              <p>{caseStudy.problem.before}</p>
            </div>
            <div>
              <span className="mono">After</span>
              <p>{caseStudy.problem.after}</p>
            </div>
          </div>
        </CaseStudySection>
      )}

      {caseStudy.confirmed.challenges && caseStudy.challenges.length > 0 && (
        <CaseStudySection id="case-decisions" label="03 / Decisions">
          <div className="challenge-list">
            {caseStudy.challenges.map((challenge, index) => (
              <motion.article
                className="challenge-card"
                key={challenge.title}
                initial={initial}
                whileInView={animation}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: reducedMotion ? 0 : index * 0.08 }}
              >
                {challenge.tag && (
                  <span className="mono challenge-tag">{challenge.tag}</span>
                )}
                <h3>{challenge.title}</h3>
                <p>
                  <strong>Decision</strong> {challenge.decision}
                </p>
                <p>
                  <strong>Trade-off</strong> {challenge.tradeoff}
                </p>
              </motion.article>
            ))}
          </div>
        </CaseStudySection>
      )}

      {caseStudy.confirmed.architecture &&
        caseStudy.architecture.nodes.length > 0 && (
          <CaseStudySection id="case-architecture" label="04 / How it works">
            <div className="architecture-diagram">
              {caseStudy.architecture.nodes.map((node, index) => (
                <div className="architecture-node" key={node.id}>
                  <span className="mono">{node.label}</span>
                  <p>{node.caption}</p>
                  {index < caseStudy.architecture.nodes.length - 1 && (
                    <span className="architecture-link" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
            <p>{caseStudy.architecture.summary}</p>
            <ol className="visually-hidden">
              {caseStudy.architecture.nodes.map((node) => (
                <li key={node.id}>
                  {node.label}: {node.caption}
                </li>
              ))}
            </ol>
            {caseStudy.interactive === "planner" && <MiniPlanner />}
          </CaseStudySection>
        )}

      {caseStudy.confirmed.security &&
        caseStudy.security &&
        caseStudy.security.items.length > 0 && (
          <CaseStudySection id="case-security" label="05 / Security & data" className="security-note">
            <DecryptNote items={caseStudy.security.items} reducedMotion={Boolean(reducedMotion)} />
          </CaseStudySection>
        )}

      {caseStudy.next && (
        <CaseStudySection label="06 / Next">
          <p>{caseStudy.next}</p>
        </CaseStudySection>
      )}

      <div className="case-study-closing">
        <p>Thanks for taking the time to look through this case study.</p>
        <div className="case-study-closing-actions">
          <button
            className="button button-primary"
            onClick={() => {
              close();
              requestAnimationFrame(() =>
                document.querySelector("#contact")?.scrollIntoView({
                  behavior: reducedMotion ? "auto" : "smooth",
                }),
              );
            }}
          >
            Get in touch <ArrowUpRight size={15} />
          </button>
          {nextProject && (
            <button className="button button-secondary" onClick={openNext}>
              Next project <ArrowUpRight size={15} />
            </button>
          )}
        </div>
      </div>
      {(demoLink || sourceLink) && (
        <div className="case-study-actions">
          {demoLink && (
            <a
              className="button button-primary"
              href={demoLink}
              target="_blank"
              rel="noreferrer"
            >
              View live demo <ArrowUpRight size={15} />
            </a>
          )}
          {sourceLink && (
            <a
              className="button button-secondary"
              href={sourceLink}
              target="_blank"
              rel="noreferrer"
            >
              View source code <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function CaseStudyChapterHeader({
  scrollRootRef,
}: {
  scrollRootRef: { current: HTMLDivElement | null };
}) {
  const reducedMotion = useReducedMotion();
  const [activeChapter, setActiveChapter] = useState("01 / Story");
  const activeIndex = caseStudyChapters.findIndex(
    (chapter) => chapter.label === activeChapter,
  );

  useEffect(() => {
    const root = scrollRootRef.current;
    if (!root) return;
    const sections = caseStudyChapters
      .map((chapter) => root.querySelector<HTMLElement>(`#${chapter.id}`))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const chapter = caseStudyChapters.find(
            (item) => item.id === visible.target.id,
          );
          if (chapter) setActiveChapter(chapter.label);
        }
      },
      { root, threshold: [0.2, 0.55], rootMargin: "-12% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [scrollRootRef]);

  return (
    <nav className="chapter-rail" aria-label="Case study chapters">
      <div className="chapter-rail-track" aria-hidden="true">
        <span
          className="chapter-rail-fill"
          style={{
            width: `${((activeIndex + 1) / caseStudyChapters.length) * 100}%`,
          }}
        />
      </div>
      <div className="chapter-tabs">
        {caseStudyChapters.map((chapter) => (
          <button
            className={activeChapter === chapter.label ? "is-active" : ""}
            key={chapter.id}
            type="button"
            onClick={() =>
              (() => {
                const root = scrollRootRef.current;
                const target = root?.querySelector<HTMLElement>(`#${chapter.id}`);
                if (!root || !target) return;
                const rootTop = root.getBoundingClientRect().top;
                const targetTop = target.getBoundingClientRect().top;
                root.scrollTo({
                  top: root.scrollTop + targetTop - rootTop,
                  behavior: reducedMotion ? "auto" : "smooth",
                });
              })()
            }
          >
            {chapter.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function MiniPlanner() {
  const furniture = [
    { name: "Bed", price: 22000 },
    { name: "Wardrobe", price: 16000 },
    { name: "Shelf", price: 9000 },
    { name: "Center Table", price: 8000 },
  ];
  const [selected, setSelected] = useState<string[]>([]);
  const budget = 50000;
  const total = furniture
    .filter((item) => selected.includes(item.name))
    .reduce((sum, item) => sum + item.price, 0);
  const overBudget = total > budget;

  return (
    <div className="mini-planner">
      <div className="mini-planner-heading">
        <div>
          <span className="mono">TRY IT / SAMPLE DATA</span>
          <p>Try it: this is the cost panel from the real app.</p>
        </div>
        <span className="mono">Budget ₱{budget.toLocaleString()}</span>
      </div>
      <div className="planner-chips">
        {furniture.map((item) => {
          const isSelected = selected.includes(item.name);
          return (
            <button
              type="button"
              className={isSelected ? "is-selected" : ""}
              aria-pressed={isSelected}
              key={item.name}
              onClick={() =>
                setSelected((current) =>
                  isSelected
                    ? current.filter((name) => name !== item.name)
                    : [...current, item.name],
                )
              }
            >
              {item.name}
              <span className="mono">₱{item.price.toLocaleString()}</span>
            </button>
          );
        })}
      </div>
      <motion.div
        className={`planner-total ${overBudget ? "is-over" : ""}`}
        key={total}
        initial={{ opacity: 0.5, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        aria-live="polite"
      >
        <span>Total</span>
        <strong>₱{total.toLocaleString()}</strong>
      </motion.div>
      {overBudget && (
        <p className="planner-status">
          Over budget by ₱{(total - budget).toLocaleString()}
        </p>
      )}
    </div>
  );
}

function DecryptNote({
  items,
  reducedMotion,
}: {
  items: { label: string; value: string }[];
  reducedMotion: boolean;
}) {
  const [revealed, setRevealed] = useState(reducedMotion);
  const holdTimer = useRef<number | null>(null);
  const reveal = () => setRevealed(true);
  const startHold = () => {
    if (reducedMotion) return;
    holdTimer.current = window.setTimeout(reveal, 1000);
  };
  const endHold = () => {
    if (holdTimer.current !== null) window.clearTimeout(holdTimer.current);
  };

  useEffect(() => {
    if (reducedMotion) setRevealed(true);
    return () => endHold();
  }, [reducedMotion]);

  return (
    <div className={`decrypt-note ${revealed ? "is-revealed" : ""}`}>
      <div className="decrypt-heading">
        <span className="mono">HOLD TO REVEAL</span>
        {!revealed && (
          <button
            type="button"
            className="button button-secondary"
            onPointerDown={startHold}
            onPointerUp={endHold}
            onPointerLeave={endHold}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                reveal();
              }
            }}
          >
            Hold to reveal
          </button>
        )}
      </div>
      <dl className="security-list">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="mono">{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function CaseStudySection({
  label,
  children,
  className = "",
  id,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`case-study-section ${className}`}>
      <p className="mono case-study-label">{label}</p>
      <div className="case-study-section-content">{children}</div>
    </section>
  );
}

function CaseStudyMedia({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch((error: unknown) => {
      console.warn("Case study video could not play.", error);
    });

    return () => {
      video.pause();
      video.currentTime = 0;
    };
  }, [project.video]);

  if (!project.video) {
    return (
      <img
        src={project.image}
        alt={`${project.title} interface`}
        width="1313"
        height="875"
        draggable={false}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={project.video}
      poster={project.image}
      width="1313"
      height="875"
      draggable={false}
      autoPlay
      muted
      loop
      playsInline
      controls
    />
  );
}

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [niche, setNiche] = useState<Niche>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const openProject = (event: Event) => {
      const project = (event as CustomEvent<Project>).detail;
      if (project) setSelectedProject(project);
    };
    window.addEventListener("open-project", openProject);
    return () => window.removeEventListener("open-project", openProject);
  }, []);
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };
    addEventListener("keydown", shortcut);
    return () => removeEventListener("keydown", shortcut);
  }, []);
  const filteredProjects = niche === "security" ? [] : portfolio.projects;
  const selectedProjectIndex = selectedProject
    ? filteredProjects.findIndex((project) => project.title === selectedProject.title)
    : -1;
  const nextProject =
    selectedProjectIndex >= 0
      ? filteredProjects[selectedProjectIndex + 1] ?? null
      : null;
  const closeCaseStudy = useCallback(() => {
    setSelectedProject(null);
  }, []);
  const openNextProject = useCallback(() => {
    if (nextProject) setSelectedProject(nextProject);
  }, [nextProject]);
  const submit = async (data: FormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    window.location.href = `mailto:${portfolio.email}?subject=Portfolio inquiry from ${encodeURIComponent(data.name)}&body=${encodeURIComponent(`${data.message}\n\nReply to: ${data.email}`)}`;
    setSent(true);
    toast.success("Your email client is opening.");
    reset();
  };
  return (
    <div className="app-shell">
      <BlueprintBackground />
      <CommandPalette open={paletteOpen} close={() => setPaletteOpen(false)} />
      <Header openPalette={() => setPaletteOpen(true)} />
      <main id="top">
        <Hero />
        <Section id="work">
          <div className="container-shell">
            <SectionHeading
              index="01 / Selected work"
              title="Proof of practice, clearly framed."
            >
              A small body of work across web development and security learning.
              Outcome claims stay conservative until they are documented.
            </SectionHeading>
            <NicheToggle value={niche} onChange={setNiche} />
            <div className="work-list">
              {filteredProjects.length ? (
                filteredProjects.map((project, index) => (
                  <motion.button
                    type="button"
                    onMouseDown={(event) => {
                      if (event.button === 0) event.preventDefault();
                    }}
                    onClick={() => setSelectedProject(project)}
                    className={`work-card ${index === 0 ? "spotlight-card" : ""}`}
                    key={project.title}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <ProjectThumbnail project={project} />
                    <div className="work-body">
                      <div className="work-meta mono">
                        <span>{project.year}</span>
                        <span>{project.role}</span>
                      </div>
                      <h3>{project.title}</h3>
                      <p className="work-outcome">
                        <strong>Result</strong> {project.outcome}
                      </p>
                      <p className="work-description">{project.description}</p>
                      <div className="tag-row">
                        {project.tags.map((tag) => (
                          <span
                            className="tag mono"
                            key={tag}
                            title={`Stack: ${tag}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="case-link mono">
                        Open case study <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </motion.button>
                ))
              ) : (
                <div className="empty-work">
                  <LockClosedIcon className="animated-icon" />
                  <strong>
                    Security work is documented in experience and competition
                    proof.
                  </strong>
                  {/* <p className="mono">
                    TODO / Add a public cybersecurity case study when disclosure
                    permits.
                  </p> */}
                </div>
              )}
            </div>
            <p className="mono result-count">
              {filteredProjects.length} projects shown | Plenty to add more
            </p>
            {/* <p className="mono todo-note">
              TODO / Add verified metrics, scope, and live links as they become
              available.
            </p> */}
          </div>
        </Section>
        <Section id="expertise" surface="solid">
          <div className="container-shell">
            <SectionHeading
              index="02 / Stack"
              title="Tools I build, secure, and ship with."
            >
              A practical toolkit across interfaces, data, delivery, creative
              work, and AI-assisted workflows.
            </SectionHeading>
            <div className="expertise-grid">
              {portfolio.services.map((service, index) => {
                const Icon =
                  index === 0
                    ? CodeIcon
                    : index === 1
                      ? LockClosedIcon
                      : LightningBoltIcon;
                return (
                  <article className="expertise-item" key={service.title}>
                    <span className="mono service-index">0{index + 1}</span>
                    <Icon className="expertise-icon animated-icon" />
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </article>
                );
              })}
            </div>
            <StackWall />
          </div>
        </Section>
        <Section id="about">
          <div className="container-shell about-grid">
            <div className="about-image">
              <AboutPortrait
                src={portfolio.aboutPhoto}
                focal={portfolio.aboutPortrait.focal}
                focalMobile={portfolio.aboutPortrait.focalMobile}
              />
            </div>
            <div>
              <SectionHeading
                index="03 / About"
                title="Curious, practical, and always learning."
              >
                <AboutBio bio={portfolio.bio} />
              </SectionHeading>
              <div className="about-facts">
                <div>
                  <span className="mono">Based in</span>
                  <strong>{portfolio.location}</strong>
                </div>
                <div>
                  <span className="mono">Focus</span>
                  <strong>Web, software, cybersecurity</strong>
                </div>
                <div>
                  <span className="mono">Education</span>
                  <strong>Bachelor of Science in Information Technology</strong>
                </div>
                <div>
                  <span className="mono">Availability</span>
                  <strong>Open to freelance/On-Site work</strong>
                </div>
              </div>
              <div className="currently">
                <p className="mono eyebrow">Currently</p>
                <ul>
                  <li>
                    <span aria-hidden="true" /> Open to IT, Admin, and Web
                    Development opportunities
                  </li>
                  <li>
                    <span aria-hidden="true" /> Building web applications and
                    portfolio projects
                  </li>
                  <li>
                    <span aria-hidden="true" /> Applying practical skills in
                    frontend and backend development
                  </li>
                  <li>
                    <span aria-hidden="true" /> Exploring modern UI design and
                    interactive web experiences
                  </li>
                </ul>
              </div>
              <a
                className="about-contact-link focus-ring mono"
                href="#contact"
                onClick={(event) => navigateToSection(event, "#contact")}
              >
                Get in touch <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </Section>
        <Section className="proof-section" surface="solid">
          <ExperienceSection />
        </Section>
        <Section id="contact" className="contact-section">
          <div className="container-shell contact-grid">
            <div>
              <p className="mono eyebrow">&gt; contact</p>
              <h2>Let’s make something clear and useful.</h2>
              <p className="section-lede">
                Tell me what you are trying to build, improve, or understand.
                I’ll reply with the next sensible step.
              </p>
              <div className="contact-links">
                <a href={`mailto:${portfolio.email}`}>
                  <Mail size={17} />
                  {portfolio.email}
                </a>
                <a
                  href={portfolio.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={17} /> GitHub
                </a>
                <a
                  href={portfolio.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={17} /> LinkedIn
                </a>
              </div>
              <a
                className="download-link"
                href={portfolio.cv}
                download="Kevin_Dionaldo_CV.pdf"
              >
                <Download size={15} /> Download CV
              </a>
            </div>
            <div className="contact-card">
              <form onSubmit={handleSubmit(submit)} noValidate>
                <div className="form-field-grid">
                  <label>
                    Name
                    <input
                      {...register("name", {
                        required: "Please enter your name.",
                      })}
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                  </label>
                  <label>
                    Email
                    <input
                      type="email"
                      {...register("email", {
                        required: "Please enter your email.",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Use a valid email address.",
                        },
                      })}
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                  </label>
                </div>
                <label>
                  Message
                  <textarea
                    {...register("message", {
                      required: "Please add a short message.",
                    })}
                    placeholder="What would you like to work on?"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <span>{errors.message.message}</span>}
                </label>
                <button
                  className="button button-primary form-submit"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Preparing email…"
                  ) : sent ? (
                    "Email ready"
                  ) : (
                    <>
                      Send message <ArrowRightIcon className="animated-icon" />
                    </>
                  )}
                </button>
                <p className="form-note">
                  This form opens your email client. No message is stored on
                  this site.
                </p>
              </form>
            </div>
          </div>
        </Section>
      </main>
      <footer className="site-footer">
        <div className="container-shell footer-inner">
          <div>
            <span>
              © {new Date().getFullYear()} {portfolio.name}
            </span>
          </div>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
      <CaseDialog
        project={selectedProject}
        close={closeCaseStudy}
        nextProject={nextProject}
        openNext={openNextProject}
      />
      <Toaster richColors />
    </div>
  );
}
