// main.js - Site interactivity and contact form functionality

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive elements
  initNavigation();
  initContactForm();
  initAnimations();
  initJournalFilters();
  mermaid.initialize({ startOnLoad: true });
});

// Navigation enhancement
function initNavigation() {
  // Add active class to current nav item
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath === linkPath ||
        (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      link.classList.add('active');
    }

    // Add smooth hover animation
    link.addEventListener('mouseenter', function() {
      this.style.transition = 'color 0.3s ease';
    });
  });

  // Mobile navigation toggle
  const navToggle = document.querySelector('.navbar-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      const navMenu = document.querySelector('.navbar-nav');
      navMenu.classList.toggle('show');
    });
  }
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.querySelector('#contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form input values
      const name = contactForm.querySelector('#name').value;
      const email = contactForm.querySelector('#email').value;
      const message = contactForm.querySelector('#message').value;
      
      // Simple validation
      if (!name || !email || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
      }
      
      // Here you would normally send the form data to your server
      // For now, just show a success message
      showFormMessage('Thanks for your message! I\'ll get back to you soon.', 'success');
      contactForm.reset();
    });
  }
  
  // Helper function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Helper function to show form messages
  function showFormMessage(message, type) {
    const messageEl = document.querySelector('.form-message');
    if (messageEl) {
      messageEl.textContent = message;
      messageEl.className = 'form-message ' + type;
      messageEl.style.display = 'block';
      
      // Hide message after 5 seconds
      setTimeout(() => {
        messageEl.style.display = 'none';
      }, 5000);
    }
  }
}

// Animation enhancements
function initAnimations() {
  // Fade in elements as they scroll into view
  const fadeElements = document.querySelectorAll('.fade-in-scroll');

  if (fadeElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => {
      observer.observe(el);
    });
  }

  // Card hover animations
  const cards = document.querySelectorAll('.card, .project-card, .post-card, .journal-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)';
      this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)';
    });
  });
}

// Journal category filters
function initJournalFilters() {
  const categoryButtons = document.querySelectorAll('.category-button');
  const journalEntries = document.querySelectorAll('.journal-card');

  if (categoryButtons.length > 0 && journalEntries.length > 0) {
    categoryButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        event.preventDefault();
        const category = this.getAttribute('data-category') || this.classList.contains('daily') ? 'daily' : this.classList.contains('special') ? 'special' : 'all';

        // Toggle active state on buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Filter journal entries
        journalEntries.forEach(entry => {
          if (category === 'all') {
            entry.style.display = 'flex';
          } else {
            const entryCategory = entry.querySelector('.entry-category').textContent.toLowerCase();
            entry.style.display = (entryCategory === category) ? 'flex' : 'none';
          }
        });

        // Animate entries coming into view
        setTimeout(() => {
          journalEntries.forEach(entry => {
            if (entry.style.display !== 'none') {
              entry.classList.add('fade-in');
            }
          });
        }, 100);
      });
    });
  }
}
