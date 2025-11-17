import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  showViewAll?: boolean;
  onViewAllClick?: () => void;
  className?: string;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  showViewAll = false, 
  onViewAllClick,
  className = '' 
}: SectionHeaderProps) {
  return (
    <div className={`flex items-baseline justify-between mb-6 ${className}`}>
      <div>
        {/* H2 24-28px with proper hierarchy */}
        <h2 className="text-text-primary mb-1">{title}</h2>
        {subtitle && (
          <p className="text-text-muted" style={{ fontSize: '12px', lineHeight: '18px' }}>
            {subtitle}
          </p>
        )}
      </div>
      
      {showViewAll && (
        <Button 
          variant="ghost" 
          onClick={onViewAllClick}
          className="text-text-secondary hover:text-text-primary flex items-center gap-1
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base
            transition-all duration-200"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
