"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProjectsFilters() {
    const [search, setSearch] = useState<string>("")
    const [status, setStatus] = useState<string>("all")
    const [region, setRegion] = useState<string>("all")
    const [type, setType] = useState<string>("all")


    return (
        <div className="bg-card border rounded-lg p-6 mb-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar proyectos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>

                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <SelectTrigger>
                        <SelectValue children="Estado" placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los estados</SelectItem>
                        <SelectItem value="planning">En planificación</SelectItem>
                        <SelectItem value="in-progress">En ejecución</SelectItem>
                        <SelectItem value="completed">Completado</SelectItem>
                        <SelectItem value="on-hold">En pausa</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={region} onChange={(e) => setRegion(e.target.value)}>
                    <SelectTrigger>
                        <SelectValue children="Región" placeholder="Región" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas las regiones</SelectItem>
                        <SelectItem value="norte">Región Norte</SelectItem>
                        <SelectItem value="centro">Región Centro</SelectItem>
                        <SelectItem value="sur">Región Sur</SelectItem>
                        <SelectItem value="caribe">Región Caribe</SelectItem>
                        <SelectItem value="pacifico">Región Pacífico</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <SelectTrigger>
                        <SelectValue children="Tipo" placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los tipos</SelectItem>
                        <SelectItem value="infrastructure">Infraestructura</SelectItem>
                        <SelectItem value="conservation">Conservación</SelectItem>
                        <SelectItem value="promotion">Promoción</SelectItem>
                        <SelectItem value="training">Capacitación</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex gap-2 mt-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        setSearch("")
                        setStatus("all")
                        setRegion("all")
                        setType("all")
                    }}
                >
                    Limpiar filtros
                </Button>
            </div>
        </div>
    )
}
