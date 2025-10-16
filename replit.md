# ConfoUP - Smart BO Compliance Platform

## Overview
ConfoUP is a comprehensive compliance platform that helps Moroccan organizations manage and understand official Bulletin Officiel (BO) documents through AI-powered filtering and summarization. Built with MERN stack + Firebase.

## Purpose
Transform complex Moroccan regulatory documents into clear, actionable insights for three distinct user types:
- **Entreprise**: Companies monitoring sector-specific compliance
- **Particulier/Étudiant**: Individuals researching official publications
- **Bureau d'Étude**: Consulting firms managing multiple client companies

## Current State
✅ MVP Complete - All three dashboards fully functional with bilingual support (FR/AR)

## Recent Changes (January 16, 2025)
- Implemented complete authentication system with Firebase (email/password + Google OAuth)
- Built all three user dashboards with role-based access control
- Created comprehensive data schema for users, BO documents, alerts, and entreprise boxes
- Integrated Recharts for interactive data visualization (bar, pie, donut, line charts)
- Implemented bilingual interface with French/Arabic toggle and RTL support
- Added theme toggle (light/dark mode) with persistent localStorage
- Configured brand colors: Deep Navy (#051943), Bright Red (#F71735), Cyan (#41EAD4), Warm Orange (#FF9F1C)
- Set up in-memory storage with mock Moroccan BO documents and AI-generated summaries
- Created complete API layer with REST endpoints for all features

## User Preferences
- **Brand Identity**: Professional, elegant, institutional + startup hybrid
- **Color Palette**: Deep Navy (primary), Bright Red (CTAs/alerts), Cyan (innovation), Warm Orange (dynamism)
- **Typography**: Poppins (Latin), Cairo (Arabic support)
- **Design Approach**: Clean, luxurious, accessible, bilingual-first

## Project Architecture

### Frontend Stack
- **React** with TypeScript for type safety
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management
- **Recharts** for data visualization
- **Tailwind CSS** + Shadcn UI for design system
- **Firebase SDK** for authentication
- **i18next-inspired** custom bilingual system (FR/AR)

### Backend Stack
- **Express.js** REST API
- **Firebase Authentication** (email/password + Google OAuth)
- **In-memory storage** (MemStorage) for MVP - ready for PostgreSQL migration
- **Zod validation** for request schemas
- **TypeScript** for end-to-end type safety

### Key Features by User Role

#### Entreprise Dashboard
- Latest BO updates filtered by sector
- Business insights with bar/pie charts
- Alert management system
- Active regulations tracking
- Compliance score monitoring

#### Particulier Dashboard
- Smart search with text/voice input
- Recent BO publications with AI summaries
- Favorites/bookmarking system
- Category and date filters
- Bilingual document viewing

#### Bureau d'Étude Dashboard
- Multiple entreprise boxes management
- Aggregated alerts across all clients
- Donut charts for status visualization
- Line charts for trend analysis
- Add/manage entreprise boxes

### Authentication Flow
1. User selects role (Entreprise/Particulier/Bureau)
2. Sign up with email/password or Google OAuth
3. Firebase creates user account
4. Backend stores user profile with role
5. Role-specific onboarding (Entreprise/Bureau only)
6. Redirect to role-appropriate dashboard

### Data Models
- **Users**: Core user data with Firebase UID and role
- **Entreprise Profiles**: Company details for Entreprise users
- **Bureau Profiles**: Organization details for Bureau users
- **BO Documents**: Official publications with bilingual content and AI summaries
- **Alerts**: User-specific BO notifications
- **Favorites**: Saved documents for Particulier users
- **Entreprise Boxes**: Bureau-managed client companies
- **Box Alerts**: Box-specific BO notifications

### Environment Variables
- `VITE_FIREBASE_API_KEY`: Firebase API key (frontend)
- `VITE_FIREBASE_PROJECT_ID`: Firebase project ID (frontend)
- `VITE_FIREBASE_APP_ID`: Firebase app ID (frontend)

### API Endpoints

#### Users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/by-firebase-uid/:firebaseUid` - Get user by Firebase UID
- `POST /api/users` - Create new user

#### BO Documents
- `GET /api/bo-documents` - Get all documents
- `GET /api/bo-documents/latest` - Get latest documents (limit param)
- `GET /api/bo-documents/:id` - Get document by ID
- `POST /api/bo-documents` - Create new document

#### Alerts
- `GET /api/alerts/by-user/:userId` - Get user alerts
- `POST /api/alerts` - Create alert
- `PATCH /api/alerts/:id/read` - Mark alert as read

#### Favorites
- `GET /api/favorites/by-user/:userId` - Get user favorites
- `POST /api/favorites` - Create favorite
- `DELETE /api/favorites/:id` - Delete favorite

#### Entreprise Boxes
- `GET /api/entreprise-boxes/by-bureau/:bureauUserId` - Get bureau's boxes
- `GET /api/entreprise-boxes/:id` - Get box by ID
- `POST /api/entreprise-boxes` - Create box
- `PATCH /api/entreprise-boxes/:id` - Update box

#### Box Alerts
- `GET /api/box-alerts/by-box/:boxId` - Get box alerts
- `POST /api/box-alerts` - Create box alert
- `PATCH /api/box-alerts/:id/resolve` - Mark alert as resolved

### File Structure
```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn components
│   │   ├── Logo.tsx
│   │   ├── TopNavigation.tsx
│   │   ├── LanguageToggle.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── DashboardLayout.tsx
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.tsx
│   │   ├── LanguageContext.tsx
│   │   └── ThemeContext.tsx
│   ├── lib/               # Utilities
│   │   ├── firebase.ts
│   │   ├── i18n.ts
│   │   └── queryClient.ts
│   ├── pages/             # Page components
│   │   ├── auth/
│   │   ├── entreprise/
│   │   ├── particulier/
│   │   ├── bureau/
│   │   └── Landing.tsx
│   └── App.tsx

server/
├── routes.ts              # API endpoints
├── storage.ts             # Data layer (in-memory)
└── index.ts               # Express server

shared/
└── schema.ts              # Shared types & Zod schemas
```

### Design System
- **Colors**: Defined in `index.css` with HSL format for light/dark mode
- **Typography**: Poppins/Cairo fonts, hero (48px), display (40px), body (16px)
- **Spacing**: Tailwind standard scale (4, 6, 8, 12, 16, 20, 24)
- **Components**: Shadcn UI with custom brand theming
- **Interactions**: hover-elevate and active-elevate-2 utilities from index.css

### Deployment Notes
- Frontend and backend run on same port (5000) via Vite proxy
- Firebase Auth configured for `bo-maroc.firebaseapp.com`
- Add production domain to Firebase authorized domains before deployment
- Mock data pre-populated with 5 Moroccan BO documents

### Future Enhancements
- Real Moroccan BO API integration
- OpenAI integration for live document summarization
- Firebase Cloud Messaging for push notifications
- PostgreSQL database migration
- Team member management for Bureau users
- Advanced analytics and heatmaps
- ConfoUP Academy (educational content)
