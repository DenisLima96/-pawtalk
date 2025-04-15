"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulação de login - em um app real, isso seria uma chamada API
      if (email && password) {
        // Armazenar informações do usuário no localStorage para simular autenticação
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: "Ana Silva",
            email,
            isLoggedIn: true,
          }),
        )

        setTimeout(() => {
          setIsLoading(false)
          toast({
            title: "Login realizado com sucesso",
            description: "Bem-vindo(a) de volta ao PawTalk!",
          })
          router.push("/feed")
        }, 1000)
      } else {
        throw new Error("Por favor, preencha todos os campos")
      }
    } catch (error) {
      setIsLoading(false)
      toast({
        title: "Erro ao fazer login",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao fazer login",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
          <CardDescription>Entre com seu email e senha para acessar sua conta</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link href="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-primary underline-offset-4 hover:underline">
                Registre-se
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
