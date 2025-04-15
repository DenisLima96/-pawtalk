"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { PawPrint, Store } from "lucide-react"

const suggestedUsers = [
  {
    id: 1,
    name: "Carlos Mendes",
    username: "carlosmendes",
    avatar: "/images/profile-person2.png",
    bio: "Veterinário e amante de cães 🐕",
    verified: true,
    type: "person",
  },
  {
    id: 2,
    name: "Fernanda Lima",
    username: "fernandalima",
    avatar: "/images/profile-person3.png",
    bio: "Fotógrafa de pets 📸 🐱",
    verified: false,
    type: "person",
  },
  {
    id: 3,
    name: "PetShop Feliz",
    username: "petshopfeliz",
    avatar: "/images/profile-petshop1.png",
    bio: "Tudo para seu pet! 🐾",
    verified: true,
    type: "business",
  },
  {
    id: 4,
    name: "Max",
    username: "maxthedog",
    avatar: "/images/profile-dog1.png",
    bio: "Woof! Adoro brincar no parque 🐶",
    verified: false,
    type: "pet",
    owner: "@mariasantos",
  },
  {
    id: 5,
    name: "Luna",
    username: "lunathekitty",
    avatar: "/images/profile-cat1.png",
    bio: "Miau! Especialista em sonecas 😺",
    verified: false,
    type: "pet",
    owner: "@joaopereira",
  },
  {
    id: 6,
    name: "Clínica VetAmigo",
    username: "vetamigo",
    avatar: "/images/profile-petshop2.png",
    bio: "Cuidando do seu pet com amor ❤️",
    verified: true,
    type: "business",
  },
]

export function WhoToFollow() {
  const [following, setFollowing] = useState<number[]>([])
  const [showAll, setShowAll] = useState(false)

  const toggleFollow = (userId: number) => {
    setFollowing((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const displayUsers = showAll ? suggestedUsers : suggestedUsers.slice(0, 3)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Quem seguir</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {displayUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <Link href={`/profile/${user.username}`} className="text-sm font-medium hover:underline">
                    {user.name}
                  </Link>
                  {user.verified && (
                    <span className="inline-flex items-center justify-center w-4 h-4 bg-primary rounded-full">
                      <span className="sr-only">Verificado</span>
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                      </svg>
                    </span>
                  )}
                  {user.type === "pet" && (
                    <Badge variant="outline" className="ml-1 text-xs py-0 h-5">
                      <PawPrint className="h-3 w-3 mr-1" />
                      Pet
                    </Badge>
                  )}
                  {user.type === "business" && (
                    <Badge variant="outline" className="ml-1 text-xs py-0 h-5">
                      <Store className="h-3 w-3 mr-1" />
                      Empresa
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">@{user.username}</p>
                <p className="text-xs mt-1">{user.bio}</p>
                {user.type === "pet" && user.owner && (
                  <p className="text-xs text-muted-foreground">Dono: {user.owner}</p>
                )}
              </div>
            </div>
            <Button
              variant={following.includes(user.id) ? "outline" : "default"}
              size="sm"
              className={
                following.includes(user.id)
                  ? ""
                  : "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
              }
              onClick={() => toggleFollow(user.id)}
            >
              {following.includes(user.id) ? "Seguindo" : "Seguir"}
            </Button>
          </div>
        ))}
        <Button variant="ghost" size="sm" className="w-full mt-2" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Mostrar menos" : "Ver mais"}
        </Button>
      </CardContent>
    </Card>
  )
}
