import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle, FileText, Eye, Coins } from "lucide-react"

export default function ComoFuncionaPage() {
    const steps = [
        {
            icon: FileText,
            title: "1. Creación del Proyecto",
            description:
                "El gobierno crea un proyecto turístico, define objetivos, presupuesto y asigna un contratista responsable.",
            details: [
                "Definición de alcance y objetivos",
                "Asignación de presupuesto total",
                "Selección de contratista",
                "Registro en blockchain",
            ],
        },
        {
            icon: CheckCircle,
            title: "2. Definición de Hitos",
            description:
                "El proyecto se divide en hitos verificables, cada uno con un monto específico y criterios de validación.",
            details: [
                "División del proyecto en fases",
                "Asignación de fondos por hito",
                "Definición de entregables",
                "Criterios de aceptación claros",
            ],
        },
        {
            icon: Eye,
            title: "3. Ejecución y Reporte",
            description:
                "El contratista ejecuta el trabajo y reporta el progreso de cada hito con evidencia fotográfica y documentación.",
            details: [
                "Actualización de progreso en tiempo real",
                "Carga de evidencia fotográfica",
                "Documentación de avances",
                "Transparencia pública total",
            ],
        },
        {
            icon: Coins,
            title: "4. Validación y Pago",
            description:
                "El gobierno valida los hitos completados y los fondos se liberan automáticamente mediante smart contracts.",
            details: [
                "Revisión de evidencia por gobierno",
                "Validación de cumplimiento",
                "Liberación automática de fondos",
                "Registro inmutable en blockchain",
            ],
        },
    ]

    return (
        <div className="min-h-screen">
            <Header />
            <main>
                {/* Hero Section */}
                <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">¿Cómo Funciona FondoClaro?</h1>
                            <p className="text-xl text-muted-foreground text-pretty">
                                Un proceso transparente y automatizado para la gestión de proyectos turísticos con tecnología blockchain
                            </p>
                        </div>
                    </div>
                </section>

                {/* Steps Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto space-y-16">
                            {steps.map((step, index) => (
                                <div key={index} className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="flex-shrink-0">
                                        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                                            <step.icon className="h-8 w-8 text-primary" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                        <p className="text-lg text-muted-foreground mb-4">{step.description}</p>
                                        <ul className="space-y-2">
                                            {step.details.map((detail, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                                                    <span className="text-muted-foreground">{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20 bg-muted/50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-center mb-12">Beneficios del Sistema</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">🔒</span>
                                    </div>
                                    <h3 className="font-semibold mb-2">Seguridad</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Registros inmutables en blockchain garantizan la integridad de los datos
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">⚡</span>
                                    </div>
                                    <h3 className="font-semibold mb-2">Automatización</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Smart contracts liberan fondos automáticamente al validar hitos
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">👁️</span>
                                    </div>
                                    <h3 className="font-semibold mb-2">Transparencia</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Ciudadanos pueden monitorear el progreso y uso de fondos en tiempo real
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
