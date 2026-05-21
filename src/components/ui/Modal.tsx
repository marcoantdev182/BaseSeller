"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
    >
      <div className="surface-line w-full max-w-lg rounded-lg bg-[#11161c] p-5 shadow-2xl shadow-black/40">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            aria-label="Fechar modal"
            className="grid size-10 place-items-center rounded-md text-white/70 transition hover:bg-white/[0.08] hover:text-white"
            onClick={onClose}
            title="Fechar"
            type="button"
          >
            <X className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

