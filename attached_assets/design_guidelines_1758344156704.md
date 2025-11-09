# Resume Builder Application Design Guidelines

## Design Approach: Utility-Focused Design System
Following a productivity-focused design system similar to Notion and Linear, emphasizing efficiency, clear information hierarchy, and professional aesthetics suitable for career-focused applications.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Primary: #2563EB (Professional Blue) - CTAs, active states, progress indicators
- Secondary: #10B981 (Success Green) - Completion states, positive feedback
- Accent: #F59E0B (Warm Orange) - Highlights, warnings, premium features

**Neutral Colors:**
- Background: #F8FAFC (Light Grey) - Main background
- Card: #FFFFFF (White) - Forms, templates, preview areas
- Text: #1E293B (Dark Slate) - Primary text content
- Light Text: #64748B - Secondary text, labels

### Typography
- **Primary Font:** Inter (clean, professional)
- **Secondary Font:** Poppins (headings, emphasis)
- **Hierarchy:** H1 (32px), H2 (24px), H3 (20px), Body (16px), Small (14px)
- **Weights:** Regular (400), Medium (500), Semibold (600)

### Layout System
**Spacing:** Consistent 20px spacing system using Tailwind units of 5, 4, 8, 12
- Micro spacing: p-1, m-2 (4px, 8px)
- Standard spacing: p-4, m-5 (16px, 20px) 
- Section spacing: p-8, m-12 (32px, 48px)

### Component Library

**Multi-Step Wizard:**
- Horizontal progress bar with numbered steps
- Step completion indicators with checkmarks
- Navigation buttons (Previous/Next) with primary blue styling
- Form sections in white cards with subtle shadows

**Template Gallery:**
- Grid layout of template cards (3-4 columns on desktop)
- Hover states with subtle elevation
- Template preview thumbnails
- Selection indicators with primary blue borders

**Split-Screen Layout:**
- Left panel: Form inputs (40% width)
- Right panel: Live preview (60% width)
- Responsive collapse to single column on mobile
- Sticky preview panel on desktop

**Form Elements:**
- Clean input fields with subtle borders
- Label positioning above inputs
- Error states in red with inline messaging
- Success states with green accents
- Grouped sections with clear visual separation

**Resume Preview:**
- Professional typography hierarchy
- Clean section dividers
- Consistent spacing matching selected template
- Print-optimized styling for PDF generation

### Interactive Elements
- Subtle hover states on clickable elements
- Loading states for PDF generation
- Form validation feedback
- Progress saving indicators
- Template switching animations (minimal)

### Responsive Design
- Mobile-first approach
- Form steps stack vertically on small screens
- Template gallery adjusts to single column
- Preview panel moves below form on mobile
- Touch-friendly button sizes (minimum 44px)

### Professional Aesthetics
- Minimal use of shadows and effects
- High contrast for accessibility
- Clean, organized information architecture
- Professional color combinations suitable for career documents
- Consistent spacing and alignment throughout

### Images
No hero images required. Focus on:
- Template preview thumbnails in gallery
- User avatar placeholders in forms
- Icon usage from Heroicons for navigation and features
- Subtle background patterns in preview area (optional)

This design system prioritizes usability, professional appearance, and efficient workflow completion while maintaining visual appeal appropriate for a career-focused application.