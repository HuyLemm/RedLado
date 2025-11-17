import { Button } from "@/components/ui/button";
import { CheckCircle, Smartphone, Chrome } from "lucide-react";

interface MobileAppSectionProps {
  title?: string;
  description?: string;
  features?: string[];
}

export function MobileAppSection({ 
  title = "Trade anywhere",
  description = "Take RedLado with you wherever you go. Trade on the move with our mobile apps and browser extension.",
  features = [
    "Instant push notifications for new offers",
    "Quick access to your inventory",
    "Real-time price tracking",
    "Secure mobile authentication"
  ]
}: MobileAppSectionProps) {
  return (
    <section className="py-24 bg-bg-base dark:bg-[#0B0F1A] relative">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, #111827 1px, transparent 0)',
        backgroundSize: '24px 24px'
      }} />
      
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative w-16 h-16 rounded-2xl bg-[#FFF1F2] dark:bg-[#1F1315] border border-[#FFE4E6] dark:border-[#4C1D24] flex items-center justify-center"
              style={{ 
                boxShadow: '0 0 20px rgba(229, 22, 58, 0.14)',
              }}>
              <Smartphone className="w-8 h-8 text-[#E11D48] dark:text-[#F43F5E]" strokeWidth={2} />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <h2 className="text-text-primary dark:text-[#E5E7EB] mb-4">{title}</h2>
            <p className="text-text-secondary dark:text-[#A7B0BF] text-lg mb-6" style={{ lineHeight: 1.5 }}>
              {description}
            </p>

            <ul className="space-y-3 mb-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#E11D48] dark:text-[#F43F5E] flex-shrink-0 mt-0.5" strokeWidth={2} style={{ fill: '#E11D48' }} />
                  <span className="text-base font-semibold text-[#111827] dark:text-[#E5E7EB]" style={{ lineHeight: 1.5 }}>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Button 
                variant="outline" 
                className="h-11 px-5 rounded-xl border border-[#E5E7EB] dark:border-[#1F2630]
                hover:border-[#E11D48] dark:hover:border-[#F43F5E]
                hover:bg-[#FFF5F7] dark:hover:bg-[#2A0B11]/30
                hover:text-[#E11D48] dark:hover:text-[#F43F5E]
                text-text-primary dark:text-[#E5E7EB]
                focus-visible:ring-2 focus-visible:ring-[#F43F5E] dark:focus-visible:ring-[#F87171] focus-visible:ring-offset-2
                transition-all duration-200 font-medium"
              >
                <Smartphone className="w-[18px] h-[18px] mr-2" strokeWidth={2} />
                App Store
              </Button>
              <Button 
                variant="outline" 
                className="h-11 px-5 rounded-xl border border-[#E5E7EB] dark:border-[#1F2630]
                hover:border-[#E11D48] dark:hover:border-[#F43F5E]
                hover:bg-[#FFF5F7] dark:hover:bg-[#2A0B11]/30
                hover:text-[#E11D48] dark:hover:text-[#F43F5E]
                text-text-primary dark:text-[#E5E7EB]
                focus-visible:ring-2 focus-visible:ring-[#F43F5E] dark:focus-visible:ring-[#F87171] focus-visible:ring-offset-2
                transition-all duration-200 font-medium"
              >
                <Smartphone className="w-[18px] h-[18px] mr-2" strokeWidth={2} />
                Google Play
              </Button>
              <Button 
                variant="outline" 
                className="h-11 px-5 rounded-xl border border-[#E5E7EB] dark:border-[#1F2630]
                hover:border-[#E11D48] dark:hover:border-[#F43F5E]
                hover:bg-[#FFF5F7] dark:hover:bg-[#2A0B11]/30
                hover:text-[#E11D48] dark:hover:text-[#F43F5E]
                text-text-primary dark:text-[#E5E7EB]
                focus-visible:ring-2 focus-visible:ring-[#F43F5E] dark:focus-visible:ring-[#F87171] focus-visible:ring-offset-2
                transition-all duration-200 font-medium"
              >
                <Chrome className="w-[18px] h-[18px] mr-2" strokeWidth={2} />
                Extension
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

