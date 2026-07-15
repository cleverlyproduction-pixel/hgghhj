import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Volume2, Sparkles, Layout, Flame, HelpCircle, ArrowRight, MousePointer, ShieldAlert } from 'lucide-react';
import { playBounceSound } from '../utils/sound';

interface MockWebsiteProps {
  soundEnabled: boolean;
  soundVolume: number;
}

export default function MockWebsite({ soundEnabled, soundVolume }: MockWebsiteProps) {
  const [bouncyMode, setBouncyMode] = useState<boolean>(true);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [clicks, setClicks] = useState<number>(0);

  const handleInteraction = (soundType: 'pop' | 'boing' | 'splat' | 'rubber' | 'swoosh') => {
    if (bouncyMode && soundEnabled) {
      playBounceSound(soundType, soundVolume);
    }
  };

  // Helper for conditional spring animations
  const springHover = bouncyMode
    ? {
        scaleX: [1, 1.25, 0.85, 1.1, 0.95, 1.02, 1],
        scaleY: [1, 0.75, 1.15, 0.9, 1.05, 0.98, 1],
        transition: { duration: 0.6, ease: "easeOut" }
      }
    : { scale: 1.03 };

  const jellyHover = bouncyMode
    ? {
        scaleX: [1, 1.3, 0.75, 1.15, 0.9, 1.05, 1],
        scaleY: [1, 0.75, 1.25, 0.85, 1.1, 0.95, 1],
        rotate: [0, -4, 4, -2, 1, 0],
        transition: { duration: 0.5 }
      }
    : { scale: 1.05 };

  const shakeHover = bouncyMode
    ? {
        x: [0, -8, 8, -6, 6, -3, 3, 0],
        rotate: [0, -3, 3, -2, 2, 0],
        transition: { duration: 0.4 }
      }
    : { y: -2 };

  const popClick = bouncyMode
    ? {
        scale: [1, 1.45, 0.85, 1.12, 0.96, 1.02, 1],
        transition: { duration: 0.5, ease: "easeOut" }
      }
    : { scale: 0.95 };

  return (
    <div id="mock-website-container" className="w-full bg-slate-900 rounded-3xl border-4 border-slate-700/80 shadow-2xl overflow-hidden relative">
      {/* Browser Bar */}
      <div className="bg-slate-800/95 px-6 py-4 flex items-center justify-between border-b-2 border-slate-700/80">
        <div className="flex items-center space-x-2">
          <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-md"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-md"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-md"></div>
        </div>
        
        {/* Address bar */}
        <div className="w-1/2 max-w-md bg-slate-950/70 text-slate-400 text-xs py-2 px-4 rounded-xl font-mono text-center truncate border border-slate-700/50 flex items-center justify-center space-x-2">
          <span className="text-emerald-400 font-bold">https://</span>
          <span>your-boring-saas.com</span>
          <span className="text-pink-400 font-bold">?mode={bouncyMode ? 'bouncy_ass' : 'boring'}</span>
        </div>

        {/* Bouncy Mode Toggle Switch */}
        <div className="flex items-center space-x-3 bg-slate-950/40 px-3.5 py-1.5 rounded-2xl border border-slate-700/40">
          <span className={`text-[11px] font-bold tracking-wider uppercase transition-colors duration-200 ${bouncyMode ? 'text-pink-400 animate-pulse' : 'text-slate-400'}`}>
            {bouncyMode ? '🍑 Bouncy Mode ON' : '💤 Boring Mode'}
          </span>
          <button
            id="bouncy-mode-toggle"
            onClick={() => {
              setBouncyMode(!bouncyMode);
              if (soundEnabled) playBounceSound(bouncyMode ? 'rubber' : 'boing', soundVolume);
            }}
            className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 relative focus:outline-none ${bouncyMode ? 'bg-gradient-to-r from-pink-500 to-amber-500' : 'bg-slate-600'}`}
          >
            <motion.div
              layout
              className="w-5 h-5 rounded-full bg-white shadow-md"
              animate={{ x: bouncyMode ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
            />
          </button>
        </div>
      </div>

      {/* Main Website Viewport */}
      <div className="bg-white text-slate-800 p-8 min-h-[500px] max-h-[600px] overflow-y-auto relative selection:bg-pink-100 selection:text-pink-600">
        
        {/* Bouncy floating stickers if bouncyMode is ON */}
        <AnimatePresence>
          {bouncyMode && (
            <>
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: -12 }}
                exit={{ scale: 0 }}
                whileHover={{ scale: 1.25, rotate: 15 }}
                onClick={() => handleInteraction('boing')}
                className="absolute top-16 left-6 z-10 cursor-pointer bg-amber-400 text-slate-900 px-3 py-1.5 rounded-full font-black text-xs uppercase tracking-wider shadow-lg border-2 border-slate-900 select-none transform origin-center"
              >
                💦 SPLATTY!
              </motion.div>
              <motion.div
                initial={{ scale: 0, rotate: 45 }}
                animate={{ scale: 1, rotate: 15 }}
                exit={{ scale: 0 }}
                whileHover={{ scale: 1.3, rotate: -15 }}
                onClick={() => handleInteraction('splat')}
                className="absolute top-28 right-12 z-10 cursor-pointer bg-pink-500 text-white px-3 py-1.5 rounded-full font-black text-xs uppercase tracking-wider shadow-lg border-2 border-slate-900 select-none transform origin-center"
              >
                🔥 TWERK IT!
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Website Header */}
        <header className="flex items-center justify-between border-b border-slate-100 pb-5 mb-8">
          <div className="flex items-center space-x-2">
            <motion.div
              animate={bouncyMode ? {
                scale: [1, 1.2, 0.9, 1.1, 1],
                rotate: [0, 10, -10, 5, 0],
              } : {}}
              transition={{ repeat: Infinity, repeatDelay: 4, duration: 1 }}
              className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-amber-500 flex items-center justify-center text-white font-black text-sm"
            >
              S
            </motion.div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900">SaaSyGlobal</span>
          </div>

          <nav className="hidden md:flex space-x-6 text-sm font-semibold text-slate-600">
            {['Solutions', 'Pricing', 'Bouncy Docs', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href="#"
                id={`nav-link-${i}`}
                whileHover={jellyHover}
                onHoverStart={() => handleInteraction('pop')}
                className="hover:text-pink-500 transition-colors duration-150 py-1 inline-block transform origin-bottom"
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <motion.button
            id="navbar-cta-btn"
            whileHover={springHover}
            whileTap={popClick}
            onHoverStart={() => handleInteraction('swoosh')}
            onClick={() => {
              handleInteraction('boing');
              setClicks(c => c + 1);
            }}
            className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-md transform origin-bottom"
          >
            Get Started
          </motion.button>
        </header>

        {/* Hero Section */}
        <main className="text-center max-w-2xl mx-auto py-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="mb-4"
          >
            <span className="bg-pink-50 text-pink-600 text-[10px] uppercase font-black tracking-widest px-3.5 py-1.5 rounded-full border border-pink-100 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-pink-500" />
              Revolutionizing cloud vectors
            </span>
          </motion.div>

          <motion.h1 
            id="hero-main-title"
            animate={bouncyMode ? {
              scale: [1, 1.03, 0.97, 1.01, 1],
              y: [0, -5, 3, -1, 0],
            } : {}}
            transition={{ repeat: Infinity, repeatDelay: 5, duration: 1.2 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 transform origin-center"
          >
            The Cloud Platform That <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500">
              Actually Springs To Life!
            </span>
          </motion.h1>

          <p className="text-slate-500 text-base max-w-lg mx-auto mb-8 leading-relaxed font-medium">
            Stop deploying rigid, lifeless corporate templates. Make your users smile with high-velocity, organic elastic animations and juicy spring physics.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <motion.button
              id="hero-bouncy-cta"
              whileHover={springHover}
              whileTap={popClick}
              onHoverStart={() => handleInteraction('swoosh')}
              onClick={() => {
                handleInteraction('boing');
                setClicks(c => c + 1);
              }}
              className="bg-gradient-to-r from-pink-500 to-amber-500 text-white font-extrabold text-sm px-7 py-4 rounded-2xl shadow-xl shadow-pink-500/20 hover:brightness-105 transition-all flex items-center gap-2 transform origin-bottom"
            >
              Unlock Bouncy Superpower
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              id="hero-secondary-cta"
              whileHover={jellyHover}
              whileTap={popClick}
              onHoverStart={() => handleInteraction('pop')}
              onClick={() => {
                handleInteraction('rubber');
                setClicks(c => c + 1);
              }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm px-7 py-4 rounded-2xl transition-all transform origin-center"
            >
              Explore Elastic Presets
            </motion.button>
          </div>

          {/* Interactive video element section */}
          <div className="mb-14">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3.5 flex items-center justify-center gap-1">
              <Play className="w-3.5 h-3.5 fill-current" />
              Demo Showcase (Bouncy-Ass Video Player)
            </p>
            
            <motion.div
              id="mock-video-player"
              whileHover={springHover}
              onHoverStart={() => handleInteraction('rubber')}
              onClick={() => {
                setIsPlayingVideo(!isPlayingVideo);
                handleInteraction(isPlayingVideo ? 'rubber' : 'boing');
              }}
              className="aspect-video w-full max-w-lg mx-auto bg-slate-950 rounded-2xl border-4 border-slate-900 shadow-xl relative overflow-hidden group cursor-pointer transform origin-bottom"
            >
              {/* Dynamic decorative backdrop circles */}
              <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-pink-500/10 blur-xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-amber-500/10 blur-xl"></div>

              {/* Video Content Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <AnimatePresence mode="wait">
                  {!isPlayingVideo ? (
                    <motion.div
                      key="play-overlay"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex flex-col items-center space-y-3"
                    >
                      <div className="w-16 h-16 rounded-full bg-white text-pink-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-200">
                        <Play className="w-8 h-8 fill-current ml-1" />
                      </div>
                      <span className="text-white text-xs font-black uppercase tracking-wider bg-slate-900/60 backdrop-blur-sm py-1 px-3.5 rounded-full border border-white/10">
                        Click to Wobble & Play Video
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="playing-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[10px] bg-emerald-500 text-white font-bold px-2.5 py-1 rounded-md animate-pulse">
                          ● LIVE STREAMING PRESETS
                        </span>
                        <Volume2 className="w-4 h-4 text-white/80" />
                      </div>

                      {/* Equalizer animation */}
                      <div className="flex items-center justify-center space-x-1 h-12">
                        {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                          <motion.div
                            key={bar}
                            animate={{
                              height: bouncyMode 
                                ? [12, Math.random() * 40 + 10, 12]
                                : [12, Math.random() * 20 + 5, 12]
                            }}
                            transition={{
                              duration: bouncyMode ? 0.4 + bar * 0.1 : 0.8 + bar * 0.1,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="w-1.5 bg-gradient-to-t from-pink-500 to-amber-400 rounded-full"
                          />
                        ))}
                      </div>

                      <div className="text-left text-white/90 text-[11px] font-mono bg-slate-900/80 p-2.5 rounded-lg border border-white/10 flex items-center justify-between">
                        <span>bouncy-ass-transitions.mp4</span>
                        <span className="text-pink-400">Click to pause</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Cards section demonstrating layout animations */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-left mb-8">
            {[
              {
                icon: <Layout className="w-5 h-5 text-pink-500" />,
                title: 'Spring Cards',
                desc: 'Cards swell and squish organically instead of rigid hovering.'
              },
              {
                icon: <Flame className="w-5 h-5 text-amber-500" />,
                title: 'Satisfying sound',
                desc: 'Synfiliated sound effects perfectly coupled to physics.'
              },
              {
                icon: <HelpCircle className="w-5 h-5 text-purple-500" />,
                title: 'Any HTML node',
                desc: 'Works with lists, images, text blocks, triggers and inputs.'
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                id={`feature-card-${idx}`}
                whileHover={shakeHover}
                onHoverStart={() => handleInteraction('pop')}
                className="p-5 rounded-2xl border-2 border-slate-100 hover:border-pink-200/60 hover:bg-pink-50/10 transition-colors shadow-sm cursor-pointer transform origin-center"
              >
                <div className="mb-3.5 bg-slate-50 p-2 rounded-xl inline-block">
                  {card.icon}
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 mb-1.5">{card.title}</h3>
                <p className="text-slate-500 text-xs font-semibold leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Statistics / Interactive counters */}
          <div className="bg-slate-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-100 text-left">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Telemetry sandbox data</span>
              <h4 className="text-slate-900 font-extrabold text-sm">Bounce count on this demo page</h4>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <motion.span
                  key={clicks}
                  initial={{ scale: 0.5, y: -10 }}
                  animate={{ scale: 1, y: 0 }}
                  className="block text-2xl font-black text-pink-500"
                >
                  {clicks}
                </motion.span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Actions</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-black text-slate-800">
                  {bouncyMode ? '100%' : '0%'}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Bounciness</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Action Button inside the preview frame */}
      <motion.button
        id="fab-preview-support"
        animate={bouncyMode ? {
          y: [0, -6, 0],
          scaleY: [1, 1.05, 1],
          scaleX: [1, 0.95, 1],
        } : {}}
        transition={bouncyMode ? {
          repeat: Infinity,
          duration: 1.8,
          ease: "easeInOut"
        } : {}}
        whileHover={springHover}
        whileTap={popClick}
        onHoverStart={() => handleInteraction('rubber')}
        onClick={() => {
          handleInteraction('boing');
          setClicks(c => c + 1);
        }}
        className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-tr from-pink-600 to-purple-600 rounded-full text-white flex items-center justify-center shadow-xl shadow-pink-500/20 cursor-pointer border border-pink-400 hover:brightness-110 focus:outline-none origin-bottom"
      >
        <span className="text-xl">🍑</span>
      </motion.button>
    </div>
  );
}
