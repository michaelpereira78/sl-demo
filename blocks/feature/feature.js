/**
 * Feature Block Decorator
 * Creates a feature block with alternating text/image layout
 */

export default async function decorate(block) {
  const children = Array.from(block.children);
  
  // Organize content into columns
  children.forEach((child, index) => {
    if (index % 2 === 0) {
      child.classList.add('feature-content');
    } else {
      child.classList.add('feature-media');
    }
  });
  
  // Set block to display as flex
  block.style.display = 'flex';
  block.style.gap = '2rem';
  block.style.alignItems = 'center';
  block.style.flexWrap = 'wrap';
}
