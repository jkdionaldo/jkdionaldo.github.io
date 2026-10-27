export type ExperienceNiche =
  | "development"
  | "cybersecurity"
  | "admin"
  | "creative";

export type ExperienceRole = {
  id: string;
  title: string;
  org?: string;
  place?: string;
  start: string;
  end: string;
  current?: boolean;
  niche: ExperienceNiche;
  details?: string[];
  project?: string;
};

export type Proof = {
  id: string;
  result: string;
  event: string;
  year: number;
  team?: string;
  niche: "cybersecurity";
  note?: string;
};

export const experienceRoles: ExperienceRole[] = [
  {
    id: "accounting-clerk",
    title: "Accounting Clerk",
    org: "Financial Management Services · Caraga State University Main Campus",
    start: "2026-02",
    end: "2026-10",
    niche: "admin",
    details: [
      "Manage incoming and outgoing office documents, purchase orders, disbursement vouchers, payroll documents, and financial certifications.",
      "Verify financial records, GSIS remittances, and mandatory service remittances for completeness and compliance.",
      "Prepare and issue Certificates of Availability of Funds subject to budgeting, accounting, and auditing rules.",
    ],
  },
  {
    id: "video-editor",
    title: "Video Editor",
    start: "2026-02",
    end: "2026-08",
    niche: "creative",
    details: [
      "Create short-form and UGC/montage content for Instagram Reels, TikTok, and YouTube Shorts.",
      "Manage content for RK Trends and Spice Grill, adapting visuals and messaging to each audience.",
      "Use CapCut, Adobe Premiere Pro, and analytics feedback to improve hooks, pacing, captions, and publishing strategy.",
    ],
  },
  {
    id: "social-media-manager",
    title: "Social Media Manager",
    org: "Scale on Socials",
    start: "2026-02",
    end: "2026-08",
    niche: "creative",
    details: [
      "Organize digital assets using a consistent playbook and collaborate on content ideas.",
      "Support weekly content calendars, campaign themes, and visual concepts.",
      "Maintain file structure and version control so the content team can work efficiently.",
    ],
  },
  {
    id: "full-stack-developer",
    title: "Full-stack Developer",
    org: "OCID Internship · Caraga State University Library",
    start: "2025-04",
    end: "2025-09",
    niche: "development",
    project: "Course Management System",
    details: [
      "Developed a Course Management System for the Office of Curriculum and Instructional Design.",
      "Built the React/Tailwind frontend and Laravel/PostgreSQL backend for course encoding, department mapping, and administrative access.",
    ],
  },
  {
    id: "front-end-developer",
    title: "Front-end Developer",
    org: "Freelance (Direct Client)",
    start: "2024-12",
    end: "2025-01",
    niche: "development",
    details: [
      "Built and designed a responsive CheckoutChamp e-commerce website.",
      "Customized product pages, landing sections, checkout flow, and mobile experience using Bootstrap and platform tools.",
    ],
  },
  {
    id: "portfolio-front-end-developer",
    title: "Portfolio Front-end Developer",
    org: "Freelance (Direct Client)",
    start: "2023-12",
    end: "2024-02",
    niche: "development",
    details: [
      "Built and deployed a responsive portfolio website on the client's paid domain.",
      "Integrated About, Projects, Resume, and Contact sections with working email functionality.",
    ],
  },
  {
    id: "software-contractor",
    title: "Software Contractor",
    org: "Freelance (Direct Client)",
    start: "2021-08",
    end: "2022-09",
    niche: "development",
    details: [
      "Delivered custom software solutions on a contractual basis.",
      "Owned project planning, coding, testing, project management, and software maintenance.",
    ],
  },
  {
    id: "repair-technician-sales-associate",
    title: "Repair Technician / Sales Associate",
    org: "PCCD",
    place: "Butuan City",
    start: "2019-02",
    end: "2019-05",
    niche: "admin",
    details: [
      "Provided technical explanations and specifications for computer hardware and software.",
      "Diagnosed, repaired, upgraded, and maintained laptops and desktops.",
    ],
  },
];

export const proofEntries: Proof[] = [
  {
    id: "dict-hackathon",
    result: "1st and 3rd place",
    event: "DICT hackathon event",
    year: 2023,
    niche: "cybersecurity",
    note: "Original portfolio copy groups this result with the 2023 competition entry.",
  },
  {
    id: "cyber-ninja",
    result: "Champion",
    event: "Team CarSU Cyber Ninja",
    year: 2024,
    niche: "cybersecurity",
  },
  {
    id: "cyber-knights",
    result: "8th place",
    event: "Team CarSU CyberKnights",
    year: 2024,
    niche: "cybersecurity",
  },
];
