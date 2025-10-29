"use client"

import * as React from "react"
import { cn } from "@/lib/utils"





interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    children: React.ReactNode
    placeholder?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, children, placeholder, ...props }, ref) => {
        return (
            <select
                ref={ref}
                className={cn(
                    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500",
                    className
                )}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled selected>
                        {placeholder}
                    </option>
                )}
                {children}
            </select>
        )
    }
)

Select.displayName = "Select"

// Subcomponentes opcionales para compatibilidad con tu import actual

export const SelectTrigger = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>
}

export const SelectValue = ({ children, placeholder }: { children?: React.ReactNode; placeholder?: string }) => {
    return <span>{children || placeholder}</span>
}

export const SelectContent = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>
}

export const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => {
    return <option value={value}>{children}</option>
}
