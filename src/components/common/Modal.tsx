import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sphereo-charcoal/60 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full ${widthClass} bg-sphereo-ivory border border-sphereo-border rounded-lg shadow-modal overflow-hidden relative animate-scaleUp`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-4 border-b border-sphereo-border bg-sphereo-linen/40">
          {title ? (
            <h3 className="font-serif text-lg font-semibold text-sphereo-charcoal">
              {title}
            </h3>
          ) : <div />}
          <button
            onClick={onClose}
            className="p-1 rounded text-sphereo-charcoal/70 hover:text-sphereo-charcoal hover:bg-sphereo-linen transition-colors"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-5 max-h-[85vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
