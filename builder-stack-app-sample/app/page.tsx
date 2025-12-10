// Main dashboard page with data panel, code examples, and guide
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface DatabaseInstance {
  name: string
  state?: string
  capacity?: string
  [key: string]: any
}

function useCodeSample() {
  const [code, setCode] = useState("")
  useEffect(() => {
    fetch("/api/code-sample").then(r => r.json()).then(d => setCode(d.code))
  }, [])
  return code
}

function DataPanel() {
  const [state, setState] = useState({ data: [] as DatabaseInstance[], loading: false, error: null as string | null })

  const loadData = async () => {
    setState(s => ({ ...s, loading: true, error: null }))
    try {
      const res = await fetch("/api/lakebase-instance-info").then(r => r.json())
      if (res.error) throw new Error(res.error)
      setState({ data: res.data || [], loading: false, error: null })
    } catch (e: any) {
      setState({ data: [], loading: false, error: e.message })
    }
  }

  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">📊 Lakebase Instances</h3>
        <Button onClick={loadData} disabled={state.loading} size="sm">
          {state.loading ? "Loading..." : "List Instances"}
        </Button>
      </div>

      {state.error && <div className="bg-destructive/10 text-destructive rounded-md p-3 mb-4">⚠️ {state.error}</div>}

      {state.data.length > 0 ? (
        <div className="rounded-md border">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-semibold">Name</th>
                <th className="text-left p-3 font-semibold">State</th>
                <th className="text-left p-3 font-semibold">Capacity</th>
              </tr>
            </thead>
            <tbody>
              {state.data.map((db, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3 font-medium">{db.name}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      db.state === "RUNNING" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                    }`}>
                      {db.state || "UNKNOWN"}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground">{db.capacity || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !state.loading && !state.error ? (
        <div className="text-center py-8 text-muted-foreground">Click to list available Database Instances.</div>
      ) : null}
    </div>
  )
}

function CodePanel() {
  const code = useCodeSample()
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-2">👨‍💻 Implementation</h3>
      <p className="text-sm text-muted-foreground mb-4">Backend code utilizing Databricks SDK:</p>
      <div className="rounded-md bg-muted p-4 overflow-auto">
        <pre className="text-xs"><code>{code || "Loading..."}</code></pre>
      </div>
    </div>
  )
}

function GuidePanel() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">💡 Extending this Template</h3>
      <ol className="list-decimal list-inside space-y-2 text-sm">
        <li><strong>Backend:</strong> Add endpoints in <code className="bg-muted px-1 py-0.5 rounded text-xs">backend/main.py</code> using <code className="bg-muted px-1 py-0.5 rounded text-xs">databricks-sdk</code>.</li>
        <li><strong>Frontend:</strong> Create React components in <code className="bg-muted px-1 py-0.5 rounded text-xs">app/</code> to fetch data.</li>
        <li><strong>Infrastructure:</strong> Define resources in <code className="bg-muted px-1 py-0.5 rounded text-xs">databricks.yml</code>.</li>
      </ol>
      <p className="text-sm text-muted-foreground mt-4">
        Run <code className="bg-muted px-1 py-0.5 rounded text-xs">npm run dev</code> to test locally, and <code className="bg-muted px-1 py-0.5 rounded text-xs">databricks bundle deploy</code> to deploy.
      </p>
    </div>
  )
}

function InspirationPanel() {
  return (
    <div className="rounded-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-primary/10 p-3">
          <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Need More Inspiration?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Check out the{" "}
            <a href="https://apps-cookbook.dev/gallery" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
              Databricks Apps Gallery
            </a>
            {" "}featuring reference applications created by our amazing{" "}
            <a href="http://go/apps-sme" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
              Apps-SME
            </a>
            {" "}group and community contributors!
          </p>
          <a 
            href="https://apps-cookbook.dev/gallery" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Explore Gallery
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">🏗️ FE Builder Base Template</h1>
        <p className="text-muted-foreground mt-2">FE Builder Project Starter & Field Engineering App Scaffold</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <DataPanel />
        <CodePanel />
      </div>
      <GuidePanel />
      <InspirationPanel />
    </div>
  )
}
