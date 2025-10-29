import { getSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderKanban, Clock, CheckCircle2, DollarSign } from "lucide-react"
import { ContratistaProjectsList } from "@/components/contratista-projects-list"

export default async function ContratistaDashboardPage() {
    const supabase = await getSupabaseServerClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).single()

    if (profile?.role !== "contratista") {
        redirect("/dashboard")
    }

    // Get contractor's projects
    const { data: projects } = await supabase.from("projects").select("*, milestones(*)").eq("contractor_id", user.id)

    const totalProjects = projects?.length || 0
    const activeProjects = projects?.filter((p) => p.status === "en_progreso").length || 0

    const allMilestones = projects?.flatMap((p) => p.milestones) || []
    const pendingMilestones = allMilestones.filter((m) => m.status === "pendiente" || m.status === "en_progreso").length
    const completedMilestones = allMilestones.filter((m) => m.status === "validado").length

    const totalEarned = allMilestones.filter((m) => m.status === "validado").reduce((sum, m) => sum + Number(m.amount), 0)

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="border-b bg-white">
                <div className="container mx-auto px-4 py-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Panel de Contratista</h1>
                        <p className="text-slate-600 mt-1">Bienvenido, {profile?.full_name}</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Proyectos Asignados</CardTitle>
                            <FolderKanban className="h-4 w-4 text-slate-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalProjects}</div>
                            <p className="text-xs text-slate-600 mt-1">{activeProjects} activos</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Hitos Pendientes</CardTitle>
                            <Clock className="h-4 w-4 text-slate-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{pendingMilestones}</div>
                            <p className="text-xs text-slate-600 mt-1">Por completar</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Hitos Completados</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-slate-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{completedMilestones}</div>
                            <p className="text-xs text-slate-600 mt-1">Validados</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Fondos Recibidos</CardTitle>
                            <DollarSign className="h-4 w-4 text-slate-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${(totalEarned / 1000000).toFixed(1)}M</div>
                            <p className="text-xs text-slate-600 mt-1">MXN pagados</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Mis Proyectos</CardTitle>
                        <p className="text-sm text-slate-500">Gestiona el progreso de tus proyectos asignados</p>
                    </CardHeader>
                    <CardContent>
                        <ContratistaProjectsList />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
