/**
 * Load CSS files dynamically
 * @param {string} href - Path to CSS file
 */
function loadCSS(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Load JavaScript module dynamically
 * @param {string} src - Path to JS file
 */
function loadScript(src, attributes = {}) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = src;
    Object.keys(attributes).forEach(key => {
      script.setAttribute(key, attributes[key]);
    });
    script.addEventListener('load', resolve);
    script.addEventListener('error', reject);
    document.head.appendChild(script);
  });
}

/**
 * Lazy load images
 */
function initLazyImages() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

/**
 * Handle postal code form submissions
 */
function initPostalForms() {
  document.querySelectorAll('.postal-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="text"]');
      const postalCode = input.value.trim().toUpperCase();
      
      if (postalCode) {
        // In a real application, this would search for advisors
        console.log('Searching for advisors in postal code:', postalCode);
        alert(`Searching for advisors in ${postalCode}...`);
      } else {
        alert('Please enter a valid postal code.');
      }
    });
  });
}

/**
 * Initialize theme
 */
function initTheme() {
  // Check for saved theme preference or default to 'light'
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
}

/**
 * Add scroll-to-section functionality
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Track analytics events
 */
function trackEvent(eventName, eventData = {}) {
  if (window.gtag) {
    window.gtag('event', eventName, eventData);
  }
  console.log('Event tracked:', eventName, eventData);
}

/**
 * Load lazy styles after page rendersa
 */
function loadLazyStyles() {
  // Load lazy styles after LCP
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      loadCSS('/styles/lazy-styles.css');
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      loadCSS('/styles/lazy-styles.css');
    }, 2000);
  }
}

/**
 * Initialize all functionality on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLazyImages();
  initPostalForms();
  initSmoothScroll();
  
  // Load lazy styles after LCP
  loadLazyStyles();
  
  // Track page view
  trackEvent('page_view', {
    page_title: document.title,
    page_path: window.location.pathname
  });
});

/**
 * Handle button clicks for tracking
 */
document.addEventListener('click', (e) => {
  if (e.target.closest('.button')) {
    const button = e.target.closest('.button');
    const buttonText = button.textContent;
    trackEvent('button_click', {
      button_text: buttonText
    });
  }
});

export default {
  loadCSS,
  loadScript,
  initLazyImages,
  initPostalForms,
  initTheme,
  initSmoothScroll,
  trackEvent,
  loadLazyStyles
};
