/**
 * STACKLY SPORTS THEME - HEADER & HERO JAVASCRIPT
 * Handles 5-Slide Sports Carousel, Control bar (< o o o || >), mobile menu, and modals
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. HERO SLIDER LOGIC
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.querySelector('.slider-nav-prev');
  const nextBtn = document.querySelector('.slider-nav-next');
  const sliderPrevBtn = document.getElementById('sliderPrevBtn');
  const sliderNextBtn = document.getElementById('sliderNextBtn');
  const playPauseBtn = document.getElementById('sliderPlayPause');
  const playPauseIcon = playPauseBtn ? playPauseBtn.querySelector('i') : null;

  let currentSlide = 0;
  let slideInterval = null;
  let isPlaying = true;
  const slideDuration = 5500; // 5.5s per slide

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  function startAutoPlay() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, slideDuration);
    isPlaying = true;
    if (playPauseIcon) {
      playPauseIcon.className = 'fas fa-pause';
    }
  }

  function pauseAutoPlay() {
    if (slideInterval) clearInterval(slideInterval);
    isPlaying = false;
    if (playPauseIcon) {
      playPauseIcon.className = 'fas fa-play';
    }
  }

  // Bind Slider Events
  if (slides.length > 0) {
    startAutoPlay();

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        if (isPlaying) startAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        if (isPlaying) startAutoPlay();
      });
    }

    if (sliderNextBtn) {
      sliderNextBtn.addEventListener('click', () => {
        nextSlide();
        if (isPlaying) startAutoPlay();
      });
    }

    if (sliderPrevBtn) {
      sliderPrevBtn.addEventListener('click', () => {
        prevSlide();
        if (isPlaying) startAutoPlay();
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', function () {
        const slideIdx = parseInt(this.getAttribute('data-slide'), 10);
        showSlide(slideIdx);
        if (isPlaying) startAutoPlay();
      });
    });

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
          pauseAutoPlay();
        } else {
          startAutoPlay();
        }
      });
    }
  }

  // 2. STICKY HEADER
  const header = document.querySelector('.header-area');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. MOBILE MENU TOGGLE
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
      });
    });
  }

  // 4. SHOWREEL VIDEO MODAL
  const videoBtn = document.getElementById('openVideoModal');
  const videoModal = document.getElementById('videoModal');
  const closeVideoModal = document.getElementById('closeVideoModal');

  if (videoBtn && videoModal) {
    videoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      videoModal.classList.add('active');
    });
  }

  if (closeVideoModal && videoModal) {
    closeVideoModal.addEventListener('click', () => {
      videoModal.classList.remove('active');
    });
  }

  window.addEventListener('click', (e) => {
    if (videoModal && e.target === videoModal) {
      videoModal.classList.remove('active');
      const iframe = videoModal.querySelector('iframe');
      if (iframe) iframe.src = iframe.src;
    }
  });

  // Image Sliders (Shop Page)
  const sliders = document.querySelectorAll('.tilted-slider-wrap');
  sliders.forEach(slider => {
    const slides = slider.querySelectorAll('.tilted-slider-slide');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    if (!slides.length) return;

    let currentIndex = 0;

    const updateSlider = () => {
      slides.forEach((slide, i) => {
        if (i === currentIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        updateSlider();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        updateSlider();
      });
    }
  });

  // Party Slider
  const partySlider = document.querySelector('.party-slider-wrap');
  if (partySlider) {
    const pSlides = partySlider.querySelectorAll('.party-slider-slide');
    const pPrevBtn = partySlider.querySelector('.prev-btn');
    const pNextBtn = partySlider.querySelector('.next-btn');
    let pCurrentIndex = 0;

    const pUpdateSlider = () => {
      pSlides.forEach((slide, i) => {
        if (i === pCurrentIndex) slide.classList.add('active');
        else slide.classList.remove('active');
      });
    };

    if (pPrevBtn) {
      pPrevBtn.addEventListener('click', () => {
        pCurrentIndex = (pCurrentIndex === 0) ? pSlides.length - 1 : pCurrentIndex - 1;
        pUpdateSlider();
      });
    }

    if (pNextBtn) {
      pNextBtn.addEventListener('click', () => {
        pCurrentIndex = (pCurrentIndex === pSlides.length - 1) ? 0 : pCurrentIndex + 1;
        pUpdateSlider();
      });
    }
  }

  // Swim Slider
  const swimSlider = document.querySelector('.swim-slider-container');
  if (swimSlider) {
    const sSlides = swimSlider.querySelectorAll('.party-slider-slide');
    const sPrevBtn = swimSlider.querySelector('.prev-btn');
    const sNextBtn = swimSlider.querySelector('.next-btn');
    let sCurrentIndex = 0;

    const sUpdateSlider = () => {
      sSlides.forEach((slide, i) => {
        if (i === sCurrentIndex) slide.classList.add('active');
        else slide.classList.remove('active');
      });
    };

    if (sPrevBtn) {
      sPrevBtn.addEventListener('click', () => {
        sCurrentIndex = (sCurrentIndex === 0) ? sSlides.length - 1 : sCurrentIndex - 1;
        sUpdateSlider();
      });
    }

    if (sNextBtn) {
      sNextBtn.addEventListener('click', () => {
        sCurrentIndex = (sCurrentIndex === sSlides.length - 1) ? 0 : sCurrentIndex + 1;
        sUpdateSlider();
      });
    }
  }
});

