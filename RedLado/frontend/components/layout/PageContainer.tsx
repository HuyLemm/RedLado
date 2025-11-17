import { ReactNode } from "react";
import { cn } from "@/components/ui/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "xl" | "2xl" | "1280";
}

export function PageContainer({ children, className, maxWidth = "xl" }: PageContainerProps) {
  const maxWidthClass = {
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    "1280": "max-w-[1280px]",
  }[maxWidth];

  return (
    <div className={cn("mx-auto px-6", maxWidthClass, className)}>
      {children}
    </div>
  );
}

