/**
 * Исправленный JavaScript для сайта Анны Ларичевой
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===== Переключатель темной темы =====
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Проверяем текущую тему
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // ===== Улучшенная работа мобильного меню =====
// ===== Улучшенное мобильное меню V2 =====
const mobileToggleBtn = document.getElementById('mobile-toggle');
const mobileNavPanel = document.getElementById('mobile-nav-panel');
const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
const mobileNavClose = document.getElementById('mobile-nav-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Функция открытия мобильного меню
function openMobileMenu() {
    document.body.classList.add('mobile-menu-open');
}

// Функция закрытия мобильного меню
function closeMobileMenu() {
    document.body.classList.remove('mobile-menu-open');
}

// Обработчик клика по кнопке меню
if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', function() {
        openMobileMenu();
    });
}

// Обработчик клика по кнопке закрытия
if (mobileNavClose) {
    mobileNavClose.addEventListener('click', function() {
        closeMobileMenu();
    });
}

// Обработчик клика по оверлею
if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', function() {
        closeMobileMenu();
    });
}

// Обработчик клика по ссылкам меню
if (mobileNavLinks) {
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
}
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mainNav = document.getElementById('main-nav');
    const body = document.querySelector('body');
    
    // Используем либо класс mobile-nav-toggle, либо ID mobile-toggle
    const toggleButton = mobileNavToggle || mobileToggle;
    
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            body.classList.toggle('mobile-nav-active');
            
            // Если у кнопки есть классы bi-list и bi-x, переключаем их
            if (this.classList.contains('bi-list') || this.classList.contains('bi-x')) {
                this.classList.toggle('bi-list');
                this.classList.toggle('bi-x');
            }
            
            // Переключаем класс у навигационного меню, если оно существует
            if (mainNav) {
                mainNav.classList.toggle('active');
            }
        });
        
        // Закрыть меню при клике на пункт меню
        const navLinks = document.querySelectorAll('#main-nav a, .navmenu a');
        navLinks.forEach(function(item) {
            item.addEventListener('click', function() {
                if (body.classList.contains('mobile-nav-active')) {
                    body.classList.remove('mobile-nav-active');
                    
                    if (toggleButton.classList.contains('bi-x')) {
                        toggleButton.classList.remove('bi-x');
                        toggleButton.classList.add('bi-list');
                    }
                    
                    if (mainNav && mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                    }
                }
            });
        });
        
        // Закрыть меню при клике вне его
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = event.target.closest('#main-nav') || event.target.closest('.navmenu');
            const isClickOnToggle = event.target.closest('.mobile-nav-toggle') || event.target.closest('#mobile-toggle');
            
            if (body.classList.contains('mobile-nav-active') && !isClickInsideMenu && !isClickOnToggle) {
                body.classList.remove('mobile-nav-active');
                
                if (toggleButton.classList.contains('bi-x')) {
                    toggleButton.classList.remove('bi-x');
                    toggleButton.classList.add('bi-list');
                }
                
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
            }
        });
    }

    // ===== Анимация навигации при прокрутке =====
    const header = document.querySelector('.header');
    
    function toggleHeaderClass() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('load', toggleHeaderClass);
    window.addEventListener('scroll', toggleHeaderClass);

    // ===== Активный пункт меню при прокрутке =====
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#main-nav .nav-link, .navmenu .nav-link');
    
    function highlightMenuItemOnScroll() {
        let scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightMenuItemOnScroll);
    window.addEventListener('load', highlightMenuItemOnScroll);

    // ===== Анимация счетчиков в секции статистики =====
    function animateCounter(target, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentCount = Math.floor(progress * (end - start) + start);
            target.textContent = currentCount;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    const initCounters = () => {
        const counterElements = document.querySelectorAll('.counter');
        
        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'), 10);
            animateCounter(counter, 0, target, 2000);
        });
    };
    
    // Запуск счетчиков при видимости секции
    const statsSection = document.querySelector('#stats');
    
    if (statsSection) {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        initCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(statsSection);
        } else {
            // Fallback для старых браузеров
            window.addEventListener('scroll', function checkIfInView() {
                const rect = statsSection.getBoundingClientRect();
                const isInView = (rect.top <= window.innerHeight && rect.bottom >= 0);
                
                if (isInView) {
                    initCounters();
                    window.removeEventListener('scroll', checkIfInView);
                }
            });
        }
    }

    // ===== Анимация прогресс-баров в разделе навыков =====
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillProgressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Запуск анимации навыков при видимости секции
    const skillsSection = document.querySelector('.skills-section');
    
    if (skillsSection) {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkills();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(skillsSection);
        } else {
            // Fallback для старых браузеров
            window.addEventListener('scroll', function checkIfInView() {
                const rect = skillsSection.getBoundingClientRect();
                const isInView = (rect.top <= window.innerHeight && rect.bottom >= 0);
                
                if (isInView) {
                    animateSkills();
                    window.removeEventListener('scroll', checkIfInView);
                }
            });
        }
    }

    // ===== Параллакс эффект для героя =====
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            parallaxBg.style.transform = `translateY(${scrollY * 0.3}px)`;
        });
    }

    // ===== Фильтрация для галереи сертификатов =====
    const filterButtons = document.querySelectorAll('.filter-menu li');
    const certificateItems = document.querySelectorAll('.certificate-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс нажатой кнопке
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Фильтруем элементы
            certificateItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
                
                // Добавляем анимацию появления для отображаемых элементов
                if (item.style.display === 'block') {
                    item.classList.add('fadeIn');
                    setTimeout(() => {
                        item.classList.remove('fadeIn');
                    }, 500);
                }
            });
        });
    });

    // ===== FAQ аккордеон =====
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const targetId = this.getAttribute('data-bs-target');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Обновляем атрибут aria-expanded
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Переключаем класс collapse
            const answer = document.querySelector(targetId);
            if (answer) {
                answer.classList.toggle('show');
            }
            
            // Если открываем этот вопрос, закрываем другие
            if (!isExpanded) {
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== this) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        const otherId = otherQuestion.getAttribute('data-bs-target');
                        const otherAnswer = document.querySelector(otherId);
                        if (otherAnswer) {
                            otherAnswer.classList.remove('show');
                        }
                    }
                });
            }
        });
    });

    // ===== Плавная прокрутка для всех ссылок с якорями =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Проверяем, существует ли целевой элемент
            if (targetId !== '#' && document.querySelector(targetId)) {
                const targetElement = document.querySelector(targetId);
                const offset = header ? header.offsetHeight : 0;
                
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Кнопка скролла вверх =====
    const scrollTopButton = document.querySelector('.scroll-top');
    
    if (scrollTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopButton.classList.add('active');
            } else {
                scrollTopButton.classList.remove('active');
            }
        });
        
        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== Typed.js инициализация (если загружена) =====
    const typedElement = document.querySelector('.typed');
    if (typedElement && typeof Typed !== 'undefined') {
        const typedStrings = typedElement.getAttribute('data-typed-items');
        if (typedStrings) {
            const strings = typedStrings.split(',');
            new Typed('.typed', {
                strings: strings,
                loop: true,
                typeSpeed: 100,
                backSpeed: 50,
                backDelay: 2000
            });
        }
    }

    // ===== Инициализация AOS (Анимация при прокрутке) =====
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // ===== Индикатор прокрутки страницы =====
    let scrollIndicator = document.querySelector('.scroll-progress');
    
    if (!scrollIndicator) {
        scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-progress';
        document.body.appendChild(scrollIndicator);
    }
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollIndicator.style.width = `${scrolled}%`;
    });

    // ===== Инициализация glightbox (если загружена) =====
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            selector: '.glightbox'
        });
    }

    // ===== Инициализация Swiper (если загружена) =====
    if (typeof Swiper !== 'undefined') {
        document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
            const configScript = swiperElement.querySelector(".swiper-config");
            
            if (configScript) {
                try {
                    const config = JSON.parse(configScript.innerHTML.trim());
                    new Swiper(swiperElement, config);
                } catch (e) {
                    console.error("Ошибка при инициализации Swiper:", e);
                }
            }
        });
    }
});

// ===== Удаление прелоадера после загрузки =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.remove();
  }
});

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.display = 'none'; // Вместо удаления, скрываем
  }
});

// Добавить таймаут для страховки
setTimeout(() => {
  const preloader = document.getElementById('preloader');
  if (preloader && preloader.style.display !== 'none') {
    preloader.style.display = 'none';
  }
}, 5000); // Через 5 секунд в любом случае скрыть прелоадер

// Код для паузы прокрутки при наведении (ИСПРАВЛЕННЫЙ)
document.addEventListener('DOMContentLoaded', function() {
    // Внешний контейнер, на который наводим мышь
    const cardsSection = document.querySelector('.cards-section');
    // Элемент, к которому применена анимация
    const animatedWrapper = document.querySelector('.resume-list-animated-wrapper');

    // Проверяем, что оба элемента найдены на странице
    if (cardsSection && animatedWrapper) {
        cardsSection.addEventListener('mouseenter', () => {
            // Применяем паузу к элементу с анимацией
            animatedWrapper.style.animationPlayState = 'paused';
        });

        cardsSection.addEventListener('mouseleave', () => {
            // Возобновляем анимацию на элементе с анимацией
            animatedWrapper.style.animationPlayState = 'running';
        });
    } else {
        // Выводим сообщение в консоль, если элементы не найдены (для отладки)
        if (!cardsSection) console.error('.cards-section not found for scroll pause.');
        if (!animatedWrapper) console.error('.resume-list-animated-wrapper not found for scroll pause.');
    }
});

// Инициализация слайдера для кейсов
document.addEventListener('DOMContentLoaded', function() {
    // Проверим, загружен ли уже Swiper
    if (typeof Swiper !== 'undefined') {
        initCasesSlider();
    } else {
        // Если Swiper еще не загружен, ждем его загрузки
        document.addEventListener('swiper:loaded', initCasesSlider);
    }
    
    // Функция инициализации слайдера кейсов
    function initCasesSlider() {
        const casesSlider = document.querySelector('.cases-swiper');
        if (casesSlider) {
            const configElement = casesSlider.querySelector('.swiper-config');
            if (configElement) {
                try {
                    const config = JSON.parse(configElement.textContent);
                    new Swiper('.cases-swiper', config);
                } catch (error) {
                    console.error('Ошибка инициализации слайдера кейсов:', error);
                }
            }
        }
    }
    
    // Анимация счетчиков в кейсах
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItems = entry.target.querySelectorAll('.stat-value');
                statItems.forEach(item => {
                    const value = parseInt(item.textContent);
                    if (!isNaN(value)) {
                        animateCounter(item, 0, value, 1500);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    // Находим все карточки кейсов и наблюдаем за ними
    const caseCards = document.querySelectorAll('.case-card');
    caseCards.forEach(card => {
        observer.observe(card);
    });
    
    // Функция анимации счетчика
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});

// Добавьте этот код в конец custom.js или внедрите его в существующую функцию
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация слайдера кейсов с исправленными настройками
    const casesSlider = document.querySelector('.cases-swiper');
    if (casesSlider) {
        const configElement = casesSlider.querySelector('.swiper-config');
        if (configElement) {
            try {
                const config = JSON.parse(configElement.textContent);
                
                // Дополнительные настройки для улучшения навигации
                config.navigation = {
                    nextEl: '.cases-next',
                    prevEl: '.cases-prev',
                    disabledClass: 'swiper-button-disabled',
                    hiddenClass: 'swiper-button-hidden'
                };
                
                // Уточняем параметры отступов
                config.spaceBetween = 30;
                config.slidesPerView = 1;
                
                // Улучшаем отзывчивость
                config.grabCursor = true;
                config.touchRatio = 1;
                config.shortSwipes = true;
                
                // Применяем breakpoints для адаптивности
                config.breakpoints = {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 30
                    }
                };
                
                // Инициализируем Swiper с улучшенными настройками
                new Swiper('.cases-swiper', config);
                
                // Добавляем дополнительную обработку для кнопок навигации
                const prevButton = document.querySelector('.cases-prev');
                const nextButton = document.querySelector('.cases-next');
                
                if (prevButton && nextButton) {
                    // Обработка событий для улучшения UX
                    [prevButton, nextButton].forEach(button => {
                        button.addEventListener('mouseenter', () => {
                            button.style.transform = 'scale(1.1)';
                        });
                        
                        button.addEventListener('mouseleave', () => {
                            button.style.transform = 'scale(1)';
                        });
                    });
                }
                
            } catch (error) {
                console.error('Ошибка инициализации слайдера кейсов:', error);
            }
        }
    }
    
    // Исправление поведения карточек при наведении
    const caseCards = document.querySelectorAll('.case-card');
    if (caseCards.length > 0) {
        caseCards.forEach(card => {
            // Убеждаемся, что transition очищается при покидании карточки
            card.addEventListener('mouseleave', () => {
                // Возвращаем карточку в исходное положение плавно
                card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
                card.style.transform = 'translateY(0)';
            });
        });
    }
});

