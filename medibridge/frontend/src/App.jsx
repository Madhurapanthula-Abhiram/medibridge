import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import CommonIllnesses from './components/CommonIllnesses';
import SymptomPrediction from './pages/SymptomPrediction';
import FindDoctor from './components/FindDoctor';
import HowItWorks from './components/HowItWorks';
import AboutUs from './components/AboutUs';
import Auth from './components/Auth';
import Chatbot from './components/Chatbot';
import './App.css';

// Home Page Component
const Home = () => (
  <>
    <Hero />
    <Features />
    <CommonIllnesses limit={6} showViewAll={true} />
  </>
);

// Illnesses Page
const IllnessesPage = () => (
  <div className="page-container">
    <div className="page-header">
      <h1>Common <span className="text-gradient">Illnesses</span></h1>
      <p>Browse our comprehensive database of common health conditions and their treatments.</p>
    </div>
    <CommonIllnesses limit={26} showViewAll={false} />
  </div>
);

// Prediction Page
const PredictionPage = () => (
  <SymptomPrediction />
);

// Find Doctor Page Wrapper
const FindDoctorPage = () => (
  <div className="page-container">
    <FindDoctor />
  </div>
);

// How It Works Page Wrapper
const HowItWorksPage = () => (
  <div className="page-container">
    <HowItWorks />
  </div>
);

// About Page Wrapper
const AboutPage = () => (
  <div className="page-container">
    <AboutUs />
  </div>
);

// Auth Page Wrapper
const AuthPage = () => (
  <div className="auth-page-wrapper">
    <Auth />
  </div>
);

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/illnesses" element={<IllnessesPage />} />
          <Route path="/symptom-prediction" element={<PredictionPage />} />
          <Route path="/symptom-checker" element={<PredictionPage />} />
          <Route path="/find-doctor" element={<FindDoctorPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}

// Footer Component
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <svg viewBox="0 0 100 60" className="pulse-svg-small">
              <path
                d="M5 30 L20 30 L25 10 L35 50 L45 5 L55 55 L65 30 L95 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>MediBridge</span>
          </div>
          <p>Your Health, Our Priority. Connecting patients with quality healthcare.</p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>Quick Links</h4>
            <a href="/">Home</a>
            <a href="/illnesses">Common Illnesses</a>
            <a href="/find-doctor">Find Doctor</a>
            <a href="/symptom-checker">Symptom Checker</a>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <a href="/about">About Us</a>
            <a href="/how-it-works">How It Works</a>
            <a href="#">Contact</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">FAQs</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MediBridge. All rights reserved.</p>
        <p className="disclaimer">
          MediBridge is an informational platform and does not provide medical advice. 
          Always consult a qualified healthcare provider for medical concerns.
        </p>
      </div>
    </div>
  </footer>
);

export default App;
