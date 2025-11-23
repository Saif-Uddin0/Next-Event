// components/FeaturesSection.jsx
"use client"
import React from 'react';
import Link from 'next/link';

// Dummy data for the feature items
const featuresData = [
    {
        id: 'feat-1',
        icon: '📅', // Placeholder icon. Replace with actual icons (e.g., from React Icons)
        title: '7/24 EVENT AVAILABLE',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed vel velit.',
        link: '/features/availability'
    },
    {
        id: 'feat-2',
        icon: '📍', // Placeholder icon
        title: 'GREAT LOCATIONS',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed vel velit.',
        link: '/features/locations'
    },
    {
        id: 'feat-3',
        icon: '👤', // Placeholder icon
        title: 'MORE THAN 200 SPEAKERS',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed vel velit.',
        link: '/features/speakers'
    },
    {
        id: 'feat-4',
        icon: '🎵', // Placeholder icon
        title: 'LETS PARTY AFTER EVENT',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed vel velit.',
        link: '/features/after-party'
    },
];

const FeaturesSection = () => {
    return (
        <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
                {/* No main title for this section based on the image, but you can add one */}
                {/* <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Why Choose Us?</h2> */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {featuresData.map(feature => (
                        <div key={feature.id} className="flex flex-col items-center p-4">
                            {/* Hexagon icon container */}
                            <div className="relative w-28 h-28 mb-6">
                                {/* Base hexagon shape */}
                                <div className="absolute inset-0 bg-gray-400 hexagon flex items-center justify-center">
                                    <span className="text-5xl text-white">{feature.icon}</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-800 uppercase mb-2">
                                {feature.title}
                            </h3>
                            <div className="w-12 h-1 bg-red-500 mb-4"></div> {/* Red underline */}
                            <p className="text-gray-600 mb-6 max-w-xs">
                                {feature.description}
                            </p>
                            <Link
                                href={feature.link}
                                className="inline-block px-6 py-2 border border-gray-400 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors duration-200"
                            >
                                DETAILS
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tailwind CSS for the hexagon shape */}
            <style jsx>{`
                .hexagon {
                    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
                }
            `}</style>
        </section>
    );
};

export default FeaturesSection;