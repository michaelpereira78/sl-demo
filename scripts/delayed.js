/**
 * Delayed JavaScript for third-party scripts and non-critical functionality
 * This file loads after the page has rendered to avoid blocking initial load
 */

// Load Google Tag Manager (example - uncomment and configure as needed)
/*
function loadGTM() {
  const scripts = document.createElement('script');
  scripts.async = true;
  scripts.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID';
  document.head.appendChild(scripts);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
}
*/

// Load additional tracking scripts
document.addEventListener('DOMContentLoaded', () => {
  // Delayed analytics
  // loadGTM();
  
  // Prefetch DNS for external domains
  const links = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//google-analytics.com' }
  ];

  links.forEach(link => {
    const linkElement = document.createElement('link');
    linkElement.rel = link.rel;
    linkElement.href = link.href;
    document.head.appendChild(linkElement);
  });
});

// Load font before the page fully renders
if (document.fonts) {
  document.fonts.ready.then(() => {
    document.documentElement.classList.add('fonts-loaded');
  });
}
