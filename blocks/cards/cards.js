/**
 * Cards Block Decorator
 * Creates a card grid layout with hover effects
 */

export default async function decorate(block) {
  // Get all items (could be divs, paragraphs, or list items)
  const items = Array.from(block.children);
  
  // Create a grid if not already present
  const grid = document.createElement('div');
  grid.className = 'cards-grid';
  
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = item.innerHTML;
    grid.appendChild(card);
  });
  
  // Clear the block and add the grid
  block.innerHTML = '';
  block.appendChild(grid);
  
  // Add intersection observer for animations
  if ('IntersectionObserver' in window) {
    const cards = grid.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = `${index * 0.1}s`;
          entry.target.classList.add('in-view');
        }
      });
    });
    
    cards.forEach(card => observer.observe(card));
  }
}
