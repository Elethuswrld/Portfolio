document.addEventListener("DOMContentLoaded", () => {
  // === Loading Animation ===
  const loading = document.querySelector(".loading");
  setTimeout(() => {
    loading.style.opacity = "0";
    setTimeout(() => loading.style.display = "none", 500);
  }, 1500);

  // === Elements ===
  const toggleBtn = document.querySelector('.togglebtn');
  const navLinks = document.querySelector('.navlinks');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  const tabs = document.querySelectorAll('.tab');
  const skillCards = document.querySelectorAll('.skill-card');

  // === Mobile Navigation ===
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('click');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleBtn.classList.remove('click');
        navLinks.classList.remove('open');
      });
    });
  }

  // === Dark Mode ===
  if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  }

  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark);
    darkModeToggle.style.transform = 'scale(0.8)';
    setTimeout(() => darkModeToggle.style.transform = 'scale(1)', 150);
  });

  // === Skill Tab Filtering with Accessibility ===
  tabs.forEach(tab => {
    tab.setAttribute('role', 'tab');
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const category = tab.dataset.category;
      skillCards.forEach(card => {
        const show = category === 'all' || card.classList.contains(category);
        card.style.display = show ? 'flex' : 'none';
      });
    });
  });

  // === Skill Card Expand/Collapse ===
function toggleProjects(card) {
  const isExpanded = card.classList.contains('expanded');

  document.querySelectorAll('.skill-card.expanded').forEach(otherCard => {
    if (otherCard !== card) {
      otherCard.classList.remove('expanded');
      otherCard.setAttribute('aria-expanded', 'false');
    }
  });

  card.classList.toggle('expanded', !isExpanded);
  card.setAttribute('aria-expanded', !isExpanded);

  if (!isExpanded) {
    setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
  }
}


  skillCards.forEach(card => {
    card.addEventListener('click', () => toggleProjects(card));
  });

  // === Progress Bar Animation on Scroll ===
  const progressObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.progress-fill').forEach(fill => {
          fill.style.animation = 'fillBar 2s ease forwards';
        });
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillCards.forEach(card => progressObserver.observe(card));

  // === Entrance Animation for Skill Cards ===
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    cardObserver.observe(card);
  });

  // === Keyboard & Resize Support ===
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.skill-card.expanded').forEach(card => card.classList.remove('expanded'));
      toggleBtn?.classList.remove('click');
      navLinks?.classList.remove('open');
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      document.querySelectorAll('.skill-card.expanded').forEach(card => card.classList.remove('expanded'));
    }
    if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
      toggleBtn.classList.remove('click');
      navLinks.classList.remove('open');
    }
  });
});
