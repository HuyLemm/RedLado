"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, MessageCircle, Flag, Package, ShoppingBag, Clock, Star } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Sync activeTab with URL query parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'inventory', 'listings', 'activity', 'reviews'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  // Mock user data matching Figma ProfilePageNew exactly
  const userData = {
    avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    displayName: user.username || 'ProTrader_Alex',
    handle: `@${user.username?.toLowerCase() || 'alex_trades'}`,
    isVerified: true,
    isOnline: true,
    country: '🇺🇸',
    reputation: 4850,
    trades: 1247,
    rating: 4.9,
    memberSince: 'March 2022',
    bio: 'Professional CS2 trader with 3+ years experience. Specialized in rare skins and high-tier items. Always fair prices and fast delivery.',
    badges: ['Top Trader', 'Verified', 'Fast Responder'],
  };

  const recentListings = [
    { id: 1, name: 'AK-47 | Neon Revolution', price: '$842', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400' },
    { id: 2, name: 'M4A4 | Howl', price: '$4,200', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400' },
    { id: 3, name: 'AWP | Dragon Lore', price: '$3,850', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400' },
  ];

  return (
    <div className="min-h-screen bg-bg-base dark:bg-[#0B0F0F] pb-32">
      {/* Hero Section with Red Gradient */}
      <div className="relative bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#9F1239] overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />

        <div className="relative max-w-screen-xl mx-auto px-6 pt-24 pb-32">
          {/* Avatar & Basic Info */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative mb-6">
              <Avatar className="w-32 h-32 border-4 border-white/20 shadow-2xl">
                <AvatarImage src={userData.avatar} alt={userData.displayName} />
                <AvatarFallback className="bg-white text-[#E11D48] text-3xl font-bold">
                  {userData.displayName[0]}
                </AvatarFallback>
              </Avatar>
              {userData.isOnline && (
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#10B981] rounded-full border-4 border-white shadow-lg" />
              )}
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-white">{userData.displayName}</h1>
                {userData.isVerified && (
                  <div className="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" fill="white" />
                  </div>
                )}
              </div>
              <p className="text-white/80 text-sm">{userData.handle}</p>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-8 mb-6">
              <div>
                <div className="text-3xl font-bold text-white">{userData.reputation}</div>
                <div className="text-sm text-white/70">Reputation</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <div className="text-3xl font-bold text-white">{userData.trades}</div>
                <div className="text-sm text-white/70">Trades</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <div className="text-3xl font-bold text-white flex items-center gap-1">
                  <Star className="w-5 h-5 fill-white" />
                  {userData.rating}
                </div>
                <div className="text-sm text-white/70">Rating</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <div className="text-lg font-bold text-white">{userData.memberSince}</div>
                <div className="text-sm text-white/70">Since</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button 
                className="bg-[#E11D48] hover:bg-[#BE123C] text-white px-6 h-11 rounded-xl font-semibold"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-6 h-11 rounded-xl font-semibold"
              >
                Follow
              </Button>
              <Button 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 h-11 w-11 p-0 rounded-xl"
              >
                <Flag className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-stroke-muted dark:border-[#1F2937] bg-bg-base dark:bg-[#0B0F0F] sticky top-16 z-40">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex items-center gap-8 -mb-px overflow-x-auto">
            {['Overview', 'Inventory', 'Listings', 'Activity', 'Reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`
                  py-4 px-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                  ${activeTab === tab.toLowerCase()
                    ? 'border-[#E2233B] dark:border-[#F43F5E] text-text-primary dark:text-[#E5E7EB]'
                    : 'border-transparent text-text-muted dark:text-[#8B93A7] hover:text-text-primary dark:hover:text-[#E5E7EB]'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <Card className="border-stroke-muted dark:border-[#1F2937] rounded-2xl bg-bg-elev-1 dark:bg-[#111316]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-text-primary dark:text-[#E5E7EB] mb-3">About</h3>
                  <p className="text-text-secondary dark:text-[#A7B0BF] leading-relaxed">{userData.bio}</p>
                </CardContent>
              </Card>

              {/* Recent Listings */}
              <Card className="border-stroke-muted dark:border-[#1F2937] rounded-2xl bg-bg-elev-1 dark:bg-[#111316]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-text-primary dark:text-[#E5E7EB]">Recent Listings</h3>
                    <Button variant="ghost" size="sm" className="text-[#E2233B] dark:text-[#F43F5E] hover:text-[#BE1E31] dark:hover:text-[#E2233B] hover:bg-[#FFF1F2] dark:hover:bg-[#FFF1F2]/10">
                      View All
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {recentListings.map((item) => (
                      <div key={item.id} className="group cursor-pointer">
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-bg-subtle dark:bg-[#1a1d1f]">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="text-sm font-semibold text-text-primary dark:text-[#E5E7EB] mb-1 group-hover:text-[#E2233B] dark:group-hover:text-[#F43F5E] transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-lg font-bold text-[#E2233B] dark:text-[#F43F5E]">{item.price}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Trust & Safety */}
              <Card className="border-stroke-muted dark:border-[#1F2937] rounded-2xl bg-bg-elev-1 dark:bg-[#111316]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-text-primary dark:text-[#E5E7EB] mb-4">Trust & Safety</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-5 h-5 text-[#10B981]" fill="#10B981" />
                      <span className="text-text-secondary dark:text-[#A7B0BF]">Steam-verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-5 h-5 text-[#10B981]" fill="#10B981" />
                      <span className="text-text-secondary dark:text-[#A7B0BF]">2FA enabled</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Badges */}
              <Card className="border-stroke-muted dark:border-[#1F2937] rounded-2xl bg-bg-elev-1 dark:bg-[#111316]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-text-primary dark:text-[#E5E7EB] mb-4">Top Badges</h3>
                  <div className="flex flex-wrap gap-2">
                    {userData.badges.map((badge, index) => (
                      <Badge 
                        key={index}
                        variant="secondary"
                        className="bg-bg-subtle dark:bg-[#1a1d1f] border border-stroke-muted dark:border-[#1F2937] text-text-primary dark:text-[#E5E7EB] hover:bg-bg-subtle dark:hover:bg-[#1a1d1f]"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="border-stroke-muted dark:border-[#1F2937] rounded-2xl bg-bg-elev-1 dark:bg-[#111316]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-text-primary dark:text-[#E5E7EB] mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-text-secondary dark:text-[#A7B0BF] hover:text-[#E2233B] dark:hover:text-[#F43F5E] hover:bg-[#FFF1F2] dark:hover:bg-[#FFF1F2]/10"
                      size="sm"
                    >
                      Quick page access for demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-text-muted dark:text-[#8B93A7] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary dark:text-[#E5E7EB] mb-2">Inventory</h3>
            <p className="text-text-muted dark:text-[#8B93A7]">Inventory content will be displayed here</p>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-text-muted dark:text-[#8B93A7] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary dark:text-[#E5E7EB] mb-2">Listings</h3>
            <p className="text-text-muted dark:text-[#8B93A7]">Active listings will be displayed here</p>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="text-center py-16">
            <Clock className="w-16 h-16 text-text-muted dark:text-[#8B93A7] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary dark:text-[#E5E7EB] mb-2">Activity</h3>
            <p className="text-text-muted dark:text-[#8B93A7]">Recent activity will be displayed here</p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="text-center py-16">
            <Star className="w-16 h-16 text-text-muted dark:text-[#8B93A7] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary dark:text-[#E5E7EB] mb-2">Reviews</h3>
            <p className="text-text-muted dark:text-[#8B93A7]">User reviews will be displayed here</p>
          </div>
        )}
      </div>
    </div>
  );
}
