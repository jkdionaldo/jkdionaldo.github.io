import { useEffect, useState } from "react";

function waitForHeroImage() {
  const image = document.querySelector<HTMLImageElement>(".hero-portrait img");
  if (!image || image.complete) {
    return Promise.resolve();
  }
  return new Promise<void>((resolve) => {
    image.addEventListener("load", () => resolve(), { once: true });
    image.addEventListener("error", () => resolve(), { once: true });
  });
}

export function useAssetGate() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    const load = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", () => resolve(), { once: true });
      }
    });
    const fonts = document.fonts?.ready ?? Promise.resolve();
    Promise.all([fonts, waitForHeroImage(), load]).then(() => {
      if (active) setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  return ready;
}
