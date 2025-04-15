"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PawPrint, Store, Send, ImageIcon, Smile } from "lucide-react"
import { useRouter } from "next/navigation"
import { AuthCheck } from "@/components/auth-check"

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
    messages: [
      { id: 1, text: "Oi! Tudo bem?", sent: false, time: "10:30" },
      { id: 2, text: "Adorei a foto do seu cachorro! Qual é a raça dele?", sent: false, time: "10:31" },
      { id: 3, text: "Olá! Tudo ótimo, e com você?", sent: true, time: "10:35" },
      { id: 4, text: "Ele é um Golden Retriever, tem 3 anos", sent: true, time: "10:36" },
      { id: 5, text: "Que lindo! Eu tenho um Labrador de 2 anos", sent: false, time: "10:38" },
    ],
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
    messages: [
      { id: 1, text: "Woof woof! (Vamos marcar um encontro de pets no parque?)", sent: false, time: "Ontem" },
      { id: 2, text: "Claro! Que tal no domingo?", sent: true, time: "Ontem" },
      { id: 3, text: "Woof! (Perfeito, vou avisar minha dona!)", sent: false, time: "Ontem" },
    ],
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
    messages: [
      {
        id: 1,
        text: "Olá! Temos um desconto especial para você em produtos para gatos!",
        sent: false,
        time: "Segunda",
      },
      { id: 2, text: "Interessante! Quais produtos estão na promoção?", sent: true, time: "Segunda" },
      {
        id: 3,
        text: "Temos rações premium com 20% de desconto e brinquedos com 30%! Venha conferir!",
        sent: false,
        time: "Segunda",
      },
    ],
  },
]

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [currentMessages, setCurrentMessages] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    if (activeChat) {
      const chat = messages.find((m) => m.id === activeChat)
      if (chat) {
        setCurrentMessages(chat.messages)
      }
    }
  }, [activeChat])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && activeChat) {
      const newMsg = {
        id: currentMessages.length + 1,
        text: newMessage,
        sent: true,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setCurrentMessages([...currentMessages, newMsg])
      setNewMessage("")
    }
  }

  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mensagens</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl">Conversas</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="all">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">
                    Todas
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">
                    Não lidas
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="m-0">
                  <div className="divide-y">
                    {messages.map((chat) => (
                      <div
                        key={chat.id}
                        className={`flex items-start gap-3 p-4 hover:bg-muted cursor-pointer ${activeChat === chat.id ? "bg-muted" : ""}`}
                        onClick={() => setActiveChat(chat.id)}
                      >
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={chat.user.avatar || "/placeholder.svg"} alt={chat.user.name} />
                            <AvatarFallback>{chat.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {chat.user.online && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{chat.user.name}</span>
                            {chat.user.type === "pet" && (
                              <Badge variant="outline" className="ml-1 text-xs py-0 h-5">
                                <PawPrint className="h-3 w-3 mr-1" />
                                Pet
                              </Badge>
                            )}
                            {chat.user.type === "business" && (
                              <Badge variant="outline" className="ml-1 text-xs py-0 h-5">
                                <Store className="h-3 w-3 mr-1" />
                                Empresa
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">@{chat.user.username}</p>
                          <p className="text-sm truncate mt-1">{chat.messages[chat.messages.length - 1].text}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {chat.messages[chat.messages.length - 1].time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="unread" className="m-0">
                  <div className="p-6 text-center text-muted-foreground">Nenhuma mensagem não lida</div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            {activeChat ? (
              <>
                <CardHeader className="border-b p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={messages.find((m) => m.id === activeChat)?.user.avatar || "/placeholder.svg"}
                        alt={messages.find((m) => m.id === activeChat)?.user.name}
                      />
                      <AvatarFallback>{messages.find((m) => m.id === activeChat)?.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1">
                        <CardTitle className="text-base">
                          {messages.find((m) => m.id === activeChat)?.user.name}
                        </CardTitle>
                        {messages.find((m) => m.id === activeChat)?.user.type === "pet" && (
                          <Badge variant="outline" className="ml-1 text-xs py-0 h-5">
                            <PawPrint className="h-3 w-3 mr-1" />
                            Pet
                          </Badge>
                        )}
                        {messages.find((m) => m.id === activeChat)?.user.type === "business" && (
                          <Badge variant="outline" className="ml-1 text-xs py-0 h-5">
                            <Store className="h-3 w-3 mr-1" />
                            Empresa
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {messages.find((m) => m.id === activeChat)?.user.online ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                    {currentMessages.map((message) => (
                      <div key={message.id} className={`flex ${message.sent ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.sent ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p
                            className={`text-xs mt-1 ${message.sent ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                          >
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t p-4">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Button type="button" variant="ghost" size="icon">
                        <ImageIcon className="h-5 w-5" />
                      </Button>
                      <div className="relative flex-1">
                        <Input
                          placeholder="Digite sua mensagem..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="pr-10"
                        />
                        <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                          <Smile className="h-5 w-5" />
                        </Button>
                      </div>
                      <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                        <Send className="h-5 w-5" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px] text-center p-4">
                <Store className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Nenhuma conversa selecionada</h3>
                <p className="text-muted-foreground mb-6">Selecione uma conversa para começar a enviar mensagens</p>
                <Button onClick={() => router.push("/explore")}>Encontrar pessoas para conversar</Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </AuthCheck>
  )
}
