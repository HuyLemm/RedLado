"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface BenefitsSectionProps {
  title?: string;
  subtitle?: string;
  benefits: Benefit[];
}

export function BenefitsSection({ 
  title = "Why choose RedLado",
  subtitle,
  benefits 
}: BenefitsSectionProps) {
  return (
    <section className="py-24 bg-bg-subtle dark:bg-[#0d1111]">
      <div className="max-w-screen-xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-text-primary dark:text-[#E5E7EB] mb-4">{title}</h2>
            {subtitle && (
              <p className="text-text-secondary dark:text-[#A7B0BF] text-lg max-w-[640px] mx-auto" style={{ lineHeight: 1.6 }}>
                {subtitle}
              </p>
            )}
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="group bg-bg-elev-1 dark:bg-[#111316] border border-stroke-muted dark:border-[#1F2937] rounded-2xl p-8 hover:shadow-xl hover:ring-2 hover:ring-[#E11D48] dark:hover:ring-[#F43F5E] hover:ring-offset-2 transition-all duration-300"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
              <div className="w-14 h-14 rounded-xl bg-[#FFF1F2] dark:bg-[#1F1315] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-7 h-7 text-[#E11D48] dark:text-[#F43F5E]" />
              </div>
              
              <h3 className="text-text-primary dark:text-[#E5E7EB] mb-3" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600 }}>
                {benefit.title}
              </h3>
              
              <p className="text-text-muted dark:text-[#8B93A7]" style={{ fontSize: '14px', lineHeight: '20px' }}>
                {benefit.description}
              </p>
            </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

