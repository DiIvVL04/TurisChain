"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, Plus, X } from "lucide-react"

interface Contractor {
    id: string
    full_name: string
    organization: string | null
}

interface CreateProjectFormProps {
    contractors: Contractor[]
    userId: string
}

export function CreateProjectForm({ contractors, userId }: CreateProjectFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [objectives, setObjectives] = useState<string[]>([""])
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        region: "",
        project_type: "",
        budget: "",
        start_date: "",
        end_date: "",
        contractor_id: "",
        expected_impact: "",
    })

    const handleAddObjective = () => {
        setObjectives([...objectives, ""])
    }

    const handleRemoveObjective = (index: number) => {
        setObjectives(objectives.filter((_, i) => i !== index))
    }

    const handleObjectiveChange = (index: number, value: string) => {
        const newObjectives = [...objectives]
        newObjectives[index] = value
        setObjectives(newObjectives)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const supabase = getSupabaseBrowserClient()

            const { data, error: insertError } = await supabase
                .from("projects")
                .insert({
                    ...formData,
                    budget: Number.parseFloat(formData.budget),
                    allocated_funds: Number.parseFloat(formData.budget),
                    objectives: objectives.filter((o) => o.trim() !== ""),
                    created_by: userId,
                    status: "planificacion",
                })
                .select()
                .single()

            if (insertError) throw insertError

            router.push("/dashboard/gobierno")
            router.refresh()
        } catch (err: any) {
            setError(err.message || "Error al crear el proyecto")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Información del Proyecto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="title">Título del Proyecto *</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Ej: Renovación del Malecón Costero"
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
                            placeholder="Describe el proyecto en detalle..."
                            rows={4}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="location">Ubicación *</Label>
                            <Input
                                id="location"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="Ciudad, Estado"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="region">Región *</Label>
                            <Select
                                value={formData.region}
                                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                                disabled={loading}
                            >
                                <SelectTrigger>
                                    <SelectValue children={formData.region} placeholder="Selecciona región" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Norte">Norte</SelectItem>
                                    <SelectItem value="Sur">Sur</SelectItem>
                                    <SelectItem value="Este">Este</SelectItem>
                                    <SelectItem value="Oeste">Oeste</SelectItem>
                                    <SelectItem value="Centro">Centro</SelectItem>
                                    <SelectItem value="Pacífico">Pacífico</SelectItem>
                                    <SelectItem value="Caribe">Caribe</SelectItem>
                                    <SelectItem value="Sureste">Sureste</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="project_type">Tipo de Proyecto *</Label>
                            <Select
                                value={formData.project_type}
                                onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                                disabled={loading}
                            >
                                <SelectTrigger>
                                    <SelectValue children={formData.project_type} placeholder="Selecciona tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Infraestructura">Infraestructura</SelectItem>
                                    <SelectItem value="Ecoturismo">Ecoturismo</SelectItem>
                                    <SelectItem value="Cultural">Cultural</SelectItem>
                                    <SelectItem value="Gastronómico">Gastronómico</SelectItem>
                                    <SelectItem value="Aventura">Aventura</SelectItem>
                                    <SelectItem value="Playa">Playa</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="budget">Presupuesto (MXN) *</Label>
                            <Input
                                id="budget"
                                type="number"
                                step="0.01"
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                placeholder="15000000.00"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="start_date">Fecha de Inicio *</Label>
                            <Input
                                id="start_date"
                                type="date"
                                value={formData.start_date}
                                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="end_date">Fecha de Finalización *</Label>
                            <Input
                                id="end_date"
                                type="date"
                                value={formData.end_date}
                                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="contractor_id">Asignar Contratista</Label>
                        <Select
                            value={formData.contractor_id}
                            onChange={(e) => setFormData({ ...formData, contractor_id: e.target.value })}
                            disabled={loading}
                        >
                            <SelectTrigger>
                                <SelectValue children={formData.contractor_id} placeholder="Selecciona contratista (opcional)" />
                            </SelectTrigger>
                            <SelectContent>
                                {contractors.map((contractor) => (
                                    <SelectItem key={contractor.id} value={contractor.id}>
                                        {contractor.full_name}
                                        {contractor.organization && ` - ${contractor.organization}`}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Objetivos del Proyecto</Label>
                        {objectives.map((objective, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    value={objective}
                                    onChange={(e) => handleObjectiveChange(index, e.target.value)}
                                    placeholder={`Objetivo ${index + 1}`}
                                    disabled={loading}
                                />
                                {objectives.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleRemoveObjective(index)}
                                        disabled={loading}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={handleAddObjective} disabled={loading}>
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar Objetivo
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="expected_impact">Impacto Esperado</Label>
                        <Textarea
                            id="expected_impact"
                            value={formData.expected_impact}
                            onChange={(e) => setFormData({ ...formData, expected_impact: e.target.value })}
                            placeholder="Describe el impacto esperado del proyecto..."
                            rows={3}
                            disabled={loading}
                        />
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={loading} className="flex-1">
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creando proyecto...
                                </>
                            ) : (
                                "Crear Proyecto"
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
