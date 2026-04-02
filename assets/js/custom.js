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
    if (mobileToggleBtn) mobileToggleBtn.style.display = 'none';
}

// Функция закрытия мобильного меню
function closeMobileMenu() {
    document.body.classList.remove('mobile-menu-open');
    if (mobileToggleBtn) mobileToggleBtn.style.display = '';
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
    let ticking = false;
    
    return function() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    };
}

const optimizedHeaderToggle = toggleHeaderClass();
window.addEventListener('load', optimizedHeaderToggle);
window.addEventListener('scroll', optimizedHeaderToggle);

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

// Оптимизируем вызов функции при прокрутке
let highlightTicking = false;
window.addEventListener('scroll', () => {
    if (!highlightTicking) {
        window.requestAnimationFrame(() => {
            highlightMenuItemOnScroll();
            highlightTicking = false;
        });
        highlightTicking = true;
    }
});
window.addEventListener('load', highlightMenuItemOnScroll);
    
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

    // ===== Параллакс эффект для героя - ОПТИМИЗИРОВАН =====
const parallaxBg = document.querySelector('.parallax-bg');

if (parallaxBg) {
    // Используем throttle для ограничения частоты вызовов
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                // Уменьшаем коэффициент для более плавного эффекта
                parallaxBg.style.transform = `translate3d(0, ${scrollY * 0.15}px, 0)`;
                ticking = false;
            });
            ticking = true;
        }
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
            
            // Фильтруем элементы — скрываем родительский .col чтобы сетка перестраивалась
            certificateItems.forEach(item => {
                const col = item.closest('.col-lg-4, .col-md-6, [class*="col-"]');
                const show = filterValue === 'all' || item.getAttribute('data-category') === filterValue;
                
                if (col) {
                    col.style.display = show ? '' : 'none';
                }
                
                // Добавляем анимацию появления для отображаемых элементов
                if (show) {
                    item.classList.add('fadeIn');
                    setTimeout(() => {
                        item.classList.remove('fadeIn');
                    }, 500);
                }
            });
        });
    });

    // ===== FAQ — управляется Bootstrap Collapse (data-bs-toggle + data-bs-parent) =====

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
    // Оптимизируем показ/скрытие кнопки
    let scrollButtonTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollButtonTicking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 300) {
                    scrollTopButton.classList.add('active');
                } else {
                    scrollTopButton.classList.remove('active');
                }
                scrollButtonTicking = false;
            });
            scrollButtonTicking = true;
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

// Оптимизированная функция обновления прогресса
function updateScrollProgress() {
    let ticking = false;
    
    return function() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (window.scrollY / windowHeight) * 100;
                scrollIndicator.style.width = `${scrolled}%`;
                ticking = false;
            });
            ticking = true;
        }
    };
}

window.addEventListener('scroll', updateScrollProgress());

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

// ===== Smooth Preloader Exit =====
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => preloader.remove(), 400);
    }
});

// Fallback — faster
setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => preloader.remove(), 400);
    }
}, 2000);

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
        try {
            // Инициализация с фиксированной высотой
            new Swiper('.cases-swiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                // Важно: отключаем autoHeight
                autoHeight: false,
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                pagination: {
                    el: '.cases-pagination',
                    clickable: true,
                    dynamicBullets: true
                },
                navigation: {
                    nextEl: '.cases-button-next',
                    prevEl: '.cases-button-prev',
                    disabledClass: 'swiper-button-disabled',
                    hiddenClass: 'swiper-button-hidden'
                },
                // Улучшаем отзывчивость
                grabCursor: true,
                touchRatio: 1,
                shortSwipes: true,
                // Применяем breakpoints для адаптивности
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 30
                    }
                },
                on: {
                    init: function() {
                        console.log('Cases slider initialized successfully');
                        // Установка одинаковой высоты для всех слайдов
                        setEqualHeight();
                    },
                    slideChangeTransitionStart: function() {
                        // Сохраняем текущую позицию скролла
                        this.scrollY = window.scrollY;
                        
                        // Добавляем класс для предотвращения автоскролла
                        const casesSection = document.querySelector('.cases-section');
                        if (casesSection) {
                            casesSection.classList.add('animating');
                        }
                    },
                    slideChangeTransitionEnd: function() {
                        // Восстанавливаем позицию скролла
                        if (this.scrollY !== undefined) {
                            window.scrollTo(0, this.scrollY);
                        }
                        
                        // Удаляем класс после завершения анимации
                        const casesSection = document.querySelector('.cases-section');
                        if (casesSection) {
                            casesSection.classList.remove('animating');
                        }
                    }
                }
            });
            
            // Функция для установки одинаковой высоты всем слайдам
            function setEqualHeight() {
                const slides = document.querySelectorAll('.case-card');
                let maxHeight = 0;
                
                // Находим максимальную высоту
                slides.forEach(slide => {
                    slide.style.height = 'auto'; // Сбрасываем высоту
                    const height = slide.offsetHeight;
                    if (height > maxHeight) {
                        maxHeight = height;
                    }
                });
                
                // Устанавливаем единую высоту всем слайдам
                if (maxHeight > 0) {
                    slides.forEach(slide => {
                        slide.style.height = maxHeight + 'px';
                    });
                }
            }
            
            // Вызываем функцию при изменении размера окна
            window.addEventListener('resize', setEqualHeight);
            
            // Добавляем дополнительную обработку для кнопок навигации
            const prevButton = document.querySelector('.cases-button-prev');
            const nextButton = document.querySelector('.cases-button-next');
            
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

