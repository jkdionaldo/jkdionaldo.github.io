export type StackCategory =
  | "Build"
  | "Ship and secure"
  | "Design and media"
  | "Work and AI";

export type StackItem = {
  id: string;
  name: string;
  category: StackCategory;
  preferred: boolean;
  icon?: string;
  monogram?: string;
  color: string;
};

import html from "simple-icons/icons/html5.svg?raw";
import css from "simple-icons/icons/css.svg?raw";
import javascript from "simple-icons/icons/javascript.svg?raw";
import typescript from "simple-icons/icons/typescript.svg?raw";
import php from "simple-icons/icons/php.svg?raw";
import react from "simple-icons/icons/react.svg?raw";
import laravel from "simple-icons/icons/laravel.svg?raw";
import tailwindcss from "simple-icons/icons/tailwindcss.svg?raw";
import bootstrap from "simple-icons/icons/bootstrap.svg?raw";
import framer from "simple-icons/icons/framer.svg?raw";
import three from "simple-icons/icons/threedotjs.svg?raw";
import aframe from "simple-icons/icons/aframe.svg?raw";
import postgresql from "simple-icons/icons/postgresql.svg?raw";
import supabase from "simple-icons/icons/supabase.svg?raw";
import docker from "simple-icons/icons/docker.svg?raw";
import git from "simple-icons/icons/git.svg?raw";
import github from "simple-icons/icons/github.svg?raw";
import vite from "simple-icons/icons/vite.svg?raw";
import eslint from "simple-icons/icons/eslint.svg?raw";
import vercel from "simple-icons/icons/vercel.svg?raw";
import linux from "simple-icons/icons/linux.svg?raw";
import figma from "simple-icons/icons/figma.svg?raw";
import meta from "simple-icons/icons/meta.svg?raw";
import facebook from "simple-icons/icons/facebook.svg?raw";
import instagram from "simple-icons/icons/instagram.svg?raw";
import tiktok from "simple-icons/icons/tiktok.svg?raw";
import youtube from "simple-icons/icons/youtube.svg?raw";
import kaggle from "simple-icons/icons/kaggle.svg?raw";
import anthropic from "simple-icons/icons/anthropic.svg?raw";
import copilot from "simple-icons/icons/githubcopilot.svg?raw";

