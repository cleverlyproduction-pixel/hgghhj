import { AnimationPreset, PhysicsParams } from '../types';

export const BOUNCY_PRESETS: AnimationPreset[] = [
  {
    id: 'booty-bounce',
    name: 'Booty Bounce 🍑',
    description: 'Heavy, gelatinous bottom-aligned spring bounce. Excellent for grabbing attention or loading actions.',
    category: 'Attention',
    stiffness: 320,
    damping: 10,
    mass: 1.4,
    scaleX: [1, 1.25, 0.85, 1.1, 0.95, 1.02, 1],
    scaleY: [1, 0.75, 1.15, 0.9, 1.05, 0.98, 1],
    y: [0, 15, -45, 10, -5, 2, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  {
    id: 'jelly-wobble',
    name: 'Jelly Wobble 🍮',
    description: 'Soft, fluid horizontal wiggle. Feels exactly like tapping a fresh bowl of sweet dessert.',
    category: 'Hover',
    stiffness: 180,
    damping: 7,
    mass: 1.0,
    scaleX: [1, 1.35, 0.7, 1.2, 0.85, 1.08, 0.96, 1.02, 1],
    scaleY: [1, 0.7, 1.25, 0.8, 1.15, 0.9, 1.05, 0.98, 1],
    rotate: [0, -6, 5, -4, 3, -1.5, 0.8, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  {
    id: 'twerk-tremor',
    name: 'Twerk Tremor ⚡',
    description: 'Rapid multi-directional vibrations. Full of dynamic, jittery excitement for error states or click triggers.',
    category: 'Attention',
    stiffness: 750,
    damping: 8,
    mass: 0.45,
    scaleX: [1, 1.12, 0.9, 1.08, 0.96, 1.02, 1],
    scaleY: [1, 0.9, 1.1, 0.92, 1.04, 0.98, 1],
    y: [0, -8, 8, -6, 6, -3, 3, 0],
    rotate: [0, -5, 5, -5, 4, -3, 2, -1, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  {
    id: 'rubber-slam',
    name: 'Rubber Band Slam 💥',
    description: 'Falls heavy from above, squashes completely flat, and snaps back up with major elastic rebound.',
    category: 'Entrance',
    stiffness: 450,
    damping: 14,
    mass: 1.25,
    scaleX: [0.2, 1.5, 0.75, 1.15, 0.95, 1.02, 1],
    scaleY: [1.8, 0.4, 1.3, 0.85, 1.05, 0.98, 1],
    y: [-350, 15, -60, 15, -5, 2, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  {
    id: 'elastic-slap',
    name: 'Elastic Slap 🔄',
    description: 'A snappy 3D rotation wind-up and elastic recoil. Perfect for close buttons, checkboxes, or toggles.',
    category: 'Hover',
    stiffness: 280,
    damping: 11,
    mass: 0.8,
    scaleX: [1, 0.85, 1.15, 0.92, 1.04, 0.98, 1],
    scaleY: [1, 1.15, 0.85, 1.06, 0.95, 1.01, 1],
    rotate: [0, -25, 15, -8, 4, -1, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  {
    id: 'plump-pop',
    name: 'Plump Pop 🎈',
    description: 'Puffs up rapidly like an over-inflated bubble, getting super chubby before bouncing to rest.',
    category: 'Entrance',
    stiffness: 480,
    damping: 16,
    mass: 0.9,
    scaleX: [0.0, 1.45, 0.8, 1.12, 0.95, 1.02, 1],
    scaleY: [0.0, 1.45, 0.8, 1.12, 0.95, 1.02, 1],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 7
  {
    id: 'peach-pulsar',
    name: 'Peach Pulsar 💫',
    description: 'A stellar cosmic jiggle that radiates waves of bounciness. Warm and rhythmic.',
    category: 'Loop',
    stiffness: 220,
    damping: 9,
    mass: 1.1,
    scaleX: [1, 1.15, 0.9, 1.08, 0.95, 1.01, 1],
    scaleY: [1, 0.88, 1.12, 0.93, 1.04, 0.99, 1],
    y: [0, -15, 10, -5, 2, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 8
  {
    id: 'flan-flutter',
    name: 'Flan Flutter 🥞',
    description: 'Soft custard pastry jiggling on a golden plate after being flipped.',
    category: 'Hover',
    stiffness: 140,
    damping: 5,
    mass: 0.95,
    scaleX: [1, 1.28, 0.78, 1.14, 0.91, 1.04, 1],
    scaleY: [1, 0.78, 1.18, 0.88, 1.06, 0.97, 1],
    rotate: [0, -8, 6, -3, 1.5, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 9
  {
    id: 'shaky-ground',
    name: 'Shaky Ground 🛑',
    description: 'High-energy tectonic warning shockwave. Perfect for alert messages and errors.',
    category: 'Attention',
    stiffness: 850,
    damping: 12,
    mass: 0.5,
    scaleX: [1, 1.08, 0.93, 1.04, 0.98, 1],
    scaleY: [1, 0.93, 1.06, 0.97, 1.01, 1],
    y: [0, -4, 4, -4, 3, -2, 2, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 10
  {
    id: 'balloon-puff',
    name: 'Balloon Puff 🌬️',
    description: 'An over-exaggerated pneumatic inflation that squeezes back to a standard shape.',
    category: 'Entrance',
    stiffness: 380,
    damping: 13,
    mass: 0.85,
    scaleX: [0.1, 1.6, 0.7, 1.2, 0.9, 1.03, 1],
    scaleY: [0.1, 1.6, 0.7, 1.2, 0.9, 1.03, 1],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 11
  {
    id: 'spring-coil',
    name: 'Spring Coil 🌀',
    description: 'Vibrates up and down with intense mechanical energy like an automobile coilover.',
    category: 'Loop',
    stiffness: 420,
    damping: 6,
    mass: 1.5,
    scaleX: [1, 0.85, 1.15, 0.9, 1.08, 0.96, 1.02, 1],
    scaleY: [1, 1.2, 0.8, 1.12, 0.92, 1.05, 0.98, 1],
    y: [0, -40, 25, -15, 8, -4, 2, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 12
  {
    id: 'custard-quiver',
    name: 'Custard Quiver 🍮',
    description: 'Super-slow, high-amplitude wobble with very little damping resistance.',
    category: 'Hover',
    stiffness: 90,
    damping: 4,
    mass: 1.2,
    scaleX: [1, 1.45, 0.65, 1.3, 0.75, 1.15, 0.9, 1.04, 1],
    scaleY: [1, 0.65, 1.35, 0.75, 1.2, 0.88, 1.08, 0.97, 1],
    rotate: [0, -10, 8, -6, 4, -2, 1, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 13
  {
    id: 'bubble-blast',
    name: 'Bubble Blast 🫧',
    description: 'A cute sudden burst of high-tension scale snap with clean residual oscillation.',
    category: 'Entrance',
    stiffness: 550,
    damping: 15,
    mass: 0.7,
    scaleX: [0, 1.3, 0.85, 1.1, 0.95, 1.02, 1],
    scaleY: [0, 1.3, 0.85, 1.1, 0.95, 1.02, 1],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 14
  {
    id: 'slime-slideways',
    name: 'Slime Slideways 🫠',
    description: 'Slightly skewed, slippery left-to-right elastic translation slide.',
    category: 'Hover',
    stiffness: 240,
    damping: 10,
    mass: 0.9,
    scaleX: [1, 1.2, 0.9, 1.08, 0.96, 1],
    scaleY: [1, 0.9, 1.1, 0.95, 1.03, 1],
    rotate: [0, -12, 10, -6, 3, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 15
  {
    id: 'trampoline-leap',
    name: 'Trampoline Leap 🦘',
    description: 'Sinks deep down under extreme heavy weight, then shoots sky-high with maximum rebound.',
    category: 'Attention',
    stiffness: 500,
    damping: 13,
    mass: 1.6,
    scaleX: [1, 1.4, 0.7, 1.25, 0.85, 1.05, 1],
    scaleY: [1, 0.6, 1.4, 0.75, 1.15, 0.92, 1],
    y: [0, 60, -120, 40, -15, 5, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 16
  {
    id: 'pancake-flap',
    name: 'Pancake Flap 🥞',
    description: 'A horizontal double-flip that compresses vertically like flat dough landing on hot grease.',
    category: 'Hover',
    stiffness: 310,
    damping: 12,
    mass: 1.0,
    scaleX: [1, 0.7, 1.3, 0.85, 1.08, 0.96, 1],
    scaleY: [1, 1.4, 0.7, 1.2, 0.9, 1.04, 1],
    rotate: [0, 180, 360],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 17
  {
    id: 'jellyfish-jiggle',
    name: 'Jellyfish Jiggle 🪼',
    description: 'Elegant pulsing motion simulating a deep sea cnidarian swimming upward.',
    category: 'Loop',
    stiffness: 120,
    damping: 8,
    mass: 1.15,
    scaleX: [1, 1.22, 0.85, 1.12, 0.92, 1.03, 1],
    scaleY: [1, 0.8, 1.22, 0.88, 1.08, 0.96, 1],
    y: [0, -18, 5, -8, 2, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 18
  {
    id: 'pogo-hop',
    name: 'Pogo Hop 🛴',
    description: 'Repetitive vertical bouncing with a crisp, rigid bottom impact compression.',
    category: 'Attention',
    stiffness: 410,
    damping: 15,
    mass: 0.75,
    scaleX: [1, 1.15, 0.9, 1.05, 0.98, 1],
    scaleY: [1, 0.85, 1.12, 0.95, 1.02, 1],
    y: [0, -50, 0, -20, 0, -5, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 19
  {
    id: 'ping-pong-spark',
    name: 'Ping Pong Spark 🏓',
    description: 'Extremely quick horizontal bounce that flickers back and forth.',
    category: 'Hover',
    stiffness: 680,
    damping: 16,
    mass: 0.5,
    scaleX: [1, 1.25, 0.85, 1.1, 1],
    scaleY: [1, 0.85, 1.15, 0.9, 1],
    rotate: [0, 15, -15, 10, -10, 5, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 20
  {
    id: 'rubber-duck-squeak',
    name: 'Duck Squeak 🦆',
    description: 'Puffy, squelchy jiggle that sounds exactly like squeezing a yellow bath toy.',
    category: 'Attention',
    stiffness: 300,
    damping: 9,
    mass: 0.9,
    scaleX: [1, 1.35, 0.8, 1.15, 0.95, 1.02, 1],
    scaleY: [1, 0.7, 1.25, 0.85, 1.08, 0.98, 1],
    y: [0, 8, -12, 4, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 21
  {
    id: 'popcorn-popper',
    name: 'Popcorn Popper 🍿',
    description: 'A sudden high-velocity kernel explosion with a series of tiny rapid residual pops.',
    category: 'Entrance',
    stiffness: 620,
    damping: 14,
    mass: 0.6,
    scaleX: [0, 1.5, 0.8, 1.2, 0.95, 1.03, 1],
    scaleY: [0, 1.5, 0.8, 1.2, 0.95, 1.03, 1],
    rotate: [0, -18, 12, -6, 2, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 22
  {
    id: 'boing-boing-spring',
    name: 'Boing Boing 🐸',
    description: 'Perfect for playful elements, simulating a happy toad leaping between lillypads.',
    category: 'Loop',
    stiffness: 200,
    damping: 8,
    mass: 1.1,
    scaleX: [1, 1.2, 0.85, 1.1, 0.95, 1],
    scaleY: [1, 0.8, 1.2, 0.9, 1.05, 1],
    y: [0, -25, 10, -12, 3, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 23
  {
    id: 'gummy-bear-squish',
    name: 'Gummy Bear 🧸',
    description: 'Extra-chewy, high-density elastomer squeeze that returns to baseline slowly.',
    category: 'Hover',
    stiffness: 150,
    damping: 12,
    mass: 1.5,
    scaleX: [1, 1.35, 0.75, 1.15, 0.92, 1.03, 1],
    scaleY: [1, 0.75, 1.25, 0.88, 1.08, 0.97, 1],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 24
  {
    id: 'marshmallow-squeeze',
    name: 'Marshmallow 🍡',
    description: 'Super soft, airy and pillowy squish. Generous shape expansion with low friction.',
    category: 'Hover',
    stiffness: 160,
    damping: 6,
    mass: 0.8,
    scaleX: [1, 1.4, 0.7, 1.2, 0.88, 1.05, 1],
    scaleY: [1, 0.7, 1.3, 0.8, 1.12, 0.95, 1],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 25
  {
    id: 'slap-back',
    name: 'Slap Back 👋',
    description: 'Pulled backward aggressively, then whipped forward into an elastic overshot oscillation.',
    category: 'Hover',
    stiffness: 340,
    damping: 10,
    mass: 1.0,
    scaleX: [1, 0.8, 1.3, 0.9, 1.05, 0.98, 1],
    scaleY: [1, 1.2, 0.8, 1.1, 0.95, 1.02, 1],
    rotate: [0, -35, 20, -10, 4, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 26
  {
    id: 'wobble-wheel',
    name: 'Wobble Wheel 🎡',
    description: 'A full rotational swing with loose elastic anchoring. Feels like an eccentric kinetic sculpture.',
    category: 'Loop',
    stiffness: 190,
    damping: 7,
    mass: 1.3,
    rotate: [0, 45, -30, 20, -10, 5, 0],
    scaleX: [1, 1.15, 0.92, 1.05, 1],
    scaleY: [1, 0.92, 1.08, 0.96, 1],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 27
  {
    id: 'squeeze-box',
    name: 'Squeeze Box 🪗',
    description: 'A symmetrical accordion style horizontal squeeze with elastic snapping.',
    category: 'Hover',
    stiffness: 270,
    damping: 11,
    mass: 0.95,
    scaleX: [1, 0.6, 1.4, 0.8, 1.15, 0.92, 1.04, 1],
    scaleY: [1, 1.2, 0.8, 1.1, 0.92, 1.05, 0.98, 1],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 28
  {
    id: 'dynamic-drop',
    name: 'Dynamic Drop 💧',
    description: 'Elongates heavily as if hanging, then pinches off and pops back into a droplet shape.',
    category: 'Entrance',
    stiffness: 430,
    damping: 15,
    mass: 1.1,
    scaleX: [0.3, 0.6, 1.4, 0.8, 1.12, 0.95, 1],
    scaleY: [1.9, 1.6, 0.5, 1.25, 0.88, 1.03, 1],
    y: [-250, -150, 20, -30, 10, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 29
  {
    id: 'elastic-whiplash',
    name: 'Whiplash 🎣',
    description: 'High-frequency snapback that triggers when mouse enters, vibrating intensely.',
    category: 'Hover',
    stiffness: 720,
    damping: 9,
    mass: 0.4,
    scaleX: [1, 1.15, 0.88, 1.08, 0.95, 1.02, 1],
    scaleY: [1, 0.88, 1.12, 0.92, 1.05, 0.98, 1],
    rotate: [0, -15, 15, -10, 10, -5, 5, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 30
  {
    id: 'crazy-custard',
    name: 'Crazy Custard 🍧',
    description: 'A messy, multi-axis gelatinous swirl that shakes completely loose.',
    category: 'Loop',
    stiffness: 110,
    damping: 4,
    mass: 1.0,
    scaleX: [1, 1.35, 0.7, 1.25, 0.8, 1.15, 0.9, 1.05, 1],
    scaleY: [1, 0.7, 1.3, 0.8, 1.2, 0.85, 1.1, 0.96, 1],
    y: [0, 15, -25, 12, -8, 4, 0],
    rotate: [0, -12, 12, -8, 8, -4, 2, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 31
  {
    id: 'booty-bump',
    name: 'Booty Bump 🍑',
    description: 'A cheeky sideways bump that wiggles the hips. Perfect for card actions.',
    category: 'Attention',
    stiffness: 340,
    damping: 10,
    mass: 1.2,
    scaleX: [1, 1.2, 0.85, 1.1, 0.95, 1],
    scaleY: [1, 0.85, 1.15, 0.9, 1.05, 1],
    rotate: [0, 18, -12, 8, -4, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 32
  {
    id: 'twerk-shockwave',
    name: 'Twerk Shock ⚡',
    description: 'Unleashes a rapid lightning-fast vibration sequence upon activation.',
    category: 'Attention',
    stiffness: 900,
    damping: 10,
    mass: 0.35,
    scaleX: [1, 1.1, 0.9, 1.05, 0.98, 1],
    scaleY: [1, 0.9, 1.1, 0.95, 1.02, 1],
    y: [0, -5, 5, -5, 4, -3, 2, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 33
  {
    id: 'rubber-snap',
    name: 'Rubber Snap 🎯',
    description: 'Snaps instantly like a plucked guitar string. Perfect for navigation links.',
    category: 'Hover',
    stiffness: 580,
    damping: 12,
    mass: 0.65,
    scaleX: [1, 1.28, 0.82, 1.12, 0.95, 1.02, 1],
    scaleY: [1, 0.82, 1.22, 0.88, 1.08, 0.98, 1],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 34
  {
    id: 'jelly-shake',
    name: 'Jelly Shake 🥤',
    description: 'A delicious vertical milkshake style vibration with bubbly bounce.',
    category: 'Attention',
    stiffness: 230,
    damping: 8,
    mass: 1.1,
    scaleX: [1, 1.2, 0.85, 1.1, 0.95, 1],
    scaleY: [1, 0.8, 1.25, 0.85, 1.08, 1],
    y: [0, 20, -15, 10, -5, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 35
  {
    id: 'splat-landing',
    name: 'Splat Landing 🧼',
    description: 'Heavy vertical compression landing that oozes sideways smoothly.',
    category: 'Entrance',
    stiffness: 330,
    damping: 11,
    mass: 1.45,
    scaleX: [0.1, 1.55, 0.7, 1.2, 0.9, 1.03, 1],
    scaleY: [1.8, 0.45, 1.35, 0.8, 1.1, 0.95, 1],
    y: [-300, 20, -25, 5, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 36
  {
    id: 'high-freq-jitter',
    name: 'Jitter Bug 🪇',
    description: 'A constant, rapid shaking motion mimicking maracas or a vibrating motor.',
    category: 'Loop',
    stiffness: 800,
    damping: 14,
    mass: 0.4,
    scaleX: [1, 1.05, 0.95, 1.05, 0.95, 1.02, 1],
    scaleY: [1, 0.95, 1.05, 0.95, 1.05, 0.98, 1],
    rotate: [0, -3, 3, -3, 2, -2, 1, -1, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 37
  {
    id: 'kinetic-kick',
    name: 'Kinetic Kick 🦵',
    description: 'Slightly wind up, then kick outward with extreme energetic recoil.',
    category: 'Hover',
    stiffness: 400,
    damping: 13,
    mass: 0.9,
    scaleX: [1, 0.85, 1.25, 0.9, 1.08, 0.97, 1],
    scaleY: [1, 1.15, 0.75, 1.1, 0.92, 1.03, 1],
    rotate: [0, -18, 22, -10, 4, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 38
  {
    id: 'helium-rise',
    name: 'Helium Rise 🎈',
    description: 'Floats upward gracefully from the bottom, bobbing gently in local wind drafts.',
    category: 'Entrance',
    stiffness: 210,
    damping: 12,
    mass: 1.05,
    scaleX: [0.8, 1.1, 0.95, 1.04, 0.98, 1],
    scaleY: [1.2, 0.9, 1.05, 0.96, 1.01, 1],
    y: [200, -25, 10, -5, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 39
  {
    id: 'cushion-compress',
    name: 'Cushion Compress 🛋️',
    description: 'Deep mechanical compression as if sinking into a premium memory foam couch.',
    category: 'Hover',
    stiffness: 130,
    damping: 9,
    mass: 1.35,
    scaleX: [1, 1.22, 0.9, 1.08, 0.96, 1.01, 1],
    scaleY: [1, 0.78, 1.1, 0.92, 1.04, 0.99, 1],
    y: [0, 12, -4, 2, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 40
  {
    id: 'springboard-flip',
    name: 'Springboard Flip 🛹',
    description: 'Wind-up compression followed by an agile acrobatic vertical flip.',
    category: 'Hover',
    stiffness: 350,
    damping: 14,
    mass: 1.1,
    scaleX: [1, 1.3, 0.8, 1.1, 0.95, 1],
    scaleY: [1, 0.7, 1.25, 0.9, 1.05, 1],
    y: [0, 20, -80, 15, 0],
    rotate: [0, 10, -360, -355, -360],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 41
  {
    id: 'jello-shockwave',
    name: 'Jello Shock 🍮',
    description: 'A powerful central impact that sends ripples of jiggle throughout the node.',
    category: 'Attention',
    stiffness: 290,
    damping: 6,
    mass: 1.2,
    scaleX: [1, 1.3, 0.75, 1.2, 0.88, 1.08, 0.96, 1.02, 1],
    scaleY: [1, 0.7, 1.28, 0.82, 1.15, 0.91, 1.05, 0.98, 1],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 42
  {
    id: 'hip-sway',
    name: 'Hip Sway 💃',
    description: 'Beautiful, undulating pendulum sway from side to side with low spring resistance.',
    category: 'Loop',
    stiffness: 100,
    damping: 5,
    mass: 1.25,
    scaleX: [1, 1.08, 0.94, 1.05, 0.97, 1.02, 1],
    scaleY: [1, 0.94, 1.08, 0.97, 1.03, 0.99, 1],
    rotate: [0, -15, 15, -10, 10, -5, 5, -2, 2, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 43
  {
    id: 'slinky-stretch',
    name: 'Slinky Stretch 🐍',
    description: 'Elongates extremely high, then compresses completely flat in a long-chain spring cycle.',
    category: 'Loop',
    stiffness: 250,
    damping: 7,
    mass: 1.3,
    scaleY: [1, 1.6, 0.5, 1.3, 0.75, 1.12, 0.92, 1.03, 1],
    scaleX: [1, 0.5, 1.5, 0.75, 1.2, 0.9, 1.05, 0.98, 1],
    y: [0, -35, 15, -15, 5, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 44
  {
    id: 'bubble-wrap-pop',
    name: 'Bubble Wrap 🫧',
    description: 'An ultra-fast pop that feels like cracking a single plastic bubble wrap cell.',
    category: 'Hover',
    stiffness: 700,
    damping: 15,
    mass: 0.5,
    scaleX: [1, 1.18, 0.9, 1.05, 1],
    scaleY: [1, 0.9, 1.15, 0.95, 1],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 45
  {
    id: 'elastic-swing',
    name: 'Elastic Swing 🐒',
    description: 'Suspended from the top, swinging loosely back and forth like a happy primate.',
    category: 'Loop',
    stiffness: 110,
    damping: 6,
    mass: 1.1,
    scaleX: [1, 1.12, 0.92, 1.06, 0.97, 1.01, 1],
    scaleY: [1, 0.92, 1.12, 0.95, 1.04, 0.99, 1],
    rotate: [0, -22, 18, -12, 8, -4, 2, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 46
  {
    id: 'dough-knead',
    name: 'Dough Knead 🍞',
    description: 'Heavily compressed on both axes in a slow, warm bread-baking rhythm.',
    category: 'Loop',
    stiffness: 80,
    damping: 6,
    mass: 1.4,
    scaleX: [1, 1.18, 0.85, 1.1, 0.92, 1.03, 1],
    scaleY: [1, 0.85, 1.15, 0.9, 1.08, 0.96, 1],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 47
  {
    id: 'bouncing-bomb',
    name: 'Bouncing Bomb 💣',
    description: 'A heavy mechanical ticking loop that scales up slightly right before deflating.',
    category: 'Loop',
    stiffness: 300,
    damping: 13,
    mass: 0.9,
    scaleX: [1, 1.12, 1, 1.12, 1, 1.12, 1],
    scaleY: [1, 1.12, 1, 1.12, 1, 1.12, 1],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 48
  {
    id: 'yo-yo-rebound',
    name: 'Yo-Yo Rebound 🪀',
    description: 'Unrolls downward with rapid velocity, then snaps back up under direct sleep-tension.',
    category: 'Attention',
    stiffness: 390,
    damping: 11,
    mass: 1.0,
    y: [0, 120, -30, 15, -5, 0],
    scaleY: [1, 1.4, 0.7, 1.15, 0.95, 1],
    scaleX: [1, 0.7, 1.3, 0.88, 1.05, 1],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 49
  {
    id: 'moon-jump',
    name: 'Moon Jump 👨‍🚀',
    description: 'Floaty, low-gravity leap with extremely long loft times and soft padded landings.',
    category: 'Attention',
    stiffness: 70,
    damping: 6,
    mass: 1.8,
    y: [0, -100, -80, -40, 10, -5, 0],
    scaleY: [1, 0.8, 1.15, 1.1, 0.75, 1.08, 1],
    scaleX: [1, 1.2, 0.9, 0.92, 1.25, 0.95, 1],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  },
  // 50
  {
    id: 'wobble-wave',
    name: 'Wobble Wave 🌊',
    description: 'Swaying back and forth elegantly, imitating open water sea swells.',
    category: 'Loop',
    stiffness: 90,
    damping: 7,
    mass: 1.4,
    scaleX: [1, 1.15, 0.9, 1.08, 0.95, 1.02, 1],
    scaleY: [1, 0.9, 1.15, 0.94, 1.05, 0.98, 1],
    y: [0, -10, 10, -5, 5, -2, 0],
    rotate: [0, -6, 6, -4, 4, -2, 0],
    framerMotionCode: '',
    tailwindCode: '',
    cssCode: '',
  }
];

export function generateCodeBlocks(
  name: string,
  params: PhysicsParams,
  presetId?: string
): { framerMotion: string; tailwind: string; css: string } {
  const { stiffness, damping, mass, scaleSquish, duration, isSpring } = params;
  
  // Clean identifier for CSS naming
  const cleanId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  // Calculate keyframe values based on squish/elastic parameters
  const basePreset = BOUNCY_PRESETS.find(p => p.id === presetId);
  
  // Keyframes for scale and translates
  const scaleXKeyframes = basePreset 
    ? basePreset.scaleX.map(v => 1 + (v - 1) * scaleSquish) 
    : [1, 1 + 0.25 * scaleSquish, 1 - 0.15 * scaleSquish, 1 + 0.1 * scaleSquish, 1 - 0.05 * scaleSquish, 1];

  const scaleYKeyframes = basePreset 
    ? basePreset.scaleY.map(v => 1 + (v - 1) * scaleSquish) 
    : [1, 1 - 0.25 * scaleSquish, 1 + 0.15 * scaleSquish, 1 - 0.1 * scaleSquish, 1 + 0.05 * scaleSquish, 1];

  const yKeyframes = basePreset?.y 
    ? basePreset.y.map(v => v * scaleSquish) 
    : [0, 5 * scaleSquish, -15 * scaleSquish, 4 * scaleSquish, 0];

  const rotateKeyframes = basePreset?.rotate 
    ? basePreset.rotate.map(v => v * scaleSquish) 
    : [0, -3 * scaleSquish, 3 * scaleSquish, -1 * scaleSquish, 0];

  // Framer Motion Code
  const fmTransition = isSpring
    ? `type: "spring",
    stiffness: ${stiffness},
    damping: ${damping},
    mass: ${mass}`
    : `type: "tween",
    ease: "easeInOut",
    duration: ${duration}`;

  const framerMotion = `import { motion } from 'motion/react';

export default function BouncyComponent() {
  return (
    <motion.div
      whileHover={{
        scaleX: [${scaleXKeyframes.map(v => v.toFixed(3)).join(', ')}],
        scaleY: [${scaleYKeyframes.map(v => v.toFixed(3)).join(', ')}],
        y: [${yKeyframes.map(v => v.toFixed(1)).join(', ')}],
        rotate: [${rotateKeyframes.map(v => v.toFixed(1)).join(', ')}],
        transition: {
          duration: ${isSpring ? (mass * 1.2).toFixed(2) : duration},
          ease: "easeOut",
          times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1]
        }
      }}
      animate={{
        scale: 1,
        y: 0,
        rotate: 0
      }}
      transition={{
        ${fmTransition.split('\n').join('\n        ')}
      }}
      style={{ transformOrigin: "bottom" }}
    >
      <video src="your-bouncy-video.mp4" controls className="rounded-xl shadow-lg" />
    </motion.div>
  );
}`;

  // Tailwind config injection block
  const tailwind = `// tailwind.config.js (extend settings)
module.exports = {
  theme: {
    extend: {
      keyframes: {
        '${cleanId}': {
          '0%, 100%': { transform: 'scale(1) translateY(0) rotate(0)' },
          '15%': { transform: 'scale(${scaleXKeyframes[Math.min(1, scaleXKeyframes.length - 1)].toFixed(2)}, ${scaleYKeyframes[Math.min(1, scaleYKeyframes.length - 1)].toFixed(2)}) translateY(${(yKeyframes[Math.min(1, yKeyframes.length - 1)] || 0).toFixed(1)}px) rotate(${(rotateKeyframes[Math.min(1, rotateKeyframes.length - 1)] || 0).toFixed(1)}deg)' },
          '30%': { transform: 'scale(${scaleXKeyframes[Math.min(2, scaleXKeyframes.length - 1)].toFixed(2)}, ${scaleYKeyframes[Math.min(2, scaleYKeyframes.length - 1)].toFixed(2)}) translateY(${(yKeyframes[Math.min(2, yKeyframes.length - 1)] || 0).toFixed(1)}px) rotate(${(rotateKeyframes[Math.min(2, rotateKeyframes.length - 1)] || 0).toFixed(1)}deg)' },
          '45%': { transform: 'scale(${scaleXKeyframes[Math.min(3, scaleXKeyframes.length - 1)].toFixed(2)}, ${scaleYKeyframes[Math.min(3, scaleYKeyframes.length - 1)].toFixed(2)}) translateY(${(yKeyframes[Math.min(3, yKeyframes.length - 1)] || 0).toFixed(1)}px) rotate(${(rotateKeyframes[Math.min(3, rotateKeyframes.length - 1)] || 0).toFixed(1)}deg)' },
          '60%': { transform: 'scale(${scaleXKeyframes[Math.min(4, scaleXKeyframes.length - 1)].toFixed(2)}, ${scaleYKeyframes[Math.min(4, scaleYKeyframes.length - 1)].toFixed(2)}) translateY(${(yKeyframes[Math.min(4, yKeyframes.length - 1)] || 0).toFixed(1)}px) rotate(${(rotateKeyframes[Math.min(4, rotateKeyframes.length - 1)] || 0).toFixed(1)}deg)' },
          '75%': { transform: 'scale(${scaleXKeyframes[Math.min(5, scaleXKeyframes.length - 1)].toFixed(2)}, ${scaleYKeyframes[Math.min(5, scaleYKeyframes.length - 1)].toFixed(2)}) translateY(${(yKeyframes[Math.min(5, yKeyframes.length - 1)] || 0).toFixed(1)}px) rotate(${(rotateKeyframes[Math.min(5, rotateKeyframes.length - 1)] || 0).toFixed(1)}deg)' },
        }
      },
      animation: {
        '${cleanId}': '${cleanId} ${isSpring ? (mass * 1.1).toFixed(2) : duration}s cubic-bezier(0.175, 0.885, 0.32, 1.275) both'
      }
    }
  }
}

// In HTML / React JSX:
// <div className="animate-${cleanId} origin-bottom">...</div>`;

  // Raw CSS file block
  const css = `/* Vanilla CSS */
.bouncy-ass-element {
  transform-origin: bottom;
  animation: ${cleanId}-animation ${isSpring ? (mass * 1.1).toFixed(2) : duration}s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}

@keyframes ${cleanId}-animation {
  0% { transform: scale(1, 1) translateY(0) rotate(0deg); }
  15% { transform: scale(${scaleXKeyframes[Math.min(1, scaleXKeyframes.length - 1)].toFixed(2)}, ${scaleYKeyframes[Math.min(1, scaleYKeyframes.length - 1)].toFixed(2)}) translateY(${(yKeyframes[Math.min(1, yKeyframes.length - 1)] || 0).toFixed(1)}px) rotate(${(rotateKeyframes[Math.min(1, rotateKeyframes.length - 1)] || 0).toFixed(1)}deg); }
  30% { transform: scale(${scaleXKeyframes[Math.min(2, scaleXKeyframes.length - 1)].toFixed(2)}, ${scaleYKeyframes[Math.min(2, scaleYKeyframes.length - 1)].toFixed(2)}) translateY(${(yKeyframes[Math.min(2, yKeyframes.length - 1)] || 0).toFixed(1)}px) rotate(${(rotateKeyframes[Math.min(2, rotateKeyframes.length - 1)] || 0).toFixed(1)}deg); }
  45% { transform: scale(${scaleXKeyframes[Math.min(3, scaleXKeyframes.length - 1)].toFixed(2)}, ${scaleYKeyframes[Math.min(3, scaleYKeyframes.length - 1)].toFixed(2)}) translateY(${(yKeyframes[Math.min(3, yKeyframes.length - 1)] || 0).toFixed(1)}px) rotate(${(rotateKeyframes[Math.min(3, rotateKeyframes.length - 1)] || 0).toFixed(1)}deg); }
  60% { transform: scale(${scaleXKeyframes[Math.min(4, scaleXKeyframes.length - 1)].toFixed(2)}, ${scaleYKeyframes[Math.min(4, scaleYKeyframes.length - 1)].toFixed(2)}) translateY(${(yKeyframes[Math.min(4, yKeyframes.length - 1)] || 0).toFixed(1)}px) rotate(${(rotateKeyframes[Math.min(4, rotateKeyframes.length - 1)] || 0).toFixed(1)}deg); }
  75% { transform: scale(${scaleXKeyframes[Math.min(5, scaleXKeyframes.length - 1)].toFixed(2)}, ${scaleYKeyframes[Math.min(5, scaleYKeyframes.length - 1)].toFixed(2)}) translateY(${(yKeyframes[Math.min(5, yKeyframes.length - 1)] || 0).toFixed(1)}px) rotate(${(rotateKeyframes[Math.min(5, rotateKeyframes.length - 1)] || 0).toFixed(1)}deg); }
  100% { transform: scale(1, 1) translateY(0) rotate(0deg); }
}`;

  return { framerMotion, tailwind, css };
}
