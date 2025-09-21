# TestimonialCarousel Component

A highly reusable and configurable testimonial carousel component built with React, TypeScript, and Framer Motion.

## Features

- ✅ **Fully Responsive** - Works on desktop, tablet, and mobile
- ✅ **Customizable Styling** - Colors, backgrounds, and spacing
- ✅ **Auto-slide** - Configurable auto-advance timing
- ✅ **Navigation Controls** - Previous/Next buttons and dot indicators
- ✅ **Smooth Animations** - Powered by Framer Motion
- ✅ **TypeScript Support** - Full type safety
- ✅ **Accessibility** - ARIA labels and keyboard navigation

## Usage

### Basic Usage

```tsx
import TestimonialCarousel from "@/components/testimonial/TestimonialCarousel";
import { clientTestimonials } from "@/data/testimonials";

export default function MyPage() {
  return (
    <TestimonialCarousel
      testimonials={clientTestimonials}
      title="What Our Clients Say"
      subtitle="TESTIMONIALS"
    />
  );
}
```

### Advanced Usage with Custom Styling

```tsx
import TestimonialCarousel from "@/components/testimonial/TestimonialCarousel";
import { investorTestimonials } from "@/data/testimonials";

export default function InvestorSection() {
  return (
    <TestimonialCarousel
      testimonials={investorTestimonials}
      title="What Our Investors Say"
      subtitle="INVESTOR STORIES"
      backgroundColor="bg-gray-50"
      cardBackgroundColor="#E8F4FD"
      primaryColor="#2563EB"
      accentColor="#1D4ED8"
      autoSlideInterval={8000}
      showNavigation={true}
      showDots={true}
    />
  );
}
```

## Props

| Prop                  | Type            | Default                  | Description                                        |
| --------------------- | --------------- | ------------------------ | -------------------------------------------------- |
| `testimonials`        | `Testimonial[]` | **Required**             | Array of testimonial objects                       |
| `title`               | `string`        | `"What Our Clients Say"` | Main heading text                                  |
| `subtitle`            | `string`        | `"TESTIMONIALS"`         | Subtitle text                                      |
| `autoSlideInterval`   | `number`        | `6000`                   | Auto-slide interval in milliseconds (0 to disable) |
| `showNavigation`      | `boolean`       | `true`                   | Show navigation buttons                            |
| `showDots`            | `boolean`       | `true`                   | Show dot indicators                                |
| `backgroundColor`     | `string`        | `"bg-white"`             | Section background color class                     |
| `cardBackgroundColor` | `string`        | `"#F5F1EB"`              | Card background color (hex)                        |
| `primaryColor`        | `string`        | `"#C8A970"`              | Primary color for buttons and accents (hex)        |
| `accentColor`         | `string`        | `"#b3925d"`              | Hover/accent color (hex)                           |
| `className`           | `string`        | `""`                     | Additional CSS classes                             |

## Testimonial Data Structure

```tsx
interface Testimonial {
  quote: string; // The testimonial text
  author: string; // Author's name
  role: string; // Author's role/position
  image: string; // Image path/URL
}
```

## Pre-built Testimonial Data

The component comes with pre-built testimonial arrays in `data/testimonials.ts`:

- `clientTestimonials` - General client testimonials
- `investorTestimonials` - Real estate investor testimonials
- `buyerTestimonials` - Home buyer testimonials

## Examples

See `components/testimonial/TestimonialExamples.tsx` for various usage examples:

1. **DefaultTestimonials** - Basic usage with default settings
2. **InvestorTestimonials** - Custom styling for investor section
3. **BuyerTestimonials** - Minimal navigation setup
4. **StaticTestimonials** - No auto-slide, no navigation
5. **CustomTestimonials** - Single testimonial with custom styling

## Responsive Behavior

- **Desktop (md+)**: Shows the overlapping card design with image and navigation button
- **Mobile/Tablet (<md)**: Shows simplified card layout with image at top and navigation below

## Accessibility

- ARIA labels for all interactive elements
- Keyboard navigation support
- Screen reader friendly structure
- High contrast color support

## Dependencies

- React 18+
- TypeScript
- Framer Motion
- Next.js Image component
- Lucide React icons
- React Icons

## Customization Tips

1. **Colors**: Use hex values for `cardBackgroundColor`, `primaryColor`, and `accentColor`
2. **Auto-slide**: Set `autoSlideInterval={0}` to disable auto-advance
3. **Navigation**: Use `showNavigation={false}` and `showDots={false}` for static display
4. **Styling**: Add custom classes via the `className` prop
5. **Data**: Create your own testimonial arrays following the `Testimonial` interface
