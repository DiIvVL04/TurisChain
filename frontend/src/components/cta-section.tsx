import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 text-center md:p-12">
                    <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
                        Comienza a Explorar Proyectos
                    </h2>
                    <p className="mb-8 text-pretty text-lg text-muted-foreground">
                        Descubre cómo se están utilizando los fondos públicos en proyectos turísticos. Transparencia total,
                        verificable en blockchain.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button size="lg" asChild>
                            <Link href="/proyectos">
                                Ver Proyectos
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/login">Acceso Gobierno</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
