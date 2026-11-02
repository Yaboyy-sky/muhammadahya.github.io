import React, { useEffect, useRef } from 'react';

export default function FallingLeaves() {
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

    // Number of falling leaves (calibrated for delicate, non-distracting presence)
    const leafCount = Math.floor(Math.min(width, 1400) / 45);
    const leaves = [];

    // Subtle leaf color variations: glowing emerald, forest jade, deep teal, and faint aurora tint
    const leafColors = [
      { fill: 'rgba(16, 185, 129, 0.45)', stroke: 'rgba(52, 211, 153, 0.6)' },
      { fill: 'rgba(5, 150, 105, 0.40)', stroke: 'rgba(16, 185, 129, 0.5)' },
      { fill: 'rgba(4, 120, 87, 0.35)', stroke: 'rgba(52, 211, 153, 0.4)' },
      { fill: 'rgba(20, 83, 45, 0.38)', stroke: 'rgba(16, 185, 129, 0.35)' },
      { fill: 'rgba(139, 92, 246, 0.30)', stroke: 'rgba(192, 132, 252, 0.5)' }, // Aurora-kissed leaf
    ];

    for (let i = 0; i < leafCount; i++) {
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height - height * 0.2,
        size: Math.random() * 8 + 7, // 7 to 15px
        speedY: Math.random() * 0.75 + 0.45, // gentle descent
        speedX: Math.random() * 0.5 + 0.25,  // diagonal drift
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.02,
        oscillationSpeed: Math.random() * 0.02 + 0.01,
        oscillationDist: Math.random() * 1.5 + 0.8,
        timeOffset: Math.random() * 100,
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
      });
    }

    // Helper to draw an organic willow/elm leaf shape
    const drawLeaf = (ctx, x, y, size, angle, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.moveTo(0, -size);
      // Left curve
      ctx.quadraticCurveTo(-size * 0.6, -size * 0.2, -size * 0.4, size * 0.4);
      ctx.quadraticCurveTo(-size * 0.2, size * 0.8, 0, size);
      // Right curve
      ctx.quadraticCurveTo(size * 0.2, size * 0.8, size * 0.4, size * 0.4);
      ctx.quadraticCurveTo(size * 0.6, -size * 0.2, 0, -size);
      ctx.closePath();

      ctx.fillStyle = color.fill;
      ctx.fill();

      ctx.strokeStyle = color.stroke;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Leaf central vein
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.8);
      ctx.lineTo(0, size * 0.85);
      ctx.stroke();

      ctx.restore();
    };

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      leaves.forEach((leaf) => {
        leaf.timeOffset += leaf.oscillationSpeed;
        const sway = Math.sin(leaf.timeOffset) * leaf.oscillationDist;
        leaf.x += leaf.speedX + sway;
        leaf.y += leaf.speedY;
        leaf.angle += leaf.angularSpeed + sway * 0.01;

        // Reset if leaf leaves the viewport
        if (leaf.y > height + 20) {
          leaf.y = -20;
          leaf.x = Math.random() * (width * 0.9);
        }
        if (leaf.x > width + 20) {
          leaf.x = -20;
          leaf.y = Math.random() * height * 0.5;
        }

        drawLeaf(ctx, leaf.x, leaf.y, leaf.size, leaf.angle, leaf.color);
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
      className="fixed inset-0 pointer-events-none z-[2] opacity-80"
      aria-hidden="true"
    />
  );
}
