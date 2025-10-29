import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

type ButtonSize = "sm" | "md" | "lg"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost" | "outline"
    size?: ButtonSize
    asChild?: boolean
}

const ButtonComp = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        const sizeClasses: Record<ButtonSize, string> = {
            sm: "px-2 py-1 text-sm",
            md: "px-4 py-2 text-base",
            lg: "px-6 py-3 text-lg",
        }

        return (
            <Comp
                className={cn(
                    "rounded-md font-semibold transition-colors",
                    variant === "primary" && "bg-blue-500 text-white hover:bg-blue-600",
                    variant === "secondary" && "bg-gray-200 text-gray-800 hover:bg-gray-300",
                    sizeClasses[size],
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)

ButtonComp.displayName = "Button"

export { ButtonComp as Button }
