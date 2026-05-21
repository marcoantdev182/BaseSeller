"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

export function ScrollIndicator() {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!indicatorRef.current) {
      return;
    }

    const animation = gsap.to(indicatorRef.current, {
      autoAlpha: 0,
      y: 18,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: {
        start: "top top",
        end: "+=180",
        scrub: 0.6,
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute bottom-8 left-1/2 grid -translate-x-1/2 justify-items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/62"
      ref={indicatorRef}
    >
      Rolar
      <span className="grid size-9 place-items-center rounded-full border border-white/18">
        <ChevronDown className="size-4" />
      </span>
    </div>
  );
}

