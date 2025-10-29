// src/components/ui/textarea.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    variant?: "default" | "outline" | "ghost"
    textareaSize?: "sm" | "md" | "lg"
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, variant = "default", textareaSize = "md", ...props }, ref) => {
        const variantClasses: Record<NonNullable<TextareaProps["variant"]>, string> = {
            default: "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500",
            outline: "border border-gray-400 focus:ring-2 focus:ring-gray-500",
            ghost: "bg-transparent border-none focus:ring-2 focus:ring-blue-500",
        }

        const sizeClasses: Record<NonNullable<TextareaProps["textareaSize"]>, string> = {
            sm: "px-2 py-1 text-sm",
            md: "px-3 py-2 text-base",
            lg: "px-4 py-3 text-lg",
        }

        return (
            <textarea
                ref={ref}
                className={cn("rounded-md transition-colors w-full", variantClasses[variant], sizeClasses[textareaSize], className)}
                {...props}
            />
        )
    }
)

Textarea.displayName = "Textarea"
