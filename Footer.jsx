import React from 'react';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 border-t border-emerald-900/30 bg-[#020a06]/90 backdrop-blur-md">
      {/* Top Glowing Aurora Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-75 shadow-[0_0_15px_#10b981]" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="font-extrabold text-base tracking-wider uppercase aurora-gradient-text">
              {personalInfo.name}
            </span>
          </div>
          <p className="text-xs text-gray-400 max-w-sm">
            Website portofolio interaktif bertema hutan gelap & aurora digital. Dibuat dengan presisi visual dan performa modern.
          </p>
        </div>

        {/* Custom Tagline */}
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-300/90 bg-emerald-950/40 border border-emerald-500/25 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <span>Berkarya dengan Logika, Berinovasi dengan Kreativitas</span>
          <span className="text-purple-400">✨</span>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-900/70 border border-emerald-500/20 text-xs font-semibold text-emerald-300 hover:text-white hover:border-emerald-400/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
        >
          <span>Kembali ke Atas</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      <div className="border-t border-emerald-950/60 py-4 text-center text-[11px] text-gray-500">
        © {new Date().getFullYear()} {personalInfo.name}. Seluruh Hak Cipta Dilindungi.
      </div>
    </footer>
  );
}
