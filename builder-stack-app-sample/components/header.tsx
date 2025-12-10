// Top header with user info and theme toggle
"use client"

import { User, Menu } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"
import { useUserInfo } from "@/hooks/useUserInfo"

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, isLoading } = useUserInfo()

  return (
    <header className="flex h-16 items-center justify-between bg-background px-6 relative z-40">
      <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
        <Menu className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          {isLoading ? (
            <Skeleton className="h-5 w-24" />
          ) : (
            <span className="text-sm font-medium">{user?.username || user?.email || "local_user"}</span>
          )}
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
