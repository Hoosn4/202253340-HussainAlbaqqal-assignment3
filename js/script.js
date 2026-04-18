// Main JavaScript file for Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (sidebarNav) {
        sidebarNav.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;

            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = targetId ? document.querySelector(targetId) : null;
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Theme toggling and persistence (Assignment 2)
    const themeToggleBtn = document.getElementById('themeToggle');
    let currentTheme = 'light';

    function loadTheme() {
        try {
            const saved = localStorage.getItem('portfolioTheme');
            if (saved === 'dark' || saved === 'light') {
                currentTheme = saved;
            }
        } catch (error) {
            console.warn('localStorage unavailable:', error);
            currentTheme = 'light';
        }
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem('portfolioTheme', theme);
        } catch (error) {
            console.warn('Could not save theme to localStorage:', error);
        }
    }

    function applyTheme(theme) {
        document.body.classList.toggle('dark-mode', theme === 'dark');
        document.body.classList.toggle('light-mode', theme === 'light');
        if (themeToggleBtn) {
            themeToggleBtn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
        }
        saveTheme(theme);
    }

    if (themeToggleBtn) {
        loadTheme();
        applyTheme(currentTheme);
        themeToggleBtn.addEventListener('click', function() {
            const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            currentTheme = nextTheme;
            applyTheme(nextTheme);
        });
    }

    // Dynamic greeting logic
    function updateGreeting() {
        const greetingElement = document.getElementById('dynamicGreeting');
        if (!greetingElement) return;
        const hour = new Date().getHours();
        let greeting = "Good Day, I'm Hussain Albaggal";
        if (hour >= 5 && hour < 12) greeting = "Good Morning, I'm Hussain Albaggal";
        else if (hour >= 12 && hour < 18) greeting = "Good Afternoon, I'm Hussain Albaggal";
        else greeting = "Good Evening, I'm Hussain Albaggal";
        greetingElement.textContent = greeting;
    }
    updateGreeting();

    // Visit timer logic
    const visitTimer = document.getElementById('visitTimer');
    const visitStartedAt = Date.now();

    function formatElapsedTime(totalSeconds) {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    function updateVisitTimer() {
        if (!visitTimer) return;
        const elapsedSeconds = Math.floor((Date.now() - visitStartedAt) / 1000);
        visitTimer.textContent = formatElapsedTime(elapsedSeconds);
    }

    updateVisitTimer();
    setInterval(updateVisitTimer, 1000);

    // Weather API integration
    const weatherStatus = document.getElementById('weatherStatus');
    const weatherTemperature = document.getElementById('weatherTemperature');
    const weatherUpdated = document.getElementById('weatherUpdated');
    const WEATHER_CACHE_KEY = 'portfolioWeatherCacheV1';
    const WEATHER_CACHE_TTL_MS = 10 * 60 * 1000;

    function setWeatherLoading() {
        weatherStatus.classList.remove('error');
        weatherStatus.textContent = 'Loading temperature...';
        weatherTemperature.textContent = '--';
        weatherUpdated.textContent = '';
    }

    function renderWeather(temperature, updatedAt) {
        weatherTemperature.textContent = `${temperature}°C`;
        weatherStatus.textContent = '';
        weatherUpdated.textContent = `Last updated: ${updatedAt.toLocaleString()}`;
    }

    function readWeatherCache() {
        try {
            const rawCache = localStorage.getItem(WEATHER_CACHE_KEY);
            if (!rawCache) return null;

            const parsed = JSON.parse(rawCache);
            const isFresh = parsed && typeof parsed.cachedAt === 'number' && Date.now() - parsed.cachedAt < WEATHER_CACHE_TTL_MS;
            const hasData = parsed && typeof parsed.temperature === 'number' && parsed.updatedAt;

            if (isFresh && hasData) {
                return parsed;
            }

            return null;
        } catch {
            return null;
        }
    }

    function writeWeatherCache(temperature, updatedAt) {
        try {
            const cachePayload = {
                temperature,
                updatedAt,
                cachedAt: Date.now()
            };
            localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(cachePayload));
        } catch {
            // Ignore cache writes if storage is unavailable.
        }
    }

    async function loadWeather() {
        if (!weatherStatus || !weatherTemperature || !weatherUpdated) return;

        const weatherApiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=26.2361&longitude=50.0393&current=temperature_2m&timezone=auto';

        try {
            const cachedWeather = readWeatherCache();
            if (cachedWeather) {
                renderWeather(cachedWeather.temperature, new Date(cachedWeather.updatedAt));
                return;
            }

            setWeatherLoading();

            const response = await fetch(weatherApiUrl);
            if (!response.ok) {
                throw new Error(`Weather request failed with status ${response.status}`);
            }

            const data = await response.json();
            const currentWeather = data?.current;
            const temperature = typeof currentWeather?.temperature_2m === 'number'
                ? currentWeather.temperature_2m
                : null;

            if (temperature === null) {
                throw new Error('Temperature data was not available in the API response.');
            }

            const updatedAt = currentWeather.time ? new Date(currentWeather.time) : new Date();
            renderWeather(temperature, updatedAt);
            writeWeatherCache(temperature, updatedAt.toISOString());
        } catch (error) {
            console.error('Unable to load weather data:', error);
            weatherStatus.classList.add('error');
            weatherStatus.textContent = 'Weather unavailable';
            weatherTemperature.textContent = '--';
            weatherUpdated.textContent = '';
        }
    }

    loadWeather();

    // Show/hide section state
    const sectionToggleButtons = document.querySelectorAll('.section-toggle-btn');

    function setSectionVisibility(button, content, isVisible) {
        if (!button || !content) return;
        content.classList.toggle('is-hidden', !isVisible);
        button.setAttribute('aria-expanded', String(isVisible));

        const sectionName = button.dataset.sectionName || 'Section';
        button.textContent = `${isVisible ? 'Hide' : 'Show'} ${sectionName} Section`;
    }

    sectionToggleButtons.forEach(button => {
        const targetId = button.dataset.target;
        const content = targetId ? document.getElementById(targetId) : null;
        if (!content) return;

        setSectionVisibility(button, content, true);

        button.addEventListener('click', () => {
            const isVisible = button.getAttribute('aria-expanded') === 'true';
            setSectionVisibility(button, content, !isVisible);
        });
    });

    // Project filtering logic
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const projectList = document.getElementById('projectList');
    const projectItems = Array.from(document.querySelectorAll('.project-item'));
    const projectEmptyState = document.getElementById('projectEmptyState');
    const projectSort = document.getElementById('projectSort');
    const projectResultsSummary = document.getElementById('projectResultsSummary');
    const experienceLevel = document.getElementById('experienceLevel');
    let activeCategory = 'all';
    let activeSort = 'date-desc';
    let activeLevel = 'beginner';

    function sortProjects(items, sortValue) {
        const sortedItems = [...items];

        sortedItems.sort((firstItem, secondItem) => {
            const firstTitle = firstItem.dataset.title || '';
            const secondTitle = secondItem.dataset.title || '';
            const firstDate = firstItem.dataset.date || '';
            const secondDate = secondItem.dataset.date || '';

            if (sortValue === 'date-asc') {
                return firstDate.localeCompare(secondDate);
            }

            if (sortValue === 'title-asc') {
                return firstTitle.localeCompare(secondTitle);
            }

            return secondDate.localeCompare(firstDate);
        });

        return sortedItems;
    }

    function getCategoryLabel(category) {
        if (category === 'web') return 'web projects';
        if (category === 'ml') return 'machine learning projects';
        return 'all projects';
    }

    function getSortLabel(sortValue) {
        if (sortValue === 'date-asc') return 'oldest first';
        if (sortValue === 'title-asc') return 'title A-Z';
        return 'newest first';
    }

    function renderProjects() {
        const filteredProjects = projectItems.filter(item => {
            const itemCategory = item.dataset.category;
            const itemLevel = item.dataset.level;
            const matchesCategory = activeCategory === 'all' || itemCategory === activeCategory;
            const matchesLevel = itemLevel === activeLevel;
            return matchesCategory && matchesLevel;
        });

        const sortedProjects = sortProjects(filteredProjects, activeSort);

        projectItems.forEach(item => item.classList.add('project-hidden'));

        if (projectList) {
            const fragment = document.createDocumentFragment();
            sortedProjects.forEach(item => {
                item.classList.remove('project-hidden');
                fragment.appendChild(item);
            });
            projectList.appendChild(fragment);
        }

        if (projectEmptyState) {
            projectEmptyState.style.display = sortedProjects.length === 0 ? 'block' : 'none';
        }

        if (projectResultsSummary) {
            projectResultsSummary.textContent = `Showing ${activeLevel} ${getCategoryLabel(activeCategory)} sorted by ${getSortLabel(activeSort)}.`;
        }
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.filter || 'all';
            renderProjects();
        });
    });

    if (projectSort) {
        projectSort.addEventListener('change', () => {
            activeSort = projectSort.value;
            renderProjects();
        });
    }

    if (experienceLevel) {
        experienceLevel.addEventListener('change', () => {
            activeLevel = experienceLevel.value;
            renderProjects();
        });
    }

    renderProjects();

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const contactInputs = [
        nameInput,
        emailInput,
        subjectInput,
        messageInput
    ].filter(Boolean);

    function setInputErrorState(input, hasError) {
        if (!input) return;
        input.classList.toggle('input-error', hasError);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            formFeedback.className = 'form-feedback';
            formFeedback.textContent = '';

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput.value.trim();
            const message = messageInput.value.trim();

            const errors = [];
            contactInputs.forEach(input => setInputErrorState(input, false));

            if (!name) errors.push('Name is required.');
            if (!email) errors.push('Email is required.');
            if (!subject) errors.push('Subject is required.');
            if (!message) errors.push('Message is required.');

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email)) {
                errors.push('Please enter a valid email address.');
            }
            if (name && name.length < 3) {
                errors.push('Name must be at least 3 characters long.');
            }
            if (subject && subject.length < 5) {
                errors.push('Subject must be at least 5 characters long.');
            }
            if (message && message.length < 20) {
                errors.push('Message must be at least 20 characters long.');
            }

            if (!name || (name && name.length < 3)) setInputErrorState(nameInput, true);
            if (!email || (email && !emailRegex.test(email))) setInputErrorState(emailInput, true);
            if (!subject || (subject && subject.length < 5)) setInputErrorState(subjectInput, true);
            if (!message || (message && message.length < 20)) setInputErrorState(messageInput, true);

            if (errors.length > 0) {
                formFeedback.classList.add('error');
                formFeedback.innerHTML = errors.map(item => `<div>${item}</div>`).join('');
                return;
            }

            formFeedback.classList.add('success');
            formFeedback.textContent = 'Message sent successfully!';
            contactForm.reset();
        });

        ['input', 'change'].forEach(eventType => {
            contactForm.addEventListener(eventType, () => {
                if (formFeedback) {
                    formFeedback.className = 'form-feedback';
                    formFeedback.textContent = '';
                }

                contactInputs.forEach(input => setInputErrorState(input, false));
            });
        });
    }

    // Add animation to elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const sectionElements = document.querySelectorAll('section');
    sectionElements.forEach(section => {
        section.classList.add('section-reveal');
        observer.observe(section);
    });
});
