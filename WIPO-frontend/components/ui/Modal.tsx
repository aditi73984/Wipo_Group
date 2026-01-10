"use client";

import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4 shadow-2xl">
        {title && (
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        )}

        <div className="text-gray-600">{children}</div>

        <div className="text-right">
          {/* FIX: variant="outline" hata kar simple rakha hai taaki build pass ho jaye */}
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}