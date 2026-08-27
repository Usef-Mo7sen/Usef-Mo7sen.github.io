document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const themeToggle = document.querySelector(".theme-toggle");

themeToggle?.addEventListener("click", () => {
  if (document.body.classList.contains("theme-is-changing")) return;

  const lightThemeEnabled = !document.body.classList.contains("light-theme");
  const toggleBounds = themeToggle.getBoundingClientRect();
  const wipe = document.createElement("div");

  wipe.className = `theme-wipe theme-wipe--${lightThemeEnabled ? "light" : "dark"}`;
  wipe.style.setProperty("--wipe-x", `${toggleBounds.left + toggleBounds.width / 2}px`);
  wipe.style.setProperty("--wipe-y", `${toggleBounds.top + toggleBounds.height / 2}px`);
  document.body.append(wipe);
  document.body.classList.add("theme-is-changing");

  if (!lightThemeEnabled) {
    wipe.classList.add("is-expanded");
    document.body.classList.remove("light-theme");
  }

  requestAnimationFrame(() => {
    wipe.classList.add("is-expanded");

    if (lightThemeEnabled) {
      window.setTimeout(() => document.body.classList.add("light-theme"), 500);
    } else {
      window.setTimeout(() => wipe.classList.add("is-collapsing"), 40);
    }
  });

  themeToggle.setAttribute("aria-pressed", String(lightThemeEnabled));
  themeToggle.setAttribute(
    "aria-label",
    lightThemeEnabled ? "Switch to dark mode" : "Switch to light mode",
  );

  window.setTimeout(() => {
    wipe.remove();
    document.body.classList.remove("theme-is-changing");
  }, lightThemeEnabled ? 750 : 800);
});
