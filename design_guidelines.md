# Resume Builder Design Guidelines

## Design Approach
**Reference-Based Approach**: Inspired by Zety.com and Resume-Now.com's professional template variety and clean, modern resume designs. Focus on utility-first design with professional aesthetics that serve both job seekers and recruiters.

## Core Design Elements

### Color Palette
**Primary Colors (Dark Mode):**
- Background: 216 25% 12% (deep navy-gray)
- Surface: 216 20% 18% (elevated surface)
- Text Primary: 216 15% 95% (near white)
- Text Secondary: 216 10% 70% (muted text)

**Primary Colors (Light Mode):**
- Background: 216 20% 98% (soft white)
- Surface: 0 0% 100% (pure white)
- Text Primary: 216 25% 15% (dark navy)
- Text Secondary: 216 15% 45% (medium gray)

**Brand Colors:**
- Primary: 216 85% 55% (professional blue)
- Success: 142 70% 45% (template success states)
- Warning: 38 95% 55% (content alerts)

### Typography
**Font Families:**
- Primary: Inter (interface text, clean and readable)
- Resume Content: Source Serif Pro (resume template content)
- Accent: Poppins (headings and emphasis)

**Scale:**
- Headings: text-2xl to text-4xl (24px-36px)
- Body: text-base (16px)
- Small: text-sm (14px)
- Resume Content: Dynamically scaled based on template

### Layout System
**Spacing Primitives:** Use Tailwind units of 2, 4, 8, 12, and 16
- Component spacing: p-4, m-8
- Section gaps: gap-8, gap-12
- Layout margins: mx-4, mx-8

### Component Library

**Navigation:**
- Clean header with template categories
- Sidebar template browser with thumbnail previews
- Breadcrumb navigation for template selection flow

**Template Selection:**
- Grid layout with live preview thumbnails
- Category filters (Traditional, Modern, Creative, Executive, ATS-Optimized)
- Hover states showing template names and brief descriptions
- Selected state with subtle border highlight

**Template Editor:**
- Split-screen layout: form editor (left) + live preview (right)
- Real-time preview updates without lag
- Template switcher dropdown maintaining user data
- Section-based form organization matching resume structure

**Data Display:**
- Clean form inputs with consistent styling
- Auto-growing text areas for descriptions
- Skill rating components with visual indicators
- Date pickers with professional styling

**Resume Templates:**
- 25+ templates across 5 distinct categories
- Consistent typography hierarchy within each template family
- Professional color schemes per template
- Responsive layouts that maintain formatting integrity

## Template Categories & Visual Treatment

**Traditional Templates:**
- Conservative layouts with serif fonts
- Minimal color usage (navy, dark gray)
- Clear section divisions
- Classic single-column or simple two-column layouts

**Modern Templates:**
- Sans-serif typography
- Strategic use of brand blue for section headers
- Clean lines and ample whitespace
- Innovative yet professional layouts

**Creative Templates:**
- Unique visual elements (tasteful use of icons, graphics)
- Bolder color schemes while maintaining professionalism
- Creative section arrangements
- Modern typography mixing

**Executive Templates:**
- Sophisticated, minimal design
- Premium feel with refined typography
- Emphasis on achievements and leadership
- Clean, authoritative layouts

**ATS-Optimized Templates:**
- Simple, machine-readable layouts
- Standard section ordering
- Minimal formatting complexity
- Focus on content hierarchy

## Real-Time Features
- Instantaneous preview updates as users type
- Smart text overflow handling with automatic font size adjustments
- Dynamic section reordering based on content priority
- Live character count and optimization suggestions

## Interactions
- Smooth template transitions preserving user data
- Subtle hover effects on template thumbnails
- Loading states for PDF generation
- Toast notifications for save states and warnings

**No Complex Animations:** Keep interactions clean and fast-loading to maintain professional focus.

This design system prioritizes professional utility while maintaining visual appeal, ensuring both job seekers and recruiters have an optimal experience with clean, readable, and impressive resume outputs.