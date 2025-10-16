# ConfoUP Design Guidelines

## Design Approach
**System-Based with Custom Brand Identity**: Following the detailed brand guidelines provided, implementing a professional compliance platform with institutional elegance and modern interactivity.

## Core Design Principles
- **Professional Authority**: Clean, trustworthy interface reflecting regulatory compliance expertise
- **Bilingual Excellence**: Seamless French/Arabic switching with RTL support for Arabic
- **Data Clarity**: Charts and dashboards prioritize information hierarchy and readability
- **Guided Complexity**: Multi-dashboard system with clear role-based navigation

## Color Palette

### Primary Colors
- **Deep Navy**: `210 96% 13%` - Primary backgrounds, headers, professional foundation
- **Bright Red**: `351 93% 54%` - Primary CTAs, alerts, urgent actions
- **Cyan**: `173 71% 58%` - Innovation indicators, active states, secondary actions
- **Warm Orange**: `33 100% 56%` - Dynamism, progress indicators, hover states

### Supporting Colors
- **Off White**: `120 100% 99%` - Light mode backgrounds, card surfaces
- **Charcoal**: `210 40% 15%` - Dark mode backgrounds
- **Success Green**: `142 76% 36%` - Compliance status, positive indicators
- **Warning Amber**: `38 92% 50%` - Pending alerts, attention needed

## Typography
- **Primary Font**: Cairo (for Arabic support) or Poppins (Latin scripts)
- **Headings**: 700 weight, Navy or White depending on background
- **Body**: 400 weight, size 16px base, line-height 1.6
- **Dashboard Labels**: 600 weight, size 14px, uppercase tracking
- **Data Points**: 700 weight, size 24-32px for key metrics

## Layout System
**Tailwind Spacing Units**: Consistent use of 4, 6, 8, 12, 16, 20, 24 for all spacing
- **Card Padding**: p-6 (desktop), p-4 (mobile)
- **Section Spacing**: py-20 (desktop), py-12 (mobile)
- **Component Gaps**: gap-6 for grids, gap-4 for lists
- **Container**: max-w-7xl for dashboards, max-w-6xl for vitrine pages

## Component Library

