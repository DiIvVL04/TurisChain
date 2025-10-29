"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle, Loader2, Building2, HardHat } from "lucide-react"

export function RegisterForm() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        organization: "",
        phone: "",
        role: "gobierno" as "gobierno" | "contratista",
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden")
            return
        }

        if (formData.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres")
            return
        }

        setLoading(true)

        try {
            const supabase = getSupabaseBrowserClient()

            // Sign up user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
                    data: {
                        full_name: formData.fullName,
                        role: formData.role,
                        organization: formData.organization,
                        phone: formData.phone,
                    },
                },
            })

            if (authError) throw authError

            if (authData.user) {
                // Create profile
                const { error: profileError } = await supabase.from("profiles").insert({
                    id: authData.user.id,
                    email: formData.email,
                    full_name: formData.fullName,
                    role: formData.role,
                    organization: formData.organization,
                    phone: formData.phone,
                })

                if (profileError) throw profileError

                router.push("/dashboard")
                router.refresh()
            }
        } catch (err: any) {
            setError(err.message || "Error al crear la cuenta")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="space-y-2">
                <Label>Tipo de cuenta</Label>
                <RadioGroup
                    value={formData.role}
                    onValueChange={(value) => setFormData({ ...formData, role: value as "gobierno" | "contratista" })}
                    className="grid grid-cols-2 gap-4"
                >
                    <div>
                        <RadioGroupItem value="gobierno" id="gobierno" className="peer sr-only" />
                        <Label
                            htmlFor="gobierno"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-slate-200 bg-white p-4 hover:bg-slate-50 peer-data-[state=checked]:border-teal-600 peer-data-[state=checked]:bg-teal-50 cursor-pointer"
                        >
                            <Building2 className="mb-3 h-6 w-6" />
                            <span className="text-sm font-medium">Gobierno</span>
                        </Label>
                    </div>
                    <div>
                        <RadioGroupItem value="contratista" id="contratista" className="peer sr-only" />
                        <Label
                            htmlFor="contratista"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-slate-200 bg-white p-4 hover:bg-slate-50 peer-data-[state=checked]:border-teal-600 peer-data-[state=checked]:bg-teal-50 cursor-pointer"
                        >
                            <HardHat className="mb-3 h-6 w-6" />
                            <span className="text-sm font-medium">Contratista</span>
                        </Label>
                    </div>
                </RadioGroup>
            </div>

            <div className="space-y-2">
                <Label htmlFor="fullName">Nombre completo</Label>
                <Input
                    id="fullName"
                    type="text"
                    placeholder="Juan Pérez"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    disabled={loading}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={loading}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="organization">{formData.role === "gobierno" ? "Dependencia" : "Empresa"}</Label>
                <Input
                    id="organization"
                    type="text"
                    placeholder={formData.role === "gobierno" ? "Secretaría de Turismo" : "Constructora ABC S.A."}
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    disabled={loading}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                    id="phone"
                    type="tel"
                    placeholder="+52 123 456 7890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={loading}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    disabled={loading}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    disabled={loading}
                />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creando cuenta...
                    </>
                ) : (
                    "Crear cuenta"
                )}
            </Button>
        </form>
    )
}
