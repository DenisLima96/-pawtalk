"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PawPrint, Feather, Upload, ImageIcon, Camera, MapPin, X, Hash, AtSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function CreatePostButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [activeTab, setActiveTab] = useState("text")
  const [content, setContent] = useState("")
  const [location, setLocation] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulação de upload
    setTimeout(() => {
      setIsUploading(false)
      setIsOpen(false)
      resetForm()
    }, 1500)
  }

  const resetForm = () => {
    setContent("")
    setLocation("")
    setTags([])
    setCurrentTag("")
    setActiveTab("text")
  }

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim().startsWith("#") ? currentTag.trim() : `#${currentTag.trim()}`])
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Feather className="mr-2 h-4 w-4" />
          Publicar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Criar Nova Publicação</DialogTitle>
          </DialogHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <Feather className="h-4 w-4" />
                Texto
              </TabsTrigger>
              <TabsTrigger value="photo" className="flex items-center gap-2">
                <PawPrint className="h-4 w-4" />
                Foto
              </TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Textarea
                    placeholder="O que está acontecendo no mundo pet?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[120px] resize-none"
                  />
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Dica: Use # para hashtags e @ para mencionar usuários</span>
                    <span className={content.length > 250 ? "text-destructive" : ""}>{content.length}/280</span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Localização</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Adicionar localização"
                      className="pl-9"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tags">Hashtags</Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1"
                        onClick={() => setCurrentTag("#")}
                      >
                        <Hash className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1"
                        onClick={() => setCurrentTag("@")}
                      >
                        <AtSign className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative">
                    <Input
                      id="tags"
                      placeholder="Adicionar hashtags ou menções (pressione Enter)"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7"
                      onClick={addTag}
                      disabled={!currentTag.trim()}
                    >
                      Adicionar
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => removeTag(tag)}
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remover tag</span>
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isUploading || !content.trim() || content.length > 280}
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
                >
                  {isUploading ? "Publicando..." : "Publicar"}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="photo" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="photo">Foto</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground text-center">
                      Arraste uma imagem ou clique para selecionar
                    </p>
                    <Input id="photo" ref={fileInputRef} type="file" accept="image/*" className="hidden" />
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Galeria
                      </Button>
                      <Button type="button" variant="outline" size="sm">
                        <Camera className="mr-2 h-4 w-4" />
                        Câmera
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="caption">Legenda</Label>
                  <Textarea
                    id="caption"
                    placeholder="Escreva uma legenda para sua foto..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Dica: Use # para hashtags e @ para mencionar usuários</span>
                    <span className={content.length > 250 ? "text-destructive" : ""}>{content.length}/280</span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Localização</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Adicionar localização"
                      className="pl-9"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tags">Hashtags</Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1"
                        onClick={() => setCurrentTag("#")}
                      >
                        <Hash className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1"
                        onClick={() => setCurrentTag("@")}
                      >
                        <AtSign className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative">
                    <Input
                      id="tags"
                      placeholder="Adicionar hashtags ou menções (pressione Enter)"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7"
                      onClick={addTag}
                      disabled={!currentTag.trim()}
                    >
                      Adicionar
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => removeTag(tag)}
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remover tag</span>
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isUploading || !content.trim() || content.length > 280}
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
                >
                  {isUploading ? "Publicando..." : "Publicar"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </DialogContent>
    </Dialog>
  )
}
