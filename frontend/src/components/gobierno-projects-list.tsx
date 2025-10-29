import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Eye, Edit, MapPin, CheckCircle2 } from "lucide-react"

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

interface Profile {
    full_name: string
}

interface Project {
    id: string
    title: string
    location: string
    budget: number
    status: "planificacion" | "en_progreso" | "completado" | "cancelado"
    profiles?: Profile | null
}
    

export async function GobiernoProjectsList() {
    const supabase = await getSupabaseServerClient()
    const { data: projects } = await supabase
        .from("projects")
        .select("*, profiles(full_name)")
        .order("created_at", { ascending: false })
        .limit(10)

    if (!projects || projects.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-600 mb-4">No hay proyectos creados aún</p>
                <Button asChild>
                    <Link href="/dashboard/gobierno/proyectos/nuevo">Crear primer proyecto</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {projects.map((project: Project) => (
                <div
                    key={project.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-slate-900">{project.title}</h3>
                            <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                                {statusLabels[project.status as keyof typeof statusLabels]}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {project.location}
                            </span>
                            <span>Presupuesto: ${(Number(project.budget) / 1000000).toFixed(1)}M MXN</span>
                            {project.profiles && <span>Contratista: {project.profiles.full_name || "Sin asignar"}</span>}
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
                            <Link href={`/dashboard/gobierno/proyectos/${project.id}/hitos`}>
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Hitos
                            </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/gobierno/proyectos/${project.id}/editar`}>
                                <Edit className="h-4 w-4 mr-1" />
                                Editar
                            </Link>
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}
