// components/EventSubmissionForm.jsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CalendarDays, MapPin, DollarSign, Tag, Globe, LinkIcon,
  Ticket, Users, User, Mail, Image as ImageIcon, FileText, Sparkles
} from 'lucide-react'; // Added Sparkles icon for category, removed LinkLucide to avoid confusion
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';

const EventSubmissionForm = () => {
  const{data:session} = useSession();
  console.log(session?.user)
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: '',
    tags: '', // Comma-separated string
    imageUrl: '',
    date: '',
    locationName: '',
    locationCity: '',
    isOnline: false,
    organizerName: session?.user?.name,
    organizerEmail: session?.user?.email,
    isFree: false,
    priceAmount: 0.00,
    priceCurrency: 'USD',
    registrationLink: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => {
      const newData = {
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      };

      if (name === 'title' && !prevData.slug) {
        newData.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');
      }
      return newData;
    });
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return newErrors;
    });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = 'Event title is required.';
    if (!formData.description) newErrors.description = 'Short description is required.';
    if (!formData.category) newErrors.category = 'Category is required.';
    if (!formData.imageUrl) newErrors.imageUrl = 'Image URL is required.';
    if (!formData.date) newErrors.date = 'Event date is required.';
    if (!formData.isOnline && (!formData.locationName || !formData.locationCity)) {
      newErrors.location = 'Location name and city are required for in-person events.';
    }
    if (!formData.organizerName) newErrors.organizerName = 'Organizer name is required.';
    if (!formData.organizerEmail) newErrors.organizerEmail = 'Organizer email is required.';
    if (!formData.registrationLink) newErrors.registrationLink = 'Registration link is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const dataToSend = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()),
      priceAmount: parseFloat(formData.priceAmount),
      status: "pending",
      isFeatured: false,
    };

    try {
      const res = await fetch("https://nextevent-server.vercel.app/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Your event has been submitted for review.',
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 3000, // optional auto-close after 3s
        });
        setSubmissionSuccess(true);
        setFormData({
          title: "",
          slug: "",
          description: "",
          category: "",
          tags: "",
          imageUrl: "",
          date: "",
          locationName: "",
          locationCity: "",
          isOnline: false,
          organizerName: "",
          organizerEmail: "",
          isFree: false,
          priceAmount: 0,
          priceCurrency: "USD",
          registrationLink: "",
        });
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Submit Your Event</h1>
      <p className="text-gray-600 mb-8 text-center">
        Fill out the essential details for your event. We'll review it shortly!
      </p>

      {submissionSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
          <p className="font-bold">Success!</p>
          <p>Your event has been submitted for review. Thank you!</p>
        </div>
      )}
      {errors.api && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p className="font-bold">Error!</p>
          <p>{errors.api}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">

        {/* Basic Event Details */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2 flex items-center">
            <FileText size={20} className="mr-3 text-red-600" /> Event Information
          </h2>

          <div className="form-group">
            <label htmlFor="title" className="form-label">Event Title <span className="text-red-500">*</span></label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}
              className={`form-input ${errors.title ? 'border-red-500' : ''}`} placeholder="e.g., Summer Music Fest" required />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div className="form-group mt-4">
            <label htmlFor="slug" className="form-label">URL Slug</label>
            <input type="text" id="slug" name="slug" value={formData.slug} onChange={handleChange}
              className="form-input bg-gray-50" placeholder="e.g., summer-music-fest" />
            <p className="text-xs text-gray-500 mt-1">Editable unique identifier for the URL.</p>
          </div>

          <div className="form-group mt-4">
            <label htmlFor="description" className="form-label">Short Description <span className="text-red-500">*</span></label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange}
              rows="2" className={`form-input ${errors.description ? 'border-red-500' : ''}`}
              placeholder="A brief, engaging summary (max 160 characters)." maxLength="160" required></textarea>
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            <p className="text-xs text-gray-500 mt-1">{formData.description.length}/160 characters</p>
          </div>
        </div>

        {/* Categorization & Visuals */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2 flex items-center">
            <Sparkles size={20} className="mr-3 text-red-600" /> Details & Visuals
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="category" className="form-label">Category <span className="text-red-500">*</span></label>
              <select id="category" name="category" value={formData.category} onChange={handleChange}
                className={`form-input ${errors.category ? 'border-red-500' : ''}`} required>
                <option value="">Select a Category</option>
                <option value="Technology & AI">Technology & AI</option>
                <option value="Music & Arts">Music & Arts</option>
                <option value="Business & Marketing">Business & Marketing</option>
                <option value="Sports & Fitness">Sports & Fitness</option>
                <option value="Education & Career">Education & Career</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="tags" className="form-label">Tags (comma-separated)</label>
              <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange}
                className="form-input" placeholder="e.g., concert, indie, summer" />
              <p className="text-xs text-gray-500 mt-1">Helps people find your event.</p>
            </div>
          </div>

          <div className="form-group mt-4">
            <label htmlFor="imageUrl" className="form-label flex items-center">
              <ImageIcon size={18} className="mr-2 text-gray-500" /> Event Image URL <span className="text-red-500">*</span>
            </label>
            <input type="url" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange}
              className={`form-input ${errors.imageUrl ? 'border-red-500' : ''}`} placeholder="https://example.com/event-banner.jpg" required />
            {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>}
            <p className="text-xs text-gray-500 mt-1">Link to a high-quality image for your event.</p>
          </div>
        </div>

        {/* Date & Location */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2 flex items-center">
            <CalendarDays size={20} className="mr-3 text-red-600" /> Date & Location
          </h2>
          <div className="form-group">
            <label htmlFor="date" className="form-label flex items-center">
              <CalendarDays size={18} className="mr-2 text-gray-500" /> Event Date & Time <span className="text-red-500">*</span>
            </label>
            <input type="datetime-local" id="date" name="date" value={formData.date} onChange={handleChange}
              className={`form-input ${errors.date ? 'border-red-500' : ''}`} required />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>

          <div className="form-group mt-4">
            <label className="form-label flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isOnline"
                checked={formData.isOnline}
                onChange={handleChange}
                className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <Globe size={18} className="mr-2 text-gray-500" /> This is an online event
            </label>
          </div>

          {!formData.isOnline && (
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="form-group">
                <label htmlFor="locationName" className="form-label flex items-center">
                  <MapPin size={18} className="mr-2 text-gray-500" /> Venue Name <span className="text-red-500">*</span>
                </label>
                <input type="text" id="locationName" name="locationName" value={formData.locationName} onChange={handleChange}
                  className={`form-input ${errors.location ? 'border-red-500' : ''}`} placeholder="e.g., Grand Exhibition Hall" required={!formData.isOnline} />
              </div>
              <div className="form-group">
                <label htmlFor="locationCity" className="form-label">City <span className="text-red-500">*</span></label>
                <input type="text" id="locationCity" name="locationCity" value={formData.locationCity} onChange={handleChange}
                  className={`form-input ${errors.location ? 'border-red-500' : ''}`} placeholder="e.g., New York" required={!formData.isOnline} />
              </div>
              {errors.location && <p className="text-red-500 text-xs mt-1 col-span-2">{errors.location}</p>}
            </div>
          )}
        </div>

        {/* Organizer & Registration */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2 flex items-center">
            <User size={20} className="mr-3 text-red-600" /> Organizer & Tickets
          </h2>
          <div className="form-group">
            <label htmlFor="organizerName" className="form-label flex items-center">
              <User size={18} className="mr-2 text-gray-500" /> Organizer Name <span className="text-red-500">*</span>
            </label>
            <input type="text" id="organizerName" name="organizerName" value={formData.organizerName} onChange={handleChange}
              className={`form-input ${errors.organizerName ? 'border-red-500' : ''}`} placeholder="e.g., Event Management Co." required />
            {errors.organizerName && <p className="text-red-500 text-xs mt-1">{errors.organizerName}</p>}
          </div>

          <div className="form-group mt-4">
            <label htmlFor="organizerEmail" className="form-label flex items-center">
              <Mail size={18} className="mr-2 text-gray-500" /> Organizer Email <span className="text-red-500">*</span>
            </label>
            <input type="email" id="organizerEmail" name="organizerEmail" value={formData.organizerEmail} onChange={handleChange}
              className={`form-input ${errors.organizerEmail ? 'border-red-500' : ''}`} placeholder="e.g., contact@event.com" required />
            {errors.organizerEmail && <p className="text-red-500 text-xs mt-1">{errors.organizerEmail}</p>}
          </div>

          <div className="form-group mt-4">
            <label className="form-label flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isFree"
                checked={formData.isFree}
                onChange={handleChange}
                className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <DollarSign size={18} className="mr-2 text-gray-500" /> This is a free event
            </label>
          </div>

          {!formData.isFree && (
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="form-group">
                <label htmlFor="priceAmount" className="form-label">Price Amount</label>
                <input type="number" id="priceAmount" name="priceAmount" value={formData.priceAmount} onChange={handleChange}
                  className="form-input" placeholder="e.g., 25.00" min="0" step="0.01" />
              </div>
              <div className="form-group">
                <label htmlFor="priceCurrency" className="form-label">Currency</label>
                <select id="priceCurrency" name="priceCurrency" value={formData.priceCurrency} onChange={handleChange}
                  className="form-input">
                  <option value="USD">USD</option>
                  <option value="BDT">BDT</option>
                  <option value="EUR">EUR</option>
                  {/* ... other currencies */}
                </select>
              </div>
            </div>
          )}

          <div className="form-group mt-4">
            <label htmlFor="registrationLink" className="form-label flex items-center">
              <LinkIcon size={18} className="mr-2 text-gray-500" /> Registration Link <span className="text-red-500">*</span>
            </label>
            <input type="url" id="registrationLink" name="registrationLink" value={formData.registrationLink} onChange={handleChange}
              className={`form-input ${errors.registrationLink ? 'border-red-500' : ''}`} placeholder="https://yourticketingplatform.com/event" required />
            {errors.registrationLink && <p className="text-red-500 text-xs mt-1">{errors.registrationLink}</p>}
            <p className="text-xs text-gray-500 mt-1">Where attendees can get tickets or register.</p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <FileText size={20} className="mr-2" />
            )}
            {loading ? 'Submitting...' : 'Submit Event'}
          </button>
        </div>
      </form>

      {/* Tailwind CSS utility classes for form styling */}
      <style jsx>{`
        .form-group {
          margin-bottom: 1rem;
        }
        .form-label {
          display: block;
          font-weight: 600;
          color: #4a5568; /* gray-700 */
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }
        .form-input {
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          line-height: 1.5;
          color: #2d3748; /* gray-900 */
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid #e2e8f0; /* gray-200 */
          border-radius: 0.5rem; /* rounded-lg */
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        .form-input:focus {
          border-color: #f56565; /* red-500 */
          box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.2); /* red-500 with opacity */
          outline: none;
        }
        textarea.form-input {
            min-height: 80px;
            resize: vertical;
        }
        select.form-input {
            appearance: none;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3e%3cpath d='M7 7l3-3 3 3m0 6l-3 3-3-3' stroke='%234A5568' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 1rem center;
            background-size: 0.6em 0.6em;
            padding-right: 2.5rem;
        }
      `}</style>
    </div>
  );
};

export default EventSubmissionForm;