'use client';

import { createContext, useContext, ReactNode } from 'react';

interface AnimationContextType {
  prefersReducedMotion: boolean;
  animationSpeed: 'slow' | 'normal' | 'fast';
  enableScrollAnimations: boolean;
}

const AnimationContext = createContext<AnimationContextType>({
  prefersReducedMotion: false,
  animationSpeed: 'normal',
  enableScrollAnimations: true,
});

interface AnimationProviderProps {
  children: ReactNode;
  animationSpeed?: 'slow' | 'normal' | 'fast';
  enableScrollAnimations?: boolean;
}

export function AnimationProvider({
  children,
  animationSpeed = 'normal',
  enableScrollAnimations = true,
}: AnimationProviderProps) {
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const value = {
    prefersReducedMotion,
    animationSpeed,
    enableScrollAnimations: enableScrollAnimations && !prefersReducedMotion,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}

// Animation speed multipliers
export const getAnimationDuration = (baseDuration: number, speed: 'slow' | 'normal' | 'fast') => {
  const multipliers = {
    slow: 1.5,
    normal: 1,
    fast: 0.7,
  };
  return baseDuration * multipliers[speed];
};
