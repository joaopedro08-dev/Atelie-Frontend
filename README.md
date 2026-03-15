<div align="center">

# Ateliê — Intelligent Management

**A modern management ecosystem for order, client, and user control.**  
Built with performance, security, and user experience as core pillars.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Tauri](https://img.shields.io/badge/Tauri-2-FFC131?style=for-the-badge&logo=tauri&logoColor=white)

![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Operational-brightgreen?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.5--stable-blue?style=for-the-badge)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Commands](#-commands)
- [Desktop Configuration](#-desktop-configuration-tauri)
- [Author](#-author)

---

## 🚀 About the Project

**Ateliê** is an integrated intelligent management platform designed to centralize and optimize administrative operations. The solution combines a responsive web interface with a native desktop client — both powered by the same Next.js codebase — delivering a cohesive, secure, and high-performance experience.

The architecture prioritizes:

- **Performance** — Static Export with Next.js and Tauri for lightweight native binaries
- **Security** — JWT authentication with Silent Refresh and role-based access control
- **UX** — Smooth animations with Framer Motion and accessible components via Shadcn/UI
- **Productivity** — Global keyboard shortcuts, loading skeletons, and real-time feedback

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Role |
|---|---|---|
| Next.js | 16 | React framework with Static Export |
| TypeScript | 5 | Static typing |
| Tailwind CSS | 4 | Utility-first styling |
| Shadcn/UI | latest | Accessible UI components |
| Framer Motion | latest | Animations and transitions |
| Tauri | 2 | Native desktop packaging |

### Backend

| Technology | Role |
|---|---|
| Java + Spring Boot | REST/GraphQL API |
| GraphQL | Optimized data queries |
| JWT | Authentication with Silent Refresh |
| SSL/TLS | Encrypted data traffic |

---

## ✨ Features

- **Admin Dashboard** — Overview with order charts, estimated revenue, recent activity, and item distribution
- **Client Management** — Full CRUD with filters, search, and pagination
- **Order Management** — Status control, payment methods, and history tracking
- **Item Management** — Product registration and updates with codes and pricing
- **Data Export** — Reports in PDF (A4) and Excel (.xlsx) for all entities
- **JWT Authentication** — Secure login with automatic Silent Refresh and role control (ADMIN/USER)
- **Desktop Interface** — Native app via Tauri with custom titlebar, splash screen, and keyboard shortcuts
- **Offline Mode** — Notification banner with real-time reconnection detection
- **Keyboard Shortcuts** — Globally configurable navigation via accessibility panel

---

## ✅ Prerequisites

### Web

- [Node.js LTS](https://nodejs.org/) (v20+)
- [pnpm](https://pnpm.io/) (v9+)

### Desktop (additional)

- [Rust](https://rustup.rs/) (stable toolchain)
- [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) with **"Desktop development with C++"** workload

---

## 🔧 Installation & Setup

**1. Clone the repository:**

```bash
git clone https://github.com/joaopedro08-dev/atelie-frontend.git
cd atelie-frontend
```

**2. Install dependencies:**

```bash
pnpm install
```

**3. Set up environment variables:**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your settings (see section below).

**4. For Desktop, generate `tauri.conf.json`:**

```bash
cp src-tauri/tauri.conf.example.json src-tauri/tauri.conf.json
```

Edit the `connect-src` in `src-tauri/tauri.conf.json` with your backend URL.

---

## 🔑 Environment Variables

Create a `.env.local` file at the project root with the following variables:

```env
# GraphQL API — local development
NEXT_PUBLIC_LOCALHOST_API=http://localhost:8080/graphql

# GraphQL API — production
NEXT_PUBLIC_PRODUCTION_API=https://your-backend.com/graphql
```

> ⚠️ **Never commit `.env` files with real data.** Use `.env.example` as a reference.

---

## 💻 Commands

| Command | Description |
|---|---|
| `pnpm install` | Install all dependencies |
| `pnpm dev` | Start the web development server |
| `pnpm build` | Generate the static production build |
| `pnpm dev:desktop` | Start the desktop app in development mode |
| `pnpm build:desktop` | Generate the `.exe` installer for production |

---

## 🖥 Desktop Configuration (Tauri)

The desktop client is built with **Tauri 2**, generating lightweight native binaries for Windows, macOS, and Linux.

### CSP Configuration

Edit `src-tauri/tauri.conf.json` and update your backend URL in `connect-src`:

```json
"connect-src": "ipc: http://ipc.localhost http://tauri.localhost https://your-backend.com"
```

### Build the installer

```bash
pnpm build:desktop
```

The generated installer will be located at:

```
src-tauri/target/release/bundle/nsis/
```

---

## 👤 Author

<div align="center">

**João Pedro Dala Dea Mello**

[![GitHub](https://img.shields.io/badge/GitHub-joaopedro08--dev-181717?style=for-the-badge&logo=github)](https://github.com/joaopedro08-dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-João_Pedro-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jo%C3%A3o-pedro-dala-dea-mello-3266003a3/)
[![Email](https://img.shields.io/badge/Email-joao.p.mello.dev@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:joao.p.mello.dev@gmail.com)

</div>

---

<div align="center">

**Ateliê — Encantos do Arcanjo** · Built by João Pedro Dala Dea Mello

</div>