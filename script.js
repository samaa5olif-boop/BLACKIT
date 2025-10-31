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

  // Portfolio Slider functionality - ستايل مخصوص للتليفون
  const portfolioSlider = document.querySelector('.portfolio-slider');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.slider-dots');

  if (portfolioSlider && portfolioItems.length > 0) {
    let currentSlide = 0;
    let isMobile = window.innerWidth < 768;
    
    function getItemsPerView() {
      const width = window.innerWidth;
      if (width < 768) return 1;  // تليفون: 1 كارد - 6 سلايدات
      if (width < 1024) return 2; // تابلت: 2 كارد - 3 سلايدات
      return 3; // لاب: 3 كارد - 2 سلايدات
    }
    
    // إنشاء النقاط المتحركة
    function createDots() {
      if (!dotsContainer) return;
      
      dotsContainer.innerHTML = '';
      const itemsPerView = getItemsPerView();
      const totalSlides = Math.ceil(portfolioItems.length / itemsPerView);
      
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'slider-dot';
        dot.setAttribute('data-index', i);
        dotsContainer.appendChild(dot);
      }
      
      updateDots();
    }
    
    // تحديث النقاط النشطة - ستايل مخصوص للتليفون
    function updateDots() {
      const dots = document.querySelectorAll('.slider-dot');
      const totalDots = dots.length;
      isMobile = window.innerWidth < 768;
      
      dots.forEach((dot, index) => {
        const dotIndex = parseInt(dot.getAttribute('data-index'));
        
        // إزالة كل الكلاسات
        dot.className = 'slider-dot';
        
        if (isMobile) {
          // ستايل التليفون: 3 نقاط فقط ظاهرة - كبيرة في النص و2 صغيرين جمبها
          const distance = Math.abs(dotIndex - currentSlide);
          
          if (dotIndex === currentSlide) {
            dot.classList.add('active', 'mobile-center');
          } else if (distance === 1) {
            dot.classList.add('mobile-side');
          } else {
            dot.classList.add('mobile-hidden');
          }
        } else {
          // ستايل التابلت واللاب: النقاط كلها ظاهرة بالستايل القديم
          const distance = Math.abs(dotIndex - currentSlide);
          
          if (dotIndex === currentSlide) {
            dot.classList.add('active', 'center-dot');
          } else if (distance === 1) {
            dot.classList.add('side-dot');
          } else if (distance === 2) {
            dot.classList.add('far-dot');
          } else {
            dot.classList.add('hidden-dot');
          }
        }
      });
    }
    
    // الانتقال لسلايد معين
    function goToSlide(slideIndex) {
      const itemsPerView = getItemsPerView();
      const totalSlides = Math.ceil(portfolioItems.length / itemsPerView);
      
      if (slideIndex >= 0 && slideIndex < totalSlides) {
        currentSlide = slideIndex;
        updateSlider();
        updateDots();
      }
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
      updateDots();
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
      updateDots();
    }
    
    // إضافة event listeners للأسهم
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // إضافة event listeners للنقاط
    if (dotsContainer) {
      dotsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('slider-dot')) {
          const index = parseInt(e.target.getAttribute('data-index'));
          goToSlide(index);
        }
      });
    }
    
    // السحب للتليفون فقط
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    portfolioSlider.addEventListener('touchstart', function(e) {
      if (window.innerWidth < 768) { // للتليفون فقط
        startX = e.touches[0].clientX;
        isDragging = true;
        portfolioSlider.style.transition = 'none';
      }
    });
    
    portfolioSlider.addEventListener('touchmove', function(e) {
      if (isDragging && window.innerWidth < 768) {
        currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        const translateX = currentSlide * 100;
        portfolioSlider.style.transform = `translateX(calc(-${translateX}% - ${diff}px))`;
      }
    });
    
    portfolioSlider.addEventListener('touchend', function(e) {
      if (isDragging && window.innerWidth < 768) {
        portfolioSlider.style.transition = 'transform 0.5s ease';
        const diff = startX - currentX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        } else {
          updateSlider();
        }
        
        isDragging = false;
      }
    });
    
    // تحديث عند resize
    window.addEventListener('resize', function() {
      currentSlide = 0;
      createDots();
      updateSlider();
    });
    
    // التهيئة الأولية
    createDots();
    updateSlider();
  }
});