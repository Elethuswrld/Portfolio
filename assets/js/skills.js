document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".skill-tabs .tab");
  const skillCards = document.querySelectorAll(".skill-card");
  const projectsDisplay = document.getElementById("projectsDisplay");
  const sortSelect = document.getElementById("sort-select");

  // Helper function to extract skill name
  function getSkillName(card) {
    return card.getAttribute("data-skill") || "";
  }

  // Helper function to extract proficiency percentage
  function getProficiency(card) {
    const proficiency = card.getAttribute("data-proficiency");
    if (proficiency) return parseInt(proficiency, 10);

    const fill = card.querySelector(".progress-fill");
    if (!fill) return 0;
    const style = fill.style.width;
    return parseInt(style.replace("%", ""), 10);
  }

  // Main function to sort the skill cards
  function sortSkills(sortBy) {
    const grid = document.querySelector(".skills-grid");
    const skillCards = Array.from(
      grid.querySelectorAll(".skill-card:not(.hidden-skill)")
    );

    skillCards.sort((a, b) => {
      if (sortBy === "name-asc") {
        const nameA = getSkillName(a).toUpperCase();
        const nameB = getSkillName(b).toUpperCase();
        return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
      } else if (sortBy === "proficiency-desc") {
        return getProficiency(b) - getProficiency(a);
      } else if (sortBy === "proficiency-asc") {
        return getProficiency(a) - getProficiency(b);
      }
      return 0;
    });

    skillCards.forEach((card) => grid.appendChild(card));
  }

  // Project Display Logic
  let activeCard = null;

  const showProjects = (skill, projects) => {
    projectsDisplay.innerHTML = "";
    projectsDisplay.classList.remove("visible");

    setTimeout(() => {
      const title = document.createElement("h2");
      title.textContent = `Projects for ${skill}`;
      projectsDisplay.appendChild(title);

      projects.forEach((proj) => {
        const cardLink = document.createElement("a");
        let targetUrl = proj.live !== "#" ? proj.live : proj.repo;
        if (targetUrl === "#") {
          targetUrl = `https://github.com/search?q=${encodeURIComponent(
            skill
          )}+user%3AElethuswrld&type=repositories`;
        }
        cardLink.href = targetUrl;
        cardLink.target = "_blank";
        cardLink.rel = "noopener noreferrer";
        cardLink.classList.add("project-card-item");
        cardLink.setAttribute("aria-label", `View project: ${proj.title}`);

        const image = document.createElement("img");
        image.src = proj.img || "/assets/images/default-proj.jpg";
        image.alt = `${proj.title} project image`;
        image.classList.add("project-image");
        cardLink.appendChild(image);

        const info = document.createElement("div");
        info.classList.add("project-info");

        const projTitle = document.createElement("strong");
        projTitle.textContent = proj.title;

        const projDesc = document.createElement("p");
        projDesc.textContent = proj.desc;

        info.appendChild(projTitle);
        info.appendChild(projDesc);

        const linkContainer = document.createElement("div");
        linkContainer.style.marginTop = "auto";

        if (proj.repo !== "#") {
          const repoLink = document.createElement("a");
          repoLink.href = proj.repo;
          repoLink.target = "_blank";
          repoLink.classList.add("github-project");
          repoLink.innerHTML = '<i class="fab fa-github"></i> Repository';
          repoLink.style.marginRight = "15px";
          linkContainer.appendChild(repoLink);
        }

        if (proj.live !== "#") {
          const liveLink = document.createElement("a");
          liveLink.href = proj.live;
          liveLink.target = "_blank";
          liveLink.classList.add("github-project");
          liveLink.innerHTML =
            '<i class="fas fa-external-link-alt"></i> Live Demo';
          linkContainer.appendChild(liveLink);
        }

        info.appendChild(linkContainer);
        cardLink.appendChild(info);
        projectsDisplay.appendChild(cardLink);
      });

      if (projects.length > 0) {
        projectsDisplay.classList.add("visible");
        projectsDisplay.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, 250);
  };

  skillCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest(".github-project")) return;

      const skillName = card.getAttribute("data-skill");
      const projects = JSON.parse(card.getAttribute("data-projects") || "[]");
      const wasActive = card.classList.contains("active");

      skillCards.forEach((c) => c.classList.remove("active"));

      if (!wasActive) {
        card.classList.add("active");
        activeCard = card;
        showProjects(skillName, projects);
      } else {
        projectsDisplay.classList.remove("visible");
        activeCard = null;
      }
    });
  });

  // Skill Tab Filtering
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      skillCards.forEach((c) => c.classList.remove("active"));
      projectsDisplay.classList.remove("visible");
      activeCard = null;

      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.getAttribute("data-filter");

      skillCards.forEach((card) => {
        if (filter === "all" || card.classList.contains(filter)) {
          card.classList.remove("hidden-skill");
        } else {
          card.classList.add("hidden-skill");
        }
      });

      setTimeout(() => {
        sortSkills(sortSelect.value);
      }, 100);
    });
  });

  // Skill Sorting
  sortSkills(sortSelect.value);
  sortSelect.addEventListener("change", (event) => {
    sortSkills(event.target.value);
  });
});