document.addEventListener("DOMContentLoaded", () => {
  // إخفاء شاشة التحميل بعد تحميل الصفحة
  window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    if (loading) {
      setTimeout(() => {
        loading.classList.add('hidden');
        setTimeout(() => {
          loading.style.display = 'none';
        }, 500);
      }, 500);
    }
  });

  
  const sliders = document.querySelectorAll(".slider");

  sliders.forEach((slider) => {
    const track = slider.querySelector(".slider-track");
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");
    
    let index = 0;
    let intervalId;
    let isPaused = false;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    // تحسين تحميل الصور
    const images = track.querySelectorAll("img");
    images.forEach(img => {
      // إضافة حدث عند تحميل الصورة
      img.addEventListener('load', function() {
        this.classList.add('loaded');
      });
      
      // إذا كانت الصورة محملة مسبقًا
      if (img.complete) {
        img.classList.add('loaded');
      }
    });

    // حساب عدد الصور المعروضة في كل مرة
    function getVisibleCount() {
      return window.innerWidth < 768 ? 1 : 2;
    }

    // عرض الصور الحالية
    function showCurrent() {
      const visibleCount = getVisibleCount();
      const itemWidth = 100 / visibleCount;
      
      // في الموبايل، لا نستخدم التحويل، بل نعتمد على التمرير الأفقي
      if (window.innerWidth < 768) {
        // في الموبايل، لا نحتاج لتحريك المسار
        return;
      }
      
      const totalItems = track.children.length;
  const maxIndex = Math.max(0, totalItems - visibleCount);
  
  if (index > maxIndex) {
    index = maxIndex;
  }
      track.style.transform = `translateX(-${index * itemWidth}%)`;
}

    // الانتقال إلى الصورة التالية
    // الانتقال إلى الصورة التالية
function nextSlide() {
  const visibleCount = getVisibleCount();
  const totalItems = track.children.length;

  // استخدم الطول الفعلي بدل حساب الصفحات
  if (index < totalItems - visibleCount) {
    index++;
  } else {
    index = 0; // العودة للبداية
  }
  showCurrent();
}

    // الانتقال إلى الصورة السابقة
function prevSlide() {
  const visibleCount = getVisibleCount();
  const totalItems = track.children.length;

  if (index > 0) {
    index--;
  } else {
    index = totalItems - visibleCount; // الانتقال للنهاية الحقيقية
  }
  showCurrent();
}

    // بدء السلايدر التلقائي
    function startAutoSlide() {
      // لا نبدأ السلايدر التلقائي في الموبايل
      if (window.innerWidth < 768) return;
      
      intervalId = setInterval(() => {
        if (!isPaused) {
          nextSlide();
        }
      }, 4000);
    }

    // إيقاف السلايدر التلقائي
    function stopAutoSlide() {
      clearInterval(intervalId);
    }

    // أحداث السحب للجوال
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      stopAutoSlide();
    });

    track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', () => {
      if (!isDragging) return;
      
      const diff = startX - currentX;
      const minSwipeDistance = 50;
      
      if (Math.abs(diff) > minSwipeDistance) {
        if (diff > 0) {
          nextSlide(); // سحب لليسار
        } else {
          prevSlide(); // سحب لليمين
        }
      }
      
      isDragging = false;
      startAutoSlide();
    });

    // أحداث الأزرار
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
    });

    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      prevSlide();
      stopAutoSlide();
      startAutoSlide();
    });

    // إيقاف السلايدر عند التمرير فوقه
    slider.addEventListener("mouseenter", () => {
      isPaused = true;
      stopAutoSlide();
    });

    slider.addEventListener("mouseleave", () => {
      isPaused = false;
      startAutoSlide();
    });

    // إعادة حساب عند تغيير حجم النافذة
    window.addEventListener('resize', () => {
      index = 0;
      showCurrent();
      stopAutoSlide();
      startAutoSlide();
    });

    // بدء السلايدر
    showCurrent();
    startAutoSlide();
  });

  // تحسينات القائمة المتنقلة
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
    
    // إغلاق القائمة عند النقر على رابط
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });
  }
});
// أضيفي هذا الكود
const closeMenuBtn = document.createElement('button');
closeMenuBtn.className = 'close-menu';
closeMenuBtn.innerHTML = '×';
closeMenuBtn.addEventListener('click', () => {
  navLinks.classList.remove('show');
});

// أضيفي زر الإغلاق للقائمة
//if (navLinks) {
 // navLinks.appendChild(closeMenuBtn);
//}
