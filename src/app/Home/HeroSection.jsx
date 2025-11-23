"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import CountdownTimer from './CountdownTimer';

const eventsData = [
    {
        id: 1,
        title: "Summer Music Festival",
        description: "Get ready for the hottest music event of the year!",
        image: "/assets/Hero1.jpg",
        targetDate: "2026-08-15T18:00:00",
        location: "Central Park, New York",
        link: "/all-event"
    },
    {
        id: 2,
        title: "Tech Innovation Summit",
        description: "Explore the future of technology with industry leaders.",
        image: "/assets/Hero2.avif",
        targetDate: "2026-09-10T09:00:00",
        location: "San Francisco",
        link: "/all-event"
    },
    {
        id: 3,
        title: "Art & Culture Expo",
        description: "A vibrant showcase of contemporary art & performances.",
        image: "/assets/Hero3.webp",
        targetDate: "2026-10-25T10:00:00",
        location: "London",
        link: "/all-event"
    },
];

const HeroSection = () => {
    return (
        <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[85vh] lg:h-[90vh] overflow-hidden">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="h-full"
            >
                {eventsData.map((event) => (
                    <SwiperSlide key={event.id}>
                        <div className="relative w-full h-full">
                            <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover"
                                priority
                            />

                            {/* Overlay content */}
                            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4 md:px-8">
                                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg mb-3 leading-tight">
                                    {event.title}
                                </h1>

                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-xl md:max-w-3xl drop-shadow-md mb-6">
                                    {event.description}
                                </p>

                                {/* CountdownTimer */}
                                <div className="mb-6 sm:mb-8">
                                    <CountdownTimer dateTimeString={event.targetDate} />
                                </div>

                                {/* CTA Button */}
                                <Link
                                    href={event.link}
                                    className="px-5 py-3 sm:px-7 sm:py-4 bg-primary text-white text-sm sm:text-lg font-semibold rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                                >
                                    Explore Our Event
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default HeroSection;
