# Scroll Animations Documentation

This document explains how to use the scroll animation system in the Noornest Properties application.

## Overview

The application uses Framer Motion for smooth, performant scroll animations throughout the site. All animations are designed to be accessible and respect user preferences for reduced motion.

## Core Components

### 1. AnimationProvider

Wraps the entire application and provides animation context.

```tsx
import { AnimationProvider } from "@/components/providers/AnimationProvider";

// In your layout
<AnimationProvider>{children}</AnimationProvider>;
```

### 2. AnimatedSection

Animates entire sections as they come into view.

```tsx
import AnimatedSection from "@/components/ui/AnimatedSection";

<AnimatedSection variants={fadeInUp} className="my-section" delay={0.2}>
  <h2>My Animated Section</h2>
</AnimatedSection>;
```

### 3. AnimatedText

Animates text elements with custom HTML tags.

```tsx
import AnimatedText from "@/components/ui/AnimatedText";

<AnimatedText as="h1" className="text-4xl font-bold" delay={0.4}>
  Animated Heading
</AnimatedText>;
```

### 4. AnimatedImage

Animates images with scale and fade effects.

```tsx
import AnimatedImage from "@/components/ui/AnimatedImage";

<AnimatedImage
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  delay={0.6}
/>;
```

### 5. AnimatedList

Animates lists with stagger effects.

```tsx
import AnimatedList from "@/components/ui/AnimatedList";

<AnimatedList
  className="grid grid-cols-3 gap-4"
  staggerDelay={0.1}
  itemDelay={0.2}
>
  {items.map((item) => (
    <Item key={item.id} />
  ))}
</AnimatedList>;
```

### 6. AnimatedCounter

Animates numbers counting up to their target value.

```tsx
import AnimatedCounter from "@/components/ui/AnimatedCounter";

<AnimatedCounter
  value={87}
  suffix="/100"
  duration={2}
  className="text-2xl font-bold"
/>;
```

## Animation Variants

### Pre-built Variants

Located in `lib/animations.ts`:

- `fadeInUp` - Fade in from bottom
- `fadeInLeft` - Fade in from left
- `fadeInRight` - Fade in from right
- `fadeIn` - Simple fade in
- `scaleIn` - Scale in from center
- `slideInFromBottom` - Slide in from bottom
- `staggerContainer` - Container for stagger animations
- `staggerItem` - Individual item in stagger animation

### Custom Variants

Create custom animations using the `createAnimation` utility:

```tsx
import { createAnimation } from "@/lib/animations";

const customAnimation = createAnimation(
  { opacity: 0, x: -100, rotate: -10 },
  { opacity: 1, x: 0, rotate: 0 },
  { duration: 0.8, ease: "easeOut" }
);
```

## Animation Presets

Use predefined animation combinations for common sections:

```tsx
import { animationPresets } from '@/lib/animations';

// Hero section animations
<AnimatedText variants={animationPresets.hero.title}>
  Hero Title
</AnimatedText>

<AnimatedText variants={animationPresets.hero.subtitle}>
  Hero Subtitle
</AnimatedText>

// Features section with stagger
<AnimatedList
  variants={animationPresets.features.container}
  itemVariants={animationPresets.features.item}
>
  {features.map(feature => <FeatureCard key={feature.id} />)}
</AnimatedList>
```

## Best Practices

### 1. Performance

- Use `once={true}` for animations that should only trigger once
- Avoid animating too many elements simultaneously
- Use `transform` and `opacity` properties for smooth animations

### 2. Accessibility

- Animations respect `prefers-reduced-motion` setting
- Provide meaningful delays between related animations
- Ensure animations don't interfere with user interactions

### 3. Timing

- Use consistent timing across similar elements
- Stagger animations for lists (0.1s - 0.2s between items)
- Keep individual animation durations under 1 second

### 4. Easing

- Use the custom easing curve: `[0.25, 0.46, 0.45, 0.94]`
- This provides a natural, professional feel

## Common Patterns

### Hero Section

```tsx
<AnimatedSection variants={fadeInLeft}>
  <Badge>Smart Investment</Badge>
  <AnimatedText as="h1" delay={0.2}>
    Main Title
  </AnimatedText>
  <AnimatedText as="p" delay={0.4}>
    Subtitle
  </AnimatedText>
  <AnimatedSection delay={0.6}>
    <Button>Call to Action</Button>
  </AnimatedSection>
</AnimatedSection>
```

### Feature Grid

```tsx
<AnimatedList
  className="grid grid-cols-3 gap-8"
  variants={staggerContainer}
  itemVariants={staggerItem}
>
  {features.map((feature) => (
    <Card key={feature.id}>
      <FeatureContent />
    </Card>
  ))}
</AnimatedList>
```

### Statistics Counter

```tsx
<div className="text-center">
  <AnimatedCounter
    value={1500}
    prefix="£"
    suffix="K"
    duration={2}
    className="text-4xl font-bold text-primary"
  />
  <p>Total Value Analyzed</p>
</div>
```

## Configuration

### Animation Speed

Control global animation speed through the AnimationProvider:

```tsx
<AnimationProvider animationSpeed="fast">{children}</AnimationProvider>
```

Available speeds: `slow`, `normal`, `fast`

### Scroll Threshold

Adjust when animations trigger:

```tsx
import { scrollAnimationOptions } from "@/lib/animations";

// Default: triggers when 10% of element is visible
const customOptions = {
  threshold: 0.2, // 20% visible
  rootMargin: "0px 0px -100px 0px", // 100px before viewport
};
```

## Troubleshooting

### Animations Not Triggering

1. Check if element is in viewport
2. Verify `useInView` hook is working
3. Ensure proper ref assignment

### Performance Issues

1. Reduce number of simultaneous animations
2. Use `will-change: transform` for complex animations
3. Consider using `transform` instead of changing layout properties

### Accessibility Concerns

1. Test with `prefers-reduced-motion: reduce`
2. Ensure animations don't cause motion sickness
3. Provide alternative content for motion-sensitive users

## Examples

See the home page (`app/page.tsx`) for comprehensive examples of scroll animations in action, including:

- Hero section with staggered text and buttons
- Feature grid with stagger animations
- Call-to-action section with coordinated timing
- Counter animations for statistics
