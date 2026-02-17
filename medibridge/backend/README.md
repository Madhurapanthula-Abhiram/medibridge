# MediBridge Backend

Node.js + Express backend API for the MediBridge healthcare platform.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and configure:

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medibridge

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# API Keys
GOOGLE_MAPS_API_KEY=your_google_maps_key
OPENROUTER_API_KEY=your_openrouter_key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Development

```bash
npm start
```

The server will run on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── models/            # MongoDB models
│   ├── User.js
│   └── Illness.js
├── routes/            # API routes
│   ├── auth.js
│   ├── doctor.js
│   ├── illness.js
│   ├── prediction.js
│   └── user.js
├── middleware/        # Express middleware
│   └── auth.js
├── utils/            # Utility functions
│   └── ai.js
└── server.js         # Entry point
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Prediction
- `POST /api/predict` - Analyze symptoms and get AI predictions

### Doctors
- `GET /api/doctors` - Search for doctors
  - Query params: `lat`, `lng`, `specialty`, `radius`
- `GET /api/doctors/hospitals` - Search for hospitals
  - Query params: `lat`, `lng`, `radius`

### Illnesses
- `GET /api/illnesses` - Get all illnesses
- `GET /api/illnesses/:id` - Get specific illness
- `POST /api/illnesses` - Create illness (admin)
- `PUT /api/illnesses/:id` - Update illness (admin)
- `DELETE /api/illnesses/:id` - Delete illness (admin)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🛠️ Tech Stack

- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM
- **JWT**: Authentication
- **OpenRouter API**: AI capabilities
- **Google Maps API**: Location services
- **Axios**: HTTP client

## 🚢 Deployment

### Render
1. Create new Web Service
2. Connect GitHub repository
3. Set root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables
7. Deploy

### Railway
1. Create new project
2. Connect GitHub repository
3. Set root directory to `backend`
4. Add environment variables
5. Deploy

### Heroku
```bash
# From backend directory
heroku create medibridge-api
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
# ... set other env vars
git push heroku main
```

### Docker
```bash
docker build -t medibridge-backend .
docker run -p 5000:5000 --env-file .env medibridge-backend
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid token in the Authorization header:

```
Authorization: Bearer <token>
```

## 🤖 AI Integration

The backend integrates with OpenRouter API for AI-powered symptom analysis. The AI model:
- Analyzes user-provided symptoms
- Suggests possible illnesses with confidence levels
- Recommends OTC medications
- Provides home remedies
- Lists emergency warning signs
- Suggests appropriate medical specialists

## 🗺️ Google Maps Integration

Uses Google Places API to:
- Find nearby doctors and clinics
- Search for hospitals
- Get location details and ratings
- Provide directions

## 📊 Database Models

### User
- Email, password (hashed)
- Name, phone
- Medical history
- Timestamps

### Illness
- Name, category
- Symptoms, severity
- Treatment recommendations
- Specialist type

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `NODE_ENV` | Environment | No (default: development) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT secret key | Yes |
| `JWT_EXPIRE` | JWT expiration time | No (default: 7d) |
| `GOOGLE_MAPS_API_KEY` | Google Maps API key | Yes |
| `OPENROUTER_API_KEY` | OpenRouter API key | Yes |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |

## 📝 Available Scripts

- `npm start` - Start the server
- `npm run dev` - Start with nodemon (if configured)

## 🔒 Security Features

- Password hashing with bcrypt
- JWT authentication
- CORS configuration
- Input validation
- Rate limiting (recommended to add)
- Helmet.js security headers (recommended to add)

## 📄 License

MIT
