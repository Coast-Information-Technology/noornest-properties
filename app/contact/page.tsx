"use client";

import Newsletter from "@/components/layout/Newsletter";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedText from "@/components/ui/AnimatedText";
import { fadeInUp } from "@/lib/animations";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Twitter,
  Instagram,
  Globe,
} from "lucide-react";
import Link from "next/link";

const ContactPage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-background lg:h-screen">
        <div className="bg-primary lg:h-[70vh] pb-12 lg:pb-20">
          <AnimatedSection
            variants={fadeInUp}
            className="space-y-6 grid grid-cols-1 lg:grid-cols-2 lg:items-center w-full py-12 px-6 md:px-16"
          >
            {/* Text Content */}
            <div className="space-y-4">
              <div className="text-center space-y-4 sm:space-y-6 lg:text-left">
                <AnimatedText
                  as="h1"
                  className="text-3xl lg:text-[2.5rem] font-bold tracking-tight text-white leading-tight"
                  delay={0.2}
                >
                  Let&apos;s Talk -<br />
                  We&apos;re Here to Help
                </AnimatedText>
              </div>
            </div>

            {/* Description + Buttons */}
            <div className="space-y-4">
              <div className="text-center lg:text-left">
                <AnimatedText
                  as="p"
                  className="text-sm text-white max-w-4xl mx-auto leading-relaxed px-4"
                  delay={0.2}
                >
                  Whether you’re looking to buy, sell, or invest, our team is
                  ready to guide your property journey. Get in touch today and
                  we’ll respond within 24 hours.
                </AnimatedText>
              </div>
            </div>
          </AnimatedSection>

          {/* Hero Image */}
          <div className="flex justify-center w-full h-[250px] md:max-w-[60vw] lg:h-[400px] mx-auto rounded-[10px] lg:rounded-[20px] px-8">
            <Image
              src="/contact/contact-hero.png"
              alt="simplified properties in the UK"
              width={500}
              height={300}
              className="object-cover w-full h-full rounded-[20px]"
            />
          </div>
        </div>
      </section>
      {/* contact form */}
      <section className="bg-amber-50 py-20 px-6 md:px-16 text-center lg:text-left lg:mt-16">
        <h3 className="text-lg tracking-wide text-black uppercase font-bold">
          Contact Us
        </h3>
        <h2 className="max-w-4xl text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
          Fill out the form below and one of our advisors will get back to you
          shortly.
        </h2>

        <div
          id="contact"
          aria-labelledby="contact-heading"
          className="bg-white text-gray-800 py-8 px-4 sm:px-6 lg:px-12 rounded-[20px] shadow-md mt-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8"
          >
            {/* ---- Contact Info ---- */}
            <div className="bg-accent text-gray-800 rounded-xl p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-12 text-yellow-800">
                  Reach Us Directly
                </h3>

                <ul className="space-y-5 text-sm">
                  <li className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-yellow-800" />
                    <span>London, UK</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-yellow-800" />
                    <Link
                      href="mailto:support@noornest.co.uk"
                      className="hover:underline focus:underline"
                    >
                      support@noornest.co.uk
                    </Link>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-yellow-800" />
                    <Link
                      href="tel:+442012345678"
                      className="hover:underline focus:underline"
                    >
                      +44 (0)20 3983 8559
                    </Link>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-yellow-800" />
                    <span>Mon – Sat, 7 AM – 6 PM</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-6 mt-10" aria-label="Social media links">
                <Link
                  href="#"
                  aria-label="Twitter"
                  className="hover:text-yellow-700 focus:text-yellow-700"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  aria-label="Instagram"
                  className="hover:text-yellow-700 focus:text-yellow-700"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  aria-label="Website"
                  className="hover:text-yellow-700 focus:text-yellow-700"
                >
                  <Globe className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* ---- Contact Form ---- */}
            <div className="order-1 lg:order-none bg-white p-6 rounded-xl text-left">
              <h2
                id="contact-heading"
                className="text-2xl font-bold mb-6 text-gray-900"
              >
                Get in Touch
              </h2>

              <form className="space-y-6" aria-label="Contact form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      autoComplete="given-name"
                      className="mt-1 w-full border-b border-gray-300 focus:border-primary focus:outline-none py-2"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      autoComplete="family-name"
                      className="mt-1 w-full border-b border-gray-300 focus:border-primary focus:outline-none py-2"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      className="mt-1 w-full border-b border-gray-300 focus:border-primary focus:outline-none py-2"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      className="mt-1 w-full border-b border-gray-300 focus:border-primary focus:outline-none py-2"
                    />
                  </div>
                </div>

                <fieldset>
                  <legend className="text-sm font-semibold text-gray-800">
                    Select Subject
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm">
                    {[
                      "Property Enquiry",
                      "Investment Plans",
                      "Services",
                      "Partnerships",
                      "General Question",
                    ].map((subject) => (
                      <label
                        key={subject}
                        className="inline-flex items-center gap-2"
                      >
                        <input
                          type="radio"
                          name="subject"
                          value={subject}
                          className="text-primary focus:ring-primary"
                        />
                        {subject}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Write your message..."
                    className="mt-1 w-full border-b border-gray-300 focus:border-primary focus:outline-none py-2 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full md:w-auto bg-primary text-white font-semibold px-8 py-3 rounded-md hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
      <Newsletter />
    </main>
  );
};

export default ContactPage;
