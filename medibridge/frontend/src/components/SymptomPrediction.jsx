import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiAlertCircle, FiUser, FiMapPin, FiArrowRight, FiActivity, FiShield, FiPlusCircle, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './SymptomPrediction.css';

const SymptomPrediction = () => {
  const [symptoms, setSymptoms] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: 17.6868, lng: 83.2185 }); // Default to Vizag seen in map
  const sectionRef = useRef(null);

  useEffect(() => {
    // Attempt to get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => console.log('Location access denied, using default.')
      );
    }
  }, []);

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) {
      setError('Please describe your symptoms');
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // Call our robust backend instead of direct OpenRouter (prevents CORS & allows backend logging)
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed. The model might be busy or the request was rejected.');
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      console.error('Diagnostic error:', err);
      setError('Health AI is temporarily unavailable. This usually happens when the free models are at capacity. Please try again in 30 seconds.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="symptom-prediction section" ref={sectionRef}>
      <div className="container">
        <div className="section-title animate-on-scroll">
          <h2>Health <span className="text-gradient">Analyzer</span></h2>
          <p>
            Powered by advanced medical AI. Describe your symptoms naturally for a professional diagnostic assessment.
          </p>
        </div>

        <div className="symptom-input-wrapper glass-card animate-on-scroll">
          <div className="input-header">
            <FiActivity className="icon" />
            <span>Diagnostic Input Panel</span>
          </div>
          <div className="input-group">
            <textarea
              id="symptom-input-textarea"
              placeholder="e.g. 'I have a sharp stomach pain that started 2 hours ago, and I feel slightly dizzy...'"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="symptom-textarea"
            />
            <div className="input-footer">
              <div className="hints">
                <span><FiCheckCircle /> Mention duration</span>
                <span><FiCheckCircle /> Frequency?</span>
              </div>
              <button
                id="analyze-symptoms-btn"
                className="btn btn-primary"
                onClick={analyzeSymptoms}
                disabled={loading || !symptoms.trim()}
              >
                {loading ? <span className="spinner-small"></span> : <><FiSearch /> Analyze Symptoms</>}
              </button>
            </div>
          </div>
        </div>

        {error && <div className="error-message animate-fadeIn"><FiAlertCircle /> {error}</div>}

        {prediction && (
          <div className="results-grid animate-fadeIn">
            <div className="prediction-results-list">
              <div className="results-header-info">
                <h3>Potential Conditions</h3>
                <span className="ai-model-tag">AI Powered Analysis</span>
              </div>

              {prediction.illnesses?.map((ill, i) => (
                <div key={i} className={`prediction-result-card ai-severity-${ill.severity.toLowerCase()}`}>
                  <div className="result-header">
                    <h4>{ill.name}</h4>
                    <span className="conf-badge">{ill.confidence} Match</span>
                  </div>
                  <p className="ill-desc">{ill.description}</p>
                  <div className="result-meta">
                    <span className="ai-severity-tag">{ill.severity} Severity</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="guidance-container">
              <div className="guidance-card glass-card">
                <div className="card-header"><FiPlusCircle /> <h4>Care Plan</h4></div>
                <div className="care-section">
                  <h5>OTC Support:</h5>
                  <div className="pill-list">
                    {prediction.medications?.map((m, i) => <span key={i} className="pill-tag">{m}</span>)}
                  </div>
                </div>
                <div className="care-section mt-4">
                  <h5>Precautions:</h5>
                  <ul className="remedy-list">
                    {prediction.precautions?.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
                <div className="care-section mt-4">
                  <h5>Safe Home Care:</h5>
                  <ul className="remedy-list">
                    {prediction.home_remedies?.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              </div>

              <div className="guidance-card glass-card warning">
                <div className="card-header"><FiAlertCircle /> <h4>Emergency Warning Signs</h4></div>
                <ul className="emergency-list">
                  {prediction.emergency_signs?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              <div className="doctor-cta-modern glass-card highlight">
                <div className="cta-main">
                  <div className="cta-icon-bg"><FiUser /></div>
                  <div className="cta-text">
                    <h4>Check for Doctors</h4>
                    <p>Consult a {prediction.doctor_specialist} for professional advice on {prediction.illnesses?.[0]?.name}</p>
                  </div>
                </div>
                <button
                  id="view-specialist-btn"
                  onClick={() => window.location.href = `/find-doctor?query=${encodeURIComponent(prediction.illnesses?.[0]?.name || '')}&specialty=${encodeURIComponent(prediction.doctor_specialist)}`}
                  className="btn btn-primary full-width cta-btn"
                >
                  <FiMapPin /> Locate Specialist Nearby
                </button>
              </div>
            </div>

            <div className="full-width disclaimer-modern">
              <div className="disclaimer-title"><FiShield /> Medical Disclaimer</div>
              <p>{prediction.disclaimer}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SymptomPrediction;
