import { useState, useCallback } from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { X } from "lucide-react"

type ToastItem = {
  id: string
  title: string
  description?: string
  action?: React.ReactNode
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const toast = useCallback((title: string, description?: string) => {
    const id = crypto.randomUUID()
    setToasts(prev => [...prev, { id, title, description }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, toast, removeToast }
}
