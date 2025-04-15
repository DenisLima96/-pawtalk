"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { PawPrint, MessageCircle, Zap, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

// Imagens do Pixabay
const pixabayImages = [
  {
    id: 1,
    src: "/images/pixabay-dog1.png",
    alt: "Filhote de cachorro fofo",
    category: "dogs",
    likes: 245,
    comments: 32,
    repawsts: 87,
    user: "dogLover22",
    caption: "Esse filhotinho acabou de chegar em casa! 🐶 #FilhoteFofo #AdoteNãoCompre",
  },
  {
    id: 2,
    src: "/images/pixabay-cat1.png",
    alt: "Gato laranja olhando para cima",
    category: "cats",
    likes: 189,
    comments: 27,
    repawsts: 54,
    user: "catPerson",
    caption: "Meu gato sempre com essa cara de curioso! 😺 #GatoLaranja #CatLife",
  },
  {
    id: 3,
    src: "/images/pixabay-bird1.png",
    alt: "Pássaro martim-pescador colorido",
    category: "birds",
    likes: 312,
    comments: 41,
    repawsts: 98,
    user: "birdWatcher",
    caption: "Martim-pescador em ação! As cores desse pássaro são incríveis 🐦 #PassarinhoColorido #Natureza",
  },
  {
    id: 4,
    src: "/images/pixabay-rabbit1.png",
    alt: "Coelho fofo",
    category: "rabbits",
    likes: 176,
    comments: 23,
    repawsts: 45,
    user: "bunnyLover",
    caption: "Meu coelhinho aproveitando o dia! 🐰 #CoelhinhoFofo #PetExótico",
  },
  {
    id: 5,
    src: "/images/pixabay-hamster1.png",
    alt: "Hamster com patinhas para cima",
    category: "rodents",
    likes: 203,
    comments: 29,
    repawsts: 67,
    user: "smallPets",
    caption: "Mãozinhas para cima! 🐹 #HamsterFofo #PequenoPet",
  },
  {
    id: 6,
    src: "/images/chihuahua.png",
    alt: "Chihuahua sorridente",
    category: "dogs",
    likes: 267,
    comments: 38,
    repawsts: 76,
    user: "chihuahualover",
    caption: "Chihuahuas são a menor raça de cães do mundo, mas têm personalidade gigante! 🐕 #Chihuahua #SmallDog",
  },
  {
    id: 7,
    src: "/images/tabby-cat.png",
    alt: "Gato tabby deitado",
    category: "cats",
    likes: 231,
    comments: 34,
    repawsts: 65,
    user: "tabbyFan",
    caption: "Momento de relaxamento do meu tabby! 😺 #GatoTabby #CatNap",
  },
  {
    id: 8,
    src: "/images/gray-kitten.png",
    alt: "Gatinho cinza espiando",
    category: "cats",
    likes: 289,
    comments: 42,
    repawsts: 91,
    user: "kittenLover",
    caption: "Quem consegue resistir a esse olhar? 👀 #FilhoteDeGato #GatinhoCinza",
  },
]

export function ExploreGallery() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredImages = pixabayImages.filter((image) => {
    const matchesCategory = activeCategory === "all" || image.category === activeCategory
    const matchesSearch =
      image.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.user.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCategory && (searchTerm === "" || matchesSearch)
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por legenda ou usuário"
            className="pl-9 pr-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="flex w-full overflow-x-auto pb-2 scrollbar-hide justify-start">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="dogs">Cachorros</TabsTrigger>
          <TabsTrigger value="cats">Gatos</TabsTrigger>
          <TabsTrigger value="birds">Aves</TabsTrigger>
          <TabsTrigger value="rabbits">Coelhos</TabsTrigger>
          <TabsTrigger value="rodents">Roedores</TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory} className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.length > 0 ? (
              filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden rounded-lg"
                >
                  <Link href={`/post/${image.id}`}>
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover transition-all group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div className="w-full">
                        <p className="text-white text-sm mb-2 line-clamp-2">{image.caption}</p>
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center gap-1">
                            <PawPrint className="h-4 w-4" />
                            <span className="text-sm">{image.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-sm">{image.comments}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Zap className="h-4 w-4" />
                            <span className="text-sm">{image.repawsts}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-muted-foreground">Nenhuma imagem encontrada para esta pesquisa.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-center text-xs text-muted-foreground mt-8">
        <p>Imagens obtidas do Pixabay - Banco de imagens gratuitas e livres de royalties</p>
        <p>Todas as imagens estão licenciadas sob a licença Pixabay, livres para uso comercial e não comercial</p>
      </div>
    </div>
  )
}
