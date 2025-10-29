export function StatsSection() {
    const stats = [
        { value: "100%", label: "Transparencia Verificable" },
        { value: "24/7", label: "Acceso en Tiempo Real" },
        { value: "0", label: "Intermediarios" },
        { value: "Stellar", label: "Blockchain Empresarial" },
    ]

    return (
        <section className="border-y border-border bg-card py-16">
            <div className="container mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="mb-2 text-4xl font-bold text-accent md:text-5xl">{stat.value}</div>
                            <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
