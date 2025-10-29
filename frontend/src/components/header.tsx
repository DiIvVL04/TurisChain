import Link from "next/link"
import { AuthHeader } from "@/components/auth-header"

export function Header() {
    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-lg">FC</span>
                    </div>
                    <span className="font-bold text-xl">FondoClaro</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/proyectos" className="text-sm font-medium hover:text-primary transition-colors">
                        Proyectos
                    </Link>
                    <Link href="/como-funciona" className="text-sm font-medium hover:text-primary transition-colors">
                        Cómo Funciona
                    </Link>
                    <Link href="/transparencia" className="text-sm font-medium hover:text-primary transition-colors">
                        Transparencia
                    </Link>
                    <Link href="/acerca-de" className="text-sm font-medium hover:text-primary transition-colors">
                        Acerca de
                    </Link>
                </nav>

                <AuthHeader />
            </div>
        </header>
    )
}
