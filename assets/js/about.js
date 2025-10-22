// Function to handle the Loading animation
function handleLoadingScreen() {
  document.addEventListener("DOMContentLoaded", () => {
    const loading = document.querySelector(".loading");
    if (loading) {
      // Wait a short time before starting fade-out
      setTimeout(() => {
        loading.style.opacity = "0";

        // Remove the element after the transition completes
        loading.addEventListener("transitionend", () => {
          loading.style.display = "none";
        });
      }, 500); // 500ms delay before fade starts
    }
  });
}

// Function to handle Dark Mode toggle logic
function handleDarkMode() {
  const toggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // Check local storage for previous preference
  const isDarkMode = localStorage.getItem("darkMode") === "enabled";

  if (isDarkMode) {
    body.classList.add("dark-mode");
    toggle.innerHTML = "💡"; // Light mode icon
  } else {
    toggle.innerHTML = "🌙"; // Dark mode icon
  }

  // Toggle event listener
  toggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
      toggle.innerHTML = "💡";
    } else {
      localStorage.setItem("darkMode", "disabled");
      toggle.innerHTML = "🌙";
    }
  });
}

// Function to handle Mobile Navigation Toggle
function handleMobileNav() {
  const toggleBtn = document.querySelector(".togglebtn");
  const navLinks = document.querySelector(".navlinks");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      toggleBtn.classList.toggle("click");
      navLinks.classList.toggle("open");
    });

    // Close nav when a link is clicked (for single-page feel or navigation)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggleBtn.classList.remove("click");
        navLinks.classList.remove("open");
      });
    });
  }
}

// Initialize all functionality when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  handleLoadingScreen();
  handleDarkMode();
  handleMobileNav();
});
