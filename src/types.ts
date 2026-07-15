export type AnimationCategory = 'Entrance' | 'Attention' | 'Loop' | 'Hover';

export interface AnimationPreset {
  id: string;
  name: string;
  description: string;
  category: AnimationCategory;
  stiffness: number;
  damping: number;
  mass: number;
  scaleX: number[]; // Keyframes for squish
  scaleY: number[];
  y?: number[];
  rotate?: number[];
  framerMotionCode: string;
  tailwindCode: string;
  cssCode: string;
}

export interface PhysicsParams {
  stiffness: number;
  damping: number;
  mass: number;
  scaleSquish: number; // custom control for elastic squish
  duration: number; // for non-spring or custom loops
  isSpring: boolean;
}

export interface SoundPreset {
  type: 'boing' | 'splat' | 'swoosh' | 'rubber' | 'pop';
  frequency: number;
  duration: number;
  decay: number;
}
