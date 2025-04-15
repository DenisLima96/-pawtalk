"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AnimatePresence, motion } from "framer-motion"

// Sample data for demonstration
const recentSearches = [
  {
    id: 1,
    type: "user",
    name: "Maria Silva",
    username: "mariasilva",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    type: "hashtag",
    name: "#CachorroFofo",
  },
  {
    id: 3,
    type: "user",
    name: "João Santos",
    username: "joaosantos",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function SearchBar() {
  const [isFocused, setIsFocused] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Pesquisar"
          className="pl-9 pr-9 bg-muted/50 border-none focus-visible:ring-1"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground"
            onClick={() => setSearchTerm("")}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Limpar</span>
          </Button>
        )}
      </div>
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-10 overflow-hidden"
          >
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Pesquisas recentes</h3>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  Limpar tudo
                </Button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.type === "user" ? (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={item.avatar || "/placeholder.svg"} alt={item.name} />
                          <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-xs">#</span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        {item.type === "user" && <p className="text-xs text-muted-foreground">@{item.username}</p>}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remover</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t p-3">
              <h3 className="text-sm font-medium mb-2">Sugestões</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="cursor-pointer">
                  #CachorroFofo
                </Badge>
                <Badge variant="secondary" className="cursor-pointer">
                  #GatosDormindo
                </Badge>
                <Badge variant="secondary" className="cursor-pointer">
                  #PetsDoDia
                </Badge>
                <Badge variant="secondary" className="cursor-pointer">
                  #AdoteNãoCompre
                </Badge>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
