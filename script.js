// Initialize Supabase client
const SUPABASE_URL = 'https://bycgbwvfkyoaksniehhv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5Y2did3Zma3lvYWtzbmllaGh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NDk5MTEsImV4cCI6MjA1OTUyNTkxMX0.jBXqjPl9b1bToCPH1FESbjPHNBWraMnBUUGq8zyNUDc';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const emailForm = document.getElementById('email-form');
    const footerEmailForm = document.getElementById('footer-email-form');
    const successModal = document.getElementById('success-modal');
    const closeButton = document.querySelector('.close-button');
    const navCta = document.querySelector('.nav-cta');
    const redirectLink = document.getElementById('redirect-link');

    // Handle form submissions
    if (emailForm) {
        emailForm.addEventListener('submit', handleSubmit);
    }

    if (footerEmailForm) {
        footerEmailForm.addEventListener('submit', handleSubmit);
    }

    // Handle nav CTA button
    if (navCta) {
        navCta.addEventListener('click', () => {
            document.querySelector('#email').focus();
            // Scroll to form
            const headerHeight = document.querySelector('header').offsetHeight;
            window.scrollTo({
                top: headerHeight / 2,
                behavior: 'smooth'
            });
        });
    }

    // Close modal
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            successModal.classList.remove('show');
        });
    }

    // Redirect to GitHub when clicking the redirect link
    if (redirectLink) {
        redirectLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'https://github.com/mushfikurahmaan';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('show');
        }
    });

    // Simple form submission function
    async function handleSubmit(e) {
        e.preventDefault();
        
        // Get the email from the form
        const form = e.target;
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!email) {
            alert('Please enter a valid email address.');
            return;
        }
        
        try {
            // Create a new object to insert
            const { error } = await supabase.from('subscribers').insert({
                email: email
                // Let Supabase handle the ID and timestamp with default values
            });
            
            if (error) {
                console.error('Error details:', error);
                throw error;
            }
            
            // Clear the form
            emailInput.value = '';
            
            // Redirect immediately to GitHub
            window.location.href = 'https://github.com/mushfikurahmaan';
            
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Simple error handling
            if (error.code === '23505') { // Duplicate email
                alert('This email is already subscribed!');
                emailInput.value = '';
            } else {
                alert('Error saving your email. Please try again.');
            }
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}); 