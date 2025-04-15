"use client"

import type React from "react"

import { useState, useTransition } from "react"
import Image from "next/image"
import Link from "next/link"
import { PawPrint, Zap, Bookmark, MoreHorizontal, Smile, MessageCircle, Share, Store } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { AnimatePresence, motion } from "framer-motion"

const posts = [
  {
    id: 1,
    type: "photo",
    user: {
      name: "Maria Silva",
      username: "mariasilva",
      avatar: "/images/profile-person3.png",
      verified: true,
    },
    image: "/images/pixabay-cat1.png",
    content: "Meu gatinho adorável tomando sol na janela! 🐱☀️ #GatoFofo #MomentoRelax",
    likes: 124,
    comments: 23,
    repawsts: 12,
    timeAgo: "2h",
    location: "São Paulo, Brasil",
  },
  {
    id: 2,
    type: "text",
    user: {
      name: "João Santos",
      username: "joaosantos",
      avatar: "/images/profile-person2.png",
      verified: false,
    },
    content:
      "Vocês sabiam que os cachorros podem entender até 250 palavras e gestos? Meu labrador parece entender tudo que eu falo! 🐕 #DogFacts #PetInteligente",
    likes: 89,
    comments: 42,
    repawsts: 31,
    timeAgo: "3h",
  },
  {
    id: 3,
    type: "photo",
    user: {
      name: "Rex",
      username: "rexthedog",
      avatar: "/images/profile-dog2.png",
      verified: true,
      isPet: true,
      owner: "Ana Costa",
    },
    image: "/images/pixabay-dog1.png",
    content: "Woof woof! Dia de brincadeira no parque! 🐶 #DogLife #ParkDay",
    likes: 156,
    comments: 28,
    repawsts: 45,
    timeAgo: "4h",
    location: "Parque Canino",
  },
  {
    id: 4,
    type: "text",
    user: {
      name: "PetShop Feliz",
      username: "petshopfeliz",
      avatar: "/images/profile-petshop1.png",
      verified: true,
      isBusiness: true,
    },
    content:
      "Dica para donos de gatos: escovar seu gato regularmente não só reduz a queda de pelos, mas também fortalece o vínculo entre vocês. Venha conhecer nossas escovas especiais! 🐱 #DicasPet #CuidadosComGatos",
    likes: 72,
    comments: 15,
    repawsts: 28,
    timeAgo: "5h",
  },
  {
    id: 5,
    type: "photo",
    user: {
      name: "Mia",
      username: "miathekitty",
      avatar: "/images/profile-cat2.png",
      verified: false,
      isPet: true,
      owner: "Pedro Oliveira",
    },
    image: "/images/pixabay-cat1.png",
    content: "Miau! Hora da soneca depois de brincar muito! 😺 #CatNap #LazyDay",
    likes: 112,
    comments: 19,
    repawsts: 33,
    timeAgo: "6h",
    location: "Casa Aconchegante",
  },
  {
    id: 6,
    type: "repawst",
    originalUser: {
      name: "Clínica Veterinária VetAmigo",
      username: "vetamigo",
      avatar: "/images/profile-petshop2.png",
      verified: true,
      isBusiness: true,
    },
    user: {
      name: "Carla Mendes",
      username: "carlamendes",
      avatar: "/images/profile-person4.png",
      verified: false,
    },
    content:
      "Importante: Chocolate é tóxico para cães e gatos! Mesmo em pequenas quantidades pode causar problemas sérios. Mantenha doces longe do alcance dos seus pets. #SegurançaPet #CuidadosVeterinários",
    likes: 215,
    comments: 47,
    repawsts: 183,
    timeAgo: "1d",
  },
]

export function MainFeed() {
  const [activeTab, setActiveTab] = useState("para-voce")
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [repawstedPosts, setRepawstedPosts] = useState<number[]>([])
  const [savedPosts, setSavedPosts] = useState<number[]>([])
  const [isPending, startTransition] = useTransition()
  const [newPost, setNewPost] = useState("")

  const handleLike = (postId: number) => {
    startTransition(() => {
      if (likedPosts.includes(postId)) {
        setLikedPosts(likedPosts.filter((id) => id !== postId))
      } else {
        setLikedPosts([...likedPosts, postId])
      }
    })
  }

  const handleRepawst = (postId: number) => {
    startTransition(() => {
      if (repawstedPosts.includes(postId)) {
        setRepawstedPosts(repawstedPosts.filter((id) => id !== postId))
      } else {
        setRepawstedPosts([...repawstedPosts, postId])
      }
    })
  }

  const handleSave = (postId: number) => {
    startTransition(() => {
      if (savedPosts.includes(postId)) {
        setSavedPosts(savedPosts.filter((id) => id !== postId))
      } else {
        setSavedPosts([...savedPosts, postId])
      }
    })
  }

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.trim()) {
      setNewPost("")
    }
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <form onSubmit={handleSubmitPost}>
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src="/images/profile-person1.png" alt="Seu avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea
                  placeholder="O que está acontecendo no mundo pet?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="resize-none min-h-[80px]"
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button type="button" variant="ghost" size="sm" className="text-primary">
                      <PawPrint className="h-4 w-4 mr-1" />
                      Foto
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="text-primary">
                      <Smile className="h-4 w-4 mr-1" />
                      Emoji
                    </Button>
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
                    disabled={!newPost.trim()}
                  >
                    Publicar
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Tabs defaultValue="para-voce" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="para-voce">Para você</TabsTrigger>
          <TabsTrigger value="seguindo">Seguindo</TabsTrigger>
        </TabsList>
        <TabsContent value="para-voce" className="mt-6 space-y-6">
          <AnimatePresence>
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <PostCard
                  post={post}
                  isLiked={likedPosts.includes(post.id)}
                  isRepawsted={repawstedPosts.includes(post.id)}
                  isSaved={savedPosts.includes(post.id)}
                  onLike={handleLike}
                  onRepawst={handleRepawst}
                  onSave={handleSave}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </TabsContent>
        <TabsContent value="seguindo" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <PawPrint className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">Nenhuma publicação ainda</h3>
            <p className="text-muted-foreground mb-4">Comece a seguir pessoas para ver suas publicações aqui.</p>
            <Button>Explorar perfis</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface PostCardProps {
  post: (typeof posts)[0]
  isLiked: boolean
  isRepawsted: boolean
  isSaved: boolean
  onLike: (postId: number) => void
  onRepawst: (postId: number) => void
  onSave: (postId: number) => void
}

