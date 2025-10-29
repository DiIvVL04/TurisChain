import Link from "next/link"
import { ArrowRight, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AboutSection() {
    return (
        <section id="acerca-de" className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <Target className="h-4 w-4" />
                        Nuestra Misión
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Transformando la Gestión Pública</h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        FondoClaro nace de la necesidad de restaurar la confianza ciudadana en el uso de fondos públicos para
                        proyectos turísticos mediante transparencia radical y tecnología blockchain.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">$2.5M</div>
                            <div className="text-muted-foreground">Fondos Gestionados</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">12</div>
                            <div className="text-muted-foreground">Proyectos Activos</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">100%</div>
                            <div className="text-muted-foreground">Transparencia</div>
                        </div>
                    </div>
                    <Button asChild size="lg">
                        <Link href="/acerca-de">
                            Conocer Más Sobre Nosotros
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
