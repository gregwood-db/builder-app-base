// Full Example - Catalog page with instructions on how to customize content
export default function CatalogPage() {
  return (
    <div className="space-y-6">
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold tracking-tight">📄 Catalog</h1>
        <p className="text-muted-foreground mt-2">Customize this page to show your application's content</p>
      </div>

      <div className="rounded-lg border bg-card p-8">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-primary/10 p-3">
            <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">How to Customize This Page</h2>
            <p className="text-muted-foreground mb-4">This is a placeholder page. Follow the steps below to add your own content.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          { num: "1", title: "Edit the Page File", desc: "Open the following file in your editor:", code: "app/catalog/page.tsx" },
          { num: "2", title: "Add Your Components", desc: "Replace the content with your own React components:", code: "export default function CatalogPage() { ... }" },
          { num: "3", title: "Add Backend APIs", desc: "Create new endpoints in your backend:", code: "backend/main.py" },
          { num: "4", title: "Test Your Changes", desc: "Run the development server and view your changes:", code: "npm run dev" },
        ].map(({ num, title, desc, code }) => (
          <div key={num} className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">{num}</div>
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{desc}</p>
            <div className="rounded-md bg-muted p-3">
              <code className="text-xs">{code}</code>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">📝 Example Code Structure</h3>
        <div className="rounded-md bg-muted p-4 overflow-auto">
          <pre className="text-xs"><code>{`"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function CatalogPage() {
  const [items, setItems] = useState([])

  const loadItems = async () => {
    const response = await fetch('/api/your-endpoint')
    const data = await response.json()
    setItems(data)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Catalog</h1>
      <Button onClick={loadItems}>Load Items</Button>
      
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border bg-card p-4">
            <h3>{item.name}</h3>
            <p className="text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}`}</code></pre>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">🔗 Helpful Resources</h3>
        <div className="grid gap-3 text-sm">
          {[
            { label: "Next.js Documentation", url: "https://nextjs.org/docs", display: "nextjs.org/docs" },
            { label: "Databricks SDK", url: "https://docs.databricks.com/dev-tools/sdk-python.html", display: "docs.databricks.com/dev-tools/sdk-python" },
            { label: "shadcn/ui Components", url: "https://ui.shadcn.com", display: "ui.shadcn.com" },
          ].map(({ label, url, display }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-muted-foreground">•</span>
              <span><strong>{label}:</strong> <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{display}</a></span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-accent/50 border border-accent p-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">💡 Quick Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            'Use "use client" directive for interactive components with hooks',
            'Reuse existing UI components from components/ui/ folder',
            'Follow the Databricks theme colors defined in app/globals.css'
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-primary font-bold">→</span>
              <span>{tip.includes('"') ? tip.split('"').map((part, j) => j % 2 ? <code key={j} className="bg-muted px-1 rounded text-xs">{part}</code> : part) : tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
