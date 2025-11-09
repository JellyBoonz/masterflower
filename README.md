# Masterflower Merchandising Audit & Replenishment App

A full-stack web application for merchandising teams to perform inventory audits and automatically generate replenishment orders when inventory falls below defined thresholds.

## Architecture

- **Frontend**: React (Create React App)
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- C# Integration: Generates CSV from DB data
- **API Documentation**: Swagger/OpenAPI

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 15+
- (Optional) Docker and Docker Compose

### Local Development Setup

#### 1. Database Setup

```bash
# Create database
createdb masterflowerdb

# Run schema
psql masterflowerdb < backend/schema.sql
```

#### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
echo "DATABASE_URL=postgresql://your_username@localhost:5432/masterflowerdb" > .env
echo "PORT=5001" >> .env

# Start backend
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on `http://localhost:5001`

- API: `http://localhost:5001/api`
- Swagger Docs: `http://localhost:5001/api-docs`

#### 3. Frontend Setup

```bash
cd frontend
npm install

# Start frontend
npm start
```

Frontend will run on `http://localhost:3000`

#### 4. C# Integration

```bash
cd ../csharp-integration

dotnet build CSharpIntegration.csproj

dotnet run
```

### Environment Variables

**Backend (.env):**

```env
DATABASE_URL=postgresql://username:password@localhost:5432/masterflowerdb
PORT=5001
NODE_ENV=development
```

**Frontend (.env):**

```env
REACT_APP_API_URL=http://localhost:5001/api
```

## Docker Setup (Recommended)

The easiest way to run the entire application:

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d
```

Access the application:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5001`
- Swagger Docs: `http://localhost:5001/api-docs`
- Database: `localhost:5432`

To stop:

```bash
docker-compose down
```

## Features

### Frontend

- **Store Selection**: Dropdown to select store location
- **Audit Form**: Create new audits with:
  - Product SKU selection
  - Quantity entry
  - Condition assessment
  - Auditor name
- **Audit History**: View all audits for selected store in a clean table format
- **Real-time Updates**: Audit list refreshes after creating new audits

### Backend

- **REST API**: RESTful endpoints for audits and orders
- **Automatic Order Creation**: Creates replenishment orders when inventory falls below threshold
- **Store-Scoped Logic**: Prevents duplicate orders per store-SKU combination
- **Input Validation**: Comprehensive validation on all endpoints
- **API Documentation**: Complete Swagger/OpenAPI documentation

## Project Structure

```
masterflower-project/
├──csharp-integration
│   ├── appsettings.json/ # Sets DB connection string
│   ├── Services/         # Create API and CSV logiv
│   ├── Models/           # Defines shape of DB objects
│   ├── exports/          # Directory with generated CSVs
│   ├── Program.cs        # Runs the CSV generation program
├── backend/
│   ├── controllers/      # Request/response handling
│   ├── models/           # Database queries
│   ├── routes/           # API route definitions
│   ├── schema.sql        # Database schema
│   ├── server.js         # Express app setup
│   └── swagger.js        # API documentation config
├── frontend/
│   └── src/
│       ├── components/   # React components
│       ├── api.js        # API client
│       └── App.js        # Main app component
└── docker-compose.yml    # Docker orchestration
```

## Database Schema

### Tables

- **audits**: Inventory audit records
- **orders**: Replenishment orders (auto-created)
- **product_thresholds**: Configuration for minimum thresholds and replenishment quantities

### Key Relationships

- SKU references products (denormalized for simplicity)
- Orders are created when audit quantity < threshold
- Orders are store-scoped (prevents duplicates per store)

## API Endpoints

### Audits

- `GET /api/audits` - List all audits
- `POST /api/audits` - Create new audit

### Orders

- `GET /api/orders` - List all orders

Full API documentation available at `/api-docs` when backend is running.

## Testing

```bash
# Backend (when tests are added)
cd backend && npm test

# Frontend
cd frontend && npm test
```

## Notes

- The app is designed for a take-home project demonstration
- Some production features (authentication, comprehensive testing, etc.) were omitted for scope management

## License

Internal project for interview purposes.
