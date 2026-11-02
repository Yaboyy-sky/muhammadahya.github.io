import React, { useState, useRef } from 'react';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-10 to 10 deg)
    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
    setSpotlightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
          isHovered ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)'
        }`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="relative rounded-3xl overflow-hidden bg-[#04130c]/90 border border-emerald-500/25 p-5 transition-shadow duration-300 group hover:border-emerald-400/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] flex flex-col justify-between"
    >
      {/* Dynamic Cursor Spotlight Effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 rounded-3xl"
          style={{
            background: `radial-gradient(circle 280px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(16, 185, 129, 0.18), rgba(139, 92, 246, 0.12), transparent 70%)`,
          }}
        />
      )}

      <div>
        {/* Project Image Banner */}
        <div className="relative rounded-2xl overflow-hidden aspect-video mb-5 border border-emerald-500/15">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04130c] via-transparent to-transparent opacity-70" />

          {/* Category Tag */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 backdrop-blur-md">
              {project.category}
            </span>
          </div>

          {project.featured && (
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-900/80 border border-purple-400/50 text-purple-200 backdrop-blur-md flex items-center gap-1 shadow-[0_0_12px_rgba(139,92,246,0.4)]">
                <Sparkles className="w-3 h-3 text-purple-300" />
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-5 font-light">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-emerald-950/50 border border-emerald-500/20 text-xs font-mono text-emerald-300/90"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-4 border-t border-emerald-900/30 flex items-center justify-between gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-forest-900/60 hover:bg-forest-800 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
        >
          <Github className="w-4 h-4 text-emerald-400" />
          <span>Source Code</span>
        </a>

        <a
          href={project.liveDemo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-400 hover:to-purple-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300"
        >
          <span>Live Demo</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
