"use client"

import { ProjectCard } from "@/components/project-card"

// Mock data - in production this would come from an API/database
const projects = [
    {
        id: "1",
        title: "Renovación del Malecón Turístico",
        description: "Modernización de la infraestructura del malecón principal para mejorar la experiencia turística",
        budget: 2500000,
        spent: 1875000,
        status: "in-progress",
        region: "Región Caribe",
        type: "Infraestructura",
        contractor: "Constructora del Caribe S.A.",
        startDate: "2024-01-15",
        endDate: "2025-06-30",
        progress: 75,
        image: "/coastal-boardwalk-renovation.jpg",
    },
    {
        id: "2",
        title: "Parque Ecológico Nacional",
        description: "Creación de un parque ecológico con senderos interpretativos y centro de visitantes",
        budget: 1800000,
        spent: 1800000,
        status: "completed",
        region: "Región Norte",
        type: "Conservación",
        contractor: "EcoDesarrollo Ltda.",
        startDate: "2023-03-01",
        endDate: "2024-02-28",
        progress: 100,
        image: "/ecological-park-with-trails.jpg",
    },
    {
        id: "3",
        title: "Centro de Convenciones Regional",
        description: "Construcción de un moderno centro de convenciones para eventos turísticos y empresariales",
        budget: 5000000,
        spent: 1250000,
        status: "in-progress",
        region: "Región Centro",
        type: "Infraestructura",
        contractor: "Mega Construcciones S.A.",
        startDate: "2024-06-01",
        endDate: "2026-12-31",
        progress: 25,
        image: "/modern-convention-center.png",
    },
    {
        id: "4",
        title: "Programa de Capacitación Hotelera",
        description: "Formación de personal en servicios turísticos y hotelería de alta calidad",
        budget: 450000,
        spent: 112500,
        status: "in-progress",
        region: "Región Sur",
        type: "Capacitación",
        contractor: "Instituto de Turismo Nacional",
        startDate: "2024-09-01",
        endDate: "2025-08-31",
        progress: 25,
        image: "/hotel-training-program.jpg",
    },
    {
        id: "5",
        title: "Restauración de Sitio Histórico",
        description: "Recuperación y puesta en valor de sitio histórico colonial para turismo cultural",
        budget: 1200000,
        spent: 0,
        status: "planning",
        region: "Región Centro",
        type: "Conservación",
        contractor: "Pendiente de licitación",
        startDate: "2025-01-01",
        endDate: "2026-06-30",
        progress: 0,
        image: "/colonial-historic-site.jpg",
    },
    {
        id: "6",
        title: "Campaña de Promoción Internacional",
        description: "Estrategia de marketing digital para posicionar el destino en mercados internacionales",
        budget: 800000,
        spent: 400000,
        status: "in-progress",
        region: "Región Pacífico",
        type: "Promoción",
        contractor: "Global Marketing Agency",
        startDate: "2024-04-01",
        endDate: "2025-03-31",
        progress: 50,
        image: "/tourism-marketing-campaign.jpg",
    },
]

export function ProjectsGrid() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    )
}
