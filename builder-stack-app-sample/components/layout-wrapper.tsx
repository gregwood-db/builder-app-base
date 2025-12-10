// Main layout wrapper with sidebar and header
"use client"

import { useState } from "react"
import { SidebarNav } from "./sidebar-nav"
import { Header } from "./header"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="flex h-screen">
      <SidebarNav isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className="flex flex-1 flex-col">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-auto p-6">
          <div className="container mx-auto max-w-7xl py-10 px-4">{children}</div>
        </main>
      </div>
    </div>
  )
}
