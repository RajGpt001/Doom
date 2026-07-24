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
import { Play, Sparkles } from "lucide-react";

export type OrbitItem = {
  id: number;
  name: string;
  src: string;
};

interface ComponentProps {
  orbitItems?: OrbitItem[];
  stageSize?: number;
  imageSize?: number;
}

const transition: Transition = {
  delay: 0,
  stiffness: 300,
  damping: 35,
  type: "spring",
  restSpeed: 0.01,
  restDelta: 0.01,
};

const spinConfig = {
  duration: 30,
  ease: "linear" as const,
  repeat: Infinity,
};

const qsa = (root: Element, sel: string) =>
  Array.from(root.querySelectorAll(sel));

const angleOf = (el: Element) => Number((el as HTMLElement).dataset.angle || 0);

const armOfImg = (img: Element) =>
  (img as HTMLElement).closest("[data-arm]") as HTMLElement | null;

// Default Orbit Thumbnails from DOOM OTT Catalog
const DEFAULT_ORBIT_ITEMS: OrbitItem[] = FULL_CATALOG_ITEMS.slice(0, 6).map((item, idx) => ({
  id: idx + 1,
  name: item.title,
  src: item.posterUrl,
}));

export const Component = ({
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

    // image lift-in
    delay(() => animate(imgs as any, { top: 0 } as any, transition), 250);

    // build sequence for orbit placement
    const orbitPlacementSequence: AnimationSequence = [
      ...arms.map((el): [Element, Record<string, any>, any] => [
        el,
        { rotate: angleOf(el) },
        { ...transition, at: 0 },
      ]),
      ...imgs.map((img): [Element, Record<string, any>, any] => [
        img,
        { rotate: -angleOf(armOfImg(img)!), opacity: 1 },
        { ...transition, at: 0 },
      ]),
    ];

    // play placement sequence
    delay(() => animate(orbitPlacementSequence), 700);

    // start continuous spin for arms and images
    delay(() => {
      arms.forEach((el) => {
        const angle = angleOf(el);
        const ctrl = animate(el as any, { rotate: [angle, angle + 360] }, spinConfig);
        stops.push(() => ctrl.cancel());
      });

      imgs.forEach((img) => {
        const arm = armOfImg(img);
        const angle = arm ? angleOf(arm) : 0;
        const ctrl = animate(
          img as any,
          { rotate: [-angle, -angle - 360] },
          spinConfig,
        );
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
              style={{
                width: imageSize,
                height: imageSize * 1.35,
                opacity: i === 0 ? 1 : 0,
              }}
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

// Aliased export for compatibility
export const RadialIntroComponent = Component;

// Full-screen Intro Overlay Wrapper (Loads immediately on opening window)
export function RadialIntroOverlay({ forceShow = false }: { forceShow?: boolean }) {
  const [isVisible, setIsVisible] = React.useState<boolean>(true);

  const handleEnter = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.5, ease: "easeInOut" } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A] text-white select-none overflow-hidden"
      >
        {/* Ambient Glow Mask */}
        <div className="absolute left-1/2 top-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-[var(--primary)]/20 via-[var(--primary-muted)]/10 to-transparent blur-[120px] pointer-events-none" />

        {/* Skip Button (Top-Right) */}
        <button
          onClick={handleEnter}
          className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-white hover:border-[var(--primary)] transition-all cursor-pointer z-30 font-heading"
        >
          Skip ➔
        </button>

        {/* 3D Radial Orbit Stage Component */}
        <div className="relative z-10 my-4">
          <Component />
        </div>

        {/* Caption & "ENTER DOOM OTT" CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative z-20 flex flex-col items-center gap-4 mt-6"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--text-secondary)] font-heading">
            <Sparkles className="w-4 h-4 text-[var(--primary)]" />
            <span>Next-Gen Cinema & 1-Min Micro-Dramas</span>
          </div>

          {/* 🌟 PROMINENT "ENTER DOOM OTT" BUTTON */}
          <button
            onClick={handleEnter}
            className="group relative px-10 py-4 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-heading text-xl sm:text-2xl uppercase tracking-widest font-black shadow-2xl shadow-[var(--primary)]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-3 border border-white/20"
          >
            <span>ENTER DOOM OTT</span>
            <Play className="w-5 h-5 fill-current group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
