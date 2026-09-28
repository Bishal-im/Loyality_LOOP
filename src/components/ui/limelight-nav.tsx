"use client";

import React, {
  useState,
  useRef,
  useLayoutEffect,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type NavItem = {
  id: string | number;
  icon: React.ReactElement<{ className?: string }>;
  label?: string;
  onClick?: () => void;
};

type LimelightNavProps = {
  items?: NavItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
  /** Controlled active index — pass to sync with external router state */
  activeIndex?: number;
};

// ─── Component ────────────────────────────────────────────────────────────────
/**
 * LimelightNav — adaptive-width nav bar with a "limelight" highlight that
 * slides to the active tab and casts a soft glow beam below it.
 */
export const LimelightNav = ({
  items = [],
  defaultActiveIndex = 0,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
  activeIndex: controlledActiveIndex,
}: LimelightNavProps) => {
  const [internalActive, setInternalActive] = useState(defaultActiveIndex);
  const [isReady, setIsReady] = useState(false);

  const activeIndex =
    controlledActiveIndex !== undefined ? controlledActiveIndex : internalActive;

  const navItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];

    if (limelight && activeItem) {
      const newLeft =
        activeItem.offsetLeft +
        activeItem.offsetWidth / 2 -
        limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;
      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) return null;

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    if (controlledActiveIndex === undefined) {
      setInternalActive(index);
    }
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav
      className={`relative inline-flex items-center h-16 ${className ?? ""}`}
    >
      {items.map(({ id, icon, label, onClick }, index) => {
        const isActive = activeIndex === index;
        // Build merged className for the icon
        const mergedIconClass = [
          "w-5 h-5 transition-all duration-150 ease-in-out",
          isActive ? "opacity-100" : "opacity-40",
          icon.props.className ?? "",
          iconClassName ?? "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <button
            key={id}
            ref={(el) => { navItemRefs.current[index] = el; }}
            className={`relative z-20 flex h-full cursor-pointer items-center justify-center p-5 bg-transparent border-0 outline-none ${iconContainerClassName ?? ""}`}
            onClick={() => handleItemClick(index, onClick)}
            aria-label={label}
            type="button"
          >
            {React.cloneElement(icon, { className: mergedIconClass })}
          </button>
        );
      })}

      {/* Limelight bar + downward glow beam */}
      <div
        ref={limelightRef}
        className={`absolute top-0 z-10 w-11 h-[3px] rounded-full ${
          isReady ? "transition-[left] duration-300 ease-in-out" : ""
        } ${limelightClassName ?? ""}`}
        style={{ left: "-999px", backgroundColor: "var(--c-terracotta)" }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            left: "-30%",
            top: "3px",
            width: "160%",
            height: "52px",
            clipPath: "polygon(5% 100%, 20% 0, 80% 0, 95% 100%)",
            background:
              "linear-gradient(to bottom, rgba(201,111,74,0.28) 0%, transparent 100%)",
          }}
        />
      </div>
    </nav>
  );
};
