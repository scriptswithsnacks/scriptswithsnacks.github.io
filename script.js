// Initialize Supabase client
const SUPABASE_URL = 'SUPABASE_URL';
const SUPABASE_ANON_KEY = 'SUPABASE_ANON_KEY';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
        
        // Strong email validation rules
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        // Validation checks
        if (!email) {
            alert('Please enter an email address.');
            return;
        }
        
        // Check email format
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            emailInput.focus();
            return;
        }
        
        // Check username length (before @)
        const username = email.split('@')[0];
        if (username.length < 3) {
            alert('Email username must be at least 3 characters long.');
            emailInput.focus();
            return;
        }
        
        // Check domain
        const domain = email.split('@')[1];
        if (!domain) {
            alert('Invalid email domain.');
            emailInput.focus();
            return;
        }
        
        // Check for valid domain format
        if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain)) {
            alert('Invalid email domain format.');
            emailInput.focus();
            return;
        }
        
        // Check for consecutive dots
        if (domain.includes('..')) {
            alert('Invalid email domain (consecutive dots).');
            emailInput.focus();
            return;
        }
        
        // Check for valid TLD
        const tld = domain.split('.').pop();
        if (tld.length < 2 || tld.length > 6) {
            alert('Invalid email domain extension.');
            emailInput.focus();
            return;
        }
        
        // Check for common disposable email domains
        const disposableDomains = [
            'tempmail.com', 'throwawaymail.com', 'guerrillamail.com',
            'mailinator.com', 'yopmail.com', 'temp-mail.org',
            'dispostable.com', 'maildrop.cc', '10minutemail.com'
        ];
        
        if (disposableDomains.some(d => domain.toLowerCase().includes(d))) {
            alert('Disposable email addresses are not allowed.');
            emailInput.focus();
            return;
        }
        
        // Try to save the email
        try {
            // Submit the email to Supabase
            const { data, error } = await supabase
                .from('subscribers')
                .insert([
                    { 
                        email: email,
                        created_at: new Date().toISOString()
                    }
                ])
                .select();
            
            if (error) {
                console.error('Supabase error:', error);
                if (error.code === '23505') { // Unique violation
                    alert('This email is already subscribed.');
                } else {
                    throw error;
                }
                return;
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