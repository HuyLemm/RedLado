"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Grid3x3, List, Star, X, Filter } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";
import { ItemCard } from "@/components/features/ItemCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  // Mock data - expanded for better demo
  const items = [
    {
      id: 1,
      name: "AK-47 | Neon Revolution",
      image: "https://images.unsplash.com/photo-1669489933476-f4c9bc8d5f65?w=400",
      price: 127.50,
      oldPrice: 145.00,
      discount: 12,
      rating: 4.8,
      reviews: 342,
      platform: "Steam",
      game: "CS2",
      wear: "Factory New",
    },
    {
      id: 2,
      name: "Karambit | Fade",
      image: "https://images.unsplash.com/photo-1697707615225-6e213b39aeb7?w=400",
      price: 1450.00,
      rating: 4.9,
      reviews: 128,
      platform: "Steam",
      game: "CS2",
      wear: "Minimal Wear"
    },
    {
      id: 3,
      name: "M4A4 | Howl",
      image: "https://images.unsplash.com/photo-1691353278254-2978a97dd974?w=400",
      price: 3200.00,
      oldPrice: 3500.00,
      discount: 9,
      rating: 5.0,
      reviews: 89,
      platform: "Steam",
      game: "CS2",
      wear: "Field-Tested"
    },
    {
      id: 4,
      name: "AWP | Dragon Lore",
      image: "https://images.unsplash.com/photo-1669489933476-f4c9bc8d5f65?w=400",
      price: 8900.00,
      rating: 4.7,
      reviews: 234,
      platform: "Steam",
      game: "CS2",
      wear: "Factory New"
    },
    {
      id: 5,
      name: "Butterfly Knife | Tiger Tooth",
      image: "https://images.unsplash.com/photo-1697707615225-6e213b39aeb7?w=400",
      price: 1850.00,
      oldPrice: 2100.00,
      discount: 12,
      rating: 4.9,
      reviews: 456,
      platform: "Steam",
      game: "CS2",
      wear: "Factory New"
    },
    {
      id: 6,
      name: "Glock-18 | Fade",
      image: "https://images.unsplash.com/photo-1691353278254-2978a97dd974?w=400",
      price: 425.00,
      rating: 4.6,
      reviews: 178,
      platform: "Steam",
      game: "CS2",
      wear: "Factory New"
    },
  ];

  const platforms = ["Steam", "Epic Games", "Origin", "Battle.net"];
  const games = ["CS2", "Dota 2", "Rust", "TF2"];

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSelectedPlatforms([]);
    setPriceRange([0, 10000]);
  };

  return (
    <div className="w-full min-h-screen bg-bg-base dark:bg-[#0B0F0F]">
      <PageContainer maxWidth="2xl" className="py-8">
        <Breadcrumbs 
          items={[
            { label: "Home", href: "/" },
            { label: "Items" }
          ]} 
        />

        <PageHeader 
          title="Browse Items"
          description="Discover thousands of items from your favorite games"
        />

        {/* Main Layout: Sidebar + Content */}
        <div className="flex gap-8">
          {/* LEFT SIDEBAR - Sticky */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Platform Search */}
              <div>
                <h3 className="text-text-primary dark:text-[#E5E7EB] mb-3 text-base font-semibold">
                  Platforms
                </h3>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted dark:text-[#8B93A7] pointer-events-none" />
                  <Input
                    placeholder="Search platforms..."
                    className="h-12 pl-10 pr-4 bg-bg-elev-1 dark:bg-[#111316] border-stroke-muted dark:border-[#1F2937]
                    focus:border-[#E11D48] dark:focus:border-[#F43F5E] focus:ring-2 focus:ring-[#F43F5E]/20 dark:focus:ring-[#F87171]/20"
                  />
                </div>

                {/* Platforms List */}
                <div className="space-y-3">
                  {platforms.map((platform) => (
                    <div key={platform} className="flex items-center space-x-2">
                      <Checkbox
                        id={platform}
                        checked={selectedPlatforms.includes(platform)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedPlatforms([...selectedPlatforms, platform]);
                            addFilter(platform);
                          } else {
                            setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
                            removeFilter(platform);
                          }
                        }}
                        className="border-stroke-muted dark:border-[#1F2937] 
                        data-[state=checked]:bg-[#E11D48] dark:data-[state=checked]:bg-[#F43F5E] 
                        data-[state=checked]:border-[#E11D48] dark:data-[state=checked]:border-[#F43F5E]"
                      />
                      <Label 
                        htmlFor={platform}
                        className="text-text-secondary dark:text-[#A7B0BF] cursor-pointer hover:text-text-primary dark:hover:text-[#E5E7EB]"
                      >
                        {platform}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="dark:bg-[#1F2937]" />

              {/* Price Range */}
              <div>
                <h3 className="text-text-primary dark:text-[#E5E7EB] mb-4 text-base font-semibold">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <Slider
                    min={0}
                    max={10000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="[&_[role=slider]]:bg-[#E11D48] dark:[&_[role=slider]]:bg-[#F43F5E] [&_[role=slider]]:border-[#E11D48] dark:[&_[role=slider]]:border-[#F43F5E]"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted dark:text-[#8B93A7]">${priceRange[0]}</span>
                    <span className="text-text-muted dark:text-[#8B93A7]">${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <Separator className="dark:bg-[#1F2937]" />

              {/* Rating */}
              <div>
                <h3 className="text-text-primary dark:text-[#E5E7EB] mb-3 text-base font-semibold">
                  Rating
                </h3>
                <div className="space-y-2">
                  {[5, 4, 3].map((rating) => (
                    <button
                      key={rating}
                      className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-bg-elev-1 dark:hover:bg-[#111316] transition-colors text-left"
                      onClick={() => addFilter(`${rating}+ stars`)}
                    >
                      <div className="flex">
                        {Array.from({ length: rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#E11D48] text-[#E11D48] dark:fill-[#F43F5E] dark:text-[#F43F5E]" />
                        ))}
                      </div>
                      <span className="text-sm text-text-secondary dark:text-[#A7B0BF]">& up</span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="dark:bg-[#1F2937]" />

              {/* Game */}
              <div>
                <h3 className="text-text-primary dark:text-[#E5E7EB] mb-3 text-base font-semibold">
                  Game
                </h3>
                <div className="space-y-2">
                  {games.map((game) => (
                    <button
                      key={game}
                      onClick={() => addFilter(game)}
                      className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-bg-elev-1 dark:hover:bg-[#111316] transition-colors text-left"
                    >
                      <span className="text-sm text-text-secondary dark:text-[#A7B0BF]">{game}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <div className="flex-1 min-w-0">
            {/* Active Filters Chips + Clear All */}
            {activeFilters.length > 0 && (
              <div className="mb-6 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-text-muted dark:text-[#8B93A7]">Active filters:</span>
                {activeFilters.map((filter) => (
                  <Badge
                    key={filter}
                    variant="secondary"
                    className="bg-[#FFF1F2] dark:bg-[#1F1315] text-[#E11D48] dark:text-[#F43F5E] border border-[#FFE4E6] dark:border-[#4C1D24] pl-3 pr-1 py-1.5 gap-1"
                  >
                    {filter}
                    <button
                      onClick={() => removeFilter(filter)}
                      className="ml-1 hover:bg-[#FFE4E6] dark:hover:bg-[#4C1D24] rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-text-muted dark:text-[#8B93A7] hover:text-[#E11D48] dark:hover:text-[#F43F5E] h-auto py-1 px-2"
                >
                  Clear all
                </Button>
              </div>
            )}

            {/* Results Toolbar: Sort, View toggle, items per page */}
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-bg-elev-1 dark:bg-[#111316] border border-stroke-muted dark:border-[#1F2937] rounded-xl">
              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-48 bg-bg-base dark:bg-[#0B0F0F] border-stroke-muted dark:border-[#1F2937]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-[#111316] dark:border-[#1F2937]">
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="new">Newest</SelectItem>
                  </SelectContent>
                </Select>

                {/* Items per page */}
                <Select defaultValue="12">
                  <SelectTrigger className="w-32 bg-bg-base dark:bg-[#0B0F0F] border-stroke-muted dark:border-[#1F2937]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-[#111316] dark:border-[#1F2937]">
                    <SelectItem value="12">12 items</SelectItem>
                    <SelectItem value="24">24 items</SelectItem>
                    <SelectItem value="48">48 items</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-bg-base dark:bg-[#0B0F0F] rounded-lg p-1 border border-stroke-muted dark:border-[#1F2937]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`h-8 px-3 ${
                    viewMode === 'grid'
                      ? 'bg-[#E11D48] dark:bg-[#F43F5E] text-white hover:bg-[#BE123C] dark:hover:bg-[#E11D48]'
                      : 'text-text-muted dark:text-[#8B93A7] hover:text-text-primary dark:hover:text-[#E5E7EB]'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`h-8 px-3 ${
                    viewMode === 'list'
                      ? 'bg-[#E11D48] dark:bg-[#F43F5E] text-white hover:bg-[#BE123C] dark:hover:bg-[#E11D48]'
                      : 'text-text-muted dark:text-[#8B93A7] hover:text-text-primary dark:hover:text-[#E5E7EB]'
                  }`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* ITEMS GRID/LIST */}
            {viewMode === 'grid' ? (
              <StaggerContainer className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {items.map((item) => (
                  <StaggerItem key={item.id}>
                    <motion.div
                      className="group bg-bg-elev-1 dark:bg-[#111316] border border-stroke-muted dark:border-[#1F2937] rounded-xl overflow-hidden
                      hover:border-[#E11D48] dark:hover:border-[#F43F5E]
                      hover:shadow-xl
                      hover:ring-2 hover:ring-[#E11D48] dark:hover:ring-[#F43F5E] hover:ring-offset-2
                      transition-all duration-300"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                    {/* Image 72×72 with badges */}
                    <div className="relative w-full h-72 bg-bg-elev-2 dark:bg-[#1a1d1f]">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Discount badge - top-left */}
                      {item.discount && (
                        <Badge className="absolute top-3 left-3 bg-[#E11D48] dark:bg-[#F43F5E] text-white border-0">
                          -{item.discount}%
                        </Badge>
                      )}
                      {/* Game tag - top-right */}
                      <Badge className="absolute top-3 right-3 bg-bg-elev-1/90 dark:bg-[#111316]/90 backdrop-blur-sm border-stroke-muted dark:border-[#1F2937]">
                        {item.game}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Title - 1 line */}
                      <h4 className="text-text-primary dark:text-[#E5E7EB] mb-1 line-clamp-1 text-base font-semibold">
                        {item.name}
                      </h4>
                      
                      {/* Meta line */}
                      <p className="text-sm text-text-muted dark:text-[#8B93A7] mb-3">{item.wear}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        <Star className="w-4 h-4 fill-[#E11D48] text-[#E11D48] dark:fill-[#F43F5E] dark:text-[#F43F5E]" />
                        <span className="text-sm font-semibold text-text-primary dark:text-[#E5E7EB]">{item.rating}</span>
                        <span className="text-sm text-text-muted dark:text-[#8B93A7]">({item.reviews})</span>
                      </div>

                      {/* Price stack + CTA */}
                      <div className="flex items-end justify-between">
                        {/* Right-aligned Price stack */}
                        <div>
                          <div className="text-[#E11D48] dark:text-[#F43F5E] text-xl font-bold">
                            ${item.price.toFixed(2)}
                          </div>
                          {item.oldPrice && (
                            <div className="text-text-muted dark:text-[#8B93A7] line-through text-sm">
                              ${item.oldPrice.toFixed(2)}
                            </div>
                          )}
                        </div>

                        {/* Primary CTA */}
                        <Button
                          size="sm"
                          className="bg-[#E11D48] hover:bg-[#BE123C] dark:bg-[#F43F5E] dark:hover:bg-[#E11D48] text-white"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              /* LIST VIEW */
              <StaggerContainer className="space-y-4">
                {items.map((item) => (
                  <StaggerItem key={item.id}>
                    <motion.div
                      className="group flex gap-4 bg-bg-elev-1 dark:bg-[#111316] border border-stroke-muted dark:border-[#1F2937] rounded-xl overflow-hidden p-4
                      hover:border-[#E11D48] dark:hover:border-[#F43F5E]
                      hover:shadow-lg
                      hover:ring-2 hover:ring-[#E11D48] dark:hover:ring-[#F43F5E] hover:ring-offset-2
                      transition-all duration-300"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                    {/* Image 72×72 */}
                    <div className="relative w-72 h-72 flex-shrink-0 rounded-lg overflow-hidden bg-bg-elev-2 dark:bg-[#1a1d1f]">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {item.discount && (
                        <Badge className="absolute top-2 left-2 bg-[#E11D48] dark:bg-[#F43F5E] text-white border-0">
                          -{item.discount}%
                        </Badge>
                      )}
                      <Badge className="absolute top-2 right-2 bg-bg-elev-1/90 dark:bg-[#111316]/90 backdrop-blur-sm">
                        {item.game}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-text-primary dark:text-[#E5E7EB] mb-2 text-lg font-semibold">
                          {item.name}
                        </h4>
                        <p className="text-text-muted dark:text-[#8B93A7] mb-3">{item.wear}</p>
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-4 h-4 fill-[#E11D48] text-[#E11D48] dark:fill-[#F43F5E] dark:text-[#F43F5E]" />
                          <span className="text-sm font-semibold text-text-primary dark:text-[#E5E7EB]">{item.rating}</span>
                          <span className="text-sm text-text-muted dark:text-[#8B93A7]">({item.reviews} reviews)</span>
                        </div>
                      </div>

                      <div className="flex items-end justify-between mt-4">
                        <div>
                          <div className="text-[#E11D48] dark:text-[#F43F5E] text-2xl font-bold">
                            ${item.price.toFixed(2)}
                          </div>
                          {item.oldPrice && (
                            <div className="text-text-muted dark:text-[#8B93A7] line-through text-sm">
                              ${item.oldPrice.toFixed(2)}
                            </div>
                          )}
                        </div>

                        <Button className="bg-[#E11D48] hover:bg-[#BE123C] dark:bg-[#F43F5E] dark:hover:bg-[#E11D48] text-white h-12 px-8">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
