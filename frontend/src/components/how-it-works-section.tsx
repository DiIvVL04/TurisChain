import Link from "next/link"
import { ArrowRight, FileText, CheckCircle, Eye, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HowItWorksSection() {
    const steps = [
        {
            icon: FileText,
            title: "Creación del Proyecto",
            description: "El gobierno define objetivos, presupuesto y asigna contratista",
        },
        {
            icon: CheckCircle,
            title: "Definición de Hitos",
            description: "División en fases verificables con montos específicos",
        },
        {
            icon: Eye,
            title: "Ejecución Transparente",
            description: "Reporte de progreso con evidencia en tiempo real",
        },
        {
            icon: Coins,
            title: "Pago Automático",
            description: "Liberación de fondos mediante smart contracts",
        },
    ]

    return (
        <section id="como-funciona" className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Cómo Funciona?</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Un proceso simple y transparente de cuatro pasos
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <step.icon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="font-bold mb-2">{step.title}</h3>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Button asChild size="lg">
                            <Link href="/como-funciona">
                                Ver Proceso Completo
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
