/* ===================================
   KIM'S BARBERSHOP - INTERACTIVE SCRIPT
   =================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // ==========================================
    // STICKY HEADER ON SCROLL
    // ==========================================
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for empty hash or just "#"
            if (href === '#' || href === '') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // SCROLL ANIMATIONS (FADE IN)
    // ==========================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // ==========================================
    // 3D FLIP CARDS (Touch Support for Mobile)
    // ==========================================
    const flipCards = document.querySelectorAll('.flip-card');
    
    // Check if device is touch-enabled
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        flipCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Prevent flip if clicking on a link/button inside
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                    return;
                }
                this.classList.toggle('flipped');
            });
        });
    }
    
    // ==========================================
    // FLOATING PARTICLES ANIMATION
    // ==========================================
    const particleContainer = document.querySelector('.floating-particles');
    
    if (particleContainer) {
        createParticles();
    }
    
    function createParticles() {
        const particleCount = window.innerWidth < 768 ? 15 : 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(0, 217, 255, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: float ${Math.random() * 10 + 15}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            particleContainer.appendChild(particle);
        }
    }
    
    // Add CSS animation for particles
    if (!document.getElementById('particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.5);
                    opacity: 0.8;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ==========================================
    // FORM VALIDATION (if contact form is added later)
    // ==========================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff0000';
                    input.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
                } else {
                    input.style.borderColor = '';
                    input.style.boxShadow = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // ==========================================
    // PARALLAX EFFECT ON SCROLL
    // ==========================================
    const parallaxElements = document.querySelectorAll('.grid-background');
    
    if (parallaxElements.length > 0 && !isTouchDevice) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `perspective(500px) rotateX(60deg) translateY(${yPos}px)`;
            });
        });
    }
    
    // ==========================================
    // LAZY LOADING FOR IMAGES
    // ==========================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ==========================================
    // SERVICE CARD HOVER SOUND EFFECT (Optional)
    // ==========================================
    const serviceCards = document.querySelectorAll('.service-card, .pricing-card, .flip-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
    });
    
    // ==========================================
    // BUTTON RIPPLE EFFECT
    // ==========================================
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                left: ${x}px;
                top: ${y}px;
                transform: translate(-50%, -50%) scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    if (!document.getElementById('ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: translate(-50%, -50%) scale(20);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ==========================================
    // TYPING EFFECT FOR HERO SLOGAN (Optional)
    // ==========================================
    const heroSlogan = document.querySelector('.hero-slogan');
    
    if (heroSlogan && window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        const originalText = heroSlogan.textContent;
        heroSlogan.textContent = '';
        heroSlogan.style.opacity = '1';
        
        let charIndex = 0;
        const typingSpeed = 30;
        
        function typeText() {
            if (charIndex < originalText.length) {
                heroSlogan.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, typingSpeed);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeText, 800);
    }
    
    // ==========================================
    // CURSOR TRAIL EFFECT (Desktop Only)
    // ==========================================
    if (!isTouchDevice && window.innerWidth > 1024) {
        let cursorTrail = [];
        const trailLength = 15;
        
        document.addEventListener('mousemove', function(e) {
            cursorTrail.push({x: e.clientX, y: e.clientY});
            
            if (cursorTrail.length > trailLength) {
                cursorTrail.shift();
            }
            
            // Create trail element
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: fixed;
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background: rgba(0, 217, 255, 0.3);
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                transform: translate(-50%, -50%);
                animation: cursorFade 0.5s ease-out forwards;
            `;
            
            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 500);
        });
        
        // Add cursor fade animation
        if (!document.getElementById('cursor-animation')) {
            const style = document.createElement('style');
            style.id = 'cursor-animation';
            style.textContent = `
                @keyframes cursorFade {
                    to {
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // ==========================================
    // PERFORMANCE OPTIMIZATION
    // ==========================================
    
    // Debounce function for scroll events
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
    
    // Apply debounce to scroll events if needed
    const debouncedScroll = debounce(function() {
        // Any heavy scroll-based operations can go here
    }, 10);
    
    window.addEventListener('scroll', debouncedScroll);
    
    // ==========================================
    // CONSOLE MESSAGE (Easter Egg)
    // ==========================================
    console.log('%c👨‍🦲 KIM\'S BARBERSHOP', 'color: #00D9FF; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #00D9FF;');
    console.log('%cLooking for quality? You found it. 💈', 'color: #00FFF5; font-size: 14px;');
    console.log('%c"Cheap barbers are not skilled, skilled barbers are not cheap."', 'color: #C0C0C0; font-style: italic;');
    
    // ==========================================
    // HAIRCUT GALLERY WITH PAGINATION
    // ==========================================
    const haircutsGrid = document.getElementById('haircutsGrid');
    const showMoreBtn = document.getElementById('showMoreBtn');
    const haircutCount = document.getElementById('haircutCount');
    
    if (haircutsGrid) {
        // Sample haircut data - You can add up to 100+ items here
        const haircuts = [
            {
                name: "The Fade",
                image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&h=600&fit=crop",
                description: "A timeless classic featuring a gradual transition from short to long hair. Perfect for professionals and trendsetters alike. Low maintenance with maximum style impact. Works with all hair types and face shapes.",
                price: "R150",
                duration: "45 min"
            },
            {
                name: "Executive Cut",
                image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=600&fit=crop",
                description: "Sophisticated and polished for the modern professional. Clean lines, structured shape, and refined styling. Ideal for boardrooms and business meetings. Maintains sharp appearance for weeks between cuts.",
                price: "R200",
                duration: "50 min"
            },
            {
                name: "The Buzz",
                image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=600&fit=crop",
                description: "Clean, sharp, and effortlessly cool. The ultimate low-maintenance cut for active lifestyles. Uniform length throughout with precision blade work. Perfect for athletes, military personnel, or anyone who values simplicity.",
                price: "R100",
                duration: "30 min"
            },
            {
                name: "Afro Shaping",
                image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=600&fit=crop",
                description: "Expert shaping and texturing for natural hair. Enhances volume while maintaining healthy texture. Includes personalized styling consultation and product recommendations. Celebrates natural hair with precision and care.",
                price: "R180",
                duration: "60 min"
            },
            {
                name: "Beard Trim",
                image: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&h=600&fit=crop",
                description: "Professional grooming for your facial hair. Precise shaping, clean lines, and expert contouring. Hot towel treatment included for ultimate comfort. Complements any haircut for a complete look.",
                price: "R80",
                duration: "25 min"
            }
            // ADD MORE HAIRCUTS HERE - Up to 100+
            // Just copy the object format above and paste new items
            // The script will automatically handle pagination
        ];
        
        let currentlyShown = 0;
        const itemsPerPage = 10;
        
        // Function to create a haircut card
        function createHaircutCard(haircut, index) {
            const card = document.createElement('div');
            card.className = 'flip-card fade-in';
            if (index >= itemsPerPage) {
                card.classList.add('hidden-haircut');
            }
            
            card.innerHTML = `
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src="${haircut.image}" alt="${haircut.name}" loading="lazy">
                        <div class="card-overlay">
                            <h3>${haircut.name}</h3>
                        </div>
                    </div>
                    <div class="flip-card-back glass-card">
                        <h3 class="neon-text-small">${haircut.name}</h3>
                        <p>${haircut.description}</p>
                        <div class="price">${haircut.price}</div>
                        <div class="card-details">
                            <div class="detail">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M12 6v6l4 2"/>
                                </svg>
                                <span>${haircut.duration}</span>
                            </div>
                            <div class="detail">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M6 6l12 12M6 18L18 6"/>
                                </svg>
                                <span>Expert</span>
                            </div>
                        </div>
                        <a href="contact.html" class="btn btn-small">Book This Cut</a>
                    </div>
                </div>
            `;
            
            return card;
        }
        
        // Initial load - show first 10 items
        function loadInitialHaircuts() {
            haircuts.forEach((haircut, index) => {
                const card = createHaircutCard(haircut, index);
                haircutsGrid.appendChild(card);
            });
            
            currentlyShown = Math.min(itemsPerPage, haircuts.length);
            updateCounter();
            
            // Hide button if 10 or fewer items
            if (haircuts.length <= itemsPerPage) {
                showMoreBtn.style.display = 'none';
            }
            
            // Trigger fade-in animations
            setTimeout(() => {
                const visibleCards = document.querySelectorAll('.flip-card:not(.hidden-haircut)');
                visibleCards.forEach(card => {
                    if (observer) {
                        observer.observe(card);
                    }
                });
            }, 100);
        }
        
        // Show more functionality
        function showMoreHaircuts() {
            const hiddenCards = document.querySelectorAll('.flip-card.hidden-haircut');
            const cardsToShow = Array.from(hiddenCards).slice(0, itemsPerPage);
            
            cardsToShow.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.remove('hidden-haircut');
                    if (observer) {
                        observer.observe(card);
                    }
                }, index * 50); // Stagger animation
            });
            
            currentlyShown += cardsToShow.length;
            updateCounter();
            
            // Hide button if all shown
            if (currentlyShown >= haircuts.length) {
                showMoreBtn.classList.add('hidden');
            }
            
            // Smooth scroll to first newly shown card
            if (cardsToShow.length > 0) {
                setTimeout(() => {
                    cardsToShow[0].scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 100);
            }
        }
        
        // Update counter text
        function updateCounter() {
            if (haircutCount) {
                haircutCount.textContent = `Showing ${currentlyShown} of ${haircuts.length} haircut styles`;
            }
        }
        
        // Event listener for show more button
        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', showMoreHaircuts);
        }
        
        // Initialize
        loadInitialHaircuts();
    }
    
    // ==========================================
    // INITIALIZATION COMPLETE
    // ==========================================
    console.log('✅ Kim\'s Barbershop website fully loaded and interactive!');
    
}); // End of DOMContentLoaded
