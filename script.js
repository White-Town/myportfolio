/*===================================
  GSAP Initialization
====================================*/
gsap.registerPlugin(ScrollTrigger);

/*===================================
  DOM Elements
====================================*/
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

/*===================================
  Navigation Functionality
====================================*/
// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

/*===================================
  Smooth Scrolling
====================================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

/*===================================
  GSAP Animations
====================================*/
window.addEventListener('load', () => {
    // Hero section animations
    const heroTimeline = gsap.timeline({ 
        defaults: { 
            ease: 'power4.out', 
            duration: 1 
        } 
    });
    
    heroTimeline
        .from('.hero-text h1', {
            y: 100,
            opacity: 0
        })
        .from('.profession', {
            y: 50,
            opacity: 0
        }, '-=0.5')
        .from('.hero-description', {
            y: 50,
            opacity: 0
        }, '-=0.5')
        .from('.hero-buttons', {
            y: 50,
            opacity: 0
        }, '-=0.3');

    // Skills section animations
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1
        });
    });

    // Projects section animations
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            x: i % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8
        });
    });

    // Resume timeline animations
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2
        });
    });
});

/*===================================
  Testimonial Carousel
====================================*/
const testimonialContainer = document.querySelector('.testimonials-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (prevBtn && nextBtn && testimonialContainer) {
    const scrollDistance = window.innerWidth <= 768 ? 320 : 370; // Card width + gap
    let autoScrollInterval;

    const scrollRight = () => {
        const isAtEnd = testimonialContainer.scrollLeft + testimonialContainer.clientWidth >= testimonialContainer.scrollWidth;
        
        if (isAtEnd) {
            // If at end, scroll back to start
            testimonialContainer.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            testimonialContainer.scrollBy({
                left: scrollDistance,
                behavior: 'smooth'
            });
        }
    };

    const scrollLeft = () => {
        testimonialContainer.scrollBy({
            left: -scrollDistance,
            behavior: 'smooth'
        });
    };

    // Auto scroll function
    const startAutoScroll = () => {
        stopAutoScroll(); // Clear any existing interval
        autoScrollInterval = setInterval(scrollRight, 5000); // Scroll every 5 seconds
    };

    const stopAutoScroll = () => {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
    };

    // Start auto-scrolling
    startAutoScroll();

    // Pause auto-scroll on hover or touch
    testimonialContainer.addEventListener('mouseenter', stopAutoScroll);
    testimonialContainer.addEventListener('touchstart', stopAutoScroll);

    // Resume auto-scroll when mouse leaves
    testimonialContainer.addEventListener('mouseleave', startAutoScroll);
    testimonialContainer.addEventListener('touchend', startAutoScroll);

    // Button click handlers
    prevBtn.addEventListener('click', () => {
        scrollLeft();
        stopAutoScroll();
        setTimeout(startAutoScroll, 10000); // Resume auto-scroll after 10 seconds
    });

    nextBtn.addEventListener('click', () => {
        scrollRight();
        stopAutoScroll();
        setTimeout(startAutoScroll, 10000); // Resume auto-scroll after 10 seconds
    });

    // Update button opacity
    testimonialContainer.addEventListener('scroll', () => {
        const isAtStart = testimonialContainer.scrollLeft === 0;
        const isAtEnd = testimonialContainer.scrollLeft + testimonialContainer.clientWidth >= testimonialContainer.scrollWidth;
        
        prevBtn.style.opacity = isAtStart ? '0.5' : '1';
        nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
    });
}

/*===================================
  Form Handling
====================================*/
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

function showMessage(messageElement) {
    // Hide both messages first
    successMessage.classList.remove('show');
    errorMessage.classList.remove('show');
    
    // Show the selected message
    messageElement.classList.add('show');
    
    // Hide the message after 5 seconds
    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 5000);
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        // Your form submission logic here
        // For demo, we'll just show success message
        showMessage(successMessage);
        contactForm.reset();
    } catch (error) {
        showMessage(errorMessage);
    }
});
