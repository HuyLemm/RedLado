import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

interface ItemCardProps {
  item: {
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
  };
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group">
      <div className="relative aspect-video overflow-hidden">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {item.discount && (
          <Badge className="absolute top-2 left-2 bg-primary">
            -{item.discount}%
          </Badge>
        )}
      </div>
      
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
          <span>{item.rating}</span>
          <span>({item.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-primary">
                ${item.price.toFixed(2)}
              </span>
              {item.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${item.oldPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs">
            {item.platform}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {item.game}
          </Badge>
        </div>
      </div>
    </Card>
  );
}

