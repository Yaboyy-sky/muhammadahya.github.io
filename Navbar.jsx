import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Beranda' },
    { id: 'about', label: 'Tentang Saya' },
    { id: 'portfolio', label: 'Portofolio' },
    { id: 'contact', label: 'Kontak' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'about', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300">
      <nav
        className={`relative flex items-center justify-between px-6 py-2.5 rounded-full border transition-all duration-300 ${
          scrolled
            ? 'bg-[#04120c]/85 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.25)] backdrop-blur-xl'
            : 'bg-[#04120c]/60 border-emerald-500/25 shadow-[0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-lg'
        }`}
        style={{
          boxShadow: '0 0 25px -3px rgba(16, 185, 129, 0.2), 0 0 15px -2px rgba(139, 92, 246, 0.15)',
        }}
      >
        {/* Brand / Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2.5 group mr-6 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-purple-600 flex items-center justify-center p-[1px] shadow-[0_0_12px_rgba(16,185,129,0.5)]">
            <div className="w-full h-full bg-[#030d08] rounded-full flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
              <Sparkles className="w-4 h-4 text-emerald-400 group-hover:text-white transition-colors" />
            </div>
          </div>
          <span className="font-bold text-sm tracking-wider text-white group-hover:text-emerald-300 transition-colors whitespace-nowrap">
            Muhammad <span className="text-purple-400">Ahya</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 focus:outline-none ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-300 hover:text-emerald-300'
                }`}
              >
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/25 to-purple-600/30 border border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.3)] -z-10"
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action Button: Hire Me CTA */}
        <div className="hidden md:block ml-4">
          <button
            onClick={() => scrollToSection('contact')}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-400 hover:to-purple-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-950/40 transition-colors focus:outline-none ml-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-4 right-4 bg-[#030f0a]/95 border border-emerald-500/30 rounded-2xl p-4 shadow-[0_0_35px_rgba(16,185,129,0.3)] backdrop-blur-2xl transition-all duration-300 z-50">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-emerald-500/20 to-purple-600/25 border border-emerald-400/40 text-emerald-300'
                    : 'text-gray-300 hover:bg-emerald-900/20 hover:text-emerald-400'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full mt-2 py-2.5 rounded-xl text-center text-sm font-semibold bg-gradient-to-r from-emerald-500 to-purple-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.35)]"
            >
              Hubungi Sekarang
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
