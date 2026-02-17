# MediBridge Frontend

React + Vite frontend application for the MediBridge healthcare platform.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and fill in your API keys:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_API_URL=http://localhost:5000/api
VITE_OPENROUTER_API_KEY=your_openrouter_api_key
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── data/           # Static data (illnesses, etc.)
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── public/             # Static assets
├── index.html          # HTML template
└── vite.config.js      # Vite configuration
```

## 🎨 Features

- **Symptom Prediction**: AI-powered symptom analysis
- **Doctor Finder**: Google Maps integration to find nearby doctors and hospitals
- **Medical Chatbot**: Interactive AI chatbot (Medron)
- **Common Illnesses**: Comprehensive illness database
- **Responsive Design**: Works on all devices

## 🛠️ Tech Stack

- **React 18**: UI library
- **Vite**: Build tool
- **React Router**: Navigation
- **Google Maps API**: Location services
- **Framer Motion**: Animations
- **React Icons**: Icon library

## 🚢 Deployment

### Vercel
1. Connect your GitHub repository
2. Set the root directory to `frontend`
3. Add environment variables
4. Deploy

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add environment variables
4. Deploy

### Docker
```bash
docker build -t medibridge-frontend .
docker run -p 80:80 medibridge-frontend
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔑 API Integration

The frontend communicates with the backend API at the URL specified in `VITE_API_URL`.

### Main Endpoints Used:
- `/api/predict` - Symptom prediction
- `/api/doctors` - Doctor search
- `/api/doctors/hospitals` - Hospital search
- `/api/illnesses` - Illness data
- `/api/auth/*` - Authentication

## 🎯 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps API key | Yes |
| `VITE_API_URL` | Backend API URL | Yes |
| `VITE_OPENROUTER_API_KEY` | OpenRouter API key for AI | Yes |

## 📄 License

MIT
