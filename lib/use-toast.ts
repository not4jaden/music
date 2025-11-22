import { useState } from "react";

export type Toast = {
  id: number;
  title: string;
  description?: string;
  variant?: "success" | "destructive" | "info";  // Add 'variant' here
};


export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Change addToast to accept an object matching Toast (except id)
  function addToast({
    title,
    description,
    variant = "info",
  }: Omit<Toast, "id">) {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    // Auto-remove after 5 seconds
    setTimeout(() => removeToast(id), 5000);
  }

  function removeToast(id: number) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  return { toasts, addToast, removeToast };
}
