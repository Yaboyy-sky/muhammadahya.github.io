import React, { useState, useEffect } from 'react';
import { ArrowDown, Code2, Sparkles, Send, Eye } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  const roles = personalInfo.roles;

  useEffect(() => {
    const handleTyping = () => {
      const fullText = roles[currentRoleIndex];

      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        setTypingSpeed(85);

        if (displayedText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
          setTypingSpeed(2000);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        setTypingSpeed(45);

        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(300);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, roles, typingSpeed]);

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 md:px-8 text-center overflow-hidden"
    >
      {/* Background Glow Orbs */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[650px] h-[350px] md:h-[650px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(139, 92, 246, 0.12) 40%, rgba(2, 10, 6, 0) 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Floating Availability Badge */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-forest-900/80 border border-emerald-500/30 text-emerald-300 text-xs md:text-sm font-medium mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-md">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span>{personalInfo.availability}</span>
        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
      </div>

      {/* Hero Big Name */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-4">
        <span className="block text-gray-200 text-lg sm:text-2xl md:text-3xl font-light mb-2 tracking-normal opacity-90">
          Hello World, Saya
        </span>
        <span className="aurora-gradient-text drop-shadow-[0_0_35px_rgba(16,185,129,0.35)]">
          {personalInfo.name}
        </span>
      </h1>

      {/* Animated Typing Title with Blinking Cursor */}
      <div className="h-12 md:h-16 flex items-center justify-center text-xl sm:text-3xl md:text-4xl font-semibold mb-6">
        <span className="text-gray-300 mr-2 sm:mr-3 font-normal">
          {personalInfo.rolePrefix}
        </span>
        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-purple-400 bg-clip-text text-transparent font-mono font-bold tracking-wide">
          {displayedText}
        </span>
        <span className="blinking-cursor h-7 md:h-10 ml-1.5 rounded-sm" />
      </div>

      {/* Subtitle / Bio description */}
      <p className="max-w-2xl text-gray-300/90 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-10 px-4">
        {personalInfo.bioShort}
      </p>

      {/* Glowing CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 z-10">
        <button
          onClick={scrollToPortfolio}
          className="group relative px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white overflow-hidden transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-purple-600 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-purple-500 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
          
          <span className="relative z-10 flex items-center gap-2 drop-shadow">
            <Eye className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
            Jelajahi Proyek
          </span>
        </button>

        <button
          onClick={scrollToContact}
          className="group relative px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-emerald-300 bg-[#05170f]/80 hover:bg-[#082216] border border-purple-500/40 hover:border-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:shadow-[0_0_30px_rgba(139,92,246,0.45)] backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
        >
          <span className="flex items-center gap-2 group-hover:text-purple-300 transition-colors">
            <Send className="w-4 h-4 text-purple-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            Hubungi Saya
          </span>
        </button>
      </div>

      {/* Quick Terminal Snippet decoration */}
      <div className="mt-14 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-black/40 border border-emerald-950/80 text-xs font-mono text-gray-400 backdrop-blur-sm">
        <Code2 className="w-4 h-4 text-emerald-400" />
        <span className="text-emerald-400">git commit</span> -m &quot;feat: ignite aurora portfolio&quot;
      </div>

      {/* Down Scroll Arrow Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
        <button
          onClick={() => {
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="p-2 rounded-full border border-emerald-500/20 text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/50 animate-bounce transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
