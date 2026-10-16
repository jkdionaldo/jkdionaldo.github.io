import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const headerHeight = () => getComputedStyle(document.documentElement).getPropertyValue("--header-h").trim() || "64px";
    const update = () => {
      const threshold = parseFloat(headerHeight());
      let current = ids[0];
      ids.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= threshold + 1) current = id;
      });
      setActive(current);
    };
    const observer = new IntersectionObserver(update, { rootMargin: `-${headerHeight()} 0px -50% 0px` });
    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      observer.disconnect();
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, [ids]);
  return active;
}
