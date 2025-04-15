"use client"

import { Suspense } from "react"
import { MainFeed } from "@/components/main-feed"
import { UserNav } from "@/components/user-nav"
import { CreatePostButton } from "@/components/create-post-button"
import { SidebarNav } from "@/components/sidebar-nav"
import { SearchBar } from "@/components/search-bar"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingTopics } from "@/components/trending-topics"
import { NotificationsPopover } from "@/components/notifications-popover"
import { MessagesPopover } from "@/components/messages-popover"
import { WhoToFollow } from "@/components/who-to-follow"
import { PawPrint } from "lucide-react"
import { AuthCheck } from "@/components/auth-check"

export default function FeedPage() {
  return (
    <AuthCheck>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
          <div className="container flex h-16 items-center px-4">
            <div className="flex items-center gap-2 mr-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <PawPrint className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg hidden sm:inline-block">PawTalk</span>
            </div>
            <div className="flex-1 md:max-w-sm">
              <SearchBar />
            </div>
            <div className="flex items-center ml-auto gap-2">
              <MessagesPopover />
              <NotificationsPopover />
              <CreatePostButton />
              <UserNav />
            </div>
          </div>
        </header>
        <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-6">
          <div className="hidden md:block md:col-span-1">
            <div className="sticky top-20">
              <SidebarNav />
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
            <Suspense fallback={<FeedSkeleton />}>
              <MainFeed />
            </Suspense>
          </div>
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <WhoToFollow />
              <TrendingTopics />
            </div>
          </div>
        </div>
      </div>
    </AuthCheck>
  )
}

function FeedSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-lg border shadow-sm">
          <div className="p-4 flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-[200px] w-full" />
          <div className="p-4 space-y-3">
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}
