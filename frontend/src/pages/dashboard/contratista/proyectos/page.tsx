import { getSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ContractorMilestonesList } from "@/components/contractor-milestones-list"

export default async function ContractorProjectPage({ params }: { params: { id: string } }) {
    const supabase = await getSupabaseServerClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (profile?.role !== "contratista") {
        redirect("/dashboard")
    }

    const { data: project } = await supabase
        .from("projects")
        .select("*")
        .eq("id", params.id)
        .eq("contractor_id", user.id)
        .single()

    if (!project) {
        redirect("/dashboard/contratista")
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="border-b bg-white">
                <div className="container mx-auto px-4 py-6">
                    <Button variant="ghost" size="sm" asChild className="mb-4">
                        <Link href="/dashboard/contratista">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver al Dashboard
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Gestionar Hitos</h1>
                        <p className="text-slate-600 mt-1">{project.title}</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-6 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Información del Proyecto</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-slate-600">Ubicación:</span>
                                    <p className="font-medium">{project.location}</p>
                                </div>
                                <div>
                                    <span className="text-slate-600">Presupuesto Total:</span>
                                    <p className="font-medium">${Number(project.budget).toLocaleString("es-MX")} MXN</p>
                                </div>
                                <div>
                                    <span className="text-slate-600">Fondos Gastados:</span>
                                    <p className="font-medium">${Number(project.spent_funds).toLocaleString("es-MX")} MXN</p>
                                </div>
                                <div>
                                    <span className="text-slate-600">Estado:</span>
                                    <p className="font-medium capitalize">{project.status.replace("_", " ")}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Hitos del Proyecto</CardTitle>
                        <p className="text-sm text-slate-500">Reporta el progreso y sube evidencia de cada hito</p>
                    </CardHeader>
                    <CardContent>
                        <ContractorMilestonesList projectId={params.id} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
