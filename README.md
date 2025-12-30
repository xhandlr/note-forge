<div align="center">

# 📚 Note Forge

<p align="center">
  <strong>A production-ready educational platform with enterprise-grade UI/UX</strong>
</p>

<p align="center">
  Full-stack application for organizing study materials with LaTeX support, drag-and-drop workflows, and interactive demo mode
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

## 🎯 Overview

**Note Forge** is a modern, full-stack educational platform designed to revolutionize how students, educators, and teaching assistants organize and share study materials. Built with cutting-edge technologies and an unwavering focus on user experience, it combines the power of LaTeX typesetting with intuitive drag-and-drop interfaces.

**Perfect for:**
- 🎓 **Students** - Centralize study materials in one searchable platform with custom study sessions
- 👨‍🏫 **Educators** - Build reusable exercise libraries and generate professional LaTeX-formatted guides
- 👨‍💼 **Teaching Assistants** - Quickly assemble study materials from existing exercise banks

**What makes it different:**
- 🎨 Production-ready UI with smooth animations and responsive design
- ⚡ Lightning-fast builds with Vite and optimized performance
- 🌍 Global-ready with complete i18n support (English/Spanish)
- 🎮 Interactive demo mode—no registration required
- 🏗️ Enterprise architecture with Factory pattern and TypeScript

---

## ✨ Key Features

### 🎨 Modern UI/UX Design
- **Polished Interface**: Meticulously crafted with TailwindCSS, smooth micro-interactions, and consistent design language across 15+ views
- **Fully Responsive**: Mobile-first approach with optimized breakpoints for tablet and desktop
- **Smart Navigation**: Active route indicators with smooth animations, mobile hamburger menu, and breadcrumb support
- **Custom Design System**: Rounded corners, custom scrollbars, and carefully chosen color palette (slate, rose, amber)

### 📝 Exercise Management
- **LaTeX Editor**: Real-time rendering for mathematical expressions, equations, matrices, and scientific notation with syntax highlighting
- **Rich Metadata**: 5-level difficulty rating, duration estimates, multi-tag support, custom images (Unsplash integration), and timestamps
- **Advanced Search**: Full-text search across titles/descriptions with real-time multi-criteria filtering (category, difficulty, tags)
- **Visual Organization**: Card-based layouts with high-quality images, grid/list views, and smooth transitions

### 🎯 Study Guide Builder
- **Drag & Drop Interface**: Intuitive reordering of exercises with smooth animations and visual feedback
- **Unified Workspace**: Three-panel layout with exercise library, configuration panel, and live LaTeX preview
- **Smart Metrics**: Automatic calculation of total time (15 min/exercise) and average difficulty with visual indicators
- **Export Options**: Save drafts for later editing and export to LaTeX (.tex) format

### 📁 Category System
- **Flexible Organization**: Subject-based categories with custom images, rich descriptions, and unlimited nesting
- **Dedicated Views**: Beautiful hero sections with cover images, tabbed interface (exercises vs. guides), and statistics dashboard
- **Smart Features**: Pin favorites, track recently accessed, empty state prompts, and bulk operations

### 🌍 Internationalization & Demo
- **Multi-Language Support**: Complete i18n with English and Spanish translations, dynamic language switching, and easy extensibility
- **Interactive Demo Mode**: Full-featured demo with comprehensive mock data (3 categories, 5 exercises, 3 guides) and 300ms simulated latency
- **Factory Pattern Architecture**: Clean service abstraction for seamless switching between demo and production environments

---

## 🎨 Screenshots

> 📸 **Coming Soon!** Screenshots showcasing the platform's interface, drag-and-drop functionality, and LaTeX editor will be added here.

---

## 🛠️ Tech Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3 | UI library with hooks and functional components |
| **TypeScript** | 5.5 | Type safety and enhanced developer experience |
| **Vite** | 5.0 | Lightning-fast build tool with instant HMR |
| **TailwindCSS** | 3.4 | Utility-first CSS framework for rapid development |
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

### Development Tools & Architecture

**Build & Development**
- Vite for instant hot module replacement
- ESLint + TypeScript ESLint for code quality
- PostCSS for CSS transformations

**Code Architecture**
- Factory Pattern for service abstraction
- Context API for global state management
- Custom React hooks for reusable logic
- TypeScript interfaces for type safety

**DevOps & Deployment**
- Docker & Docker Compose for containerization
- GitHub Pages for demo deployment
- Environment variable management

---

## ⚡ Getting Started

### Quick Start (Demo)

The fastest way to explore Note Forge is through our interactive demo:

