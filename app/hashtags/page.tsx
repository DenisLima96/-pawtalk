"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Hash, Search, TrendingUp, Bookmark, Clock, PawPrint, Cat, Dog, Bird } from "lucide-react"
import Link from "next/link"
import { AuthCheck } from "@/components/auth-check"

const trendingHashtags = [
  {
    id: 1,
    name: "#AdoteNãoCompre",
    posts: 12543,
    category: "adoption",
    trending: true,
    saved: true,
  },
  {
    id: 2,
    name: "#CachorroFofo",
    posts: 9876,
    category: "dogs",
    trending: true,
    saved: false,
  },
  {
    id: 3,
    name: "#GatosDormindo",
    posts: 8765,
    category: "cats",
    trending: true,
    saved: true,
  },
  {
    id: 4,
    name: "#DicasDeCuidados",
    posts: 7654,
    category: "health",
    trending: true,
    saved: false,
  },
  {
    id: 5,
    name: "#PetsDoDia",
    posts: 6543,
    category: "general",
    trending: true,
    saved: false,
  },
  {
    id: 6,
    name: "#PassarinhoColorido",
    posts: 5432,
    category: "birds",
    trending: false,
    saved: true,
  },
  {
    id: 7,
    name: "#CoelhinhoFofo",
    posts: 4321,
    category: "rabbits",
    trending: false,
    saved: false,
  },
  {
    id: 8,
    name: "#PetShopPromoção",
    posts: 3210,
    category: "shopping",
    trending: false,
    saved: true,
  },
  {
    id: 9,
    name: "#AdestrarCachorros",
    posts: 2109,
    category: "dogs",
    trending: false,
    saved: false,
  },
  {
    id: 10,
    name: "#GatosEngraçados",
    posts: 1987,
    category: "cats",
    trending: false,
    saved: false,
  },
  {
    id: 11,
    name: "#VeterinárioEmCasa",
    posts: 1876,
    category: "health",
    trending: false,
    saved: false,
  },
  {
    id: 12,
    name: "#AvesDomésticas",
    posts: 1765,
    category: "birds",
    trending: false,
    saved: false,
  },
]

export default function HashtagsPage() {
  const [activeTab, setActiveTab] = useState("trending")
  const [searchTerm, setSearchTerm] = useState("")
  const [savedHashtags, setSavedHashtags] = useState<number[]>(trendingHashtags.filter((h) => h.saved).map((h) => h.id))

  const toggleSave = (id: number) => {
    if (savedHashtags.includes(id)) {
      setSavedHashtags(savedHashtags.filter((hashtagId) => hashtagId !== id))
    } else {
      setSavedHashtags([...savedHashtags, id])
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
      default:
        return <PawPrint className="h-4 w-4" />
    }
  }

  const filteredHashtags = trendingHashtags.filter((hashtag) => {
    const matchesSearch = hashtag.name.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "trending") return hashtag.trending && matchesSearch
    if (activeTab === "saved") return savedHashtags.includes(hashtag.id) && matchesSearch
    if (activeTab === "all") return matchesSearch
    return hashtag.category === activeTab && matchesSearch
  })

  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Hashtags</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar hashtags"
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Card>
              <CardHeader className="py-4 px-4">
                <CardTitle className="text-base">Filtros</CardTitle>
              </CardHeader>
              <CardContent className="px-2 py-0">
                <div className="space-y-1">
                  <Button
                    variant={activeTab === "trending" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("trending")}
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Em alta
                  </Button>
                  <Button
                    variant={activeTab === "saved" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("saved")}
                  >
                    <Bookmark className="mr-2 h-4 w-4" />
                    Salvos
                  </Button>
                  <Button
                    variant={activeTab === "all" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("all")}
                  >
                    <Hash className="mr-2 h-4 w-4" />
                    Todos
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
                    variant={activeTab === "health" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("health")}
                  >
                    <PawPrint className="mr-2 h-4 w-4" />
                    Saúde
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {activeTab === "trending"
                  ? "Hashtags em alta"
                  : activeTab === "saved"
                    ? "Hashtags salvos"
                    : activeTab === "all"
                      ? "Todas as hashtags"
                      : `Hashtags de ${
                          activeTab === "cats"
                            ? "gatos"
                            : activeTab === "dogs"
                              ? "cachorros"
                              : activeTab === "birds"
                                ? "aves"
                                : activeTab === "health"
                                  ? "saúde"
                                  : activeTab
                        }`}
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  Recentes
                </Button>
                <Button variant="outline" size="sm">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Populares
                </Button>
              </div>
            </div>

            {filteredHashtags.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredHashtags.map((hashtag) => (
                  <Card key={hashtag.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Link href={`/hashtag/${hashtag.name.substring(1)}`}>
                          <CardTitle className="text-lg hover:underline">{hashtag.name}</CardTitle>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleSave(hashtag.id)}
                          className={savedHashtags.includes(hashtag.id) ? "text-primary" : ""}
                        >
                          <Bookmark className={savedHashtags.includes(hashtag.id) ? "fill-primary" : ""} />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getCategoryIcon(hashtag.category)}
                            <span className="capitalize">{hashtag.category}</span>
                          </Badge>
                          {hashtag.trending && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              Em alta
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{hashtag.posts.toLocaleString()} posts</span>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" className="w-full" asChild>
                          <Link href={`/hashtag/${hashtag.name.substring(1)}`}>Ver publicações</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Hash className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhuma hashtag encontrada</h3>
                <p className="text-muted-foreground mb-6">Não encontramos hashtags com os critérios selecionados</p>
                <Button
                  onClick={() => {
                    setActiveTab("all")
                    setSearchTerm("")
                  }}
                >
                  Ver todas as hashtags
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthCheck>
  )
}
