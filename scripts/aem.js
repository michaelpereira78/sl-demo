/**
 * AEM.js - Core Edge Delivery Services block decorator script
 * This handles loading blocks, decorating them, and applying styles/scripts
 */

const LCP_BLOCKS = ['hero', 'banner']; // Blocks that are critical for LCP
const BLOCK_RETRY_MAX = 3;

/**
 * Get block configuration
 */
function getBlockConfig(blockName) {
  return {
    cssFile: `/blocks/${blockName}/${blockName}.css`,
    jsFile: `/blocks/${blockName}/${blockName}.js`
  };
}

/**
 * Load block CSS
 */
async function loadBlockCSS(blockName) {
  const { cssFile } = getBlockConfig(blockName);
  try {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssFile;
    document.head.appendChild(link);
  } catch (e) {
    console.warn(`Failed to load CSS for block: ${blockName}`, e);
  }
}

/**
 * Load block JavaScript
 */
async function loadBlockJS(blockName) {
  const { jsFile } = getBlockConfig(blockName);
  try {
    const module = await import(jsFile);
    return module.default;
  } catch (e) {
    console.warn(`Failed to load JS for block: ${blockName}`, e);
    return null;
  }
}

/**
 * Decorate block with CSS class
 */
function decorateBlock(block) {
  const blockName = block.getAttribute('data-block-name') || 
                    Array.from(block.classList).find(cls => !cls.includes('block'));
  
  if (blockName && !block.classList.contains(blockName)) {
    block.classList.add(blockName);
  }
  
  return blockName;
}

/**
 * Create blocks from HTML structure
 */
function initBlocks() {
  const blocks = document.querySelectorAll('[data-block-name], .block');
  
  blocks.forEach(async (block) => {
    const blockName = decorateBlock(block);
    
    if (blockName) {
      // Load block CSS
      await loadBlockCSS(blockName);
      
      // Load block JS and execute decorator
      const blockDecorator = await loadBlockJS(blockName);
      if (blockDecorator && typeof blockDecorator === 'function') {
        try {
          await blockDecorator(block);
        } catch (e) {
          console.error(`Error decorating block: ${blockName}`, e);
        }
      }
    }
  });
}

/**
 * Initialize document
 */
function init() {
  // Decorate main element
  const main = document.querySelector('main');
  if (!main) return;
  
  // Initialize blocks
  initBlocks();
  
  // Mark document as loaded
  document.documentElement.classList.add('aem-loaded');
}

/**
 * Wait for DOM to be ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export default {
  getBlockConfig,
  loadBlockCSS,
  loadBlockJS,
  decorateBlock,
  initBlocks,
  init
};
