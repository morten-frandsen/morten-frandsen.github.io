(function () {
  "use strict";

  var root = document.documentElement;

  /* ------------------------------ Theme ------------------------------ */

  var themeToggle = document.getElementById("theme-toggle");

  function updateToggleLabel(theme) {
    if (!themeToggle) return;
    var nextTheme = theme === "dark" ? "light" : "dark";
    themeToggle.setAttribute("aria-label", "Switch to " + nextTheme + " mode");
  }

  updateToggleLabel(root.dataset.theme);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = nextTheme;
      try {
        localStorage.setItem("theme", nextTheme);
      } catch (error) {
        /* Storage may be unavailable; the theme still applies for this page. */
      }
      updateToggleLabel(nextTheme);
    });
  }

  var colorQuery = window.matchMedia("(prefers-color-scheme: dark)");
  function followSystemTheme(event) {
    var savedTheme = null;
    try {
      savedTheme = localStorage.getItem("theme");
    } catch (error) {
      /* Ignore unavailable storage. */
    }
    if (savedTheme) return;

    var theme = event.matches ? "dark" : "light";
    root.dataset.theme = theme;
    updateToggleLabel(theme);
  }

  if (colorQuery.addEventListener) {
    colorQuery.addEventListener("change", followSystemTheme);
  } else if (colorQuery.addListener) {
    colorQuery.addListener(followSystemTheme);
  }

  /* --------------------------- Active nav link ------------------------ */

  function normalizePath(path) {
    path = path.replace(/\/index\.html$/, "/");
    if (path.length > 1 && path.charAt(path.length - 1) === "/") {
      path = path.slice(0, -1);
    }
    return path || "/";
  }

  var currentPath = normalizePath(window.location.pathname);
  var isPostPage = currentPath.indexOf("/posts/") === 0;

  document.querySelectorAll("nav a:not([href^='#'])").forEach(function (link) {
    var linkPath = normalizePath(new URL(link.href, window.location.href).pathname);
    var isCurrent = linkPath === currentPath ||
      (linkPath !== "/" && currentPath.indexOf(linkPath + "/") === 0) ||
      (isPostPage && linkPath === "/blog");

    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    }
  });

  /* -------------------------- Project filters ------------------------- */

  var filterButtons = document.querySelectorAll("[data-filter]");
  var filterableCards = document.querySelectorAll("[data-tags]");

  if (filterButtons.length && filterableCards.length) {
    function applyFilter(filter) {
      filterableCards.forEach(function (card) {
        var tags = (card.dataset.tags || "").split(/\s+/);
        card.hidden = filter !== "all" && tags.indexOf(filter) === -1;
      });

      filterButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
      });
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        applyFilter(button.dataset.filter);
      });
    });

    applyFilter("all");
  }

  /* ------------------------- Reveal on scroll ------------------------- */

  var revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length) {
    function revealInView() {
      revealElements.forEach(function (element) {
        if (element.classList.contains("is-visible")) return;

        var rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40 && rect.bottom > 0) {
          element.classList.add("is-visible");
        }
      });
    }

    revealInView();
    window.addEventListener("scroll", revealInView, { passive: true });
    window.addEventListener("resize", revealInView);

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

      revealElements.forEach(function (element) {
        observer.observe(element);
      });
    }
  }

  /* ----------------------------- Footer year -------------------------- */

  document.querySelectorAll(".year").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });
})();
