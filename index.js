document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Scroll progress indicator
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Active section highlighting in navigation
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Add typing effect to hero subtitle
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            setTimeout(type, 1000); // Start after hero animation
        }

        // Initialize typing effect
        window.addEventListener('load', function() {
            const subtitle = document.querySelector('.hero .subtitle');
            const originalText = subtitle.textContent;
            typeWriter(subtitle, originalText, 80);
        });

        // Add dynamic particles effect
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = 'var(--accent-color)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.opacity = '0.7';
            particle.style.zIndex = '1';
            
            const startX = Math.random() * window.innerWidth;
            const startY = window.innerHeight + 10;
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            document.body.appendChild(particle);
            
            const duration = 3000 + Math.random() * 2000;
            const endY = -10;
            const endX = startX + (Math.random() - 0.5) * 100;
            
            particle.animate([
                { transform: `translate(0, 0) scale(1)`, opacity: 0.7 },
                { transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'ease-out'
            }).onfinish = () => {
                particle.remove();
            };
        }

        // Create particles periodically
        setInterval(createParticle, 500);

        // Add interactive cursor effect
        document.addEventListener('mousemove', function(e) {
            const cursor = document.querySelector('.cursor');
            if (!cursor) {
                const newCursor = document.createElement('div');
                newCursor.className = 'cursor';
                newCursor.style.cssText = `
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    background: var(--accent-color);
                    border-radius: 50%;
                    pointer-events: none;
                    mix-blend-mode: difference;
                    z-index: 9999;
                    transition: transform 0.1s ease;
                    opacity: 0.7;
                `;
                document.body.appendChild(newCursor);
            }
            
            const cursorElement = document.querySelector('.cursor');
            cursorElement.style.left = (e.clientX - 10) + 'px';
            cursorElement.style.top = (e.clientY - 10) + 'px';
        });

        // Add hover effects for interactive elements
        document.querySelectorAll('a, button, .skill-tag, .project-card').forEach(element => {
            element.addEventListener('mouseenter', function() {
                const cursor = document.querySelector('.cursor');
                if (cursor) {
                    cursor.style.transform = 'scale(1.5)';
                    cursor.style.opacity = '1';
                }
            });
            
            element.addEventListener('mouseleave', function() {
                const cursor = document.querySelector('.cursor');
                if (cursor) {
                    cursor.style.transform = 'scale(1)';
                    cursor.style.opacity = '0.7';
                }
            });
        });

        // Add parallax effect to floating elements
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-element');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
            });
        });

        // Add dynamic skill bar animations
        function animateSkillBars() {
            const skillCategories = document.querySelectorAll('.skill-category');
            
            skillCategories.forEach(category => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const tags = entry.target.querySelectorAll('.skill-tag');
                            tags.forEach((tag, index) => {
                                setTimeout(() => {
                                    tag.style.animation = 'fadeInUp 0.5s ease forwards';
                                    tag.style.opacity = '0';
                                    tag.style.transform = 'translateY(20px)';
                                    setTimeout(() => {
                                        tag.style.opacity = '1';
                                        tag.style.transform = 'translateY(0)';
                                    }, 50);
                                }, index * 100);
                            });
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(category);
            });
        }

        // Initialize skill bar animations
        animateSkillBars();

        // Add loading animation
        window.addEventListener('load', function() {
            const loader = document.createElement('div');
            loader.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: var(--primary-bg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    transition: opacity 0.5s ease;
                " id="loader">
                    <div style="
                        width: 50px;
                        height: 50px;
                        border: 3px solid var(--secondary-bg);
                        border-top: 3px solid var(--accent-color);
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                    "></div>
                </div>
            `;
            document.body.appendChild(loader);
            
            setTimeout(() => {
                const loaderElement = document.getElementById('loader');
                loaderElement.style.opacity = '0';
                setTimeout(() => {
                    loaderElement.remove();
                }, 500);
            }, 1500);
        });

        // Add contact form functionality (placeholder)
        function addContactForm() {
            const contactSection = document.getElementById('contact');
            const contactContent = contactSection.querySelector('.contact-content');
            
            const formHTML = `
                <form id="contactForm" style="
                    max-width: 500px;
                    margin: 2rem auto 0;
                    display: grid;
                    gap: 1rem;
                ">
                    <input type="text" placeholder="Your Name" required style="
                        padding: 1rem;
                        background: var(--secondary-bg);
                        border: 1px solid #333;
                        border-radius: 8px;
                        color: var(--primary-text);
                        font-size: 1rem;
                    ">
                    <input type="email" placeholder="Your Email" required style="
                        padding: 1rem;
                        background: var(--secondary-bg);
                        border: 1px solid #333;
                        border-radius: 8px;
                        color: var(--primary-text);
                        font-size: 1rem;
                    ">
                    <textarea placeholder="Your Message" rows="5" required style="
                        padding: 1rem;
                        background: var(--secondary-bg);
                        border: 1px solid #333;
                        border-radius: 8px;
                        color: var(--primary-text);
                        font-size: 1rem;
                        resize: vertical;
                    "></textarea>
                    <button type="submit" class="btn btn-primary" style="
                        justify-self: center;
                        width: 200px;
                    ">Send Message</button>
                </form>
            `;
            
            contactContent.insertAdjacentHTML('beforeend', formHTML);
            
            document.getElementById('contactForm').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thanks for your message! I\'ll get back to you soon.');
                this.reset();
            });
        }

        // Add contact form after page load
        setTimeout(addContactForm, 2000);