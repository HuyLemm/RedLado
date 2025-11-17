"use client";

import { useState } from "react";
import { Search, Filter, Star, CheckCircle, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

export default function FindTraderPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [minRating, setMinRating] = useState([0]);
  const [sortBy, setSortBy] = useState('reputation');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [onlineOnly, setOnlineOnly] = useState(false);

  const traders = [
    {
      id: 1,
      name: 'ProTrader_Alex',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
      isVerified: true,
      isOnline: true,
      trades: 1247,
      rating: 4.9,
      responseTime: '< 5 min',
      country: '🇺🇸',
      games: ['CS2', 'Valorant'],
      reputation: 4850,
    },
    {
      id: 2,
      name: 'SkinMaster99',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200',
      isVerified: true,
      isOnline: true,
      trades: 892,
      rating: 4.8,
      responseTime: '< 10 min',
      country: '🇬🇧',
      games: ['CS2', 'Dota 2'],
      reputation: 3920,
    },
    {
      id: 3,
      name: 'TradeKing_CS',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200',
      isVerified: false,
      isOnline: false,
      trades: 654,
      rating: 4.7,
      responseTime: '< 15 min',
      country: '🇩🇪',
      games: ['CS2'],
      reputation: 2850,
    },
    {
      id: 4,
      name: 'FastTrade_Pro',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      isVerified: true,
      isOnline: true,
      trades: 2103,
      rating: 5.0,
      responseTime: '< 3 min',
      country: '🇨🇦',
      games: ['CS2', 'Valorant', 'TF2'],
      reputation: 6200,
    },
  ];

  const filteredTraders = traders
    .filter((trader) => {
      if (searchQuery && !trader.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (selectedGame && !trader.games.includes(selectedGame)) return false;
      if (minRating[0] > 0 && trader.rating < minRating[0]) return false;
      if (verifiedOnly && !trader.isVerified) return false;
      if (onlineOnly && !trader.isOnline) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'reputation') return b.reputation - a.reputation;
      if (sortBy === 'trades') return b.trades - a.trades;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-bg-base dark:bg-[#0B0F0F] py-8">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary dark:text-[#E5E7EB] mb-2">Find Traders</h1>
          <p className="text-text-secondary dark:text-[#A7B0BF]">Discover trusted traders for your next deal</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-stroke-muted dark:border-[#1F2937] rounded-2xl sticky top-8 bg-bg-elev-1 dark:bg-[#111316]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5 text-text-primary dark:text-[#E5E7EB]" />
                  <h2 className="text-lg font-semibold text-text-primary dark:text-[#E5E7EB]">Filters</h2>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <Label className="text-text-primary dark:text-[#E5E7EB] font-semibold mb-2 block">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted dark:text-[#8B93A7]" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search traders..."
                        className="pl-10 border-stroke-muted dark:border-[#1F2937] rounded-xl h-10 bg-bg-elev-2 dark:bg-[#1a1d1f]"
                      />
                    </div>
                  </div>

                  {/* Game Filter */}
                  <div>
                    <Label className="text-text-primary dark:text-[#E5E7EB] font-semibold mb-2 block">Game</Label>
                    <Select value={selectedGame} onValueChange={setSelectedGame}>
                      <SelectTrigger className="border-stroke-muted dark:border-[#1F2937] rounded-xl h-10 bg-bg-elev-2 dark:bg-[#1a1d1f]">
                        <SelectValue placeholder="All games" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All games</SelectItem>
                        <SelectItem value="CS2">CS2</SelectItem>
                        <SelectItem value="Valorant">Valorant</SelectItem>
                        <SelectItem value="Dota 2">Dota 2</SelectItem>
                        <SelectItem value="TF2">TF2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <Label className="text-text-primary dark:text-[#E5E7EB] font-semibold mb-2 block">
                      Minimum Rating: {minRating[0].toFixed(1)}+
                    </Label>
                    <Slider
                      value={minRating}
                      onValueChange={setMinRating}
                      max={5}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verified"
                        checked={verifiedOnly}
                        onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)}
                      />
                      <Label htmlFor="verified" className="text-sm text-text-secondary dark:text-[#A7B0BF] cursor-pointer">
                        Verified only
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="online"
                        checked={onlineOnly}
                        onCheckedChange={(checked) => setOnlineOnly(checked as boolean)}
                      />
                      <Label htmlFor="online" className="text-sm text-text-secondary dark:text-[#A7B0BF] cursor-pointer">
                        Online now
                      </Label>
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <Label className="text-text-primary dark:text-[#E5E7EB] font-semibold mb-2 block">Sort by</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="border-stroke-muted dark:border-[#1F2937] rounded-xl h-10 bg-bg-elev-2 dark:bg-[#1a1d1f]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reputation">Reputation</SelectItem>
                        <SelectItem value="trades">Completed Trades</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Reset */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedGame('');
                      setMinRating([0]);
                      setVerifiedOnly(false);
                      setOnlineOnly(false);
                      setSortBy('reputation');
                    }}
                    className="w-full border-stroke-muted dark:border-[#1F2937] hover:bg-bg-elev-1 dark:hover:bg-[#111316] rounded-xl"
                  >
                    Reset Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-text-muted dark:text-[#8B93A7]">
                {filteredTraders.length} trader{filteredTraders.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <StaggerContainer className="space-y-4">
              {filteredTraders.map((trader) => (
                <StaggerItem key={trader.id}>
                  <motion.div
                    className="border-stroke-muted dark:border-[#1F2937] rounded-2xl hover:border-[#E2233B] dark:hover:border-[#F43F5E] transition-colors group bg-bg-elev-1 dark:bg-[#111316]"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="border-0">
                      <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Avatar & Online Status */}
                      <div className="relative shrink-0">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={trader.avatar} alt={trader.name} />
                          <AvatarFallback className="bg-[#E2233B] dark:bg-[#F43F5E] text-white text-xl font-bold">
                            {trader.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        {trader.isOnline && (
                          <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#16A34A] rounded-full border-4 border-bg-base dark:border-[#0B0F0F]" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-text-primary dark:text-[#E5E7EB]">{trader.name}</h3>
                          {trader.isVerified && (
                            <Badge className="bg-[#16A34A] text-white hover:bg-[#16A34A]">
                              <CheckCircle className="w-3 h-3 mr-1" fill="white" />
                              Verified
                            </Badge>
                          )}
                          {trader.isOnline && (
                            <Badge className="bg-[#16A34A]/10 text-[#16A34A] hover:bg-[#16A34A]/20">
                              Online
                            </Badge>
                          )}
                          <span className="text-xl">{trader.country}</span>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-text-muted dark:text-[#8B93A7] mb-1">Trades</div>
                            <div className="text-lg font-bold text-text-primary dark:text-[#E5E7EB]">{trader.trades}</div>
                          </div>
                          <div>
                            <div className="text-sm text-text-muted dark:text-[#8B93A7] mb-1">Rating</div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                              <div className="text-lg font-bold text-text-primary dark:text-[#E5E7EB]">{trader.rating}</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-text-muted dark:text-[#8B93A7] mb-1">Avg. Response</div>
                            <div className="text-lg font-bold text-text-primary dark:text-[#E5E7EB]">{trader.responseTime}</div>
                          </div>
                          <div>
                            <div className="text-sm text-text-muted dark:text-[#8B93A7] mb-1">Reputation</div>
                            <div className="text-lg font-bold text-[#E2233B] dark:text-[#F43F5E]">{trader.reputation}</div>
                          </div>
                        </div>

                        {/* Game Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {trader.games.map((game) => (
                            <Badge key={game} variant="secondary" className="bg-bg-subtle dark:bg-[#1a1d1f] text-text-secondary dark:text-[#A7B0BF] hover:bg-bg-elev-1 dark:hover:bg-[#111316]">
                              {game}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex md:flex-col gap-2 shrink-0">
                        <Button
                          onClick={() => router.push('/profile')}
                          className="flex-1 md:flex-initial bg-[#E2233B] hover:bg-[#BE1E31] dark:bg-[#F43F5E] dark:hover:bg-[#E2233B] text-white rounded-xl"
                        >
                          <User className="w-4 h-4 md:mr-2" />
                          <span className="hidden md:inline">View Profile</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 md:flex-initial border-stroke-muted dark:border-[#1F2937] hover:bg-bg-elev-1 dark:hover:bg-[#111316] rounded-xl"
                        >
                          <MessageCircle className="w-4 h-4 md:mr-2" />
                          <span className="hidden md:inline">Message</span>
                        </Button>
                      </div>
                    </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {filteredTraders.length === 0 && (
              <Card className="border-stroke-muted dark:border-[#1F2937] rounded-2xl bg-bg-elev-1 dark:bg-[#111316]">
                <CardContent className="p-12 text-center">
                  <User className="w-16 h-16 text-text-muted dark:text-[#8B93A7] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-text-primary dark:text-[#E5E7EB] mb-2">No traders match your filters</h3>
                  <p className="text-text-muted dark:text-[#8B93A7] mb-6">Try adjusting your search criteria</p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedGame('');
                      setMinRating([0]);
                      setVerifiedOnly(false);
                      setOnlineOnly(false);
                    }}
                    variant="outline"
                    className="border-stroke-muted dark:border-[#1F2937] hover:bg-bg-elev-1 dark:hover:bg-[#111316] rounded-xl"
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

