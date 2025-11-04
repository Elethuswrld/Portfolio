document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll effects
  const navbar = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });

  // Particle animation enhancement
  const particles = document.querySelectorAll(".particle");
  particles.forEach((particle) => {
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 3 + "s";
    particle.style.animationDuration = 3 + Math.random() * 3 + "s";
  });

  // Expandable certificate cards
  document.querySelectorAll(".certificate-card").forEach((card) => {
    const expandIndicator = card.querySelector(".expand-indicator");
    if (expandIndicator) {
      expandIndicator.addEventListener("click", () => {
        card.classList.toggle("active");
      });
    }
  });

  // Project category filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active to clicked button
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      projectCards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
});