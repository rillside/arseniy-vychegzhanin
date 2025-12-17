// Активация навигационных ссылок
document.addEventListener('DOMContentLoaded', function() {
    // Проверка загрузки главного фото
    const mainPhoto = document.getElementById('mainPhoto');
    const photoPlaceholder = document.getElementById('photoPlaceholder');
    
    if (mainPhoto.complete && mainPhoto.naturalWidth > 0) {
        mainPhoto.style.display = 'block';
        photoPlaceholder.style.display = 'none';
    }
    
    mainPhoto.onload = function() {
        this.style.display = 'block';
        photoPlaceholder.style.display = 'none';
    };
    
    mainPhoto.onerror = function() {
        photoPlaceholder.style.display = 'block';
    };
    
    // Плавная прокрутка для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            if (href === '#news') {
                // Для новостного проекта обрабатываем отдельно
                return;
            }
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Обновляем активную ссылку
                updateActiveNavLink(href);
            }
        });
    });
    
    // Переключение мобильного меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Обновление активной ссылки при скролле
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                updateActiveNavLink('#' + sectionId);
            }
        });
    });
    
    // Анимация карточек при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.project-card, .about-card').forEach(card => {
        observer.observe(card);
    });
    
    // Обработка кликов по проектам
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').includes('project')) {
                // Для внешних проектов ничего не делаем - откроется в новой вкладке
                return;
            }
            
            if (this.textContent.includes('Показать на сайте')) {
                e.preventDefault();
                showNewsProject();
            }
        });
    });
    
    // Инициализация
    updateActiveNavLink('#home');
});

// Функция обновления активной ссылки
function updateActiveNavLink(targetId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`.nav-link[href="${targetId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Функция показа новостного проекта
function showNewsProject() {
    const newsSection = document.getElementById('news');
    const newsContent = document.querySelector('.news-content');
    
    // Контент проекта 6 (новости Антарктиды)
    const newsHTML = `
        <div class="news-article">
            <h3>ШОК В АНТАРКТИДЕ: БЕЛЫЕ МЕДВЕДИ ИЗНАСИЛОВАЛИ ПУТЕШЕСТВЕННИКА</h3>
            
            <div class="news-meta">
                <span><i class="fas fa-calendar"></i> 15 декабря 2025</span>
                <span><i class="fas fa-map-marker-alt"></i> Антарктида, 75°S 0°E</span>
            </div>
            
            <div class="news-quote">
                <blockquote>
                    "Я шел по снежной пустыне, любовался северным сиянием, 
                    как вдруг из-за айсберга появились они... Я думал, они хотят поиграть, 
                    но они хотели совсем другого. Теперь у меня разорванное очко, 
                    зато есть история для внуков!"
                </blockquote>
                <p class="quote-author">— Вычегжанин Арсений Константинович, 16 лет, выживший</p>
            </div>
            
            <div class="news-details">
                <h4>Детали происшествия:</h4>
                <ul>
                    <li>Дата: 14 декабря 2025 года</li>
                    <li>Место: Антарктида, ледник Уилкса</li>
                    <li>Температура: -42°C во время атаки</li>
                    <li>Пострадавший: Вычегжанин А.К., 16 лет, г. Киров</li>
                    <li>Нападавшие: 3 белых медведя</li>
                </ul>
                
                <h4>Медицинский диагноз:</h4>
                <ul>
                    <li>Разрыв анального сфинктера 3-й степени</li>
                    <li>Обморожение ягодичных мышц</li>
                    <li>Острая медведефобия</li>
                    <li>Психологическая травма</li>
                </ul>
            </div>
            
            <div class="news-images">
                <div class="image-container">
                    <div class="image-frame">
                        <img src="img/main_photo.jpg" alt="Пострадавший" onerror="this.style.display='none'">
                        <div class="image-caption">Пострадавший: Вычегжанин Арсений</div>
                    </div>
                </div>
            </div>
            
            <div class="news-conclusion">
                <p>16-летний Арсений Вычегжанин из Кирова отправился в самостоятельную экспедицию 
                в Антарктиду. На третий день путешествия на него напали белые медведи. 
                Подросток получил серьёзные травмы, но выжил и был эвакуирован на материк.</p>
                
                <p>Эксперты предполагают, что медведи перепутали яркую куртку Арсения 
                с самкой медведя в период гона. Также вероятно влияние полярной ночи, 
                которая вызывает гормональные нарушения у хищников.</p>
            </div>
            
            <div class="news-back">
                <button onclick="hideNewsProject()" class="btn btn-primary">
                    <i class="fas fa-arrow-left"></i> Вернуться к проектам
                </button>
            </div>
        </div>
    `;
    
    newsContent.innerHTML = newsHTML;
    newsSection.style.display = 'block';
    
    // Прокрутка к секции
    window.scrollTo({
        top: newsSection.offsetTop - 80,
        behavior: 'smooth'
    });
    
    // Обновление навигации
    updateActiveNavLink('#news');
}

// Функция скрытия новостного проекта
function hideNewsProject() {
    const newsSection = document.getElementById('news');
    newsSection.style.display = 'none';
    
    // Прокрутка к проектам
    const projectsSection = document.getElementById('projects');
    window.scrollTo({
        top: projectsSection.offsetTop - 80,
        behavior: 'smooth'
    });
    
    // Обновление навигации
    updateActiveNavLink('#projects');
}

// Анимация при наведении на карточки
document.addEventListener('mouseover', function(e) {
    const card = e.target.closest('.project-card, .about-card, .contact-card');
    if (card && !card.classList.contains('hovered')) {
        card.classList.add('hovered');
        setTimeout(() => card.classList.remove('hovered'), 300);
    }
}, true);

// Загрузка проектов по требованию (ленивая загрузка)
function loadProject(projectNumber) {
    const projectURL = `projects/project${projectNumber}.html`;
    
    // Показываем индикатор загрузки
    const projectCard = document.querySelector(`.project-card:nth-child(${projectNumber})`);
    if (projectCard) {
        const originalContent = projectCard.querySelector('.project-content').innerHTML;
        projectCard.querySelector('.project-content').innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Загрузка проекта...</p>
            </div>
        `;
        
        // Имитация загрузки
        setTimeout(() => {
            window.open(projectURL, '_blank');
            projectCard.querySelector('.project-content').innerHTML = originalContent;
        }, 1000);
    }
}

// Автоматическое обновление года в футере
const yearSpan = document.querySelector('.current-year');
if (yearSpan) {
    yearSpan.textContent = new