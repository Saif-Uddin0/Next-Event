"use client";

import React from 'react';

const CountdownTimer = ({ dateTimeString }) => {

    if (!dateTimeString) return null;

    const eventDate = new Date(dateTimeString);

    // Date formatting
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Time formatting
    const formattedTime = eventDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    return (
        <div className="flex flex-col items-center backdrop-blur-md bg-black/20 px-4 py-2 sm:px-5 sm:py-3 rounded-full border border-white/10">
            <span className="text-base sm:text-xl md:text-3xl font-bold text-white leading-tight">
                {formattedDate}
            </span>
            <span className="text-sm sm:text-lg md:text-2xl font-semibold text-white">
                {formattedTime}
            </span>
        </div>
    );
};

export default CountdownTimer;
