"use client";

import CountUp from "react-countup";

export default function ImpactMetrics() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[150px]">
            {/* Tall first card */}
            <div className="row-span-3 bg-accent rounded-lg shadow-sm p-6 flex flex-col justify-center items-center text-center">
                <CountUp
                    end={500}
                    suffix="+"
                    duration={3.5}
                    className="text-2xl md:text-3xl font-bold"
                />
                <p className="mt-2 text-gray-700 text-base">
                    Verified Properties
                </p>
            </div>

            {/* Rest of the cards */}
            <div className="row-span-2 bg-accent rounded-lg shadow-sm p-6 flex flex-col justify-center items-center text-center">
                <CountUp
                    end={200}
                    suffix="+"
                    duration={3.5}
                    className="text-3xl md:text-4xl font-bold"
                />
                <p className="mt-2 text-gray-700">Blog Articles</p>
            </div>

            <div className="bg-accent rounded-lg shadow-sm p-6 flex flex-col justify-center items-center text-center">
                <CountUp
                    end={150}
                    suffix="+"
                    duration={3.5}
                    className="text-3xl md:text-4xl font-bold"
                />
                <p className="mt-2 text-gray-700">Agent Partnerships</p>
            </div>

            <div className="row-span-2 bg-accent rounded-lg shadow-sm p-6 flex flex-col justify-center items-center text-center">
                <CountUp
                    end={1000}
                    suffix="+"
                    duration={3.5}
                    className="text-3xl md:text-4xl font-bold"
                />
                <p className="mt-2 text-gray-700">Active Users</p>
            </div>

            <div className="bg-accent rounded-lg shadow-sm p-6 flex flex-col justify-center items-center text-center">
                <CountUp
                    end={50}
                    suffix="+"
                    duration={3.5}
                    className="text-3xl md:text-4xl font-bold"
                />
                <p className="mt-2 text-gray-700">Cities Covered</p>
            </div>
        </div>
    );
}
