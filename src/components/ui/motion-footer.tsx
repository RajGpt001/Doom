"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES (Red & Black Signature Theme)
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  -webkit-font-smoothing: antialiased;
  
  --pill-bg-1: color-mix(in oklch, var(--text-primary) 5%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--text-primary) 2%, transparent);
  --pill-shadow: rgba(0, 0, 0, 0.8);
  --pill-highlight: rgba(255, 255, 255, 0.1);
  --pill-border: #2A2A2A;
  
  --pill-bg-1-hover: rgba(229, 9, 20, 0.2);
  --pill-bg-2-hover: rgba(229, 9, 20, 0.05);
  --pill-border-hover: rgba(229, 9, 20, 0.5);
  --pill-shadow-hover: rgba(229, 9, 20, 0.3);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.95; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(229, 9, 20, 0.6)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(229, 9, 20, 0.9)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 35s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Signature Red Aurora Glow */
.footer-aurora-finale {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(229, 9, 20, 0.25) 0%, 
    rgba(122, 10, 16, 0.18) 35%, 
    transparent 70%
  );
}

/* Glass Pill Styling */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 0 10px 30px -10px var(--pill-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 0 20px 40px -10px var(--pill-shadow-hover);
  color: #FFFFFF;
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: 22vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.07);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #F5F5F5 0%, rgba(245, 245, 245, 0.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px rgba(229, 9, 20, 0.2));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

export const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN FINALE FOOTER COMPONENT
// -------------------------------------------------------------------------
const MarqueeFinaleItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>THANK YOU FOR STREAMING</span> <span className="text-[var(--primary)]">✦</span>
    <span>DOOM OTT PLATFORM</span> <span className="text-[var(--primary)]">✦</span>
    <span>4K HDR CINEMATIC EXPERIENCE</span> <span className="text-[var(--primary)]">✦</span>
    <span>BITE-SIZED MICRO-DRAMAS</span> <span className="text-[var(--primary)]">✦</span>
    <span>UNLIMITED WATCHING</span> <span className="text-[var(--primary)]">✦</span>
  </div>
);

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      <div
        ref={wrapperRef}
        className="relative h-screen w-full select-none"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#0A0A0A] text-[#F5F5F5] cinematic-footer-wrapper">
          
          <div className="footer-aurora-finale absolute left-1/2 top-1/2 h-[65vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[95px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none font-heading font-black"
          >
            THANK YOU
          </div>

          <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-[var(--border)] bg-[#0A0A0A]/85 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-[var(--text-secondary)] uppercase font-heading">
              <MarqueeFinaleItem />
              <MarqueeFinaleItem />
            </div>
          </div>

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-16 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="text-5xl md:text-8xl font-black footer-text-glow tracking-tighter mb-8 text-center font-heading uppercase leading-tight text-white"
            >
              Thanks For Watching
            </h2>

            <div ref={linksRef} className="flex flex-col items-center gap-4 w-full">
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 w-full">
                <MagneticButton as="a" href="/legal/privacy" className="footer-glass-pill px-8 py-3.5 rounded-full text-[var(--text-secondary)] font-bold text-xs md:text-sm hover:text-white border border-[var(--border)] font-heading tracking-wider">
                  Privacy Policy
                </MagneticButton>
                <MagneticButton as="a" href="/legal/terms" className="footer-glass-pill px-8 py-3.5 rounded-full text-[var(--text-secondary)] font-bold text-xs md:text-sm hover:text-white border border-[var(--border)] font-heading tracking-wider">
                  Terms of Service
                </MagneticButton>
                <MagneticButton as="a" href="/plans" className="footer-glass-pill px-8 py-3.5 rounded-full text-[var(--text-secondary)] font-bold text-xs md:text-sm hover:text-white border border-[var(--border)] font-heading tracking-wider">
                  Subscription Plans
                </MagneticButton>
              </div>
            </div>
          </div>

          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-[var(--text-secondary)] text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1 font-heading">
              © {new Date().getFullYear()} DOOM OTT Platform. All rights reserved.
            </div>

            <div className="footer-glass-pill px-6 py-3 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-[var(--border)]">
              <span className="text-[var(--text-secondary)] text-[10px] md:text-xs font-bold uppercase tracking-widest font-heading">Crafted with</span>
              <span className="animate-footer-heartbeat text-sm md:text-base text-[var(--primary)]">🔥</span>
              <span className="text-[var(--text-secondary)] text-[10px] md:text-xs font-bold uppercase tracking-widest font-heading">by</span>
              <span className="text-white font-black text-xs md:text-sm tracking-normal ml-1 font-heading">DOOM OTT</span>
            </div>

            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-[var(--text-secondary)] hover:text-white group order-3 border border-[var(--border)]"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}
