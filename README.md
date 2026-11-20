# Car Show Registration System (Car Show 2027)

A full-stack event registration management application for **AutoVista Events' "Car Show 2027"** hosted at Sorsogon City Coliseum. The system streamlines participant registrations across three categories (Exhibitor, Competitor, VIP), enforces business fee and validation rules, tracks payments and statuses, and displays real-time KPI metrics.

---

## Team Members and Roles

| MEMBER | ROLE |
| :--- | :--- |
| **Jubelle Anzano** | Backend Developer |
| **Mia Trisha Lasala** | Frontend Developer |

---

## Repository Structure

```
car-show-registration/
├── backend/            # C# .NET 10 Vertical Slice REST API solution
│   ├── Api/            # Minimal API endpoints, Scalar docs, filters & DI
│   ├── Application/    # Feature slices (CQRS commands, queries & validators)
│   ├── Domain/         # Domain entity (Registration) & enums
│   └── Infrastructure/ # EF Core, SQLite persistence, migrations & seed data
├── frontend/           # React (Vite) + Tailwind CSS dashboard application
├── docs/               # Documentation assets
│   └── screenshots/    # API & UI testing screenshots
├── .gitignore          # Root Git ignore rules
└── README.md           # Project overview and instructions
```

---

## Tech Stack

### Backend API
- **Language / Runtime:** C# / .NET 10
- **Architecture:** Vertical Slice Architecture + CQRS Pattern
- **ORM / Persistence:** Entity Framework Core 10 with SQLite (`carshow.db`)
- **Validation:** FluentValidation with `ValidationFilter<T>`
- **API Documentation:** OpenAPI with Scalar UI (`/scalar/v1`)
- **Error Handling:** Standardized RFC 7807 `ProblemDetails` (`Result<T>` pattern)

### Frontend Dashboard
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS + Lucide React Icons
- **State & Data Fetching:** Custom React hooks with live REST API integration

---

## How to Run Both Applications

### Prerequisites
- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Node.js (v18+) & npm](https://nodejs.org/)

---

### 1. Running the Backend API

1. Open a terminal and navigate to the backend API project folder:
   ```bash
   cd backend/Api
   ```

2. Restore dependencies and run the API:
   ```bash
   dotnet run
   ```

3. The API will start on:
   - **Base URL:** `http://localhost:5205`
   - **Scalar API Reference:** `http://localhost:5205/scalar/v1`
   - **OpenAPI Spec:** `http://localhost:5205/openapi/v1.json`

> **Note:** On first startup, the database `carshow.db` is automatically created, migrations applied, and seeded with 25 sample registrations.

---

### 2. Running the Frontend Dashboard

1. Open a separate terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```
