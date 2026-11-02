import React from 'react';
import AuroraCanvas from './components/AuroraCanvas';
import FallingLeaves from './components/FallingLeaves';
import FogEffect from './components/FogEffect';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#020a06] text-slate-100 overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Dynamic Atmospheric Background Layers */}
      <AuroraCanvas />
      <FallingLeaves />
      <FogEffect />

      {/* Floating Centered Glassmorphism Navbar */}
      <Navbar />

      {/* Main Page Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
