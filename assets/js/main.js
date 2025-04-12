/**
 * Модифицированный JavaScript для сайта Анны Ларичевой
 * Включает переключатель тем, индикатор прокрутки и улучшения
 */
(function() {
  "use strict";

  /**
   * Вспомогательная функция для выбора элементов
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Вспомогательная функция для добавления слушателей событий
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Вспомогательная функция для прокрутки
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Переключатель темной/светлой темы
   */
  const themeToggleBtn = select('#theme-toggle');
  const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

  // Применить сохраненную тему при загрузке
  if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Если нет сохраненной темы, но системная темная
      document.documentElement.setAttribute('data-theme', 'dark');
  }

  function toggleTheme() {
      let currentThemeAttr = document.documentElement.getAttribute('data-theme');
      if (currentThemeAttr === 'dark') {
          document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
      } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
      }
  }

  if (themeToggleBtn) {
      on('click', '#theme-toggle', toggleTheme);
  }


  /**
   * Полоса прогресса прокрутки
   */
  const scrollProgressBar = select('.scroll-progress');

  function updateScrollProgress() {
      if (!scrollProgressBar) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgressBar.style.width = scrollPercent + "%";
  }
  onscroll(document, updateScrollProgress);


  /**
   * Добавляет класс .scrolled к body при прокрутке
   */
  const selectBody = select('body');
  const selectHeader = select('#header');

  function toggleScrolledClass() {
      if (!selectHeader || !selectHeader.classList.contains('fixed-top')) return;
      window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
      window.scrollY > 100 ? selectHeader.classList.add('scrolled') : selectHeader.classList.remove('scrolled');
  }
  window.addEventListener('load', toggleScrolledClass);
  onscroll(document, toggleScrolledClass);


  /**
   * Мобильная навигация
   */
  const mobileNavToggleBtn = select('.mobile-nav-toggle');
  const body = select('body');
  let mobileNavOverlay = null; // Оверлей будет создан динамически

  function mobileNavToggle() {
      body.classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');

      if (body.classList.contains('mobile-nav-active')) {
          // Создаем и добавляем оверлей
          if (!mobileNavOverlay) {
              mobileNavOverlay = document.createElement('div');
              mobileNavOverlay.className = 'mobile-nav-overlay';
              body.appendChild(mobileNavOverlay);
              // Добавляем слушатель для закрытия по клику на оверлей
              mobileNavOverlay.addEventListener('click', mobileNavToggle);
          }
      } else {
          // Удаляем оверлей
          if (mobileNavOverlay) {
              mobileNavOverlay.removeEventListener('click', mobileNavToggle);
              mobileNavOverlay.remove();
              mobileNavOverlay = null;
          }
      }
  }
  if (mobileNavToggleBtn) {
    on('click', '.mobile-nav-toggle', mobileNavToggle);
  }

  /**
   * Скрыть мобильное меню при клике на ссылку
   */
  on('click', '#navmenu a', function(e) {
      if (body.classList.contains('mobile-nav-active')) {
          // Проверяем, это ссылка на якорь внутри страницы?
          if (this.hash !== "") {
              // Если кликнули на якорь, даем время на прокрутку перед закрытием
              // Если не якорь (внешняя ссылка), закрываем сразу
               if (select(this.hash)) { // Убедимся, что якорь существует
                 // e.preventDefault(); // Убираем preventDefault, чтобы переход сработал
                 mobileNavToggle(); // Закрываем меню
               } else {
                 mobileNavToggle(); // Закрываем меню для внешних ссылок
               }
          } else {
            mobileNavToggle(); // Закрываем меню для ссылок без якоря
          }
      }
  }, true);


  /**
   * Preloader
   */
  const preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => { // Небольшая задержка для плавной анимации
          preloader.remove();
      }, 300);
    });
     // Дополнительно скрыть прелоадер через 5 секунд, если он все еще виден
     setTimeout(() => {
        if (preloader && preloader.parentNode) {
           preloader.remove();
        }
     }, 5000);
  }


  /**
   * Кнопка прокрутки вверх
   */
  const scrollTopBtn = select('.scroll-top');
  function toggleScrollTop() {
    if (scrollTopBtn) {
      window.scrollY > 100 ? scrollTopBtn.classList.add('active') : scrollTopBtn.classList.remove('active');
    }
  }
  window.addEventListener('load', toggleScrollTop);
  onscroll(document, toggleScrollTop);

  if (scrollTopBtn) {
    on('click', '.scroll-top', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * Инициализация AOS (Animation on scroll)
   */
  function aosInit() {
      if (typeof AOS !== 'undefined') {
         AOS.init({
           duration: 800, // Увеличена длительность для плавности
           easing: 'ease-in-out',
           once: true,
           mirror: false
         });
      }
  }
  window.addEventListener('load', aosInit);


  /**
   * Инициализация Typed.js
   */
  const typedElement = select('.typed');
  if (typedElement && typeof Typed !== 'undefined') {
    let typed_strings = typedElement.getAttribute('data-typed-items');
    if (typed_strings) {
      typed_strings = typed_strings.split(',');
      new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }
  }


  /**
   * Анимация прогресс-баров навыков при прокрутке
   */
  function animateSkillsOnScroll() {
      select('.skill-progress', true).forEach((progressBar) => {
        progressBar.style.width = progressBar.getAttribute('data-progress-width') || progressBar.style.width || '0%'; // Используем data-атрибут или текущий стиль
      });
  }

  // Используем Intersection Observer для запуска анимации навыков
  const skillsSection = select('.skills-section'); // Убедитесь, что у секции есть этот класс
  if (skillsSection && typeof IntersectionObserver !== 'undefined') {
      const skillsObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  // Добавляем data-атрибут с нужной шириной, если его нет
                  select('.skill-progress', true).forEach(bar => {
                      if (!bar.hasAttribute('data-progress-width')) {
                          bar.setAttribute('data-progress-width', bar.style.width);
                          bar.style.width = '0%'; // Сбрасываем ширину перед анимацией
                      }
                  });
                  // Запускаем анимацию
                  setTimeout(animateSkillsOnScroll, 100); // Небольшая задержка
                  observer.unobserve(entry.target); // Наблюдаем только один раз
              }
          });
      }, { threshold: 0.3 }); // Запуск при 30% видимости секции
      skillsObserver.observe(skillsSection);
  } else {
      // Fallback для старых браузеров (анимация при загрузке)
      // Убедитесь, что ширина задана в CSS или HTML style атрибуте
      // animateSkillsOnScroll(); // Раскомментируйте, если хотите запуск по загрузке
  }


  /**
   * Инициализация PureCounter
   */
  if (typeof PureCounter !== 'undefined') {
      new PureCounter();
  }


  /**
   * Инициализация GLightbox
   */
   if (typeof GLightbox !== 'undefined') {
     const glightbox = GLightbox({
       selector: '.glightbox'
     });
   }


  /**
   * Инициализация Isotope Layout и фильтров (для .certificate-gallery)
   */
  select('.certificate-gallery', true).forEach(function(gallery) {
      let iso;
      const items = gallery.querySelector('.row'); // Контейнер с элементами
      const filters = gallery.parentElement.querySelectorAll('.certificates-filters li'); // Фильтры

      imagesLoaded(items, function() {
          iso = new Isotope(items, {
              itemSelector: '.col-lg-4, .col-md-6', // Уточняем селектор элементов
              layoutMode: 'masonry'
          });
      });

      filters.forEach(function(filter) {
          filter.addEventListener('click', function() {
              filters.forEach(f => f.classList.remove('active'));
              this.classList.add('active');
              const filterValue = this.getAttribute('data-filter');
              iso.arrange({
                  filter: filterValue === 'all' ? '*' : `[data-category="${filterValue}"]`
              });
              if (typeof aosInit === 'function') { aosInit(); }
          }, false);
      });
  });


  /**
   * Логика для FAQ аккордеона (используя Bootstrap Collapse)
   */
   // Bootstrap сам обрабатывает переключение классов collapse и show
   // и атрибутов aria-expanded при клике на элементы с data-bs-toggle="collapse"
   // Дополнительно добавим логику закрытия других элементов при открытии одного
   const faqItems = select('.faq-item', true);
   faqItems.forEach(item => {
       const question = item.querySelector('.faq-question');
       const answer = item.querySelector('.collapse');

       if (question && answer) {
           // Слушаем событие "show.bs.collapse", которое происходит ПЕРЕД открытием
           answer.addEventListener('show.bs.collapse', function () {
               // Закрываем все остальные открытые ответы
               faqItems.forEach(otherItem => {
                   const otherAnswer = otherItem.querySelector('.collapse');
                   if (otherAnswer !== answer && otherAnswer.classList.contains('show')) {
                       // Используем Bootstrap API для закрытия
                       var bsCollapse = bootstrap.Collapse.getInstance(otherAnswer);
                       if (!bsCollapse) {
                           bsCollapse = new bootstrap.Collapse(otherAnswer, { toggle: false });
                       }
                       bsCollapse.hide();
                   }
               });
           });
       }
   });


  /**
   * Инициализация Swiper
   */
  function initSwiper() {
      if (typeof Swiper !== 'undefined') {
         document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
           let configScript = swiperElement.querySelector(".swiper-config");
           if (configScript) {
              try {
                 let config = JSON.parse(configScript.innerHTML.trim());
                 new Swiper(swiperElement, config);
              } catch(e) {
                 console.error("Ошибка парсинга конфигурации Swiper: ", e);
              }
           }
         });
      }
  }
  window.addEventListener("load", initSwiper);


  /**
   * Корректная прокрутка к якорю при загрузке страницы
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      let section = select(window.location.hash);
      if (section) {
        setTimeout(() => {
          let scrollMarginTop = parseFloat(getComputedStyle(section).scrollMarginTop);
          window.scrollTo({
            top: section.offsetTop - scrollMarginTop,
            behavior: 'smooth'
          });
        }, 100); // Небольшая задержка
      }
    }
  });


  /**
   * Подсветка активного пункта меню при прокрутке (Scrollspy)
   */
  let navmenuLinks = select('#navmenu a', true);
  function navmenuScrollspy() {
    let position = window.scrollY + 200; // Смещение для более ранней активации
    navmenuLinks.forEach(navmenuLink => {
      if (!navmenuLink.hash) return;
      let section = select(navmenuLink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        select('#navmenu a.active', true).forEach(link => link.classList.remove('active'));
        navmenuLink.classList.add('active');
      } else {
        navmenuLink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  onscroll(document, navmenuScrollspy);

})();