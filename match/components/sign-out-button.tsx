"use client";

import { useState } from "react";
import ConfirmModal from "@/components/confirm-modal";

export default function SignOutButton({ onSignOut }: { onSignOut: () => void }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className="cursor-pointer rounded border border-ink/20 bg-paper px-3 py-1.5 text-sm font-medium text-ink shadow-paper-sm transition-colors hover:border-ink/40"
      >
        Sign out
      </button>

      <ConfirmModal
        isOpen={showConfirm}
        title="Sign out"
        message="Are you sure you want to sign out?"
        confirmText="Sign out"
        isDestructive={false}
        onConfirm={() => {
          setShowConfirm(false);
          onSignOut();
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
