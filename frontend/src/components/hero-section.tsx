import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
    return (
        <section className="container mx-auto px-4 py-24 md:py-32">
            <div className="mx-auto max-w-4xl text-center">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm text-accent-foreground">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
                    </span>
                    Transparencia en tiempo real con blockchain
                </div>

                <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                    Gestión Transparente de Proyectos Turísticos
                </h1>

                <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
                    FondoClaro utiliza tecnología blockchain para garantizar la transparencia total en la asignación y uso de
                    fondos públicos destinados al desarrollo turístico. Cada peso, cada hito, completamente verificable.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button size="lg" asChild className="w-full sm:w-auto">
                        <Link href="/proyectos">
                            Ver Proyectos Activos
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
                        <Link href="/como-funciona">Cómo Funciona</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
