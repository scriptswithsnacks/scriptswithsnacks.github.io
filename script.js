// Initialize Supabase client
const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = '';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Redirect URL
const REDIRECT_URL = '';
// Redirect URL
const REDIRECT_URL = 'REDIRECT_URL';

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
        emailForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleSubmit(e);
        });
    }

    if (footerEmailForm) {
        footerEmailForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleSubmit(e);
        });
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
            window.location.href = REDIRECT_URL;
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
        // Get the email from the form
        const form = e.target;
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        // Strong email validation with regex
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (!email) {
            alert('Please enter an email address.');
            return;
        }
        
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            emailInput.focus();
            return;
        }
        
        // Additional validation checks
        if (email.split('@')[0].length < 3) {
            alert('Email username must be at least 3 characters long.');
            emailInput.focus();
            return;
        }
        
        const domain = email.split('@')[1];
        if (!domain.includes('.')) {
            alert('Invalid email domain.');
            emailInput.focus();
            return;
        }
        
        const extension = domain.split('.').pop();
        if (extension.length < 2) {
            alert('Invalid email domain extension.');
            emailInput.focus();
            return;
        }
        
        // Try to save the email
        try {
            // Submit the email to Supabase
            const { data, error } = await supabase
                .from('subscribers')
                .insert([{ email: email }])
                .select();
            
            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }
            
            // Clear the form
            emailInput.value = '';
            
            // Show success modal
            successModal.style.display = 'block';
            successModal.classList.add('show');
            
            // Wait for 2 seconds before redirecting
            setTimeout(() => {
                window.location.href = REDIRECT_URL;
            }, 2000);
            
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error saving your email. Please try again.');
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