// Оптимизированная функция для инициализации всех слайдеров
function initAllSliders() {
    // Проверяем, загружен ли Swiper
    if (typeof Swiper === 'undefined') {
        console.log('Swiper не загружен, пропускаем инициализацию слайдеров');
        return;
    }
    
    // Слайдер отзывов
    if (document.querySelector('.testimonialSwiper')) {
        new Swiper(".testimonialSwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: ".testimonial-pagination",
                clickable: true
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            }
        });
    }
    
    // Слайдер кейсов для десктопов
    if (document.querySelector('.cases-swiper-desktop')) {
        new Swiper('.cases-swiper-desktop', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoHeight: true,
            pagination: {
                el: '.desktop-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.desktop-next',
                prevEl: '.desktop-prev',
            }
        });
    }
    
    // Слайдер кейсов для мобильных
    if (document.querySelector('.cases-swiper-mobile')) {
        new Swiper('.cases-swiper-mobile', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoHeight: true,
            pagination: {
                el: '.mobile-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.mobile-next',
                prevEl: '.mobile-prev',
            }
        });
    }
    
    console.log('Все слайдеры успешно инициализированы');
}

// Вызываем функцию после загрузки документа
document.addEventListener('DOMContentLoaded', function() {
    // Откладываем инициализацию слайдеров на 100мс
    // для лучшей производительности начальной загрузки
    setTimeout(initAllSliders, 100);
});
// ================================================================
// VISUAL ENHANCEMENTS — 2026 POLISH
// ================================================================

// ===== Glassmorphism Header on Scroll =====
(function() {
    const header = document.getElementById('header');
    if (!header) return;
    
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                if (window.scrollY > 80) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
})();

// ===== Section Reveal — handled by AOS (already included) =====

// ===== Images handled natively =====

// ===== Enhanced Scroll Progress Bar =====
(function() {
    var progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    var ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                var scrollTop = window.scrollY;
                var docHeight = document.documentElement.scrollHeight - window.innerHeight;
                var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                progressBar.style.width = progress + '%';
                ticking = false;
            });
            ticking = true;
        }
    });
})();

// ===== Magnetic Effect on CTA Buttons =====
(function() {
    var buttons = document.querySelectorAll('.btn-main, .btn-telegram, .send-button');
    
    buttons.forEach(function(btn) {
        btn.addEventListener('mousemove', function(e) {
            var rect = this.getBoundingClientRect();
            var x = e.clientX - rect.left - rect.width / 2;
            var y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
})();

// ===== Smooth Counter Animation with Easing =====
(function() {
    // Override the counter animation with a smoother easing version
    var counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(target)) return;
        
        var duration = 2000;
        var start = performance.now();

        function update(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            var easedProgress = easeOutExpo(progress);
            
            el.textContent = Math.round(target * easedProgress);
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    var counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function(counter) {
        counterObserver.observe(counter);
    });
})();

// ===== Tilt Effect on Service Cards =====
(function() {
    if (window.innerWidth < 992) return; // Only desktop
    
    document.querySelectorAll('.service-card').forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            var rect = this.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width;
            var y = (e.clientY - rect.top) / rect.height;
            
            var rotateX = (y - 0.5) * -8;
            var rotateY = (x - 0.5) * 8;
            
            this.style.transform = 'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.transition = 'transform 0.5s ease';
            setTimeout(function() { card.style.transition = ''; }, 500);
        });
    });
})();
// ================================================================
// MOBILE FLOATING CONTACT BUTTON (FAB)
// ================================================================
(function() {
    var fab = document.getElementById('mobile-fab');
    var trigger = document.getElementById('fab-trigger');
    if (!fab || !trigger) return;

    // Создаём оверлей динамически
    var overlay = document.createElement('div');
    overlay.className = 'fab-overlay';
    document.body.appendChild(overlay);

    var isOpen = false;

    function openFab() {
        isOpen = true;
        fab.classList.add('fab-open', 'fab-seen');
        overlay.classList.add('fab-overlay-visible');
    }

    function closeFab() {
        isOpen = false;
        fab.classList.remove('fab-open');
        overlay.classList.remove('fab-overlay-visible');
    }

    trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        if (isOpen) {
            closeFab();
        } else {
            openFab();
        }
    });

    overlay.addEventListener('click', function() {
        closeFab();
    });

    // Закрываем при тапе по опции (после перехода)
    var options = fab.querySelectorAll('.fab-option');
    options.forEach(function(opt) {
        opt.addEventListener('click', function() {
            // Небольшая задержка, чтобы пользователь видел тап
            setTimeout(closeFab, 200);
        });
    });

    // Прятать FAB при быстром скролле вниз, показывать при скролле вверх
    var lastScrollY = window.scrollY;
    var scrollTicking = false;

    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            requestAnimationFrame(function() {
                var currentY = window.scrollY;
                var delta = currentY - lastScrollY;

                // Прячем только при быстром скролле вниз (> 8px за кадр)
                // и если мы не в самом верху / самом низу
                if (delta > 8 && currentY > 300 && !isOpen) {
                    fab.classList.add('fab-hidden');
                } else if (delta < -3 || currentY < 100) {
                    fab.classList.remove('fab-hidden');
                }

                lastScrollY = currentY;
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // Закрываем если пользователь нажал Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isOpen) closeFab();
    });
})();