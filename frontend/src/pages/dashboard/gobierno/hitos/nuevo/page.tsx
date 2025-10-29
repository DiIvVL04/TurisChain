import { getSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { CreateMilestoneForm } from "@/components/create-milestone-form"

export default async function NewMilestonePage({ params }: { params: { id: string } }) {
    const supabase = await getSupabaseServerClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (profile?.role !== "gobierno") {
        redirect("/dashboard")
    }

    const { data: project } = await supabase.from("projects").select("*").eq("id", params.id).single()

    if (!project) {
        redirect("/dashboard/gobierno")
    }

    // Get existing milestones count for order number
    const { data: existingMilestones } = await supabase
        .from("milestones")
        .select("order_number")
        .eq("project_id", params.id)

    const nextOrderNumber = (existingMilestones?.length || 0) + 1

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="border-b bg-white">
                <div className="container mx-auto px-4 py-6">
                    <Button variant="ghost" size="sm" asChild className="mb-4">
                        <Link href={`/dashboard/gobierno/proyectos/${params.id}/hitos`}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver a Hitos
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold text-slate-900">Agregar Nuevo Hito</h1>
                    <p className="text-slate-600 mt-1">{project.title}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <CreateMilestoneForm projectId={params.id} orderNumber={nextOrderNumber} />
                </div>
            </div>
        </div>
    )
}
