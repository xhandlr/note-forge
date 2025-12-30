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

**Note Forge** is a modern educational platform for organizing study materials. Built with React, TypeScript, and Node.js, it combines LaTeX typesetting with intuitive drag-and-drop interfaces.

**Perfect for:**
- 🎓 **Students** - Centralize study materials and create custom study sessions
- 👨‍🏫 **Educators** - Build reusable exercise libraries and generate professional study guides
- 👨‍💼 **Teaching Assistants** - Quickly assemble study materials with LaTeX formatting

---

## ✨ Key Features

- **🎨 Modern UI/UX** - Polished interface with TailwindCSS, smooth animations, and full responsive design
- **📝 LaTeX Editor** - Real-time rendering for mathematical expressions and scientific notation
- **🎯 Drag & Drop Builder** - Intuitive workspace to create study guides by dragging exercises
- **📁 Smart Organization** - Category system with tags, difficulty levels, and visual browsing
- **🔍 Advanced Search** - Full-text search with multi-criteria filtering
- **🌍 Internationalization** - English and Spanish support with easy extensibility
- **🎮 Demo Mode** - Try the platform without registration via GitHub Pages
- **📊 Smart Metrics** - Automatic time calculation and difficulty averaging

---

## 🎨 Screenshots

> 📸 **Coming Soon!** Screenshots will be added to showcase the platform's interface.

---

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript 5.5
- Vite 5.0 (build tool)
- TailwindCSS 3.4 (styling)
- React Router 6.x (routing)
- Lucide React (icons)
- react-i18next (i18n)

### Backend
- Node.js 22+ with Express
- MySQL 8.0+
- JWT authentication
- RESTful API

### Architecture
- Factory Pattern for service abstraction
- Context API for state management
- Custom hooks & TypeScript interfaces
- Docker/Podman containerization

---

## ⚡ Getting Started

### Quick Start (Demo)

The fastest way to explore Note Forge:

1. Visit [xhandlr.github.io/note-forge](https://xhandlr.github.io/note-forge/)
2. Click "Probar sin registrarse"
3. Explore with pre-loaded mock data

### Prerequisites

- Node.js `v22.x+`
- MySQL `8.0+`
- Docker/Podman *(optional)*

### Manual Installation

1. **Clone the repository**
```bash
git clone https://github.com/xhandlr/note-forge.git
cd note-forge
```

2. **Set up database**
```bash
# Start MySQL and run db/init.sql
```

3. **Configure environment**
```bash
cp note-forge-api/.env.example note-forge-api/.env
# Edit .env with your database credentials
```

4. **Start backend**
```bash
cd note-forge-api
npm install
node index.js
# API runs at http://localhost:5000
```

5. **Start frontend**
```bash
cd note-forge-ui
npm install
npm run dev
# App runs at http://localhost:5173
```

### Docker Installation

```bash
git clone https://github.com/xhandlr/note-forge.git
cd note-forge
docker-compose up -d
# Visit http://localhost:5173
```

---

## 📁 Project Structure

```
note-forge/
├── db/                   # Database scripts
├── note-forge-api/       # Backend (Node.js + Express)
│   ├── config/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   └── routes/
├── note-forge-ui/        # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route-based views
│   │   ├── contexts/     # React Context providers
│   │   ├── services/     # API & mock services
│   │   ├── mocks/        # Demo mode data
│   │   └── i18n/         # Translations
│   └── vite.config.ts
└── docker-compose.yml
```

---

## 🌍 Internationalization

Built-in support for:
- 🇬🇧 English
- 🇪🇸 Spanish

Add new languages by creating JSON files in `src/i18n/` and importing them.

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Areas for contribution:**
- 🌍 Translations
- 🎨 UI/UX improvements
- 🐛 Bug fixes
- ✨ New features
- 📖 Documentation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by [xhandlr](https://github.com/xhandlr)**

Give it a ⭐ if you find it useful!

[⬆ Back to Top](#-note-forge)

</div>
