// components/ui/NewsletterFormExamples.tsx
// This file shows different ways to use the NewsletterForm component

import NewsletterForm from "./NewsletterForm";

// Example 1: Default newsletter form
export function DefaultNewsletterForm() {
  return (
    <NewsletterForm
      placeholder="Enter your email address"
      buttonText="Subscribe Now"
    />
  );
}

// Example 2: Custom styling for a specific section
export function CustomStyledNewsletterForm() {
  const handleSubmit = async (email: string) => {
    // Custom logic for this specific form
    console.log("Custom newsletter subscription:", email);

    // Example: Send to different newsletter service
    // await customNewsletterService.subscribe(email, { source: 'landing-page' });
  };

  return (
    <NewsletterForm
      placeholder="Join our exclusive list"
      buttonText="Get Updates"
      onSubmit={handleSubmit}
      inputClassName="bg-gray-100 border-gray-300 focus:border-blue-500"
      buttonClassName="bg-blue-600 hover:bg-blue-700"
      successDuration={5000} // Show success for 5 seconds
    />
  );
}

// Example 3: Minimal newsletter form without success state
export function MinimalNewsletterForm() {
  const handleSubmit = async (email: string) => {
    // Quick submission without visual feedback
    await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  };

  return (
    <NewsletterForm
      placeholder="Email address"
      buttonText="Subscribe"
      onSubmit={handleSubmit}
      showSuccessState={false}
      className="max-w-sm mx-auto"
    />
  );
}

// Example 4: Newsletter form for footer
export function FooterNewsletterForm() {
  const handleFooterSubmit = async (email: string) => {
    // Footer-specific newsletter logic
    console.log("Footer newsletter subscription:", email);

    // Example: Track footer newsletter signups
    // analytics.track('newsletter_signup', { location: 'footer' });
  };

  return (
    <NewsletterForm
      placeholder="Stay updated"
      buttonText="Join"
      onSubmit={handleFooterSubmit}
      inputClassName="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
      buttonClassName="bg-white text-black hover:bg-white/90"
      className="max-w-xs"
    />
  );
}

// Example 5: Newsletter form with custom container
export function ContainedNewsletterForm() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-2xl">
      <h3 className="text-white text-xl font-bold mb-4">Stay in the Loop</h3>
      <p className="text-white/90 mb-6">
        Get the latest updates delivered to your inbox.
      </p>

      <NewsletterForm
        placeholder="Your email address"
        buttonText="Subscribe"
        inputClassName="bg-white border-white/30 focus:ring-purple-500"
        buttonClassName="bg-purple-700 hover:bg-purple-800"
      />
    </div>
  );
}
