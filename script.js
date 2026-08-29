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
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

themeToggle?.addEventListener("click", () => {
  const lightThemeEnabled = !document.body.classList.contains("light-theme");

  document.body.classList.toggle("light-theme", lightThemeEnabled);
  themeToggle.setAttribute("aria-pressed", String(lightThemeEnabled));
  themeToggle.setAttribute(
    "aria-label",
    lightThemeEnabled ? "Switch to dark mode" : "Switch to light mode",
  );
});

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.classList.toggle("is-open");
  mainNav?.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle?.classList.remove("is-open");
    mainNav?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});
