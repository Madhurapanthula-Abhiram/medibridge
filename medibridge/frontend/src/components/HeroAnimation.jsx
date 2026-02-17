import { useState, useEffect, useRef } from 'react';
import './HeroAnimation.css';

const HeroAnimation = () => {
  const [scene, setScene] = useState('ball-entry');
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const typingTexts = [
    'AI Symptom Analysis...',
    'Instant Doctor Matching...',
    'Personalized Health Insights...',
    '24/7 Smart Assistance...'
  ];
  
  const rotatingTexts = [
    'Symptom Analysis.',
    'Doctor Matching.',
    'Health Intelligence.',
    'Instant Insights.',
    'Smart Care.'
  ];

  // Animation sequence - Exact timing from specification
  useEffect(() => {
    // Scene 1: Ball entry (0.8s)
    setTimeout(() => setScene('ball-entry'), 0);
    
    // Scene 2: Bounce 1 (0.4s) - starts at 0.8s
    setTimeout(() => setScene('bounce-1'), 800);
    
    // Scene 3: Bounce 2 (0.4s) - starts at 1.2s
    setTimeout(() => setScene('bounce-2'), 1200);
    
    // Scene 4: Bounce 3 (0.5s) - starts at 1.6s
    setTimeout(() => setScene('bounce-3'), 1600);
    
    // Scene 5: Transform to hurricane (0.7s) - starts at 2.1s
    setTimeout(() => setScene('hurricane'), 2100);
    
    // Scene 6: Swirl rotation (1.5s) - hurricane continues
    
    // Scene 7: Shrink morph (0.6s) - starts at 3.6s
    setTimeout(() => setScene('spiral'), 3600);
    
    // Scene 8: Robot appear (0.6s) - starts at 4.2s
    setTimeout(() => setScene('robot'), 4200);
    
    // Scene 9: Speech bubble pop (0.4s) - starts at 4.8s
    setTimeout(() => setShowSpeechBubble(true), 4800);
    
    // Scene 10: Typing start - after 0.5s delay (5.3s)
    setTimeout(() => setIsTyping(true), 5300);
  }, []);

  // Typing effect
  useEffect(() => {
    if (!isTyping) return;
    
    const text = typingTexts[typingIndex];
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (charIndex <= text.length) {
        setCurrentText(text.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setTypingIndex((prev) => (prev + 1) % typingTexts.length);
          setCurrentText('');
        }, 1500);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [typingIndex, isTyping]);

  return (
    <div className="hero-animation-container">
      {/* Scene 1-3: Ball Entry and Bounces */}
      {(scene === 'ball-entry' || scene.startsWith('bounce')) && (
        <div className={`neon-ball ${scene}`}>
          <div className="ball-glow"></div>
          <div className="ball-core"></div>
          {scene === 'ball-entry' && <div className="glow-trail"></div>}
        </div>
      )}

      {/* Scene 4: Hurricane Swirl */}
      {scene === 'hurricane' && (
        <div className="hurricane-swirl">
          <div className="swirl-core"></div>
          <div className="swirl-ring ring-1"></div>
          <div className="swirl-ring ring-2"></div>
          <div className="swirl-ring ring-3"></div>
          <div className="light-waves"></div>
          <div className="floating-sparks">
            {[...Array(8)].map((_, i) => (
              <span key={i} className={`spark spark-${i}`}></span>
            ))}
          </div>
        </div>
      )}

      {/* Scene 5: Spiral */}
      {scene === 'spiral' && (
        <div className="compact-spiral">
          <div className="spiral-glow"></div>
        </div>
      )}

      {/* Scene 6: Robot */}
      {scene === 'robot' && (
        <div className="futuristic-robot">
          <div className="robot-body">
            {/* Head */}
            <div className="robot-head">
              <div className="robot-face">
                <div className="robot-eye left">
                  <div className="eye-glow"></div>
                </div>
                <div className="robot-eye right">
                  <div className="eye-glow"></div>
                </div>
                <div className="robot-smile"></div>
              </div>
              {/* Antenna */}
              <div className="robot-antenna">
                <div className="antenna-light"></div>
              </div>
            </div>
            
            {/* Body */}
            <div className="robot-torso">
              <div className="torso-glow"></div>
              <div className="chest-panel">
                <div className="panel-light"></div>
              </div>
            </div>
            
            {/* Arms */}
            <div className="robot-arm left">
              <div className="hand"></div>
            </div>
            <div className="robot-arm right waving">
              <div className="hand"></div>
            </div>
          </div>
          
          {/* Speech Bubble */}
          {showSpeechBubble && (
            <div className="speech-bubble">
              <span className="bubble-text">Hi 👋 Need any help?</span>
            </div>
          )}
        </div>
      )}

      {/* Typing Text Animation */}
      {scene === 'robot' && isTyping && (
        <div className="typing-container">
          <div className="typing-line">
            <span className="typing-text">{currentText}</span>
            <span className="typing-cursor">|</span>
          </div>
        </div>
      )}

      {/* Rotating Text for Chatbot */}
      <div className="rotating-text-container">
        {rotatingTexts.map((text, index) => (
          <span
            key={index}
            className={`rotating-text ${index === typingIndex % rotatingTexts.length ? 'active' : ''}`}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HeroAnimation;
