"use client"

import { useState } from "react"
import { MessageCircle, PawPrint, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Sample data for demonstration
const messages = [
  {
    id: 1,
    user: {
      name: "Maria Silva",
      username: "mariasilva",
      avatar: "/images/profile-person3.png",
      online: true,
      type: "person",
    },
    lastMessage: "Adorei a foto do seu cachorro! Qual é a raça dele?",
    time: "2m",
    unread: true,
  },
  {
    id: 2,
    user: {
      name: "Rex",
      username: "rexthedog",
      avatar: "/images/profile-dog2.png",
      online: false,
      type: "pet",
      owner: "Ana Costa",
    },
    lastMessage: "Woof woof! (Vamos marcar um encontro de pets no parque?)",
    time: "1h",
    unread: false,
  },
  {
    id: 3,
    user: {
      name: "PetShop Feliz",
      username: "petshopfeliz",
      avatar: "/images/profile-petshop1.png",
      online: true,
      type: "business",
    },
    lastMessage: "Temos um desconto especial para você em produtos para gatos!",
    time: "3h",
    unread: false,
  },
  {
    id: 4,
    user: {
      name: "Luna",
      username: "lunathekitty",
      avatar: "/images/profile-cat1.png",
      online: false,
      type: "pet",
      owner: "Pedro Oliveira",
    },
    lastMessage: "Miau! (Você viu aquele novo brinquedo para gatos?)",
    time: "1d",
    unread: false,
  },
]

export function MessagesPopover() {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const unreadCount = messages.filter((m) => m.unread).length

  const filteredMessages = messages.filter(
    (message) =>
      message.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <MessageCircle className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-xs text-primary-foreground">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Mensagens</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="border-b px-3 py-2">
          <h4 className="text-sm font-medium">Mensagens</h4>
        </div>
        <div className="p-2">
          <Input
            placeholder="Pesquisar mensagens"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8"
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {filteredMessages.length > 0 ? (
            <div className="grid gap-1">
              {filteredMessages.map((message) => (
                <MessageItem key={message.id} message={message} />
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">Nenhuma mensagem encontrada</div>
          )}
        </div>
        <div className="border-t p-2">
          <Button variant="ghost" size="sm" className="w-full">
            Ver todas as mensagens
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function MessageItem({ message }: { message: (typeof messages)[0] }) {
  return (
    <Link
      href={`/messages/${message.user.username}`}
      className={`flex items-start gap-3 p-3 hover:bg-muted ${message.unread ? "bg-muted/50 font-medium" : ""}`}
    >
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage src={message.user.avatar || "/placeholder.svg"} alt={message.user.name} />
          <AvatarFallback>{message.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {message.user.online && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
        )}
      </div>
      <div className="flex-1 space-y-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium">{message.user.name}</p>
            {message.user.type === "pet" && (
              <Badge variant="outline" className="ml-1 text-xs py-0 h-5">
                <PawPrint className="h-3 w-3 mr-1" />
                Pet
              </Badge>
            )}
            {message.user.type === "business" && (
              <Badge variant="outline" className="ml-1 text-xs py-0 h-5">
                <Store className="h-3 w-3 mr-1" />
                Empresa
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{message.time}</p>
        </div>
        <p className="text-xs truncate">{message.lastMessage}</p>
        {message.user.type === "pet" && message.user.owner && (
          <p className="text-xs text-muted-foreground">Dono: {message.user.owner}</p>
        )}
      </div>
      {message.unread && <div className="h-2 w-2 rounded-full bg-primary" />}
    </Link>
  )
}
