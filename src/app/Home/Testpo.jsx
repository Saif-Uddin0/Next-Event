import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

const Testpo = () => {
    return (
        <section className="py-15 bg-primary/90">
            <div className="container mx-auto px-5 flex flex-col items-center">
                
                {/* Section Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                    What People Say About Us
                </h2>

                {/* Testimonial Card */}
                <div className="
                    bg-white shadow-lg rounded-2xl p-10 max-w-6xl 
                    flex flex-col items-center text-center 
                    hover:shadow-2xl transition-shadow duration-300
                ">
                    
                    {/* Avatar Image */}
                    <div className="w-28 h-28 relative mb-4">
                        <Image
                            src="/assets/avatar-1.jpg"
                            alt="User Avatar"
                            fill
                            className="object-cover rounded-full shadow-md"
                        />
                    </div>

                    {/* Quote Icon */}
                    <Quote className="w-10 h-10 text-primary opacity-70 mb-4" />

                    {/* Testimonial Text */}
                    <p className="text-lg text-gray-700 leading-relaxed italic mb-4 px-4">
                        “This platform completely transformed how we manage and discover events.
                        The user experience is smooth, modern, and incredibly intuitive. 
                        I loved the attention to detail and how everything just works seamlessly.
                        Definitely recommended!”
                    </p>

                    {/* Author */}
                    <p className="text-md font-semibold text-gray-900">
                        — JThemes Studio
                    </p>

                    <p className="text-sm text-gray-500">
                        Event Organizer • New York
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Testpo;
