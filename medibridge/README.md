# MediBridge - Healthcare Platform

A comprehensive healthcare platform with AI-powered symptom analysis, doctor finder with Google Maps integration, and an intelligent medical chatbot.

## 🏗️ Project Structure

```
medibridge/
├── frontend/          # React + Vite frontend application
├── backend/           # Node.js + Express backend API
└── README.md         # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for backend)
- Google Maps API Key
- OpenRouter API Key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Madhurapanthula-Abhiram/medibridge.git
   cd medibridge
   ```

2. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env and add your API keys
   npm run dev
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env and add your configuration
   npm start
   ```

## 📦 Frontend

**Tech Stack:**
- React 18
- Vite
- React Router
- Google Maps API
- Framer Motion
- React Icons

**Features:**
- 🏥 Symptom Prediction with AI
- 🗺️ Doctor Finder with Google Maps
- 💬 AI Medical Chatbot (Medron)
- 📚 Common Illnesses Database
- 🎨 Modern, Responsive UI

**Development:**
```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🔧 Backend

**Tech Stack:**
- Node.js
- Express
- MongoDB
- OpenRouter AI API
- Google Maps API

**Features:**
- 🤖 AI-powered symptom analysis
- 🔍 Doctor and hospital search
- 🗄️ User authentication
- 📊 Illness database management

**Development:**
```bash
cd backend
npm start            # Start server
npm run dev          # Start with nodemon (if configured)
```

## 🌐 Environment Variables

### Frontend (.env)
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
VITE_API_URL=http://localhost:5000/api
VITE_OPENROUTER_API_KEY=your_openrouter_key
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_key
OPENROUTER_API_KEY=your_openrouter_key
FRONTEND_URL=http://localhost:3000
```

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `dist` folder to your hosting service
3. Set environment variables in your hosting dashboard

### Backend Deployment (Render/Railway/Heroku)
1. Push the `backend` folder to your hosting service
2. Set environment variables
3. Ensure MongoDB is accessible
4. Start command: `npm start`

### Docker Deployment
```bash
# From frontend directory
docker build -t medibridge-frontend .
docker run -p 3000:80 medibridge-frontend

# Backend can be deployed similarly
```

## 📝 API Endpoints

### Prediction
- `POST /api/predict` - Analyze symptoms and get predictions

### Doctors
- `GET /api/doctors` - Search for doctors
- `GET /api/doctors/hospitals` - Search for hospitals

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Illnesses
- `GET /api/illnesses` - Get all illnesses
- `GET /api/illnesses/:id` - Get specific illness

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Abhiram Madhurapanthula**
- GitHub: [@Madhurapanthula-Abhiram](https://github.com/Madhurapanthula-Abhiram)

## 🙏 Acknowledgments

- OpenRouter for AI capabilities
- Google Maps for location services
- React and Vite communities
