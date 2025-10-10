<div align="center">

# ⚡ ChatMind - Frontend

### *Next.js 14 Web Application with Modern UI*

[![Next.js](https://img.shields.io/badge/Next.js-14.2.33-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Client-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Checkout-008CDD?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

**Location:** `D:\All website project\ChatMind\ai-chat-boot-frontend`

</div>

---

## 📋 Overview

This is the frontend application for ChatMind, built with Next.js 14 App Router, React 18, TypeScript, and Tailwind CSS. It provides a modern, responsive interface for AI-powered conversations with subscription management.

## ✨ Features

### 🎨 **User Interface**
- Modern, clean design with glassmorphism effects
- Full dark mode support with smooth transitions
- Responsive layout for all screen sizes
- Animated elements and micro-interactions
- Professional landing page
- Intuitive navigation

### 🔐 **Authentication**
- Firebase Client SDK integration
- Email/password authentication
- Google OAuth sign-in
- Protected routes middleware
- Password reset functionality
- Session persistence

### 💬 **Chat Features**
- Real-time AI conversations
- Multiple chat sessions
- Message history persistence
- Chat rename with inline editing
- Delete conversations
- Auto-generated chat titles
- Context-aware responses

### 👤 **Profile Management**
- Dedicated settings page (`/settings`)
- Profile picture upload (ImgBB)
- Display name customization
- Email display (read-only)
- Success/error notifications
- Auto-redirect after save

### 💳 **Subscription**
- Beautiful pricing page
- Stripe Checkout integration
- Three pricing tiers (Free, Pro, Team)
- Success modal after payment
- Real-time subscription status
- Upgrade/downgrade options

### 🎯 **User Experience**
- Fast page loads with Next.js 14
- Client-side routing
- Optimistic UI updates
- Loading states and skeletons
- Error boundaries
- Toast notifications

## 📁 Project Structure

```
D:\All website project\ChatMind\ai-chat-boot-frontend\
│
├── 📂 app/                                      # Next.js 14 App Router
│   ├── 📂 (auth)/                              # Authentication group
│   │   ├── 📂 login/                           # Login page
│   │   │   └── 📄 page.tsx
│   │   ├── 📂 register/                        # Sign up page
│   │   │   └── 📄 page.tsx
│   │   └── 📂 forgot-password/                 # Password reset
│   │       └── 📄 page.tsx
│   │
│   ├── 📂 (dashboard)/                         # Protected dashboard
│   │   ├── 📂 chat/                            # Chat interface (6 pages)
│   │   │   ├── 📄 page.tsx                     # Main chat page
│   │   │   └── 📄 layout.tsx                   # Chat layout
│   │   └── 📂 settings/                        # Profile settings
│   │       └── 📄 page.tsx                     # Settings page
│   │
│   ├── 📂 pricing/                             # Pricing & subscriptions
│   │   └── 📄 page.tsx
│   │
│   ├── 📄 page.tsx                             # Landing page
│   ├── 📄 layout.tsx                           # Root layout
│   └── 📄 globals.css                          # Global styles
│
├── 📂 components/                              # React components
│   ├── 📂 chat/                                # Chat-related components
│   │   ├── 📄 ChatSidebar.tsx                  # Sidebar with chat list
│   │   ├── 📄 ChatInterface.tsx                # Main chat UI
│   │   ├── 📄 ChatInput.tsx                    # Message input
│   │   ├── 📄 MessageList.tsx                  # Messages display
│   │   ├── 📄 MessageBubble.tsx                # Individual message
│   │   └── 📄 ProfileMenu.tsx                  # User dropdown
│   │
│   ├── 📂 subscription/                        # Payment components
│   │   ├── 📄 PricingCard.tsx                  # Pricing tier card
│   │   └── 📄 SubscriptionSuccessModal.tsx     # Payment success
│   │
│   └── 📂 ui/                                  # Reusable UI components
│       ├── 📄 Button.tsx                       # Button component
│       ├── 📄 Input.tsx                        # Input component
│       ├── 📄 Modal.tsx                        # Modal wrapper
│       └── 📄 Loading.tsx                      # Loading spinner
│
├── 📂 contexts/                                # React Context API
│   ├── 📄 AuthContext.tsx                      # Authentication state
│   ├── 📄 ChatContext.tsx                      # Chat state & actions
│   └── 📄 ThemeContext.tsx                     # Dark mode toggle
│
├── 📂 lib/                                     # Utility libraries
│   ├── 📄 api.ts                               # Axios API client
│   ├── 📄 firebase.ts                          # Firebase configuration
│   └── 📄 utils.ts                             # Helper functions
│
├── 📂 types/                                   # TypeScript definitions
│   ├── 📄 chat.types.ts                        # Chat interfaces
│   ├── 📄 user.types.ts                        # User interfaces
│   └── 📄 subscription.types.ts                # Subscription types
│
├── 📂 hooks/                                   # Custom React hooks
│   ├── 📄 useAuth.ts                           # Authentication hook
│   ├── 📄 useChat.ts                           # Chat operations hook
│   └── 📄 useTheme.ts                          # Theme toggle hook
│
├── 📂 public/                                  # Static assets
│   ├── 📂 images/                              # Images
│   └── 📂 icons/                               # Icons
│
├── 📄 .env.local                               # Environment variables
├── 📄 .env.local.example                       # Environment template
├── 📄 .gitignore                               # Git ignore rules
├── 📄 next.config.js                           # Next.js configuration
├── 📄 tailwind.config.js                       # Tailwind configuration
├── 📄 tsconfig.json                            # TypeScript configuration
├── 📄 package.json                             # Dependencies & scripts
└── 📄 README.md                                # This file
```

## 🚀 Quick Start

### Prerequisites

- ✅ Node.js 20.x or higher
- ✅ pnpm (recommended) or npm
- ✅ Backend API running at `localhost:5000`
- ✅ Firebase project credentials
- ✅ ImgBB API key
- ✅ Stripe public key

### Installation

```bash
# Navigate to frontend directory
cd "D:\All website project\ChatMind\ai-chat-boot-frontend"

# Install dependencies (pnpm recommended)
pnpm install
# or
npm install
```

### Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# ImgBB API Key (for profile picture uploads)
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key_here

# Stripe Public Key (Test Mode)
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_51xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Firebase Client SDK Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Running the Application

#### Development Mode
```bash
pnpm dev
# or
npm run dev
```
✅ Application starts at `http://localhost:3000`

#### Production Build
```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📄 Pages & Routes

### 🌐 Public Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing Page | Marketing page with features & CTA |
| `/login` | Login Page | Email/password & Google OAuth |
| `/register` | Sign Up Page | User registration form |
| `/forgot-password` | Password Reset | Password recovery form |
| `/pricing` | Pricing Page | Subscription plans |

### 🔒 Protected Routes (Require Authentication)

| Route | Page | Description |
|-------|------|-------------|
| `/chat` | Chat Interface | Main AI chat application |
| `/settings` | Profile Settings | User profile & preferences |

## 🎨 UI Components

### Button Component
```tsx
import Button from '@/components/ui/Button';

<Button
  variant="primary"
  size="lg"
  loading={isLoading}
>
  Click Me
</Button>
```

### Chat Sidebar
- Lists all user conversations
- Shows last updated time
- Hover to reveal edit/delete buttons
- Click edit to rename inline
- Press Enter to save, Escape to cancel

### Profile Menu
- Dropdown from user avatar
- Settings navigation
- Upgrade button (Free users)
- Plan badge (Pro/Team users)
- Logout option

## 🛠️ Development Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Fix linting issues
pnpm lint:fix

# Type check
pnpm type-check
```

## 🎨 Styling & Theming

### Tailwind CSS Classes

The project uses Tailwind CSS with custom configurations:

```javascript
// tailwind.config.js
{
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
      }
    }
  }
}
```

### Dark Mode

Dark mode is implemented using Tailwind's dark mode class:

```tsx
<div className="bg-white dark:bg-gray-900">
  <p className="text-gray-900 dark:text-white">Content</p>
</div>
```

## 🔌 API Integration

### API Client (Axios)

```typescript
// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Auto-attach Firebase token
api.interceptors.request.use(async (config) => {
  const token = await user?.getIdToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

### Example Usage

```typescript
// Create new chat
const response = await api.post('/chats', { title: 'New Chat' });

// Send message
const response = await api.post(`/chats/${chatId}/messages`, {
  content: 'Hello, AI!'
});

// Update profile
const response = await api.put('/users/profile', {
  displayName: 'John Doe',
  photoURL: 'https://...'
});
```

## 🔐 Authentication Flow

### Login Process
1. User enters email/password
2. Firebase Authentication validates
3. JWT token generated
4. Token stored in context
5. User redirected to `/chat`

### Protected Routes
```typescript
// Middleware checks auth status
if (!user) {
  redirect('/login');
}
```

## 💳 Stripe Integration

### Checkout Flow
1. User clicks "Upgrade" on pricing page
2. Frontend calls `/api/stripe/create-checkout-session`
3. Backend creates Stripe session
4. User redirected to Stripe Checkout
5. After payment, redirected to success page
6. Frontend verifies session
7. Subscription synced to database

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration
- [ ] Email/password login
- [ ] Google OAuth login
- [ ] Password reset
- [ ] Create new chat
- [ ] Send message & receive AI response
- [ ] Rename chat
- [ ] Delete chat
- [ ] Update profile picture
- [ ] Change display name
- [ ] Upgrade to Pro plan
- [ ] Dark mode toggle

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Environment Variables in Vercel

Add all `NEXT_PUBLIC_*` variables from `.env.local` to your Vercel project settings.

### Build Configuration

- **Build Command:** `pnpm build` or `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `pnpm install` or `npm install`

## 🎯 Key Features Implementation

### Chat Rename Feature

**User Flow:**
1. Hover over chat in sidebar
2. Click ✏️ edit icon
3. Input field appears inline
4. Type new name
5. Press `Enter` to save or `Escape` to cancel

**Technical:**
- State management with `useState`
- API call: `PATCH /api/chats/:chatId`
- Optimistic UI update
- Error handling with rollback

### Profile Settings Page

**Location:** `/settings`

**Features:**
- Full-page layout (not modal)
- Profile picture upload to ImgBB
- Display name editing
- Success/error alerts
- Auto-redirect to chat after save

## 📊 Performance Optimizations

- ✅ Next.js 14 App Router for faster navigation
- ✅ Image optimization with `next/image`
- ✅ Code splitting with dynamic imports
- ✅ Lazy loading components
- ✅ Memoization with `useMemo` and `useCallback`
- ✅ Debounced search inputs

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
pnpm dev -p 3001
```

### Firebase Authentication Errors
- Check Firebase config in `.env.local`
- Verify authorized domains in Firebase Console
- Ensure API keys are correct

### API Connection Issues
- Verify backend is running on port 5000
- Check CORS settings in backend
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Firebase Web SDK](https://firebase.google.com/docs/web/setup)
- [Stripe.js Reference](https://stripe.com/docs/js)

## 📧 Support

For frontend-specific issues:
- 📂 Check the [issues](https://github.com/yourusername/ai-chat-boot/issues) page
- 💬 Contact: frontend@aichatboot.com

---

<div align="center">

**Built with Next.js 14, React & Tailwind CSS** ⚡

*Part of the ChatMind platform*

### 👩‍💻 Built By

**Aysa Siddika Meem**

*Full Stack Developer*

</div>
