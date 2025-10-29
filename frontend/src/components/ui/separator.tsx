// src/components/ui/separator.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical"
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
    ({ className, orientation = "horizontal", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "bg-gray-200",
                    orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
                    className
                )}
                {...props}
            />
        )
    }
)

Separator.displayName = "Separator"
