import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Plus, Trash2, Sliders, Volume2, HelpCircle } from 'lucide-react';
import { playBounceSound } from '../utils/sound';

interface BounceSandboxProps {
  soundEnabled: boolean;
  soundVolume: number;
}

interface PhysicsBall {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  emoji: string;
  title: string;
  // Squish deformation factors
  squishX: number;
  squishY: number;
  angle: number;
}

const BALL_EMOJIS = ['🍑', '🍮', '🎥', '🎈', '⚡', '🍉', '🍩', '🚀', '🤪', '🤸', '🍭', '💥'];
const BALL_TITLES = [
  'Wobble Clip', 'Jiggle Video', 'Plump Cut', 'Bouncy Reel',
  'Elastic Short', 'Twerk Clip', 'Jelly Shot', 'Slam Reel',
  'Springy Loop', 'Slap Video', 'Splat Roll', 'Balloon Cut'
];
const BALL_COLORS = [
  '#FF6B8B', // Neon Peach
  '#2ED573', // Lime Green
  '#FF4757', // Hot Pink
  '#1E90FF', // Dodger Blue
  '#FFA502', // Orange Spark
  '#9B59B6', // Violet Pop
  '#00D2D3'  // Cyan Splat
];

export default function BounceSandbox({ soundEnabled, soundVolume }: BounceSandboxProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [balls, setBalls] = useState<PhysicsBall[]>([]);
  const [gravity, setGravity] = useState<number>(0.4);
  const [elasticity, setElasticity] = useState<number>(0.85); // Restitution
  const [squishMultiplier, setSquishMultiplier] = useState<number>(1.2);
  const [showHelper, setShowHelper] = useState<boolean>(true);

  // Keep references of physics values for the animation loop to prevent stale closures
  const physicsRef = useRef({
    gravity,
    elasticity,
    squishMultiplier,
    soundEnabled,
    soundVolume,
    balls: [] as PhysicsBall[],
    draggedBallId: null as string | null,
    mouseX: 0,
    mouseY: 0,
    isMouseDown: false
  });

  // Sync state values to physics ref
  useEffect(() => {
    physicsRef.current.gravity = gravity;
    physicsRef.current.elasticity = elasticity;
    physicsRef.current.squishMultiplier = squishMultiplier;
    physicsRef.current.soundEnabled = soundEnabled;
    physicsRef.current.soundVolume = soundVolume;
  }, [gravity, elasticity, squishMultiplier, soundEnabled, soundVolume]);

  // Handle resizing
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (canvas && container) {
        canvas.width = container.clientWidth;
        canvas.height = 400; // Fixed-ish height
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize with some fun bouncy video balls
  useEffect(() => {
    const initialBalls: PhysicsBall[] = [];
    const width = containerRef.current?.clientWidth || 600;
    
    for (let i = 0; i < 5; i++) {
      initialBalls.push({
        id: `ball-${Date.now()}-${i}`,
        x: 80 + i * ((width - 160) / 4),
        y: 80 + Math.random() * 80,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 5,
        radius: 35 + Math.random() * 10,
        color: BALL_COLORS[i % BALL_COLORS.length],
        emoji: BALL_EMOJIS[i % BALL_EMOJIS.length],
        title: BALL_TITLES[i % BALL_TITLES.length],
        squishX: 1,
        squishY: 1,
        angle: 0
      });
    }
    setBalls(initialBalls);
    physicsRef.current.balls = initialBalls;
  }, []);

  // Main Loop
  useEffect(() => {
    let animationFrameId: number;
    
    const updatePhysics = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const { gravity: g, elasticity: r, squishMultiplier: sm, soundEnabled: se, soundVolume: sv, draggedBallId, mouseX, mouseY, isMouseDown } = physicsRef.current;
      let currentBalls = [...physicsRef.current.balls];

      // Clear Canvas with trailing alpha for beautiful velocity ghosting
      ctx.fillStyle = 'rgba(15, 23, 42, 0.25)'; // slate-900 with alpha
      ctx.fillRect(0, 0, width, height);

      // Draw dashed boundaries
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.1)'; // pink outline
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.strokeRect(4, 4, width - 8, height - 8);
      ctx.setLineDash([]);

      // Update positions & collisions
      for (let i = 0; i < currentBalls.length; i++) {
        const ball = currentBalls[i];

        if (ball.id === draggedBallId && isMouseDown) {
          // Spring leash logic when dragging
          const dx = mouseX - ball.x;
          const dy = mouseY - ball.y;
          ball.vx = dx * 0.15; // spring attraction constant
          ball.vy = dy * 0.15;
          
          // Draw tether line
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(236, 72, 153, 0.4)';
          ctx.lineWidth = 3;
          ctx.setLineDash([4, 4]);
          ctx.moveTo(ball.x, ball.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
          ctx.setLineDash([]);

          // Draw hand indicator or drag anchor
          ctx.fillStyle = '#EC4899';
          ctx.beginPath();
          ctx.arc(mouseX, mouseY, 6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Normal Gravity
          ball.vy += g;
        }

        // Apply friction/air resistance
        ball.vx *= 0.99;
        ball.vy *= 0.99;

        // Apply position update
        ball.x += ball.vx;
        ball.y += ball.vy;

        // De-escalate squish back to normal (elastic memory)
        ball.squishX += (1 - ball.squishX) * 0.15;
        ball.squishY += (1 - ball.squishY) * 0.15;

        // Border Collisions with Squish & Sound triggers
        const limitLeft = ball.radius;
        const limitRight = width - ball.radius;
        const limitTop = ball.radius;
        const limitBottom = height - ball.radius;

        // X Axis Borders
        if (ball.x < limitLeft) {
          ball.x = limitLeft;
          const impactForce = Math.abs(ball.vx);
          ball.vx = -ball.vx * r;
          
          // Squish X (flatten on left, stretch high)
          ball.squishX = Math.max(0.4, 1 - (impactForce * 0.05 * sm));
          ball.squishY = Math.min(1.6, 1 + (impactForce * 0.04 * sm));

          if (impactForce > 1.5 && se) {
            playBounceSound(impactForce > 8 ? 'splat' : 'pop', sv * Math.min(1, impactForce / 10));
          }
        } else if (ball.x > limitRight) {
          ball.x = limitRight;
          const impactForce = Math.abs(ball.vx);
          ball.vx = -ball.vx * r;

          // Squish X (flatten on right)
          ball.squishX = Math.max(0.4, 1 - (impactForce * 0.05 * sm));
          ball.squishY = Math.min(1.6, 1 + (impactForce * 0.04 * sm));

          if (impactForce > 1.5 && se) {
            playBounceSound(impactForce > 8 ? 'splat' : 'pop', sv * Math.min(1, impactForce / 10));
          }
        }

        // Y Axis Borders
        if (ball.y < limitTop) {
          ball.y = limitTop;
          const impactForce = Math.abs(ball.vy);
          ball.vy = -ball.vy * r;

          // Squish Y (flatten on top, stretch wide)
          ball.squishY = Math.max(0.4, 1 - (impactForce * 0.05 * sm));
          ball.squishX = Math.min(1.6, 1 + (impactForce * 0.04 * sm));

          if (impactForce > 1.5 && se) {
            playBounceSound('swoosh', sv * Math.min(1, impactForce / 10));
          }
        } else if (ball.y > limitBottom) {
          ball.y = limitBottom;
          const impactForce = Math.abs(ball.vy);
          
          // Add standard rolling floor threshold
          if (impactForce < 0.35 && g > 0) {
            ball.vy = 0;
            ball.y = limitBottom;
          } else {
            ball.vy = -ball.vy * r;
            
            // Squish Y (flatten on bottom, spread wide like jelly landing)
            ball.squishY = Math.max(0.35, 1 - (impactForce * 0.06 * sm));
            ball.squishX = Math.min(1.7, 1 + (impactForce * 0.05 * sm));

            if (impactForce > 1.5 && se) {
              const sound = impactForce > 9 ? 'splat' : (impactForce > 4 ? 'boing' : 'rubber');
              playBounceSound(sound, sv * Math.min(1, impactForce / 10));
            }
          }
        }

        // Ball-to-ball elastic collisions
        for (let j = i + 1; j < currentBalls.length; j++) {
          const b2 = currentBalls[j];
          const dx = b2.x - ball.x;
          const dy = b2.y - ball.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = ball.radius + b2.radius;

          if (dist < minDist) {
            // Push apart
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;

            ball.x -= nx * overlap * 0.5;
            ball.y -= ny * overlap * 0.5;
            b2.x += nx * overlap * 0.5;
            b2.y += ny * overlap * 0.5;

            // Elastic Collision velocities
            const kx = ball.vx - b2.vx;
            const ky = ball.vy - b2.vy;
            const p = 2 * (nx * kx + ny * ky) / (1 + 1); // equal masses

            ball.vx -= p * nx * r;
            ball.vy -= p * ny * r;
            b2.vx += p * nx * r;
            b2.vy += p * ny * r;

            // Mutual squishing on collision
            const relSpeed = Math.sqrt(kx * kx + ky * ky);
            ball.squishX = Math.max(0.5, 1 - (relSpeed * 0.02 * sm));
            ball.squishY = Math.min(1.5, 1 + (relSpeed * 0.02 * sm));
            b2.squishX = Math.max(0.5, 1 - (relSpeed * 0.02 * sm));
            b2.squishY = Math.min(1.5, 1 + (relSpeed * 0.02 * sm));

            if (relSpeed > 2 && se) {
              playBounceSound('rubber', sv * Math.min(0.8, relSpeed / 10));
            }
          }
        }

        // Draw Ball
        ctx.save();
        ctx.translate(ball.x, ball.y);
        
        // Tilt ball slightly towards speed vector
        const travelAngle = Math.atan2(ball.vy, ball.vx);
        const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        const tiltFactor = Math.min(0.2, speed * 0.015);
        ctx.rotate(travelAngle * tiltFactor);

        // Apply scale squishes
        ctx.scale(ball.squishX, ball.squishY);

        // Shadow/glow ring
        const gradient = ctx.createRadialGradient(0, 0, ball.radius * 0.2, 0, 0, ball.radius);
        gradient.addColorStop(0, ball.color);
        gradient.addColorStop(0.7, ball.color);
        gradient.addColorStop(1, '#0f172a'); // blend into bg slate-900

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, ball.radius, 0, Math.PI * 2);
        ctx.fill();

        // White high-contrast bounding circle (simulates glowing plastic shell)
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, ball.radius - 2, 0, Math.PI * 2);
        ctx.stroke();

        // Draw play button overlay inside ball (making them look like "bouncy-ass videos"!)
        ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
        ctx.beginPath();
        ctx.arc(0, 0, ball.radius - 8, 0, Math.PI * 2);
        ctx.fill();

        // Draw Emoji
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `${ball.radius * 0.85}px Inter, system-ui`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ball.emoji, 0, -2);

        // Small Play Triangle icon overlay
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(ball.radius * 0.25, ball.radius * 0.5);
        ctx.lineTo(ball.radius * 0.45, ball.radius * 0.6);
        ctx.lineTo(ball.radius * 0.25, ball.radius * 0.7);
        ctx.closePath();
        ctx.fill();

        // Ball Label / Text tag (floats above it)
        ctx.restore();

        // Draw title floating below ball
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '10px font-mono, JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(ball.title, ball.x, ball.y + ball.radius + 6);
      }

      // Synchronize back to reference and schedule next frame
      physicsRef.current.balls = currentBalls;
      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    updatePhysics();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const spawnBall = (clientX?: number, clientY?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let spawnX = canvas.width / 2;
    let spawnY = 80;

    if (clientX !== undefined && clientY !== undefined) {
      const rect = canvas.getBoundingClientRect();
      spawnX = clientX - rect.left;
      spawnY = clientY - rect.top;
    }

    const index = Math.floor(Math.random() * BALL_EMOJIS.length);
    const newBall: PhysicsBall = {
      id: `ball-${Date.now()}`,
      x: spawnX,
      y: spawnY,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 8 - 4, // always spring upward initially
      radius: 30 + Math.random() * 18,
      color: BALL_COLORS[Math.floor(Math.random() * BALL_COLORS.length)],
      emoji: BALL_EMOJIS[index],
      title: BALL_TITLES[Math.floor(Math.random() * BALL_TITLES.length)],
      squishX: 1,
      squishY: 1,
      angle: 0
    };

    const updatedBalls = [...physicsRef.current.balls, newBall];
    physicsRef.current.balls = updatedBalls;
    setBalls(updatedBalls);

    if (soundEnabled) {
      playBounceSound('boing', soundVolume * 0.8);
    }
  };

  const clearSandbox = () => {
    physicsRef.current.balls = [];
    setBalls([]);
    if (soundEnabled) {
      playBounceSound('splat', soundVolume * 0.6);
    }
  };

  // Drag listeners
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    physicsRef.current.mouseX = x;
    physicsRef.current.mouseY = y;
    physicsRef.current.isMouseDown = true;

    // Find clicked ball
    let foundId: string | null = null;
    for (const b of physicsRef.current.balls) {
      const dx = b.x - x;
      const dy = b.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < b.radius + 10) {
        foundId = b.id;
        break;
      }
    }

    physicsRef.current.draggedBallId = foundId;
    if (foundId && soundEnabled) {
      playBounceSound('rubber', soundVolume * 0.5);
    }

    if (!foundId) {
      // Spawn on empty space click
      spawnBall(e.clientX, e.clientY);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    physicsRef.current.mouseX = e.clientX - rect.left;
    physicsRef.current.mouseY = e.clientY - rect.top;
  };

  const handleMouseUp = () => {
    if (physicsRef.current.draggedBallId && soundEnabled) {
      playBounceSound('swoosh', soundVolume * 0.7);
    }
    physicsRef.current.draggedBallId = null;
    physicsRef.current.isMouseDown = false;
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border-2 border-pink-500/30 rounded-3xl overflow-hidden shadow-2xl relative">
      
      {/* Interactive HUD / Top controls */}
      <div className="bg-slate-900/90 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80">
        <div className="flex items-center space-x-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping"></div>
          <h3 className="font-extrabold text-white text-sm tracking-wide uppercase">🍑 Bounce Sandbox Arena</h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="spawn-ball-btn"
            onClick={() => spawnBall()}
            className="flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-amber-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-md"
          >
            <Plus className="w-4 h-4 stroke-[3px]" />
            Spawn Video Ball
          </button>

          <button
            id="clear-sandbox-btn"
            onClick={clearSandbox}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 text-slate-300 font-bold text-xs px-4 py-2.5 rounded-xl active:scale-95 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>

      {/* Physics Tweak Rails */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/40 p-5 border-b border-slate-800/40 text-slate-300 text-xs font-semibold">
        {/* Gravity Control */}
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="flex items-center gap-1">🌌 Gravitational Drift:</span>
            <span className="font-mono text-pink-400 font-bold">{gravity === 0 ? 'Zero G (Bubbles)' : `${gravity.toFixed(2)}x`}</span>
          </div>
          <input
            id="gravity-slider"
            type="range"
            min="0"
            max="1.5"
            step="0.05"
            value={gravity}
            onChange={(e) => setGravity(parseFloat(e.target.value))}
            className="w-full accent-pink-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Elasticity Control */}
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="flex items-center gap-1">🎾 Wall Elasticity:</span>
            <span className="font-mono text-emerald-400 font-bold">{elasticity >= 1 ? 'Hyper-Bouncy!' : `${(elasticity * 100).toFixed(0)}%`}</span>
          </div>
          <input
            id="elasticity-slider"
            type="range"
            min="0.1"
            max="1.1"
            step="0.05"
            value={elasticity}
            onChange={(e) => setElasticity(parseFloat(e.target.value))}
            className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Squish Multiplier Control */}
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="flex items-center gap-1">🍮 Jelly Squishiness:</span>
            <span className="font-mono text-amber-400 font-bold">{squishMultiplier.toFixed(1)}x</span>
          </div>
          <input
            id="squish-slider"
            type="range"
            min="0"
            max="2.5"
            step="0.1"
            value={squishMultiplier}
            onChange={(e) => setSquishMultiplier(parseFloat(e.target.value))}
            className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Main Canvas Stage */}
      <div ref={containerRef} className="w-full h-[400px] bg-slate-950 relative overflow-hidden flex-1 cursor-crosshair select-none">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="block absolute inset-0"
        />

        {/* Helper overlay */}
        {showHelper && balls.length > 0 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none bg-slate-900/90 border border-slate-700/60 text-slate-300 text-[11px] px-4 py-2 rounded-xl backdrop-blur-sm text-center shadow-xl flex items-center gap-2">
            <span className="text-pink-500 font-bold">🎯 FUN TRICK:</span>
            <span>Click and drag a ball to wind up a spring sling! Or click empty space to inject a fresh video ball.</span>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowHelper(false); }}
              className="pointer-events-auto bg-slate-800 hover:bg-slate-700 text-[10px] text-white px-1.5 py-0.5 rounded font-black ml-1 uppercase"
            >
              OK
            </button>
          </div>
        )}

        {/* Zero state empty notice */}
        {balls.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-dashed border-slate-800 flex items-center justify-center mb-4 text-3xl animate-bounce">
              💨
            </div>
            <h4 className="text-slate-200 font-extrabold text-sm mb-1">Sandbox is completely clean!</h4>
            <p className="text-slate-500 text-xs font-semibold max-w-xs">Click anywhere inside this grid arena to spawn a hyper-elastic animated video container!</p>
          </div>
        )}
      </div>
    </div>
  );
}
