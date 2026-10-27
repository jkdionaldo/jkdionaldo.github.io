export type Skill = { name: string; level: number };
export type CaseStudy = {
  story: string;
  problem: {
    context: string;
    before: string;
    after: string;
  };
  challenges: {
    title: string;
    decision: string;
    tradeoff: string;
    tag?: string;
  }[];
  architecture: {
    nodes: { id: string; label: string; caption: string }[];
    links: [string, string][];
    summary: string;
  };
  security?: { items: { label: string; value: string }[] };
  next?: string;
  links?: { demo?: string; source?: string };
  interactive?: "planner";
  confirmed: {
    story: boolean;
    problem: boolean;
    challenges: boolean;
    architecture: boolean;
    security: boolean;
  };
};
export type Project = {
  title: string;
  year: string;
  image: string;
  focus?: string;
  video?: string;
  description: string;
  role: string;
  outcome: string;
  tags: string[];
  link?: string;
  caseStudy?: CaseStudy;
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
  cv: "/cv/ATS_CV.pdf",
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
      focus: "50% 18%",
      video: "/videos/projects/OcidWeb.mp4",
      description:
        "A full-stack system for the Office of Curriculum and Instructional Design at Caraga State University to organize courses, departments, and administrative access.",
      role: "Full-stack developer · OCID internship",
      outcome:
        "Created a single system for course encoding, department mapping, and staff administration.",
      tags: ["React", "Tailwind CSS", "Laravel", "PostgreSQL"],
      caseStudy: {
        story:
          "I built a course management system for the Office of Curriculum and Instructional Design at Caraga State University. I set out to bring course encoding, department mapping, and staff administration into one place that could serve both public program pages and protected administrative work.",
        problem: {
          context:
            "The system brings academic programs, curriculum information, institutional files, and administrative workflows into one React application for CSU Main and CSU Cabadbaran Campus.",
          before:
            "Program information and institutional files were handled across separate pages and administrative workflows.",
          after:
            "Public program details and protected management tools share one organized application.",
        },
        challenges: [
          {
            title: "Support public and administrative experiences",
            decision:
              "I separated public program pages from dashboard modules while keeping them inside the same routed SPA.",
            tradeoff:
              "The shared application keeps navigation consistent, but public and protected flows need different route and access rules.",
            tag: "Information architecture",
          },
          {
            title: "Keep academic data manageable",
            decision:
              "I organized management work into focused modules for colleges, programs, forms, and files.",
            tradeoff:
              "Focused modules make tasks easier to locate, while the dashboard needs shared data and action state across tabs.",
            tag: "Dashboard state",
          },
          {
            title: "Validate and protect administrative actions",
            decision:
              "I used protected routes, Google OAuth, JWT session handling, and React Hook Form with Zod validation.",
            tradeoff:
              "More checks make the administrative flow safer to operate, but authentication and validation state must be handled consistently.",
            tag: "Access control",
          },
        ],
        architecture: {
          nodes: [
            {
              id: "routes",
              label: "React Router",
              caption:
                "Routes public program pages and protected dashboard views.",
            },
            {
              id: "components",
              label: "React UI",
              caption:
                "Program details, dashboard tabs, forms, and file workflows.",
            },
            {
              id: "hooks",
              label: "Custom hooks",
              caption: "Coordinates dashboard data, filters, and operations.",
            },
            {
              id: "services",
              label: "Axios services",
              caption:
                "Connects the interface to dashboard, college, form, and file APIs.",
            },
          ],
          links: [
            ["routes", "components"],
            ["components", "hooks"],
            ["hooks", "services"],
          ],
          summary:
            "In plain terms, routes decide which experience to show, React components present the work, custom hooks coordinate state, and service modules handle the API requests behind the interface.",
        },
        security: {
          items: [
            {
              label: "Auth",
              value:
                "Google OAuth integration with JWT token management and automatic refresh.",
            },
            {
              label: "Access",
              value:
                "Protected routes and admin controls restrict dashboard workflows.",
            },
            {
              label: "Validation",
              value:
                "React Hook Form and Zod are used for interactive form validation.",
            },
            {
              label: "Storage",
              value:
                "The repository documents encrypted client-side storage for session-related data.",
            },
          ],
        },
        next: "A next pass would make the most-used administrative workflows even faster to scan and operate across desktop and mobile layouts.",
        confirmed: {
          story: true,
          problem: true,
          challenges: true,
          architecture: true,
          security: true,
        },
      },
    },
    {
      title: "3D House Planning Builder",
      year: "2025 — 2026",
      image: "/images/3droom.png",
      focus: "50% 50%",
      video: "/videos/projects/3dweb.mp4",
      description:
        "A browser-based planning tool for floor layouts, furniture placement, real-time cost calculations, and immersive 3D visualization.",
      role: "Full-stack developer · client project",
      outcome:
        "Enabled users to explore house layouts and costs directly in the browser.",
      tags: ["A-Frame", "Three.js", "Supabase", "Real-time data"],
      caseStudy: {
        story:
          "I built a browser-based planning tool that brings floor layouts, furniture placement, cost calculations, and 3D visualization into one place. I set out to make the planning process explorable in the browser instead of limiting it to a static plan.",
        problem: {
          context:
            "The project is a browser-based tool for exploring house layouts, placing furniture, and checking costs alongside an immersive 3D view.",
          before:
            "Planning a room meant switching between a layout, a furniture list, and a separate cost estimate.",
          after:
            "Users can explore layouts, place furniture, and review costs in one browser experience.",
        },
        challenges: [
          {
            title: "Make spatial planning feel direct",
            decision:
              "I used an interactive 3D scene so users could inspect the room while arranging its contents.",
            tradeoff:
              "A richer visual experience requires more careful sizing and performance decisions than a flat form.",
            tag: "3D interaction",
          },
          {
            title: "Keep planning details connected",
            decision:
              "I treated layout choices, furniture placement, and cost information as parts of the same planning flow.",
            tradeoff:
              "Connected updates make the experience clearer, but each change needs to stay consistent across the interface.",
            tag: "State sync",
          },
          {
            title: "Make the result understandable in the browser",
            decision:
              "I combined a visual room view with supporting planning information instead of relying on the scene alone.",
            tradeoff:
              "The interface has to balance an immersive view with controls and information that remain easy to scan.",
            tag: "UX",
          },
        ],
        architecture: {
          nodes: [
            {
              id: "browser",
              label: "Browser UI",
              caption: "Users choose and review planning information.",
            },
            {
              id: "scene",
              label: "3D scene",
              caption: "A-Frame and Three.js present the room visually.",
            },
            {
              id: "planning",
              label: "Planning state",
              caption: "Layout, furniture, and cost choices stay connected.",
            },
            {
              id: "supabase",
              label: "Supabase",
              caption: "The project includes a data layer for the application.",
            },
          ],
          links: [
            ["browser", "scene"],
            ["scene", "planning"],
            ["planning", "supabase"],
          ],
          summary:
            "In plain terms, the interface gives users a visual room to work with, while the planning state connects what they see with the information behind it.",
        },
        interactive: "planner",
        security: {
          items: [
            {
              label: "Data",
              value:
                "Draft: replace this line with the exact data stored by the project.",
            },
            {
              label: "Access",
              value:
                "Draft: replace this line with the verified access and authentication behavior.",
            },
            {
              label: "Validation",
              value:
                "Draft: replace this line with the validation rules implemented in the project.",
            },
          ],
        },
        next: "Draft: document the next improvement you would make after reviewing the project with fresh eyes.",
        confirmed: {
          story: true,
          problem: true,
          challenges: true,
          architecture: true,
          security: true,
        },
      },
    },
    {
      title: "E-commerce Website",
      year: "2024 — 2025",
      image: "/images/Ecommerce.png",
      focus: "50% 50%",
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
      focus: "50% 50%",
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
