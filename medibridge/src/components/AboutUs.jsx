import { useEffect, useRef } from 'react';
import { FiHeart, FiTarget, FiShield, FiGlobe } from 'react-icons/fi';
import './AboutUs.css';

const AboutUs = () => {
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

  const values = [
    {
      icon: FiHeart,
      title: 'Patient First',
      description: 'We prioritize patient well-being above all else, ensuring every feature serves your health needs.',
    },
    {
      icon: FiTarget,
      title: 'Accuracy',
      description: 'Our AI models are trained on vast medical datasets to provide reliable symptom analysis.',
    },
    {
      icon: FiShield,
      title: 'Trust & Safety',
      description: 'We verify every healthcare provider and protect your data with enterprise-grade security.',
    },
    {
      icon: FiGlobe,
      title: 'Accessibility',
      description: 'Healthcare should be accessible to everyone. We\'re breaking down barriers to quality care.',
    },
  ];

  const team = [
    {
      name: 'Dr. Amanda Chen',
      role: 'Chief Medical Officer',
      image: '👩‍⚕️',
      bio: 'Board-certified physician with 15+ years of experience in internal medicine.',
    },
    {
      name: 'Michael Roberts',
      role: 'CEO & Co-Founder',
      image: '👨‍💼',
      bio: 'Former healthcare consultant passionate about leveraging technology for better patient outcomes.',
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Engineering',
      image: '👩‍💻',
      bio: 'AI/ML expert with a background in building scalable healthcare platforms.',
    },
    {
      name: 'Dr. James Wilson',
      role: 'Medical Advisor',
      image: '👨‍⚕️',
      bio: 'Emergency medicine specialist ensuring our platform meets clinical standards.',
    },
  ];

  return (
    <section className="about-us section" ref={sectionRef}>
      <div className="container">
        {/* Hero Section */}
        <div className="about-hero animate-on-scroll">
          <div className="about-hero-content">
            <h1>About <span className="text-gradient">MediBridge</span></h1>
            <p className="about-tagline">
              Bridging the gap between patients and quality healthcare through technology and compassion.
            </p>
            <p className="about-description">
              Founded in 2024, MediBridge was born from a simple observation: finding the right 
              healthcare provider shouldn't be difficult. Our mission is to make quality healthcare 
              accessible to everyone by connecting patients with verified medical professionals 
              based on their unique symptoms and needs.
            </p>
          </div>
          <div className="about-hero-stats">
            <div className="about-stat">
              <span className="stat-value">50K+</span>
              <span className="stat-label">Patients Helped</span>
            </div>
            <div className="about-stat">
              <span className="stat-value">10K+</span>
              <span className="stat-label">Verified Doctors</span>
            </div>
            <div className="about-stat">
              <span className="stat-value">25+</span>
              <span className="stat-label">Medical Specialties</span>
            </div>
            <div className="about-stat">
              <span className="stat-value">99%</span>
              <span className="stat-label">Patient Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mission-section animate-on-scroll">
          <h2>Our Mission</h2>
          <p>
            To democratize healthcare access by leveraging artificial intelligence and digital 
            connectivity. We believe everyone deserves quick, accurate guidance when they're 
            not feeling well, and seamless access to qualified healthcare professionals.
          </p>
        </div>

        {/* Values Section */}
        <div className="values-section">
          <h2 className="animate-on-scroll">Our Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card animate-on-scroll"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="value-icon">
                  <value.icon />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h2 className="animate-on-scroll">Meet Our Team</h2>
          <p className="team-intro animate-on-scroll">
            A dedicated group of healthcare professionals, engineers, and innovators working 
            together to transform the patient experience.
          </p>
          <div className="team-grid">
            {team.map((member, index) => (
              <div
                key={index}
                className="team-card animate-on-scroll"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="team-avatar">{member.image}</div>
                <h3>{member.name}</h3>
                <span className="team-role">{member.role}</span>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="contact-cta animate-on-scroll">
          <h2>Get in Touch</h2>
          <p>Have questions or feedback? We'd love to hear from you.</p>
          <div className="contact-info">
            <a href="mailto:contact@medibridge.com" className="btn btn-primary">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
