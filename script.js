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

// --- Video Scrubber Logic ---
document.querySelectorAll('.video-scrubber-container').forEach(container => {
  const video = container.querySelector('video');
  const progressBar = container.nextElementSibling?.querySelector('.scrubber-progress-fill');

  let isDragging = false;
  let startX = 0;

  const handleMouseMove = (e) => {
    if (!isDragging || !video) return;

    // Get clientX for both mouse and touch events
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const deltaX = clientX - startX;
    const sensitivity = 5; // adjust for speed

    let newTime = video.currentTime + (deltaX / sensitivity) * 0.05;

    // Ensure video loops smoothly
    if (newTime >= video.duration) newTime = 0;
    if (newTime <= 0) newTime = video.duration;

    video.currentTime = newTime;
    startX = clientX;

    if (progressBar && video.duration) {
      progressBar.style.width = `${(newTime / video.duration) * 100}%`;
    }
  };

  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    container.classList.add('is-interacting');
  };

  const handleMouseUp = () => {
    isDragging = false;
    // We intentionally don't remove the 'is-interacting' class immediately
    // so the "Drag to rotate" text stays hidden after they start using it once.
  };

  // Only start dragging when metadata is loaded and duration is known
  video.addEventListener('loadedmetadata', () => {
    // Mouse events
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch events
    container.addEventListener('touchstart', (e) => {
        // e.preventDefault(); /* removed because passive: true may not allow it or better handled via css */
        handleMouseDown(e);
    }, {passive: true});
    window.addEventListener('touchmove', handleMouseMove, {passive: true});
    window.addEventListener('touchend', handleMouseUp);
  });
});

// --- Image Comparison Slider Logic ---
document.querySelectorAll('.image-comparison-container').forEach(container => {
  const overlayWrapper = container.querySelector('.img-overlay-wrapper');
  const overlayImage = container.querySelector('.img-overlay');
  const sliderThumb = container.querySelector('.slider-thumb');

  let isDragging = false;

  // Set initial width of overlay image to match container to prevent squishing
  const setOverlayImageWidth = () => {
    const containerWidth = container.getBoundingClientRect().width;
    overlayImage.style.width = `${containerWidth}px`;
  };

  // Call once on load, and on window resize
  setOverlayImageWidth();
  window.addEventListener('resize', setOverlayImageWidth);

  const handleDrag = (e) => {
    if (!isDragging) return;

    const rect = container.getBoundingClientRect();
    const clientX = e.type.includes('mouse') ? e.clientX : (e.touches ? e.touches[0].clientX : e.clientX);

    // Calculate x relative to container, bound between 0 and container width
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;

    overlayWrapper.style.width = `${percent}%`;
    sliderThumb.style.left = `${percent}%`;
  };

  const startDrag = (e) => {
    isDragging = true;
    handleDrag(e);
  };

  const stopDrag = () => {
    isDragging = false;
  };

  // Mouse events
  container.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', handleDrag);
  window.addEventListener('mouseup', stopDrag);

  // Touch events
  container.addEventListener('touchstart', startDrag, {passive: true});
  window.addEventListener('touchmove', handleDrag, {passive: true});
  window.addEventListener('touchend', stopDrag);
});
