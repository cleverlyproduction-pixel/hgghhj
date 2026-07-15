import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Sparkles, Flame, Tv, Activity, HelpCircle } from 'lucide-react';
import { playBounceSound } from './utils/sound';
import PresetExplorer from './components/PresetExplorer';
import MockWebsite from './components/MockWebsite';
import BounceSandbox from './components/BounceSandbox';

type MainTab = 'preset' | 'mock' | 'sandbox';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('preset');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [soundVolume, setSoundVolume] = useState<number>(0.25);

  const handleTabChange = (tab: MainTab) => {
    setActiveTab(tab);
    if (soundEnabled) {
      playBounceSound('swoosh', soundVolume * 0.8);
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      // Small delayed chirp to confirm on
      setTimeout(() => playBounceSound('pop', soundVolume), 100);
    }
  };

  // Splitting text for the crazy bouncy hover letters
  const logoPart1 = "BOUNCY".split("");
  const logoPart2 = "ASS".split("");
  const logoPart3 = "VIDEOS".split("");

  const letterBounce = {
    initial: { y: 0, scale: 1 },
    hover: {
      y: -22,
      scaleY: [1, 0.65, 1.35, 0.85, 1.05, 1],
      scaleX: [1, 1.45, 0.75, 1.15, 0.95, 1],
      transition: {
        type: "spring",
        stiffness: 450,
        damping: 7
      }
    }
  };

  return (
    <div className="min-h-screen text-slate-100 p-4 md:p-8 flex flex-col justify-between font-sans relative overflow-hidden bg-slate-950">
      
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/4 w-[450px] h-[450px] rounded-full bg-pink-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none"></div>

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col space-y-8 z-10">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-900">
          
          {/* Logo & Sub */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-1.5 mb-1 bg-slate-900/60 border border-slate-800/80 px-3 py-1 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" />
              <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Interactive Physics Playground</span>
            </div>

            {/* Hyper bouncy logo */}
            <h1 className="font-display font-black text-3xl md:text-5xl leading-none tracking-tight select-none cursor-default flex flex-wrap items-center justify-center md:justify-start gap-x-3.5 gap-y-1.5">
              
              {/* Word 1: BOUNCY */}
              <span className="flex text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-amber-500">
                {logoPart1.map((char, index) => (
                  <motion.span
                    key={`p1-${index}`}
                    variants={letterBounce}
                    whileHover="hover"
                    onHoverStart={() => soundEnabled && playBounceSound('pop', soundVolume * 0.4)}
                    className="inline-block transform origin-bottom"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>

              {/* Word 2: ASS */}
              <span className="flex text-white">
                {logoPart2.map((char, index) => (
                  <motion.span
                    key={`p2-${index}`}
                    variants={letterBounce}
                    whileHover="hover"
                    onHoverStart={() => soundEnabled && playBounceSound('rubber', soundVolume * 0.4)}
                    className="inline-block transform origin-bottom"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>

              {/* Word 3: VIDEOS */}
              <span className="flex text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">
                {logoPart3.map((char, index) => (
                  <motion.span
                    key={`p3-${index}`}
                    variants={letterBounce}
                    whileHover="hover"
                    onHoverStart={() => soundEnabled && playBounceSound('boing', soundVolume * 0.4)}
                    className="inline-block transform origin-bottom"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>
          </div>

          {/* Master sound dashboard */}
          <div className="flex items-center gap-4 bg-slate-900/80 border-2 border-slate-800 p-3.5 rounded-2xl shadow-md w-full max-w-[320px]">
            <button
              id="global-sound-toggle"
              onClick={toggleSound}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors focus:outline-none cursor-pointer ${
                soundEnabled 
                  ? 'bg-pink-500/10 text-pink-500 hover:bg-pink-500/20' 
                  : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
              }`}
              title={soundEnabled ? "Mute sound synthesis" : "Unmute sound synthesis"}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            
            <div className="flex-1 flex flex-col space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-slate-400 font-bold">
                <span>SYNTH AUDIO:</span>
                <span>{soundEnabled ? `${(soundVolume * 100).toFixed(0)}%` : 'MUTED'}</span>
              </div>
              <input
                id="global-volume-slider"
                type="range"
                min="0.05"
                max="0.8"
                step="0.05"
                disabled={!soundEnabled}
                value={soundVolume}
                onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
                className="w-full h-1.5 accent-pink-500 bg-slate-800 rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              />
            </div>
          </div>

        </header>

        {/* CORE APPLICATION DESCRIPTION */}
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 max-w-4xl">
          <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed">
            Welcome to the ultimate hub for high-energy spring animations and gelatinous transitions. Configure physics-based bounces, test them on elements, play in our physical collision arena, or toggle bouncy mode on a mock website. Simply copy the dynamically generated code to run beautiful, elastic animations on <span className="text-pink-400 font-bold">any website</span>!
          </p>
        </div>

        {/* MAIN NAVIGATION TABS */}
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800/80 w-fit max-w-full overflow-x-auto self-center">
          {[
            { id: 'preset', label: '🍮 Recipe Explorer & Exporter', icon: <Flame className="w-4 h-4" /> },
            { id: 'mock', label: '🌐 Mock Website', icon: <Tv className="w-4 h-4" /> },
            { id: 'sandbox', label: '🍑 Physics Sandbox', icon: <Activity className="w-4 h-4" /> }
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`main-nav-tab-${tab.id}`}
                onClick={() => handleTabChange(tab.id as MainTab)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap focus:outline-none ${
                  isSelected 
                    ? 'bg-slate-900 text-pink-500 shadow border border-slate-800/60' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ACTIVE MODULE CONTAINER */}
        <div className="flex-1 w-full">
          {activeTab === 'preset' && (
            <PresetExplorer soundEnabled={soundEnabled} soundVolume={soundVolume} />
          )}

          {activeTab === 'mock' && (
            <div className="space-y-6">
              <div className="max-w-xl">
                <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Elastic Integration Demo
                </span>
                <h3 className="text-white font-extrabold text-lg mt-2 mb-1">Interactive SaaS Demonstration</h3>
                <p className="text-slate-400 text-xs font-semibold">See exactly how rigid elements on any ordinary landing page react when fitted with organic spring curves.</p>
              </div>
              <MockWebsite soundEnabled={soundEnabled} soundVolume={soundVolume} />
            </div>
          )}

          {activeTab === 'sandbox' && (
            <div className="space-y-6">
              <div className="max-w-xl">
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Kinetic Physics Arena
                </span>
                <h3 className="text-white font-extrabold text-lg mt-2 mb-1">Continuous Gravity & Collision Sandbox</h3>
                <p className="text-slate-400 text-xs font-semibold">Toss, throw, and slam elastic video balls. Deform scales are calculated instantly depending on kinetic impact vectors.</p>
              </div>
              <BounceSandbox soundEnabled={soundEnabled} soundVolume={soundVolume} />
            </div>
          )}
        </div>

      </div>

      {/* HUMBLE SIMPLE FOOTER */}
      <footer className="w-full max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
        <div className="flex items-center gap-1.5">
          <span>🍑</span>
          <span className="font-extrabold text-slate-400">BOUNCY ASS VIDEOS</span>
          <span>— Unleash high-fidelity jelly loops.</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hover:text-pink-400 transition-colors">Spring Physics v1.12</span>
          <span>•</span>
          <span className="hover:text-amber-400 transition-colors">Web Audio Synthesis</span>
        </div>
      </footer>

    </div>
  );
}
