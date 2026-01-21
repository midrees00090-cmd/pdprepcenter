
// ===== PHILADELPHIA PREP CENTER - FIXED JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // 1. Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeIndustryTabs();
    initializeForms();
    initializeSmoothScroll();
    initializeInteractiveElements();
    
    console.log('Philadelphia Prep Center website initialized');
}

// ===== NAVIGATION - FIXED DROPDOWNS =====
function initializeNavigation() {
    const header = document.querySelector('.header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navOverlay = document.querySelector('.nav-overlay');
    const navMobile = document.querySelector('.nav-mobile');
    
    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Mobile menu toggle
    if (mobileToggle && navOverlay && navMobile) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navOverlay.classList.toggle('active');
            navMobile.classList.toggle('active');
            document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            if (mobileToggle) mobileToggle.classList.remove('active');
            this.classList.remove('active');
            if (navMobile) navMobile.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile menu when clicking links
    const mobileLinks = document.querySelectorAll('.nav-mobile .nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileToggle) mobileToggle.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            if (navMobile) navMobile.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Desktop dropdown hover handling - FIXED
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        // Show dropdown on hover
        dropdown.addEventListener('mouseenter', function() {
            const menu = this.querySelector('.dropdown-menu');
            const megaMenu = this.querySelector('.mega-menu');
            
            if (menu) {
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateY(0)';
            }
            
            if (megaMenu) {
                megaMenu.style.opacity = '1';
                megaMenu.style.visibility = 'visible';
                megaMenu.style.transform = 'translateX(-50%) translateY(0)';
            }
        });
        
        // Hide dropdown when mouse leaves
        dropdown.addEventListener('mouseleave', function(e) {
            // Check if mouse is moving to dropdown content
            const menu = this.querySelector('.dropdown-menu');
            const megaMenu = this.querySelector('.mega-menu');
            const relatedTarget = e.relatedTarget;
            
            // If moving to dropdown or mega menu, keep it open
            if (relatedTarget && 
                (relatedTarget.closest('.dropdown-menu') || 
                 relatedTarget.closest('.mega-menu'))) {
                return;
            }
            
            // Otherwise hide after delay
            setTimeout(() => {
                if (menu && !menu.matches(':hover')) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(15px)';
                }
                
                if (megaMenu && !megaMenu.matches(':hover')) {
                    megaMenu.style.opacity = '0';
                    megaMenu.style.visibility = 'hidden';
                    megaMenu.style.transform = 'translateX(-50%) translateY(15px)';
                }
            }, 100);
        });
        
        // Keep mega menu open when hovering over it
        const megaMenu = dropdown.querySelector('.mega-menu');
        if (megaMenu) {
            megaMenu.addEventListener('mouseenter', function() {
                this.style.opacity = '1';
                this.style.visibility = 'visible';
                this.style.transform = 'translateX(-50%) translateY(0)';
            });
            
            megaMenu.addEventListener('mouseleave', function() {
                this.style.opacity = '0';
                this.style.visibility = 'hidden';
                this.style.transform = 'translateX(-50%) translateY(15px)';
            });
        }
    });
    
    // Set active navigation link
    setActiveNavLink();
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class to current page link
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === '') ||
            (linkPage.includes(currentPage.replace('.html', '')) && currentPage !== 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or external link
            if (href === '#' || href.startsWith('#!')) return;
            
            // Handle hash links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    
    // Counter animation for stats
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    const number = parseFloat(text.replace(/[^0-9.]/g, ''));
                    if (!isNaN(number)) {
                        animateCounter(entry.target, number);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // Hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const originalText = element.textContent;
    const hasPlus = originalText.includes('+');
    const hasPercent = originalText.includes('%');
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString() + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// ===== INDUSTRY TABS =====
function initializeIndustryTabs() {
    const industryTabs = document.querySelectorAll('.industry-tab');
    const industryContents = document.querySelectorAll('.industry-content');
    
    if (industryTabs.length > 0 && industryContents.length > 0) {
        industryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const industry = this.dataset.industry;
                
                // Update active tab
                industryTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding content
                industryContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === industry) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }
}

// ===== FORMS =====
function initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            
            if (!submitBtn) return;
            
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                showNotification('Thank you for your message! We will contact you shortly.', 'success');
                
                // Reset form
                this.reset();
            } catch (error) {
                showNotification('Something went wrong. Please try again.', 'error');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    });
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#008148' : '#ba0c2f'};
                color: white;
                padding: 16px 24px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 16px;
                box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.2s;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    const autoRemove = setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemove);
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        });
    }
}

// ===== INTERACTIVE ELEMENTS =====
function initializeInteractiveElements() {
    // Map pins interaction
    const mapPins = document.querySelectorAll('.map-pin');
    mapPins.forEach(pin => {
        pin.addEventListener('click', function() {
            showNotification('Our Philadelphia facility is located in the Commerce District', 'info');
        });
    });
    
    // Service links animation
    const serviceLinks = document.querySelectorAll('.service-link');
    serviceLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====
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

// Initialize on window load as well
window.addEventListener('load', function() {
    // Additional initialization if needed
});

// Export for use if needed
window.PhiladelphiaPrep = {
    initializeWebsite,
    showNotification,
    animateCounter
};





