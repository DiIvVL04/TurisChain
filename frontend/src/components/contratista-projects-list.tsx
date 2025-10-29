import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Eye, Upload, MapPin } from "lucide-react"

const statusColors = {
    planificacion: "bg-blue-100 text-blue-800",
    en_progreso: "bg-yellow-100 text-yellow-800",
    completado: "bg-green-100 text-green-800",
    cancelado: "bg-red-100 text-red-800",
}

const statusLabels = {
    planificacion: "Planificación",
    en_progreso: "En Progreso",
    completado: "Completado",
    cancelado: "Cancelado",
}

interface Milestone {
    id: string
    status: "planificacion" | "en_progreso" | "completado" | "cancelado" | "validado"
    title: string
    description: string | null
    order_number: number
}

interface Project {
    id: string
    title: string
    location: string
    budget: number
    status: "planificacion" | "en_progreso" | "completado" | "cancelado"
    milestones: Milestone[]
}


export async function ContratistaProjectsList() {
    const supabase = await getSupabaseServerClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { data: projects } = await supabase
        .from("projects")
        .select("*, milestones(*)")
        .eq("contractor_id", user?.id)
        .order("created_at", { ascending: false })

    if (!projects || projects.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-600">No tienes proyectos asignados aún</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {projects.map((project: Project) => {
                const totalMilestones = project.milestones.length
                const completedMilestones = project.milestones.filter(
                    (m) => m.status === "completado" || m.status === "validado",
                ).length
                const progress = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0

                return (
                    <div key={project.id} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-semibold text-slate-900">{project.title}</h3>
                                    <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                                        {statusLabels[project.status as keyof typeof statusLabels]}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {project.location}
                                    </span>
                                    <span>Presupuesto: ${(Number(project.budget) / 1000000).toFixed(1)}M MXN</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/proyectos/${project.id}`}>
                                        <Eye className="h-4 w-4 mr-1" />
                                        Ver
                                    </Link>
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/dashboard/contratista/proyectos/${project.id}`}>
                                        <Upload className="h-4 w-4 mr-1" />
                                        Gestionar
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-600">Progreso de hitos</span>
                                <span className="font-medium">
                                    {completedMilestones} / {totalMilestones}
                                </span>
                            </div>
                            <Progress value={progress} className="h-2" />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
