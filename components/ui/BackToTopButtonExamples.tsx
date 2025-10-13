"use client";

import React from "react";
import BackToTopButton from "./BackToTopButton";

// Example 1: Default back to top button
export function DefaultBackToTop() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Default Back to Top Button</h3>
      <p className="text-muted-foreground">
        Scroll down to see the default back to top button appear.
      </p>
      <BackToTopButton />
    </div>
  );
}

// Example 2: Custom positioned button
export function CustomPositionBackToTop() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Custom Position</h3>
      <p className="text-muted-foreground">
        Button positioned on the bottom left with custom threshold.
      </p>
      <BackToTopButton
        position="bottom-left"
        threshold={200}
        size="lg"
        color="secondary"
      />
    </div>
  );
}

// Example 3: Custom styled button
export function CustomStyledBackToTop() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Custom Styled</h3>
      <p className="text-muted-foreground">
        Button with custom color and styling.
      </p>
      <BackToTopButton
        position="bottom-center"
        size="md"
        color="custom"
        customColor="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        className="shadow-2xl"
      />
    </div>
  );
}

// Example 4: Small button for mobile
export function MobileBackToTop() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Mobile Optimized</h3>
      <p className="text-muted-foreground">
        Small button optimized for mobile devices.
      </p>
      <BackToTopButton
        position="bottom-right"
        size="sm"
        threshold={150}
        color="accent"
      />
    </div>
  );
}

// Example 5: Multiple buttons demonstration
export function MultipleButtonsDemo() {
  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold">Multiple Buttons Demo</h3>
      <p className="text-muted-foreground">
        Different configurations of back to top buttons.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Primary (Default)</h4>
          <BackToTopButton position="bottom-right" />
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Secondary</h4>
          <BackToTopButton
            position="bottom-right"
            color="secondary"
            threshold={100}
          />
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Accent</h4>
          <BackToTopButton position="bottom-right" color="accent" size="lg" />
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Custom Gradient</h4>
          <BackToTopButton
            position="bottom-right"
            color="custom"
            customColor="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          />
        </div>
      </div>
    </div>
  );
}

// Example 6: Long content to test scrolling
export function ScrollTestContent() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Scroll Test Content</h3>
      <p className="text-muted-foreground">
        Scroll down through this content to test the back to top button.
      </p>

      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="p-6 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Content Section {i + 1}</h4>
            <p className="text-muted-foreground">
              This is some sample content to demonstrate the back to top button
              functionality. Scroll down to see the button appear, then click it
              to smoothly scroll back to the top.
            </p>
          </div>
        ))}
      </div>

      <BackToTopButton position="bottom-right" threshold={300} />
    </div>
  );
}
