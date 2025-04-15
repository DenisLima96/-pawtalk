import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Smile } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for demonstration
const posts = [
  {
    id: 1,
    user: {
      name: "Maria Silva",
      username: "mariasilva",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    image: "/placeholder.svg?height=600&width=600",
    caption: "Meu gatinho adorável tomando sol na janela! 🐱☀️ #GatoFofo #MomentoRelax",
    likes: 124,
    comments: [
      {
        id: 1,
        user: {
          name: "João Santos",
          username: "joaosantos",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        text: "Que lindo! Qual é a raça dele?",
        timeAgo: "1h",
        likes: 3,
      },
      {
        id: 2,
        user: {
          name: "Ana Costa",
          username: "anacosta",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        text: "Adorei a foto! Meu gato também adora ficar na janela 😊",
        timeAgo: "45m",
        likes: 2,
      },
      {
        id: 3,
        user: {
          name: "Pedro Oliveira",
          username: "pedrooliveira",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        text: "Que fofura! ❤️",
        timeAgo: "20m",
        likes: 1,
      },
      {
        id: 4,
        user: {
          name: "Carla Mendes",
          username: "carlamendes",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        text: "Meu sonho ter um gatinho assim! Qual é o nome dele?",
        timeAgo: "10m",
        likes: 0,
      },
      {
        id: 5,
        user: {
          name: "Roberto Dias",
          username: "robertodias",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        text: "Essa janela parece perfeita para gatos! O meu adora ficar observando os pássaros.",
        timeAgo: "5m",
        likes: 0,
      },
    ],
    category: "gatos",
    timeAgo: "2h",
    location: "São Paulo, Brasil",
    filter: "Clarendon",
  },
]

export default function PostPage({ params }: { params: { id: string } }) {
  const postId = Number.parseInt(params.id)
  const post = posts.find((p) => p.id === postId)

  if (!post) {
    notFound()
  }

  const hashtags = post.caption.split(" ").filter((word) => word.startsWith("#"))

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="grid md:grid-cols-2">
          <div className="bg-black flex items-center justify-center">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.caption}
              width={600}
              height={600}
              className="w-full object-contain max-h-[600px]"
            />
          </div>
          <div className="flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
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
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreHorizontal className="h-5 w-5" />
                    <span className="sr-only">Mais opções</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Copiar link</DropdownMenuItem>
                  <DropdownMenuItem>Compartilhar</DropdownMenuItem>
                  <DropdownMenuItem>Incorporar</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Denunciar</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <p className="text-sm mb-2">
                  <Link href={`/profile/${post.user.username}`} className="font-medium hover:underline mr-1">
                    {post.user.name}
                  </Link>
                  <span>{post.caption}</span>
                </p>
                {hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2 mb-4">
                    {hashtags.map((hashtag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs font-normal">
                        {hashtag}
                      </Badge>
                    ))}
                  </div>
                )}
                <Separator className="my-4" />
                <h3 className="text-sm font-medium mb-4">Comentários</h3>
                <div className="space-y-4">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 group">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                        <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-muted/50 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/profile/${comment.user.username}`}
                              className="text-sm font-medium hover:underline"
                            >
                              {comment.user.name}
                            </Link>
                            <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                          </div>
                          <p className="text-sm mt-1">{comment.text}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1 pl-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                          >
                            Curtir
                            {comment.likes > 0 && <span className="ml-1">{comment.likes}</span>}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                          >
                            Responder
                          </Button>
                          <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            •
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Denunciar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t">
              <div className="flex items-center justify-between w-full p-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Heart className="w-5 h-5" />
                    <span className="sr-only">Curtir</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageCircle className="w-5 h-5" />
                    <span className="sr-only">Comentar</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="w-5 h-5" />
                    <span className="sr-only">Compartilhar</span>
                  </Button>
                </div>
                <Button variant="ghost" size="icon">
                  <Bookmark className="w-5 h-5" />
                  <span className="sr-only">Salvar</span>
                </Button>
              </div>
              <div className="px-4 pb-2">
                <p className="text-sm font-medium">{post.likes} curtidas</p>
                <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
              </div>
              <div className="p-4 border-t flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Seu avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <form className="flex-1 flex items-center gap-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Adicione um comentário..."
                      className="pr-10 h-9 bg-muted/50 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
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
                  <Button type="submit" size="sm" className="text-primary font-medium">
                    Publicar
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
