import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Target, Users, Lightbulb, Award, Shield } from "lucide-react"

export default function AcercaDePage() {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                {/* Hero Section */}
                <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Acerca de FondoClaro</h1>
                            <p className="text-xl text-muted-foreground text-pretty">
                                Transformando la gestión de proyectos turísticos mediante transparencia radical y tecnología blockchain
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                        <Target className="h-4 w-4" />
                                        Nuestra Misión
                                    </div>
                                    <h2 className="text-3xl font-bold mb-4">Devolver la Confianza en la Gestión Pública</h2>
                                    <p className="text-muted-foreground text-lg mb-4">
                                        FondoClaro nace de la necesidad de restaurar la confianza ciudadana en el uso de fondos públicos
                                        para proyectos turísticos.
                                    </p>
                                    <p className="text-muted-foreground">
                                        Utilizamos tecnología blockchain para garantizar que cada peso invertido en turismo sea
                                        completamente rastreable, verificable y transparente para todos los ciudadanos.
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 h-80 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-6xl mb-4">🏛️</div>
                                        <div className="text-2xl font-bold">Gobierno Transparente</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 p-8 h-80 flex items-center justify-center order-2 md:order-1">
                                    <div className="text-center">
                                        <div className="text-6xl mb-4">🔗</div>
                                        <div className="text-2xl font-bold">Tecnología Blockchain</div>
                                    </div>
                                </div>
                                <div className="order-1 md:order-2">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                                        <Lightbulb className="h-4 w-4" />
                                        Nuestra Visión
                                    </div>
                                    <h2 className="text-3xl font-bold mb-4">Un Futuro de Transparencia Total</h2>
                                    <p className="text-muted-foreground text-lg mb-4">
                                        Imaginamos un futuro donde cada proyecto público sea completamente transparente desde su concepción
                                        hasta su finalización.
                                    </p>
                                    <p className="text-muted-foreground">
                                        Donde los ciudadanos puedan monitorear en tiempo real el progreso de las obras que transforman sus
                                        comunidades, y donde la tecnología elimine la posibilidad de corrupción o mal uso de fondos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-20 bg-muted/50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-center mb-12">Nuestros Valores</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="p-6 rounded-2xl bg-background border">
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                        <Shield className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">Transparencia Radical</h3>
                                    <p className="text-muted-foreground">
                                        Creemos que cada peso público debe ser rastreable y verificable por cualquier ciudadano, sin
                                        excepciones.
                                    </p>
                                </div>
                                <div className="p-6 rounded-2xl bg-background border">
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                        <Users className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">Participación Ciudadana</h3>
                                    <p className="text-muted-foreground">
                                        Empoderamos a los ciudadanos para que sean auditores activos del uso de fondos públicos en sus
                                        comunidades.
                                    </p>
                                </div>
                                <div className="p-6 rounded-2xl bg-background border">
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                        <Lightbulb className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">Innovación Tecnológica</h3>
                                    <p className="text-muted-foreground">
                                        Adoptamos las tecnologías más avanzadas para resolver problemas de gobernanza y transparencia.
                                    </p>
                                </div>
                                <div className="p-6 rounded-2xl bg-background border">
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                        <Award className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">Excelencia en Ejecución</h3>
                                    <p className="text-muted-foreground">
                                        Nos comprometemos a entregar proyectos de calidad que realmente transformen las comunidades
                                        turísticas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Impact Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-6">Nuestro Impacto</h2>
                            <p className="text-xl text-muted-foreground mb-12">
                                FondoClaro está transformando la manera en que se gestionan los proyectos turísticos públicos
                            </p>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div>
                                    <div className="text-4xl font-bold text-primary mb-2">$2.5M</div>
                                    <div className="text-muted-foreground">En Fondos Gestionados</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-primary mb-2">12</div>
                                    <div className="text-muted-foreground">Proyectos Activos</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-primary mb-2">100%</div>
                                    <div className="text-muted-foreground">Transparencia Garantizada</div>
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
