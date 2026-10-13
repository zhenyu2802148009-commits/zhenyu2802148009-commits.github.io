/* ============================================================
   LUO Zhenyu — personal homepage behaviour (vanilla JS, no deps)
   Features: theme toggle w/ localStorage, mobile hamburger menu,
   footer year, back-to-top button, IntersectionObserver reveals.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 1. Theme toggle (dark default, light option) ---------- */
  var root = document.documentElement;
  var storeKey = "zl-theme";
  var themeBtn = document.getElementById("themeToggle");
  var themeIcon = themeBtn ? themeBtn.querySelector(".theme-icon") : null;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeIcon) themeIcon.textContent = theme === "light" ? "☀" : "☾";
  }

  var saved = null;
  try { saved = localStorage.getItem(storeKey); } catch (e) { /* storage disabled */ }
  if (saved === "light" || saved === "dark") {
    applyTheme(saved);
  } else if (window.matchMedia &&
             window.matchMedia("(prefers-color-scheme: light)").matches) {
    applyTheme("light");
  } else {
    applyTheme("dark");
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      try { localStorage.setItem(storeKey, next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- 2. Mobile hamburger navigation ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close the menu after choosing a destination.
    navMenu.addEventListener("click", function (ev) {
      if (ev.target.tagName === "A") {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- 3. Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- 4. Back-to-top button ---------- */
  var backTop = document.getElementById("backTop");
  if (backTop) {
    var onScroll = function () {
      backTop.classList.toggle("show", window.scrollY > 480);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 5. Reveal-on-scroll entrance animations ---------- */
  var revealables = document.querySelectorAll(
    ".section h2, .skill-card, .project-card, .about-grid p, .facts, .contact-card"
  );

  if ("IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    Array.prototype.forEach.call(revealables, function (el) {
      el.classList.add("reveal");
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
  }
})();
