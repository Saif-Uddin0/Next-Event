
"use client";

import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const now = new Date();
        const target = new Date(targetDate);
        const difference = +target - +now; 
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval, index) => {
        
        if (timeLeft[interval] > 0 || (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0)) {
            timerComponents.push(
                <div key={interval} className="flex flex-col items-center mx-1 md:mx-2 text-white">
                    <span className="text-2xl md:text-4xl font-bold">{String(timeLeft[interval]).padStart(2, '0')}</span>
                    <span className="text-xs md:text-sm uppercase">{interval}</span>
                </div>
            );
        }
    });


    return (
        <div className="flex justify-center items-center backdrop-blur-sm bg-black/40 p-3 md:p-4 rounded-lg">
            {timerComponents.some(c => c !== null && c.props.children[0].props.children > 0)
                ? timerComponents
                : <span className="text-white text-lg md:text-xl font-semibold">Event Live!</span>
            }
        </div>
    );
};

export default CountdownTimer;