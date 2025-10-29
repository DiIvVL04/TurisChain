"use client"

import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"

export function LogoutButton() {
    const router = useRouter()

    const handleLogout = async () => {
        const supabase = getSupabaseBrowserClient()
        await supabase.auth.signOut()
        router.push("/")
        router.refresh()
    }

    return (
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar sesión
        </DropdownMenuItem>
    )
}
