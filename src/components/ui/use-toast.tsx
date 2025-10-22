"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { motion } from "framer-motion";

type ToastMessage = {
  title: string;
  description?: string;
};

const initialToastMessage = {
  title: "",
  description: "",
};

export const ToastContext = React.createContext<{
  open: boolean;
  message: ToastMessage;
  show: (msg: ToastMessage) => void;
}>({
  open: false,
  message: initialToastMessage,
  show: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] =
    React.useState<ToastMessage>(initialToastMessage);

  const show = (msg: ToastMessage) => {
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
          duration={2500}
          className="fixed bottom-4 right-4 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg w-80"
          asChild
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            {message && (
              <>
                <div className="font-semibold">{message.title}</div>
                {message.description && (
                  <div className="text-sm text-slate-300 mt-1">
                    {message.description}
                  </div>
                )}
              </>
            )}
          </motion.div>
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
