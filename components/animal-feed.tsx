"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for demonstration
const posts = [
  {
    id: 1,
    user: {
      name: "Maria Silva",
      username: "mariasilva",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=400&width=400",
    caption: "Meu gatinho adorável tomando sol na janela! 🐱☀️",
    likes: 124,
    comments: 23,
    category: "gatos",
    timeAgo: "2h",
  },
  {
    id: 2,
    user: {
      name: "João Santos",
      username: "joaosantos",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=400&width=400",
    caption: "Passeio no parque com meu melhor amigo! 🐕🌳",
    likes: 89,
    comments: 12,
    category: "cachorros",
    timeAgo: "5h",
  },
  {
    id: 3,
    user: {
      name: "Ana Costa",
      username: "anacosta",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=400&width=400",
    caption: "Meu papagaio aprendendo novas palavras! 🦜",
    likes: 56,
    comments: 8,
    category: "aves",
    timeAgo: "1d",
  },
]

export function AnimalFeed() {
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [savedPosts, setSavedPosts] = useState<number[]>([])

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId))
    } else {
      setLikedPosts([...likedPosts, postId])
    }
  }

  const handleSave = (postId: number) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter((id) => id !== postId))
    } else {
      setSavedPosts([...savedPosts, postId])
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Tabs defaultValue="todos" className="mb-8">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="cachorros">Cachorros</TabsTrigger>
          <TabsTrigger value="gatos">Gatos</TabsTrigger>
          <TabsTrigger value="aves">Aves</TabsTrigger>
        </TabsList>
        <TabsContent value="todos">
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isLiked={likedPosts.includes(post.id)}
                isSaved={savedPosts.includes(post.id)}
                onLike={handleLike}
                onSave={handleSave}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="cachorros">
          <div className="space-y-6">
            {posts
              .filter((post) => post.category === "cachorros")
              .map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  isLiked={likedPosts.includes(post.id)}
                  isSaved={savedPosts.includes(post.id)}
                  onLike={handleLike}
                  onSave={handleSave}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="gatos">
          <div className="space-y-6">
            {posts
              .filter((post) => post.category === "gatos")
              .map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  isLiked={likedPosts.includes(post.id)}
                  isSaved={savedPosts.includes(post.id)}
                  onLike={handleLike}
                  onSave={handleSave}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="aves">
          <div className="space-y-6">
            {posts
              .filter((post) => post.category === "aves")
              .map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  isLiked={likedPosts.includes(post.id)}
                  isSaved={savedPosts.includes(post.id)}
                  onLike={handleLike}
                  onSave={handleSave}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface PostCardProps {
  post: (typeof posts)[0]
  isLiked: boolean
  isSaved: boolean
  onLike: (postId: number) => void
  onSave: (postId: number) => void
}

function PostCard({ post, isLiked, isSaved, onLike, onSave }: PostCardProps) {
  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <Link href={`/profile/${post.user.username}`} className="font-medium hover:underline">
              {post.user.name}
            </Link>
            <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.caption}
          width={600}
          height={600}
          className="w-full object-cover aspect-square"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 gap-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onLike(post.id)}
              className={isLiked ? "text-red-500" : ""}
            >
              <Heart className={isLiked ? "fill-red-500" : ""} size={20} />
              <span className="sr-only">Curtir</span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle size={20} />
              <span className="sr-only">Comentar</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 size={20} />
              <span className="sr-only">Compartilhar</span>
            </Button>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onSave(post.id)}>
            <Bookmark className={isSaved ? "fill-current" : ""} size={20} />
            <span className="sr-only">Salvar</span>
          </Button>
        </div>
        <div>
          <p className="text-sm font-medium">{isLiked ? post.likes + 1 : post.likes} curtidas</p>
          <p className="text-sm mt-1">
            <Link href={`/profile/${post.user.username}`} className="font-medium hover:underline mr-1">
              {post.user.name}
            </Link>
            {post.caption}
          </p>
          <Link href={`/post/${post.id}`} className="text-sm text-muted-foreground mt-1 block">
            Ver todos os {post.comments} comentários
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
