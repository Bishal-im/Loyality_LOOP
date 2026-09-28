import React from "react";
import { Check } from "lucide-react";

interface StampWellsProps {
  filled: number;
  total: number;
  milestoneIndex?: number;
  size?: "sm" | "md";
}

export const StampWells: React.FC<StampWellsProps> = ({
  filled,
  total,
  milestoneIndex,
  size = "md",
}) => {
  const dim = size === "sm" ? "w-8 h-8" : "w-11 h-11";
  const icon = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => {
        const isFilled = index < filled;
        const isMilestone = milestoneIndex === index;

        if (isFilled) {
          return (
            <div
              key={index}
              className={`${dim} rounded-full stamp-filled flex items-center justify-center ${
                isMilestone ? "ring-2 ring-gold ring-offset-2 ring-offset-surface" : ""
              }`}
              aria-label={`Stamp ${index + 1} collected`}
            >
              <Check className={`${icon} stroke-[2.5]`} />
            </div>
          );
        }

        return (
          <div
            key={index}
            className={`${dim} rounded-full stamp-well border border-dashed border-sage/40`}
            aria-label={`Stamp ${index + 1} empty`}
          />
        );
      })}
    </div>
  );
};
