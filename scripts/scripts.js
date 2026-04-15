// Basic JavaScript for AEM EDS demo
console.log('AEM EDS Demo loaded successfully!');

// Simple functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded');

  // Add some interactive elements
  const button = document.querySelector('button');
  if (button) {
    button.addEventListener('click', function() {
      alert('Thank you for your interest! This is a demo page.');
    });
  }

  // Add loading animation
  const features = document.querySelectorAll('.feature');
  features.forEach((feature, index) => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(20px)';
    feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    setTimeout(() => {
      feature.style.opacity = '1';
      feature.style.transform = 'translateY(0)';
    }, index * 200);
  });

  // Add page load timestamp
  const footer = document.querySelector('footer p');
  if (footer) {
    const now = new Date();
    footer.textContent += ` | Page loaded at ${now.toLocaleTimeString()}`;
  }
});

// Simple analytics tracking
function trackEvent(eventName, data) {
  console.log('Event tracked:', eventName, data);
}

// Track page view
trackEvent('page_view', {
  page: window.location.pathname,
  timestamp: new Date().toISOString()
});