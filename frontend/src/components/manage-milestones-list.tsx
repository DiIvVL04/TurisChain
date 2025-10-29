import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar, DollarSign } from "lucide-react"

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

interface ManageMilestonesListProps {
    projectId: string
}

interface Milestone {
    id: string
    title: string
    description: string
    amount: number
    due_date: string
    completion_date?: string | null
    status: "pendiente" | "en_progreso" | "completado" | "validado"
    evidence_description?: string | null
    order_number: number
    project_id: string
}


export async function ManageMilestonesList({ projectId }: ManageMilestonesListProps) {
    const supabase = await getSupabaseServerClient()

    const { data: milestones } = await supabase
        .from<"milestones", any>("milestones")
        .select("*")
        .eq("project_id", projectId)
        .order("order_number", { ascending: true })



    if (!milestones || milestones.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-600">No hay hitos creados para este proyecto</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {milestones.map((milestone: Milestone, index: number) => (
                <div key={milestone.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-semibold text-sm">
                                    {index + 1}
                                </span>
                                <h3 className="font-semibold text-slate-900">{milestone.title}</h3>
                                <Badge className={statusColors[milestone.status as keyof typeof statusColors]}>
                                    {statusLabels[milestone.status as keyof typeof statusLabels]}
                                </Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-3 ml-11">{milestone.description}</p>
                            <div className="flex items-center gap-4 text-sm text-slate-600 ml-11">
                                <span className="flex items-center gap-1">
                                    <DollarSign className="h-3 w-3" />${Number(milestone.amount).toLocaleString("es-MX")} MXN
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    Vence: {formatDate(new Date(milestone.due_date), "dd MMM yyyy", { locale: es })}
                                </span>
                                {milestone.completion_date && (
                                    <span className="flex items-center gap-1">
                                        Completado: {formatDate(new Date(milestone.completion_date), "dd MMM yyyy", { locale: es })}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {milestone.evidence_description && (
                        <div className="ml-11 p-3 bg-slate-50 rounded-md">
                            <p className="text-sm font-medium text-slate-700 mb-1">Evidencia del contratista:</p>
                            <p className="text-sm text-slate-600">{milestone.evidence_description}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
