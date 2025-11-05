document.addEventListener("DOMContentLoaded", () => {
  //================================================================
  // 1. LOADING ANIMATION
  //================================================================
  setTimeout(() => {
    const loading = document.querySelector(".loading");
    if (loading) {
      loading.style.opacity = "0";
      setTimeout(() => {
        loading.style.display = "none";
      }, 500);
    }
  }, 1000);

  //================================================================
  // 2. DARK MODE TOGGLE & PERSISTENCE
  //================================================================
  const darkModeToggle = document.getElementById("darkModeToggle");
  const userPrefersDark =
    localStorage.getItem("darkMode") === "enabled" ||
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Set initial state
  if (userPrefersDark) {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️";
  }

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    darkModeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
  });

  //================================================================
  // 3. NAVIGATION (TOGGLE & ACTIVE LINK)
  //================================================================
  const toggleBtn = document.querySelector(".togglebtn");
  const navLinks = document.querySelector(".navlinks");

  // Active Link Setter
  const path = window.location.pathname;
  const currentLink = document.querySelector(`.navlinks li a[href="${path}"]`);

  // Fallback for root path
  if (!currentLink && (path === "/" || path.endsWith("index.html"))) {
    document
      .querySelector('.navlinks li a[href="/index.html"]')
      .classList.add("active-page");
  } else if (currentLink) {
    currentLink.classList.add("active-page");
  }

  // Navbar Toggle functionality
  toggleBtn.addEventListener("click", () => {
    const isExpanded = navLinks.classList.toggle("open");
    toggleBtn.classList.toggle("click");
    // Update ARIA attribute for accessibility
    toggleBtn.setAttribute("aria-expanded", isExpanded);
  });

  // Close mobile menu when clicking a link
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
      toggleBtn.classList.remove("click");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Close mobile menu on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("open");
      toggleBtn.classList.remove("click");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });

  //================================================================
  // 4. TYPED.JS EFFECT
  //================================================================
  if (document.querySelector(".input")) {
    new Typed(".input", {
      strings: [
        "Junior Full Stack Developer",
        "Junior Basic Game Developer",
        "Programming Enthusiast",
      ],
      typeSpeed: 70,
      backSpeed: 55,
      loop: true,
      backDelay: 2000,
    });
  }

  //================================================================
  // 5. SMOOTH SCROLLING & INTERSECTION OBSERVER
  //================================================================
  // Smooth scrolling for anchor links
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

  // Intersection observer for footer animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const footer = document.querySelector(".site-footer");
  if (footer) {
    // Initial setup for animation
    footer.style.opacity = "0";
    footer.style.transform = "translateY(50px)";
    footer.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(footer);
  }

  //================================================================
  // 6. CERTIFICATES EXPANSION (with ARIA)
  //================================================================
  const certificateCards = document.querySelectorAll(".certificate-card");

  certificateCards.forEach((card) => {
    const skillsSection = card.querySelector(".skills-section");

    // Initial ARIA setup for focusable cards
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button"); // Treat the card like a button
    card.setAttribute("aria-expanded", "false");

    const toggleExpansion = (e) => {
      // Prevent expansion when clicking on internal links
      if (e.target.tagName === "A" || e.target.closest("a")) {
        return;
      }

      const isExpanded = card.classList.contains("expanded");

      // Close all other expanded cards
      certificateCards.forEach((otherCard) => {
        if (otherCard !== card && otherCard.classList.contains("expanded")) {
          otherCard.classList.remove("expanded");
          otherCard
            .querySelector(".skills-section")
            .classList.remove("expanded");
          otherCard.setAttribute("aria-expanded", "false");
        }
      });

      // Toggle current card state
      card.classList.toggle("expanded", !isExpanded);
      skillsSection.classList.toggle("expanded", !isExpanded);

      // Update ARIA attribute
      card.setAttribute("aria-expanded", String(!isExpanded));
    };

    card.addEventListener("click", toggleExpansion);

    // Add keyboard support for accessibility
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleExpansion(e);
      }
    });
  });

  //================================================================
  // 7. CERTIFICATE GRID TOGGLING
  //================================================================
  const toggleButtons = document.querySelectorAll(".toggle-certs-btn");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const grid = button.previousElementSibling; // The .certificates-grid
      const isExpanded = grid.classList.contains("expanded");

      grid.classList.toggle("expanded");
      button.setAttribute("aria-expanded", !isExpanded);

      if (!isExpanded) {
        button.textContent = "Show Less";
      } else {
        button.textContent = "Show More";
        grid.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  //================================================================
  // 7. SCROLL-TO-TOP BUTTON (Simplified)
  //================================================================
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  const handleScroll = () => {
    // Show button if scroll position is beyond 300px
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  };

  window.addEventListener("scroll", handleScroll);

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
