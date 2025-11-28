"use client";

import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import Loader from "../../../GlobalComponent/Loader";
import { Search } from "lucide-react";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("https://nextevent-server.vercel.app/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      });
  }, []);

  const categories = ["All", ...new Set(events.map((e) => e.category))];

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = events.filter((event) => {
      const matchesCategory =
        activeCategory === "All" || event.category === activeCategory;
      const matchesSearch = event.title
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredEvents(filtered);
  };

  const handleCategory = (category) => {
    setActiveCategory(category);

    const filtered = events.filter((event) => {
      const matchesCategory = category === "All" || event.category === category;
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    setFilteredEvents(filtered);
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-6 md:px-12 my-16">
      {/* Page Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
        All Events
      </h1>
      <div className="flex items-center border-2 border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3 mx-auto shadow-sm focus-within:ring-2 ring-red-500 justify-center my-10">
          <Search className="text-red-500 mr-2" />
          <input
            type="text"
            placeholder="Search events..."
            className="outline-none w-full text-gray-700 placeholder-gray-400"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-center my-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium border-2 transition-all duration-200
                ${
                  activeCategory === cat
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:text-red-600"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      

      {/* Event Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-15">
          {filteredEvents.map((event) => (
            <EventCard key={event._id || event.slug} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12 text-lg">
          No events found matching your criteria.
        </p>
      )}
    </div>
  );
};

export default Event;
