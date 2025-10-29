import Link from "next/link"
import { ArrowRight, Shield, Database, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TransparencySection() {
    return (
        <section id="transparencia" className="py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                                <Shield className="h-4 w-4" />
                                Tecnología Blockchain
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparencia Total Garantizada</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Cada transacción se registra en la blockchain de Stellar, creando un historial inmutable y públicamente
                                auditable.
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <Database className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                                    <div>
                                        <div className="font-semibold mb-1">Registro Inmutable</div>
                                        <div className="text-sm text-muted-foreground">
                                            Los datos no pueden ser alterados una vez registrados
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Lock className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                                    <div>
                                        <div className="font-semibold mb-1">Smart Contracts</div>
                                        <div className="text-sm text-muted-foreground">
                                            Liberación automática de fondos sin intermediarios
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button asChild size="lg">
                                <Link href="/transparencia">
                                    Conocer Más
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        <div className="rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 p-12 h-96 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-7xl mb-4">🔗</div>
                                <div className="text-2xl font-bold">Blockchain</div>
                                <div className="text-muted-foreground">Stellar Network</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
