
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, CalendarDays } from 'lucide-react'; // Assuming you have lucide-react installed

const EventCard = ({ event }) => {
  // Helper function to format date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* Event Image */}
      <div className="relative w-full h-48 bg-gray-200">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 hover:scale-105"
        />
        {/* Category Badge (Optional, but adds a nice touch) */}
        <span className="absolute top-3 left-3 bg-white/80 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {event.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col justify-between h-auto">
        {/* Date and Location */}
        <div className="flex items-center text-gray-400 text-sm mb-3">
          <CalendarDays size={16} className="text-red-500 mr-2" />
          <span className="font-medium mr-4">{formatDate(event.date)}</span>
          {event.locationCity && (
            <>
              <MapPin size={16} className="text-red-500 mr-2" />
              <span className="font-medium">{event.locationCity}, {event.locationCountry}</span>
            </>
          )}
        </div>

        {/* Event Title */}
        <h3 className="text-xl font-bold text-gray-600 mb-2 leading-tight">
          <Link href={`/events/${event.slug}`} className="hover:text-red-600 transition-colors duration-200">
            {event.title}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-gray-500 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>

        {/* Price / Free Badge */}
        <div className="mb-4">
          {event.isFree ? (
            <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
              FREE
            </span>
          ) : (
            <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
              {event.priceCurrency} {event.priceAmount.toFixed(2)}
            </span>
          )}
        </div>

        {/* View Details Button */}
        <Link href={`/all-event/${event._id}`} passHref>
          <button className="w-full bg-white  py-2 px-4 rounded-lg border border-primary hover:bg-primary hover:border-0 text-primary transition-colors duration-200 font-semibold text-center hover:text-white">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;