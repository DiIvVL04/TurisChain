import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { ValidateMilestoneButton } from "@/components/validate-milestone-button"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { ExternalLink } from "lucide-react"

const statusColors = {
    pendiente: "bg-slate-100 text-slate-800",
    en_progreso: "bg-yellow-100 text-yellow-800",
    completado: "bg-blue-100 text-blue-800",
    validado: "bg-green-100 text-green-800",
}

const statusLabels = {
    pendiente: "Pendiente",
    en_progreso: "En Progreso",
    completado: "Completado",
    validado: "Validado",
}

interface ValidateMilestonesTableProps {
    userId: string
}

interface Project {
    id: string
    title: string
}

interface Milestone {
    id: string
    title: string
    description: string
    amount: number
    status: "pendiente" | "en_progreso" | "completado" | "validado"
    due_date: string
    completion_date?: string | null
    evidence_description?: string | null
    evidence_url?: string | null   // <- agrega esto
    project_id: string
    projects?: Project
}

export async function ValidateMilestonesTable({ userId }: ValidateMilestonesTableProps) {
    const supabase = await getSupabaseServerClient()

    const { data: milestones } = await supabase
        .from("milestones")
        .select("*, projects(title, location)")
        .eq("status", "completado")
        .order("completion_date", { ascending: false })

    if (!milestones || milestones.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-600">No hay hitos pendientes de validación</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {milestones.map((milestone: Milestone) => (
                <div key={milestone.id} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-slate-900">{milestone.title}</h3>
                                <Badge className={statusColors[milestone.status as keyof typeof statusColors]}>
                                    {statusLabels[milestone.status as keyof typeof statusLabels]}
                                </Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{milestone.description}</p>
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                                <span>Proyecto: {milestone.projects?.title}</span>
                                <span>Monto: ${Number(milestone.amount).toLocaleString("es-MX")} MXN</span>
                                {milestone.completion_date && (
                                    <span>
                                        Completado{" "}
                                        {formatDistanceToNow(new Date(milestone.completion_date), {
                                            addSuffix: true,
                                            locale: es,
                                        })}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {milestone.evidence_description && (
                        <div className="mb-3 p-3 bg-slate-50 rounded-md">
                            <p className="text-sm font-medium text-slate-700 mb-1">Evidencia:</p>
                            <p className="text-sm text-slate-600">{milestone.evidence_description}</p>
                            {milestone.evidence_url && (
                                <a
                                    href={milestone.evidence_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-teal-600 hover:text-teal-700 inline-flex items-center gap-1 mt-2"
                                >
                                    Ver archivo adjunto
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            )}
                        </div>
                    )}

                    <ValidateMilestoneButton milestoneId={milestone.id} userId={userId} />
                </div>
            ))}
        </div>
    )
}
