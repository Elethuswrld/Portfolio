  document.addEventListener("DOMContentLoaded", () => {
    // Hide loading animation
    setTimeout(() => {
      const loading = document.querySelector(".loading");
      if (loading) {
        loading.style.opacity = "0";
        setTimeout(() => {
          loading.style.display = "none";
        }, 500);
      }
    }, 1500);

    // Mobile Navigation Toggle
    const toggleBtn = document.querySelector('.togglebtn');
    const navLinks = document.querySelector('.navlinks');

    if (toggleBtn && navLinks) {
      toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('click');
        navLinks.classList.toggle('open');
      });

      // Close nav when clicking on a link
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          toggleBtn.classList.remove('click');
          navLinks.classList.remove('open');
        });
      });
    }

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved dark mode preference or default to light mode
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      body.classList.add('dark-mode');
      darkModeToggle.textContent = '☀️';
    }

    darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      
      // Update button icon
      darkModeToggle.textContent = isDark ? '☀️' : '🌙';
      
      // Save preference to localStorage
      localStorage.setItem('darkMode', isDark);
      
      // Add smooth transition effect
      darkModeToggle.style.transform = 'scale(0.8)';
      setTimeout(() => {
        darkModeToggle.style.transform = 'scale(1)';
      }, 150);
    });

    // Smooth scrolling for navigation links
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

    // Add parallax effect to profile image
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        profileImg.style.transform = `translateY(${rate}px)`;
      });
    }

    // Animate stats numbers on scroll
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumber = entry.target.querySelector('.stat-number');
          const finalNumber = parseInt(statNumber.textContent);
          let currentNumber = 0;
          
          const increment = finalNumber / 50;
          const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
              currentNumber = finalNumber;
              clearInterval(timer);
            }
            
            if (statNumber.textContent.includes('%')) {
              statNumber.textContent = Math.floor(currentNumber) + '%';
            } else if (statNumber.textContent.includes('+')) {
              statNumber.textContent = Math.floor(currentNumber) + '+';
            } else {
              statNumber.textContent = Math.floor(currentNumber);
            }
          }, 30);
          
          statsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all stat items
    document.querySelectorAll('.stat-item').forEach(stat => {
      statsObserver.observe(stat);
    });

    // Add hover effect to timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
      });
    });

    // Add typing effect to the main heading
    const mainHeading = document.querySelector('.about-text h3');
    if (mainHeading) {
      const originalHTML = mainHeading.innerHTML;
      mainHeading.innerHTML = '';

      let index = 0;
      let isTag = false;
      let tagBuffer = '';

      const typingSpeed = 100;

      function typeWriter() {
        if (index < originalHTML.length) {
          const char = originalHTML[index];

          if (char === '<') {
            isTag = true;
          }

          if (isTag) {
            tagBuffer += char;
            if (char === '>') {
              mainHeading.innerHTML += tagBuffer;
              tagBuffer = '';
              isTag = false;
            }
          } else {
            mainHeading.innerHTML += char;
          }

          index++;
          setTimeout(typeWriter, typingSpeed);
        }
      }

      // Start typing effect after page load
      setTimeout(typeWriter, 1000);
    }

    // Add click effect to interest cards and experience items
    document.querySelectorAll('.interest-card, .experience-item').forEach(card => {
      card.addEventListener('click', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        setTimeout(() => {
          card.style.transform = 'translateY(0) scale(1)';
        }, 200);
      });
    });

    // Add floating animation to profile image
    if (profileImg) {
      setInterval(() => {
        profileImg.style.animation = 'float 3s ease-in-out infinite';
      }, 100);
    }

    // Add CSS animation for floating effect
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotateY(0deg); }
        50% { transform: translateY(-10px) rotateY(5deg); }
      }
      
      .profile-img {
        animation: float 3s ease-in-out infinite;
      }
      
      /* Add glow effect on hover */
      .interest-card:hover, .experience-item:hover {
        box-shadow: 0 15px 30px rgba(0, 124, 237, 0.2), 0 0 20px rgba(0, 168, 255, 0.1);
      }
      
      .timeline-content:hover, .experience-container:hover {
        box-shadow: 0 10px 30px rgba(0, 124, 237, 0.15), 0 0 15px rgba(0, 168, 255, 0.1);
      }
      
      /* Enhance dark mode loading */
      .dark-mode .loading {
        background: rgba(17, 17, 17, 0.9);
      }
      
      /* Add subtle gradient text effect */
      .about-text .highlight {
        background: linear-gradient(135deg, #007ced, #00a8ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    `;
    document.head.appendChild(style);

    // Add scroll-triggered animations for better UX
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements that should fade in on scroll
    document.querySelectorAll('.timeline-item, .interest-card, .stat-item, .experience-item, .experience-container').forEach(el => {
      fadeObserver.observe(el);
    });
  });

  // Add window resize handler for responsive adjustments
  window.addEventListener('resize', () => {
    // Close mobile nav on resize
    const toggleBtn = document.querySelector('.togglebtn');
    const navLinks = document.querySelector('.navlinks');
    
    if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
      toggleBtn.classList.remove('click');
      navLinks.classList.remove('open');
    }
  });

  // Add custom cursor effect for interactive elements
  document.querySelectorAll('.interest-card, .timeline-item, .stat-item, .experience-item, .experience-container').forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.style.cursor = 'pointer';
    });
    
    el.addEventListener('mouseleave', () => {
      document.body.style.cursor = 'default';
    });
  });