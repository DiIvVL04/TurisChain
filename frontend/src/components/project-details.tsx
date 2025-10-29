"use client"

import { ArrowLeft, MapPin, Calendar, Building2, CheckCircle2, Circle, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

interface ProjectDetailsProps {
    project: {
        id: string
        title: string
        description: string
        budget: number
        spent: number
        status: string
        region: string
        type: string
        contractor: string
        contractorId: string
        startDate: string
        endDate: string
        progress: number
        image: string
        objectives: string[]
        milestones: Array<{
            name: string
            status: string
            date: string
        }>
        transactions: Array<{
            date: string
            amount: number
            concept: string
            hash: string
        }>
    }
}

const statusConfig = {
    planning: { label: "En planificación", variant: "secondary" as const },
    "in-progress": { label: "En ejecución", variant: "default" as const },
    completed: { label: "Completado", variant: "outline" as const },
    "on-hold": { label: "En pausa", variant: "destructive" as const },
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
    const statusInfo = statusConfig[project.status as keyof typeof statusConfig]

    return (
        <div className="space-y-6">
            <Button variant="ghost" asChild>
                <Link href="/proyectos">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a proyectos
                </Link>
            </Button>

            <div className="aspect-[21/9] relative overflow-hidden rounded-lg bg-muted">
                <img src={project.image || "/placeholder.svg"} alt={project.title} className="object-cover w-full h-full" />
            </div>

            <div className="flex flex-wrap gap-2">
                <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                <Badge variant="outline">{project.type}</Badge>
                <Badge variant="outline">{project.region}</Badge>
            </div>

            <div>
                <h1 className="text-4xl font-bold mb-4 text-balance">{project.title}</h1>
                <p className="text-lg text-muted-foreground text-pretty">{project.description}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Información General</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="text-sm font-medium">Contratista</p>
                                <p className="text-sm text-muted-foreground">{project.contractor}</p>
                                <p className="text-xs text-muted-foreground">ID: {project.contractorId}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="text-sm font-medium">Ubicación</p>
                                <p className="text-sm text-muted-foreground">{project.region}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="text-sm font-medium">Período de ejecución</p>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(project.startDate).toLocaleDateString("es")} -{" "}
                                    {new Date(project.endDate).toLocaleDateString("es")}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Presupuesto y Ejecución</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Progreso del proyecto</span>
                                <span className="text-sm font-bold">{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Presupuesto total</span>
                                <span className="text-sm font-medium">${project.budget.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Ejecutado</span>
                                <span className="text-sm font-medium text-accent">${project.spent.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Disponible</span>
                                <span className="text-sm font-medium">${(project.budget - project.spent).toLocaleString()}</span>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Ejecución presupuestal</span>
                                <span className="text-sm font-bold">{((project.spent / project.budget) * 100).toFixed(1)}%</span>
                            </div>
                            <Progress value={(project.spent / project.budget) * 100} className="h-2" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Objetivos del Proyecto</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {project.objectives.map((objective, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{objective}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Hitos del Proyecto</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {project.milestones.map((milestone, index) => (
                            <div key={index} className="flex items-start gap-3">
                                {milestone.status === "completed" && <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />}
                                {milestone.status === "in-progress" && <Clock className="h-5 w-5 text-primary mt-0.5" />}
                                {milestone.status === "pending" && <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />}
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{milestone.name}</p>
                                    <p className="text-xs text-muted-foreground">{new Date(milestone.date).toLocaleDateString("es")}</p>
                                </div>
                                <Badge
                                    variant={
                                        milestone.status === "completed"
                                            ? "outline"
                                            : milestone.status === "in-progress"
                                                ? "default"
                                                : "secondary"
                                    }
                                >
                                    {milestone.status === "completed"
                                        ? "Completado"
                                        : milestone.status === "in-progress"
                                            ? "En progreso"
                                            : "Pendiente"}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Transacciones en Blockchain</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {project.transactions.map((transaction, index) => (
                            <div key={index} className="flex items-start justify-between gap-4 pb-4 border-b last:border-0 last:pb-0">
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{transaction.concept}</p>
                                    <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString("es")}</p>
                                    <p className="text-xs text-muted-foreground font-mono mt-1">Hash: {transaction.hash}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-accent">${transaction.amount.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
