// src/app/register/page.jsx

import React from 'react';
import Link from 'next/link'; 

export default function RegisterPage() {
    const handleRegistration = async (formData) => {
        "use server";
        const email = formData.get("email");
        const password = formData.get("password");
        
        console.log("ডামি রেজিস্ট্রেশন ডেটা:");
        console.log("Email:", email);
        console.log("Password:", password);

        const { redirect } = require('next/navigation');
        redirect('/');
    };

    return (
        <div className='my-20 flex justify-center items-center'>
            <div className='container mx-auto max-w-sm p-6 shadow-xl rounded-lg bg-white'>
                <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>নতুন একাউন্ট তৈরি করুন</h2>

                <form action={handleRegistration} className='space-y-4 mb-6'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="name">
                            নাম
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="email">
                            ইমেল
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="password">
                            পাসওয়ার্ড
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent'
                        />
                    </div>
                    
                    <button 
                        type='submit' 
                        className='w-full py-2 px-4 bg-accent text-white font-semibold rounded-md hover:opacity-90 transition duration-300'
                    >
                        একাউন্ট তৈরি করুন
                    </button>
                </form>

                {/* --- লগইন লিঙ্ক --- */}
                <p className='text-center text-sm text-gray-600'>
                    ইতিমধ্যেই একাউন্ট আছে?{' '}
                    <Link href="/login" className='text-gray-800 font-medium hover:underline'>
                        লগইন করুন
                    </Link>
                </p>

            </div>
        </div>
    );
}