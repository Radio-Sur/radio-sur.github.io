(() => {
  "use strict";

  // Navbar: solid background after scrolling past the hero top.
  const navbar = document.querySelector(".navbar");
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile burger menu.
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    burger.classList.toggle("active", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      burger.classList.remove("active");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  // Scrollspy: highlight the nav link of the section in view.
  const spyLinks = [...document.querySelectorAll(".nav-links a[href^='#']")];
  const sections = spyLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length > 0) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          spyLinks.forEach((a) =>
            a.classList.toggle(
              "active",
              a.getAttribute("href") === `#${entry.target.id}`,
            ),
          );
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => spy.observe(s));
  }

  // Copy buttons (docker command).
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const target = document.querySelector(btn.getAttribute("data-copy"));
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target.innerText.trim());
        const label = btn.querySelector("span");
        const original = label.textContent;
        label.textContent = "Copied!";
        setTimeout(() => {
          label.textContent = original;
        }, 1600);
      } catch {
        // Clipboard unavailable (e.g. non-secure context) — select the text instead.
        const range = document.createRange();
        range.selectNodeContents(target);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    });
  });
})();
