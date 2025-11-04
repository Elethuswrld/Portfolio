document.addEventListener("DOMContentLoaded", () => {
  // --- Common Functionality ---

  // 1. Dark Mode Toggle
  const darkModeToggle = document.getElementById("darkModeToggle");
  if (darkModeToggle) {
    const currentMode = localStorage.getItem("mode") || "light";
    if (currentMode === "dark") {
      document.body.classList.add("dark-mode");
      darkModeToggle.textContent = "☀️";
    }

    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const newMode = document.body.classList.contains("dark-mode")
        ? "dark"
        : "light";
      localStorage.setItem("mode", newMode);
      darkModeToggle.textContent = newMode === "dark" ? "☀️" : "🌙";
    });
  }

  // 2. Mobile Nav Toggle
  const toggleBtn = document.querySelector(".togglebtn");
  const navLinks = document.querySelector(".navlinks");
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      const isExpanded = navLinks.classList.toggle("open");
      toggleBtn.setAttribute("aria-expanded", isExpanded);
      toggleBtn.classList.toggle("click", isExpanded);
    });
  }

  // 3. Loading Animation
  const loading = document.querySelector(".loading");
  if (loading) {
    setTimeout(() => {
      loading.classList.add("hidden");
    }, 500);
  }

  // 4. Active Nav Link
  const currentPage = window.location.pathname;
  const navAnchors = document.querySelectorAll(".navlinks a");
  navAnchors.forEach(link => {
      if(link.getAttribute('href') === currentPage) {
          link.classList.add('active');
      }
  });
});