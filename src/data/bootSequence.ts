import { portfolio } from "@/data/portfolio";
import { proofEntries } from "@/data/experience";
import { stack } from "@/data/stack";

export type BootTag =
  | "boot"
  | "identity"
  | "focus"
  | "edu"
  | "mount"
  | "load"
  | "record"
  | "status"
  | "ready"
  | "prompt";

export type BootLine = {
  delay: number;
  timestamp: string;
  tag: BootTag;
  message: string;
  typed?: boolean;
  wait?: boolean;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const timestamp = (seconds: number) => `t+${seconds.toFixed(3).padStart(6, "0")}s`;

const line = (
  seconds: number,
  delay: number,
  tag: BootTag,
  message: string,
  options: Pick<BootLine, "typed" | "wait"> = {},
): BootLine => ({
  delay,
  timestamp: timestamp(seconds),
  tag,
  message,
  ...options,
});

const preferredTools = stack.filter((item) => item.preferred).map((item) => item.name);
const firstEducation = portfolio.education[0];
const educationDetail = firstEducation?.detail?.replace(
  "Bachelor of Science in Information Technology",
  "BS Information Technology",
);
const firstTwoProjects = portfolio.projects.slice(0, 2);

const generatedLines: Array<BootLine | null> = [
  line(0.042, 60, "boot", "portfolio runtime starting"),
  line(0.118, 55, "identity", `${portfolio.name}, ${portfolio.role}`),
  portfolio.bio.includes("web and software development")
    ? line(0.174, 45, "focus", "web and software development")
    : null,
  portfolio.bio.includes("growing practice in cybersecurity")
    ? line(0.229, 55, "focus", "cybersecurity, growing practice")
    : null,
  firstEducation && educationDetail
    ? line(0.301, 80, "edu", `${educationDetail}, ${firstEducation.title}`)
    : null,
  ...firstTwoProjects.map((project, index) =>
    line(
      0.38 + index * 0.07,
      index === 0 ? 70 : 65,
      "mount",
      `/projects/${slugify(project.title)}`,
    ),
  ),
  preferredTools.length
    ? line(0.535, 75, "load", `stack: ${preferredTools.slice(0, 6).join(", ")}`)
    : null,
  preferredTools.length > 6
    ? line(0.625, 85, "load", `stack: ${preferredTools.slice(6, 12).join(", ")}`)
    : null,
  ...proofEntries.slice(0, 3).map((proof, index) =>
    line(
      0.73 + index * 0.1,
      90 + index * 15,
      "record",
      `${proof.event}, ${proof.year}, ${proof.result.toLowerCase()}`,
    ),
  ),
  line(1.08, 105, "status", "open to freelance and on-site work"),
  line(1.205, 200, "ready", "starting interface", { wait: true }),
  line(1.31, 120, "prompt", "visitor@jk:~$ open portfolio", { typed: true }),
];

// Timestamps, tags, and the prompt are cosmetic; the messages are generated
// from portfolio data and do not claim that any system or security check ran.
export const bootSequence = generatedLines.filter(
  (bootLine): bootLine is BootLine => bootLine !== null,
);
