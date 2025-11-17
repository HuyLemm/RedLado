import { LucideIcon, CreditCard, Lock, Shield } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface TrustStat {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  format?: "compact";
}

interface TrustMetricsSectionProps {
  stats: TrustStat[];
}

// Counter-up animation hook
function useCountUp(end: number, duration: number = 2000, startWhen: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startWhen) return;
    
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const eased = 1 - Math.pow(1 - percentage, 3);
      setCount(Math.floor(end * eased));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startWhen]);

  return count;
}

export function TrustMetricsSection({ stats }: TrustMetricsSectionProps) {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-bg-subtle dark:bg-[#0d1111]" ref={statsRef}>
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const CounterComponent = () => {
              const count = useCountUp(stat.value, 2000, statsVisible);
              
              let displayValue = "";
              if (stat.format === "compact") {
                if (count >= 1000000) {
                  displayValue = (count / 1000000).toFixed(1) + "M";
                } else if (count >= 1000) {
                  displayValue = (count / 1000).toFixed(1) + "K";
                } else {
                  displayValue = count.toString();
                }
              } else {
                displayValue = count.toFixed(1);
              }

              return (
                <span>
                  {stat.prefix}
                  {displayValue}
                  {stat.suffix}
                </span>
              );
            };

            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#FFF1F2] dark:bg-[#1F1315] mb-4">
                  <stat.icon className="w-6 h-6 text-[#E11D48] dark:text-[#F43F5E]" />
                </div>
                <div className="text-text-primary dark:text-[#E5E7EB] mb-1" style={{ fontSize: '32px', lineHeight: '40px', fontWeight: 700 }}>
                  <CounterComponent />
                </div>
                <div className="text-text-muted dark:text-[#8B93A7] text-sm">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-text-muted dark:text-[#8B93A7] text-sm mb-6">Trusted payment methods</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <CreditCard className="w-8 h-8 text-text-muted dark:text-[#8B93A7]" />
            <Lock className="w-8 h-8 text-text-muted dark:text-[#8B93A7]" />
            <Shield className="w-8 h-8 text-text-muted dark:text-[#8B93A7]" />
          </div>
        </div>
      </div>
    </section>
  );
}

