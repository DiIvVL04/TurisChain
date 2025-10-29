import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-t border-border bg-muted/30">
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-4">
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                                <svg className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            </div>
                            <span className="text-lg font-semibold">FondoClaro</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Transparencia en la gestión de fondos públicos turísticos mediante blockchain.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Plataforma</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/proyectos" className="text-muted-foreground hover:text-foreground">
                                    Proyectos
                                </Link>
                            </li>
                            <li>
                                <Link href="/como-funciona" className="text-muted-foreground hover:text-foreground">
                                    Cómo Funciona
                                </Link>
                            </li>
                            <li>
                                <Link href="/transparencia" className="text-muted-foreground hover:text-foreground">
                                    Transparencia
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Recursos</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/documentacion" className="text-muted-foreground hover:text-foreground">
                                    Documentación
                                </Link>
                            </li>
                            <li>
                                <Link href="/api" className="text-muted-foreground hover:text-foreground">
                                    API
                                </Link>
                            </li>
                            <li>
                                <Link href="/soporte" className="text-muted-foreground hover:text-foreground">
                                    Soporte
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/privacidad" className="text-muted-foreground hover:text-foreground">
                                    Privacidad
                                </Link>
                            </li>
                            <li>
                                <Link href="/terminos" className="text-muted-foreground hover:text-foreground">
                                    Términos
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacto" className="text-muted-foreground hover:text-foreground">
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
                    <p>© 2025 FondoClaro. Todos los derechos reservados. Powered by Stellar Blockchain.</p>
                </div>
            </div>
        </footer>
    )
}
