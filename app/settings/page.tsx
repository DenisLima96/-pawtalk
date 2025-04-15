"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { AuthCheck } from "@/components/auth-check"

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    name: "Ana Silva",
    username: "anasilva",
    email: "ana.silva@example.com",
    bio: "Amante de animais 🐱🐶 | Fotógrafa amadora | São Paulo, SP",
    website: "www.anasilva.com",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newFollowers: true,
    mentions: true,
    comments: true,
    likes: false,
    repawsts: true,
  })

  const [privacySettings, setPrivacySettings] = useState({
    privateAccount: false,
    showActivity: true,
    allowTagging: true,
    allowMentions: true,
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: checked }))
  }

  const handlePrivacyChange = (key: string, checked: boolean) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: checked }))
  }

  const handleSaveProfile = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações de perfil foram atualizadas com sucesso.",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Configurações de notificação atualizadas",
      description: "Suas preferências de notificação foram salvas.",
    })
  }

  const handleSavePrivacy = () => {
    toast({
      title: "Configurações de privacidade atualizadas",
      description: "Suas configurações de privacidade foram salvas.",
    })
  }

  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Configurações</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="privacy">Privacidade</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais e como seu perfil aparece para outros usuários.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="/images/profile-person1.png" alt="Ana Silva" />
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Alterar foto
                    </Button>
                  </div>

                  <div className="grid gap-4 flex-1">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" name="name" value={profileData.name} onChange={handleProfileChange} />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="username">Nome de usuário</Label>
                      <Input
                        id="username"
                        name="username"
                        value={profileData.username}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        className="resize-none"
                        rows={3}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" name="website" value={profileData.website} onChange={handleProfileChange} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveProfile}>Salvar alterações</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>Controle quais notificações você deseja receber e como recebê-las.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Canais de notificação</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Notificações por email</Label>
                      <p className="text-sm text-muted-foreground">Receba atualizações importantes por email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Notificações push</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba notificações em tempo real no seu dispositivo
                      </p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("pushNotifications", checked)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Tipos de notificação</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-followers">Novos seguidores</Label>
                    <Switch
                      id="new-followers"
                      checked={notificationSettings.newFollowers}
                      onCheckedChange={(checked) => handleNotificationChange("newFollowers", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mentions">Menções</Label>
                    <Switch
                      id="mentions"
                      checked={notificationSettings.mentions}
                      onCheckedChange={(checked) => handleNotificationChange("mentions", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="comments">Comentários</Label>
                    <Switch
                      id="comments"
                      checked={notificationSettings.comments}
                      onCheckedChange={(checked) => handleNotificationChange("comments", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="likes">Curtidas</Label>
                    <Switch
                      id="likes"
                      checked={notificationSettings.likes}
                      onCheckedChange={(checked) => handleNotificationChange("likes", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="repawsts">Repawsts</Label>
                    <Switch
                      id="repawsts"
                      checked={notificationSettings.repawsts}
                      onCheckedChange={(checked) => handleNotificationChange("repawsts", checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveNotifications}>Salvar preferências</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Privacidade</CardTitle>
                <CardDescription>
                  Gerencie quem pode ver seu conteúdo e como suas informações são compartilhadas.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="private-account">Conta privada</Label>
                      <p className="text-sm text-muted-foreground">
                        Apenas seguidores aprovados podem ver suas publicações
                      </p>
                    </div>
                    <Switch
                      id="private-account"
                      checked={privacySettings.privateAccount}
                      onCheckedChange={(checked) => handlePrivacyChange("privateAccount", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-activity">Mostrar status de atividade</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir que outros usuários vejam quando você está online
                      </p>
                    </div>
                    <Switch
                      id="show-activity"
                      checked={privacySettings.showActivity}
                      onCheckedChange={(checked) => handlePrivacyChange("showActivity", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allow-tagging">Permitir marcações</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir que outros usuários marquem você em publicações
                      </p>
                    </div>
                    <Switch
                      id="allow-tagging"
                      checked={privacySettings.allowTagging}
                      onCheckedChange={(checked) => handlePrivacyChange("allowTagging", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allow-mentions">Permitir menções</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir que outros usuários mencionem você em comentários e publicações
                      </p>
                    </div>
                    <Switch
                      id="allow-mentions"
                      checked={privacySettings.allowMentions}
                      onCheckedChange={(checked) => handlePrivacyChange("allowMentions", checked)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Dados e permissões</h3>
                  <div className="grid gap-2">
                    <Button variant="outline">Baixar seus dados</Button>
                    <Button variant="outline">Gerenciar permissões de aplicativos</Button>
                    <Button variant="outline" className="text-destructive hover:text-destructive">
                      Desativar conta temporariamente
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSavePrivacy}>Salvar configurações</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AuthCheck>
  )
}
