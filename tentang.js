document.addEventListener("DOMContentLoaded", () => {
  // ========== HANDLER MENU HAMBURGER ==========
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navLinks = document.getElementById("navLinks");
  const navOverlay = document.getElementById("navOverlay");

  if (hamburgerBtn && navLinks) {
    // Buka/Tutup Menu
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("active");
      navLinks.classList.toggle("active");
      if (navOverlay) navOverlay.classList.toggle("active");
    });

    // Tutup menu jika klik area overlay gelap
    if (navOverlay) {
      navOverlay.addEventListener("click", () => {
        hamburgerBtn.classList.remove("active");
        navLinks.classList.remove("active");
        navOverlay.classList.remove("active");
      });
    }

    // Tutup menu jika pengguna mengklik salah satu link
    const links = navLinks.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        hamburgerBtn.classList.remove("active");
        navLinks.classList.remove("active");
        if (navOverlay) navOverlay.classList.remove("active");
      });
    });
  }
});