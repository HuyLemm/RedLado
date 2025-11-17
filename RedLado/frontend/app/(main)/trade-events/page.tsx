"use client";

import { useState } from "react";
import { Calendar, Clock, Trophy, Users, Filter, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

export default function TradeEventPage() {
  const [selectedGame, setSelectedGame] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showEventDetail, setShowEventDetail] = useState(false);

  const events = [
    {
      id: 1,
      title: 'CS2 Summer Trade Championship',
      banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
      date: 'July 15, 2025',
      time: '2:00 PM EST',
      host: 'RedLado Official',
      hostAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      prizePool: '$50,000',
      capacity: '500 traders',
      registered: 342,
      game: 'CS2',
      type: 'Online',
      tags: ['Tournament', 'High Stakes'],
      description: 'Join the biggest CS2 trading tournament of the summer. Compete with top traders for exclusive skins and cash prizes.',
      rules: [
        'Must have verified account with 2FA enabled',
        'Minimum 100 completed trades required',
        'Fair trading practices enforced',
        'No multi-accounting allowed'
      ],
      schedule: [
        { time: '2:00 PM', event: 'Registration closes' },
        { time: '2:15 PM', event: 'Opening ceremony' },
        { time: '2:30 PM', event: 'Round 1 begins' },
        { time: '5:00 PM', event: 'Finals' },
        { time: '6:00 PM', event: 'Prize distribution' },
      ],
      prizes: [
        { place: '1st', reward: '$25,000 + Dragon Lore FN' },
        { place: '2nd', reward: '$15,000 + Karambit Fade' },
        { place: '3rd', reward: '$10,000 + M4A4 Howl' },
      ],
    },
    {
      id: 2,
      title: 'Valorant Skin Swap Meet',
      banner: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
      date: 'July 20, 2025',
      time: '6:00 PM EST',
      host: 'TradeHub',
      hostAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
      prizePool: '$10,000',
      capacity: '200 traders',
      registered: 156,
      game: 'Valorant',
      type: 'Online',
      tags: ['Community', 'Casual'],
      description: 'Relaxed trading event for Valorant enthusiasts. Meet fellow traders and discover rare skins.',
      rules: [
        'Open to all skill levels',
        'Verified Steam account required',
        'Respectful trading only'
      ],
      schedule: [
        { time: '6:00 PM', event: 'Event starts' },
        { time: '6:30 PM', event: 'Trading begins' },
        { time: '9:00 PM', event: 'Event ends' },
      ],
      prizes: [
        { place: 'Random Draw', reward: '$5,000 split among 10 winners' },
      ],
    },
    {
      id: 3,
      title: 'Dota 2 Arcana Auction',
      banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
      date: 'July 25, 2025',
      time: '4:00 PM EST',
      host: 'ArcanaCollective',
      hostAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200',
      prizePool: '$25,000',
      capacity: '300 traders',
      registered: 89,
      game: 'Dota 2',
      type: 'Online',
      tags: ['Auction', 'Rare Items'],
      description: 'Exclusive auction featuring the rarest Dota 2 arcanas and immortals. Bid on legendary items.',
      rules: [
        'Minimum bid: $100',
        'Verified payment method required',
        'No bid retraction'
      ],
      schedule: [
        { time: '4:00 PM', event: 'Preview starts' },
        { time: '4:30 PM', event: 'Live auction begins' },
        { time: '7:00 PM', event: 'Auction ends' },
      ],
      prizes: [],
    },
  ];

  const filteredEvents = selectedGame === 'all' 
    ? events 
    : events.filter(event => event.game === selectedGame);

  const handleRegister = (event: any) => {
    toast.success(`Successfully registered for ${event.title}!`);
  };

  const calculateTimeLeft = (eventDate: string) => {
    const now = new Date();
    const target = new Date(eventDate);
    const diff = target.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} days left` : 'Happening soon';
  };

  return (
    <div className="min-h-screen bg-bg-base dark:bg-[#0B0F0F] py-8">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary dark:text-[#E5E7EB] mb-2">Trade Events</h1>
          <p className="text-text-secondary dark:text-[#A7B0BF]">Join tournaments, auctions, and community meetups</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-text-muted dark:text-[#8B93A7]" />
            <span className="text-sm font-semibold text-text-primary dark:text-[#E5E7EB]">Filters:</span>
          </div>
          <Select value={selectedGame} onValueChange={setSelectedGame}>
            <SelectTrigger className="w-[180px] border-stroke-muted dark:border-[#1F2937] rounded-xl h-10 bg-bg-elev-1 dark:bg-[#111316]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Games</SelectItem>
              <SelectItem value="CS2">CS2</SelectItem>
              <SelectItem value="Valorant">Valorant</SelectItem>
              <SelectItem value="Dota 2">Dota 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <StaggerItem key={event.id}>
              <motion.div
                className="border-stroke-muted dark:border-[#1F2937] rounded-2xl overflow-hidden hover:border-[#E2233B] dark:hover:border-[#F43F5E] transition-colors group cursor-pointer bg-bg-elev-1 dark:bg-[#111316]"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  setSelectedEvent(event);
                  setShowEventDetail(true);
                }}
              >
                <Card className="border-0 h-full">
              {/* Banner */}
              <div className="relative h-48 overflow-hidden bg-bg-subtle dark:bg-[#1a1d1f]">
                <ImageWithFallback
                  src={event.banner}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-[#E2233B] dark:bg-[#F43F5E] text-white hover:bg-[#E2233B] dark:hover:bg-[#F43F5E]">
                    {event.game}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                </div>
              </div>

              <CardContent className="p-5">
                {/* Host */}
                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={event.hostAvatar} alt={event.host} />
                    <AvatarFallback className="bg-[#E2233B] dark:bg-[#F43F5E] text-white text-xs">
                      {event.host[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-text-secondary dark:text-[#A7B0BF]">by {event.host}</span>
                </div>

                {/* Info Grid */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-[#A7B0BF]">
                    <Calendar className="w-4 h-4 text-[#E2233B] dark:text-[#F43F5E]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-[#A7B0BF]">
                    <Clock className="w-4 h-4 text-[#E2233B] dark:text-[#F43F5E]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-[#A7B0BF]">
                    <Trophy className="w-4 h-4 text-[#E2233B] dark:text-[#F43F5E]" />
                    <span className="font-semibold text-text-primary dark:text-[#E5E7EB]">{event.prizePool}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-[#A7B0BF]">
                    <Users className="w-4 h-4 text-[#E2233B] dark:text-[#F43F5E]" />
                    <span>{event.registered} / {event.capacity}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-bg-subtle dark:bg-[#1a1d1f] text-text-secondary dark:text-[#A7B0BF] hover:bg-bg-elev-1 dark:hover:bg-[#111316] text-xs">
                      {tag}
                    </Badge>
                  ))}
                  <Badge className="bg-[#16A34A]/10 text-[#16A34A] hover:bg-[#16A34A]/20 text-xs">
                    {event.type}
                  </Badge>
                </div>

                {/* CTA */}
                <Button 
                  className="w-full bg-[#E2233B] hover:bg-[#BE1E31] dark:bg-[#F43F5E] dark:hover:bg-[#E2233B] text-white rounded-xl group-hover:shadow-lg transition-shadow"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEvent(event);
                    setShowEventDetail(true);
                  }}
                >
                  View Details
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {filteredEvents.length === 0 && (
          <Card className="border-stroke-muted dark:border-[#1F2937] rounded-2xl bg-bg-elev-1 dark:bg-[#111316]">
            <CardContent className="p-12 text-center">
              <Calendar className="w-16 h-16 text-text-muted dark:text-[#8B93A7] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary dark:text-[#E5E7EB] mb-2">No events found</h3>
              <p className="text-text-muted dark:text-[#8B93A7]">Check back later for upcoming events</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Event Detail Modal */}
      <Dialog open={showEventDetail} onOpenChange={setShowEventDetail}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-bg-base dark:bg-[#0B0F0F] border-stroke-muted dark:border-[#1F2937]">
          {selectedEvent && (
            <>
              {/* Banner */}
              <div className="relative -m-6 mb-6 h-64 overflow-hidden">
                <ImageWithFallback
                  src={selectedEvent.banner}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-base dark:from-[#0B0F0F] to-transparent" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  onClick={() => setShowEventDetail(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-text-primary dark:text-[#E5E7EB] mb-2">
                  {selectedEvent.title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Event details for {selectedEvent.title}
                </DialogDescription>
                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedEvent.hostAvatar} alt={selectedEvent.host} />
                    <AvatarFallback className="bg-[#E2233B] dark:bg-[#F43F5E] text-white">
                      {selectedEvent.host[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-semibold text-text-primary dark:text-[#E5E7EB]">{selectedEvent.host}</div>
                    <div className="text-xs text-text-muted dark:text-[#8B93A7]">Event Organizer</div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary dark:text-[#E5E7EB] mb-2">About</h3>
                  <p className="text-text-secondary dark:text-[#A7B0BF] leading-relaxed">{selectedEvent.description}</p>
                </div>

                {/* Event Info */}
                <div className="grid md:grid-cols-2 gap-4 p-4 bg-bg-subtle dark:bg-[#1a1d1f] rounded-xl border border-stroke-muted dark:border-[#1F2937]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E2233B]/10 dark:bg-[#F43F5E]/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#E2233B] dark:text-[#F43F5E]" />
                    </div>
                    <div>
                      <div className="text-xs text-text-muted dark:text-[#8B93A7]">Date</div>
                      <div className="font-semibold text-text-primary dark:text-[#E5E7EB]">{selectedEvent.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E2233B]/10 dark:bg-[#F43F5E]/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#E2233B] dark:text-[#F43F5E]" />
                    </div>
                    <div>
                      <div className="text-xs text-text-muted dark:text-[#8B93A7]">Time</div>
                      <div className="font-semibold text-text-primary dark:text-[#E5E7EB]">{selectedEvent.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E2233B]/10 dark:bg-[#F43F5E]/10 rounded-lg flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-[#E2233B] dark:text-[#F43F5E]" />
                    </div>
                    <div>
                      <div className="text-xs text-text-muted dark:text-[#8B93A7]">Prize Pool</div>
                      <div className="font-semibold text-text-primary dark:text-[#E5E7EB]">{selectedEvent.prizePool}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E2233B]/10 dark:bg-[#F43F5E]/10 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-[#E2233B] dark:text-[#F43F5E]" />
                    </div>
                    <div>
                      <div className="text-xs text-text-muted dark:text-[#8B93A7]">Capacity</div>
                      <div className="font-semibold text-text-primary dark:text-[#E5E7EB]">
                        {selectedEvent.registered} / {selectedEvent.capacity}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rules */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary dark:text-[#E5E7EB] mb-3">Rules</h3>
                  <ul className="space-y-2">
                    {selectedEvent.rules.map((rule: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-text-secondary dark:text-[#A7B0BF]">
                        <span className="text-[#E2233B] dark:text-[#F43F5E] mt-1">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Schedule */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary dark:text-[#E5E7EB] mb-3">Schedule</h3>
                  <div className="space-y-3">
                    {selectedEvent.schedule.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-20 text-sm font-semibold text-[#E2233B] dark:text-[#F43F5E]">{item.time}</div>
                        <div className="flex-1 text-text-secondary dark:text-[#A7B0BF]">{item.event}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prizes */}
                {selectedEvent.prizes.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary dark:text-[#E5E7EB] mb-3">Prizes</h3>
                    <div className="space-y-2">
                      {selectedEvent.prizes.map((prize: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-bg-subtle dark:bg-[#1a1d1f] rounded-xl border border-stroke-muted dark:border-[#1F2937]">
                          <span className="font-semibold text-text-primary dark:text-[#E5E7EB]">{prize.place}</span>
                          <span className="text-[#E2233B] dark:text-[#F43F5E] font-bold">{prize.reward}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => handleRegister(selectedEvent)}
                    className="flex-1 bg-[#E2233B] hover:bg-[#BE1E31] dark:bg-[#F43F5E] dark:hover:bg-[#E2233B] text-white rounded-xl h-12"
                  >
                    Register / RSVP
                  </Button>
                  <Button
                    variant="outline"
                    className="border-stroke-muted dark:border-[#1F2937] hover:bg-bg-elev-1 dark:hover:bg-[#111316] rounded-xl h-12"
                  >
                    Add to Calendar
                  </Button>
                </div>

                <p className="text-xs text-text-muted dark:text-[#8B93A7] text-center">
                  {calculateTimeLeft(selectedEvent.date)} • {selectedEvent.registered} spots left
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

