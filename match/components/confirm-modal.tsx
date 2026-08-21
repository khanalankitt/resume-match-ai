"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isDestructive = false,
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="backdrop:bg-ink/40 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 rounded-md border border-ink/20 bg-paper p-6 shadow-paper open:animate-in open:fade-in open:zoom-in-95"
      onClose={onCancel}
    >
      <div className="w-full max-w-sm">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          {title}
        </h2>
        <p className="mt-2 text-sm text-ink/70">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded border border-ink/20 bg-white px-4 py-2 text-sm font-medium text-ink shadow-paper-sm transition-colors hover:border-ink/40"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`cursor-pointer rounded px-4 py-2 text-sm font-medium text-white shadow-paper-sm transition-colors ${
              isDestructive
                ? "bg-coral hover:bg-coral/90"
                : "bg-cobalt hover:bg-cobalt-hover"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </dialog>,
    document.body
  );
}
