// script.js
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!toggle || !navLinks) return; // لو مش موجودين مانع الشغل

  // افتح / اقفل المينيو
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    navLinks.classList.toggle('show');

    // بدل الايكون من bars -> times
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }

    // aria
    const expanded = navLinks.classList.contains('show');
    toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });

  // اقفل المينيو لما اختار أي لينك (وينقلك للسكشن)
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.classList.remove('show');
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // لو ضغطت برا المينيو وهو مفتوح -> يغلق
  document.addEventListener('click', function (e) {
    if (navLinks.classList.contains('show')) {
      if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
        navLinks.classList.remove('show');
        const icon = toggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
        toggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// ===========================================
// Lightbox functionality
// ===========================================

//

