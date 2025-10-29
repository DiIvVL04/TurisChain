import Link from "next/link"
import { MapPin, Calendar, TrendingUp } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface Project {
    id: string
    title: string
    description: string
    budget: number
    spent: number
    status: string
    region: string
    type: string
    contractor: string
    startDate: string
    endDate: string
    progress: number
    image: string
}

interface ProjectCardProps {
    project: Project
}

const statusConfig = {
    planning: { label: "En planificación", variant: "secondary" as const },
    "in-progress": { label: "En ejecución", variant: "default" as const },
    completed: { label: "Completado", variant: "outline" as const },
    "on-hold": { label: "En pausa", variant: "destructive" as const },
}

export function ProjectCard({ project }: ProjectCardProps) {
    const statusInfo = statusConfig[project.status as keyof typeof statusConfig]
    const budgetUsed = (project.spent / project.budget) * 100

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden bg-muted">
                <img src={project.image || "/placeholder.svg"} alt={project.title} className="object-cover w-full h-full" />
            </div>

            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                    <Badge variant="outline">{project.type}</Badge>
                </div>
                <h3 className="font-semibold text-lg leading-tight text-balance">{project.title}</h3>
            </CardHeader>

            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">{project.description}</p>

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progreso</span>
                        <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{project.region}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(project.startDate).toLocaleDateString("es")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        <span>
                            ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                        </span>
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                <Button asChild className="w-full">
                    <Link href={`/proyectos/${project.id}`}>Ver detalles</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
