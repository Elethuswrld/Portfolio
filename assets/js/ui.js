document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const isDark = savedTheme ? savedTheme === "dark" : systemPrefersDark;

  body.classList.toggle("dark-mode", isDark);

  if (toggle) {
    toggle.textContent = isDark ? "☀️" : "🌙";

    toggle.addEventListener("click", () => {
      const nowDark = body.classList.toggle("dark-mode");
      toggle.textContent = nowDark ? "☀️" : "🌙";
      localStorage.setItem("theme", nowDark ? "dark" : "light");
    });
  }
});
