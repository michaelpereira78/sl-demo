/**
 * Hero Block Decorator
 * Enhances the hero section with additional styling and functionality
 */

export default async function decorate(block) {
  // Add necessary classes if not already present
  const heading = block.querySelector('h1');
  const subtitle = block.querySelector('.subtitle, p:first-of-type');
  const button = block.querySelector('a.button');
  
  // Add animation classes
  if (heading) {
    heading.addEventListener('load', () => {
      heading.classList.add('animated');
    });
  }
  
  // Enhance button appearance
  if (button) {
    button.classList.add('button-primary');
  }
  
  // Add intersection observer for animation
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          block.classList.add('in-view');
          observer.unobserve(block);
        }
      });
    });
    observer.observe(block);
  }
}
