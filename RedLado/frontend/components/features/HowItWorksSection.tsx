import { LucideIcon } from "lucide-react";

interface Step {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface HowItWorksSectionProps {
  title?: string;
  subtitle?: string;
  steps: Step[];
}

export function HowItWorksSection({ 
  title = "How it works",
  subtitle,
  steps 
}: HowItWorksSectionProps) {
  return (
    <section className="py-24 bg-bg-subtle dark:bg-[#0d1111]">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-text-primary dark:text-[#E5E7EB] mb-4">{title}</h2>
          {subtitle && (
            <p className="text-text-secondary dark:text-[#A7B0BF] text-lg">
              {subtitle}
            </p>
          )}
        </div>

        {/* Desktop: Horizontal stepper with progress line */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Progress line - red gradient full */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gradient-to-r from-[#E11D48] to-[#BE123C] dark:from-[#F43F5E] dark:to-[#E11D48]" />

            {/* 4 equal columns */}
            <div className="grid grid-cols-4 gap-8 relative">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  {/* Active pill - red */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E11D48] dark:bg-[#F43F5E] text-white font-bold text-lg mb-6 relative z-10">
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-[#FFF1F2] dark:bg-[#1F1315] flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-[#E11D48] dark:text-[#F43F5E]" />
                  </div>
                  
                  {/* Title 16/24 600 */}
                  <h3 className="text-text-primary dark:text-[#E5E7EB] mb-2" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600 }}>
                    {step.title}
                  </h3>
                  
                  {/* Subtext 14/20 muted */}
                  <p className="text-text-muted dark:text-[#8B93A7]" style={{ fontSize: '14px', lineHeight: '20px' }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#E11D48] dark:bg-[#F43F5E] text-white font-bold flex items-center justify-center">
                  {step.step}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-16 bg-[#E11D48] dark:bg-[#F43F5E] mx-auto mt-2" />
                )}
              </div>
              <div className="flex-1 pb-8">
                <div className="w-12 h-12 rounded-lg bg-[#FFF1F2] dark:bg-[#1F1315] flex items-center justify-center mb-3">
                  <step.icon className="w-6 h-6 text-[#E11D48] dark:text-[#F43F5E]" />
                </div>
                <h3 className="text-text-primary dark:text-[#E5E7EB] mb-2" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600 }}>
                  {step.title}
                </h3>
                <p className="text-text-muted dark:text-[#8B93A7]" style={{ fontSize: '14px', lineHeight: '20px' }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

