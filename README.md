<div align="center">

# 📚 Note Forge
### *Empowering students and educators with organized knowledge*

<br>

| 📊 **Project** | ⚡ **Tech Stack** | 🤝 **Community** |
|:---:|:---:|:---:|
| [![Status](https://img.shields.io/badge/Status-Alpha_Release-orange?style=for-the-badge)](https://github.com/xhandlr/note-forge) | [![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/) | [![Issues](https://img.shields.io/github/issues/xhandlr/note-forge?style=for-the-badge&logo=github)](https://github.com/xhandlr/note-forge/issues) |
| [![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](https://opensource.org/licenses/MIT) | [![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/) | [![Contributors](https://img.shields.io/badge/Contributors-Welcome-brightgreen?style=for-the-badge)](https://github.com/xhandlr/note-forge/blob/main/CONTRIBUTING.md) |
|  | [![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)](https://www.mysql.com/) |  |

---

</div>

## Table of Contents
- [🎯 The Problem & Solution](#the-problem--solution)
- [✨ Key Features](#key-features)
- [👥 Who Is This For](#who-is-this-for)
- [🚧 Project Status & Roadmap](#project-status--roadmap)
- [🛠️ Tech Stack](#tech-stack)
- [⚡ Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Manual Installation](#manual-installation)
  - [Docker Installation](#docker-installation)
- [🗂️ Project Structure](#project-structure)
- [🤝 Contributions](#contributions)

---

## The Problem & Solution

### The Challenge
Students and educators often struggle with:  
- 📚 **Scattered Materials**: Practice problems spread across PDFs, websites, and notebooks.  
- 🔍 **Poor Organization**: Hard to find specific exercises when you need them.  
- ⏰ **Time-Consuming Setup**: Manually organizing materials takes time away from actual learning.  

### The Solution
Note Forge makes educational content management easy:  
- 🎯 **Unified Platform**: All exercises, categories, and study materials in one place.  
- 🏷️ **Smart Organization**: Tag-based system with custom categories for quick retrieval.  
- ⚡ **Quick Setup**: Get organized in minutes, not hours.


---

## Who Is This For?

### Students 👨‍🎓  
Keep your study materials, guides, and exercises neatly organized in categories — no more scattered files!  

### Educators 👩‍🏫  
Reuse exercises you’ve already created by storing them in Note Forge, and export new study material in PDF format.  

### Teaching Assistants 👨‍💼  
Quickly generate study materials with LaTeX styling, perfect for preparing exercises on demand.  

---

## Key Features

### 📝 Exercise Management
- **Create & Customize**: Text editor with LaTeX support for mathematical expressions
- **Smart Tagging**: Organize with custom tags, difficulty levels, and time estimates
- **Quick Search**: Find exercises instantly by title, tags, or content

### 📁 Custom Categories  
- **Flexible Organization**: Create subject-based, difficulty-based, or custom taxonomies
- **Visual Categories**: Add images and descriptions to make browsing intuitive  
- **Pin Important**: Mark frequently-used categories for quick access

### 📚 Study Guide Generator *(Working on it)*
- **Adaptive Selection**: Generate guides based on difficulty progression
- **Time-Based Sessions**: Create study sessions fitting your available time
- **Export Options**: Generate PDFs for offline studying

---

## Project Status & Roadmap
- 📅 **Started**: January 2025
- 💻 **Active Development**: Yes  
- 📝 **Documentation**: Continuously updated

---

### 🚧 **Current Work**
| Feature | Status |
|---------|--------|
| UI/UX Redesign | `🟡 50%` |
| API & UI Testing | `🟡 50%` |  
| Documentation | `🟡 50%` |

### 📋 **Backlog**
| Feature | Priority |
|---------|----------|
| Responsive Layout | `🔸 Medium` |
| Error Handling | `🔸 Medium` |

---

## Tech Stack

**🎨 Frontend**
- React 18 + Vite
- TailwindCSS

**⚙️ Backend**  
- Node.js (Express)
- MySQL 8.0+

**🐳 Infrastructure**
- Docker/Podman

---

## Getting Started

### Prerequisites

Make sure you have these installed:

- ✅ Node.js `v22.x+`
- ✅ MySQL `8.0+`  
- 🐳 Docker/Podman *(optional)*

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

## Project Structure

### 📦 **Monorepo Structure**

```bash
note-forge/
┣━━ 🗃️  db/                     ← Database scripts (SQL files)
┃
┣━━ ⚡ note-forge-api/          ← Backend service
┃   ┣━━ config/                 ← App configuration
┃   ┣━━ controllers/            ← Request handlers
┃   ┣━━ services/               ← Business logic
┃   ┣━━ models/                 ← Data models
┃   ┗━━ routes/                 ← API endpoints
┃
┣━━ 🎨 note-forge-ui/           ← Frontend client
┃   ┣━━ src/components/         ← React components
┃   ┣━━ src/pages/              ← Application views
┃
┗━━ 🐳 docker-compose.yml       ← Container config
```

---

## Contributions

Contributions, bug reports, and feature suggestions are welcome! 
Feel free to open an issue or submit a pull request.
