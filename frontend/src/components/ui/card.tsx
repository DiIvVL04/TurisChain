// src/components/ui/card.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => {
    return <div className={cn("rounded-lg border bg-white shadow-sm", className)}>{children}</div>
}

export const CardHeader = ({ className, children }: { className?: string; children: React.ReactNode }) => {
    return <div className={cn("p-4 border-b", className)}>{children}</div>
}

export const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => {
    return <h3 className={cn("text-lg font-semibold", className)}>{children}</h3>
}

export const CardContent = ({ className, children }: { className?: string; children: React.ReactNode }) => {
    return <div className={cn("p-4", className)}>{children}</div>
}

export const CardFooter = ({ className, children }: { className?: string; children: React.ReactNode }) => {
    return <div className={cn("p-4 border-t flex justify-end gap-2", className)}>{children}</div>
}
