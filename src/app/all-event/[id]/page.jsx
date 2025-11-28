"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loader from "../../../GlobalComponent/Loader";
import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  DollarSign,
  Users,
  User,
  Mail,
  Link as LinkLucide,
  Ticket,
  Globe,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";


const EventDetails = () => {
  const params = useParams();
  const { id } = params;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatPrice = (amount, currency, isFree) => {
    if (isFree) return "FREE";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  if (loading) return <Loader />;
  if (!event)
    return <p className="text-center mt-20 text-gray-600">Event not found</p>;

  return (
    <div>
      
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl my-10">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200 mb-8 font-medium"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Events
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-5">
          {/* Event Image */}
          <div className="relative w-full h-64 md:h-96 bg-gray-200 rounded-xl">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              className="rounded-xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <h1 className="absolute bottom-6 left-6 right-6 text-white text-3xl md:text-4xl font-extrabold drop-shadow-lg leading-tight">
              {event.title}
            </h1>
            <span className="absolute top-6 left-6 bg-red-600 text-white text-sm md:text-base font-semibold px-4 py-2 rounded-full shadow-md">
              {event.category}
            </span>
          </div>

          <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  About This Event
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {event.description}
                </p>
              </div>

              {event.longDescription && (
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                    What You'll Experience
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {event.longDescription}
                  </p>
                </div>
              )}

              {event.tags && event.tags.length > 0 && (
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                  <User size={24} className="mr-3 text-red-600" /> Organized By
                </h3>
                <p className="text-lg font-medium text-gray-800 mb-2">
                  {event.organizerName}
                </p>
                <ul className="text-gray-600 space-y-1">
                  {event.organizerEmail && (
                    <li className="flex items-center">
                      <Mail size={18} className="mr-2 text-gray-500" />
                      <a
                        href={`mailto:${event.organizerEmail}`}
                        className="hover:text-red-600"
                      >
                        {event.organizerEmail}
                      </a>
                    </li>
                  )}
                  {event.organizerWebsite && (
                    <li className="flex items-center">
                      <LinkLucide size={18} className="mr-2 text-gray-500" />
                      <a
                        href={event.organizerWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-600"
                      >
                        Visit Website
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {(event.speaker1Name || event.speaker2Name) && (
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                    <Users size={24} className="mr-3 text-red-600" /> Speakers
                  </h3>
                  <ul className="space-y-4">
                    {event.speaker1Name && (
                      <li className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <p className="text-lg font-semibold text-gray-800">
                          {event.speaker1Name}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {event.speaker1Title}
                        </p>
                      </li>
                    )}
                    {event.speaker2Name && (
                      <li className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <p className="text-lg font-semibold text-gray-800">
                          {event.speaker2Name}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {event.speaker2Title}
                        </p>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Key Information
                </h3>

                <div className="flex items-center mb-3">
                  <CalendarDays
                    size={20}
                    className="text-red-600 mr-3 flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">Date & Time</p>
                    <p className="text-gray-700 text-sm">{formatDate(event.date)}</p>
                  </div>
                </div>

                <div className="flex items-start mb-3">
                  {event.isOnline ? (
                    <Globe size={20} className="text-red-600 mr-3 flex-shrink-0" />
                  ) : (
                    <MapPin
                      size={20}
                      className="text-red-600 mr-3 flex-shrink-0"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">Location</p>
                    <p className="text-gray-700 text-sm">
                      {event.isOnline
                        ? "Online Event"
                        : `${event.locationName}, ${event.locationCity}, ${event.locationCountry}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <DollarSign
                    size={20}
                    className="text-red-600 mr-3 flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">Price</p>
                    <p
                      className={`text-lg font-bold ${event.isFree ? "text-green-600" : "text-yellow-700"
                        }`}
                    >
                      {formatPrice(event.priceAmount, event.priceCurrency, event.isFree)}
                    </p>
                  </div>
                </div>

                {event.registrationLink && (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full flex items-center justify-center bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-200 text-lg"
                  >
                    <Ticket size={20} className="mr-3" /> Register Now
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
