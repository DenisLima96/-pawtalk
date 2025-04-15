"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bookmark, PawPrint, MessageCircle, Heart, Zap, MoreHorizontal, Grid, List, Filter, Store } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AuthCheck } from "@/components/auth-check"

const savedPosts = [
  {
    id: 1,
    type: "photo",
    user: {
      name: "Maria Silva",
      username: "mariasilva",
      avatar: "/images/profile-person3.png",
      verified: true,
      type: "person",
    },
    image: "/images/pixabay-cat1.png",
    content: "Meu gatinho adorável tomando sol na janela! 🐱☀️ #GatoFofo #MomentoRelax",
    likes: 124,
    comments: 23,
    repawsts: 12,
    timeAgo: "2h",
    location: "São Paulo, Brasil",
    savedAt: "Hoje",
    category: "cats",
  },
  {
    id: 2,
    type: "text",
    user: {
      name: "PetShop Feliz",
      username: "petshopfeliz",
      avatar: "/images/profile-petshop1.png",
      verified: true,
      type: "business",
    },
    content:
      "Dica para donos de gatos: escovar seu gato regularmente não só reduz a queda de pelos, mas também fortalece o vínculo entre vocês. Venha conhecer nossas escovas especiais! 🐱 #DicasPet #CuidadosComGatos",
    likes: 72,
    comments: 15,
    repawsts: 28,
    timeAgo: "5h",
    savedAt: "Hoje",
    category: "tips",
  },
  {
    id: 3,
    type: "photo",
    user: {
      name: "Rex",
      username: "rexthedog",
      avatar: "/images/profile-dog2.png",
      verified: true,
      type: "pet",
      owner: "Ana Costa",
    },
    image: "/images/pixabay-dog1.png",
    content: "Woof woof! Dia de brincadeira no parque! 🐶 #DogLife #ParkDay",
    likes: 156,
    comments: 28,
    repawsts: 45,
    timeAgo: "1d",
    location: "Parque Canino",
    savedAt: "Ontem",
    category: "dogs",
  },
  {
    id: 4,
    type: "photo",
    user: {
      name: "Clínica Veterinária VetAmigo",
      username: "vetamigo",
      avatar: "/images/profile-petshop2.png",
      verified: true,
      type: "business",
    },
    image: "/images/pixabay-bird1.png",
    content:
      "Sabia que as aves precisam de check-ups regulares também? Traga seu amigo emplumado para uma consulta preventiva! 🦜 #SaúdeAves #VeterinárioAves",
    likes: 89,
    comments: 12,
    repawsts: 34,
    timeAgo: "2d",
    savedAt: "Esta semana",
    category: "birds",
  },
  {
    id: 5,
    type: "photo",
    user: {
      name: "João Santos",
      username: "joaosantos",
      avatar: "/images/profile-person2.png",
      verified: false,
      type: "person",
    },
    image: "/images/pixabay-rabbit1.png",
    content: "Meu novo amiguinho! Alguém tem dicas para cuidar de coelhos? 🐰 #NovoCoelho #PrimeiroPet",
    likes: 112,
    comments: 45,
    repawsts: 8,
    timeAgo: "3d",
    savedAt: "Esta semana",
    category: "rabbits",
  },
  {
    id: 6,
    type: "text",
    user: {
      name: "Mia",
      username: "miathekitty",
      avatar: "/images/profile-cat2.png",
      verified: false,
      type: "pet",
      owner: "Pedro Oliveira",
    },
    content:
      "Miau! Meu humano comprou um novo arranhador e eu estou adorando! Quem mais ama arranhar móveis novos? 😺 #VidaDeGato #Arranhador",
    likes: 78,
    comments: 23,
    repawsts: 15,
    timeAgo: "1w",
    savedAt: "Este mês",
    category: "cats",
  },
]

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [savedItems, setSavedItems] = useState<number[]>(savedPosts.map((post) => post.id))

  const unsaveItem = (id: number) => {
    setSavedItems(savedItems.filter((itemId) => itemId !== id))
  }

  const filteredPosts = savedPosts.filter((post) => {
    if (!savedItems.includes(post.id)) return false
    if (activeTab === "all") return true
    return post.category === activeTab
  })

  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Itens Salvos</h1>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="cats">Gatos</TabsTrigger>
              <TabsTrigger value="dogs">Cachorros</TabsTrigger>
              <TabsTrigger value="birds">Aves</TabsTrigger>
              <TabsTrigger value="rabbits">Coelhos</TabsTrigger>
              <TabsTrigger value="tips">Dicas</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
          </div>

          <TabsContent value={activeTab}>
            {filteredPosts.length > 0 ? (
              viewMode === "list" ? (
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      <CardHeader className="p-4 flex flex-row items-center space-y-0">
                        <div className="flex items-center gap-3 flex-1">
                          <Avatar className="border-2 border-primary/20">
                            <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-1">
                              <Link href={`/profile/${post.user.username}`} className="font-medium hover:underline">
                                {post.user.name}
                              </Link>
                              {post.user.verified && (
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
                              {post.user.type === "pet" && (
                                <Badge variant="outline" className="ml-1 text-xs py-0 h-5">
                                  <PawPrint className="h-3 w-3 mr-1" />
                                  Pet
                                </Badge>
                              )}
                              {post.user.type === "business" && (
                                <Badge variant="outline" className="ml-1 text-xs py-0 h-5">
                                  <Store className="h-3 w-3 mr-1" />
                                  Empresa
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span>@{post.user.username}</span>
                              <span className="mx-1">•</span>
                              <span>{post.timeAgo}</span>
                              {post.location && (
                                <>
                                  <span className="mx-1">•</span>
                                  <span>{post.location}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            Salvo {post.savedAt}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="rounded-full">
                                <MoreHorizontal className="h-5 w-5" />
                                <span className="sr-only">Mais opções</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => unsaveItem(post.id)}>
                                Remover dos salvos
                              </DropdownMenuItem>
                              <DropdownMenuItem>Copiar link</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Denunciar</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm whitespace-pre-line mb-3">{post.content}</p>
                        {post.type === "photo" && post.image && (
                          <div className="relative rounded-lg overflow-hidden mt-2">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.content}
                              width={600}
                              height={600}
                              className="w-full object-cover rounded-lg"
                            />
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              {post.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              {post.comments}
                            </span>
                            <span className="flex items-center gap-1">
                              <Zap className="h-4 w-4" />
                              {post.repawsts}
                            </span>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/post/${post.id}`}>Ver post</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredPosts.map((post) =>
                    post.type === "photo" ? (
                      <Card key={post.id} className="overflow-hidden">
                        <div className="aspect-square relative">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.content}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                            <div className="flex items-center gap-2 text-white">
                              <Avatar className="h-6 w-6 border border-white">
                                <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{post.user.name}</span>
                            </div>
                            <p className="text-xs text-white mt-1 line-clamp-2">{post.content}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-black/30 text-white hover:bg-black/50"
                            onClick={() => unsaveItem(post.id)}
                          >
                            <Bookmark className="h-4 w-4 fill-white" />
                          </Button>
                        </div>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                {post.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="h-3 w-3" />
                                {post.comments}
                              </span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {post.savedAt}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card key={post.id} className="overflow-hidden">
                        <CardHeader className="p-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-sm">{post.user.name}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <p className="text-xs line-clamp-4">{post.content}</p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                {post.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="h-3 w-3" />
                                {post.comments}
                              </span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => unsaveItem(post.id)}>
                              <Bookmark className="h-4 w-4 fill-current" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ),
                  )}
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum item salvo</h3>
                <p className="text-muted-foreground mb-6">Você ainda não salvou nenhum item nesta categoria</p>
                <Button asChild>
                  <Link href="/explore">Explorar conteúdo</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AuthCheck>
  )
}
