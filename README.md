<div align="center">

# 📚 Note Forge

🌍 [Leer en Español](./README_ES.md)

**Boost productivity for students and educators with centralized study material**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22+-339933?logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Note Forge is a web app where you store exercises, tag them by subject and difficulty, and drag them into exportable LaTeX study guides.

[🎮 Live Demo](https://xhandlr.github.io/note-forge) · [✨ Features](#-key-features) · [📖 Docs](#-getting-started) · [🐛 Issues](https://github.com/xhandlr/note-forge/issues)

</div>

---

## 🎯 Overview

Note Forge was born out of a real need: as a tutor at my university, I found myself spending too much time searching for exercises, images, and references to assemble study guides for my students. With materials of varying difficulty, format, and source, the process was inefficient. Note Forge solves that.

### Perfect for

| Role | How it helps |
|------|-------------|
| 🎓 **Students** | Centralize all study material — exercises, images, and answers — in one place |
| 👨‍🏫 **Teaching Assistants** | Build study guides from an existing exercise bank with drag-and-drop |
| 👨‍💼 **Professors** | LaTeX support for distributing exercises across subjects and exporting guides effortlessly |

### Highlights

- 🎨 **Modern UX** — rose, amber, and slate color palette with clean, animated UI
- 🌍 **i18n support** — full English and Spanish translations
- 🎮 **Interactive demo** — no registration, no Docker, no backend needed. [Try it here](https://xhandlr.github.io/note-forge)

---

## ✨ Key Features

### 📝 Exercise Management
- **LaTeX Editor** — real-time rendering for equations, matrices, and scientific notation with syntax highlighting
- **Rich Metadata** — 5-level difficulty rating, duration estimates, multi-tag support, custom images, and references
- **Advanced Search** — filter exercises by subject, difficulty, or whether they include images

### 🎯 Study Guide Builder
- **Drag & Drop Interface** — intuitive reordering with smooth animations
- **Unified Workspace** — three-panel layout: exercise library, guide metadata, and live preview
- **Smart Metrics** — automatic total time calculation (15 min/exercise) and average difficulty with visual indicators
- **Export Options** — save drafts and export to LaTeX (`.tex`) format

### 📁 Category System
- **Flexible Organization** — subject-based categories with custom images, rich descriptions, and unlimited nesting
- **Dedicated Views** — hero sections with cover images, tabbed interface (exercises vs. guides), and pinnable favorite subjects

### 🌍 Internationalization & Demo
- Complete i18n with English and Spanish
- Full-featured interactive demo with pre-loaded mock data — no setup required

---

## 🎨 Screenshots

<div align="center">

**Dashboard**
![Dashboard](./note-forge-ui/src/assets/dashboard.png)

**Categories**
![Categories](./note-forge-ui/src/assets/categories.png)

**Guides**
![Guides](./note-forge-ui/src/assets/guides.png)

**Export**
![Export](./note-forge-ui/src/assets/export.png)

</div>

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3 | UI library with hooks and functional components |
| TypeScript | 5.5 | Type safety and enhanced developer experience |
| Vite | 5.0 | Lightning-fast build tool with instant HMR |
| TailwindCSS | 3.4 | Utility-first CSS for rapid development |
| React Router | 6.x | Client-side routing with nested routes |
| react-i18next | 16.0 | Complete i18n solution with language detection |

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 22+ | JavaScript runtime with ES modules |
| Express | 4.x | Fast, minimalist web framework |
| MySQL | 8.0+ | Relational database with JSON support |
| JWT | 9.x | Stateless authentication tokens |
| bcrypt | 6.0 | Password hashing and security |

### Architecture & DevOps
- Context API for global state management
- Custom React hooks for reusable logic
- Docker & Docker Compose for containerization
- GitHub Pages for demo deployment

---

## ⚡ Getting Started

### Quick Start (Demo)

The fastest way to explore Note Forge — no setup needed:

1. Visit [xhandlr.github.io/note-forge](https://xhandlr.github.io/note-forge)
2. Click **"Probar sin registrarse"** on the landing page
3. Explore full functionality with pre-loaded mock data

The demo includes pre-configured categories, sample exercises with LaTeX, study guides with drag-and-drop, and full search capabilities.

---

### Prerequisites

For local development:

- ✅ **Node.js v22.x+** — [Download](https://nodejs.org/)
- ✅ **MySQL 8.0+** — [Installation Guide](https://dev.mysql.com/doc/refman/8.0/en/installing.html)
- 🐳 **Docker/Podman** *(optional)* — [Get Docker](https://www.docker.com/)
- 📦 **npm or pnpm** — comes with Node.js

---

### Manual Installation

**1. Clone the repository**

```bash
git clone https://github.com/xhandlr/note-forge.git
cd note-forge
```

**2. Set up the database**

```bash
mysql -u root -p
source db/init.sql
```

**3. Configure environment variables**

```bash
cp note-forge-api/.env.example note-forge-api/.env
# Edit .env with your database credentials:
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=note_forge
# JWT_SECRET=your_secret_key
```

**4. Start the backend**

```bash
cd note-forge-api
npm install
node index.js
# API running at http://localhost:5000
```

**5. Start the frontend**

```bash
cd note-forge-ui
npm install
npm run dev
# App running at http://localhost:5173
```

---

### Docker Installation

```bash
git clone https://github.com/xhandlr/note-forge.git
cd note-forge
docker-compose up -d
# Visit http://localhost:5173
```

To stop:

```bash
docker-compose down
```

---

## 📁 Project Structure

```
note-forge/
│
├── db/                          # Database layer
│   ├── init.sql                 # Initial schema and tables
│   └── init_test.sql            # Test schema
│
├── note-forge-api/              # Backend (Node.js + Express)
│   ├── config/                  # Database and auth configuration
│   ├── controllers/             # Request handlers
│   ├── services/                # Business logic layer
│   ├── models/                  # Data models and SQL queries
│   ├── routes/                  # API endpoint definitions
│   ├── middleware/              # JWT authentication
│   ├── .env.example             # Environment template
│   └── index.js                 # Server entry point
│
├── note-forge-ui/               # Frontend (React + TypeScript)
│   ├── public/                  # Static assets
│   └── src/
│       ├── assets/              # Images, fonts
│       ├── components/
│       │   ├── UI/              # Reusable components
│       │   └── Dashboard/       # Navbar, Footer
│       ├── contexts/            # React Context (Demo, Notifications)
│       ├── pages/               # Route-based views
│       │   ├── Auth/            # Home, Login, Registration
│       │   ├── Categories/      # Category views and forms
│       │   ├── Exercises/       # Exercise views and forms
│       │   ├── Guides/          # Guide builder workspace
│       │   ├── Dashboard/       # Main dashboard
│       │   └── Search/          # Search page
│       ├── services/            # API services
│       ├── mocks/               # Mock data for demo mode
│       └── i18n/                # EN/ES translations
│
├── docker-compose.yml
├── README.md
├── README_ES.md
└── LICENSE
```

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

<div align="center">

Built with 🩷💛🩷 by [xhandlr](https://github.com/xhandlr)

If you find this project useful, consider giving it a ⭐ on GitHub!

[⬆ Back to Top](#-note-forge)

</div>
