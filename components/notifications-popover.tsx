"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Bell, PawPrint, Feather, Zap, AtSign, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

// Sample data for demonstration
const notifications = [
  {
    id: 1,
    type: "like",
    user: {
      name: "Maria Silva",
      username: "mariasilva",
      avatar: "/images/profile-person3.png",
    },
    content: "curtiu sua publicação",
    time: "2m",
    read: false,
  },
  {
    id: 2,
    type: "comment",
    user: {
      name: "João Santos",
      username: "joaosantos",
      avatar: "/images/profile-person2.png",
    },
    content: "comentou: Que lindo seu pet!",
    time: "15m",
    read: false,
  },
  {
    id: 3,
    type: "follow",
    user: {
      name: "Rex",
      username: "rexthedog",
      avatar: "/images/profile-dog2.png",
      isPet: true,
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
    },
    content: "mencionou você em uma publicação",
    time: "3h",
    read: true,
  },
  {
    id: 5,
    type: "repawst",
    user: {
      name: "PetShop Feliz",
      username: "petshopfeliz",
      avatar: "/images/profile-petshop1.png",
      isBusiness: true,
    },
    content: "repawstou sua publicação",
    time: "5h",
    read: true,
  },
]

export function NotificationsPopover() {
  const [open, setOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-xs text-primary-foreground">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notificações</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Tabs defaultValue="all">
          <div className="border-b px-3 py-2">
            <h4 className="text-sm font-medium">Notificações</h4>
          </div>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="unread">Não lidas</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="max-h-[300px] overflow-y-auto">
            <div className="grid gap-1">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="unread" className="max-h-[300px] overflow-y-auto">
            <div className="grid gap-1">
              {notifications
                .filter((notification) => !notification.read)
                .map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
            </div>
          </TabsContent>
          <div className="border-t p-2">
            <Button variant="ghost" size="sm" className="w-full">
              Ver todas as notificações
            </Button>
          </div>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}

function NotificationItem({ notification }: { notification: (typeof notifications)[0] }) {
  const getIcon = () => {
    switch (notification.type) {
      case "like":
        return <PawPrint className="h-4 w-4 text-emerald-500" />
      case "comment":
        return <Feather className="h-4 w-4 text-blue-500" />
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

  return (
    <Link href="#" className={`flex items-start gap-3 p-3 hover:bg-muted ${!notification.read ? "bg-muted/50" : ""}`}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={notification.user.avatar || "/placeholder.svg"} alt={notification.user.name} />
        <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-1">
          <span className="font-medium">{notification.user.name}</span>
          {notification.user.isPet && (
            <Badge variant="outline" className="ml-1 text-xs py-0 h-5">
              <PawPrint className="h-3 w-3 mr-1" />
              Pet
            </Badge>
          )}
          {notification.user.isBusiness && (
            <Badge variant="outline" className="ml-1 text-xs py-0 h-5">
              <Store className="h-3 w-3 mr-1" />
              Empresa
            </Badge>
          )}
          <span>{notification.content}</span>
        </div>
        <div className="flex items-center gap-2">
          {getIcon()}
          <p className="text-xs text-muted-foreground">{notification.time}</p>
        </div>
      </div>
      {!notification.read && <div className="h-2 w-2 rounded-full bg-primary" />}
    </Link>
  )
}
