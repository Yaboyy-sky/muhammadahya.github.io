import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Sparkles, 
  Calendar, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';
import { 
  personalInfo, 
  educationHistory, 
  experienceHistory 
} from '../data/portfolioData';

// Animated Counter Sub-component
function AnimatedCounter({ endValue, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;
          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOutProgress * endValue));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(endValue);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [endValue, duration, hasAnimated]);

  return (
    <span ref={counterRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const [activeTab, setActiveTab] = useState('education');

  return (
    <section id="about" className="relative py-24 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium mb-3 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Mengenal Lebih Dekat</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Tentang <span className="aurora-gradient-text">Saya</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-purple-600 mx-auto mt-4 rounded-full" />
      </div>

      {/* Profile & Biography Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
        {/* Profile Picture with Circular Glowing Border */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 via-teal-400 to-purple-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-700 group-hover:duration-200 animate-pulse-glow" />
            
            <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-500 to-purple-600 shadow-[0_0_40px_rgba(16,185,129,0.35)]">
              <div className="p-1.5 bg-[#030d07] rounded-full">
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 object-cover rounded-full filter contrast-105 group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>

            {/* Specialization Badge */}
            <div className="absolute -bottom-2 right-2 px-4 py-2 rounded-2xl bg-[#04160e]/90 border border-emerald-400/40 shadow-[0_0_20px_rgba(16,185,129,0.3)] backdrop-blur-md flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Spesialisasi</p>
                <p className="text-xs font-bold text-emerald-300">{personalInfo.specializationBadge}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Content */}
        <div className="lg:col-span-7 space-y-5">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />
            
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2 flex-wrap">
              <span>{personalInfo.subTitle}</span>
              <span className="text-emerald-400 text-sm font-normal">● {personalInfo.location}</span>
            </h3>

            <div className="space-y-3 text-gray-300 text-sm sm:text-base leading-relaxed font-light">
              {personalInfo.fullBio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-emerald-900/40 flex flex-wrap gap-4 text-xs sm:text-sm text-gray-300">
              {personalInfo.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project Statistics with Animated Counter */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-24">
        {personalInfo.stats.map((stat, idx) => (
          <div
            key={idx}
            className="group relative glass-panel p-5 sm:p-6 rounded-2xl text-center hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-purple-400 bg-clip-text text-transparent mb-2">
              <AnimatedCounter endValue={stat.value} suffix={stat.suffix} />
            </div>
            <p className="text-xs sm:text-sm text-gray-300 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs for Education vs Experience */}
      <div className="mb-10 flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-[#04120c]/80 border border-emerald-500/25 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === 'education'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'text-gray-400 hover:text-emerald-300'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Riwayat Pendidikan</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === 'experience'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                : 'text-gray-400 hover:text-purple-300'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Pengalaman Kerja</span>
          </button>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="max-w-3xl mx-auto">
        {activeTab === 'education' && (
          <div className="relative border-l-2 border-emerald-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
            {educationHistory.map((item, index) => (
              <div key={index} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#030d08] border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.6)] group-hover:scale-125 transition-transform duration-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>

                <div className="glass-panel p-6 rounded-2xl hover:border-emerald-400/40 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                    <span className="text-xs font-semibold text-purple-300">
                      {item.gpa}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-white mb-1">
                    {item.degree}
                  </h4>
                  <p className="text-emerald-400 text-sm font-medium mb-3">
                    {item.institution}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    {item.description}
                  </p>
                  
                  {item.highlight && (
                    <div className="p-3 rounded-xl bg-forest-900/60 border border-emerald-500/20 text-xs text-emerald-200/90 font-mono">
                      ⭐ {item.highlight}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="relative border-l-2 border-purple-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
            {experienceHistory.map((item, index) => (
              <div key={index} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#030d08] border-2 border-purple-400 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.6)] group-hover:scale-125 transition-transform duration-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                </div>

                <div className="glass-panel p-6 rounded-2xl hover:border-purple-400/40 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 text-xs font-semibold border border-purple-500/30">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      {item.location}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-white mb-1">
                    {item.role}
                  </h4>
                  <p className="text-purple-300 text-sm font-medium mb-3">
                    {item.company}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-forest-900/70 border border-emerald-500/20 text-[11px] font-mono text-emerald-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
