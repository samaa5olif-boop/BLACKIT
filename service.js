document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".slider");

  sliders.forEach((slider) => {
    const folder = slider.getAttribute("data-folder");
    let index = 0;
    let intervalId;
    let paused = false;
    let track = slider.querySelector(".slider-track");

    // إنشاء العنصر لو مش موجود
    if (!track) {
      track = document.createElement("div");
      track.classList.add("slider-track");
      slider.appendChild(track);
    }

    // إنشاء أزرار التحكم
    const prevBtn = document.createElement("button");
    const nextBtn = document.createElement("button");
    prevBtn.classList.add("prev");
    nextBtn.classList.add("next");
    prevBtn.innerHTML = "&#10094;";
    nextBtn.innerHTML = "&#10095;";
    slider.appendChild(prevBtn);
    slider.appendChild(nextBtn);

    // تحميل الصور من الفولدر
    if (folder) {
      let i = 1;

      function loadNextImage() {
        const img = new Image();
        img.src = `images/${folder}/${i}.png`;
        img.alt = `${folder}-${i}`;

        img.onload = () => {
          track.appendChild(img);
          i++;
          loadNextImage();
        };

        img.onerror = () => {
          if (track.children.length > 0) startSlider();
        };
      }

      loadNextImage();
    } else {
      startSlider();
    }

    // بدء السلايدر
    function startSlider() {
      const imgs = track.querySelectorAll("img");
      if (imgs.length === 0) return;

      const totalPairs = Math.ceil(imgs.length / 2);

      // تحريك السلايدر حسب الـ index
      function showCurrent() {
        track.style.transform = `translateX(-${index * 100}%)`;
      }

      // التحريك التلقائي
      intervalId = setInterval(() => {
        if (!paused) {
          index = (index + 1) % totalPairs;
          showCurrent();
        }
      }, 3000);

      showCurrent();

      // التحكم اليدوي
      function moveSlide(step) {
        index = (index + step + totalPairs) % totalPairs;
        showCurrent();
      }

      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        moveSlide(1);
      });

      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        moveSlide(-1);
      });

      // إيقاف وتشغيل عند الضغط
      slider.addEventListener("click", (e) => {
        e.stopPropagation();
        paused = !paused;
        if (paused) {
          slider.classList.add("paused");
        } else {
          slider.classList.remove("paused");
        }
      });

      // تشغيل تاني لما تضغطي برا السلايدر
      document.addEventListener("click", (e) => {
        if (!slider.contains(e.target)) {
          paused = false;
          slider.classList.remove("paused");
        }
      });
    }
  });
});
