'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useSphereoStore } from '../../../lib/store';
import { ARTISANS } from '../../../data/artisans';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  Send,
  Sparkles,
  ShieldCheck,
  MessageSquare,
  Info,
  Clock,
} from 'lucide-react';

export default function ConsultationRoomPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params?.bookingId as string;
  const { bookings } = useSphereoStore();

  const booking = bookings.find((b) => b.id === bookingId) || bookings[0];
  const artisan = ARTISANS.find((a) => a.id === booking?.artisanId) || ARTISANS[0];

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    {
      sender: artisan.name,
      text: `Namaste Ananya! Welcome to our Jaipur studio. I have reviewed your design brief regarding the traditional lac bangle set.`,
      time: '11:01 AM',
    },
    {
      sender: 'You',
      text: `Namaste Master ${artisan.name}! Excited to explore the deep indigo pigment and brass stud placement.`,
      time: '11:02 AM',
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      sender: 'You',
      text: inputMsg.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setInputMsg('');

    // Simulated artisan response
    setTimeout(() => {
      const responses = [
        `Yes, we purify our kusmi lac over acacia charcoal so the natural resin retains its elasticity. We can certainly adjust the brass stud spacing to your exact circumference.`,
        `I will prepare a sample swatch of the natural mineral indigo so we can inspect the depth of tone under morning light.`,
        `The lead time will be approximately 14 days, as each bangle must cure slowly in the shade after shaping.`,
      ];
      const artisanReply = {
        sender: artisan.name,
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, artisanReply]);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Bar */}
      <div className="bg-sphereo-charcoal text-sphereo-linen p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
          <div>
            <h1 className="font-serif text-lg font-bold text-sphereo-ivory">
              Studio Session: {artisan.name}
            </h1>
            <p className="text-xs text-sphereo-linen/75">
              {artisan.craftName} • {booking ? `${booking.date} (${booking.timeSlot})` : 'Active Consultation'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="brass" size="sm">
            Simulated In-Platform Room
          </Badge>
          <Button
            variant="danger"
            size="sm"
            onClick={() => router.push('/account/bookings')}
          >
            <PhoneOff size={14} />
            <span>Leave Session</span>
          </Button>
        </div>
      </div>

      {/* Main Studio Video & Chat Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Video Feeds & Controls */}
        <div className="lg:col-span-8 space-y-4">
          {/* Main Feed: Master Artisan */}
          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-sphereo-charcoal border border-sphereo-border shadow-modal">
            <Image
              src={artisan.workshopImage || 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=80'}
              alt={artisan.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sphereo-charcoal/80 via-transparent to-transparent" />

            {/* Artisan Nameplate */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-sphereo-charcoal/80 backdrop-blur-md px-3 py-1.5 rounded text-white text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-bold">{artisan.name}</span>
              <span className="text-[10px] text-sphereo-brass font-medium">({artisan.region})</span>
            </div>

            {/* Small Self Feed Preview (Picture-in-Picture) */}
            <div className="absolute top-4 right-4 w-32 sm:w-44 aspect-video rounded-md overflow-hidden border-2 border-sphereo-ivory/80 shadow-md bg-stone-800">
              {isVideoOff ? (
                <div className="w-full h-full flex items-center justify-center text-xs text-white bg-stone-900">
                  <span>Camera Off</span>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
                    alt="You"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-1 left-1.5 bg-black/60 px-1.5 py-0.5 rounded text-[9px] text-white">
                    You {isMuted ? '(Muted)' : ''}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AV Controls Bar */}
          <div className="p-4 bg-sphereo-ivory border border-sphereo-border rounded-lg flex items-center justify-center gap-4 shadow-sm">
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-full border transition-colors ${
                isMuted
                  ? 'bg-red-100 text-red-700 border-red-300'
                  : 'bg-sphereo-linen text-sphereo-charcoal border-sphereo-border hover:bg-sphereo-sand'
              }`}
              title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
            >
              {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            <button
              type="button"
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-3 rounded-full border transition-colors ${
                isVideoOff
                  ? 'bg-red-100 text-red-700 border-red-300'
                  : 'bg-sphereo-linen text-sphereo-charcoal border-sphereo-border hover:bg-sphereo-sand'
              }`}
              title={isVideoOff ? 'Turn video on' : 'Turn video off'}
            >
              {isVideoOff ? <VideoOff size={18} /> : <VideoIcon size={18} />}
            </button>
          </div>

          {/* Brief Card Preview */}
          <div className="p-4 bg-sphereo-linen/40 border border-sphereo-border rounded-lg text-xs space-y-1.5">
            <span className="font-bold uppercase tracking-wider text-sphereo-charcoal text-[11px] block">
              Active Design Brief: {booking?.topic || 'Bespoke Consultation'}
            </span>
            <p className="text-sphereo-wood/85 italic font-serif">
              “{booking?.brief || 'Custom design brief under artisan review.'}”
            </p>
          </div>
        </div>

        {/* Right Column: Live Chat & Collaborative Notes Panel */}
        <div className="lg:col-span-4 bg-sphereo-ivory border border-sphereo-border rounded-lg flex flex-col h-[520px] shadow-sm overflow-hidden">
          {/* Chat Header */}
          <div className="p-3.5 border-b border-sphereo-border bg-sphereo-linen/40 flex items-center justify-between text-xs">
            <span className="font-bold text-sphereo-charcoal flex items-center gap-1.5">
              <MessageSquare size={14} className="text-sphereo-terracotta" />
              <span>Session Transcript & Notes</span>
            </span>
            <span className="text-[10px] text-sphereo-wood/75">Active</span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {chatMessages.map((msg, idx) => {
              const isMe = msg.sender === 'You';
              return (
                <div
                  key={idx}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] text-sphereo-wood/70 font-semibold mb-0.5">
                    {msg.sender} • {msg.time}
                  </span>
                  <div
                    className={`max-w-[85%] p-3 rounded-lg leading-relaxed ${
                      isMe
                        ? 'bg-sphereo-terracotta text-white rounded-br-none'
                        : 'bg-sphereo-linen border border-sphereo-border text-sphereo-charcoal rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-sphereo-border bg-sphereo-ivory flex gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Type message to master artisan..."
              className="flex-1 px-3 py-2 text-xs bg-sphereo-linen/40 border border-sphereo-border rounded focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-sphereo-terracotta text-white rounded text-xs hover:bg-sphereo-terracotta-dark transition-colors"
            >
              <Send size={13} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
