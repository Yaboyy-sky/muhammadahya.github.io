import React, { useEffect, useRef } from 'react';

export default function AuroraCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Aurora particles (glowing fireflies / aurora specks)
    const particleCount = Math.floor(Math.min(width, 1400) / 25);
    const particles = [];
    const colors = [
      'rgba(16, 185, 129, ', // Emerald
      'rgba(52, 211, 153, ', // Light emerald
      'rgba(139, 92, 246, ', // Aurora violet
      'rgba(168, 85, 247, ', // Purple
      'rgba(6, 182, 212, ',  // Cyan
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.45 + 0.15,
        alpha: 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseVal: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.45 - 0.15, // float gently upwards
      });
    }

    let time = 0;

    const render = () => {
      time += 0.006;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw glowing Aurora Ribbons across the upper portion of screen
      // Ribbon 1: Primary Emerald Aurora Wave
      const grad1 = ctx.createLinearGradient(0, 0, width, height * 0.75);
      grad1.addColorStop(0, 'rgba(16, 185, 129, 0.18)');
      grad1.addColorStop(0.35, 'rgba(6, 182, 212, 0.12)');
      grad1.addColorStop(0.7, 'rgba(139, 92, 246, 0.15)');
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.save();
      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.moveTo(0, 0);

      const waveSteps = 8;
      const stepX = width / waveSteps;
      for (let i = 0; i <= waveSteps; i++) {
        const cx = i * stepX;
        const cy =
          Math.sin(time + i * 0.7) * 70 +
          Math.cos(time * 0.7 + i * 0.4) * 45 +
          height * 0.28;
        if (i === 0) {
          ctx.lineTo(cx, cy);
        } else {
          const prevX = (i - 1) * stepX;
          const prevY =
            Math.sin(time + (i - 1) * 0.7) * 70 +
            Math.cos(time * 0.7 + (i - 1) * 0.4) * 45 +
            height * 0.28;
          const midX = (prevX + cx) / 2;
          const midY = (prevY + cy) / 2;
          ctx.quadraticCurveTo(prevX, prevY, midX, midY);
        }
      }
      ctx.lineTo(width, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Ribbon 2: Secondary Violet/Purple Aurora Wave (counter oscillation)
      const grad2 = ctx.createLinearGradient(width, 0, 0, height * 0.65);
      grad2.addColorStop(0, 'rgba(139, 92, 246, 0.16)');
      grad2.addColorStop(0.5, 'rgba(16, 185, 129, 0.10)');
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.save();
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let i = 0; i <= waveSteps; i++) {
        const cx = i * stepX;
        const cy =
          Math.sin(time * 1.2 + i * 0.9 + 2) * 55 +
          Math.sin(time * 0.5 + i * 0.5) * 35 +
          height * 0.22;
        if (i === 0) ctx.lineTo(cx, cy);
        else {
          const prevX = (i - 1) * stepX;
          const prevY =
            Math.sin(time * 1.2 + (i - 1) * 0.9 + 2) * 55 +
            Math.sin(time * 0.5 + (i - 1) * 0.5) * 35 +
            height * 0.22;
          ctx.quadraticCurveTo(prevX, prevY, (prevX + cx) / 2, (prevY + cy) / 2);
        }
      }
      ctx.lineTo(width, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 2. Draw Floating Aurora Particles / Bioluminescent Forest Fireflies
      particles.forEach((p) => {
        p.pulseVal += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulseVal) * 0.2;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        // Draw soft glow around particle
        const particleGrad = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius * 3.5
        );
        particleGrad.addColorStop(0, `${p.colorBase}${Math.max(0, p.alpha)})`);
        particleGrad.addColorStop(1, `${p.colorBase}0)`);

        ctx.fillStyle = particleGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Particle core
        ctx.fillStyle = `${p.colorBase}${Math.min(1, p.alpha * 1.8)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-90"
      aria-hidden="true"
    />
  );
}
