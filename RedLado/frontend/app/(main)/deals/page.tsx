"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Clock, Star, Zap, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageContainer } from "@/components/layout/PageContainer";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

export default function DealsPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56
  });

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const deals = [
    {
      id: 1,
      name: "AK-47 | Neon Revolution",
      image: "https://images.unsplash.com/photo-1669489933476-f4c9bc8d5f65?w=600",
      currentPrice: 127.50,
      originalPrice: 165.00,
      discount: 23,
      rating: 4.8,
      reviews: 342,
      isFlash: true,
      game: "CS2",
      stock: 5
    },
    {
      id: 2,
      name: "Karambit | Fade",
      image: "https://images.unsplash.com/photo-1697707615225-6e213b39aeb7?w=600",
      currentPrice: 1450.00,
      originalPrice: 1750.00,
      discount: 17,
      rating: 4.9,
      reviews: 128,
      isFlash: false,
      game: "CS2",
      stock: 2
    },
    {
      id: 3,
      name: "M4A4 | Howl",
      image: "https://images.unsplash.com/photo-1691353278254-2978a97dd974?w=600",
      currentPrice: 3200.00,
      originalPrice: 3850.00,
      discount: 17,
      rating: 5.0,
      reviews: 89,
      isFlash: true,
      game: "CS2",
      stock: 1
    },
    {
      id: 4,
      name: "AWP | Dragon Lore",
      image: "https://images.unsplash.com/photo-1669489933476-f4c9bc8d5f65?w=600",
      currentPrice: 8900.00,
      originalPrice: 10500.00,
      discount: 15,
      rating: 4.7,
      reviews: 234,
      isFlash: false,
      game: "CS2",
      stock: 3
    },
    {
      id: 5,
      name: "Butterfly Knife | Tiger Tooth",
      image: "https://images.unsplash.com/photo-1697707615225-6e213b39aeb7?w=600",
      currentPrice: 1850.00,
      originalPrice: 2300.00,
      discount: 20,
      rating: 4.9,
      reviews: 456,
      isFlash: true,
      game: "CS2",
      stock: 4
    },
    {
      id: 6,
      name: "Glock-18 | Fade",
      image: "https://images.unsplash.com/photo-1691353278254-2978a97dd974?w=600",
      currentPrice: 425.00,
      originalPrice: 520.00,
      discount: 18,
      rating: 4.6,
      reviews: 178,
      isFlash: false,
      game: "CS2",
      stock: 8
    },
  ];

  const [activeTab, setActiveTab] = useState("all");
  
  const filteredDeals = deals.filter(deal => {
    if (activeTab === "flash") return deal.isFlash;
    if (activeTab === "daily") return !deal.isFlash && deal.discount >= 15;
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-bg-base dark:bg-[#0B0F0F]">
      <PageContainer maxWidth="2xl" className="py-8">
        <Breadcrumbs 
          items={[
            { label: "Home", href: "/" },
            { label: "Deals" }
          ]} 
        />

        {/* 
          TOP BAR: "Flash Deals" + Limited Time pill + "View all" right-aligned 
        */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-text-primary dark:text-[#E5E7EB]">Flash Deals</h1>
            <Badge className="bg-[#E11D48] dark:bg-[#F43F5E] text-white border-0 px-4 py-1.5 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Limited Time
            </Badge>
          </div>
          <Button
            variant="ghost"
            className="text-[#E11D48] dark:text-[#F43F5E] hover:text-[#BE123C] dark:hover:text-[#E11D48] hover:bg-[#FFF1F2] dark:hover:bg-[#1F1315]"
          >
            View all
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* 
          TABS: All / Flash / Daily / Bundles / Wallet Codes 
        */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-bg-elev-1 dark:bg-[#111316] border border-stroke-muted dark:border-[#1F2937] p-1 h-auto">
            <TabsTrigger 
              value="all"
              className="data-[state=active]:bg-[#E11D48] data-[state=active]:dark:bg-[#F43F5E] data-[state=active]:text-white h-10 px-6"
            >
              All Deals
            </TabsTrigger>
            <TabsTrigger 
              value="flash"
              className="data-[state=active]:bg-[#E11D48] data-[state=active]:dark:bg-[#F43F5E] data-[state=active]:text-white h-10 px-6"
            >
              <Zap className="w-4 h-4 mr-2" />
              Flash
            </TabsTrigger>
            <TabsTrigger 
              value="daily"
              className="data-[state=active]:bg-[#E11D48] data-[state=active]:dark:bg-[#F43F5E] data-[state=active]:text-white h-10 px-6"
            >
              Daily Deals
            </TabsTrigger>
            <TabsTrigger 
              value="bundles"
              className="data-[state=active]:bg-[#E11D48] data-[state=active]:dark:bg-[#F43F5E] data-[state=active]:text-white h-10 px-6"
            >
              Bundles
            </TabsTrigger>
            <TabsTrigger 
              value="wallet"
              className="data-[state=active]:bg-[#E11D48] data-[state=active]:dark:bg-[#F43F5E] data-[state=active]:text-white h-10 px-6"
            >
              Wallet Codes
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Render deals grid for all tabs */}
        <div className="mt-8">
            {/* 
              CARD GRID - 3-column
              Discount badge top-left
              FLASH badge top-right
              Timer chip bottom-left on image
              Price stack: current red 20-24, former 14 struck, Save pill
              Outline "View details"
            */}
            {filteredDeals.length > 0 ? (
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDeals.map((deal) => (
                  <StaggerItem key={deal.id}>
                    <motion.div
                      className="group bg-bg-elev-1 dark:bg-[#111316] border border-stroke-muted dark:border-[#1F2937] rounded-2xl overflow-hidden
                      hover:border-[#E11D48] dark:hover:border-[#F43F5E]
                      hover:shadow-xl
                      hover:ring-2 hover:ring-[#E11D48] dark:hover:ring-[#F43F5E] hover:ring-offset-2
                      transition-all duration-300"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                    {/* Image with badges and timer */}
                    <div className="relative aspect-video bg-bg-elev-2 dark:bg-[#1a1d1f]">
                      <ImageWithFallback
                        src={deal.image}
                        alt={deal.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      
                      {/* Discount badge - top-left */}
                      <Badge className="absolute top-3 left-3 bg-[#E11D48] dark:bg-[#F43F5E] text-white border-0 px-3 py-1.5 text-base font-bold">
                        -{deal.discount}%
                      </Badge>
                      
                      {/* FLASH badge - top-right (red) */}
                      {deal.isFlash && (
                        <Badge className="absolute top-3 right-3 bg-[#E11D48] dark:bg-[#F43F5E] text-white border-0 px-3 py-1.5 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 fill-white" />
                          FLASH
                        </Badge>
                      )}
                      
                      {/* Timer chip - bottom-left */}
                      {deal.isFlash && (
                        <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-mono">
                          <Clock className="w-4 h-4" />
                          <span>
                            {String(timeLeft.hours).padStart(2, '0')}:
                            {String(timeLeft.minutes).padStart(2, '0')}:
                            {String(timeLeft.seconds).padStart(2, '0')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Title */}
                      <h4 className="text-text-primary dark:text-[#E5E7EB] mb-2 line-clamp-1 text-base font-semibold">
                        {deal.name}
                      </h4>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        <Star className="w-4 h-4 fill-[#E11D48] text-[#E11D48] dark:fill-[#F43F5E] dark:text-[#F43F5E]" />
                        <span className="text-sm font-semibold text-text-primary dark:text-[#E5E7EB]">{deal.rating}</span>
                        <span className="text-sm text-text-muted dark:text-[#8B93A7]">({deal.reviews})</span>
                        {deal.stock <= 5 && (
                          <Badge variant="outline" className="ml-auto text-xs border-[#E11D48] dark:border-[#F43F5E] text-[#E11D48] dark:text-[#F43F5E]">
                            Only {deal.stock} left
                          </Badge>
                        )}
                      </div>

                      {/* Price Stack */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-2 mb-1">
                          {/* Current price - red 20-24 */}
                          <span className="text-[#E11D48] dark:text-[#F43F5E] text-2xl font-bold">
                            ${deal.currentPrice.toFixed(2)}
                          </span>
                          {/* Former price - 14 struck */}
                          <span className="text-text-muted dark:text-[#8B93A7] line-through text-sm">
                            ${deal.originalPrice.toFixed(2)}
                          </span>
                        </div>
                        {/* Save pill */}
                        <Badge variant="secondary" className="bg-[#FFF1F2] dark:bg-[#1F1315] text-[#E11D48] dark:text-[#F43F5E] border-0 text-xs">
                          Save ${(deal.originalPrice - deal.currentPrice).toFixed(2)}
                        </Badge>
                      </div>

                      {/* Outline "View details" */}
                      <Button
                        variant="outline"
                        className="w-full border-2 border-[#E11D48] dark:border-[#F43F5E] text-[#E11D48] dark:text-[#F43F5E] hover:bg-[#E11D48] dark:hover:bg-[#F43F5E] hover:text-white"
                      >
                        View Details
                    </Button>
                  </div>
                </motion.div>
                </StaggerItem>
              ))}
              </StaggerContainer>
            ) : (
              /* Empty state for other tabs */
              <div className="text-center py-16">
                <TrendingUp className="w-16 h-16 text-text-muted dark:text-[#8B93A7] mx-auto mb-4" />
                <h3 className="text-text-primary dark:text-[#E5E7EB] mb-2">No deals available</h3>
                <p className="text-text-muted dark:text-[#8B93A7]">Check back soon for new deals!</p>
              </div>
            )}
        </div>
      </PageContainer>
    </div>
  );
}
