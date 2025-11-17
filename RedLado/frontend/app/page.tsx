"use client";

import { Shield, Zap, Package, Headphones, CheckCircle, Star, Users, Award, TrendingUp, Lock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/features/HeroSection";
import { HeroContent } from "@/components/features/HeroContent";
import { BenefitsSection } from "@/components/features/BenefitsSection";
import { HowItWorksSection } from "@/components/features/HowItWorksSection";
import { SearchModule } from "@/components/features/SearchModule";
import { FeaturedItemsSection } from "@/components/features/FeaturedItemsSection";
import { TrustMetricsSection } from "@/components/features/TrustMetricsSection";
import { MobileAppSection } from "@/components/features/MobileAppSection";
import { CTASection } from "@/components/features/CTASection";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  // Mock data
  const featuredItems = [
    {
      id: 1,
      name: "AK-47 | Neon Revolution",
      wear: "Factory New",
      game: "CS2",
      price: "$127.50",
      image: "https://images.unsplash.com/photo-1558744059-a9e737085db7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=338"
    },
    {
      id: 2,
      name: "Karambit | Fade",
      wear: "Minimal Wear",
      game: "CS2",
      price: "$1,450.00",
      image: "https://images.unsplash.com/photo-1553865541-afc89e182ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=338"
    },
    {
      id: 3,
      name: "M4A4 | Howl",
      wear: "Field-Tested",
      game: "CS2",
      price: "$3,200.00",
      image: "https://images.unsplash.com/photo-1675049603723-37dfc5eed92f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=338"
    },
    {
      id: 4,
      name: "AWP | Dragon Lore",
      wear: "Factory New",
      game: "CS2",
      price: "$8,900.00",
      image: "https://images.unsplash.com/photo-1759701547036-bf7d7b05cc52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=338"
    },
    {
      id: 5,
      name: "Butterfly Knife | Tiger Tooth",
      wear: "Factory New",
      game: "CS2",
      price: "$1,850.00",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=338"
    },
    {
      id: 6,
      name: "Glock-18 | Fade",
      wear: "Factory New",
      game: "CS2",
      price: "$425.00",
      image: "https://images.unsplash.com/photo-1632017261554-7c6712cb0a09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&h=338"
    }
  ];

  const popularSearches = [
    "AK-47 | Neon Revolution",
    "Karambit Fade",
    "Steam wallet code",
    "AWP Dragon Lore",
    "Butterfly Knife",
    "M4A4 Howl"
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Bank-grade Security",
      description: "Steam-verified trades with industry-leading encryption and fraud protection"
    },
    {
      icon: Zap,
      title: "Lightning-Fast Trades",
      description: "Complete trades in seconds with instant verification and automated processing"
    },
    {
      icon: Package,
      title: "Massive Inventory",
      description: "Access 1M+ items across all major games with real-time pricing"
    },
    {
      icon: Headphones,
      title: "24/7 Live Support",
      description: "Expert support team available around the clock to assist you"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Sign in with Steam",
      description: "Connect your Steam account securely in seconds",
      icon: Lock
    },
    {
      step: 2,
      title: "Choose your items",
      description: "Browse our massive inventory or list your own",
      icon: Package
    },
    {
      step: 3,
      title: "Set price or trade instantly",
      description: "Get instant offers or set your own prices",
      icon: TrendingUp
    },
    {
      step: 4,
      title: "Complete & withdraw",
      description: "Secure checkout and instant item delivery",
      icon: CheckCircle
    }
  ];

  const trustStats = [
    { icon: Star, value: 4.9, suffix: "/5", label: "Trustpilot Rating" },
    { icon: Users, value: 1500000, suffix: "+", label: "Active Users", format: "compact" as const },
    { icon: Award, value: 5000000, suffix: "+", label: "Successful Trades", format: "compact" as const },
    { icon: TrendingUp, value: 250, suffix: "M+", label: "Total Volume", prefix: "$" }
  ];

  return (
    <div className="w-full">
      <Header />
      
      {/* Hero Section */}
      <HeroSection className="min-h-screen">
        <HeroContent
          badge={{ text: "Trusted by 1.5M+ traders worldwide", showPing: true }}
          title="A better way to trade CS2 skins"
          description="Buy, sell, and trade skins in seconds. Steam-verified security with instant delivery and the best prices on the market."
          primaryCTA={{ label: "Get Started", href: "/login" }}
          secondaryCTA={{ label: "Browse Market", href: "/marketplace" }}
        />
      </HeroSection>

      {/* Why Choose Section */}
      <BenefitsSection
        subtitle="Experience the fastest, safest, and most reliable way to trade your CS2 items with bank-grade security and 24/7 support."
        benefits={benefits}
      />

      {/* How It Works Section */}
      <HowItWorksSection
        subtitle="Get started in 4 simple steps"
        steps={howItWorks}
      />

      {/* Search Module Section */}
      <section className="py-24 bg-bg-subtle dark:bg-[#0d1111]">
        <div className="max-w-screen-xl mx-auto px-6">
          <SearchModule 
            placeholder="Search for items, skins, or games..."
            popularSearches={popularSearches}
          />
        </div>
      </section>

      {/* Featured Items Section */}
      <FeaturedItemsSection items={featuredItems} />

      {/* Trust & Metrics Section */}
      <TrustMetricsSection stats={trustStats} />

      {/* Mobile App Section */}
      <MobileAppSection />

      {/* Final CTA Section */}
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

      <Footer />
    </div>
  );
}
