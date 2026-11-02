import React, { useState } from 'react';
import { 
  FolderKanban, 
  Award, 
  Cpu, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  Eye, 
  Calendar,
  Layers
} from 'lucide-react';
import { 
  projectsData, 
  certificatesData, 
  techStackData 
} from '../data/portfolioData';
import ProjectCard from './ProjectCard';
import CertificateModal from './CertificateModal';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);

  const categories = ['All', 'Instrumentation', 'Electrical', 'Photo & Video Editing'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="portfolio" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium mb-3 backdrop-blur-sm">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span>Koleksi Karya & Keahlian</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Portofolio <span className="aurora-gradient-text">Eksplorasi</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-purple-600 mx-auto mt-4 rounded-full" />
      </div>

      {/* Main Interactive Tab Switcher */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1.5 rounded-2xl bg-[#04130c]/90 border border-emerald-500/25 shadow-[0_0_25px_rgba(16,185,129,0.15)] backdrop-blur-xl">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                : 'text-gray-400 hover:text-emerald-300'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Proyek ({projectsData.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === 'certificates'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                : 'text-gray-400 hover:text-purple-300'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Sertifikat ({certificatesData.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('techstack')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === 'techstack'
                ? 'bg-gradient-to-r from-emerald-600 to-purple-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : 'text-gray-400 hover:text-emerald-300'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Tech Stack</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PROJECTS */}
      {activeTab === 'projects' && (
        <div>
          {/* Subcategory Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                    : 'bg-forest-900/40 text-gray-400 border border-emerald-500/10 hover:text-emerald-300 hover:border-emerald-500/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project 3D Tilt Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CERTIFICATES */}
      {activeTab === 'certificates' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificatesData.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setActiveCertificate(cert)}
                className="group relative cursor-pointer glass-panel p-5 rounded-3xl border border-purple-500/25 hover:border-purple-400/60 shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-purple-500/20">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/90 text-white text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_15px_#10b981]">
                        <Eye className="w-3.5 h-3.5" />
                        Pratinjau Lisensi
                      </span>
                    </div>

                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-400/40 text-[11px] font-semibold text-purple-200 backdrop-blur-sm">
                        {cert.issuer}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Diterbitkan: {cert.issueDate}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-purple-900/30 flex items-center justify-between text-xs">
                  <span className="font-mono text-gray-400 truncate max-w-[150px]">
                    {cert.credentialId}
                  </span>
                  <span className="text-purple-400 font-semibold group-hover:underline flex items-center gap-1">
                    Detail <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {activeCertificate && (
            <CertificateModal
              cert={activeCertificate}
              onClose={() => setActiveCertificate(null)}
            />
          )}
        </div>
      )}

      {/* TAB 3: TECH STACK */}
      {activeTab === 'techstack' && (
        <div className="space-y-12">
          {techStackData.map((category, catIdx) => (
            <div key={catIdx} className="glass-panel p-6 sm:p-8 rounded-3xl">
              <h3 className="text-lg sm:text-xl font-bold text-emerald-300 mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{category.category}</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {category.items.map((tech, techIdx) => {
                  const isHovered = hoveredTech === `${catIdx}-${techIdx}`;
                  return (
                    <div
                      key={techIdx}
                      onMouseEnter={() => setHoveredTech(`${catIdx}-${techIdx}`)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className="relative group p-4 rounded-2xl bg-forest-900/60 border border-emerald-500/20 hover:border-emerald-400/60 transition-all duration-300 flex flex-col items-center text-center cursor-pointer hover:bg-forest-850 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                    >
                      <div className="text-3xl sm:text-4xl mb-3 transform group-hover:-translate-y-1.5 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)] animate-float-slow">
                        {tech.icon}
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                        {tech.name}
                      </h4>
                      <span className="text-[10px] font-mono text-emerald-400/90 font-medium">
                        {tech.level}
                      </span>

                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-52 sm:w-60 p-3 rounded-2xl bg-[#03110a] border border-emerald-400/60 shadow-[0_0_25px_rgba(16,185,129,0.4)] text-left z-30 pointer-events-none animate-fadeIn backdrop-blur-xl">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs text-white flex items-center gap-1.5">
                              <span>{tech.icon}</span>
                              {tech.name}
                            </span>
                            <span className="text-[10px] font-mono text-purple-300">
                              {tech.level}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-300 leading-snug">
                            {tech.desc}
                          </p>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-8 border-transparent border-t-[#03110a]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
