"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"

interface CreateMilestoneFormProps {
    projectId: string
    orderNumber: number
}

export function CreateMilestoneForm({ projectId, orderNumber }: CreateMilestoneFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        amount: "",
        due_date: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const supabase = getSupabaseBrowserClient()

            const { error: insertError } = await supabase.from("milestones").insert({
                project_id: projectId,
                title: formData.title,
                description: formData.description,
                amount: Number.parseFloat(formData.amount),
                due_date: formData.due_date,
                order_number: orderNumber,
                status: "pendiente",
            })

            if (insertError) throw insertError

            router.push(`/dashboard/gobierno/proyectos/${projectId}/hitos`)
            router.refresh()
        } catch (err: any) {
            setError(err.message || "Error al crear el hito")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Información del Hito #{orderNumber}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="title">Título del Hito *</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Ej: Diseño y Planificación"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción *</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe las actividades y entregables de este hito..."
                            rows={4}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">Monto (MXN) *</Label>
                            <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                placeholder="3000000.00"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="due_date">Fecha de Vencimiento *</Label>
                            <Input
                                id="due_date"
                                type="date"
                                value={formData.due_date}
                                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={loading} className="flex-1">
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creando hito...
                                </>
                            ) : (
                                "Crear Hito"
                            )}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
                            Cancelar
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