function PostCard({ post, isLiked, isRepawsted, isSaved, onLike, onRepawst, onSave }: PostCardProps) {
  const [comment, setComment] = useState("")

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (comment.trim()) {
      setComment("")
    }
  }

  return (
    <Card className="overflow-hidden border-none shadow-sm">
      <CardHeader className="p-4 flex flex-row items-center space-y-0">
        {post.type === "repawst" && (
          <div className="absolute -top-3 left-8 bg-background px-2 text-xs text-muted-foreground flex items-center gap-1">
            <Zap className="h-3 w-3" />
            <span>{post.user.name} repawstou</span>
          </div>
        )}
        <div className="flex items-center gap-3 flex-1">
          <Avatar className="border-2 border-primary/20">
            <AvatarImage
              src={(post.type === "repawst" ? post.originalUser.avatar : post.user.avatar) || "/placeholder.svg"}
              alt={post.type === "repawst" ? post.originalUser.name : post.user.name}
            />
            <AvatarFallback>
              {(post.type === "repawst" ? post.originalUser.name : post.user.name).charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <Link
                href={`/profile/${post.type === "repawst" ? post.originalUser.username : post.user.username}`}
                className="font-medium hover:underline"
              >
                {post.type === "repawst" ? post.originalUser.name : post.user.name}
              </Link>
              {(post.type === "repawst" ? post.originalUser.verified : post.user.verified) && (
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
              {post.user.isPet && (
                <Badge variant="outline" className="ml-1 text-xs py-0 h-5">
                  <PawPrint className="h-3 w-3 mr-1" />
                  Pet
                </Badge>
              )}
              {post.user.isBusiness && (
                <Badge variant="outline" className="ml-1 text-xs py-0 h-5">
                  <Store className="h-3 w-3 mr-1" />
                  Empresa
                </Badge>
              )}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>@{post.type === "repawst" ? post.originalUser.username : post.user.username}</span>
              <span className="mx-1">•</span>
              <span>{post.timeAgo}</span>
              {post.location && (
                <>
                  <span className="mx-1">•</span>
                  <span>{post.location}</span>
                </>
              )}
            </div>
            {post.user.isPet && post.user.owner && (
              <div className="text-xs text-muted-foreground">Dono: {post.user.owner}</div>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreHorizontal className="h-5 w-5" />
              <span className="sr-only">Mais opções</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Denunciar</DropdownMenuItem>
            <DropdownMenuItem>Copiar link</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Não tenho interesse</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm whitespace-pre-line mb-3">{post.content}</p>
        {post.content.includes("#") && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.content
              .split(" ")
              .filter((word) => word.startsWith("#"))
              .map((hashtag, index) => (
                <Badge key={index} variant="secondary" className="text-xs font-normal">
                  {hashtag}
                </Badge>
              ))}
          </div>
        )}
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
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 pt-0 gap-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onLike(post.id)}
              className={isLiked ? "text-emerald-500" : ""}
            >
              <PawPrint className={isLiked ? "fill-emerald-500" : ""} size={20} />
              <span className="sr-only">Curtir</span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle size={20} />
              <span className="sr-only">Comentar</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRepawst(post.id)}
              className={isRepawsted ? "text-cyan-500" : ""}
            >
              <Zap className={isRepawsted ? "fill-cyan-500" : ""} size={20} />
              <span className="sr-only">Repawst</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Share size={20} />
              <span className="sr-only">Compartilhar</span>
            </Button>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onSave(post.id)}>
            <Bookmark className={isSaved ? "fill-current" : ""} size={20} />
            <span className="sr-only">Salvar</span>
          </Button>
        </div>
        <div className="w-full">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href={`/post/${post.id}/likes`} className="hover:underline">
              <span className="font-medium text-foreground">{isLiked ? post.likes + 1 : post.likes}</span> curtidas
            </Link>
            <Link href={`/post/${post.id}`} className="hover:underline">
              <span className="font-medium text-foreground">{post.comments}</span> comentários
            </Link>
            <Link href={`/post/${post.id}/repawsts`} className="hover:underline">
              <span className="font-medium text-foreground">{isRepawsted ? post.repawsts + 1 : post.repawsts}</span>{" "}
              repawsts
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmitComment} className="flex items-center w-full gap-2 mt-1">
          <Avatar className="w-7 h-7">
            <AvatarImage src="/images/profile-person1.png" alt="Seu avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="relative flex-1">
            <Input
              placeholder="Adicione um comentário..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="pr-10 h-9 bg-muted/50"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9 text-muted-foreground"
            >
              <Smile className="h-4 w-4" />
              <span className="sr-only">Emojis</span>
            </Button>
          </div>
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="text-primary font-medium"
            disabled={!comment.trim()}
          >
            Publicar
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
