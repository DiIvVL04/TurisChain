"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ValidateMilestoneButtonProps {
    milestoneId: string
    userId: string
}

export function ValidateMilestoneButton({ milestoneId, userId }: ValidateMilestoneButtonProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)

    const handleValidate = async () => {
        setLoading(true)

        try {
            const supabase = getSupabaseBrowserClient()

            // Update milestone status
            const { error: milestoneError } = await supabase
                .from("milestones")
                .update({
                    status: "validado",
                    validated_by: userId,
                    validated_at: new Date().toISOString(),
                })
                .eq("id", milestoneId)

            if (milestoneError) throw milestoneError

            // Get milestone details to update project spent_funds
            const { data: milestone } = await supabase
                .from("milestones")
                .select("project_id, amount")
                .eq("id", milestoneId)
                .single()

            if (milestone) {
                // Update project spent_funds
                const { data: project } = await supabase
                    .from("projects")
                    .select("spent_funds")
                    .eq("id", milestone.project_id)
                    .single()

                if (project) {
                    const newSpentFunds = Number(project.spent_funds) + Number(milestone.amount)
                    await supabase.from("projects").update({ spent_funds: newSpentFunds }).eq("id", milestone.project_id)
                }

                // Create blockchain transaction record (simulated)
                await supabase.from("blockchain_transactions").insert({
                    project_id: milestone.project_id,
                    milestone_id: milestoneId,
                    transaction_hash: `TXN_${Date.now()}_${Math.random().toString(36).substring(7)}`,
                    amount: milestone.amount,
                    transaction_type: "milestone_payment",
                    from_address: `GOVT_${Math.random().toString(36).substring(7)}`,
                    to_address: `CONTRACTOR_${Math.random().toString(36).substring(7)}`,
                    status: "confirmed",
                    blockchain_timestamp: new Date().toISOString(),
                })
            }

            toast("Hito validado: El hito ha sido validado y los fondos han sido liberados", "success")


            router.refresh()
        } catch (error: any) {
            toast("Error al validar el hito: " + (error.message || "Error desconocido"), "destructive")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button onClick={handleValidate} disabled={loading} size="sm">
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Validando...
                </>
            ) : (
                <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Validar y Liberar Fondos
                </>
            )}
        </Button>
    )
}
