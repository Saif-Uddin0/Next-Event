import React from 'react';
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-12  border-t border-gray-700">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Brand and Social */}
                <div className="flex flex-col items-start">
                    <div className="">
                        <Image
                            src="/assets/Logo2.png" 
                            alt="NextEvent Logo"
                            width={180} 
                            height={40} 
                            className="object-contain" 
                        />
                    </div>
                    <p className="text-sm leading-relaxed text-gray-400 max-w-xs mb-6">
                        Discover, create, and manage unforgettable events effortlessly with NextEvent. Your ultimate platform for seamless event experiences.
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                            <Link href="#" key={i} passHref> {/* Add actual links */}
                                <div
                                    className="p-3 rounded-full bg-gray-700 hover:bg-indigo-600 transition-all duration-300 cursor-pointer flex items-center justify-center"
                                    aria-label={`NextEvent on ${Icon.name.replace('Fa', '')}`}
                                >
                                    <Icon className="text-gray-300 hover:text-white text-xl" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className='mt-8'>
                    <h3 className="text-lg font-bold mb-5 text-white">Quick Links</h3>
                    <ul className="space-y-3">
                        {[
                            { href: "/", label: "Home" },
                            { href: "/all-event", label: "All Events" },
                            { href: "/add-event", label: "Create Event" },
                            { href: "/manage-event", label: "Dashboard" }, // Renamed for better UX
                        ].map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className="hover:text-primary transition-colors duration-300 text-gray-400 text-base"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* About Us */}
                <div className='mt-8'>
                    <h3 className="text-lg font-bold mb-5 text-white">About Us</h3>
                    <ul className="space-y-3">
                        {[
                            { label: "Our Mission", href: "/about#mission" },
                            { label: "Why Choose Us", href: "/about#why-us" },
                            { label: "Testimonials", href: "/testimonials" },
                            { label: "FAQ", href: "/faq" }
                        ].map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className="hover:text-primary transition-colors duration-300 text-gray-400 text-base"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div className='mt-8'>
                    <h3 className="text-lg font-bold mb-5 text-white">Contact Us</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            <Link href="mailto:support@nextevent.com" className="hover:text-primary transition-colors duration-300">
                                support@nextevent.com
                            </Link>
                        </li>
                        <li className="flex items-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            <Link href="tel:+8801234567890" className="hover:text-primary transition-colors duration-300">
                                +880 1234 567890
                            </Link>
                        </li>
                        <li className="flex items-start text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span>Dhaka, Bangladesh</span>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Bottom Section */}
            <div className="text-center mt-16 border-t border-gray-700 pt-8 text-sm text-gray-400">
                &copy; {new Date().getFullYear()} NextEvent. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;