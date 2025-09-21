// data/testimonials.ts
import { Testimonial } from "@/components/testimonial/TestimonialCarousel";

export const clientTestimonials: Testimonial[] = [
  {
    quote:
      "As an agent, I appreciate how easy it is to upload listings and connect with verified buyers. Noornest has saved me hours compared to other platforms.",
    author: "Sophie A.",
    role: "Real Estate Agent",
    image: "/client.jpg",
  },
  {
    quote:
      "Noornest gave me access to serious buyers. The verification process is smooth, and I feel more confident listing my properties.",
    author: "James T.",
    role: "Property Consultant",
    image: "/client.jpg",
  },
  {
    quote:
      "The platform has streamlined my workflow and connected me with buyers across multiple cities. Highly recommend it.",
    author: "Sarah L.",
    role: "Broker",
    image: "/client.jpg",
  },
];

// You can create additional testimonial arrays for different sections
export const investorTestimonials: Testimonial[] = [
  {
    quote:
      "Noornest's investment opportunities have been game-changing for my portfolio. The returns are consistent and the team is professional.",
    author: "Michael R.",
    role: "Real Estate Investor",
    image: "/client.jpg",
  },
  {
    quote:
      "The BMV properties I found through Noornest have exceeded my expectations. Great platform for serious investors.",
    author: "Emma K.",
    role: "Property Investor",
    image: "/client.jpg",
  },
];

export const buyerTestimonials: Testimonial[] = [
  {
    quote:
      "Found my dream home through Noornest. The verification process gave me confidence in the property and the seller.",
    author: "David P.",
    role: "Home Buyer",
    image: "/client.jpg",
  },
  {
    quote:
      "The platform made house hunting so much easier. All properties are verified and the search filters are excellent.",
    author: "Lisa M.",
    role: "First-time Buyer",
    image: "/client.jpg",
  },
];
