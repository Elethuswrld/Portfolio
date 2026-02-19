document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".togglebtn");
  const navLinks = document.querySelector(".navlinks");

  if (!toggleBtn || !navLinks) return;

  let isMenuOpen = false;
  let lastFocusedElement = null;

  const focusableSelectors =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  const getFocusableElements = () => {
    return Array.from(navLinks.querySelectorAll(focusableSelectors));
  };

  const openMenu = () => {
    isMenuOpen = true;
    lastFocusedElement = document.activeElement;

    navLinks.classList.add("open");
    toggleBtn.setAttribute("aria-expanded", "true");

    const focusable = getFocusableElements();
    if (focusable.length > 0) {
      focusable[0].focus();
    }
  };

  const closeMenu = () => {
    isMenuOpen = false;

    navLinks.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");

    if (lastFocusedElement) lastFocusedElement.focus();
  };

  toggleBtn.addEventListener("click", () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu on Escape
  document.addEventListener("keydown", (e) => {
    if (!isMenuOpen) return;

    if (e.key === "Escape") {
      closeMenu();
    }

    // Trap focus inside menu when open
    if (e.key === "Tab") {
      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!isMenuOpen) return;

    if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeMenu();
    }
  });
});
