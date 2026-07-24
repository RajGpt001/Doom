"use client";

import * as React from "react";
import {
  LayoutGroup,
  motion,
  useAnimate,
  delay,
  type Transition,
  type AnimationSequence,
  AnimatePresence,
} from "framer-motion";
import { FULL_CATALOG_ITEMS } from "@/data/mockMedia";
import { LogoPlaceholder } from "@/components/common/LogoPlaceholder";

export type OrbitItem = { id: number; name: string; src: string };

interface ComponentProps {
  orbitItems?: OrbitItem[];
  stageSize?: number;
  imageSize?: number;
  onComplete?: () => void;
}

const transition: Transition = {
  delay: 0,
  stiffness: 300,
  damping: 35,
  type: "spring",
  restSpeed: 0.01,
  restDelta: 0.01,
};

const spinConfig = { duration: 30, ease: "linear" as const, repeat: Infinity };

const qsa = (root: Element, sel: string) => Array.from(root.querySelectorAll(sel));
const angleOf = (el: Element) => Number((el as HTMLElement).dataset.angle || 0);
const armOfImg = (img: Element) => (img as HTMLElement).closest("[data-arm]") as HTMLElement | null;

// Default Orbit Thumbnails from DOOM OTT Catalog
const DEFAULT_ORBIT_ITEMS: OrbitItem[] = FULL_CATALOG_ITEMS.slice(0, 6).map((item, idx) => ({
  id: idx + 1,
  name: item.title,
  src: item.posterUrl,
}));

export const RadialIntroComponent = ({
  orbitItems = DEFAULT_ORBIT_ITEMS,
  stageSize = 340,
  imageSize = 64,
}: ComponentProps) => {
  const step = 360 / orbitItems.length;
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const arms = qsa(root, "[data-arm]");
    const imgs = qsa(root, "[data-arm-image]");
    const stops: Array<() => void> = [];

    delay(() => animate(imgs as any, { top: 0 } as any, transition), 250);

    const orbitPlacementSequence: AnimationSequence = [
      ...arms.map((el): [Element, Record<string, any>, any] => [el, { rotate: angleOf(el) }, { ...transition, at: 0 }]),
      ...imgs.map((img): [Element, Record<string, any>, any] => [img, { rotate: -angleOf(armOfImg(img)!), opacity: 1 }, { ...transition, at: 0 }]),
    ];
    delay(() => animate(orbitPlacementSequence), 700);

    delay(() => {
      arms.forEach((el) => {
        const angle = angleOf(el);
        const ctrl = animate(el as any, { rotate: [angle, angle + 360] }, spinConfig);
        stops.push(() => ctrl.cancel());
      });
      imgs.forEach((img) => {
        const arm = armOfImg(img);
        const angle = arm ? angleOf(arm) : 0;
        const ctrl = animate(img as any, { rotate: [-angle, -angle - 360] }, spinConfig);
        stops.push(() => ctrl.cancel());
      });
    }, 1300);

    return () => stops.forEach((stop) => stop());
  }, []);

  return (
    <LayoutGroup>
      <motion.div
        ref={scope}
        className="relative overflow-visible flex items-center justify-center"
        style={{ width: stageSize, height: stageSize }}
        initial={false}
      >
        {/* Signature Red Orbit Glow Ring */}
        <div className="absolute inset-0 rounded-full border border-[var(--primary)]/30 bg-radial from-[var(--primary)]/20 via-transparent to-transparent blur-md pointer-events-none" />

        {/* Center DOOM OTT Brand Wordmark */}
        <div className="relative z-20 flex flex-col items-center justify-center p-4 rounded-full bg-[#0A0A0A]/90 border border-[var(--primary)]/50 shadow-2xl shadow-[var(--primary)]/20">
          <LogoPlaceholder size="lg" />
        </div>

        {/* Orbiting Poster Art Arms */}
        {orbitItems.map((item, i) => (
          <motion.div
            key={item.id}
            data-arm
            className="will-change-transform absolute inset-0"
            style={{ zIndex: orbitItems.length - i }}
            data-angle={i * step}
            layoutId={`arm-${item.id}`}
          >
            <motion.img
              data-arm-image
              className="rounded-lg object-cover absolute left-1/2 top-1/2 aspect-[2/3] -translate-x-1/2 border border-[var(--primary)]/60 shadow-lg shadow-[var(--primary)]/20"
              style={{ width: imageSize, height: imageSize * 1.35, opacity: i === 0 ? 1 : 0 }}
              src={item.src}
              alt={item.name}
              draggable={false}
              layoutId={`arm-img-${item.id}`}
            />
          </motion.div>
        ))}
      </motion.div>
    </LayoutGroup>
  );
};

// Full-screen Intro Overlay Wrapper with Session Storage Check & Auto Fade Out
export function RadialIntroOverlay() {
  const [isVisible, setIsVisible] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    // Check if intro has already been played in this session
    if (typeof window !== "undefined") {
      const hasPlayed = sessionStorage.getItem("doom_intro_played");
      if (hasPlayed) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
        // Auto dismiss intro after ~3 seconds
        const timer = setTimeout(() => {
          handleDismiss();
        }, 3200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleDismiss = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("doom_intro_played", "true");
    }
    setIsVisible(false);
  };

  if (isVisible === null || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A] text-white select-none cursor-pointer"
        onClick={handleDismiss}
      >
        {/* Skip Button (Top-Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-white hover:border-[var(--primary)] transition-all cursor-pointer z-30 font-heading"
        >
          Skip Intro ➔
        </button>

        {/* 3D Radial Orbit Stage Component */}
        <div className="relative z-10">
          <RadialIntroComponent />
        </div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-[var(--text-secondary)] font-heading"
        >
          Entering DOOM OTT Universe
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