### Navigation
- **Top Navigation Bar**: Fixed, Deep Navy background, height 16 (h-16)
- **Logo**: Left-aligned with brand icon + "ConfoUP" wordmark
- **User Type Buttons**: Center-aligned pill buttons (Entreprise, Particulier, Bureau d'Étude) with icon prefixes
- **Auth Buttons**: Right-aligned, Red primary CTA, Cyan outline for login
- **Language Toggle**: FR/AR switch with flag icons, smooth slide animation

### Dashboard Sidebar
- **Width**: w-64 (desktop), collapsible on mobile
- **Background**: Deep Navy with 5% Cyan tint
- **Active Item**: Cyan left border (4px) + Cyan/10 background
- **Icons**: 20px, Cyan color for active, Off White/60 for inactive
- **Hover**: Cyan/20 background transition

### Cards & Panels
- **Surface**: Off White background (light mode), Charcoal (dark mode)
- **Border**: 1px Cyan/20, rounded-xl (12px radius)
- **Shadow**: Subtle elevation: 0 4px 6px Navy/5
- **Header**: Cyan accent line (2px) on top edge
- **Hover Effect**: Lift with shadow-lg and Cyan/30 border

### Buttons
- **Primary (Red)**: bg-[351-93-54], white text, rounded-lg, px-6 py-3, hover: Orange gradient
- **Secondary (Cyan)**: border-2 Cyan, Cyan text, rounded-lg, hover: Cyan/10 background
- **Icon Buttons**: 40px square, rounded-full, Navy/10 background, hover: scale to 1.1

### Charts & Data Visualization
- **Library**: Recharts with custom brand colors
- **Bar Charts**: Cyan primary bars, Red for alerts, Orange for trends
- **Pie/Donut**: Segment colors: Cyan, Red, Orange, Navy, rotating palette
- **Line Charts**: Cyan line, Red markers for critical points, gradient fill below
- **Grid Lines**: Navy/10 color, dashed style
- **Tooltips**: White background, Navy text, Cyan border-left accent

### Forms & Inputs
- **Input Fields**: border-2 Navy/20, rounded-lg, focus: Cyan border + Cyan/5 background
- **Labels**: Navy/80 color, 600 weight, mb-2
- **Validation**: Red border for errors, Green for success, inline icons
- **Search Bar**: Cyan accent on focus, microphone icon for voice input (Particulier dashboard)

### Alert/Notification Cards
- **Structure**: Left colored bar (4px) indicating priority: Red (urgent), Orange (medium), Cyan (info)
- **Background**: White with subtle colored tint matching bar
- **Icon**: Top-left, matching bar color
- **Timestamp**: Navy/60, small text, top-right
- **Action Button**: Cyan outline, bottom-right

## Page-Specific Layouts

### Vitrine/Landing Page
- **Hero Section**: Full-bleed height (min-h-screen), Deep Navy background with subtle geometric pattern overlay
- **Hero Image**: Right-aligned dashboard mockup screenshot with perspective tilt, glowing Cyan edge effect
- **Tagline**: 48px bold white text, French primary with Arabic subtitle below
- **CTA Cluster**: Three gradient buttons (Entreprise/Particulier/Bureau), stacked on mobile
- **Who We Are**: Two-column layout, left: Peak Power World branding, right: ConfoUP mission text
- **Engagement Section**: Three-column value cards with icons (Trust, Innovation, Progress), Cyan top borders
- **Awareness Section**: Interactive BO document preview with AI summary visualization
- **Footer**: Four columns: About, User Types, Resources, Contact, Deep Navy background

### Entreprise Dashboard
- **Grid Layout**: 12-column responsive grid
- **Top Metrics Bar**: 4 cards showing: Total Alerts, Active Regulations, Compliance Score, Recent Activity
- **Main Section**: 8-column "Latest BO Updates" feed (left) + 4-column "Quick Actions" sidebar (right)
- **Charts Area**: Two-column: Bar chart (alert categories) + Pie chart (regulation types)
- **Alert List**: Table format with color-coded priority dots, filterable columns

### Particulier Dashboard
- **Centered Search**: Full-width search bar with voice button, Cyan accent glow on focus
- **Recent Publications Grid**: 3-column masonry layout, card-based with AI summary previews
- **Saved Items Sidebar**: Right-aligned, sticky, shows favorited documents with quick access
- **Filter Panel**: Collapsible left sidebar with date range, category checkboxes, field selectors

### Bureau d'Étude Dashboard
- **Entreprise Boxes Overview**: Card grid (3 columns desktop, 1 mobile), each showing company name, alert count, status indicator
- **Active Box View**: Tabbed interface switching between box details, alerts timeline, team members
- **Multi-Chart Section**: Donut chart (alert status) + Heatmap (activity) + Line trend (monthly)
- **Timeline View**: Vertical timeline with Cyan connector line, event cards attached

## Responsive Breakpoints
- **Mobile**: < 768px - Single column, collapsible sidebar, stacked charts
- **Tablet**: 768-1024px - Two columns, condensed sidebar, side-by-side charts
- **Desktop**: > 1024px - Full 12-column grid, expanded sidebar, dashboard richness

## Animations
- **Hover States**: 200ms ease-out scale transforms on cards/buttons
- **Page Transitions**: 300ms fade-in for route changes
- **Chart Animations**: Staggered bar/line drawing on load (800ms duration)
- **Language Switch**: 400ms slide transition with content fade

## Dark Mode Implementation
- **Background**: Charcoal (#0A1628) instead of Off White
- **Text**: Off White instead of Navy
- **Cards**: Navy/40 backgrounds with Cyan/10 borders
- **Charts**: Maintain Cyan/Red/Orange, adjust opacity for readability

## Images
- **Hero Image**: Dashboard mockup showing multi-user interface with charts, positioned right with 15deg perspective tilt, add subtle Cyan glow effect
- **Value Icons**: Custom illustrated icons for Trust (shield), Innovation (circuit), Progress (arrow-up-chart)
- **BO Document Previews**: Official Moroccan BO document thumbnails in search results and alerts
- **User Avatars**: Circular, 40px default, with initials fallback in Cyan backgrounds