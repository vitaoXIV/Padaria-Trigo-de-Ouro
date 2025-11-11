# Projeto Caixa - Bakery POS System

A point-of-sale system for a bakery, built with Django REST Framework backend and React frontend.

## Project Structure

- `backend/` - Django REST API
- `frontend/` - React application with Vite

## Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Run migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Start the server:
   ```
   python manage.py runserver
   ```

The API will be available at http://localhost:8000/api/

## Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

The frontend will be available at http://localhost:5173

## Features

- Product management
- Shopping cart
- Sales history
- Admin interface for managing products and sales
