import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

interface DealCardProps {
  deal: {
    id: number;
    title: string;
    image: string;
    price: number;
    oldPrice: number;
    discount: number;
    timeLeft?: string;
    flash?: boolean;
  };
}

export function DealCard({ deal }: DealCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group">
      <div className="relative aspect-video overflow-hidden">
        <ImageWithFallback
          src={deal.image}
          alt={deal.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge className="bg-primary">-{deal.discount}%</Badge>
          {deal.flash && (
            <Badge className="bg-orange-500">FLASH</Badge>
          )}
        </div>
        {deal.timeLeft && (
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 rounded text-white text-xs">
            {deal.timeLeft}
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <h3 className="font-semibold">{deal.title}</h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">
              ${deal.price.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              ${deal.oldPrice.toFixed(2)}
            </span>
          </div>
        </div>
        
        <Button className="w-full">View Details</Button>
      </div>
    </Card>
  );
}

