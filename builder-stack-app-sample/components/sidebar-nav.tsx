// Left sidebar navigation with mobile overlay support
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, X } from "lucide-react"
import { Button } from "./ui/button"
import { useState, useEffect } from "react"

const navigationItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/catalog", label: "Catalog", icon: FileText },
]

function useBackendStatus() {
  const [status, setStatus] = useState({ health: "Checking...", loading: true })
  useEffect(() => {
    fetch("/api/health")
      .then(r => r.json())
      .then(d => setStatus({ health: d.status, loading: false }))
      .catch(() => setStatus({ health: "Offline", loading: false }))
  }, [])
  return status
}

export function SidebarNav({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  const pathname = usePathname()
  const { health, loading } = useBackendStatus()

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onToggle} />}

      <div className={cn(
        "fixed inset-y-0 left-0 z-30 flex h-screen w-64 flex-col bg-sidebar transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center justify-between px-4 lg:bg-transparent">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 bg-primary rounded flex items-center justify-center text-primary-foreground font-bold">DB</div>
            <span className="text-xl font-bold">Builder Stack</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={onToggle} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navigationItems.map(({ href, label, icon: Icon }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
                )}
                onClick={() => window.innerWidth < 1024 && onToggle()}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-lg bg-sidebar-accent/50 p-3">
            <h3 className="text-xs font-semibold mb-2">Backend Connection</h3>
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${health === "healthy" ? "bg-success animate-pulse" : "bg-muted"}`} />
              <span className="text-xs">{loading ? "Connecting..." : `Status: ${health}`}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
