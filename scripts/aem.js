/**
 * AEM.js - Core Edge Delivery Services block decorator script
 * This handles loading blocks, decorating them, and applying styles/scripts
 */

const LCP_BLOCKS = ['hero', 'banner'];
const BLOCK_CSS_LOADED = {};

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
  if (BLOCK_CSS_LOADED[blockName]) return;
  
  const { cssFile } = getBlockConfig(blockName);
  try {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssFile;
    document.head.appendChild(link);
    BLOCK_CSS_LOADED[blockName] = true;
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
 * Extract block name from section element
 */
function getBlockName(section) {
  // Look for block-specific classes
  const classes = Array.from(section.classList);
  
  // First, check for explicit data attribute
  if (section.dataset.blockName) {
    return section.dataset.blockName;
  }
  
  // Extract from class names
  for (const cls of classes) {
    if (cls !== 'section' && cls !== 'block') {
      return cls;
    }
  }
  
  return null;
}

/**
 * Decorate sections with block functionality
 */
async function decorateBlocks(main) {
  const sections = main.querySelectorAll('[data-block-name], div[class*="section"]');
  
  for (const section of sections) {
    const blockName = getBlockName(section);
    
    if (blockName && blockName !== 'section') {
      // Add block class for styling
      section.classList.add('block');
      section.classList.add(blockName);
      
      // Load block CSS
      await loadBlockCSS(blockName);
      
      // Load block JS and execute decorator
      const blockDecorator = await loadBlockJS(blockName);
      if (blockDecorator && typeof blockDecorator === 'function') {
        try {
          await blockDecorator(section);
        } catch (e) {
          console.error(`Error decorating block: ${blockName}`, e);
        }
      }
    }
  }
}

/**
 * Initialize document
 */
async function init() {
  const main = document.querySelector('main');
  if (!main) {
    console.warn('No main element found on page');
    return;
  }
  
  await decorateBlocks(main);
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
  getBlockName,
  decorateBlocks,
  init
};
