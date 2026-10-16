import { Menu, Moon, Sun } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { portfolio } from "@/data/portfolio";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";

export function Header() {
  const active = useScrollSpy(["about", "work", "journey", "contact"]);
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_86%,transparent)] backdrop-blur-xl">
    <div className="container-shell flex h-16 items-center justify-between">
      <a href="#top" className="focus-ring text-lg font-black tracking-tight">JK<span className="text-[var(--accent)]">.</span></a>
      <nav className="hidden items-center gap-5 md:flex">{portfolio.nav.map((item) => <a className={`focus-ring text-sm font-medium transition-colors ${active === item.href.slice(1) ? "text-[var(--accent)]" : "text-muted hover:text-[var(--accent)]"}`} href={item.href} key={item.href}>{item.label}</a>)}<a href="#contact" className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-bold text-white shadow-sm hover:opacity-90">Let's talk</a><button className="focus-ring rounded-full p-2 text-muted" onClick={toggle} aria-label="Toggle theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button></nav>
      <div className="flex items-center gap-2 md:hidden"><button className="focus-ring rounded-full p-2" onClick={toggle} aria-label="Toggle theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button><button className="focus-ring rounded-full p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu"><Menu size={22} /></button></div>
    </div>
    {open && <nav className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-4 md:hidden">{portfolio.nav.map((item) => <a className="block rounded-lg px-3 py-3 text-sm font-semibold text-muted hover:text-[var(--accent)]" href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}<a className="mt-2 block rounded-lg bg-[var(--accent)] px-3 py-3 text-center text-sm font-bold text-white" href="#contact" onClick={() => setOpen(false)}>Let's talk</a></nav>}
  </header>;
}
