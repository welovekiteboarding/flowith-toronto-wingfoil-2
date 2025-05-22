// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    initializeMobileMenu();

    // Contact form conditional fields
    initializeContactForm();

    // FAQ accordions (if on the FAQ page)
    if (document.querySelector('.faq-accordion')) {
        initializeFaqAccordions();
    }
});

/**
 * Initializes the mobile menu toggle functionality
 */
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            // Toggle the hidden class on the mobile menu
            mobileMenu.classList.toggle('hidden');
        });

        // Close the mobile menu when clicking outside of it
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

/**
 * Initializes the contact form with conditional fields
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const inquiryType = document.getElementById('inquiryType');
        const lessonDetails = document.getElementById('lessonDetails');

        // Show/hide lesson details based on inquiry type
        inquiryType.addEventListener('change', function() {
            if (this.value === 'booking') {
                lessonDetails.classList.remove('hidden');
                // Make lesson type and preferred dates required
                document.getElementById('lessonType').setAttribute('required', 'required');
                document.getElementById('preferredDates').setAttribute('required', 'required');
                document.getElementById('participants').setAttribute('required', 'required');
            } else {
                lessonDetails.classList.add('hidden');
                // Remove required attribute when hidden
                document.getElementById('lessonType').removeAttribute('required');
                document.getElementById('preferredDates').removeAttribute('required');
                document.getElementById('participants').removeAttribute('required');
            }
        });

        // Form submission handler
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // In a real implementation, this would send the form data to a server
            // For this demo, we'll just show a success message
            
            // Get form data
            const formData = new FormData(contactForm);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Simple validation (real implementation would be more robust)
            if (!formValues.firstName || !formValues.lastName || !formValues.email || !formValues.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show success message (in a real app, this would happen after server response)
            const successMessage = document.createElement('div');
            successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4';
            successMessage.innerHTML = `
                <strong class="font-bold">Thank you!</strong>
                <span class="block sm:inline"> Your message has been sent. We'll get back to you soon.</span>
            `;
            
            // Replace form with success message
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
            
            // Scroll to top of form
            contactForm.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

/**
 * Initializes accordion functionality for FAQ items
 */
function initializeFaqAccordions() {
    const accordionHeaders = document.querySelectorAll('.faq-accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle the 'active' class on the header
            this.classList.toggle('active');
            
            // Toggle the visibility of the content panel
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });
}



