"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
    variant?: "default" | "secondary" | "destructive" | "outline"
    size?: "sm" | "md" | "lg"
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = "default", size = "md", ...props }, ref) => {
        const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
            default: "bg-gray-100 text-gray-800",
            secondary: "bg-blue-100 text-blue-800",
            destructive: "bg-red-100 text-red-800",
            outline: "border border-gray-300 text-gray-800",
        }

        const sizeClasses: Record<NonNullable<BadgeProps["size"]>, string> = {
            sm: "px-2 py-0.5 text-xs",
            md: "px-3 py-1 text-sm",
            lg: "px-4 py-1.5 text-base",
        }

        return (
            <span
                ref={ref}
                className={cn(
                    "inline-flex items-center rounded-full font-medium",
                    variantClasses[variant],
                    sizeClasses[size],
                    className
                )}
                {...props}
            />
        )
    }
)

Badge.displayName = "Badge"
