import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, Copy, Check, Sparkles, Volume2, HelpCircle, RefreshCw, Layers, Monitor, PlayCircle, Search, Filter, Info, Eye } from 'lucide-react';
import { BOUNCY_PRESETS, generateCodeBlocks } from '../utils/presets';
import { playBounceSound } from '../utils/sound';
import { AnimationPreset, PhysicsParams, AnimationCategory } from '../types';

interface PresetExplorerProps {
  soundEnabled: boolean;
  soundVolume: number;
}

type PreviewTarget = 'video' | 'button' | 'shape' | 'text';
type CodeTab = 'framer' | 'tailwind' | 'css';

export default function PresetExplorer({ soundEnabled, soundVolume }: PresetExplorerProps) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('booty-bounce');
  
  // Custom interactive sliders
  const [stiffness, setStiffness] = useState<number>(320);
  const [damping, setDamping] = useState<number>(10);
  const [mass, setMass] = useState<number>(1.4);
  const [scaleSquish, setScaleSquish] = useState<number>(1.2);
  
  const [previewTarget, setPreviewTarget] = useState<PreviewTarget>('video');
  const [codeTab, setCodeTab] = useState<CodeTab>('framer');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [triggerKey, setTriggerKey] = useState<number>(0);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Retrieve active preset settings
  const activePreset = BOUNCY_PRESETS.find(p => p.id === selectedPresetId) || BOUNCY_PRESETS[0];

  // Sync sliders when preset changes
  useEffect(() => {
    setStiffness(activePreset.stiffness);
    setDamping(activePreset.damping);
    setMass(activePreset.mass);
    setScaleSquish(1.0); // Reset squish multiplier to native preset bounciness
    retriggerAnimation(true);
  }, [selectedPresetId]);

  const retriggerAnimation = (isPresetChange: boolean = false) => {
    setTriggerKey(prev => prev + 1);
    
    // Play custom synthesis sounds
    if (soundEnabled) {
      if (isPresetChange) {
        playBounceSound('swoosh', soundVolume * 0.8);
      } else {
        // Play appropriate synthesizer tone based on active preset characteristics
        if (activePreset.id.includes('twerk') || activePreset.id.includes('jitter')) {
          playBounceSound('pop', soundVolume * 0.9);
        } else if (activePreset.id.includes('jelly') || activePreset.id.includes('custard')) {
          playBounceSound('rubber', soundVolume * 0.85);
        } else if (activePreset.id.includes('slam') || activePreset.id.includes('splat')) {
          playBounceSound('splat', soundVolume * 1.0);
        } else {
          playBounceSound('boing', soundVolume * 0.95);
        }
      }
    }
  };

  // Compute live code blocks
  const params: PhysicsParams = {
    stiffness,
    damping,
    mass,
    scaleSquish,
    duration: 0.8,
    isSpring: true
  };
  const codeBlocks = generateCodeBlocks(activePreset.name, params, activePreset.id);

  const handleCopyCode = () => {
    const textToCopy = 
      codeTab === 'framer' ? codeBlocks.framerMotion :
      codeTab === 'tailwind' ? codeBlocks.tailwind :
      codeBlocks.css;

    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    if (soundEnabled) playBounceSound('pop', soundVolume * 0.8);
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  // Filter & Search the 50 animations
  const filteredPresets = BOUNCY_PRESETS.filter(preset => {
    const matchesSearch = 
      preset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preset.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All' || preset.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div id="preset-explorer-root" className="space-y-12">
      
      {/* ========================================================
          1. MASTER TUNING LAB (Top Section Split Layout)
          ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* A. STAGE PANEL (Left 7-columns) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse"></span>
              <h3 className="font-display font-black text-xs uppercase text-slate-400 tracking-widest">
                Active Playground: {activePreset.name}
              </h3>
            </div>
            
            <div className="text-[10px] font-mono text-slate-500 bg-slate-900/80 px-2.5 py-1 border border-slate-800/80 rounded-md">
              PRESET ENGINE <span className="text-pink-400 font-bold">READY</span>
            </div>
          </div>

          <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            {/* Stage Header/Selectors */}
            <div className="bg-slate-950/80 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/60">
              <div className="flex items-center space-x-3">
                <Monitor className="w-4 h-4 text-pink-500" />
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">SHELL SPEC:</span>
                <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800/80 gap-1">
                  {(['video', 'button', 'shape', 'text'] as PreviewTarget[]).map((t) => (
                    <button
                      key={t}
                      id={`preview-target-${t}`}
                      onClick={() => {
                        setPreviewTarget(t);
                        if (soundEnabled) playBounceSound('pop', soundVolume * 0.7);
                      }}
                      className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-colors duration-200 cursor-pointer focus:outline-none ${
                        previewTarget === t 
                          ? 'bg-slate-800 text-pink-400 shadow' 
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                id="retrigger-stage-btn"
                onClick={() => retriggerAnimation()}
                className="flex items-center gap-1.5 bg-slate-850 hover:bg-slate-800 text-white font-extrabold text-[10px] px-3.5 py-2 rounded-xl border border-slate-750 cursor-pointer active:scale-95 transition-all"
              >
                <RefreshCw className="w-3 h-3 text-pink-400 animate-spin-slow" />
                RE-BOUNCE
              </button>
            </div>

            {/* Master Stage Box */}
            <div className="h-[300px] bg-slate-950 flex items-center justify-center relative overflow-hidden p-8 border-b border-slate-850">
              {/* Decorative Tech BG */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              {/* Focus Ring indicators */}
              <div className="absolute inset-12 border border-slate-900/40 rounded-2xl pointer-events-none"></div>
              <div className="absolute inset-24 border border-dashed border-slate-900/30 rounded-full pointer-events-none"></div>

              {/* Central Bouncing Entity */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${triggerKey}-${previewTarget}-${selectedPresetId}`}
                  initial={{ 
                    scaleX: activePreset.scaleX[0] ? 1 + (activePreset.scaleX[0] - 1) * scaleSquish : 1, 
                    scaleY: activePreset.scaleY[0] ? 1 + (activePreset.scaleY[0] - 1) * scaleSquish : 1,
                    y: activePreset.y ? activePreset.y[0] * scaleSquish : 0,
                    rotate: activePreset.rotate ? activePreset.rotate[0] * scaleSquish : 0
                  }}
                  animate={{
                    scaleX: activePreset.scaleX.map(v => 1 + (v - 1) * scaleSquish),
                    scaleY: activePreset.scaleY.map(v => 1 + (v - 1) * scaleSquish),
                    y: activePreset.y ? activePreset.y.map(v => v * scaleSquish) : [0],
                    rotate: activePreset.rotate ? activePreset.rotate.map(v => v * scaleSquish) : [0],
                  }}
                  transition={{
                    type: "spring",
                    stiffness: stiffness,
                    damping: damping,
                    mass: mass,
                    duration: (mass * 1.0).toFixed(2),
                    ease: "easeOut"
                  }}
                  className="transform origin-bottom cursor-pointer select-none z-10"
                  onClick={() => retriggerAnimation()}
                >
                  {previewTarget === 'video' && (
                    <div className="w-[200px] aspect-video bg-slate-900 border-4 border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl relative flex items-center justify-center group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-purple-500/10 to-amber-500/20"></div>
                      <div className="flex flex-col items-center space-y-1.5 z-10 text-center">
                        <PlayCircle className="w-11 h-11 text-white fill-pink-500/30 group-hover:scale-115 transition-transform duration-300" />
                        <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest font-bold">🍑 bouncy_ass_video.mp4</span>
                      </div>
                    </div>
                  )}

                  {previewTarget === 'button' && (
                    <button className="bg-gradient-to-r from-pink-500 to-amber-500 text-white font-extrabold text-xs px-7 py-4 rounded-2xl shadow-xl border-2 border-pink-400/60 pointer-events-none tracking-wider">
                      🍑 TWERK SPRING
                    </button>
                  )}

                  {previewTarget === 'shape' && (
                    <div className="w-24 h-24 bg-gradient-to-tr from-pink-500 to-rose-600 rounded-3xl shadow-2xl shadow-pink-500/20 flex items-center justify-center text-4xl border-2 border-white/20">
                      🍮
                    </div>
                  )}

                  {previewTarget === 'text' && (
                    <div className="text-center">
                      <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 leading-none tracking-tight">
                        BOUNCY_ASS
                      </h2>
                      <span className="text-[9px] font-mono tracking-widest text-pink-500/70 uppercase font-black block mt-2">
                        {activePreset.name.toUpperCase()}
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Status footer labels */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Transform Anchor: <strong className="text-slate-400">bottom</strong></span>
                <span>Type: <strong className="text-pink-400 uppercase">{activePreset.category}</strong></span>
                <span>Amplifier: <strong className="text-amber-400">{scaleSquish.toFixed(2)}x</strong></span>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="bg-slate-900/70 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold text-slate-300">
              
              <div className="flex flex-col space-y-2 bg-slate-950/30 p-3 rounded-xl border border-slate-800/40">
                <div className="flex justify-between">
                  <span className="text-slate-400">Elastic Stiffness (stiffness)</span>
                  <span className="font-mono text-pink-400 font-bold">{stiffness}</span>
                </div>
                <input
                  id="stiffness-slider"
                  type="range"
                  min="50"
                  max="800"
                  step="10"
                  value={stiffness}
                  onChange={(e) => {
                    setStiffness(parseInt(e.target.value));
                    retriggerAnimation();
                  }}
                  className="w-full accent-pink-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex flex-col space-y-2 bg-slate-950/30 p-3 rounded-xl border border-slate-800/40">
                <div className="flex justify-between">
                  <span className="text-slate-400">Frictional Damping (damping)</span>
                  <span className="font-mono text-emerald-400 font-bold">{damping}</span>
                </div>
                <input
                  id="damping-slider"
                  type="range"
                  min="2"
                  max="50"
                  step="1"
                  value={damping}
                  onChange={(e) => {
                    setDamping(parseInt(e.target.value));
                    retriggerAnimation();
                  }}
                  className="w-full accent-emerald-400 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex flex-col space-y-2 bg-slate-950/30 p-3 rounded-xl border border-slate-800/40">
                <div className="flex justify-between">
                  <span className="text-slate-400">Inertial Mass (mass)</span>
                  <span className="font-mono text-purple-400 font-bold">{mass.toFixed(2)}</span>
                </div>
                <input
                  id="mass-slider"
                  type="range"
                  min="0.2"
                  max="4.0"
                  step="0.1"
                  value={mass}
                  onChange={(e) => {
                    setMass(parseFloat(e.target.value));
                    retriggerAnimation();
                  }}
                  className="w-full accent-purple-400 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex flex-col space-y-2 bg-slate-950/30 p-3 rounded-xl border border-slate-800/40">
                <div className="flex justify-between">
                  <span className="text-slate-400">Squish Scale Intensity</span>
                  <span className="font-mono text-amber-400 font-bold">{scaleSquish.toFixed(2)}x</span>
                </div>
                <input
                  id="squish-intensity-slider"
                  type="range"
                  min="0.1"
                  max="3.0"
                  step="0.1"
                  value={scaleSquish}
                  onChange={(e) => {
                    setScaleSquish(parseFloat(e.target.value));
                    retriggerAnimation();
                  }}
                  className="w-full accent-amber-400 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

            </div>
          </div>
        </div>

        {/* B. EXPORTER PANEL (Right 5-columns) */}
        <div className="lg:col-span-5 flex flex-col space-y-4 h-full">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-pink-500" />
            <h3 className="font-display font-black text-xs uppercase text-slate-400 tracking-widest">
              Live CSS/JS Generation
            </h3>
          </div>

          <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-full">
            {/* Tabs Selector */}
            <div className="bg-slate-950/80 px-5 py-4 flex items-center justify-between border-b border-slate-800/60">
              <div className="flex space-x-3.5">
                {[
                  { id: 'framer', label: 'Framer Motion' },
                  { id: 'tailwind', label: 'Tailwind' },
                  { id: 'css', label: 'Vanilla CSS' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    id={`code-tab-toggle-${tab.id}`}
                    onClick={() => {
                      setCodeTab(tab.id as CodeTab);
                      if (soundEnabled) playBounceSound('pop', soundVolume * 0.7);
                    }}
                    className={`text-[10px] font-black uppercase tracking-wider pb-1 transition-colors relative cursor-pointer focus:outline-none ${
                      codeTab === tab.id ? 'text-pink-400 font-bold' : 'text-slate-500 hover:text-slate-350'
                    }`}
                  >
                    {tab.label}
                    {codeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-pink-500"
                      />
                    )}
                  </button>
                ))}
              </div>

              <button
                id="copy-code-btn"
                onClick={handleCopyCode}
                className={`flex items-center gap-1 font-extrabold text-[10px] px-3.5 py-1.5 rounded-lg cursor-pointer transition-all ${
                  isCopied 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-pink-400" />}
                {isCopied ? 'COPIED!' : 'COPY'}
              </button>
            </div>

            {/* Code Field */}
            <div className="p-5 bg-slate-950 font-mono text-[11px] text-slate-300 leading-relaxed overflow-y-auto flex-1 h-[320px]">
              <pre className="text-left select-text whitespace-pre-wrap">
                {codeTab === 'framer' && codeBlocks.framerMotion}
                {codeTab === 'tailwind' && codeBlocks.tailwind}
                {codeTab === 'css' && codeBlocks.css}
              </pre>
            </div>

            {/* Micro instructions */}
            <div className="bg-slate-900 border-t border-slate-850 p-4 flex items-start gap-2 text-[10px] font-mono text-slate-500">
              <Info className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
              <span>Copy and paste this production-ready code directly into your layout. Animations are normalized to anchor at the element bottom for optimal organic physics.</span>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================
          2. THE BOUNCY 50: INTERACTIVE DIRECTORY GRID (Bottom Section)
          ======================================================== */}
      <div className="pt-6 border-t border-slate-900">
        
        {/* Gallery Header, Filters & Search */}
        <div className="flex flex-col space-y-6 mb-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-pink-500 to-amber-500 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Experimental Archive
                </span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">
                  50 / 50 ACTIVE RECIPES
                </span>
              </div>
              <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight">
                THE BOUNCY 50 DIRECTORY
              </h2>
              <p className="text-slate-400 text-xs font-semibold max-w-2xl">
                Hover any card below to preview its custom spring trajectory instantly. Click to select, tune, and download its production source code.
              </p>
            </div>

            {/* Active search bar with icon */}
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 50 bouncy presets..."
                className="w-full bg-slate-900 border border-slate-800 text-slate-200 pl-10 pr-4 py-2 rounded-2xl text-xs font-semibold focus:outline-none focus:border-pink-500/80 focus:ring-1 focus:ring-pink-500/40 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* Category Filtering Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-900/60">
            <span className="text-[10px] font-mono text-slate-500 font-black uppercase mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter Category:
            </span>
            {['All', 'Entrance', 'Hover', 'Attention', 'Loop'].map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    if (soundEnabled) playBounceSound('pop', soundVolume * 0.6);
                  }}
                  className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-pink-500/15 text-pink-400 border border-pink-500/40' 
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {cat === 'Entrance' ? '💥 ' : cat === 'Hover' ? '🍮 ' : cat === 'Attention' ? '⚡ ' : cat === 'Loop' ? '🌀 ' : ''}
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* The 50 Grid items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPresets.map((preset, index) => {
            // Find global index among all 50 presets to stamp #01 - #50
            const globalIndex = BOUNCY_PRESETS.findIndex(p => p.id === preset.id) + 1;
            const formattedIndex = globalIndex < 10 ? `0${globalIndex}` : `${globalIndex}`;
            const isSelected = preset.id === selectedPresetId;

            // Get category styling variables
            const catBadgeStyle = 
              preset.category === 'Entrance' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
              preset.category === 'Attention' ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' :
              preset.category === 'Loop' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
              'bg-amber-500/10 text-amber-400 border-amber-500/20';

            return (
              <motion.button
                key={preset.id}
                id={`preset-card-${preset.id}`}
                onClick={() => setSelectedPresetId(preset.id)}
                
                // --- HOVER ANIMATION USING INDIVIDUAL PRESET KEYFRAMES ---
                whileHover={{
                  scaleX: preset.scaleX,
                  scaleY: preset.scaleY,
                  y: preset.y ? preset.y.map(val => val * 0.4) : [0], // Slightly scaled down y translation for card safety
                  rotate: preset.rotate ? preset.rotate.map(val => val * 0.4) : [0],
                  transition: {
                    duration: 0.8,
                    ease: "easeOut"
                  }
                }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => {
                  if (soundEnabled) {
                    playBounceSound('pop', soundVolume * 0.2); // Subtle background pop indicator on hover
                  }
                }}

                className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                  isSelected
                    ? 'bg-gradient-to-br from-pink-500/10 to-amber-500/10 border-pink-500/90 shadow-xl shadow-pink-500/5'
                    : 'bg-slate-900 border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/60'
                }`}
              >
                {/* Micro Ambient Glow behind selected card */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl pointer-events-none"></div>
                )}

                {/* Card Top Information Bar */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-mono font-black text-slate-500 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800/60">
                      #{formattedIndex}
                    </span>
                    <span className={`text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full border ${catBadgeStyle}`}>
                      {preset.category}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1">
                    {isSelected ? (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono text-slate-600 font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        VIEW
                      </span>
                    )}
                  </div>
                </div>

                {/* Preset Title & Description */}
                <h4 className="font-display font-black text-white text-sm mb-2 group-hover:text-pink-400 transition-colors">
                  {preset.name}
                </h4>
                <p className="text-slate-400 text-[11px] font-medium leading-relaxed mb-4 line-clamp-2">
                  {preset.description}
                </p>

                {/* Live Physics Parameters Badge Overlay */}
                <div className="grid grid-cols-3 gap-1.5 text-[8px] font-mono font-black text-slate-500 mt-auto pt-2 border-t border-slate-950/40">
                  <div className="bg-slate-950/40 p-1.5 rounded-md text-center border border-slate-850/40">
                    STF: <span className="text-pink-400/90">{preset.stiffness}</span>
                  </div>
                  <div className="bg-slate-950/40 p-1.5 rounded-md text-center border border-slate-850/40">
                    DMP: <span className="text-emerald-400/90">{preset.damping}</span>
                  </div>
                  <div className="bg-slate-950/40 p-1.5 rounded-md text-center border border-slate-850/40">
                    MSS: <span className="text-purple-400/90">{preset.mass}</span>
                  </div>
                </div>
              </motion.button>
            );
          })}

          {/* Empty State */}
          {filteredPresets.length === 0 && (
            <div className="col-span-full py-12 text-center bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
              <p className="text-slate-500 text-xs font-semibold">No active spring recipes match "{searchQuery}"</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-3 text-pink-400 text-xs font-bold hover:underline"
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
