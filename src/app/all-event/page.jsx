"use client"
import React from 'react';
import Event from './shared/Event';
import Banner from '../../GlobalComponent/Banner';

const page = () => {
    return (
        <div>
            <Banner title={"All-Events"} subtitle="Events"></Banner>
            <div>
                <Event></Event>
            </div>
        </div>
    );
};

export default page;