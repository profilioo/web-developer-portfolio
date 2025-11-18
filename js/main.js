// ================================
// Main Portfolio JavaScript
// ================================

(function() {
    'use strict';

    // ================================
    // Theme Management
    // ================================
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Initialize theme from localStorage or default to light
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Toggle theme
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add a subtle animation feedback
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    }
    
    themeToggle.addEventListener('click', toggleTheme);
    initTheme();

    // ================================
    // Mobile Menu Toggle
    // ================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    }
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // ================================
    // Navbar Scroll Effect
    // ================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    function handleNavbarScroll() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }
    
    window.addEventListener('scroll', handleNavbarScroll);

    // ================================
    // Smooth Scroll for Anchor Links
    // ================================
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const navbarHeight = navbar.offsetHeight;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                smoothScroll(href);
            }
        });
    });

    // ================================
    // Scroll Animations
    // ================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in class
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in');
        animatedElements.forEach(el => observer.observe(el));
        
        // Also observe section headers and cards
        const sections = document.querySelectorAll('.section-header, .skill-card, .project-card, .about-content, .contact-content');
        sections.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
    
    // Initialize scroll animations after page load
    window.addEventListener('load', initScrollAnimations);

    // ================================
    // Scroll to Top Button
    // ================================
    const scrollTopBtn = document.getElementById('scrollTop');
    
    function handleScrollTopButton() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
    
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    window.addEventListener('scroll', handleScrollTopButton);
    scrollTopBtn.addEventListener('click', scrollToTop);

    // ================================
    // Active Navigation Link Highlighting
    // ================================
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = navbar.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const currentId = section.getAttribute('id');
                
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);

    // ================================
    // Contact Form Handling
    // ================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Validate form data
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission (in a real app, you would send this to a server)
        console.log('Form submitted:', data);
        
        // Show success message
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
        
        // Reset form and hide success message after 5 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            formSuccess.classList.remove('show');
        }, 5000);
    }
    
    contactForm.addEventListener('submit', handleFormSubmit);

    // ================================
    // Download Resume Button
    // ================================
    const downloadResumeBtn = document.getElementById('downloadResume');
    
    function handleResumeDownload(e) {
        e.preventDefault();
        
        // Create a sample resume data
        const resumeContent = `
        ${user.name}
        Frontend Web Developer
        
        CONTACT INFORMATION
        Email: ${user.email}
        Phone: ${user.phone}
        Location: ${user.address}
        
        SUMMARY
        ${user.about}
        
        SKILLS
        - HTML5, CSS3, JavaScript (ES6+)
        - React, Node.js, TypeScript
        - Git, NPM, Sass
        - Responsive Design, UI/UX
        - Figma, MongoDB
        
        EXPERIENCE

        5+ Years Experience
        
        Portfolio: ${window.location.href}
        `;
        
        // Create a blob and download
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Show feedback
        const originalText = downloadResumeBtn.innerHTML;
        downloadResumeBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
        downloadResumeBtn.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            downloadResumeBtn.innerHTML = originalText;
            downloadResumeBtn.style.backgroundColor = '';
        }, 2000);
    }
    
    downloadResumeBtn.addEventListener('click', handleResumeDownload);

    // ================================
    // Project Card Interactions
    // ================================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });

    // ================================
    // Typing Effect for Hero Role
    // ================================
    function typingEffect() {
        const heroRole = document.querySelector('.hero-role');
        if (!heroRole) return;
        
        const text = heroRole.textContent;
        heroRole.textContent = '';
        heroRole.style.opacity = '1';
        
        let index = 0;
        const speed = 100; // milliseconds per character
        
        function type() {
            if (index < text.length) {
                heroRole.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }
        
        // Start typing after a short delay
        setTimeout(type, 500);
    }
    
    // Run typing effect on page load
    window.addEventListener('load', typingEffect);

    // ================================
    // Skill Cards Stagger Animation
    // ================================
    function staggerSkillCards() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    window.addEventListener('load', staggerSkillCards);

    // ================================
    // Image Lazy Loading Enhancement
    // ================================
    function enhanceLazyLoading() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.loading = 'lazy';
            
            // Add fade-in effect when image loads
            img.addEventListener('load', function() {
                this.style.opacity = '0';
                this.style.transition = 'opacity 0.5s ease-in';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 50);
            });
        });
    }
    
    enhanceLazyLoading();

    // ================================
    // Performance Optimization: Debounce Function
    // ================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Debounced scroll handler for performance
    const debouncedScrollHandler = debounce(() => {
        handleNavbarScroll();
        handleScrollTopButton();
        highlightActiveSection();
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);

    // ================================
    // Easter Egg: Konami Code
    // ================================
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        // Add a fun confetti effect or special message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem 3rem;
            border-radius: 1rem;
            font-size: 1.5rem;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: fadeInUp 0.5s ease-out;
        `;
        message.innerHTML = '🎉 You found the secret! 🎉<br><small style="font-size: 1rem;">You\'re a true developer!</small>';
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => message.remove(), 500);
        }, 3000);
    }

    // ================================
    // Console Message for Developers
    // ================================
    console.log('%c Profilioo', 'font-size: 20px; font-weight: bold; color: #4A90E2;');
    console.log('%cLove the code? Let\'s connect with Profilioo', 'font-size: 14px; color: #666;');
    console.log('%cEmail: mailprofilioo@gmail.com', 'font-size: 12px; color: #999;');


    
})();