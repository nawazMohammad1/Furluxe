/* =========================================================
   FURLUXE
   Premium Pet Grooming Website
   Homepage JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       01. PAGE LOADER
    ===================================================== */

  const pageLoader = document.querySelector(".page-loader");

  if (pageLoader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        pageLoader.classList.add("hide");
      }, 600);
    });
  }

  /* =====================================================
       02. NAVBAR — SCROLL EFFECT
    ===================================================== */

  const header = document.querySelector(".header");

  const handleNavbarScroll = () => {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleNavbarScroll);

  handleNavbarScroll();

  /* =====================================================
       03. MOBILE MENU
    ===================================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");

      document.body.classList.toggle("no-scroll");
    });

    /* Close menu after clicking a link */

    const navigationLinks = navLinks.querySelectorAll("a");

    navigationLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");

        document.body.classList.remove("no-scroll");
      });
    });

    /* Close menu when clicking outside */

    document.addEventListener("click", (event) => {
      if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");

        document.body.classList.remove("no-scroll");
      }
    });
  }

  /* =====================================================
       04. ACTIVE NAVIGATION LINK
    ===================================================== */

  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a[href^='#']");

  const updateActiveNav = () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;

      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navItems.forEach((link) => {
      link.classList.remove("active");

      const target = link.getAttribute("href");

      if (target === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveNav);

  updateActiveNav();

  /* =====================================================
       05. SMOOTH SCROLL
    ===================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* =====================================================
       06. SCROLL REVEAL
    ===================================================== */

  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  /* =====================================================
       07. STAGGERED CARD ANIMATION
    ===================================================== */

  const animatedGroups = document.querySelectorAll(
    ".services-grid, .packages-grid, .stats-grid",
  );

  animatedGroups.forEach((group) => {
    const cards = group.children;

    Array.from(cards).forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.08}s`;
    });
  });

  /* =====================================================
       08. NUMBER COUNTERS
    ===================================================== */

  const counters = document.querySelectorAll("[data-counter]");

  let countersStarted = false;

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.counter);

    const duration = 1800;

    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      /*
               Ease-out effect
            */

      const eased = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(target * eased);

      counter.textContent = currentValue.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(updateCounter);
  };

  if (counters.length > 0) {
    const counterSection = document.querySelector(".stats-section");

    if (counterSection) {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !countersStarted) {
              countersStarted = true;

              counters.forEach(animateCounter);

              counterObserver.disconnect();
            }
          });
        },
        {
          threshold: 0.35,
        },
      );

      counterObserver.observe(counterSection);
    }
  }

  /* =====================================================
       09. FAQ ACCORDION
    ===================================================== */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      /*
               Close every other FAQ
            */

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");

          const otherAnswer = otherItem.querySelector(".faq-answer");

          if (otherAnswer) {
            otherAnswer.style.maxHeight = null;
          }
        }
      });

      /*
               Toggle current FAQ
            */

      if (isActive) {
        item.classList.remove("active");

        answer.style.maxHeight = null;
      } else {
        item.classList.add("active");

        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* =====================================================
       10. BACK TO TOP BUTTON
    ===================================================== */

  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 500) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    };

    window.addEventListener("scroll", toggleBackToTop);

    toggleBackToTop();

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* =====================================================
       11. PARALLAX HERO IMAGE
    ===================================================== */

  const heroImage = document.querySelector(".hero-image");

  const heroVisual = document.querySelector(".hero-visual");

  /*
       Only activate subtle parallax on
       larger screens.
    */

  if (heroImage && heroVisual) {
    window.addEventListener("scroll", () => {
      if (window.innerWidth <= 900) {
        heroImage.style.transform = "";
        return;
      }

      const rect = heroVisual.getBoundingClientRect();

      const windowHeight = window.innerHeight;

      if (rect.bottom > 0 && rect.top < windowHeight) {
        const movement =
          (windowHeight / 2 - (rect.top + rect.height / 2)) * 0.025;

        heroImage.style.transform = `translateY(${movement}px) scale(1.03)`;
      }
    });
  }

  /* =====================================================
       12. MOUSE MOVEMENT — HERO
    ===================================================== */

  const hero = document.querySelector(".hero");

  const heroPaws = document.querySelectorAll(".floating-paw");

  if (
    hero &&
    heroPaws.length > 0 &&
    window.matchMedia("(pointer: fine)").matches
  ) {
    hero.addEventListener("mousemove", (event) => {
      const rect = hero.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;

      const y = (event.clientY - rect.top) / rect.height - 0.5;

      heroPaws.forEach((paw, index) => {
        const multiplier = index % 2 === 0 ? 18 : -14;

        paw.style.transform = `translate(
                                ${x * multiplier}px,
                                ${y * multiplier}px
                            )`;
      });
    });

    hero.addEventListener("mouseleave", () => {
      heroPaws.forEach((paw) => {
        paw.style.transform = "";
      });
    });
  }

  /* =====================================================
       13. BUTTON RIPPLE EFFECT
    ===================================================== */

  const rippleButtons = document.querySelectorAll(
    ".btn, .package-btn, .nav-book-btn",
  );

  rippleButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const ripple = document.createElement("span");

      const rect = this.getBoundingClientRect();

      const size = Math.max(rect.width, rect.height);

      ripple.style.position = "absolute";

      ripple.style.width = `${size}px`;

      ripple.style.height = `${size}px`;

      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;

      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

      ripple.style.borderRadius = "50%";

      ripple.style.background = "rgba(255,255,255,0.22)";

      ripple.style.transform = "scale(0)";

      ripple.style.pointerEvents = "none";

      ripple.style.animation = "furluxeRipple 0.6s ease-out";

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 650);
    });
  });

  /* =====================================================
       14. ADD RIPPLE ANIMATION
    ===================================================== */

  const rippleStyle = document.createElement("style");

  rippleStyle.textContent = `

        @keyframes furluxeRipple {

            to {
                transform: scale(2);
                opacity: 0;
            }

        }

    `;

  document.head.appendChild(rippleStyle);

  /* =====================================================
       15. SERVICE CARD TILT
    ===================================================== */

  const serviceCards = document.querySelectorAll(".service-card");

  if (serviceCards.length > 0 && window.matchMedia("(pointer: fine)").matches) {
    serviceCards.forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;

        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;

        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -2;

        const rotateY = ((x - centerX) / centerX) * 2;

        card.style.transform = `perspective(800px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-9px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* =====================================================
       16. LAZY IMAGE LOADING
    ===================================================== */

  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    if (!image.hasAttribute("loading")) {
      image.setAttribute("loading", "lazy");
    }
  });

  /* =====================================================
       17. IMAGE ERROR HANDLING
    ===================================================== */

  images.forEach((image) => {
    image.addEventListener("error", function () {
      /*
                   Keeps the layout intact if
                   an external image fails.
                */

      this.style.background = "linear-gradient(135deg, #e5d8c5, #f7f3ec)";

      this.style.objectFit = "cover";

      this.removeAttribute("src");
    });
  });

  /* =====================================================
       18. APPOINTMENT BUTTON FEEDBACK
    ===================================================== */

  const appointmentButtons = document.querySelectorAll(
    'a[href="#appointment"], ' + 'a[href*="appointment"]',
  );

  appointmentButtons.forEach((button) => {
    button.addEventListener("click", () => {
      /*
                   Small visual feedback
                */

      button.classList.add("clicked");

      setTimeout(() => {
        button.classList.remove("clicked");
      }, 500);
    });
  });

  /* =====================================================
       19. ESCAPE KEY
    ===================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (menuToggle && navLinks && navLinks.classList.contains("active")) {
        menuToggle.classList.remove("active");

        navLinks.classList.remove("active");

        document.body.classList.remove("no-scroll");
      }

      faqItems.forEach((item) => {
        item.classList.remove("active");

        const answer = item.querySelector(".faq-answer");

        if (answer) {
          answer.style.maxHeight = null;
        }
      });
    }
  });

  /* =====================================================
       20. CURRENT YEAR
    ===================================================== */

  const currentYear = document.querySelector("#currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* =====================================================
       21. PAGE READY
    ===================================================== */

  document.body.classList.add("page-ready");
});
