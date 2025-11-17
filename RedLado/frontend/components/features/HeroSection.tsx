import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  children: ReactNode;
  badge?: {
    text: string;
    showPing?: boolean;
  };
  className?: string;
  patternOpacity?: number;
}

export function HeroSection({ 
  children, 
  badge, 
  className = "",
  patternOpacity = 0.08 
}: HeroSectionProps) {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-bg-base via-bg-subtle to-bg-base dark:from-[#0B0F0F] dark:via-[#0d1111] dark:to-[#0B0F0F] ${className}`}>
      {/* Background Pattern - Light mode */}
      <div 
        className="absolute inset-0 dark:hidden"
        style={{
          opacity: patternOpacity
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#E11D48] via-transparent to-[#E11D48]" />
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }} 
        />
      </div>
      {/* Background Pattern - Dark mode */}
      <div 
        className="absolute inset-0 hidden dark:block"
        style={{
          opacity: patternOpacity + 0.02
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#F43F5E] via-transparent to-[#F43F5E]" />
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }} 
        />
      </div>

      <div className="relative z-10">
        {badge && (
          <div className="mb-6 md:mb-8 flex justify-center">
            <Badge 
              variant="secondary" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF1F2] dark:bg-[#1F1315] border-[#FFE4E6] dark:border-[#4C1D24] text-[#E11D48] dark:text-[#F43F5E] whitespace-nowrap"
            >
              {badge.showPing && (
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D48] dark:bg-[#F43F5E] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E11D48] dark:bg-[#F43F5E]"></span>
                </span>
              )}
              <span>{badge.text}</span>
            </Badge>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

