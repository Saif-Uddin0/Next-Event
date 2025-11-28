import React from 'react';

const CreateEvent = () => {
  return (
    <div className="bg-base-200">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 py-12 px-4">
        
        <div className="text-white max-w-lg text-center lg:text-left">
          <h1 className="text-3xl font-bold mb-3">
            Create Your Own New Event
          </h1>
          <p className="leading-relaxed text-sm opacity-90">
            Bring people together, or turn your passion into a business. Eventbrite gives you everything 
            you need to host your best event yet.
          </p>
        </div>

        
        <div className="mt-4 lg:mt-0 lg:p-10">
          <button className="btn btn-primary px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Create Event
          </button>
        </div>
      </div>

      
      <div className="h-[5px] bg-red-500"></div>
    </div>
  );
};

export default CreateEvent;
