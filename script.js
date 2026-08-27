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
  const lightThemeEnabled = document.body.classList.toggle("light-theme");

  themeToggle.setAttribute("aria-pressed", String(lightThemeEnabled));
  themeToggle.setAttribute(
    "aria-label",
    lightThemeEnabled ? "Switch to dark mode" : "Switch to light mode",
  );
});
