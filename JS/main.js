document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar background change on scroll
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            const scrollProgress = document.getElementById('scrollProgress');
            
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 11, 30, 0.98)';
            } else {
                navbar.style.background = 'rgba(10, 11, 30, 0.95)';
            }

            // Update scroll progress bar
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });

        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Portfolio filter functionality
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Here you can add filtering logic for projects
                // For now, we'll just show all projects
                console.log('Filter by:', this.textContent);
            });
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simulate form submission
            const submitBtn = this.querySelector('.send-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert(`Thank you ${name}! Your message has been sent successfully. I'll get back to you soon.`);
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });

        document.querySelectorAll('.project-card, .service-card, .tech-item').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.3;
            
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    if (text.charAt(i) === '<') {
                        // Handle HTML tags
                        const closingTagIndex = text.indexOf('>', i);
                        element.innerHTML += text.substring(i, closingTagIndex + 1);
                        i = closingTagIndex + 1;
                    } else {
                        element.innerHTML += text.charAt(i);
                        i++;
                    }
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize typing effect after page load
        window.addEventListener('load', function() {
            setTimeout(() => {
                const title = document.querySelector('.hero-title');
                if (title) {
                        typeWriter(title, 'MERN<br>SOFTWARE<br>DEVELOPER.', 80);
                }
            }, 1000);
        });

        // Add click ripple effect to buttons
        function addRippleEffect(button) {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.backgroundColor = 'rgba(255,255,255,0.3)';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.pointerEvents = 'none';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        }

        // Add ripple effect to all buttons
        document.querySelectorAll('.btn-primary, .btn-secondary, .contact-btn, .send-btn').forEach(addRippleEffect);

        // Add CSS for ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .btn-primary, .btn-secondary, .contact-btn, .send-btn {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);

        // Add floating animation to tech items
        document.querySelectorAll('.tech-item').forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('float-animation');
        });

        // Add floating animation CSS
        const floatStyle = document.createElement('style');
        floatStyle.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            
            .float-animation:hover {
                animation: float 2s ease-in-out infinite;
            }
        `;
        document.head.appendChild(floatStyle);

        // Add gradient animation to hero background
        const heroGradientStyle = document.createElement('style');
        heroGradientStyle.textContent = `
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            .hero {
                background: linear-gradient(-45deg, #0a0b1e, #1a1b3a, #2a2d5f, #4f8ff7);
                background-size: 400% 400%;
                animation: gradientShift 15s ease infinite;
            }
        `;
        document.head.appendChild(heroGradientStyle);

        // Add stagger animation to portfolio cards
        const portfolioCards = document.querySelectorAll('.project-card');
        portfolioCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });

        // Initialize all animations
        document.addEventListener('DOMContentLoaded', function() {
            // Add loaded class to body for CSS animations
            document.body.classList.add('loaded');
        });