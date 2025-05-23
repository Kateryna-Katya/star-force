import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const swiperConfigs = [
  {
    selector: '.ship-swiper',
    slideClass: 'ship-swiper-slide',
    wrapperClass: 'ship-swiper-wrapper',
  },
  {
    selector: '.reviews-swiper',
    slideClass: 'reviews-swiper-slide',
    wrapperClass: 'reviews-swiper-wrapper',
  },
  {
    selector: '.gallery-swiper',
    slideClass: 'gallery-swiper-slide',
    wrapperClass: 'gallery-swiper-wrapper',
    navigation: {
      nextEl: '.gallery-nav .custom-next',
      prevEl: '.gallery-nav .custom-prev',
    },
  },
];

const swiperInstances = {};

function initSwipers() {
  const screenWidth = window.innerWidth;

  swiperConfigs.forEach(config => {
    const container = document.querySelector(config.selector);
    if (!container) return;

    const id = config.selector;

    // Destroy existing swiper
    if (swiperInstances[id]) {
      swiperInstances[id].destroy(true, true);
      delete swiperInstances[id];
    }

    // === SHIP SWIPER ===
    if (config.selector === '.ship-swiper') {
      if (screenWidth < 1439) {
        const swiper = new Swiper(container, {
          slidesPerView: 1.1,
          spaceBetween: 10,
          loop: true,
          slideClass: config.slideClass,
          wrapperClass: config.wrapperClass,
          direction: 'horizontal',
        });
        swiperInstances[id] = swiper;
      }
    }

    // === REVIEWS SWIPER ===
    else if (config.selector === '.reviews-swiper') {
      if (screenWidth < 1439) {
        const swiper = new Swiper(container, {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: true,
          slideClass: config.slideClass,
          wrapperClass: config.wrapperClass,
          direction: 'horizontal',
        });
        swiperInstances[id] = swiper;
      }
    }

    // === GALLERY SWIPER ===
    else if (config.selector === '.gallery-swiper') {
      const slidesPerView = screenWidth < 374 ? 1.1 : screenWidth < 1439 ? 1.7 : 6;
      const swiper = new Swiper(container, {
        modules: [Navigation],
        slidesPerView,
        spaceBetween: 20,
        loop: true,
        slideClass: config.slideClass,
        wrapperClass: config.wrapperClass,
        direction: 'horizontal',
        navigation: config.navigation,
      });
      swiperInstances[id] = swiper;
    }
  });
}

// Init on page load
document.addEventListener('DOMContentLoaded', initSwipers);

// Re-init on resize (with debounce)
window.addEventListener('resize', () => {
  clearTimeout(window._swiperResizeTimeout);
  window._swiperResizeTimeout = setTimeout(initSwipers, 300);
});