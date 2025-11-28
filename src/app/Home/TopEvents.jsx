"use client";

import React, { useEffect, useState } from "react";

import EventCard from "../all-event/shared/EventCard";
import Loader from "../../GlobalComponent/Loader";

const TopEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://nextevent-server.vercel.app/events")
            .then((res) => res.json())
            .then((data) => {
                setEvents(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <Loader />;

    const topSixEvents = events.slice(0, 3); // Take first 6 events

    return (
        <div className="bg-accent py-10">
            <section className="container mx-auto  py-16 px-6 md:px-12">
                <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-12">
                    Top Events
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topSixEvents.map((event) => (
                        <EventCard key={event._id || event.slug} event={event} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TopEvents;
