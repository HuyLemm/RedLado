export interface Deal {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
  timeLeft?: string;
  flash?: boolean;
}

export const mockDeals: Deal[] = [
  {
    id: 1,
    title: "AK-47 | Neon Revolution",
    image: "https://images.unsplash.com/photo-1669489933476-f4c9bc8d5f65?w=400",
    price: 127.50,
    oldPrice: 145.00,
    discount: 12,
    timeLeft: "2h 34m",
    flash: true
  },
  {
    id: 2,
    title: "M4A4 | Howl",
    image: "https://images.unsplash.com/photo-1691353278254-2978a97dd974?w=400",
    price: 3200.00,
    oldPrice: 3500.00,
    discount: 9,
    timeLeft: "5h 12m",
    flash: true
  },
  {
    id: 3,
    title: "Butterfly Knife | Tiger Tooth",
    image: "https://images.unsplash.com/photo-1697707615225-6e213b39aeb7?w=400",
    price: 1850.00,
    oldPrice: 2100.00,
    discount: 12,
    timeLeft: "1h 45m",
    flash: true
  },
  {
    id: 4,
    title: "Daily Bundle Pack",
    image: "https://images.unsplash.com/photo-1669489933476-f4c9bc8d5f65?w=400",
    price: 89.99,
    oldPrice: 120.00,
    discount: 25,
    flash: false
  }
];

