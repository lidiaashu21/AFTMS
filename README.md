# Addis Football Tournament Management System (AFTMS)

## Overview

The **Addis Football Tournament Management System (AFTMS)** is a full-stack web application that streamlines the management of football tournaments from team registration to the final match. The system provides secure role-based access for Super Admins, Tournament Admins, and Team Managers, enabling efficient tournament administration, team registration, payment verification, fixture generation, match management, and public access to tournament information.

---

## Features

- Role-Based Authentication (JWT)
- Tournament Management
- Multi-Step Team Registration
- Player & Team Management
- Payment Verification & Team Approval
- Automatic Fixture Generation
- Match Scheduling & Result Management
- Announcements Management
- Dashboard & Reports
- Public Tournament Portal
- Secure File Uploads
- Responsive User Interface

---

## User Roles

- **Super Admin** – Manages tournaments, administrators, and system settings.
- **Tournament Admin** – Manages teams, payments, fixtures, matches, and announcements.
- **Team Manager** – Registers teams, uploads documents, submits payments, and views tournament updates.

---

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- TanStack Query
- Axios
- React Hook Form
- Zod

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT
- Multer
- Bcrypt
- Zod

### Database

- PostgreSQL

---

## Project Structure

```text
client/
server/
```

---

## Core Modules

- Authentication & User Management
- Tournament Management
- Team Registration
- Payment & Team Approval
- Fixture & Match Management
- Announcements
- Dashboard & Reports
- Public Portal

---

## Security

- JWT Authentication
- Role-Based Access Control (RBAC)
- Password Hashing (Bcrypt)
- Input Validation (Zod)
- Secure File Uploads
- Activity Logging
