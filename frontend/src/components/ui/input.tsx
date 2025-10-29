"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: "default" | "outline" | "ghost"
    inputSize?: "sm" | "md" | "lg"
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant = "default", inputSize = "md", ...props }, ref) => {
        const variantClasses: Record<NonNullable<InputProps["variant"]>, string> = {
            default: "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500",
            outline: "border border-gray-400 focus:ring-2 focus:ring-gray-500",
            ghost: "bg-transparent border-none focus:ring-2 focus:ring-blue-500",
        }

        const sizeClasses: Record<NonNullable<InputProps["inputSize"]>, string> = {
            sm: "px-2 py-1 text-sm",
            md: "px-3 py-2 text-base",
            lg: "px-4 py-3 text-lg",
        }

        return (
            <input
                ref={ref}
                className={cn(
                    "rounded-md transition-colors w-full",
                    variantClasses[variant],
                    sizeClasses[inputSize],
                    className
                )}
                {...props}
            />
        )
    }
)

Input.displayName = "Input"
