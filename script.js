// Main JavaScript file for Portfolio

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully');
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
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

    // Project filtering logic
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const projectEmptyState = document.getElementById('projectEmptyState');

    function updateProjectVisibility(category) {
        let visibleCount = 0;
        projectItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const shouldShow = category === 'all' || itemCategory === category;
            item.classList.toggle('project-hidden', !shouldShow);
            if (shouldShow) visibleCount += 1;
        });

        if (projectEmptyState) {
            projectEmptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');
            updateProjectVisibility(category);
        });
    });

    updateProjectVisibility('all');

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            formFeedback.className = 'form-feedback';
            formFeedback.textContent = '';

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            const errors = [];
            if (!name) errors.push('Name is required.');
            if (!email) errors.push('Email is required.');
            if (!message) errors.push('Message is required.');

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email)) {
                errors.push('Please enter a valid email address.');
            }

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
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const sectionElements = document.querySelectorAll('section');
    sectionElements.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
});
