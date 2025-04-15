"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PawPrint } from "lucide-react"
import Link from "next/link"

interface AuthCheckProps {
  children: React.ReactNode
}

export function AuthCheck({ children }: AuthCheckProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      try {
        const user = localStorage.getItem("user")
        if (user) {
          const userData = JSON.parse(user)
          setIsAuthenticated(userData.isLoggedIn === true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        setIsAuthenticated(false)
        localStorage.removeItem("user")
      }
    }

    checkAuth()
  }, [])

  if (isAuthenticated === null) {
    // Loading state
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-bounce">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <PawPrint className="h-8 w-8 text-white" />
            </div>
          </div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated === false) {
    // Not authenticated
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mb-6">
          <PawPrint className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Acesso restrito</h1>
        <p className="text-muted-foreground text-center mb-6">Você precisa estar logado para acessar esta página</p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/login">Entrar</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Voltar para a página inicial</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Authenticated
  return <>{children}</>
}
