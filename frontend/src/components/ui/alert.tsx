// src/components/ui/alert.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type AlertVariant = "default" | "destructive" | "success" | "warning"

interface AlertProps {
    children: React.ReactNode
    className?: string
    variant?: AlertVariant
}

export const Alert = ({ children, className, variant = "default" }: AlertProps) => {
    const variantClasses: Record<AlertVariant, string> = {
        default: "p-4 border-l-4 border-blue-500 bg-blue-50 text-blue-700 rounded-md",
        destructive: "p-4 border-l-4 border-red-500 bg-red-50 text-red-700 rounded-md",
        success: "p-4 border-l-4 border-green-500 bg-green-50 text-green-700 rounded-md",
        warning: "p-4 border-l-4 border-yellow-500 bg-yellow-50 text-yellow-700 rounded-md",
    }

    return <div className={cn(variantClasses[variant], className)}>{children}</div>
}

export const AlertDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <p className={cn("text-sm", className)}>{children}</p>
}
