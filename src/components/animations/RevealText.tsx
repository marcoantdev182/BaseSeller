"use client";

import gsap from "gsap";
import { useEffect, useRef, type ReactNode } from "react";

type RevealTextProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function RevealText({
  children,
  className = "",
  delay = 0,
}: RevealTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) {
      return;
    }

    const animation = gsap.fromTo(
      textRef.current,
      { autoAlpha: 0, yPercent: 24, filter: "blur(12px)" },
      {
        autoAlpha: 1,
        yPercent: 0,
        filter: "blur(0px)",
        duration: 1.15,
        delay,
        ease: "expo.out",
      },
    );

    return () => {
      animation.kill();
    };
  }, [delay]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}

