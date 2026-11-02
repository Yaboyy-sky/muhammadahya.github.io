import React from 'react';

export default function FogEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-60">
      {/* Fog Layer 1: Drifting slowly to the left */}
      <div 
        className="absolute -bottom-10 left-[-50%] w-[200%] h-[55vh] animate-fog-1"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(16, 185, 129, 0.08) 0%, rgba(6, 78, 59, 0.06) 35%, rgba(2, 10, 6, 0) 70%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Fog Layer 2: Counter drifting with purple aura hue */}
      <div 
        className="absolute bottom-10 left-[-30%] w-[180%] h-[45vh] animate-fog-2"
        style={{
          background: 'radial-gradient(ellipse at 60% 80%, rgba(139, 92, 246, 0.07) 0%, rgba(4, 25, 18, 0.05) 45%, rgba(2, 10, 6, 0) 75%)',
          filter: 'blur(55px)',
        }}
      />

      {/* Fog Layer 3: High-altitude atmospheric haze */}
      <div 
        className="absolute top-1/4 left-0 w-full h-[35vh] opacity-40"
        style={{
          background: 'linear-gradient(180deg, rgba(2, 10, 6, 0) 0%, rgba(16, 185, 129, 0.04) 50%, rgba(2, 10, 6, 0) 100%)',
          filter: 'blur(30px)',
        }}
      />
    </div>
  );
}
