import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

interface PostCardProps {
  post: {
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
  };
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={post.author.avatar} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">@{post.author.username} • {post.timeAgo}</p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <p className="text-sm">{post.content}</p>
      
      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {post.images.map((img, idx) => (
            <div key={idx} className="relative aspect-square overflow-hidden rounded-lg">
              <ImageWithFallback
                src={img}
                alt={`Post image ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
      
      {/* Actions */}
      <div className="flex items-center gap-4 border-t pt-4">
        <Button variant="ghost" size="sm">
          <Heart className="w-4 h-4 mr-2" />
          {post.likes}
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          {post.comments}
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          {post.shares}
        </Button>
        <Button variant="ghost" size="sm" className="ml-auto">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}

