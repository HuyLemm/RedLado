import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButton: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  };
  secondaryButton?: {
    label: string;
    onClick: () => void;
  };
}

export function CTASection({ title, description, primaryButton, secondaryButton }: CTASectionProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient red */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#E11D48] via-[#BE123C] to-[#E11D48] dark:from-[#F43F5E] dark:via-[#E11D48] dark:to-[#F43F5E]" />
      <div 
        className="absolute inset-0 opacity-[0.10]" 
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
        }} 
      />
      
      <div className="relative max-w-screen-xl mx-auto px-6 text-center">
        <h2 className="text-white mb-4" style={{ fontSize: '40px', lineHeight: '48px', fontWeight: 700 }}>
          {title}
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={primaryButton.onClick}
            size="lg"
            className="h-14 px-10 bg-white text-[#E11D48] hover:bg-white/90 dark:text-[#F43F5E] shadow-xl focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          >
            {primaryButton.icon}
            {primaryButton.label}
          </Button>
          {secondaryButton && (
            <Button
              onClick={secondaryButton.onClick}
              size="lg"
              variant="ghost"
              className="h-14 px-10 text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50"
            >
              {secondaryButton.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

