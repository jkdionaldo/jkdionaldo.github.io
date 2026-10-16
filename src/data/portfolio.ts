export type Skill = { name: string; level: number };
export type Project = {
  title: string;
  year: string;
  image: string;
  description: string;
  role: string;
  outcome: string;
  tags: string[];
  link?: string;
};

export const portfolio = {
  name: "Jan Kevin B. Dionaldo",
  shortName: "Kevin",
  role: "Developer and security-minded builder",
  intro:
    "I build practical digital experiences with a foundation in software development, secure coding, and data analysis.",
  bio: "I focus on web and software development, with a growing practice in cybersecurity. I keep learning through hands-on work and competitions with the CarSU CyberNinja community.",
  email: "jankevin.dionaldo64@gmail.com",
  phone: "+971 55 113 7077",
  location: "Jumeirah Lake Towers, Al Thanyah 5, Dubai, United Arab Emirates",
  photo: "/images/main_picture/kevin.JPG",
  aboutPhoto: "/images/main_picture/me.jpg",
  cv: "/cv/CV.pdf",
  nav: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Journey", href: "#journey" },
    { label: "Contact", href: "#contact" },
  ],
  links: {
    github: "https://github.com/jkdionaldo",
    linkedin: "https://www.linkedin.com/in/jan-kevin-dionaldo-606663301/",
  },
  services: [
    {
      title: "Develop",
      text: "Clean, structured code for responsive applications, optimized for performance and cross-platform compatibility.",
    },
    {
      title: "Cybersecurity",
      text: "Secure coding, ethical hacking, and hands-on CTF experience with a focus on resilient systems.",
    },
    {
      title: "Data analysis",
      text: "Turning complex datasets into actionable insights through thoughtful data management and visualization.",
    },
  ],
  skills: [
    { name: "Web development", level: 90 },
    { name: "Software development", level: 85 },
    { name: "Cybersecurity", level: 95 },
    { name: "Database", level: 80 },
  ] satisfies Skill[],
  projects: [
    {
      title: "Course Management System",
      year: "2025",
      image: "/images/Ocid.png",
      description:
        "A full-stack system for the Office of Curriculum and Instructional Design at Caraga State University to organize courses, departments, and administrative access.",
      role: "Full-stack developer · OCID internship",
      outcome:
        "Created a single system for course encoding, department mapping, and staff administration.",
      tags: ["React", "Tailwind CSS", "Laravel", "PostgreSQL"],
    },
    {
      title: "3D House Planning Builder",
      year: "2025 — 2026",
      image: "/images/3droom.png",
      description:
        "A browser-based planning tool for floor layouts, furniture placement, real-time cost calculations, and immersive 3D visualization.",
      role: "Full-stack developer · client project",
      outcome:
        "Enabled users to explore house layouts and costs directly in the browser.",
      tags: ["A-Frame", "Three.js", "Supabase", "Real-time data"],
    },
    {
      title: "E-commerce Website",
      year: "2024 — 2025",
      image: "/images/Ecommerce.png",
      description:
        "A responsive CheckoutChamp storefront with customized product pages, landing sections, and checkout flow.",
      role: "Front-end developer · freelance",
      outcome:
        "Delivered a mobile-optimized storefront with conversion-focused UI and platform payment tools.",
      tags: ["Bootstrap", "CheckoutChamp", "Responsive UI"],
    },
    {
      title: "Camera Rental Website",
      year: "2023 — 2024",
      image: "/images/Camera.png",
      description:
        "A camera rental platform for students and creatives to capture moments without the high cost of owning a camera.",
      role: "Full Stack Developer · freelance",
      outcome:
        "Delivered and deployed a responsive camera rental platform with camera browsing, rental booking, and equipment availability features.",
      tags: ["Bootstrap", "Responsive UI", "Camera"],
    },
  ] satisfies Project[],
  education: [
    {
      title: "Caraga State University",
      date: "2022 — 2026",
      detail:
        "Bachelor of Science in Information Technology · Brgy. Ampayon, Butuan City",
      points: [
        "Academic Scholar (2021 — 2022)",
        "Cybersecurity organization: CarSU Cyber Ninja & CarSU CyberKnights",
        "1st and 3rd placer in DICT hackathon event (2023)",
        "Team CarSU Cyber Ninja champion and Team CarSU CyberKnights 8th placer (2024)",
      ],
    },
    {
      title: "ACLC College Of Butuan City",
      date: "2018 — 2019",
      detail: "J.C. Aquino Ave. Butuan City, Philippines",
      points: ["NCII Passer", "Python training accomplisher (2018–2019)"],
    },
  ],
  experience: [
    {
      title: "Accounting Clerk",
      date: "Feb 2026 — Oct 2026",
      detail:
        "Financial Management Services · Caraga State University Main Campus",
      points: [
        "Manage incoming and outgoing office documents, purchase orders, disbursement vouchers, payroll documents, and financial certifications.",
        "Verify financial records, GSIS remittances, and mandatory service remittances for completeness and compliance.",
        "Prepare and issue Certificates of Availability of Funds subject to budgeting, accounting, and auditing rules.",
      ],
    },
    {
      title: "Video Editor",
      date: "Feb 2026 — Aug 2026",
      points: [
        "Create short-form and UGC/montage content for Instagram Reels, TikTok, and YouTube Shorts.",
        "Manage content for RK Trends and Spice Grill, adapting visuals and messaging to each audience.",
        "Use CapCut, Adobe Premiere Pro, and analytics feedback to improve hooks, pacing, captions, and publishing strategy.",
      ],
    },
    {
      title: "Social Media Manager",
      date: "Feb 2026 — Aug 2026",
      detail: "Scale on Socials",
      points: [
        "Organize digital assets using a consistent playbook and collaborate on content ideas.",
        "Support weekly content calendars, campaign themes, and visual concepts.",
        "Maintain file structure and version control so the content team can work efficiently.",
      ],
    },
    {
      title: "Full-stack Developer",
      date: "April 2025 — Sept 2025",
      detail: "OCID Internship · Caraga State University Library",
      points: [
        "Developed a Course Management System for the Office of Curriculum and Instructional Design.",
        "Built the React/Tailwind frontend and Laravel/PostgreSQL backend for course encoding, department mapping, and administrative access.",
      ],
    },
    {
      title: "Front-end Developer",
      date: "Dec 2024 — Jan 2025",
      detail: "Freelance (Direct Client)",
      points: [
        "Built and designed a responsive CheckoutChamp e-commerce website.",
        "Customized product pages, landing sections, checkout flow, and mobile experience using Bootstrap and platform tools.",
      ],
    },
    {
      title: "Portfolio Front-end Developer",
      date: "Dec 2023 — Feb 2024",
      detail: "Freelance (Direct Client)",
      points: [
        "Built and deployed a responsive portfolio website on the client's paid domain.",
        "Integrated About, Projects, Resume, and Contact sections with working email functionality.",
      ],
    },
    {
      title: "Software Contractor",
      date: "Aug 2021 — Sept 2022",
      detail: "Freelance (Direct Client)",
      points: [
        "Delivered custom software solutions on a contractual basis.",
        "Owned project planning, coding, testing, project management, and software maintenance.",
      ],
    },
    {
      title: "Repair Technician / Sales Associate",
      date: "Feb 2019 — May 2019",
      detail: "PCCD · Butuan City",
      points: [
        "Provided technical explanations and specifications for computer hardware and software.",
        "Diagnosed, repaired, upgraded, and maintained laptops and desktops.",
      ],
    },
  ],
  certifications: [
    ["Hack for Gov 3", "2024", "/images/certificates/hack_certificate1.jpg"],
    ["Hack for Gov 2", "2023", "/images/certificates/hack_certificate2.jpg"],
    [
      "Introduction To Cyber-Security",
      "2024",
      "/images/certificates/cisco.PNG",
    ],
    ["Introduction to HTML", "2024", "/images/certificates/html.png"],
    ["Introduction to CSS", "2024", "/images/certificates/css.png"],
    [
      "Introduction to JavaScript",
      "2024",
      "/images/certificates/javascript.jpg",
    ],
  ],
};
