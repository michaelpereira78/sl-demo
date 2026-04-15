# SunLife Life Insurance Demo - EDS Project

A demonstration website recreating the SunLife Life Insurance page using Adobe Experience Manager (AEM) Edge Delivery Services.

## Project Overview

This is a fully functional EDS (Edge Delivery Services) project that showcases:
- Responsive, modern design
- Block-based architecture
- Performance-optimized CSS and JavaScript
- Accessible HTML structure
- SEO-friendly markup

## Project Structure

```
sl-demo/
├── head.html                 # Main entry point for HTML head
├── index.html                # Main content page
├── styles/
│   ├── styles.css           # Global critical styles
│   └── lazy-styles.css      # Non-critical styles loaded after LCP
├── scripts/
│   ├── aem.js               # Core EDS block loader
│   ├── scripts.js           # Global JavaScript functionality
│   └── delayed.js           # Delayed third-party scripts
├── blocks/                   # Reusable component blocks
│   ├── hero/
│   │   ├── hero.css
│   │   └── hero.js
│   ├── cards/
│   │   ├── cards.css
│   │   └── cards.js
│   └── feature/
│       ├── feature.css
│       └── feature.js
├── icons/                    # SVG icon library
└── README.md                # This file
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git
- GitHub account

### Local Development

1. **Install AEM CLI**
   ```bash
   npm install -g @adobe/aem-cli
   ```

2. **Clone and Set Up**
   ```bash
   git clone https://github.com/your-username/sl-demo.git
   cd sl-demo
   ```

3. **Start Local Development Server**
   ```bash
   aem up
   ```
   This will open `http://localhost:3000/` in your browser.

4. **Make Changes**
   - Edit CSS in `/styles/`
   - Add JavaScript in `/scripts/`
   - Create new blocks in `/blocks/`
   - Changes are hot-reloaded automatically

### Deploy

Push changes to your GitHub repository:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Changes are automatically deployed to:
- Preview: `https://main--sl-demo--your-username.aem.page/`
- Production: `https://main--sl-demo--your-username.aem.live/` (for published content)

## Key Features

### Blocks
- **Hero Block**: Full-width header section
- **Cards Block**: Grid-based card layout
- **Feature Block**: Content with image alternating layout

### CSS Architecture
- CSS-in-JS approach with CSS Custom Properties (variables)
- Mobile-first responsive design
- Performance-optimized: critical styles on initial load, lazy-loaded styles post-LCP
- Consistent color scheme and typography

### JavaScript
- Block- and page-level decoration
- Intersection Observer for lazy loading and animations
- Postal code form handling
- Event tracking support
- Smooth scrolling
- Lazy image loading

## Styling

### Global Variables
The site uses CSS custom properties for consistent theming:

```css
--color-primary: #00427a
--color-secondary: #f39200
--color-text: #333
--font-family-base: System fonts
--max-width: 1200px
```

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Content Sections

1. **Hero Section**: Eye-catching headline and CTA
2. **What is Life Insurance**: Educational content
3. **Benefits**: Feature highlights
4. **Types of Insurance**: Term vs Permanent comparison
5. **How to Get Insurance**: Advisor finder and quote form
6. **FAQ**: Common questions and answers
7. **Resources**: Related content links
8. **Final CTA**: Call-to-action section

## Performance Considerations

### LCP Optimization
- Critical CSS is inline in `styles.css`
- Non-critical styles load in `lazy-styles.css`
- Fonts load asynchronously
- Images can be lazy-loaded with `data-src` attribute

### Best Practices Implemented
- Minimal JavaScript in critical path
- CSS variables for easy theming
- Semantic HTML structure
- Accessible form inputs
- Smooth scrolling animations

## Building Blocks

### Block Structure
Each block should follow this pattern:

```
blocks/blockname/
├── blockname.css     # Styles
└── blockname.js      # Decorator function
```

### Creating a New Block

1. Create a folder in `/blocks/`
2. Add `blockname.css` and `blockname.js`
3. Export a default decorator function from JS:

```javascript
export default async function decorate(block) {
  // Modify block DOM here
}
```

## Customization

### Colors
Edit the CSS variables in `/styles/styles.css`:
```css
:root {
  --color-primary: #00427a;
  --color-secondary: #f39200;
  /* ... */
}
```

### Typography
Fonts are configured in the head.html and lazy-styles.css

### Layout
Modify max-width and spacing variables in styles.css

## API Integration

The site includes examples for integrating:
- Analytics (Google Analytics tracking)
- Advisor finder form
- Quote request forms
- Newsletter signup forms

## Accessibility

- Semantic HTML tags
- Proper heading hierarchy
- Form labels and ARIA attributes
- Color contrast compliance
- Keyboard navigation support

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment Checklist

- [ ] Update meta descriptions
- [ ] Configure robots.txt
- [ ] Set up sitemaps
- [ ] Configure redirects if needed
- [ ] Set up monitoring
- [ ] Configure CDN
- [ ] Test all forms
- [ ] Verify Analytics tracking
- [ ] Run Lighthouse audit
- [ ] Test on mobile devices

## Resources

- [EDS Documentation](https://www.aem.live/docs)
- [Developer Tutorial](https://www.aem.live/developer/tutorial)
- [Block Collection](https://www.aem.live/developer/block-collection)
- [AEM CLI Reference](https://www.aem.live/developer/cli-reference)

## Support

For questions or issues:
- Join the [Discord Community](https://discord.gg/aem-live)
- Check the [FAQ](https://www.aem.live/docs/faq)
- Open an issue on GitHub

## License

This project is provided as-is for demonstration purposes.
