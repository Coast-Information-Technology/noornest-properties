'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

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
  // Use state to avoid hydration mismatch - start with false (server-side default)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference after hydration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      // Listen for changes
      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      // Modern browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, []);

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
