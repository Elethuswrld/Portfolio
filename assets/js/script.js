document.addEventListener("DOMContentLoaded", () => {
  // Loading animation, dark mode, navbar toggle, typed.js, smooth scroll
  // Hide loading animation
  setTimeout(() => {
    const loading = document.querySelector(".loading");
    if (loading) {
      loading.style.opacity = "0";
      setTimeout(() => {
        loading.style.display = "none";
      }, 500);
    }
  }, 1000);

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById("darkModeToggle");
  const userPrefersDark = localStorage.getItem("darkMode") === "enabled" || 
                         window.matchMedia("(prefers-color-scheme: dark)").matches;

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

  // Navbar Toggle
  const toggleBtn = document.querySelector(".togglebtn");
  const navLinks = document.querySelector(".navlinks");

  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    toggleBtn.classList.toggle("click");
  });

  // Close mobile menu when clicking on a link
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
      toggleBtn.classList.remove("click");
    }
  });

  // Typed.js effect
  var typed = new Typed(".input", {
    strings: [
      "Junior Full Stack Developer", 
      "Junior Basic Game Developer", 
      "Software Development Student",
      "Programming Enthusiast"
    ],
    typeSpeed: 70,
    backSpeed: 55,
    loop: true,
    backDelay: 2000
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe footer for entrance animation
  const footer = document.querySelector('.site-footer');
  if (footer) {
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(50px)';
    footer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(footer);
  }

  // Certificates expansion
  // Certificate Expansion JavaScript
  const certificateCards = document.querySelectorAll('.certificate-card');
  
  certificateCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Prevent expansion when clicking on links
      if (e.target.tagName === 'A' || e.target.closest('a')) {
        return;
      }
      
      const skillsSection = this.querySelector('.skills-section');
      const isExpanded = this.classList.contains('expanded');
      
      // Close all other expanded cards
      certificateCards.forEach(otherCard => {
        if (otherCard !== this) {
          otherCard.classList.remove('expanded');
          const otherSkillsSection = otherCard.querySelector('.skills-section');
          otherSkillsSection.classList.remove('expanded');
        }
      });
      
      // Toggle current card
      if (isExpanded) {
        this.classList.remove('expanded');
        skillsSection.classList.remove('expanded');
      } else {
        this.classList.add('expanded');
        skillsSection.classList.add('expanded');
      }
    });
  });

  // Scroll-to-top button
  // Scroll-to-top button
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
      // scrolling down
      scrollTopBtn.classList.add("show");
    } else {
      // scrolling up
      scrollTopBtn.classList.remove("show");
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // avoid negative
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  
  // Intersection observer for animations
  // (Copy all the JS you provided earlier here)
});
