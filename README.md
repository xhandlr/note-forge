<div align="center">

# 📚 Note Forge

<p align="center">
  <strong>A production-ready educational platform with enterprise-grade UI/UX</strong>
</p>

<p align="center">
  Full-stack application for organizing study materials with LaTeX support, drag-and-drop workflows, and real-time collaboration features
</p>

<p align="center">
  <a href="https://xhandlr.github.io/note-forge/">🎮 Live Demo</a> •
  <a href="#-key-features">✨ Features</a> •
  <a href="#-getting-started">📖 Docs</a> •
  <a href="https://github.com/xhandlr/note-forge/issues">🐛 Issues</a>
</p>

<br>

<div align="center">

| 📊 **Project** | ⚡ **Tech Stack** | 🚀 **Performance** | 🤝 **Community** |
|:---:|:---:|:---:|:---:|
| [![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)](https://xhandlr.github.io/note-forge/) | [![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/) | [![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/) | [![Issues](https://img.shields.io/github/issues/xhandlr/note-forge?style=for-the-badge&logo=github)](https://github.com/xhandlr/note-forge/issues) |
| [![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE) | [![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) | [![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) | [![PRs](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](https://github.com/xhandlr/note-forge/pulls) |
| [![Node](https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) | [![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/) | [![i18n](https://img.shields.io/badge/i18n-Ready-26A69A?style=for-the-badge&logo=google-translate&logoColor=white)](https://www.i18next.com/) | [![Stars](https://img.shields.io/github/stars/xhandlr/note-forge?style=for-the-badge&logo=github)](https://github.com/xhandlr/note-forge/stargazers) |

</div>

---

</div>

## Table of Contents

- [🎯 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🎨 Screenshots](#-screenshots)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [⚡ Getting Started](#-getting-started)
  - [Quick Start (Demo)](#quick-start-demo)
  - [Prerequisites](#prerequisites)
  - [Manual Installation](#manual-installation)
  - [Docker Installation](#docker-installation)
- [📁 Project Structure](#-project-structure)
- [🌍 Internationalization](#-internationalization)
- [🎯 Use Cases](#-use-cases)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Overview

**Note Forge** is a modern, full-stack educational platform designed to revolutionize how students, educators, and teaching assistants organize and share study materials. Built with cutting-edge technologies and an unwavering focus on user experience, it combines the power of LaTeX typesetting with intuitive drag-and-drop interfaces.

### Why Note Forge?

Traditional methods of organizing educational content are fragmented and inefficient. Note Forge addresses these challenges by providing:

#### 🎓 **For Students**
Centralize all your study materials in one beautiful, searchable platform. No more hunting through scattered PDFs or losing track of important exercises.

#### 👨‍🏫 **For Educators**
Build reusable exercise libraries, create professional study guides with LaTeX formatting, and organize content by difficulty level or topic—all in minutes, not hours.

#### 👨‍💼 **For Teaching Assistants**
Quickly assemble custom study materials from existing exercise banks. Generate publication-ready PDFs with proper mathematical notation using built-in LaTeX support.

### What Makes It Different?

- **🎨 Production-Ready UI**: Meticulously crafted interface with smooth animations, responsive layouts, and accessibility in mind
- **⚡ Lightning Fast**: Built on Vite for instant hot module replacement and optimized builds
- **🌍 Global-Ready**: Complete internationalization support with English and Spanish (easily extensible)
- **🎮 Try Before You Commit**: Interactive demo mode—no registration required to explore full functionality
- **🏗️ Enterprise Architecture**: Factory pattern, service abstraction, and TypeScript for maintainability and scalability

---

## ✨ Key Features

### 🎨 Enterprise-Grade UI/UX Design

Experience a carefully crafted interface that rivals commercial education platforms:

- **🎭 Sophisticated Visual Design**
  - Clean, minimalist aesthetic with purposeful use of whitespace
  - Consistent design language across 15+ unique views
  - Smooth micro-interactions and state transitions (hover, active, focus states)
  - Custom-designed loading states and empty states with engaging illustrations

- **📱 Fully Responsive & Accessible**
  - Mobile-first approach with breakpoint optimization for tablet and desktop
  - Touch-friendly interfaces with appropriate hit targets
  - Semantic HTML and ARIA labels for screen reader support
  - Keyboard navigation support throughout the application

- **🎯 Intuitive Navigation System**
  - Smart navbar with active route indicators and smooth underline animations
  - Breadcrumb navigation for deep page hierarchies
  - Contextual action buttons that adapt to current view
  - Mobile hamburger menu with slide-in animation

- **🎨 Modern Design Elements**
  - Rounded corners with `rounded-[2.5rem]` for contemporary feel
  - Subtle shadows and depth layers for visual hierarchy
  - Custom scrollbars that match the design system
  - Thoughtful color palette (slate, rose, amber) with excellent contrast ratios

### 📝 Powerful Exercise Management System

Professional-grade tools for creating and organizing educational content:

- **✍️ Advanced LaTeX Editor**
  - Real-time LaTeX rendering for mathematical expressions
  - Syntax highlighting for better code readability
  - Support for complex equations, matrices, and scientific notation
  - Preview mode to verify formatting before saving

- **📊 Rich Metadata & Organization**
  - 5-level difficulty rating system with visual indicators
  - Duration estimates for time-boxed study sessions
  - Multi-tag support for cross-category organization
  - Custom image upload with Unsplash integration
  - Creation timestamps and author attribution

- **🔍 Advanced Search & Filtering**
  - Full-text search across titles and descriptions
  - Real-time filtering with instant results
  - Multi-criteria filtering (category, difficulty, tags)
  - Debounced search input for optimal performance

- **📸 Visual-First Organization**
  - Card-based layouts with high-quality images
  - Grid and list view options
  - Hover effects revealing additional metadata
  - Smooth image transitions and lazy loading

### 🎯 Interactive Study Guide Builder

Revolutionary drag-and-drop interface for creating study materials:

- **🖱️ Intuitive Drag & Drop**
  - Reorder exercises with smooth animations
  - Visual feedback during drag operations
  - Drop zones with hover states
  - Touch support for mobile devices

- **📖 Unified Workspace Design**
  - Three-panel layout: configuration, exercise library, and preview
  - Collapsible sections for focused work
  - Persistent state across sessions
  - Real-time sync between panels

- **📐 LaTeX Document Preview**
  - Live preview of final document structure
  - Syntax-highlighted LaTeX code display
  - Line-by-line generation preview
  - Dark theme code editor with custom styling

- **📊 Intelligent Metrics**
  - Automatic total time calculation (15 min per exercise)
  - Average difficulty computation with visual indicators
  - Exercise count tracking
  - Complexity warnings for overly long guides

- **💾 Export & Save Options**
  - Save as draft for later editing
  - Export to LaTeX (.tex files)
  - PDF generation (planned)
  - Version history tracking (planned)

### 📁 Flexible Multi-Level Category System

Organize content exactly how you need it:

- **🗂️ Hierarchical Organization**
  - Subject-based categorization (Physics, Math, etc.)
  - Nested subcategories support
  - Cross-category references
  - Unlimited category creation

- **🖼️ Visual Category Management**
  - Custom images for each category (Unsplash integration)
  - Rich descriptions with markdown support
  - Color-coded badges and labels
  - Pin important categories to top

- **📄 Dedicated Category Views**
  - Beautiful hero sections with cover images
  - Tabbed interface for exercises vs. guides
  - Statistics dashboard (exercise count, guide count)
  - Quick action buttons for creating content

- **🔖 Smart Organization Features**
  - Recently accessed categories
  - Most-used categories tracking
  - Empty state prompts for new users
  - Bulk operations (move, delete, export)

### 🌍 Global-Ready Architecture

Built for international audiences from day one:

- **🗣️ Complete i18n Support**
  - English and Spanish translations included
  - Easy to add new languages (JSON-based)
  - Dynamic language switching without reload
  - RTL support ready (planned)
  - Date and number localization

- **🎮 Interactive Demo Mode**
  - Full-featured demo without registration
  - Comprehensive mock data (categories, exercises, guides)
  - 300ms simulated API latency for realistic feel
  - Automatic activation on GitHub Pages
  - Seamless transition to real backend

- **🏭 Factory Pattern Architecture**
  - Service abstraction layer for data sources
  - Easy switching between demo and production
  - Mock services mirror real API structure
  - Type-safe service interfaces
  - Minimal code changes for deployment

---

## 🎨 Screenshots

> 📸 **Coming Soon!** Beautiful screenshots showcasing the platform's interface, drag-and-drop functionality, and LaTeX editor will be added here.

**Planned Screenshots:**
- 🏠 Landing page with demo mode button
- 📊 Dashboard with pinned categories
- ✏️ Exercise creation form with LaTeX preview
- 🎯 Unified guide builder workspace
- 📱 Mobile responsive views
- 🌍 Language selector in action

---

## 🏗️ Architecture

Note Forge follows modern architectural principles for maintainability and scalability:

### Design Patterns

**Factory Pattern** - Service abstraction layer
```typescript
// Seamless switching between mock and real services
const exerciseService = useExerciseService();
// Returns mockExerciseService in demo mode
// Returns realExerciseService in production
```

**Context API** - Global state management
- `DemoContext` - Manages demo mode state
- `NotificationContext` - Toast notifications system
- Future: `ThemeContext`, `AuthContext`

**Custom Hooks** - Reusable logic
- `useDemoMode()` - Demo mode state and actions
- `useNotification()` - Toast notification system
- `useCategoryService()`, `useExerciseService()`, `useGuideService()` - Service factories

### Component Architecture

```
src/
├── components/
│   ├── UI/               # Reusable UI components
│   │   ├── Button
│   │   ├── Icon
│   │   ├── LanguageToggle
│   │   └── NotificationContainer
│   └── Dashboard/        # Feature-specific components
│       ├── Navbar
│       └── Footer
├── pages/                # Route-based page components
│   ├── Auth/
│   ├── Categories/
│   ├── Exercises/
│   └── Guides/
├── contexts/             # React Context providers
├── services/             # API & mock services
├── mocks/               # Demo mode data
└── i18n/                # Internationalization
```

### Data Flow

1. **User Action** → Component event handler
2. **Service Call** → Factory returns appropriate service (mock/real)
3. **API/Mock** → Simulated delay for realistic UX
4. **State Update** → React state management
5. **UI Update** → Re-render with new data

### Type Safety

- **TypeScript** throughout codebase
- Interface definitions for all data models
- Type-safe service methods
- Props validation with TypeScript interfaces

---

## 🛠️ Tech Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3 | UI library with hooks and functional components |
| **TypeScript** | 5.5 | Type safety and enhanced developer experience |
| **Vite** | 5.0 | Lightning-fast build tool and dev server with HMR |
| **TailwindCSS** | 3.4 | Utility-first CSS framework for rapid UI development |
| **React Router** | 6.x | Client-side routing with nested routes |
| **Lucide React** | Latest | 1000+ consistent, customizable icons |
| **react-i18next** | Latest | Complete i18n solution with language detection |

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 22+ | JavaScript runtime with ES modules support |
| **Express** | 4.x | Fast, minimalist web framework |
| **MySQL** | 8.0+ | Relational database with JSON support |
| **JWT** | Latest | Stateless authentication tokens |
| **bcrypt** | Latest | Password hashing and security |

### Development Tools & Libraries

**Build & Development**
- Vite for instant hot module replacement
- ESLint + TypeScript ESLint for code quality
- Prettier for consistent code formatting (planned)
- PostCSS for CSS transformations

**UI/UX Enhancements**
- Custom TailwindCSS configuration
- CSS transitions and animations
- Custom scrollbar styling
- Responsive breakpoints (sm, md, lg, xl, 2xl)

**Code Architecture**
- Factory Pattern for service abstraction
- Context API for global state
- Custom React hooks for reusable logic
- TypeScript interfaces for type safety

**DevOps & Deployment**
- Docker & Docker Compose for containerization
- GitHub Pages for demo deployment
- Environment variable management
- Automated build pipeline (planned)

---

## ⚡ Getting Started

### Quick Start (Demo)

The fastest way to explore Note Forge is through our interactive demo:

1. **Visit** [xhandlr.github.io/note-forge](https://xhandlr.github.io/note-forge/)
2. **Click** "Probar sin registrarse" on the landing page
3. **Explore** full functionality with realistic mock data
4. **No registration** or setup required!

The demo includes:
- ✅ 3 pre-configured categories (Physics, Mathematics, Chemistry)
- ✅ 5 sample exercises with LaTeX formatting
- ✅ 3 study guides with drag-and-drop functionality
- ✅ Full navigation and search capabilities
- ✅ Simulated 300ms API latency for realistic feel

### Prerequisites

For local development, ensure you have:

- ✅ **Node.js** `v22.x+` - [Download](https://nodejs.org/)
- ✅ **MySQL** `8.0+` - [Installation Guide](https://dev.mysql.com/downloads/mysql/)
- 🐳 **Docker/Podman** *(optional)* - [Get Docker](https://www.docker.com/)
- 📦 **npm** or **pnpm** - Comes with Node.js

---

### Manual Installation

1. **Clone the repository**

```bash
git clone https://github.com/xhandlr/note-forge.git
```
```bash
cd note-forge
```

2. **Set up the database**

Make sure MySQL **is running**, then log into your MySQL client and execute the script located a ```db/init.sql```.

3. **Configure environment variables**

```bash
cp note-forge-api/.env.example note-forge-api/.env
```

Edit the new .env file and update your DB credentials and JWT_SECRET.

4. **Start the backend**

```bash
cd note-forge-api
```
```bash
npm install
```
```bash
node index.js
```
By default, the API will run at: **http://localhost:5000**

5. **Start the frontend**

```bash
cd ../note-forge-ui
```
```bash
npm install
```
```bash
npm run dev
```
Access the app at: **http://localhost:5173**

### Docker Installation

If you prefer to run the app using containers:

1. **Clone the repository**

```bash
git clone https://github.com/xhandlr/note-forge.git
```
```bash
cd note-forge
```

2. **Start services with Docker Compose**

```bash
docker-compose up -d
```

This will start:

+ MySQL with initial schema

+ Backend API

+ Frontend UI

Visit **http://localhost:5173** to use the app.

---

## 📁 Project Structure

### Monorepo Architecture

```bash
note-forge/
│
├── 🗃️  db/                          # Database Layer
│   ├── init.sql                     # Initial schema and tables
│   └── seed.sql                     # Sample data (optional)
│
├── ⚡ note-forge-api/               # Backend Service (Node.js + Express)
│   ├── config/
│   │   ├── db.js                    # MySQL connection config
│   │   └── auth.js                  # JWT configuration
│   ├── controllers/
│   │   ├── CategoryController.js    # Category CRUD operations
│   │   ├── ExerciseController.js    # Exercise management
│   │   └── GuideController.js       # Guide generation logic
│   ├── services/
│   │   ├── CategoryService.js       # Business logic
│   │   ├── ExerciseService.js
│   │   └── GuideService.js
│   ├── models/
│   │   └── database/                # SQL queries and models
│   ├── routes/
│   │   ├── categoryRoutes.js        # API endpoints
│   │   ├── exerciseRoutes.js
│   │   └── guideRoutes.js
│   ├── middleware/
│   │   └── auth.js                  # JWT verification
│   ├── .env.example                 # Environment template
│   ├── index.js                     # Server entry point
│   └── package.json
│
├── 🎨 note-forge-ui/                # Frontend Application (React + TypeScript)
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── assets/                  # Images, fonts
│   │   ├── components/
│   │   │   ├── UI/                  # Reusable UI components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Icon.tsx
│   │   │   │   ├── LanguageToggle.tsx
│   │   │   │   ├── NotificationContainer.tsx
│   │   │   │   └── Footer.tsx
│   │   │   └── Dashboard/
│   │   │       └── Navbar.tsx       # Main navigation
│   │   ├── contexts/
│   │   │   ├── DemoContext.tsx      # Demo mode state
│   │   │   └── NotificationContext.tsx
│   │   ├── pages/
│   │   │   ├── Auth/
│   │   │   │   ├── Home.tsx         # Landing page
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Registration.tsx
│   │   │   ├── Categories/
│   │   │   │   ├── CategoryView.tsx # Category detail page
│   │   │   │   ├── CreateCategory.tsx
│   │   │   │   └── EditCategory.tsx
│   │   │   ├── Exercises/
│   │   │   │   ├── ExerciseView.tsx
│   │   │   │   ├── CreateExercise.tsx
│   │   │   │   └── EditExercise.tsx
│   │   │   ├── Guides/
│   │   │   │   ├── GuideForm.tsx    # Unified workspace
│   │   │   │   ├── CreateGuide.tsx
│   │   │   │   └── EditGuide.tsx
│   │   │   ├── Dashboard/
│   │   │   │   └── Dashboard.tsx    # Main dashboard
│   │   │   └── Search/
│   │   │       └── SearchPage.tsx
│   │   ├── services/
│   │   │   ├── serviceFactory.ts    # Factory pattern
│   │   │   ├── CategoryService.ts   # Real API calls
│   │   │   ├── ExerciseService.ts
│   │   │   ├── GuideService.ts
│   │   │   └── LoginService.ts
│   │   ├── mocks/
│   │   │   ├── mockData.ts          # Demo data
│   │   │   └── mockServices.ts      # Mock API implementations
│   │   ├── i18n/
│   │   │   ├── en.json              # English translations
│   │   │   └── es.json              # Spanish translations
│   │   ├── index.tsx                # App entry point
│   │   ├── App.tsx                  # Root component
│   │   └── index.css                # Global styles
│   ├── vite.config.ts               # Vite configuration
│   ├── tailwind.config.js           # TailwindCSS config
│   ├── tsconfig.json                # TypeScript config
│   └── package.json
│
├── 🐳 docker-compose.yml            # Multi-container orchestration
├── 📄 README.md                     # This file
└── 📜 LICENSE                       # MIT License
```

---

## 🌍 Internationalization

Note Forge is built with global audiences in mind. The i18n system uses **react-i18next** for comprehensive translation support.

### Current Languages

| Language | Code | Status | Coverage |
|----------|------|--------|----------|
| 🇬🇧 English | `en` | ✅ Complete | 100% |
| 🇪🇸 Spanish | `es` | ✅ Complete | 100% |

### Adding a New Language

1. Create translation file in `note-forge-ui/src/i18n/`:
```json
// fr.json (French)
{
  "navbar": {
    "dashboard": "Tableau de bord",
    "logout": "Se déconnecter"
  },
  "home": {
    "description": "Votre plateforme..."
  }
}
```

2. Import in `i18n.ts`:
```typescript
import fr from './i18n/fr.json';
resources.fr = { translation: fr };
```

3. Add to language selector in `LanguageToggle.tsx`

### Translation Keys

All translation keys are organized by feature:
- `navbar.*` - Navigation elements
- `home.*` - Landing page content
- `dashboard.*` - Dashboard interface
- `exercises.*` - Exercise management
- `guides.*` - Guide builder
- `messages.*` - Success/error messages
- `buttons.*` - Button labels

---

## 🎯 Use Cases

### For University Students

**Scenario**: Physics major preparing for final exams

1. **Organize by Course**: Create categories for each physics course (Mechanics, Thermodynamics, Electromagnetism)
2. **Import Exercises**: Add practice problems from textbooks and past exams
3. **Tag by Topic**: Use tags like "Newton's Laws", "Energy Conservation", "Circuits"
4. **Difficulty Progression**: Start with difficulty 1-2 exercises, progress to 4-5
5. **Generate Study Guides**: Create custom study sessions by dragging exercises into guides
6. **LaTeX Support**: Properly format complex equations and scientific notation
7. **Track Progress**: See how many exercises completed per category

### For Educators & Professors

**Scenario**: Math professor creating weekly problem sets

1. **Build Exercise Bank**: Store hundreds of exercises organized by chapter
2. **Reuse Content**: Never recreate the same problems—search and reuse
3. **Difficulty Calibration**: Assign difficulty levels to help students choose appropriately
4. **Quick Guide Generation**: Drag-and-drop exercises to create problem sets in minutes
5. **Professional Output**: Export to LaTeX for publication-ready formatting
6. **Share with TAs**: Collaborate with teaching assistants using shared categories
7. **Track Usage**: See which exercises are most frequently used

### For Teaching Assistants

**Scenario**: TA preparing review session materials

1. **Access Existing Bank**: Use professor's exercise library
2. **Filter by Difficulty**: Find beginner-friendly problems for review sessions
3. **Create Themed Guides**: Combine exercises from multiple categories (e.g., "Midterm Review")
4. **Time Estimation**: Use duration metadata to plan 60-minute sessions
5. **Quick Edits**: Modify exercise descriptions without starting from scratch
6. **Multi-Language**: Switch between English and Spanish for diverse student populations
7. **Instant PDF**: Generate and print study materials on demand

### For Self-Learners

**Scenario**: Self-taught programmer learning algorithms

1. **Personal Repository**: Build a library of coding challenges and solutions
2. **Spaced Repetition**: Tag exercises as "needs review" for periodic practice
3. **Difficulty Tracking**: Monitor improvement by attempting harder problems over time
4. **Study Plans**: Create weekly study guides with increasing complexity
5. **Search by Concept**: Quickly find all "dynamic programming" or "graph theory" exercises
6. **Visual Organization**: Use images to make browsing more intuitive
7. **Demo Mode**: Try the platform without commitment via GitHub Pages demo

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, improving documentation, or suggesting ideas, your help is appreciated.

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/note-forge.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow existing code style and conventions
   - Add TypeScript types for new code
   - Write meaningful commit messages
   - Test your changes locally

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe what changes you made and why
   - Reference any related issues
   - Include screenshots for UI changes

### Contribution Guidelines

- **Code Style**: Follow existing TypeScript/React patterns
- **Commit Messages**: Use conventional commits (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`)
- **Testing**: Ensure existing functionality isn't broken
- **Documentation**: Update README if adding new features
- **Responsiveness**: Test UI changes on mobile, tablet, and desktop

### Development Setup

See [Getting Started](#-getting-started) for local development setup instructions.

### Areas for Contribution

- 🌍 **Translations**: Add support for more languages
- 🎨 **UI/UX**: Improve designs, animations, and accessibility
- 🐛 **Bug Fixes**: Report and fix issues
- ✨ **Features**: Implement items from the feature backlog
- 📖 **Documentation**: Improve guides and API docs
- 🧪 **Testing**: Add unit and integration tests

### Code of Conduct

Be respectful, inclusive, and constructive. We're all here to learn and build together.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What This Means

✅ **You can**:
- Use this project for personal or commercial purposes
- Modify and distribute the code
- Include it in proprietary software
- Sublicense

❌ **You must**:
- Include the original license and copyright notice
- State significant changes made to the code

---

<div align="center">

**Built with ❤️ by [xhandlr](https://github.com/xhandlr)**

If you find this project useful, consider giving it a ⭐ on GitHub!

[⬆ Back to Top](#-note-forge)

</div>
