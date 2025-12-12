// Мобильное меню
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const mobileLinks = document.querySelectorAll('.mobile-nav__link');

// Открытие мобильного меню
burger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    burger.classList.add('active');
});

// Закрытие мобильного меню
closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
    burger.classList.remove('active');
});

// Закрытие меню при клике на ссылку
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        burger.classList.remove('active');
    });
});

// Закрытие меню при клике вне его области
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        burger.classList.remove('active');
    }
});

// Закрытие меню при нажатии Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        burger.classList.remove('active');
    }
});

// Плавная прокрутка для всех внутренних ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Фиксация шапки при скролле
let lastScroll = 0;
const header = document.querySelector('.header');
const scrollOffset = 100;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Прячем/показываем шапку при скролле
    if (currentScroll > lastScroll && currentScroll > scrollOffset) {
        // Прокрутка вниз
        header.classList.add('header--hidden');
    } else {
        // Прокрутка вверх
        header.classList.remove('header--hidden');
    }
    
    // Добавляем тень при скролле
    if (currentScroll > 10) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
    
    lastScroll = currentScroll;
});

// Добавляем активный класс для текущего раздела
const sections = document.querySelectorAll('section[id]');

function highlightCurrentSection() {
    const scrollY = window.pageYOffset;
    const headerHeight = header.offsetHeight;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Десктопное меню
            document.querySelectorAll('.nav__link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
            
            // Мобильное меню
            document.querySelectorAll('.mobile-nav__link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Анимация элементов при скролле
function animateOnScroll() {
    const elements = document.querySelectorAll('.brand-card, .fabric-item, .product-card, .delivery-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем анимации
    const animatedElements = document.querySelectorAll('.brand-card, .fabric-item, .product-card, .delivery-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Добавляем обработчики для социальных кнопок
    const socialButtons = document.querySelectorAll('.social-link, .nav__link--tg, .nav__link--wa');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Для внешних ссылок добавляем атрибут для аналитики
            if (this.getAttribute('href').startsWith('http')) {
                console.log('Переход по ссылке:', this.getAttribute('href'));
                // Здесь можно добавить отправку данных в аналитику
            }
        });
    });
    
    // Добавляем атрибуты для внешних ссылок
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // Инициализация текущего раздела
    highlightCurrentSection();
    
    // Запуск анимации
    setTimeout(() => {
        animateOnScroll();
    }, 300);
});

// Слушатели событий скролла
window.addEventListener('scroll', () => {
    highlightCurrentSection();
    animateOnScroll();
});

// Адаптация для ресайза окна
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Закрываем мобильное меню при ресайзе на десктоп
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            burger.classList.remove('active');
        }
    }, 250);
});

// Анимация бургера при клике
burger.addEventListener('click', function() {
    const spans = this.querySelectorAll('span');
    if (this.classList.contains('active')) {
        spans[0].style.transform = 'rotate(0deg) translateY(0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0deg) translateY(0)';
    } else {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    }
});

// Добавляем CSS для анимации бургера динамически
const burgerStyle = document.createElement('style');
burgerStyle.textContent = `
    .burger span {
        transition: all 0.3s ease;
    }
    .header--hidden {
        transform: translateY(-100%);
        transition: transform 0.3s ease;
    }
    .header--scrolled {
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    }
`;
document.head.appendChild(burgerStyle);

// Обработка кликов по кнопкам "Подробнее"
document.querySelectorAll('.btn--small').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('https://t.me/')) {
            // Можно добавить отслеживание кликов по товарам
            const productTitle = this.closest('.product-card').querySelector('.product-card__title').textContent;
            console.log('Просмотр товара:', productTitle);
        }
    });
});

// Добавляем lazy loading для изображений
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.setAttribute('src', src);
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Добавляем поддержку тач-событий для мобильных устройств
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    // Закрываем меню при свайпе вниз
    if (touchStartY - touchEndY > 50 && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        burger.classList.remove('active');
    }
}, { passive: true });