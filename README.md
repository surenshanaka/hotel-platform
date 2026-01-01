# Hotel Management Platform

A full-stack hotel management system built with FastAPI (backend) and Next.js (frontend) for managing hotels, rooms and rate adjustments.

## Features

- User authentication and authorization
- Hotel management with multiple properties
- Room management with pricing
- Dynamic rate adjustment with history tracking
- Dashboard with statistics and overview
- Modern, responsive UI with Tailwind CSS

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **Alembic** - Database migrations
- **SQLite** - Database (can be easily switched to PostgreSQL)
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React 19** - UI library

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** (Python 3.13 recommended)
- **Node.js 18+** (Node.js 20+ recommended)
- **npm** or **yarn** package manager
- **Git** for version control

## Project Structure

```
hotel-platform/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Core configuration
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── services/       # Business logic
│   │   └── main.py         # FastAPI app entry point
│   ├── alembic/            # Database migrations
│   ├── requirements.txt    # Python dependencies
│   └── test.db             # SQLite database
│
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/            # Next.js app router pages
│   │   ├── components/     # React components
│   │   └── lib/            # Utility functions
│   ├── package.json        # Node dependencies
│   └── tailwind.config.ts  # Tailwind configuration
│
└── README.md               # This file
```

## Setup Instructions

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   
   On macOS/Linux:
   ```bash
   source venv/bin/activate
   ```
   
   On Windows:
   ```bash
   venv\Scripts\activate
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up the database:**
   ```bash
   # Run database migrations
   alembic upgrade head
   ```

6. **Start the backend server:**
   ```bash
   uvicorn app.main:app --reload
   ```

   The API will be available at `http://localhost:8000`
   
   - API Documentation: `http://localhost:8000/docs` (Swagger UI)
   - Alternative docs: `http://localhost:8000/redoc`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## Database Setup

The project uses SQLite by default. The database file is located at `backend/test.db`.

### Running Migrations

To create or update database tables:

```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
alembic upgrade head
```

### Creating New Migrations

If you modify models, create a new migration:

```bash
alembic revision --autogenerate -m "description of changes"
alembic upgrade head
```

## Default Credentials

After running migrations, you can create a user account through the registration endpoint or directly in the database.

**Test User (if created):**
- Email: `testuser@example.com`
- Password: (set during registration)

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get access token

### Hotels
- `GET /hotels` - List all hotels
- `GET /hotels/{hotel_id}` - Get hotel details with rooms
- `POST /hotels` - Create a new hotel
- `PUT /hotels/{hotel_id}` - Update hotel
- `DELETE /hotels/{hotel_id}` - Delete hotel

### Rooms
- `GET /rooms` - List all rooms
- `GET /rooms/{room_id}` - Get room details
- `POST /rooms` - Create a new room
- `PUT /rooms/{room_id}` - Update room
- `DELETE /rooms/{room_id}` - Delete room
- `POST /rooms/{room_id}/adjust-rate` - Adjust room rate
- `GET /rooms/{room_id}/rate-history` - Get rate adjustment history

### Users
- `GET /users/me` - Get current user info

## Environment Variables

### Backend

Create a `.env` file in the `backend` directory (optional, defaults are used):

```env
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Development

### Backend Development

- The server auto-reloads on file changes when using `--reload` flag
- API documentation is available at `/docs` endpoint
- Database changes require creating and running migrations

### Frontend Development

- Hot module replacement is enabled by default
- TypeScript type checking runs during development
- ESLint is configured for code quality

### Running Tests

```bash
# Backend (if tests are added)
cd backend
pytest

# Frontend (if tests are added)
cd frontend
npm test
```

## Building for Production

### Backend

```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
npm run build
npm start
```

## Troubleshooting

### Backend Issues

1. **Database errors:**
   - Ensure migrations are run: `alembic upgrade head`
   - Check database file permissions
   - Verify SQLite is installed

2. **Import errors:**
   - Ensure virtual environment is activated
   - Verify all dependencies are installed: `pip install -r requirements.txt`

3. **Port already in use:**
   - Change port: `uvicorn app.main:app --port 8001`

### Frontend Issues

1. **Tailwind styles not working:**
   - Ensure Tailwind CSS is installed: `npm install -D tailwindcss`
   - Check `tailwind.config.ts` and `postcss.config.mjs`
   - Restart the dev server

2. **API connection errors:**
   - Verify backend is running on `http://localhost:8000`
   - Check `NEXT_PUBLIC_API_URL` in `.env.local`
   - Verify CORS settings in backend

3. **Hydration errors:**
   - These are often caused by browser extensions
   - The `suppressHydrationWarning` prop is already added to handle this

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Support

For issues or questions, please contact the development team.

---

**Happy Coding! 🚀**

