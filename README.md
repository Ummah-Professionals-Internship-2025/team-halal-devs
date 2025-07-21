# Fullstack React + Django Application

This is a fullstack web application with:

- **Backend**: Django REST API (`backend/`)
- **Frontend**: React + TypeScript + Vite (`frontend/`)

---

## Prerequisites

### Backend

- Python 3.8+
- pip

### Frontend

- Node.js 18+
- npm

---

## How to Run

### Backend (Django API)

#### macOS / Linux

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. Install dependencies:

   ```bash
   pip install django djangorestframework django-cors-headers
   ```

4. To run the server:

- If no changes have been made:

  ```bash
  python3 manage.py runserver
  ```

- If changes have been made to models or the database:

  ```bash
  python manage.py makemigrations
  python manage.py migrate
  python manage.py runserver
  ```

The server will run at: http://127.0.0.1:8000/

---

#### Windows (VS Code Terminal)

1. Open the integrated terminal in VS Code and navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv .venv
   .venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install django djangorestframework django-cors-headers
   ```

4. To run the server:

- If no changes have been made:

  ```bash
  python manage.py runserver
  ```

- If changes have been made to models or the database:

  ```bash
  python manage.py makemigrations
  python manage.py migrate
  python manage.py runserver
  ```

The server will run at: http://127.0.0.1:8000/

---

### Frontend (React + Vite)

#### macOS / Linux / Windows

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   npm install bootstrap
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

The app will be available at the URL shown in the terminal (usually http://localhost:5173/).

---

## Quick Reference

| Task                          | macOS / Linux                                                                                   | Windows (VS Code Terminal) |
| ----------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------- |
| Create virtual environment    | `python3 -m venv .venv`                                                                         | `python -m venv .venv`     |
| Activate virtual environment  | `source .venv/bin/activate`                                                                     | `.venv\Scripts\activate`   |
| Install backend dependencies  | `pip install django djangorestframework`                                                        | Same                       |
| Run backend (no changes)      | `python manage.py runserver`                                                                    | Same                       |
| Run backend (with changes)    | `python manage.py makemigrations`<br>`python manage.py migrate`<br>`python manage.py runserver` | Same                       |
| Install frontend dependencies | `npm install`<br>`npm install bootstrap`                                                        | Same                       |
| Start frontend server         | `npm run dev`                                                                                   | Same                       |

---
