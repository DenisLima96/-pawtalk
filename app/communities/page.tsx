"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, Search, PawPrint, Cat, Dog, Bird, Rabbit, Plus, Filter } from "lucide-react"
import Link from "next/link"
import { AuthCheck } from "@/components/auth-check"

const communities = [
  {
    id: 1,
    name: "Amantes de Gatos",
    slug: "amantes-de-gatos",
    avatar: "/images/profile-cat1.png",
    members: 12543,
    category: "cats",
    description: "Comunidade para compartilhar fotos, histórias e dicas sobre gatos.",
    joined: true,
  },
  {
    id: 2,
    name: "Cachorros Felizes",
    slug: "cachorros-felizes",
    avatar: "/images/profile-dog1.png",
    members: 9876,
    category: "dogs",
    description: "Tudo sobre cuidados, treinamento e diversão com cachorros.",
    joined: true,
  },
  {
    id: 3,
    name: "Aves Exóticas",
    slug: "aves-exoticas",
    avatar: "/images/pixabay-bird1.png",
    members: 3421,
    category: "birds",
    description: "Compartilhe fotos e conhecimentos sobre aves de estimação e selvagens.",
    joined: false,
  },
  {
    id: 4,
    name: "Coelhos Adoráveis",
    slug: "coelhos-adoraveis",
    avatar: "/images/pixabay-rabbit1.png",
    members: 2156,
    category: "rabbits",
    description: "Comunidade dedicada aos amantes de coelhos.",
    joined: false,
  },
  {
    id: 5,
    name: "Adote Não Compre",
    slug: "adote-nao-compre",
    avatar: "/images/profile-dog2.png",
    members: 15789,
    category: "adoption",
    description: "Grupo dedicado à adoção responsável de animais.",
    joined: true,
  },
  {
    id: 6,
    name: "Fotografia Pet",
    slug: "fotografia-pet",
    avatar: "/images/profile-person3.png",
    members: 7654,
    category: "photography",
    description: "Dicas e compartilhamento de fotos profissionais de pets.",
    joined: false,
  },
  {
    id: 7,
    name: "Veterinários Unidos",
    slug: "veterinarios-unidos",
    avatar: "/images/profile-petshop2.png",
    members: 4321,
    category: "health",
    description: "Comunidade para profissionais e estudantes de medicina veterinária.",
    joined: false,
  },
  {
    id: 8,
    name: "Pequenos Roedores",
    slug: "pequenos-roedores",
    avatar: "/images/pixabay-hamster1.png",
    members: 1987,
    category: "rodents",
    description: "Tudo sobre hamsters, porquinhos da índia, chinchilas e outros roedores.",
    joined: false,
  },
]

export default function CommunitiesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [joinedCommunities, setJoinedCommunities] = useState<number[]>(
    communities.filter((c) => c.joined).map((c) => c.id),
  )

  const toggleJoin = (id: number) => {
    if (joinedCommunities.includes(id)) {
      setJoinedCommunities(joinedCommunities.filter((communityId) => communityId !== id))
    } else {
      setJoinedCommunities([...joinedCommunities, id])
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "cats":
        return <Cat className="h-4 w-4" />
      case "dogs":
        return <Dog className="h-4 w-4" />
      case "birds":
        return <Bird className="h-4 w-4" />
      case "rabbits":
        return <Rabbit className="h-4 w-4" />
      default:
        return <PawPrint className="h-4 w-4" />
    }
  }

  const filteredCommunities = communities.filter((community) => {
    const matchesSearch =
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "joined") return joinedCommunities.includes(community.id) && matchesSearch
    return community.category === activeTab && matchesSearch
  })

  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Comunidades</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Criar comunidade
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar comunidades"
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Card>
              <CardHeader className="py-4 px-4">
                <CardTitle className="text-base">Categorias</CardTitle>
              </CardHeader>
              <CardContent className="px-2 py-0">
                <div className="space-y-1">
                  <Button
                    variant={activeTab === "all" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("all")}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Todas
                  </Button>
                  <Button
                    variant={activeTab === "joined" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("joined")}
                  >
                    <PawPrint className="mr-2 h-4 w-4" />
                    Minhas comunidades
                  </Button>
                  <Button
                    variant={activeTab === "cats" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("cats")}
                  >
                    <Cat className="mr-2 h-4 w-4" />
                    Gatos
                  </Button>
                  <Button
                    variant={activeTab === "dogs" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("dogs")}
                  >
                    <Dog className="mr-2 h-4 w-4" />
                    Cachorros
                  </Button>
                  <Button
                    variant={activeTab === "birds" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("birds")}
                  >
                    <Bird className="mr-2 h-4 w-4" />
                    Aves
                  </Button>
                  <Button
                    variant={activeTab === "rabbits" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("rabbits")}
                  >
                    <Rabbit className="mr-2 h-4 w-4" />
                    Coelhos
                  </Button>
                  <Button
                    variant={activeTab === "adoption" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("adoption")}
                  >
                    <PawPrint className="mr-2 h-4 w-4" />
                    Adoção
                  </Button>
                  <Button
                    variant={activeTab === "health" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("health")}
                  >
                    <PawPrint className="mr-2 h-4 w-4" />
                    Saúde Pet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {activeTab === "all"
                  ? "Todas as comunidades"
                  : activeTab === "joined"
                    ? "Minhas comunidades"
                    : `Comunidades de ${
                        activeTab === "cats"
                          ? "gatos"
                          : activeTab === "dogs"
                            ? "cachorros"
                            : activeTab === "birds"
                              ? "aves"
                              : activeTab === "rabbits"
                                ? "coelhos"
                                : activeTab === "adoption"
                                  ? "adoção"
                                  : activeTab === "health"
                                    ? "saúde pet"
                                    : activeTab
                      }`}
              </h2>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </div>

            {filteredCommunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCommunities.map((community) => (
                  <Card key={community.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={community.avatar || "/placeholder.svg"} alt={community.name} />
                          <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">
                            <Link href={`/communities/${community.slug}`} className="hover:underline">
                              {community.name}
                            </Link>
                          </CardTitle>
                          <CardDescription>{community.members.toLocaleString()} membros</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">{community.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getCategoryIcon(community.category)}
                          <span className="capitalize">{community.category}</span>
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={joinedCommunities.includes(community.id) ? "outline" : "default"}
                        className="w-full"
                        onClick={() => toggleJoin(community.id)}
                      >
                        {joinedCommunities.includes(community.id) ? "Participando" : "Participar"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhuma comunidade encontrada</h3>
                <p className="text-muted-foreground mb-6">Não encontramos comunidades com os critérios selecionados</p>
                <Button
                  onClick={() => {
                    setActiveTab("all")
                    setSearchTerm("")
                  }}
                >
                  Ver todas as comunidades
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthCheck>
  )
}
