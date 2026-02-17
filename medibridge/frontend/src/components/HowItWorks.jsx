import { useEffect, useRef } from 'react';
import { FiSearch, FiActivity, FiUser, FiSave } from 'react-icons/fi';
import './HowItWorks.css';

const HowItWorks = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      icon: FiSearch,
      number: '01',
      title: 'Enter Your Symptoms',
      description: 'Describe what you\'re feeling using our smart symptom checker. Our AI understands natural language and suggests relevant symptoms as you type.',
      color: '#00d4aa',
    },
    {
      icon: FiActivity,
      number: '02',
      title: 'Get Predicted Illness',
      description: 'Receive a list of possible conditions ranked by probability. Each prediction includes matching symptoms, severity level, and recommended specialists.',
      color: '#3b82f6',
    },
    {
      icon: FiUser,
      number: '03',
      title: 'Find Doctors & Book',
      description: 'Connect with verified healthcare providers near you. View ratings, availability, and book appointments directly through the platform.',
      color: '#8b5cf6',
    },
    {
      icon: FiSave,
      number: '04',
      title: 'Save to Profile',
      description: 'Keep track of your health journey. Save predictions, favorite doctors, and access your complete medical history anytime, anywhere.',
      color: '#ec4899',
    },
  ];

  return (
    <section className="how-it-works section" ref={sectionRef}>
      <div className="container">
        <div className="section-title animate-on-scroll">
          <h2>How It <span className="text-gradient">Works</span></h2>
          <p>
            Getting the right healthcare has never been easier. Follow these simple steps to find your perfect match.
          </p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step-card animate-on-scroll ${index % 2 === 1 ? 'step-reverse' : ''}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="step-content">
                <div className="step-number" style={{ color: step.color }}>
                  {step.number}
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <div className="step-visual">
                <div 
                  className="step-icon-wrapper"
                  style={{ 
                    background: `linear-gradient(135deg, ${step.color}20 0%, ${step.color}10 100%)`,
                    borderColor: `${step.color}30`
                  }}
                >
                  <step.icon style={{ color: step.color }} />
                </div>
                {index < steps.length - 1 && (
                  <div className="step-connector" style={{ background: step.color }}></div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="features-highlight animate-on-scroll">
          <div className="highlight-card">
            <div className="highlight-icon">
              <FiActivity />
            </div>
            <h4>AI-Powered Analysis</h4>
            <p>Our advanced algorithms analyze thousands of symptom combinations to provide accurate predictions.</p>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">
              <FiUser />
            </div>
            <h4>Verified Professionals</h4>
            <p>Every doctor on our platform is thoroughly vetted and licensed to practice in their specialty.</p>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">
              <FiSave />
            </div>
            <h4>Secure & Private</h4>
            <p>Your health data is encrypted and protected. We never share your information without consent.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
