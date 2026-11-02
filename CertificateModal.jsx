import React, { useEffect } from 'react';
import { X, ExternalLink, Award, Calendar, CheckCircle, ShieldCheck } from 'lucide-react';

export default function CertificateModal({ cert, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!cert) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#04140d] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.3)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glow Ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-gradient-to-r from-emerald-500 via-teal-400 to-purple-600 rounded-b-full shadow-[0_0_20px_#10b981]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-gray-300 hover:text-white hover:border-emerald-400 transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Image Preview */}
        <div className="relative rounded-2xl overflow-hidden border border-emerald-500/25 mb-6 group">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-52 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04140d] via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/70 border border-emerald-400/40 text-emerald-300 text-xs font-mono backdrop-blur-sm flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Credential
            </span>
          </div>
        </div>

        {/* Modal Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 mb-1">
            <Award className="w-4 h-4" />
            <span>{cert.issuer}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-gray-400">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              {cert.issueDate}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
            {cert.title}
          </h3>
        </div>

        {/* Credential ID */}
        <div className="p-2.5 rounded-xl bg-forest-900/60 border border-emerald-500/20 text-xs text-gray-300 font-mono mb-4 flex items-center justify-between">
          <span>Credential ID: <span className="text-emerald-300 font-bold">{cert.credentialId}</span></span>
          <span className="text-emerald-400">Aktif & Sah</span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-5">
          {cert.description}
        </p>

        {/* Skills Tagged */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Kompetensi yang Teruji:
          </p>
          <div className="flex flex-wrap gap-2">
            {cert.skills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/25 text-xs text-emerald-300"
              >
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-emerald-900/40">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Tutup
          </button>
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-400 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all transform hover:scale-105 active:scale-95"
          >
            <span>Verifikasi Lisensi</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
