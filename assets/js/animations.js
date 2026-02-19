document.addEventListener("DOMContentLoaded", () => {
  // Page fade-in
  document.body.classList.add("page-enter");

  requestAnimationFrame(() => {
    document.body.classList.add("page-enter-active");
  });

  // Scroll reveal + stagger
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.08}s`;
    observer.observe(el);
  });
});

