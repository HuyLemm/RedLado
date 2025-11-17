import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, TrendingUp, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { useRouter } from "next/navigation";

interface HeroContentProps {
  badge?: {
    text: string;
    showPing?: boolean;
  };
  title: string;
  description: string;
  primaryCTA: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  showScrollIndicator?: boolean;
}

export function HeroContent({
  badge,
  title,
  description,
  primaryCTA,
  secondaryCTA,
  showScrollIndicator = true
}: HeroContentProps) {
  const router = useRouter();

  return (
    <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 py-28">
      <div className="grid grid-cols-12 gap-6 items-center">
        {/* Left: Hero Content */}
        <div className="col-span-12 lg:col-span-6 text-left">
          {badge && (
            <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#FFF1F2] dark:bg-[#1F1315] border-[#FFE4E6] dark:border-[#4C1D24] text-[#E11D48] dark:text-[#F43F5E]">
              {badge.showPing && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D48] dark:bg-[#F43F5E] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E11D48] dark:bg-[#F43F5E]"></span>
                </span>
              )}
              {badge.text}
            </Badge>
          )}

          <h1 
            className="text-text-primary dark:text-[#E5E7EB] max-w-[640px]" 
            style={{ fontSize: '56px', lineHeight: '64px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '18px' }}
          >
            {title}
          </h1>

          <p 
            className="text-text-secondary dark:text-[#A7B0BF] max-w-[640px]" 
            style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '22px' }}
          >
            {description}
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <Button 
              onClick={() => router.push(primaryCTA.href)}
              className="h-12 px-6 bg-[#E11D48] hover:bg-[#BE123C] active:bg-[#9F1239] dark:bg-[#F43F5E] dark:hover:bg-[#E11D48] dark:active:bg-[#BE123C] text-white focus-visible:ring-2 focus-visible:ring-[#F43F5E] dark:focus-visible:ring-[#F87171] focus-visible:ring-offset-2 transition-all duration-200"
            >
              {primaryCTA.label}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            {secondaryCTA && (
              <Button 
                onClick={() => router.push(secondaryCTA.href)}
                variant="outline"
                className="h-12 px-6 border border-[#374151] dark:border-[#374151] hover:bg-white/[0.04] dark:hover:bg-white/[0.04] text-text-primary dark:text-[#E5E7EB] focus-visible:ring-2 focus-visible:ring-[#F43F5E] dark:focus-visible:ring-[#F87171] focus-visible:ring-offset-2 transition-all duration-200"
              >
                {secondaryCTA.label}
              </Button>
            )}
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E11D48] to-[#BE123C] dark:from-[#F43F5E] dark:to-[#E11D48] border-2 border-bg-base dark:border-[#0B0F1A]" />
                ))}
              </div>
              <span className="text-sm text-text-muted dark:text-[#8B93A7]">5,000+ today</span>
            </div>
            <div className="h-4 w-px bg-stroke-muted dark:bg-[#1F2937] hidden sm:block" />
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-[#E11D48] text-[#E11D48] dark:fill-[#F43F5E] dark:text-[#F43F5E]" />
              <span className="text-sm font-semibold text-text-primary dark:text-[#E5E7EB]">4.9/5</span>
              <span className="text-sm text-text-muted dark:text-[#8B93A7]">rating</span>
            </div>
            <div className="h-4 w-px bg-stroke-muted dark:bg-[#1F2937] hidden sm:block lg:hidden" />
            <div className="flex items-center gap-3 px-4 py-2 bg-bg-elev-1 dark:bg-[#0E1116] border border-stroke-muted dark:border-[#222933] rounded-xl lg:hidden">
              <div className="w-8 h-8 rounded-lg bg-[#FFE9EE] dark:bg-[#2A0B11]/60 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-[#E11D48] dark:text-[#F43F5E]" strokeWidth={2} />
              </div>
              <div>
                <div className="text-xs text-text-muted dark:text-[#96A0B5]">24h Volume</div>
                <div className="text-base font-bold text-text-primary dark:text-[#F8FAFC]">$2.4M</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Hero Visual */}
        <div className="col-span-12 lg:col-span-6 relative">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-stroke-muted dark:border-[#1F2937]" 
            style={{ 
              boxShadow: '0 24px 48px rgba(0,0,0,0.25)',
              zIndex: 1
            }}>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1558744059-a9e737085db7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
              alt="CS2 Gaming"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#E11D48] dark:bg-[#0B0F0F] opacity-20 dark:opacity-30 mix-blend-multiply dark:mix-blend-normal" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#E11D48]/30 to-transparent dark:from-[#F43F5E]/30" />
          </div>
          
          <div className="hidden lg:block absolute bottom-6 left-6 bg-white/96 dark:bg-[#0E1116]/96 border border-[#EFF1F4] dark:border-[#222933] rounded-2xl p-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-300"
            style={{ 
              zIndex: 2,
              boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
              width: '240px',
              backdropFilter: 'blur(8px)'
            }}>
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-lg bg-[#FFE9EE] dark:bg-[#2A0B11]/60 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#E11D48] dark:text-[#F43F5E]" strokeWidth={2} />
              </div>
              <div className="text-xs font-medium text-[#7A8599] dark:text-[#96A0B5]">24h Volume</div>
              <div className="text-2xl font-bold text-[#111827] dark:text-[#F8FAFC]">$2.4M</div>
            </div>
          </div>
        </div>
      </div>

      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-text-muted dark:text-[#8B93A7]">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 text-text-muted dark:text-[#8B93A7]" />
        </div>
      )}
    </div>
  );
}

