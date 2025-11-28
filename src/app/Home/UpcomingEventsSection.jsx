"use client";

import React from 'react';
import Image from 'next/image';

const upcomingEventsData = [
    {
        id: 'upcoming-1',
        title: 'Jazz Night Live',
        date: 'December 20, 2025',
        location: 'The Blue Note Jazz Club',
        image: '/assets/upcom-1.jpg',
    },
    {
        id: 'upcoming-2',
        title: 'AI & Robotics Expo',
        date: 'January 15, 2026',
        location: 'Tech Convention Center',
        image: '/assets/upcom-2.jpg',
    },
    {
        id: 'upcoming-3',
        title: 'Local Art Fair',
        date: 'February 1, 2026',
        location: 'Community Art Gallery',
        image: '/assets/upcom-3.webp',
    },
];

const UpcomingEventsSection = () => {
    return (
        <section className="py-16 bg-accent">
            <div className="container mx-auto px-5 py-5">
                
                {/* Title */}
                <h2 className="text-4xl font-bold text-primary mb-16">
                    Upcoming Events
                </h2>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {upcomingEventsData.map(event => (
                        <div 
                            key={event.id}
                            className="
                                bg-white rounded-xl shadow-lg overflow-hidden 
                                hover:shadow-2xl hover:-translate-y-2 
                                transition-all duration-300 
                                group
                            "
                        >
                            {/* Image */}
                            <div className="relative h-48 w-full">
                                <Image
                                
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-all duration-500"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                                    {event.title}
                                </h3>

                                <p className="text-gray-600 font-medium">
                                    {event.date}
                                </p>

                                <p className="text-gray-500 text-sm mt-1">
                                    {event.location}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default UpcomingEventsSection;
