"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroCarouselProps {
    images: string[];
}

export default function HeroCarousel({ images }: HeroCarouselProps) {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    // Auto-play effect
    useEffect(() => {
        if (!isPaused) {
            intervalRef.current = setInterval(() => {
                setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
            }, 5000); // Increased interval slightly for better UX
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused, images.length]);

    return (
        <section className="relative w-full h-[70vh] overflow-hidden">
            {/* Carousel Images */}
            <div
                className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative w-full h-full flex-shrink-0"
                    >
                        <Image
                            src={image}
                            alt={`Property ${index + 1}`}
                            fill
                            priority={index === 0}
                            fetchPriority={index === 0 ? "high" : "auto"}
                            sizes="100vw"
                            quality={index === 0 ? 90 : 85}
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 z-10"
                aria-hidden="true"
            />

            {/* Controls */}
            <div className="z-20 absolute inset-0 pointer-events-none">
                <button
                    onClick={() => {
                        setIsPaused(true);
                        prevSlide();
                    }}
                    onMouseLeave={() => setIsPaused(false)}
                    aria-label="Previous slide"
                    className="pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 rounded-md p-2 shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                    onClick={() => {
                        setIsPaused(true);
                        nextSlide();
                    }}
                    onMouseLeave={() => setIsPaused(false)}
                    aria-label="Next slide"
                    className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 rounded-md p-2 shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setIsPaused(true);
                            setCurrent(index);
                        }}
                        onMouseLeave={() => setIsPaused(false)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === current
                                ? "bg-white w-8"
                                : "bg-white/50 hover:bg-white/75"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
