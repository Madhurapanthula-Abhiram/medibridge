import { useEffect, useRef } from 'react';
import './Hero3DAnimation.css';

const Hero3DAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let time = 0;
    let particles = [];

    // Resize canvas
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    // 3D Doctor and Patient Animation
    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Background gradient
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width / 2);
      bgGradient.addColorStop(0, 'rgba(192, 38, 211, 0.1)');
      bgGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.05)');
      bgGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw floating particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192, 132, 252, ${p.opacity})`;
        ctx.fill();
      });

      // Draw orbital rings
      const ringCount = 3;
      for (let i = 0; i < ringCount; i++) {
        const radius = 80 + i * 40;
        const tilt = Math.sin(time * 0.001 + i * 0.5) * 0.3;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(1, 0.6 + tilt * 0.2);
        ctx.rotate(time * 0.0005 * (i % 2 === 0 ? 1 : -1));

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(192, 38, 211, ${0.3 - i * 0.08})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw orbiting dots on rings
        const dotAngle = time * 0.002 + i * 2;
        const dotX = Math.cos(dotAngle) * radius;
        const dotY = Math.sin(dotAngle) * radius;

        ctx.beginPath();
        ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
        ctx.fillStyle = i === 0 ? '#c026d3' : i === 1 ? '#8b5cf6' : '#e879f9';
        ctx.fill();

        ctx.restore();
      }

      // Draw 3D Doctor (scaled up)
      const doctorX = centerX - 80;
      const doctorY = centerY + 30;
      const doctorBounce = Math.sin(time * 0.003) * 8;

      ctx.save();
      ctx.translate(doctorX, doctorY + doctorBounce);
      ctx.scale(1.4, 1.4);
      drawDoctor(ctx, 0, 0, time);
      ctx.restore();

      // Draw 3D Patient (scaled up)
      const patientX = centerX + 80;
      const patientY = centerY + 40;
      const patientBounce = Math.sin(time * 0.003 + 1) * 8;

      ctx.save();
      ctx.translate(patientX, patientY + patientBounce);
      ctx.scale(1.4, 1.4);
      drawPatient(ctx, 0, 0, time);
      ctx.restore();

      // Draw connection line between doctor and patient
      ctx.beginPath();
      ctx.moveTo(doctorX + 35, doctorY + doctorBounce - 15);
      ctx.lineTo(patientX - 35, patientY + patientBounce - 15);
      ctx.strokeStyle = 'rgba(0, 212, 170, 0.3)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw floating medical icons
      drawFloatingIcons(ctx, centerX, centerY, time);

      time += 16;
      animationRef.current = requestAnimationFrame(animate);
    };

    const drawDoctor = (ctx, x, y, time) => {
      // Doctor body (3D effect with shadow)
      ctx.save();
      ctx.translate(x, y);

      // Shadow
      ctx.beginPath();
      ctx.ellipse(0, 45, 25, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fill();

      // Body
      ctx.beginPath();
      ctx.roundRect(-20, -10, 40, 50, 10);
      ctx.fillStyle = '#f8fafc';
      ctx.fill();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Lab coat details
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.lineTo(0, 40);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Stethoscope
      ctx.beginPath();
      ctx.arc(0, 5, 12, 0, Math.PI);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Head
      ctx.beginPath();
      ctx.arc(0, -25, 18, 0, Math.PI * 2);
      ctx.fillStyle = '#fde68a';
      ctx.fill();

      // Hair
      ctx.beginPath();
      ctx.arc(0, -32, 18, Math.PI, 0);
      ctx.fillStyle = '#4a3b2a';
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(-6, -25, 2, 0, Math.PI * 2);
      ctx.arc(6, -25, 2, 0, Math.PI * 2);
      ctx.fill();

      // Smile
      ctx.beginPath();
      ctx.arc(0, -20, 6, 0.2, Math.PI - 0.2);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Medical cross on coat
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-3, 10, 6, 2);
      ctx.fillRect(-1, 8, 2, 6);

      ctx.restore();
    };

    const drawPatient = (ctx, x, y, time) => {
      ctx.save();
      ctx.translate(x, y);

      // Shadow
      ctx.beginPath();
      ctx.ellipse(0, 40, 22, 7, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fill();

      // Body
      ctx.beginPath();
      ctx.roundRect(-18, -5, 36, 40, 8);
      ctx.fillStyle = '#dbeafe';
      ctx.fill();
      ctx.strokeStyle = '#93c5fd';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Head
      ctx.beginPath();
      ctx.arc(0, -22, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#fde68a';
      ctx.fill();

      // Hair
      ctx.beginPath();
      ctx.arc(0, -28, 16, Math.PI, 0);
      ctx.fillStyle = '#2d1b0e';
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(-5, -22, 2, 0, Math.PI * 2);
      ctx.arc(5, -22, 2, 0, Math.PI * 2);
      ctx.fill();

      // Smile
      ctx.beginPath();
      ctx.arc(0, -18, 5, 0.2, Math.PI - 0.2);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Heart rate indicator
      const heartRate = Math.sin(time * 0.01) * 5;
      ctx.beginPath();
      ctx.moveTo(-10, 15);
      ctx.lineTo(-5, 15);
      ctx.lineTo(-3, 10 + heartRate);
      ctx.lineTo(-1, 20 - heartRate);
      ctx.lineTo(1, 15);
      ctx.lineTo(10, 15);
      ctx.strokeStyle = '#00d4aa';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    };

    const drawFloatingIcons = (ctx, centerX, centerY, time) => {
      const icons = [
        { x: -120, y: -80, icon: 'heart', color: '#ec4899' },
        { x: 120, y: -80, icon: 'activity', color: '#00d4aa' },
        { x: -130, y: 60, icon: 'shield', color: '#8b5cf6' },
        { x: 130, y: 60, icon: 'clock', color: '#f59e0b' },
      ];

      icons.forEach((item, i) => {
        const floatY = Math.sin(time * 0.002 + i) * 8;
        const x = centerX + item.x;
        const y = centerY + item.y + floatY;

        // Icon background
        ctx.beginPath();
        ctx.roundRect(x - 20, y - 20, 40, 40, 10);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
        ctx.fill();
        ctx.strokeStyle = item.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Icon glow
        ctx.beginPath();
        ctx.roundRect(x - 20, y - 20, 40, 40, 10);
        ctx.fillStyle = `${item.color}20`;
        ctx.fill();

        // Draw simple icon shapes
        ctx.strokeStyle = item.color;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        if (item.icon === 'heart') {
          ctx.beginPath();
          ctx.moveTo(x, y + 5);
          ctx.bezierCurveTo(x - 10, y - 5, x - 10, y - 10, x, y - 10);
          ctx.bezierCurveTo(x + 10, y - 10, x + 10, y - 5, x, y + 5);
          ctx.fillStyle = item.color;
          ctx.fill();
        } else if (item.icon === 'activity') {
          ctx.beginPath();
          ctx.moveTo(x - 10, y);
          ctx.lineTo(x - 5, y);
          ctx.lineTo(x - 2, y - 8);
          ctx.lineTo(x + 2, y + 8);
          ctx.lineTo(x + 5, y);
          ctx.lineTo(x + 10, y);
          ctx.stroke();
        } else if (item.icon === 'shield') {
          ctx.beginPath();
          ctx.moveTo(x, y - 10);
          ctx.lineTo(x + 10, y - 5);
          ctx.lineTo(x + 10, y + 2);
          ctx.quadraticCurveTo(x + 10, y + 10, x, y + 12);
          ctx.quadraticCurveTo(x - 10, y + 10, x - 10, y + 2);
          ctx.lineTo(x - 10, y - 5);
          ctx.closePath();
          ctx.stroke();
        } else if (item.icon === 'clock') {
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y - 6);
          ctx.moveTo(x, y);
          ctx.lineTo(x + 5, y);
          ctx.stroke();
        }
      });
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="hero-3d-container">
      <canvas ref={canvasRef} className="hero-3d-canvas" />
      
      {/* Labels */}
      <div className="hero-3d-label label-ai">
        <span className="label-dot"></span>
        <span className="label-text">AI Analysis</span>
      </div>
      <div className="hero-3d-label label-network">
        <span className="label-dot"></span>
        <span className="label-text">Neural Network</span>
      </div>
      <div className="hero-3d-label label-health">
        <span className="label-dot"></span>
        <span className="label-text">Health Data</span>
      </div>
    </div>
  );
};

export default Hero3DAnimation;
