import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Command,
  Download,
  ExternalLink,
  Mail,
  Moon,
  Sun,
  Terminal,
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
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { portfolio } from "@/data/portfolio";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useTheme } from "@/hooks/useTheme";
import "@/styles/globals.css";

type FormValues = { name: string; email: string; message: string };
type Niche = "all" | "development" | "security";
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
    <section className="hero" ref={ref}>
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
      <div className="hero-grid" aria-hidden="true" />
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
}: {
  project: (typeof portfolio.projects)[number] | null;
  close: () => void;
}) {
  if (!project) return null;
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={close}>
      <motion.div
        className="case-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="dialog-close focus-ring"
          onClick={close}
          aria-label="Close case study"
        >
          <X size={18} />
        </button>
        <img src={project.image} alt="" width="1313" height="875" />
        <p className="mono eyebrow">{project.year} / Engagement report</p>
        <h2>{project.title}</h2>
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
        {/* <p className="mono todo-note">
          TODO / Add verified metrics and live links.
        </p> */}
      </motion.div>
    </div>
  );
}

function SkillsOverview() {
  return (
    <div className="skills-overview">
      <div>
        <p className="mono">DEVELOPMENT</p>
        <strong>React · JavaScript · HTML/CSS · Bootstrap</strong>
        <span>
          Responsive interfaces, front-end systems, and full-stack delivery.
        </span>
      </div>
      <div>
        <p className="mono">SYSTEMS & DATA</p>
        <strong>Laravel · PostgreSQL · Supabase · SQL · Git</strong>
        <span>
          Backends, data workflows, authentication, and maintainable project
          structure.
        </span>
      </div>
      <div>
        <p className="mono">SECURITY PRACTICE</p>
        <strong>Linux · Kali Linux · CTF training · Secure coding</strong>
        <span>
          Security fundamentals informed by hands-on learning and competition
          experience.
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [niche, setNiche] = useState<Niche>("all");
  const [selectedProject, setSelectedProject] = useState<
    (typeof portfolio.projects)[number] | null
  >(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();
  const [sent, setSent] = useState(false);
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
  const submit = async (data: FormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    window.location.href = `mailto:${portfolio.email}?subject=Portfolio inquiry from ${encodeURIComponent(data.name)}&body=${encodeURIComponent(`${data.message}\n\nReply to: ${data.email}`)}`;
    setSent(true);
    toast.success("Your email client is opening.");
    reset();
  };
  return (
    <>
      <CommandPalette open={paletteOpen} close={() => setPaletteOpen(false)} />
      <Header openPalette={() => setPaletteOpen(true)} />
      <main id="top">
        <Hero />
        <section id="work" className="section">
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
                    onClick={() => setSelectedProject(project)}
                    className={`work-card ${index === 0 ? "spotlight-card" : ""}`}
                    key={project.title}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <div className="work-image">
                      <img
                        src={project.image}
                        alt={`${project.title} interface`}
                        width="1313"
                        height="875"
                        loading="lazy"
                      />
                      <span className="work-arrow">
                        <ArrowUpRight size={19} />
                      </span>
                    </div>
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
        </section>
        <section id="expertise" className="section section-tinted">
          <div className="container-shell">
            <SectionHeading
              index="02 / Expertise"
              title="Useful capability, without the jargon."
            >
              The right level of engineering for a product that needs to ship,
              stay understandable, and hold up under scrutiny.
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
            <SkillsOverview />
          </div>
        </section>
        <section id="about" className="section">
          <div className="container-shell about-grid">
            <div className="about-image">
              <img
                src={portfolio.aboutPhoto}
                alt="Portrait of Jan Kevin Dionaldo"
                width="1313"
                height="875"
                loading="lazy"
              />
            </div>
            <div>
              <SectionHeading
                index="03 / About"
                title="Curious, practical, and Always learning."
              >
                {portfolio.bio}
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
                    <Check size={15} /> Open to IT, Admin, and Web Development
                    opportunities
                  </li>
                  <li>
                    <Check size={15} /> Building web applications and portfolio
                    projects
                  </li>
                  <li>
                    <Check size={15} /> Applying practical skills in frontend
                    and backend development
                  </li>
                  <li>
                    <Check size={15} /> Exploring modern UI design and
                    interactive web experiences
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="section proof-section">
          <div className="container-shell proof-grid">
            <div>
              <p className="mono eyebrow">04 / Proof & experience</p>
              <h2>Earned through practice.</h2>
            </div>
            <div className="proof-items">
              <div className="timeline-line" />
              {portfolio.experience.map((item) => (
                <article className="proof-item" key={item.title}>
                  <span className="mono">{item.date}</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
              <div className="proof-item">
                <span className="mono">2023 — 2024</span>
                <h3>Cybersecurity competitions</h3>
                <p>
                  1st and 3rd placer in a DICT hackathon event (2023); Team
                  CarSU Cyber Ninja champion and Team CarSU CyberKnights 8th
                  placer (2024).
                </p>
              </div>
              {/* <p className="mono todo-note">
                TODO / Add verified links for certificates, write-ups, and
                open-source contributions.
              </p> */}
            </div>
          </div>
        </section>
        <section id="contact" className="section contact-section">
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
        </section>
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
        close={() => setSelectedProject(null)}
      />
      <Toaster richColors />
    </>
  );
}
