# Manuel's Music Academy Landing Page

A complete, production-ready single-page landing website for Manuel's Music Academy built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎵 **Modern Design**: Clean, music-themed design with green/white color scheme
- 🌙 **Dark/Light Mode**: Toggle between themes with persistence
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- ✨ **Smooth Animations**: Framer Motion animations with scroll triggers
- 🎨 **Green Glow Effects**: Magical hover effects throughout the site
- 🎼 **Musical Watermarks**: Subtle instrument backgrounds for thematic touch
- 📧 **Email Integration**: Secure server-side email sending
- ♿ **Accessible**: WCAG 2.1 AA compliant with proper ARIA labels
- 🚀 **Performance Optimized**: Lazy loading and GPU-accelerated animations

## Setup Instructions

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

All required dependencies are already included in package.json.

### 2. Configure Environment Variables

1. Create an account at [emailjs.com](https://emailjs.com)
2. Create a new email service and template
3. Copy `.env.example` to `.env.local`:

\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Add your EmailJS credentials to `.env.local`

### 3. Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add the environment variables in Vercel project settings
4. Deploy

### 4. Usage

The landing page is automatically rendered at the root route (`/`).

## Sections Included

- **Header/Navigation**: Fixed header with logo, theme toggle, and CTA
- **Hero Section**: Full-width hero with dual CTAs and piano watermark
- **Features Section**: 3-column grid showcasing academy benefits
- **About Founder**: Two-column layout with founder story and image
- **Programs Section**: 4-column grid of music programs offered
- **Testimonials**: Student success stories in card format
- **CTA Section**: Call-to-action with gradient background
- **Contact Section**: Contact information and WhatsApp community link
- **Footer**: Simple footer with contact links

## Customization

### Colors
The primary green color (#10B981) can be customized in the Tailwind config. All green references will automatically update.

### Content
All text content is easily editable within the component. Update the arrays and strings to match your academy's information.

### Animations
Framer Motion variants are defined at the top of the component and can be customized for different animation styles.

### Watermarks
Musical instrument watermarks are implemented using Lucide React icons. You can replace these with custom SVGs if desired.

## Performance Notes

- Images are lazy-loaded
- Animations use `viewport={{ once: true }}` to prevent re-triggering
- Green glow effects are GPU-accelerated
- Component is optimized for bundle size
- Email sending is handled server-side for security

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contact Information

- Phone: +233 55 397 4246, +233 26 577 9952
- Email: manuelsmusicschool@gmail.com
- WhatsApp: [Join Community](https://chat.whatsapp.com/l898oDQtxdVBSIG0WKWqkq)
