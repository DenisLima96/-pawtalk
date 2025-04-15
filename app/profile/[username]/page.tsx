import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Grid, Settings, MessageCircle, Bookmark, Award, Layout, Lock, Heart } from "lucide-react"

// Sample data for demonstration
const user = {
  name: "Maria Silva",
  username: "mariasilva",
  avatar: "/placeholder.svg?height=100&width=100",
  bio: "Amante de animais 🐱🐶 | Fotógrafa amadora | São Paulo, SP",
  website: "www.mariasilva.com",
  posts: 24,
  followers: 348,
  following: 215,
  verified: true,
  badges: ["Fotógrafo Destaque", "Amante de Gatos", "Contribuidor Ativo"],
}

const posts = [
  {
    id: 1,
    image: "/placeholder.svg?height=300&width=300",
    likes: 124,
    comments: 23,
  },
  {
    id: 2,
    image: "/placeholder.svg?height=300&width=300",
    likes: 89,
    comments: 12,
  },
  {
    id: 3,
    image: "/placeholder.svg?height=300&width=300",
    likes: 56,
    comments: 8,
  },
  {
    id: 4,
    image: "/placeholder.svg?height=300&width=300",
    likes: 72,
    comments: 15,
  },
  {
    id: 5,
    image: "/placeholder.svg?height=300&width=300",
    likes: 45,
    comments: 6,
  },
  {
    id: 6,
    image: "/placeholder.svg?height=300&width=300",
    likes: 93,
    comments: 19,
  },
  {
    id: 7,
    image: "/placeholder.svg?height=300&width=300",
    likes: 67,
    comments: 11,
  },
  {
    id: 8,
    image: "/placeholder.svg?height=300&width=300",
    likes: 82,
    comments: 14,
  },
  {
    id: 9,
    image: "/placeholder.svg?height=300&width=300",
    likes: 51,
    comments: 7,
  },
]

export default function ProfilePage({ params }: { params: { username: string } }) {
  const isCurrentUser = params.username === "mariasilva"

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border-none shadow-md mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="relative">
              <Avatar className="w-24 h-24 md:w-36 md:h-36 border-4 border-background">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {user.verified && (
                <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-8 h-8 bg-primary rounded-full border-4 border-background">
                  <span className="sr-only">Verificado</span>
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                  </svg>
                </span>
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <div>
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    {user.name}
                    {user.verified && (
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-primary rounded-full">
                        <span className="sr-only">Verificado</span>
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                        </svg>
                      </span>
                    )}
                  </h1>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>
                {isCurrentUser ? (
                  <div className="flex gap-2 md:ml-auto">
                    <Button variant="outline">Editar perfil</Button>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-5 w-5" />
                      <span className="sr-only">Configurações</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2 md:ml-auto">
                    <Button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600">
                      Seguir
                    </Button>
                    <Button variant="outline">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Mensagem
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex gap-6 mb-4">
                <div>
                  <span className="font-medium">{user.posts}</span>{" "}
                  <span className="text-muted-foreground">publicações</span>
                </div>
                <div>
                  <span className="font-medium">{user.followers}</span>{" "}
                  <span className="text-muted-foreground">seguidores</span>
                </div>
                <div>
                  <span className="font-medium">{user.following}</span>{" "}
                  <span className="text-muted-foreground">seguindo</span>
                </div>
              </div>
              <p className="whitespace-pre-line mb-2">{user.bio}</p>
              {user.website && (
                <Link
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {user.website}
                </Link>
              )}
              {user.badges && user.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {user.badges.map((badge, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1 px-2 py-1">
                      <Award className="h-3 w-3" />
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <Grid className="h-4 w-4" />
            <span className="hidden sm:inline">Publicações</span>
          </TabsTrigger>
          <TabsTrigger value="reels" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            <span className="hidden sm:inline">Reels</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Salvos</span>
          </TabsTrigger>
          <TabsTrigger value="tagged" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Privado</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          <div className="grid grid-cols-3 gap-1 md:gap-4">
            {posts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`} className="aspect-square relative group">
                <Image src={post.image || "/placeholder.svg"} alt="" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex gap-4 text-white">
                    <div className="flex items-center gap-1">
                      <Heart className="h-5 w-5 fill-white" />
                      <span className="font-medium">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-5 w-5 fill-white" />
                      <span className="font-medium">{post.comments}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reels" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Layout className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Nenhum reel ainda</h3>
            <p className="text-muted-foreground mb-4">Compartilhe vídeos curtos do seu pet.</p>
            <Button>Criar reel</Button>
          </div>
        </TabsContent>
        <TabsContent value="saved" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Bookmark className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Nenhum item salvo</h3>
            <p className="text-muted-foreground">Itens que você salvar aparecerão aqui.</p>
          </div>
        </TabsContent>
        <TabsContent value="tagged" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Lock className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Este conteúdo é privado</h3>
            <p className="text-muted-foreground">Apenas seguidores podem ver este conteúdo.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
