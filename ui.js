document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // 1. Check for saved theme or system preference
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // 2. Apply theme on load
  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    body.classList.add("dark-mode");
    if (darkModeToggle) darkModeToggle.textContent = "☀️";
  } else {
    body.classList.remove("dark-mode");
    if (darkModeToggle) darkModeToggle.textContent = "🌙";
  }

  // 3. Toggle theme on click
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");

      // Update icon and save preference
      darkModeToggle.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }
});