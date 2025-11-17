export interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  timeAgo: string;
}

export const mockPosts: Post[] = [
  {
    id: 1,
    author: {
      name: "Alex Trader",
      avatar: "https://i.pravatar.cc/150?img=12",
      username: "alextrader"
    },
    content: "Just scored this amazing AK-47 | Neon Revolution! Best deal on RedLado! 🔥",
    images: [
      "https://images.unsplash.com/photo-1669489933476-f4c9bc8d5f65?w=400"
    ],
    likes: 234,
    comments: 45,
    shares: 12,
    timeAgo: "2h"
  },
  {
    id: 2,
    author: {
      name: "Sarah Gaming",
      avatar: "https://i.pravatar.cc/150?img=33",
      username: "sarahgaming"
    },
    content: "Found the perfect Karambit for my collection! Trading experience on RedLado is top-notch!",
    likes: 189,
    comments: 32,
    shares: 8,
    timeAgo: "4h"
  },
  {
    id: 3,
    author: {
      name: "Mike Dealer",
      avatar: "https://i.pravatar.cc/150?img=8",
      username: "mikedealer"
    },
    content: "Flash sale starting soon! Don't miss out on these incredible deals!",
    images: [
      "https://images.unsplash.com/photo-1691353278254-2978a97dd974?w=400",
      "https://images.unsplash.com/photo-1697707615225-6e213b39aeb7?w=400"
    ],
    likes: 456,
    comments: 78,
    shares: 34,
    timeAgo: "6h"
  }
];

