"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

interface FeaturedItem {
  id: number;
  name: string;
  wear: string;
  game: string;
  price: string;
  image: string;
}

interface FeaturedItemsSectionProps {
  title?: string;
  items: FeaturedItem[];
  viewAllHref?: string;
}

export function FeaturedItemsSection({ 
  title = "Featured items",
  items,
  viewAllHref = "/marketplace"
}: FeaturedItemsSectionProps) {
  const router = useRouter();

  return (
    <section className="py-24 bg-bg-base dark:bg-[#0B0F0F]">
      <div className="max-w-screen-xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-text-primary dark:text-[#E5E7EB]">{title}</h2>
            <Button 
              variant="ghost" 
              onClick={() => router.push(viewAllHref)}
              className="text-[#E11D48] dark:text-[#F43F5E] hover:text-[#BE123C] dark:hover:text-[#E11D48] hover:bg-[#FFF1F2] dark:hover:bg-[#1F1315]"
            >
              View all
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <StaggerItem key={item.id}>
              <motion.div
                className="group bg-bg-elev-1 dark:bg-[#111316] border border-stroke-muted dark:border-[#1F2937] rounded-2xl overflow-hidden 
                hover:border-[#E11D48] dark:hover:border-[#F43F5E] 
                hover:shadow-xl
                hover:ring-2 hover:ring-[#E11D48] dark:hover:ring-[#F43F5E] hover:ring-offset-2
                transition-all duration-300"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
              <div className="relative aspect-video overflow-hidden bg-bg-elev-2 dark:bg-[#1a1d1f]">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-[#E11D48]/90 dark:bg-[#F43F5E]/90 text-white backdrop-blur-sm border-0">
                    {item.game}
                  </Badge>
                </div>
              </div>

              <div className="p-5">
                <h4 className="text-text-primary dark:text-[#E5E7EB] mb-1 line-clamp-1">{item.name}</h4>
                <p className="text-sm text-text-muted dark:text-[#8B93A7] mb-4">{item.wear}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-text-primary dark:text-[#E5E7EB] font-semibold">{item.price}</span>
                  <Button 
                    size="sm"
                    className="bg-[#E11D48] hover:bg-[#BE123C] dark:bg-[#F43F5E] dark:hover:bg-[#E11D48] text-white h-9"
                  >
                    Trade
                  </Button>
                </div>
              </div>
            </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

