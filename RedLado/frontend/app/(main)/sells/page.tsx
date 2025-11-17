"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Upload,
  DollarSign,
  Zap,
  CheckCircle,
  ShoppingBag,
  Package,
  TrendingUp
} from "lucide-react";
import { useRouter } from "next/navigation";
import { HeroSection } from "@/components/features/HeroSection";
import { HowItWorksSection } from "@/components/features/HowItWorksSection";
import { SearchModule } from "@/components/features/SearchModule";
import { CTASection } from "@/components/features/CTASection";
import { PageContainer } from "@/components/layout/PageContainer";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

export default function SellsPage() {
  const router = useRouter();

  const popularSearches = [
    "AK-47 | Neon Revolution",
    "Karambit Fade",
    "Steam wallet code",
    "AWP Dragon Lore",
    "Butterfly Knife",
    "M4A4 Howl"
  ];

  const categories = [
    {
      id: 1,
      name: "CS2 Skins",
      items: "1,234",
      status: "Active",
      icon: Package
    },
    {
      id: 2,
      name: "Knives",
      items: "567",
      status: "Active",
      icon: Zap
    },
    {
      id: 3,
      name: "Gloves",
      items: "234",
      status: "Active",
      icon: ShoppingBag
    },
    {
      id: 4,
      name: "Stickers",
      items: "890",
      status: "Active",
      icon: TrendingUp
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "List Your Items",
      description: "Upload items from your Steam inventory instantly",
      icon: Upload
    },
    {
      step: 2,
      title: "Set Your Price",
      description: "Choose your price or use instant sell options",
      icon: DollarSign
    },
    {
      step: 3,
      title: "Get Offers",
      description: "Receive instant offers from verified buyers",
      icon: Zap
    },
    {
      step: 4,
      title: "Complete Trade",
      description: "Secure payment and instant delivery",
      icon: CheckCircle
    }
  ];

  return (
    <div className="w-full bg-bg-base dark:bg-[#0B0F0F]">
      {/* Hero Section */}
      <HeroSection 
        badge={{ text: "Sell your items in seconds", showPing: true }}
        className="py-28"
      >
        <PageContainer maxWidth="xl" className="text-center">
          {/* H1 - 56/64 */}
          <h1 
            className="text-text-primary dark:text-[#E5E7EB] max-w-[680px] mx-auto" 
            style={{ fontSize: '56px', lineHeight: '64px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '18px' }}
          >
            Turn your inventory into cash
          </h1>

          {/* Subtext - max-width 640, spacing 16-20px */}
          <p 
            className="text-text-secondary dark:text-[#A7B0BF] max-w-[640px] mx-auto" 
            style={{ fontSize: '16px', lineHeight: '24px', marginBottom: '22px' }}
          >
            Sell your CS2 items instantly or list them at your own price. Fast, secure, and commission-free trading for all your gaming items.
          </p>

          {/* CTAs - spacing 20-24px, height 48 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => router.push("/login")}
              className="h-12 px-8 bg-[#E11D48] hover:bg-[#BE123C] active:bg-[#9F1239] dark:bg-[#F43F5E] dark:hover:bg-[#E11D48] dark:active:bg-[#BE123C] text-white focus-visible:ring-2 focus-visible:ring-[#F43F5E] dark:focus-visible:ring-[#F87171] focus-visible:ring-offset-2 transition-all duration-200"
            >
              Sell Items
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              onClick={() => router.push("/marketplace")}
              variant="outline"
              className="h-12 px-8 border-2 border-[#E11D48] dark:border-[#F43F5E] text-[#E11D48] dark:text-[#F43F5E] hover:bg-[#E11D48] dark:hover:bg-[#F43F5E] hover:text-white focus-visible:ring-2 focus-visible:ring-[#F43F5E] dark:focus-visible:ring-[#F87171] focus-visible:ring-offset-2 transition-all duration-200"
            >
              Buy Items
            </Button>
          </div>
        </PageContainer>
      </HeroSection>

      {/* How It Works Section */}
      <HowItWorksSection 
        title="How it works"
        subtitle="Start selling in 4 simple steps"
        steps={howItWorks}
      />

      {/* Search Module */}
      <section className="py-24 bg-bg-base dark:bg-[#0B0F0F]">
        <PageContainer maxWidth="xl">
          <SearchModule 
            placeholder="Search for items, skins, or games..."
            popularSearches={popularSearches}
          />
        </PageContainer>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-bg-subtle dark:bg-[#0d1111]">
        <PageContainer maxWidth="xl">
          <div className="text-center mb-12">
            <h2 className="text-text-primary dark:text-[#E5E7EB] mb-4">Browse Categories</h2>
            <p className="text-text-secondary dark:text-[#A7B0BF] text-lg">
              Explore items by category
            </p>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <StaggerItem key={category.id}>
                <motion.button
                  className="group bg-bg-elev-1 dark:bg-[#111316] border border-stroke-muted dark:border-[#1F2937] rounded-2xl p-8 text-left
                  hover:border-[#E11D48] dark:hover:border-[#F43F5E]
                  hover:shadow-xl
                  hover:ring-2 hover:ring-[#E11D48] dark:hover:ring-[#F43F5E] hover:ring-offset-2
                  transition-all duration-300"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#FFF1F2] dark:bg-[#1F1315] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <category.icon className="w-7 h-7 text-[#E11D48] dark:text-[#F43F5E]" />
                </div>

                {/* Title + Status */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-text-primary dark:text-[#E5E7EB] font-semibold">
                    {category.name}
                  </h3>
                  <Badge className="bg-[#FFF1F2] dark:bg-[#1F1315] text-[#E11D48] dark:text-[#F43F5E] border-0 text-xs">
                    {category.status}
                  </Badge>
                </div>

                {/* Item count */}
                <p className="text-text-muted dark:text-[#8B93A7] text-sm">
                  {category.items} items
                </p>
              </motion.button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </PageContainer>
      </section>

      {/* Bottom CTA Section */}
      <CTASection
        title="Ready to start selling?"
        description="Join thousands of traders who trust RedLado for secure, instant trades every day."
        primaryButton={{
          label: "Sign in with Steam",
          onClick: () => router.push("/login")
        }}
        secondaryButton={{
          label: "Browse Market",
          onClick: () => router.push("/marketplace")
        }}
      />
    </div>
  );
}