1. **Visit** [xhandlr.github.io/note-forge](https://xhandlr.github.io/note-forge/)
2. **Click** "Probar sin registrarse" on the landing page
3. **Explore** full functionality with pre-loaded mock data
4. **No registration** or setup required!

**The demo includes:**
- ✅ Pre-configured categories (e.g., Physics, Mathematics, Chemistry)
- ✅ Sample exercises with LaTeX formatting
- ✅ Study guides with drag-and-drop functionality
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
cd note-forge
```

2. **Set up the database**

Make sure MySQL is running, then execute the initialization script:

```bash
# Log into MySQL
mysql -u root -p

# Run the initialization script
source db/init.sql
```

3. **Configure environment variables**

```bash
# Copy the example environment file
cp note-forge-api/.env.example note-forge-api/.env

# Edit the .env file with your database credentials
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=noteforge
# JWT_SECRET=your_secret_key
```

4. **Start the backend**

```bash
cd note-forge-api
npm install
node index.js
```

The API will run at **http://localhost:5000**

5. **Start the frontend**

Open a new terminal:

```bash
cd note-forge-ui
npm install
npm run dev
```

Access the app at **http://localhost:5173**

---

### Docker Installation

If you prefer to run the app using containers:

1. **Clone the repository**

```bash
git clone https://github.com/xhandlr/note-forge.git
cd note-forge
```

2. **Start services with Docker Compose**

```bash
docker-compose up -d
```

This will start:
- MySQL database with initial schema
- Backend API (Node.js + Express)
- Frontend UI (React + Vite)

Visit **http://localhost:5173** to use the app.

To stop the containers:

```bash
docker-compose down
```

---

## 📁 Project Structure

### Monorepo Architecture

```bash
note-forge/
│
├── db/                          # Database Layer
│   ├── init.sql                 # Initial schema and tables
│   └── seed.sql                 # Sample data (optional)
│
├── note-forge-api/              # Backend Service (Node.js + Express)
│   ├── config/                  # Database and auth configuration
│   ├── controllers/             # Request handlers (Category, Exercise, Guide)
│   ├── services/                # Business logic layer
│   ├── models/                  # Data models and SQL queries
│   ├── routes/                  # API endpoint definitions
│   ├── middleware/              # JWT authentication
│   ├── .env.example             # Environment template
│   ├── index.js                 # Server entry point
│   └── package.json
│
├── note-forge-ui/               # Frontend Application (React + TypeScript)
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── assets/              # Images, fonts
│   │   ├── components/
│   │   │   ├── UI/              # Reusable components (Button, Icon, etc.)
│   │   │   └── Dashboard/       # Navbar, Footer
│   │   ├── contexts/            # React Context (Demo, Notifications)
│   │   ├── pages/               # Route-based views
│   │   │   ├── Auth/            # Home, Login, Registration
│   │   │   ├── Categories/      # Category views and forms
│   │   │   ├── Exercises/       # Exercise views and forms
│   │   │   ├── Guides/          # GuideForm with unified workspace
│   │   │   ├── Dashboard/       # Main dashboard
│   │   │   └── Search/          # Search page
│   │   ├── services/            # API services and factory pattern
│   │   ├── mocks/               # Mock data and services for demo
│   │   └── i18n/                # English and Spanish translations
│   ├── vite.config.ts           # Vite configuration
│   ├── tailwind.config.js       # TailwindCSS configuration
│   ├── tsconfig.json            # TypeScript configuration
│   └── package.json
│
├── docker-compose.yml           # Multi-container orchestration
├── README.md                    # This file
└── LICENSE                      # MIT License
```

---

## 🌍 Internationalization

Note Forge is built with global audiences in mind using **react-i18next**.

### Current Languages

| Language | Code | Status | Coverage |
|----------|------|--------|----------|
| 🇬🇧 English | `en` | ✅ Complete | 100% |
| 🇪🇸 Spanish | `es` | ✅ Complete | 30% |

### Adding a New Language

1. Create a JSON file in `note-forge-ui/src/i18n/` (e.g., `fr.json`)
2. Import it in `i18n.ts`
3. Add the language option to `LanguageToggle.tsx`

Translation keys are organized by feature: `navbar.*`, `home.*`, `dashboard.*`, `exercises.*`, `guides.*`, `messages.*`

---

## 🤝 Contributing

Contributions are welcome! Whether you're fixing bugs, adding features, improving documentation, or suggesting ideas, your help is appreciated.

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/xhandlr/note-forge.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow existing TypeScript/React patterns
   - Add types for new code
   - Test your changes locally

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

5. **Push and open a Pull Request**
   ```bash
   git push origin feature/amazing-feature
   ```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with 💛 by [xhandlr](https://github.com/xhandlr)**

If you find this project useful, consider giving it a ⭐ on GitHub!

[⬆ Back to Top](#-note-forge)

</div>

