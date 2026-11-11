export const BOOT_SESSION_KEY = "jk-booted";

export function hasBooted() {
  try {
    return sessionStorage.getItem(BOOT_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function finishBoot() {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.boot = "done";
  try {
    sessionStorage.setItem(BOOT_SESSION_KEY, "1");
  } catch {
    // The durable document state still protects the current page.
  }
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.getElementById("top")?.focus({ preventScroll: true });
}
