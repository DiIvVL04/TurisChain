"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Milestone {
    id: string
    status: string
    evidence_description: string | null
}

interface UpdateMilestoneButtonProps {
    milestone: Milestone
}

const { toast } = useToast();

export function UpdateMilestoneButton({ milestone }: UpdateMilestoneButtonProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        status: milestone.status,
        evidence_description: milestone.evidence_description || "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const supabase = getSupabaseBrowserClient()

            const updateData: any = {
                status: formData.status,
                evidence_description: formData.evidence_description,
            }

            // If marking as completed, set completion date
            if (formData.status === "completado" && milestone.status !== "completado") {
                updateData.completion_date = new Date().toISOString()
            }

            const { error: updateError } = await supabase.from("milestones").update(updateData).eq("id", milestone.id)

            if (updateError) throw updateError

            toast("Hito actualizado: El progreso del hito ha sido actualizado")


            setOpen(false)
            router.refresh()
        } catch (err: any) {
            setError(err.message || "Error al actualizar el hito")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="ml-11 bg-transparent">
                    <Upload className="h-4 w-4 mr-2" />
                    Actualizar Progreso
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Actualizar Progreso del Hito</DialogTitle>
                    <DialogDescription>Reporta el avance y sube evidencia del trabajo realizado</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="status">Estado del Hito</Label>
                        <Select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({ ...formData, status: e.target.value })
                            }
                            disabled={loading}
                        >

                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pendiente">Pendiente</SelectItem>
                                <SelectItem value="en_progreso">En Progreso</SelectItem>
                                <SelectItem value="completado">Completado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="evidence_description">Descripción de Evidencia</Label>
                        <Textarea
                            id="evidence_description"
                            value={formData.evidence_description}
                            onChange={(e) => setFormData({ ...formData, evidence_description: e.target.value })}
                            placeholder="Describe el trabajo realizado, materiales utilizados, avances logrados..."
                            rows={5}
                            disabled={loading}
                        />
                        <p className="text-xs text-slate-500">
                            Proporciona detalles específicos del progreso para facilitar la validación por parte del gobierno
                        </p>
                    </div>

                    {formData.status === "completado" && (
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                Al marcar como completado, el hito será enviado para validación del gobierno. Una vez validado, los
                                fondos serán liberados automáticamente.
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="flex gap-4">
                        <Button type="submit" disabled={loading} className="flex-1">
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Actualizando...
                                </>
                            ) : (
                                "Guardar Cambios"
                            )}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                            Cancelar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
