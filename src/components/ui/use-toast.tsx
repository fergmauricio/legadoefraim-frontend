"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";

export const ToastContext = React.createContext<{
  open: boolean;
  message: string | null;
  show: (msg: string) => void;
}>({
  open: false,
  message: null,
  show: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  const show = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={{ open, message, show }}>
      {children}
      <ToastPrimitive.Provider swipeDirection="right">
        <ToastPrimitive.Root
          open={open}
          onOpenChange={setOpen}
          className="fixed bottom-4 right-4 bg-slate-900 text-white px-4 py-2 rounded-xl shadow-lg"
        >
          {message}
        </ToastPrimitive.Root>
        <ToastPrimitive.Viewport />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast deve ser usado dentro de ToastProvider");
  return ctx;
}
