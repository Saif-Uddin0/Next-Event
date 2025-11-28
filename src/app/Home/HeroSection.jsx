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
        description: "Get ready for the hottest music event of the year! Featuring top artists across multiple genres.",
        image: "/assets/Hero1.jpg", 
        targetDate: "2026-06-15T18:00:00", 
        location: "Central Park, New York",
        link: "/all-event"
    },
    {
        id: 2,
        title: "Tech Innovation Summit",
        description: "Explore the future of technology with industry leaders and groundbreaking presentations.",
        image: "/assets/Hero2.avif", 
        targetDate: "2026-07-10T09:00:00",
        location: "Convention Center, San Francisco",
        link: "/all-event"
    },
    {
        id: 3,
        title: "Art & Culture Expo",
        description: "A vibrant showcase of contemporary art, traditional crafts, and cultural performances.",
        image: "/assets/Hero3.webp", 
        targetDate: "2026-08-25T10:00:00", 
        location: "Grand Exhibition Hall, London",
        link: "/all-event"
    },
];

const HeroSection = () => {
    return (
        <section className="w-full h-[60vh] xl:h-[70vh]  relative overflow-hidden">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper w-full h-full"
            >
                {eventsData.map((event) => (
                    <SwiperSlide key={event.id}>
                        <div className="relative w-full h-full">
                            <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                sizes="100vw"
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center p-4">
                                <h1 className="text-3xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 leading-tight">
                                    {event.title}
                                </h1>
                                <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-md mb-8">
                                    {event.description}
                                </p>

                                <div className="mb-8">
                                    <CountdownTimer targetDate={event.targetDate} />
                                </div>

                                <Link
                                    href={event.link}
                                    className="px-8 py-4 bg-primary text-white text-lg font-semibold rounded-full shadow-lg hover:bg-red-600 transition-colors duration-300 transform hover:scale-105"
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