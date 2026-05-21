import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex min-h-6 items-center rounded-full border border-white/12 bg-white/[0.08] px-2.5 text-xs font-semibold text-white/82">
      {children}
    </span>
  );
}