export const stack: StackItem[] = [
  { id: "html", name: "HTML", category: "Build", preferred: true, icon: html, color: "#e34f26" },
  { id: "css", name: "CSS", category: "Build", preferred: true, icon: css, color: "#1572b6" },
  { id: "javascript", name: "JavaScript", category: "Build", preferred: true, icon: javascript, color: "#f7df1e" },
  { id: "typescript", name: "TypeScript", category: "Build", preferred: true, icon: typescript, color: "#3178c6" },
  { id: "php", name: "PHP", category: "Build", preferred: false, icon: php, color: "#777bb4" },
  { id: "sql", name: "SQL", category: "Build", preferred: false, monogram: "SQL", color: "#6b9ac4" },
  { id: "react", name: "React", category: "Build", preferred: true, icon: react, color: "#61dafb" },
  { id: "laravel", name: "Laravel", category: "Build", preferred: false, icon: laravel, color: "#ff2d20" },
  { id: "tailwind", name: "Tailwind CSS", category: "Build", preferred: true, icon: tailwindcss, color: "#06b6d4" },
  { id: "bootstrap", name: "Bootstrap", category: "Build", preferred: true, icon: bootstrap, color: "#7952b3" },
  { id: "motion", name: "Motion", category: "Build", preferred: false, icon: framer, color: "#0055ff" },
  { id: "three", name: "Three.js", category: "Build", preferred: false, icon: three, color: "#ffffff" },
  { id: "aframe", name: "A-Frame", category: "Build", preferred: false, icon: aframe, color: "#ef2d5e" },
  { id: "postgresql", name: "PostgreSQL", category: "Build", preferred: true, icon: postgresql, color: "#4169e1" },
  { id: "supabase", name: "Supabase", category: "Build", preferred: true, icon: supabase, color: "#3ecf8e" },
  { id: "docker", name: "Docker", category: "Ship and secure", preferred: false, icon: docker, color: "#2496ed" },
  { id: "git", name: "Git", category: "Ship and secure", preferred: false, icon: git, color: "#f05032" },
  { id: "github", name: "GitHub", category: "Ship and secure", preferred: true, icon: github, color: "#f0f6fc" },
  { id: "vite", name: "Vite", category: "Ship and secure", preferred: false, icon: vite, color: "#646cff" },
  { id: "eslint", name: "ESLint", category: "Ship and secure", preferred: false, icon: eslint, color: "#4b32c3" },
  { id: "vercel", name: "Vercel", category: "Ship and secure", preferred: false, icon: vercel, color: "#f0f6fc" },
  { id: "vscode", name: "Visual Studio Code", category: "Ship and secure", preferred: true, monogram: "VS", color: "#007acc" },
  { id: "windows", name: "Windows", category: "Ship and secure", preferred: false, monogram: "⊞", color: "#00a4ef" },
  { id: "linux", name: "Linux", category: "Ship and secure", preferred: false, icon: linux, color: "#fcc624" },
  { id: "picoctf", name: "PicoCTF", category: "Ship and secure", preferred: false, monogram: "PICO", color: "#73c7a5" },
  { id: "figma", name: "Figma", category: "Design and media", preferred: false, icon: figma, color: "#f24e1e" },
  { id: "premiere", name: "Adobe Premiere Pro", category: "Design and media", preferred: false, monogram: "Pr", color: "#9999ff" },
  { id: "photoshop", name: "Adobe Photoshop", category: "Design and media", preferred: false, monogram: "Ps", color: "#31a8ff" },
  { id: "capcut", name: "CapCut", category: "Design and media", preferred: true, monogram: "CC", color: "#f0f6fc" },
  { id: "meta-business", name: "Meta Business Suite", category: "Design and media", preferred: false, icon: meta, color: "#0866ff" },
  { id: "facebook", name: "Facebook", category: "Design and media", preferred: false, icon: facebook, color: "#1877f2" },
  { id: "instagram", name: "Instagram", category: "Design and media", preferred: false, icon: instagram, color: "#e4405f" },
  { id: "tiktok", name: "TikTok", category: "Design and media", preferred: false, icon: tiktok, color: "#f0f6fc" },
  { id: "youtube", name: "YouTube", category: "Design and media", preferred: false, icon: youtube, color: "#ff0000" },
  { id: "word", name: "Microsoft Word", category: "Work and AI", preferred: false, monogram: "W", color: "#2b579a" },
  { id: "excel", name: "Microsoft Excel", category: "Work and AI", preferred: false, monogram: "X", color: "#217346" },
  { id: "powerpoint", name: "Microsoft PowerPoint", category: "Work and AI", preferred: false, monogram: "P", color: "#d24726" },
  { id: "outlook", name: "Microsoft Outlook", category: "Work and AI", preferred: false, monogram: "O", color: "#0072c6" },
  { id: "teams", name: "Microsoft Teams", category: "Work and AI", preferred: false, monogram: "T", color: "#6264a7" },
  { id: "monday", name: "Monday.com", category: "Work and AI", preferred: false, monogram: "M", color: "#f62b54" },
  { id: "kaggle", name: "Kaggle", category: "Work and AI", preferred: false, icon: kaggle, color: "#20beff" },
  { id: "chatgpt", name: "ChatGPT", category: "Work and AI", preferred: false, monogram: "GPT", color: "#74aa9c" },
  { id: "claude", name: "Claude", category: "Work and AI", preferred: false, icon: anthropic, color: "#d97757" },
  { id: "copilot", name: "GitHub Copilot", category: "Work and AI", preferred: false, icon: copilot, color: "#f0f6fc" },
];

export const stackCategories = [
  "All",
  "Preferred",
  "Build",
  "Ship and secure",
  "Design and media",
  "Work and AI",
] as const;

export type StackFilter = (typeof stackCategories)[number];
