// components/UpcomingEventsSection.jsx
"use client"; // If it needs client-side interactivity like buttons, otherwise remove

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Dummy data for upcoming events
const upcomingEventsData = [
    {
        id: 'upcoming-1',
        title: 'Jazz Night Live',
        date: 'December 20, 2025',
        location: 'The Blue Note Jazz Club',
        image: '/assets/upcom-1.jpg', 
        link: '/events/jazz-night-live'
    },
    {
        id: 'upcoming-2',
        title: 'AI & Robotics Expo',
        date: 'January 15, 2026',
        location: 'Tech Convention Center',
        image: '/assets/upcom-2.jpg',
        link: '/events/ai-robotics-expo'
    },
    {
        id: 'upcoming-3',
        title: 'Local Art Fair',
        date: 'February 1, 2026',
        location: 'Community Art Gallery',
        image: '/assets/upcom-3.webp',
        link: '/events/local-art-fair'
    },
];

const UpcomingEventsSection = () => {
    return (
        <section className="py-16 bg-accent my-10">
            <div className="container mx-auto px-5  py-5">
                <h2 className="text-4xl font-bold  text-primary mb-12">Upcoming Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEventsData.map(event => (
                        <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    style={{ objectFit: 'cover' }}
                                    className="rounded-t-lg"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                                <p className="text-gray-600 mb-1">{event.date}</p>
                                <p className="text-gray-500 text-sm mb-4">{event.location}</p>
                                <Link
                                    href={event.link}
                                    className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                
            </div>
        </section>
    );
};

export default UpcomingEventsSection;