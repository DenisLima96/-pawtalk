"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

// Sample data for demonstration
const suggestedUsers = [
  {
    id: 1,
    name: "Carlos Mendes",
    username: "carlosmendes",
    avatar: "/placeholder.svg?height=40&width=40",
    reason: "Seguido por mariasilva e mais 3",
  },
  {
    id: 2,
    name: "Fernanda Lima",
    username: "fernandalima",
    avatar: "/placeholder.svg?height=40&width=40",
    reason: "Novo no PetPics",
  },
  {
    id: 3,
    name: "Roberto Dias",
    username: "robertodias",
    avatar: "/placeholder.svg?height=40&width=40",
    reason: "Seguido por joaosantos",
  },
  {
    id: 4,
    name: "Juliana Alves",
    username: "julianaalves",
    avatar: "/placeholder.svg?height=40&width=40",
    reason: "Sugerido para você",
  },
]

export function SuggestedUsers() {
  const [following, setFollowing] = useState<number[]>([])

  const toggleFollow = (userId: number) => {
    setFollowing((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Sugestões para você</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <Link href={`/profile/${user.username}`} className="text-sm font-medium hover:underline">
                  {user.name}
                </Link>
                <p className="text-xs text-muted-foreground">{user.reason}</p>
              </div>
            </div>
            <Button
              variant={following.includes(user.id) ? "ghost" : "link"}
              size="sm"
              className={following.includes(user.id) ? "text-muted-foreground" : "text-primary"}
              onClick={() => toggleFollow(user.id)}
            >
              {following.includes(user.id) ? "Seguindo" : "Seguir"}
            </Button>
          </div>
        ))}
        <Button variant="ghost" size="sm" className="w-full mt-2">
          Ver mais
        </Button>
      </CardContent>
    </Card>
  )
}
