"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PawPrint, Heart, MessageCircle, Zap, AtSign, Store, Bell } from "lucide-react"
import Link from "next/link"
import { AuthCheck } from "@/components/auth-check"

const notifications = [
  {
    id: 1,
    type: "like",
    user: {
      name: "Maria Silva",
      username: "mariasilva",
      avatar: "/images/profile-person3.png",
      type: "person",
    },
    content: "curtiu sua publicação",
    time: "2m",
    read: false,
    postId: 1,
  },
  {
    id: 2,
    type: "comment",
    user: {
      name: "João Santos",
      username: "joaosantos",
      avatar: "/images/profile-person2.png",
      type: "person",
    },
    content: "comentou: Que lindo seu pet!",
    time: "15m",
    read: false,
    postId: 2,
  },
  {
    id: 3,
    type: "follow",
    user: {
      name: "Rex",
      username: "rexthedog",
      avatar: "/images/profile-dog2.png",
      type: "pet",
    },
    content: "começou a seguir você",
    time: "1h",
    read: true,
  },
  {
    id: 4,
    type: "mention",
    user: {
      name: "Pedro Oliveira",
      username: "pedrooliveira",
      avatar: "/images/profile-person4.png",
      type: "person",
    },
    content: "mencionou você em uma publicação",
    time: "3h",
    read: true,
    postId: 3,
  },
  {
    id: 5,
    type: "repawst",
    user: {
      name: "PetShop Feliz",
      username: "petshopfeliz",
      avatar: "/images/profile-petshop1.png",
      type: "business",
    },
    content: "repawstou sua publicação",
    time: "5h",
    read: true,
    postId: 1,
  },
  {
    id: 6,
    type: "like",
    user: {
      name: "Mia",
      username: "miathekitty",
      avatar: "/images/profile-cat2.png",
      type: "pet",
    },
    content: "curtiu seu comentário",
    time: "1d",
    read: true,
    postId: 4,
  },
  {
    id: 7,
    type: "follow",
    user: {
      name: "Clínica VetAmigo",
      username: "vetamigo",
      avatar: "/images/profile-petshop2.png",
      type: "business",
    },
    content: "começou a seguir você",
    time: "2d",
    read: true,
  },
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [readNotifications, setReadNotifications] = useState<number[]>(
    notifications.filter((n) => n.read).map((n) => n.id),
  )

  const markAsRead = (id: number) => {
    if (!readNotifications.includes(id)) {
      setReadNotifications([...readNotifications, id])
    }
  }

  const markAllAsRead = () => {
    setReadNotifications(notifications.map((n) => n.id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "follow":
        return <AtSign className="h-4 w-4 text-purple-500" />
      case "mention":
        return <AtSign className="h-4 w-4 text-orange-500" />
      case "repawst":
        return <Zap className="h-4 w-4 text-cyan-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !readNotifications.includes(notification.id)
    return notification.type === activeTab
  })

  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Notificações</h1>
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Marcar todas como lidas
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Atividades recentes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-6">
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="unread">Não lidas</TabsTrigger>
                <TabsTrigger value="like">Curtidas</TabsTrigger>
                <TabsTrigger value="comment">Comentários</TabsTrigger>
                <TabsTrigger value="follow">Seguidores</TabsTrigger>
                <TabsTrigger value="mention">Menções</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="m-0">
                {filteredNotifications.length > 0 ? (
                  <div className="divide-y">
                    {filteredNotifications.map((notification) => (
                      <Link
                        key={notification.id}
                        href={
                          notification.postId
                            ? `/post/${notification.postId}`
                            : `/profile/${notification.user.username}`
                        }
                        className={`flex items-start gap-3 p-4 hover:bg-muted ${!readNotifications.includes(notification.id) ? "bg-muted/50" : ""}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={notification.user.avatar || "/placeholder.svg"}
                            alt={notification.user.name}
                          />
                          <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{notification.user.name}</span>
                            {notification.user.type === "pet" && (
                              <Badge variant="outline" className="ml-1 text-xs py-0 h-5">
                                <PawPrint className="h-3 w-3 mr-1" />
                                Pet
                              </Badge>
                            )}
                            {notification.user.type === "business" && (
                              <Badge variant="outline" className="ml-1 text-xs py-0 h-5">
                                <Store className="h-3 w-3 mr-1" />
                                Empresa
                              </Badge>
                            )}
                            <span>{notification.content}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getIcon(notification.type)}
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                        </div>
                        {!readNotifications.includes(notification.id) && (
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Nenhuma notificação</h3>
                    <p className="text-muted-foreground">
                      {activeTab === "unread"
                        ? "Você não tem notificações não lidas"
                        : "Você não tem notificações deste tipo"}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AuthCheck>
  )
}
