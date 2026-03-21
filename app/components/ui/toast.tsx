"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import { X, Info, AlertTriangle, Check } from "lucide-react";

export type ToastType = "success" | "info" | "warning" | "error";
export type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export interface ToastOptions {
  type?: ToastType;
  message: string;
  description?: string;
  duration?: number;
  position?: ToastPosition;
}

export interface Toast extends ToastOptions {
  id: string;
}

interface ToastContextProps {
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

export const ToastProvider: React.FC<{
  children: React.ReactNode;
  position?: ToastPosition;
}> = ({ children, position = "top-right" }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Record<string, NodeJS.Timeout>>({});

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = Math.random().toString(36).slice(2, 10);
      setToasts((prev) => [
        ...prev,
        {
          id,
          type: options.type ?? "info",
          message: options.message,
          description: options.description,
          duration: options.duration ?? 4000,
          position: options.position ?? position,
        },
      ]);
    },
    [position]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  useEffect(() => {
    toasts.forEach((t) => {
      if (!timers.current[t.id]) {
        timers.current[t.id] = setTimeout(() => removeToast(t.id), t.duration);
      }
    });
    return () => {
      Object.values(timers.current).forEach(clearTimeout);
      timers.current = {};
    };
  }, [toasts, removeToast]);

  const positionClasses: Record<ToastPosition, string> = {
    "top-right": "fixed top-6 right-6 z-[99999] flex flex-col gap-3 pointer-events-none",
    "top-left": "fixed top-6 left-6 z-[99999] flex flex-col gap-3 pointer-events-none",
    "bottom-right": "fixed bottom-6 right-6 z-[99999] flex flex-col gap-3 pointer-events-none",
    "bottom-left": "fixed bottom-6 left-6 z-[99999] flex flex-col gap-3 pointer-events-none",
  };

  const grouped = toasts.reduce<Record<ToastPosition, Toast[]>>(
    (acc, t) => {
      const pos = t.position ?? position;
      acc[pos].push(t);
      return acc;
    },
    { "top-right": [], "top-left": [], "bottom-right": [], "bottom-left": [] }
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {(Object.entries(grouped) as [ToastPosition, Toast[]][]).map(([pos, list]) =>
        list.length > 0 ? (
          <div key={pos} className={positionClasses[pos]}>
            {list.map((t) => (
              <ToastItem key={t.id} toast={t} onRemove={removeToast} />
            ))}
          </div>
        ) : null
      )}
    </ToastContext.Provider>
  );
};

const typeConfig: Record<
  ToastType,
  { border: string; icon: React.ReactNode; iconBg: string; text: string }
> = {
  success: {
    border: "border-green-500",
    iconBg: "bg-green-500",
    icon: <Check className="h-3.5 w-3.5 text-white" />,
    text: "text-green-400",
  },
  info: {
    border: "border-blue-500",
    iconBg: "bg-blue-500",
    icon: <Info className="h-3.5 w-3.5 text-white" />,
    text: "text-blue-400",
  },
  warning: {
    border: "border-yellow-500",
    iconBg: "bg-yellow-500",
    icon: <AlertTriangle className="h-3.5 w-3.5 text-white" />,
    text: "text-yellow-400",
  },
  error: {
    border: "border-red-500",
    iconBg: "bg-red-500",
    icon: <X className="h-3.5 w-3.5 text-white" />,
    text: "text-red-400",
  },
};

const ToastItem: React.FC<{ toast: Toast; onRemove: (id: string) => void }> = ({
  toast,
  onRemove,
}) => {
  const config = typeConfig[toast.type ?? "info"];

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`pointer-events-auto flex min-w-75 max-w-sm items-start gap-3 rounded-xl border border-l-4 bg-card-bg p-4 shadow-2xl ${config.border}`}
      style={{ animation: "fadeInUp 0.25s ease" }}
    >
      <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${config.iconBg}`}>
        {config.icon}
      </div>

      <div className="flex-1">
        <p className={`text-sm font-medium ${toast.description ? "text-foreground" : config.text}`}>
          {toast.message}
        </p>
        {toast.description && (
          <p className="mt-0.5 text-xs text-muted">{toast.description}</p>
        )}
      </div>

      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 text-muted transition-colors hover:text-foreground"
        aria-label="Fermer"
        style={{ cursor: "none" }}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
