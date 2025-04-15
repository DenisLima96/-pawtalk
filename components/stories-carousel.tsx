"use client"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { motion } from "framer-motion"

// Sample data for demonstration
const stories = [
  {
    id: 1,
    user: {
      name: "Seu story",
      username: "você",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    hasStory: false,
    isYou: true,
  },
  {
    id: 2,
    user: {
      name: "Maria Silva",
      username: "mariasilva",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    hasStory: true,
    viewed: false,
  },
  {
    id: 3,
    user: {
      name: "João Santos",
      username: "joaosantos",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    hasStory: true,
    viewed: false,
  },
  {
    id: 4,
    user: {
      name: "Ana Costa",
      username: "anacosta",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    hasStory: true,
    viewed: true,
  },
  {
    id: 5,
    user: {
      name: "Pedro Oliveira",
      username: "pedrooliveira",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    hasStory: true,
    viewed: false,
  },
  {
    id: 6,
    user: {
      name: "Carla Mendes",
      username: "carlamendes",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    hasStory: true,
    viewed: true,
  },
  {
    id: 7,
    user: {
      name: "Lucas Ferreira",
      username: "lucasferreira",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    hasStory: true,
    viewed: false,
  },
  {
    id: 8,
    user: {
      name: "Juliana Alves",
      username: "julianaalves",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    hasStory: true,
    viewed: false,
  },
  {
    id: 9,
    user: {
      name: "Roberto Dias",
      username: "robertodias",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    hasStory: true,
    viewed: true,
  },
  {
    id: 10,
    user: {
      name: "Fernanda Lima",
      username: "fernandalima",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    hasStory: true,
    viewed: false,
  },
]

export function StoriesCarousel() {
  const [showNavigation, setShowNavigation] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { current } = carouselRef
      const scrollAmount = direction === "left" ? -200 : 200
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowNavigation(true)}
      onMouseLeave={() => setShowNavigation(false)}
    >
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 py-2 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {stories.map((story) => (
          <motion.div
            key={story.id}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-1 flex-shrink-0"
          >
            <div
              className={`relative rounded-full p-[2px] ${
                story.hasStory && !story.viewed
                  ? "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600"
                  : story.hasStory && story.viewed
                    ? "bg-gray-300 dark:bg-gray-600"
                    : ""
              }`}
            >
              <Avatar className="w-16 h-16 border-2 border-background">
                <AvatarImage src={story.user.avatar || "/placeholder.svg"} alt={story.user.name} />
                <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {story.isYou && (
                <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center border-2 border-background">
                  <Plus className="h-4 w-4" />
                </div>
              )}
            </div>
            <span className="text-xs truncate max-w-[64px] text-center">
              {story.isYou ? "Seu story" : story.user.name.split(" ")[0]}
            </span>
          </motion.div>
        ))}
      </div>
      {showNavigation && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full shadow-md opacity-80 hover:opacity-100"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Anterior</span>
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full shadow-md opacity-80 hover:opacity-100"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próximo</span>
          </Button>
        </>
      )}
    </div>
  )
}
