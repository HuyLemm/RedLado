export interface MarketplaceItem {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  platform: string;
  game: string;
  wear?: string;
  fromLabel?: string;
}

export const mockItems: MarketplaceItem[] = [
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
    fromLabel: "from"
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
    wear: "Factory New",
    fromLabel: "from"
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
    name: "AWP | Asiimov",
    image: "https://images.unsplash.com/photo-1691353278254-2978a97dd974?w=400",
    price: 890.00,
    oldPrice: 980.00,
    discount: 9,
    rating: 4.6,
    reviews: 312,
    platform: "Steam",
    game: "CS2",
    wear: "Field-Tested"
  }
];

