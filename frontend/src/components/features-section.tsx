import { Card, CardContent } from "@/components/ui/card"
import { Shield, Eye, Zap, Lock, TrendingUp, Users } from "lucide-react"

const features = [
    {
        icon: Shield,
        title: "Blockchain Inmutable",
        description:
            "Todos los registros se almacenan en Stellar blockchain, garantizando que ningún dato pueda ser alterado o eliminado.",
    },
    {
        icon: Eye,
        title: "Transparencia Total",
        description:
            "Ciudadanos, contratistas y gobierno pueden ver en tiempo real el estado de cada proyecto y el flujo de fondos.",
    },
    {
        icon: Zap,
        title: "Pagos Automáticos",
        description:
            "Los smart contracts liberan fondos automáticamente cuando se validan los hitos, eliminando intermediarios.",
    },
    {
        icon: Lock,
        title: "Seguridad Garantizada",
        description:
            "Contratos inteligentes auditados y tecnología blockchain de nivel empresarial protegen cada transacción.",
    },
    {
        icon: TrendingUp,
        title: "Seguimiento en Tiempo Real",
        description:
            "Monitorea el progreso de cada proyecto con métricas actualizadas y validación de hitos en tiempo real.",
    },
    {
        icon: Users,
        title: "Participación Ciudadana",
        description:
            "La comunidad puede seguir y verificar el uso de fondos públicos, fortaleciendo la confianza institucional.",
    },
]

export function FeaturesSection() {
    return (
        <section className="border-t border-border bg-muted/30 py-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
                        Tecnología al Servicio de la Transparencia
                    </h2>
                    <p className="text-pretty text-lg text-muted-foreground">
                        Combinamos blockchain, smart contracts y diseño centrado en el usuario para crear la plataforma más
                        transparente de gestión de fondos públicos.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-border/50">
                            <CardContent className="pt-6">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                                    <feature.icon className="h-6 w-6 text-accent" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                                <p className="text-pretty text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
