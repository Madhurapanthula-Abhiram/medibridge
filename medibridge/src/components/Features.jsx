import { useEffect, useRef } from 'react';
import { FiSearch, FiMapPin, FiClock, FiShield, FiUsers, FiMessageCircle } from 'react-icons/fi';
import './Features.css';

const Features = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = 40;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${particle.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const features = [
    {
      icon: FiSearch,
      title: 'Smart Symptom Analysis',
      description: 'AI-powered system analyzes your symptoms to recommend the right specialists.',
      color: '#00d4aa',
    },
    {
      icon: FiMapPin,
      title: 'Location-Based Matching',
      description: 'Find doctors and hospitals near you with real-time availability.',
      color: '#3b82f6',
    },
    {
      icon: FiClock,
      title: 'Save Time',
      description: 'Skip the guesswork and get matched with the right healthcare provider instantly.',
      color: '#f59e0b',
    },
    {
      icon: FiShield,
      title: 'Verified Professionals',
      description: 'All healthcare providers are verified and licensed professionals.',
      color: '#10b981',
    },
    {
      icon: FiUsers,
      title: 'Patient Reviews',
      description: 'Read real experiences from patients who\'ve visited these providers.',
      color: '#8b5cf6',
    },
    {
      icon: FiMessageCircle,
      title: '24/7 Health Assistant',
      description: 'Get instant answers to your health questions from our AI chatbot.',
      color: '#ec4899',
    },
  ];

  return (
    <section className="features section" ref={sectionRef}>
      <canvas ref={canvasRef} className="particles-canvas" />
      <div className="container">
        <div className="section-title animate-on-scroll">
          <h2>Why Choose <span className="text-gradient">MediBridge</span></h2>
          <p>
            Experience healthcare matching that's fast, accurate, and tailored to your needs.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card animate-on-scroll"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div 
                className="feature-icon-wrapper"
                style={{ '--feature-color': feature.color }}
              >
                <feature.icon className="feature-icon" />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
