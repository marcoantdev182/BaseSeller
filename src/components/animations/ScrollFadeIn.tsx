"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

type ScrollFadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ScrollFadeIn({
  children,
  className = "",
  delay = 0,
}: ScrollFadeInProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) {
      return;
    }

    const animation = gsap.fromTo(
      sectionRef.current,
      { autoAlpha: 0, y: 42 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 84%",
          once: true,
        },
      },
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [delay]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}

