"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Home,
  Compass,
  MessageCircle,
  Feather,
  User,
  Bookmark,
  Zap,
  Settings,
  HelpCircle,
  Hash,
  Users,
  Bell,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const navItems = [
  {
    name: "Início",
    href: "/feed",
    icon: Home,
  },
  {
    name: "Explorar",
    href: "/explore",
    icon: Compass,
  },
  {
    name: "Notificações",
    href: "/notifications",
    icon: Bell,
    badge: 12,
  },
  {
    name: "Mensagens",
    href: "/messages",
    icon: MessageCircle,
    badge: 3,
  },
  {
    name: "Hashtags",
    href: "/hashtags",
    icon: Hash,
  },
  {
    name: "Comunidades",
    href: "/communities",
    icon: Users,
  },
  {
    name: "Perfil",
    href: "/profile",
    icon: User,
  },
  {
    name: "Salvos",
    href: "/saved",
    icon: Bookmark,
  },
  {
    name: "Repawsts",
    href: "/repawsts",
    icon: Zap,
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link key={item.href} href={item.href} passHref>
            <Button
              variant="ghost"
              className={cn("w-full justify-start gap-3 px-3", isActive && "bg-muted font-medium")}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
              {item.badge && (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-primary-foreground"
                >
                  {item.badge}
                </motion.div>
              )}
            </Button>
          </Link>
        )
      })}
      <div className="pt-4">
        <Link href="/settings" passHref>
          <Button variant="ghost" className="w-full justify-start gap-3 px-3">
            <Settings className="h-5 w-5" />
            <span>Configurações</span>
          </Button>
        </Link>
        <Link href="/help" passHref>
          <Button variant="ghost" className="w-full justify-start gap-3 px-3">
            <HelpCircle className="h-5 w-5" />
            <span>Ajuda</span>
          </Button>
        </Link>
      </div>
      <div className="pt-4">
        <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
          <Feather className="h-5 w-5 mr-2" />
          <span>Publicar</span>
        </Button>
      </div>
    </nav>
  )
}
