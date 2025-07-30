// Advanced JavaScript Design System
class PortfolioDesign {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.createInteractiveElements();
        this.setupScrollEffects();
        this.initializeParticleSystem();
        this.setupTypingEffects();
        // Remove or comment out the dynamic background and floating elements
        // this.createDynamicBackground();
        this.setupSkillAnimations();
        this.initializeProjectGallery();
        this.setupContactForm();
    }

    setupEventListeners() {
        // Mobile menu functionality
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');

        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuBtn.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (event) => {
                if (!event.target.closest('.nav-container')) {
                    mobileMenuBtn.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        });
    }

    initializeAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add staggered animations for grid items
                    if (entry.target.classList.contains('skills-grid') || 
                        entry.target.classList.contains('projects-grid')) {
                        const items = entry.target.children;
                        Array.from(items).forEach((item, index) => {
                            setTimeout(() => {
                                item.style.animation = `slideInFromBottom 0.6s ease ${index * 0.1}s both`;
                            }, index * 100);
                        });
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    createInteractiveElements() {
        // Add hover effects to skill tags
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-3px) scale(1.05)';
                tag.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
            });

            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0) scale(1)';
                tag.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            });
        });

        // Add click effects to project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                card.classList.add('shake');
                setTimeout(() => {
                    card.classList.remove('shake');
                }, 500);
            });
        });

        // Add ripple effect to buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');

                button.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    setupScrollEffects() {
        // Parallax effect for background elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });

            // Dynamic background color change
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
                
                if (scrollPercent > 0 && scrollPercent < 1) {
                    section.style.background = `linear-gradient(135deg, 
                        rgba(102, 126, 234, ${0.05 + scrollPercent * 0.1}) 0%, 
                        rgba(118, 75, 162, ${0.05 + scrollPercent * 0.1}) 100%)`;
                }
            });
        });
    }

    initializeParticleSystem() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const startX = Math.random() * window.innerWidth;
            const duration = 15 + Math.random() * 10;
            const delay = Math.random() * 20;
            const size = 2 + Math.random() * 4;
            
            particle.style.left = startX + 'px';
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.animationDuration = duration + 's';
            particle.style.animationDelay = delay + 's';
            
            particlesContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, (duration + delay) * 1000);
        }

        // Create particles periodically
        setInterval(createParticle, 300);
    }

    setupTypingEffects() {
        // Typewriter effect for hero subtitle
        const subtitle = document.querySelector('.hero .subtitle');
        if (subtitle) {
            const originalText = subtitle.textContent;
            this.typeWriter(subtitle, originalText, 50);
        }

        // Animated text for section titles
        document.querySelectorAll('.section-title').forEach(title => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('neon-glow');
                    }
                });
            });
            observer.observe(title);
        });
    }

    typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Remove or comment out the dynamic background and floating elements
    // this.createDynamicBackground();

    setupSkillAnimations() {
        // Animate skill progress bars
        const skillCategories = document.querySelectorAll('.skill-category');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillTags = entry.target.querySelectorAll('.skill-tag');
                    skillTags.forEach((tag, index) => {
                        setTimeout(() => {
                            tag.style.animation = `scaleIn 0.5s ease ${index * 0.1}s both`;
                        }, index * 100);
                    });
                }
            });
        });

        skillCategories.forEach(category => {
            skillObserver.observe(category);
        });
    }

    initializeProjectGallery() {
        // Add lightbox effect to project images
        document.querySelectorAll('.project-image').forEach(image => {
            image.addEventListener('click', () => {
                this.createLightbox(image.textContent);
            });
        });

        // Add filter functionality
        this.createProjectFilter();
    }

    createLightbox(content) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const contentDiv = document.createElement('div');
        contentDiv.style.cssText = `
            color: white;
            font-size: 2rem;
            text-align: center;
            padding: 2rem;
        `;
        contentDiv.textContent = content;

        lightbox.appendChild(contentDiv);
        document.body.appendChild(lightbox);

        // Animate in
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);

        // Close on click
        lightbox.addEventListener('click', () => {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        });
    }

    createProjectFilter() {
        // Add filter buttons
        const projectsSection = document.getElementById('projects');
        if (!projectsSection) return;

        const filterContainer = document.createElement('div');
        filterContainer.className = 'project-filter';
        filterContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        `;

        const filters = ['All', 'Frontend', 'Backend', 'Full-Stack'];
        filters.forEach(filter => {
            const button = document.createElement('button');
            button.textContent = filter;
            button.className = 'filter-btn';
            button.style.cssText = `
                padding: 0.5rem 1rem;
                border: 2px solid var(--primary-color);
                background: transparent;
                color: var(--primary-color);
                border-radius: 25px;
                cursor: pointer;
                transition: all 0.3s ease;
            `;

            button.addEventListener('click', () => {
                this.filterProjects(filter);
                
                // Update active button
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.style.background = 'transparent';
                    btn.style.color = 'var(--primary-color)';
                });
                button.style.background = 'var(--primary-color)';
                button.style.color = 'white';
            });

            filterContainer.appendChild(button);
        });

        projectsSection.insertBefore(filterContainer, projectsSection.firstChild);
    }

    filterProjects(category) {
        const projects = document.querySelectorAll('.project-card');
        projects.forEach(project => {
            if (category === 'All' || project.dataset.category === category) {
                project.style.display = 'block';
                project.style.animation = 'scaleIn 0.5s ease';
            } else {
                project.style.display = 'none';
            }
        });
    }

    setupContactForm() {
        // Add form validation and animations
        const contactForm = document.querySelector('#contact form');
        if (!contactForm) return;

        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            input.addEventListener('input', () => {
                if (input.value) {
                    input.classList.add('has-value');
                } else {
                    input.classList.remove('has-value');
                }
            });
        });

        // Form submission animation
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Sent!';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// Initialize the portfolio design system
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioDesign();
});

// Add CSS for ripple effect
const rippleCSS = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .project-filter {
        margin-bottom: 2rem;
    }

    .filter-btn:hover {
        background: var(--primary-color) !important;
        color: white !important;
        transform: translateY(-2px);
    }
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style); 