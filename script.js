// script.js
document.addEventListener('DOMContentLoaded', function () {
  // Menu functionality
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      navLinks.classList.toggle('show');

      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }

      const expanded = navLinks.classList.contains('show');
      toggle.setAttribute('aria-expanded', expanded);
    });

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
  }

  // Portfolio Slider functionality - بدون أي سحب
  const portfolioSlider = document.querySelector('.portfolio-slider');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (portfolioSlider && portfolioItems.length > 0) {
    let currentSlide = 0;
    
    function getItemsPerView() {
      const width = window.innerWidth;
      if (width < 768) return 1;
      if (width < 1024) return 2;
      return 3;
    }
    
    function updateSlider() {
      const itemsPerView = getItemsPerView();
      const totalSlides = Math.ceil(portfolioItems.length / itemsPerView);
      
      if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;
      if (currentSlide < 0) currentSlide = 0;
      
      const slideWidth = 100 / itemsPerView;
      const translateX = currentSlide * 100;
      portfolioSlider.style.transform = `translateX(-${translateX}%)`;
    }
    
    function nextSlide() {
      const itemsPerView = getItemsPerView();
      const totalSlides = Math.ceil(portfolioItems.length / itemsPerView);
      
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
      } else {
        currentSlide = 0;
      }
      updateSlider();
    }
    
    function prevSlide() {
      const itemsPerView = getItemsPerView();
      const totalSlides = Math.ceil(portfolioItems.length / itemsPerView);
      
      if (currentSlide > 0) {
        currentSlide--;
      } else {
        currentSlide = totalSlides - 1;
      }
      updateSlider();
    }
    
    // إضافة event listeners للأسهم فقط
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // تحديث عند resize
    window.addEventListener('resize', function() {
      currentSlide = 0;
      updateSlider();
    });
    
    // لا يوجد أي كود للسحب - تم حذفه تماماً
    
    // التهيئة الأولية
    updateSlider();
  }
});