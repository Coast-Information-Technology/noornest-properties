"use client";

import { colors, semanticColors } from "@/lib/colors";

export default function ColorShowcase() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-2xl font-bold text-secondary mb-4">Brand Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Primary Color */}
          <div className="space-y-2">
            <div className="h-24 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                Primary
              </span>
            </div>
            <p className="text-sm text-muted-foreground">#BFA14A</p>
            <p className="text-xs text-muted-foreground">Gold/Bronze</p>
          </div>

          {/* Secondary Color */}
          <div className="space-y-2">
            <div className="h-24 rounded-lg bg-secondary flex items-center justify-center">
              <span className="text-secondary-foreground font-bold text-lg">
                Secondary
              </span>
            </div>
            <p className="text-sm text-muted-foreground">#0A0A0A</p>
            <p className="text-xs text-muted-foreground">Near Black</p>
          </div>

          {/* Accent Color */}
          <div className="space-y-2">
            <div className="h-24 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">
                Accent
              </span>
            </div>
            <p className="text-sm text-muted-foreground">#EADBC8</p>
            <p className="text-xs text-muted-foreground">Cream/Beige</p>
          </div>
        </div>
      </div>

      {/* Color Palette */}
      <div>
        <h3 className="text-xl font-semibold text-secondary mb-4">
          Color Palette
        </h3>
        <div className="space-y-4">
          {/* Primary Palette */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Primary Shades
            </h4>
            <div className="flex space-x-2">
              {Object.entries(colors.primary).map(([shade, color]) => (
                <div key={shade} className="text-center">
                  <div
                    className="w-12 h-12 rounded-lg border"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-xs text-muted-foreground mt-1">{shade}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Palette */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Secondary Shades
            </h4>
            <div className="flex space-x-2">
              {Object.entries(colors.secondary).map(([shade, color]) => (
                <div key={shade} className="text-center">
                  <div
                    className="w-12 h-12 rounded-lg border"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-xs text-muted-foreground mt-1">{shade}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Accent Palette */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Accent Shades
            </h4>
            <div className="flex space-x-2">
              {Object.entries(colors.accent).map(([shade, color]) => (
                <div key={shade} className="text-center">
                  <div
                    className="w-12 h-12 rounded-lg border"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-xs text-muted-foreground mt-1">{shade}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div>
        <h3 className="text-xl font-semibold text-secondary mb-4">
          Usage Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buttons */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">
              Buttons
            </h4>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Primary Button
              </button>
              <button className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors">
                Secondary Button
              </button>
              <button className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors">
                Accent Button
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">Cards</h4>
            <div className="space-y-2">
              <div className="p-4 bg-accent/30 border border-accent rounded-lg">
                <p className="text-sm text-secondary">Accent background card</p>
              </div>
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-sm text-secondary">Primary tinted card</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
