// components/FeaturesSection.jsx
"use client"
import React from 'react';
import Link from 'next/link';
// FIX: Assuming you installed lucide-react, import from the correct package
import { CalendarDays, MapPin, Music, User } from 'lucide-react'; 
// Note: You must run 'npm install lucide-react' if you haven't already.


// Dummy data for the feature items
const featuresData = [
    {
        id: 'feat-1',
        icon: <CalendarDays size={40} />,
        title: '7/24 EVENT AVAILABLE',
        // --- UPDATED DESCRIPTION ---
        description: 'Access and book events anytime, day or night. Our platform provides continuous availability and real-time updates.',
        // ---------------------------
        link: '/features/availability'
    },
    {
        id: 'feat-2',
        icon: <MapPin size={40} />,
        title: 'GREAT LOCATIONS',
        // --- UPDATED DESCRIPTION ---
        description: 'Discover world-class venues and iconic destinations. We handpick locations that enhance your event experience.',
        // ---------------------------
        link: '/features/locations'
    },
    {
        id: 'feat-3',
        icon: <User size={40} />,
        title: 'MORE THAN 200 SPEAKERS',
        // --- UPDATED DESCRIPTION ---
        description: 'Engage with top industry leaders, innovators, and thought-provokers from across the globe.',
        // ---------------------------
        link: '/features/speakers'
    },
    {
        id: 'feat-4',
        icon: <Music size={40} />,
        title: 'LETS PARTY AFTER EVENT',
        // --- UPDATED DESCRIPTION ---
        description: 'Extend the networking and fun! Join our exclusive after-parties to connect and unwind with attendees and speakers.',
        // ---------------------------
        link: '/features/after-party'
    },
];

const FeaturesSection = () => {
    return (
        <section className="py-30 bg-primary/90">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {featuresData.map(feature => (
                        <div key={feature.id} className="flex flex-col items-center p-4">
                            {/* Hexagon icon container */}
                            <div className="relative w-28 h-28 mb-6">
                                {/* Base hexagon shape now relies on global CSS */}
                                <div className="absolute inset-0 bg-accent hexagon flex items-center justify-center">
                                    {/* Removed text-5xl from span and moved icon size to the prop */}
                                    <span className="text-gray-700">
                                        {feature.icon} 
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-white  uppercase mb-2">
                                {feature.title}
                            </h3>
                            <div className="w-12 h-1 bg-red-500 mb-4"></div> {/* Red underline */}
                            <p className="text-gray-200 mb-6 max-w-xs">
                                {feature.description}
                            </p>
                            
                        </div>
                    ))}
                </div>
            </div>

            {/* REMOVED: <style jsx> block */}
        </section>
    );
};

export default FeaturesSection;