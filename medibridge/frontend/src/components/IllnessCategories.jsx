import { useEffect, useRef } from 'react';
import { FiThermometer, FiHeart, FiActivity, FiAnchor, FiEye, FiSun } from 'react-icons/fi';
import './IllnessCategories.css';

const IllnessCategories = () => {
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
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const categories = [
    {
      icon: FiThermometer,
      title: 'Fever & Flu',
      description: 'Common cold, influenza, and temperature-related conditions',
      specialists: 'General Physician, Internal Medicine',
      color: '#00d4aa',
    },
    {
      icon: FiHeart,
      title: 'Heart Conditions',
      description: 'Chest pain, hypertension, and cardiovascular issues',
      specialists: 'Cardiologist, Cardiac Surgeon',
      color: '#ef4444',
    },
    {
      icon: FiActivity,
      title: 'Headaches',
      description: 'Migraines, tension headaches, and neurological pain',
      specialists: 'Neurologist',
      color: '#8b5cf6',
    },
    {
      icon: FiAnchor,
      title: 'Joint Pain',
      description: 'Arthritis, back pain, and musculoskeletal problems',
      specialists: 'Orthopedic, Rheumatologist',
      color: '#3b82f6',
    },
    {
      icon: FiEye,
      title: 'Vision Problems',
      description: 'Eye strain, vision loss, and optical issues',
      specialists: 'Ophthalmologist, Optometrist',
      color: '#06b6d4',
    },
    {
      icon: FiSun,
      title: 'Skin Conditions',
      description: 'Eczema, acne, rashes, and dermatological issues',
      specialists: 'Dermatologist',
      color: '#f59e0b',
    },
  ];

  return (
    <section className="illness-categories section" ref={sectionRef}>
      <div className="container">
        <div className="section-title animate-on-scroll">
          <h2>Common</h2>
          <p>
            Quick access to specialists for the most common health issues.
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-card animate-on-scroll"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div 
                className="category-icon-wrapper"
                style={{ '--category-color': category.color }}
              >
                <category.icon className="category-icon" />
              </div>
              <div className="category-content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <span 
                  className="category-specialists"
                  style={{ color: category.color }}
                >
                  {category.specialists}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-container animate-on-scroll">
          <button className="btn btn-outline view-all-btn">
            View All Conditions
          </button>
        </div>
      </div>
    </section>
  );
};

export default IllnessCategories;
