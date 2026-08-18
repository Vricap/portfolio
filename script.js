// Portfolio JavaScript - Vricap
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Theme Switcher
  const themeToggle = document.getElementById("themeToggle");
  const themes = ["dark", "gruvbox", "nord", "light"];
  let currentThemeIndex = 0;

  // Check saved theme
  const savedTheme = localStorage.getItem("vricap-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  currentThemeIndex = Math.max(0, themes.indexOf(savedTheme));

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      const newTheme = themes[currentThemeIndex];
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("vricap-theme", newTheme);
      
      // Update icon tooltip / label
      themeToggle.setAttribute("title", `Theme: ${newTheme.toUpperCase()}`);
    });
  }

  // Javanese Accordion Toggle
  const javaneseToggle = document.getElementById("javaneseToggle");
  const javaneseContent = document.getElementById("javaneseContent");
  const javaneseArrow = document.getElementById("javaneseArrow");

  if (javaneseToggle && javaneseContent) {
    javaneseToggle.addEventListener("click", () => {
      const isOpen = javaneseContent.classList.toggle("open");
      if (javaneseArrow) {
        javaneseArrow.textContent = isOpen ? "▲" : "▼";
      }
    });
  }

  // Project Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category") || "";
        if (filter === "all" || categories.includes(filter)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Copy Email to Clipboard
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  const emailText = "vricagedepenggalih@gmail.com";

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(emailText).then(() => {
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = `<i class="fa fa-check"></i> Copied!`;
        copyEmailBtn.style.color = "var(--accent-green)";
        setTimeout(() => {
          copyEmailBtn.innerHTML = originalText;
          copyEmailBtn.style.color = "";
        }, 2000);
      });
    });
  }

  // Screenshots Modal Lightbox
  const openModalBtn = document.getElementById("openDmsGallery");
  const modal = document.getElementById("dmsModal");
  const closeModalBtn = document.getElementById("closeDmsModal");

  if (openModalBtn && modal) {
    openModalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("active");
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }
});
