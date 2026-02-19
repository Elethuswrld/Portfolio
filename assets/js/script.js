// Utility functions for DOM queries and class/ARIA handling
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
const toggleClass = (el, className) => el && el.classList.toggle(className);
const setAria = (el, attr, value) => el && el.setAttribute(attr, value);

document.addEventListener("DOMContentLoaded", () => {
  //================================================================
  // 1. LOADING ANIMATION
  //================================================================
  const loading = $(".loading");
  if (loading) {
    // Use a timeout to ensure the loading animation is visible for a minimum duration
    setTimeout(() => {
      loading.style.opacity = "0";
      // Use the 'transitionend' event to hide the element after the CSS transition completes
      loading.addEventListener('transitionend', () => {
        loading.style.display = "none";
      }, { once: true }); // The event listener will be removed after it runs once
    }, 1000);
  }

  //================================================================
  // 3. NAVIGATION (TOGGLE & ACTIVE LINK)
  //================================================================
  const toggleBtn = $(".togglebtn");
  const navLinks = $(".navlinks");

  if (toggleBtn && navLinks) {
    // Active Link Setter
    const path = window.location.pathname;
    const currentLink = $(`.navlinks li a[href="${path}"]`);

    // Fallback for root path
    if (!currentLink && (path === "/" || path.endsWith("index.html"))) {
      const homeLink = $(".navlinks li a[href='/index.html']");
      if (homeLink) {
        homeLink.classList.add("active-page");
      }
    } else if (currentLink) {
      currentLink.classList.add("active-page");
    }

    // Navbar Toggle functionality
    toggleBtn.addEventListener("click", () => {
      const isExpanded = toggleClass(navLinks, "open");
      toggleClass(toggleBtn, "click");
      // Update ARIA attribute for accessibility
      setAria(toggleBtn, "aria-expanded", isExpanded);
    });

    // Close mobile menu when clicking a link
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
        toggleBtn.classList.remove("click");
        setAria(toggleBtn, "aria-expanded", "false");
      }
    });

    // Close mobile menu on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        navLinks.classList.remove("open");
        toggleBtn.classList.remove("click");
        setAria(toggleBtn, "aria-expanded", "false");
      }
    });
  }

  //================================================================
  // 4. TYPED.JS EFFECT
  //================================================================
  if ($(".input")) {
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
  $$("a[href^='#']").forEach((anchor) => {
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

  //================================================================
  // 5.1. INTERSECTION OBSERVER FOR FOOTER
  //================================================================
  const footerObserverOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        footerObserver.unobserve(entry.target);
      }
    });
  }, footerObserverOptions);

  const footer = $(".site-footer");
  if (footer) {
    // Initial setup for animation
    footer.style.opacity = "0";
    footer.style.transform = "translateY(50px)";
    footer.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    footerObserver.observe(footer);
  }

  //================================================================
  // 6. CERTIFICATES EXPANSION (with ARIA)
  //================================================================
  const certificateCards = $$(".certificate-card");

  certificateCards.forEach((card) => {
    // Initial ARIA setup for focusable cards
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button"); // Treat the card like a button
    card.setAttribute("aria-expanded", "false");

    const toggleExpansion = (e) => {
      // Prevent expansion when clicking on internal links
      if (e.target.tagName === "A" || e.target.closest("a")) {
        return;
      }

      const isActive = card.classList.contains("active");

      // Close all other expanded cards
      certificateCards.forEach((otherCard) => {
        if (otherCard !== card && otherCard.classList.contains("active")) {
          otherCard.classList.remove("active");
          otherCard.setAttribute("aria-expanded", "false");
        }
      });

      // Toggle current card state
      if (isActive) {
        card.classList.remove("active");
        card.setAttribute("aria-expanded", "false");
      } else {
        card.classList.add("active");
        card.setAttribute("aria-expanded", "true");
      }
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
  // 7. SCROLL-TO-TOP BUTTON (Simplified)
  //================================================================
  const scrollTopBtn = $("#scrollTopBtn");
  if (scrollTopBtn) {
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
  }

  //================================================================
  // 8. FADE-IN ANIMATION FOR CARDS (Projects & Certificates)
  //================================================================
  const fadeInCards = $$(".fade-in-card");

  const fadeInObserverOptions = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.2, // Trigger when 20% of the item is visible
  };

  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // Stop observing once it's visible
      }
    });
  }, fadeInObserverOptions);

  fadeInCards.forEach((card) => fadeInObserver.observe(card));
});
