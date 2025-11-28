'use client'
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { IoClose, IoMenu } from "react-icons/io5";

import { signOut, useSession } from 'next-auth/react';



const Navbar =() => {
    const {data:session} = useSession()
    console.log(session?.user)
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navlinks = [
        { href: '/', label: 'Home' },
        { href: '/all-event', label: 'All Events' },
        { href: '/add-event', label: 'Create Event' },
        { href: '/manage-event', label: 'Mange Event' },
    ];

    const isActive = (href) => href === pathname;

    const menuVariants = {
        hidden: { x: "-100%" },
        visible: { x: "0%", transition: { type: "tween", duration: 0.3 } },
        exit: { x: "-100%", transition: { type: "tween", duration: 0.3 } }, 
    };

    return (
        <header className='w-full bg-gray-800 text-gray-200 sticky top-0 z-50 shadow-lg'>
            <div className='container mx-auto px-3 flex items-center justify-between'>
                
                <div className="flex items-center gap-2">
                    <div className='lg:hidden flex items-center'>
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className='p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary rounded-md'
                            aria-label="Open mobile menu"
                        >
                            <IoMenu className='text-3xl' />
                        </button>
                    </div>
                    <Link href="/">
                        <Image
                            src="/assets/Logo2.png" 
                            alt="NextEvent Logo"
                            width={160}
                            height={40}
                            className="object-contain"
                        />
                    </Link>
                </div>

                <nav className='hidden lg:flex items-center gap-8 text-sm font-medium'>
                    {navlinks.map(nav => (
                        <div key={nav.label} className='relative py-2'>
                            <Link
                                href={nav.href}
                                className={`transition-colors duration-300 ${isActive(nav.href)
                                    ? 'text-red-500'
                                    : 'text-gray-300 hover:text-primary'
                                }`}
                            >
                                {nav.label}
                            </Link>
                            <AnimatePresence>
                                {isActive(nav.href) && (
                                    <motion.span
                                        layoutId="nav-underline"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        exit={{ width: 0 }}
                                        className="absolute bottom-0 left-0 h-[2px] bg-primary rounded-full"
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </nav>

                
                <div className='hidden lg:block'>
                    {session?.user?<button onClick={()=> signOut()}
                        className='bg-primary hover:bg-red-700 border-0 text-white font-semibold px-5 py-3 rounded-md transition-colors duration-300 '
                    >
                        Logout
                    </button> :<Link
                        className='bg-primary hover:bg-red-700 border-0 text-white font-semibold px-5 py-3 rounded-md transition-colors duration-300 '
                        href={'/login'}
                    >
                        Login/Register
                    </Link>}
                </div>

                {/* Mobile Login/Register Button (moved here for consistency with desktop order) */}
                <div className='lg:hidden'>
                    {session?.user?<button onClick={()=> signOut()}
                        className='btn btn-primary hover:bg-red-700 border-0 text-white font-semibold px-5 py-3 rounded-md transition-colors duration-300 '
                    >
                        Logout
                    </button> :<Link
                        className='bg-primary hover:bg-red-700 border-0 text-white font-semibold px-5 py-3 rounded-md transition-colors duration-300 '
                        href={'/login'}
                    >
                        Login/Register
                    </Link>}
                </div>
            </div>

           
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.aside
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className='fixed top-0 left-0 h-full w-3/4 max-w-sm bg-gray-900 shadow-2xl z-50  flex flex-col p-6'
                    >
                        <div className="flex justify-between items-center mb-8">
                            <Image
                                src="/assets/Logo2.png" // Ensure this is your HD logo
                                alt="NextEvent Logo"
                                width={140}
                                height={35}
                                className="object-contain"
                            />
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className='p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md'
                                aria-label="Close mobile menu"
                            >
                                <IoClose className='text-3xl' />
                            </button>
                        </div>

                        <nav className='flex flex-col gap-6 text-lg font-medium flex-grow'>
                            {navlinks.map(nav => (
                                <Link
                                    key={nav.label}
                                    href={nav.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block py-2 ${isActive(nav.href)
                                        ? 'text-primary border-l-4 border-primary pl-4'
                                        : 'text-gray-300 hover:text-primary pl-4'
                                    } transition-all duration-300`}
                                >
                                    {nav.label}
                                </Link>
                            ))}
                            
                        </nav>
                    </motion.aside>
                )}
            </AnimatePresence>

            
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;