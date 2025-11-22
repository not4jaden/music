"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"
import type { Toast } from "@/lib/use-toast"

interface ToasterProps {
    toasts: Toast[]
    removeToast: (id: number) => void
}

export function Toaster({ toasts, removeToast }: ToasterProps) {
    const getIcon = (variant?: Toast["variant"]) => {
        switch (variant) {
            case "success":
                return <CheckCircle className="w-5 h-5 text-green-500" />
            case "destructive":
                return <AlertCircle className="w-5 h-5 text-red-500" />
            default:
                return <Info className="w-5 h-5 text-blue-500" />
        }
    }

    const getBackgroundColor = (variant?: Toast["variant"]) => {
        switch (variant) {
            case "success":
                return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
            case "destructive":
                return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
            default:
                return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
        }
    }

    return (
        <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-md">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`p-4 rounded-lg shadow-lg border ${getBackgroundColor(
                            toast.variant
                        )} backdrop-blur-sm`}
                    >
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">{getIcon(toast.variant)}</div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-foreground">{toast.title}</p>
                                {toast.description && (
                                    <p className="text-sm text-muted-foreground mt-1">{toast.description}</p>
                                )}
                            </div>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Close notification"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
