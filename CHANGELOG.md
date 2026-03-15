# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.5-beta] — 2026-03-14

### Added
- Initial public release of the Ateliê management platform
- Admin dashboard with order charts, revenue overview, recent activity, and item distribution
- Full CRUD for clients, orders, and items with filters, search, and pagination
- Data export to PDF (A4) and Excel (.xlsx) for all entities
- JWT authentication with automatic Silent Refresh and role-based access control (ADMIN/USER)
- Native desktop application via Tauri 2 with custom titlebar and splash screen
- Offline mode banner with real-time reconnection detection
- Global keyboard shortcuts with configurable accessibility panel
- Loading skeletons for dashboard and data tables
- Breadcrumb navigation in the admin header
- About system page with tech stack and project information
- Dark/light/system theme support via Shadcn/UI

### Desktop (Tauri)
- Custom titlebar integrated with the app theme
- Animated splash screen on first launch per session
- Window state persistence (size and position)
- NSIS installer in Portuguese (BR) with custom branding images
- CSP configuration for secure backend communication

### Security
- JWT token rotation with Silent Refresh
- Role-based route protection (ADMIN/USER)
- SSL/TLS encrypted traffic
- Session cache via `sessionStorage` to avoid redundant auth requests

---

## [Unreleased]

### Planned
- Auto updater via GitHub Releases
- User-facing public interface improvements
- Expanded test coverage

---

> This project is currently in **beta**. APIs and features may change before the stable release.