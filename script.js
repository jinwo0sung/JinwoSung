// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Testimonial Slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialNavButtons = document.querySelectorAll('.testimonial-nav button');
let currentTestimonial = 0;

function showTestimonial(index) {
    // Hide all testimonials
    testimonialCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    testimonialNavButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected testimonial and activate corresponding button
    testimonialCards[index].classList.add('active');
    testimonialNavButtons[index].classList.add('active');
    currentTestimonial = index;
}

// Add click event to testimonial navigation buttons
testimonialNavButtons.forEach(button => {
    button.addEventListener('click', () => {
        const index = parseInt(button.getAttribute('data-index'));
        showTestimonial(index);
    });
});

// Auto-rotate testimonials every 5 seconds
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Service booking buttons
const bookServiceButtons = document.querySelectorAll('.book-service-btn');
const serviceSelect = document.getElementById('service');

bookServiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const service = button.getAttribute('data-service');
        serviceSelect.value = service;
        
        // Scroll to booking form
        document.getElementById('booking').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Highlight the selected service in the form
        serviceSelect.focus();
    });
});

// Booking form submission
const bookingForm = document.getElementById('bookingForm');
const bookingModal = document.getElementById('bookingModal');
const bookingDetails = document.getElementById('bookingDetails');
const closeModal = document.querySelector('.close-modal');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Display booking details in modal
    bookingDetails.innerHTML = `
        <strong>Name:</strong> ${name}<br>
        <strong>Service:</strong> ${service}<br>
        <strong>Email:</strong> ${email}<br>
        ${phone ? `<strong>Phone:</strong> ${phone}<br>` : ''}
        ${message ? `<strong>Message:</strong> ${message.substring(0, 50)}${message.length > 50 ? '...' : ''}` : ''}
    `;
    
    // Show the modal
    bookingModal.style.display = 'flex';
    
    // Reset the form
    bookingForm.reset();
});

// Close modal
closeModal.addEventListener('click', () => {
    bookingModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if(e.target === bookingModal) {
        bookingModal.style.display = 'none';
    }
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
});

// Add hover effect to service cards on load
document.addEventListener('DOMContentLoaded', () => {
    // Add some initial animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Animate hero content
    const heroContent = document.querySelector('.hero h1, .hero p, .hero .cta-button');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 300);
});