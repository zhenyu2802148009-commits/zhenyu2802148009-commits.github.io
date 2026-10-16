/* LUO Zhenyu — minimal page behaviour (vanilla JS, no deps)
   Theme toggle, mobile nav, footer year, back-to-top.
*/
(function () {
  "use strict";

  var root = document.documentElement;
  var storeKey = "zl-theme";
  var themeBtn = document.getElementById("themeToggle");
  var themeIcon = themeBtn ? themeBtn.querySelector(".theme-icon") : null;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeIcon) themeIcon.textContent = theme === "light" ? "☀" : "☾";
  }

  var saved = null;
  try { saved = localStorage.getItem(storeKey); } catch (e) {}
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
      try { localStorage.setItem(storeKey, next); } catch (e) {}
    });
  }

  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navMenu.addEventListener("click", function (ev) {
      if (ev.target.tagName === "A") {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var backTop = document.getElementById("backTop");
  if (backTop) {
    var onScroll = function () {
      backTop.classList.toggle("show", window.scrollY > 420);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
