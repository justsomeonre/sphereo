'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Artisan, Booking } from '../../lib/types';
import { useSphereoStore } from '../../lib/store';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { consultationBookingSchema } from '../../lib/validation';
import { Calendar, Clock, Video, CheckCircle2, AlertCircle } from 'lucide-react';

interface ConsultationModalProps {
  artisan: Artisan;
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  artisan,
  isOpen,
  onClose,
}) => {
  const { createBooking } = useSphereoStore();

  const [date, setDate] = useState(() => {
    // Default to tomorrow's date
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState(artisan.availableTimeSlots[0]?.timeSlot || '11:00 AM - 11:45 AM');
  const [customerName, setCustomerName] = useState('Ananya Deshmukh');
  const [customerEmail, setCustomerEmail] = useState('ananya.deshmukh@example.com');
  const [topic, setTopic] = useState('Custom Design Brief & Sizing Discussion');
  const [brief, setBrief] = useState('I want to discuss custom dimensions, traditional color finishes, and delivery timelines for an upcoming celebration.');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const validation = consultationBookingSchema.safeParse({
      customerName,
      customerEmail,
      date,
      timeSlot,
      topic,
      brief,
    });

    if (!validation.success) {
      setErrorMsg(validation.error.errors[0]?.message || 'Please check all required booking fields');
      return;
    }

    const result = createBooking(
      'cust-demo-1',
      customerName,
      artisan.id,
      date,
      timeSlot,
      topic,
      brief
    );

    if (!result.success) {
      setErrorMsg(result.error || 'Failed to book slot due to a scheduling conflict.');
    } else if (result.booking) {
      setConfirmedBooking(result.booking);
    }
  };

  const handleClose = () => {
    setConfirmedBooking(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Live Artisan Consultation — ${artisan.name}`}
      maxWidth="lg"
    >
      {confirmedBooking ? (
        <div className="space-y-5 text-center py-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
          </div>

          <div className="space-y-1">
            <h4 className="font-serif text-xl font-bold text-sphereo-charcoal">
              Consultation Scheduled!
            </h4>
            <p className="text-xs text-sphereo-charcoal/70 max-w-md mx-auto">
              Your 45-minute live consultation with <strong className="text-sphereo-charcoal">{artisan.name}</strong> has been secured in the SphereO studio calendar.
            </p>
          </div>

          <div className="bg-sphereo-linen/60 border border-sphereo-border rounded p-4 text-xs text-left space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sphereo-charcoal/60">Appointment Date:</span>
              <span className="font-semibold">{confirmedBooking.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sphereo-charcoal/60">Selected Slot:</span>
              <span className="font-semibold">{confirmedBooking.timeSlot} ({confirmedBooking.timezone})</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sphereo-charcoal/60">Discussion Topic:</span>
              <span className="font-semibold truncate max-w-[200px]">{confirmedBooking.topic}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-sphereo-border">
              <span className="text-sphereo-charcoal/60">Session Access:</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Video size={13} />
                In-Platform Video Ready
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={confirmedBooking.meetingLink || `/consultation/${confirmedBooking.id}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-sphereo-terracotta text-white font-semibold text-xs hover:bg-sphereo-terracotta-dark transition-colors"
            >
              <Video size={14} />
              <span>Enter Simulated Consultation Room</span>
            </Link>
            <Button variant="outline" size="sm" onClick={handleClose}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
          <div className="p-3 bg-sphereo-linen/50 border border-sphereo-border rounded flex items-start gap-2.5">
            <Video size={16} className="text-sphereo-terracotta mt-0.5 shrink-0" />
            <p className="text-sphereo-charcoal/80 leading-relaxed">
              Meet directly with {artisan.name} over in-platform video to discuss custom dimensions, inspect raw material swatches, and align on artisanal techniques.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-sphereo-charcoal mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2 bg-sphereo-ivory border border-sphereo-border rounded-sm focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-sphereo-charcoal mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full p-2 bg-sphereo-ivory border border-sphereo-border rounded-sm focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-sphereo-charcoal mb-1">
                Select Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 bg-sphereo-ivory border border-sphereo-border rounded-sm focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-sphereo-charcoal mb-1">
                Artisan Available Time Slot (IST)
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full p-2 bg-sphereo-ivory border border-sphereo-border rounded-sm focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
              >
                {artisan.availableTimeSlots.map((slot) => (
                  <option key={slot.id} value={slot.timeSlot}>
                    {slot.dayOfWeek}: {slot.timeSlot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-sphereo-charcoal mb-1">
              Consultation Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Bridal bangle sizing & gold foil inlay"
              className="w-full p-2 bg-sphereo-ivory border border-sphereo-border rounded-sm focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-sphereo-charcoal mb-1">
              Design Brief & Questions for {artisan.name}
            </label>
            <textarea
              rows={3}
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder="Describe what you want to create, desired dimensions, colors, or materials..."
              className="w-full p-2 bg-sphereo-ivory border border-sphereo-border rounded-sm focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
              required
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-sphereo-border">
            <Button variant="ghost" size="sm" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Confirm Consultation Booking
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
