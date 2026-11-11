import { useEffect, useState } from "react";

export function useBootDone() {
  const [done, setDone] = useState(
    () => document.documentElement.dataset.boot === "done",
  );

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setDone(root.dataset.boot === "done");
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["data-boot"] });
    return () => observer.disconnect();
  }, []);

  return done;
}
