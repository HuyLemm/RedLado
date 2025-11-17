import { Star } from 'lucide-react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GameCardProps {
  title: string;
  image: string;
  genre: string;
  rating: number;
  reviewCount?: string;
  onClick?: () => void;
  className?: string;
}

export function GameCard({ 
  title, 
  image, 
  genre, 
  rating, 
  reviewCount = '1.2k',
  onClick,
  className = '' 
}: GameCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full text-left rounded-2xl border border-stroke-muted bg-bg-elev-1 
        overflow-hidden transition-all duration-200 
        hover:shadow-lg hover:scale-[1.01] hover:border-stroke-strong
        focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 focus:ring-offset-bg-base
        ${className}`}
    >
      {/* Media Frame - 16:9 aspect ratio */}
      <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Bottom gradient overlay - 40-48px height */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>

      {/* Meta Area - Below image */}
      <div className="p-3">
        {/* Title - H4/600 */}
        <h4 className="text-text-primary mb-2 truncate capitalize">
          {title}
        </h4>
        
        {/* Genre chip and Rating on same baseline */}
        <div className="flex items-center justify-between gap-2">
          <Badge 
            variant="outline" 
            className="text-xs border-stroke-muted text-text-muted bg-bg-subtle"
          >
            {genre}
          </Badge>
          
          {/* Rating row */}
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-3.5 h-3.5 fill-accent-yellow text-accent-yellow" />
            <span className="text-text-primary">{rating}</span>
            <span className="text-text-muted">({reviewCount})</span>
          </div>
        </div>
      </div>
    </button>
  );
}
