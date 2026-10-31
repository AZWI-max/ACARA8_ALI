
/**
* Template Name: Arsha
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Updated: Feb 22 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to body
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");

    if (!selectBody || !selectHeader) return;

    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    ) return;

    if (window.scrollY > 100) {
      selectBody.classList.add("scrolled");
    } else {
      selectBody.classList.remove("scrolled");
    }
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    const body = document.querySelector("body");

    if (!body || !mobileNavToggleBtn) return;

    body.classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page links
   */
  document.querySelectorAll("#navmenu a").forEach(navmenu => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach(navmenu => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();

      this.parentNode.classList.toggle("active");

      if (this.parentNode.nextElementSibling) {
        this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      }

      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");

  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (!scrollTop) return;

    if (window.scrollY > 100) {
      scrollTop.classList.add("active");
    } else {
      scrollTop.classList.remove("active");
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll
   */
  function aosInit() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false
      });
    }
  }

  window.addEventListener("load", aosInit);

  /**
   * GLightbox
   */
  if (typeof GLightbox !== "undefined") {
    GLightbox({
      selector: ".glightbox"
    });
  }

  /**
   * Swiper sliders
   */
  function initSwiper() {
    if (typeof Swiper === "undefined") return;

    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      const configElement = swiperElement.querySelector(".swiper-config");

      if (!configElement) return;

      let config;

      try {
        config = JSON.parse(configElement.innerHTML.trim());
      } catch (error) {
        console.error("Konfigurasi Swiper tidak valid:", error);
        return;
      }

      if (
        swiperElement.classList.contains("swiper-tab") &&
        typeof initSwiperWithCustomPagination === "function"
      ) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions
   */
  document.querySelectorAll(".faq-item h3, .faq-item .faq-toggle").forEach(faqItem => {
    faqItem.addEventListener("click", () => {
      faqItem.parentNode.classList.toggle("faq-active");
    });
  });

  /**
   * Animate skills items
   */
  const skillsAnimation = document.querySelectorAll(".skills-animation");

  if (typeof Waypoint !== "undefined") {
    skillsAnimation.forEach(item => {
      new Waypoint({
        element: item,
        offset: "80%",
        handler: function () {
          const progress = item.querySelectorAll(".progress .progress-bar");

          progress.forEach(el => {
            el.style.width = el.getAttribute("aria-valuenow") + "%";
          });
        }
      });
    });
  }

  /**
   * Isotope layout and filters
   */
  if (
    typeof Isotope !== "undefined" &&
    typeof imagesLoaded !== "undefined"
  ) {
    document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
      const container = isotopeItem.querySelector(".isotope-container");

      if (!container) return;

      const layout = isotopeItem.getAttribute("data-layout") || "masonry";
      const filter = isotopeItem.getAttribute("data-default-filter") || "*";
      const sort = isotopeItem.getAttribute("data-sort") || "original-order";

      let initIsotope = null;

      imagesLoaded(container, function () {
        initIsotope = new Isotope(container, {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });

      isotopeItem.querySelectorAll(".isotope-filters li").forEach(function (filters) {
        filters.addEventListener("click", function () {
          const activeFilter = isotopeItem.querySelector(".isotope-filters .filter-active");

          if (activeFilter) {
            activeFilter.classList.remove("filter-active");
          }

          this.classList.add("filter-active");

          if (initIsotope) {
            initIsotope.arrange({
              filter: this.getAttribute("data-filter")
            });
          }
        });
      });
    });
  }

  /**
   * Correct scrolling position for hash links
   */
  window.addEventListener("load", function () {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);

      if (section) {
        setTimeout(() => {
          const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          const margin = parseInt(scrollMarginTop, 10) || 0;

          window.scrollTo({
            top: section.offsetTop - margin,
            behavior: "smooth"
          });
        }, 100);
      }
    }
  });

  /**
   * Navigation scrollspy
   */
  const navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;

      const section = document.querySelector(navmenulink.hash);

      if (!section) return;

      const position = window.scrollY + 200;

      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document.querySelectorAll(".navmenu a.active").forEach(link => {
          link.classList.remove("active");
        });

        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }

  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

})();
