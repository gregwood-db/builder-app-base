// Main dashboard page with data panel, code examples, and guide
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ArrowRight, 
  Database, 
  Terminal,
  Layout, 
  Server, 
  Cloud, 
  Shield, 
  Zap, 
  Cpu, 
  Palette, 
  Container 
} from "lucide-react"

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
    <Card className="border-muted bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
           <Database className="h-5 w-5 text-primary" />
           <CardTitle className="text-lg font-semibold">Lakebase Console</CardTitle>
        </div>
        <Button onClick={loadData} disabled={state.loading} size="sm" variant="outline" className="h-8">
          {state.loading ? "Loading..." : "List Instances"}
        </Button>
      </CardHeader>
      <CardContent>
        {state.error && <div className="bg-destructive/10 text-destructive rounded-md p-3 mb-4 text-sm font-mono">⚠️ {state.error}</div>}

        {state.data.length > 0 ? (
          <div className="rounded-md border bg-muted/20">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left p-3 font-semibold font-mono text-xs uppercase text-muted-foreground">Name</th>
                  <th className="text-left p-3 font-semibold font-mono text-xs uppercase text-muted-foreground">State</th>
                  <th className="text-left p-3 font-semibold font-mono text-xs uppercase text-muted-foreground">Capacity</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((db, i) => (
                  <tr key={i} className="border-t last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-3 font-medium font-mono text-xs">{db.name}</td>
                    <td className="p-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${
                        db.state === "RUNNING" ? "bg-green-500/15 text-green-700 dark:text-green-400" : "bg-muted text-muted-foreground"
                      }`}>
                        {db.state || "UNKNOWN"}
                      </span>
                    </td>
                    <td className="p-3 text-muted-foreground font-mono text-xs">{db.capacity || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : !state.loading && !state.error ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground gap-2 border-2 border-dashed rounded-lg border-muted">
            <Database className="h-8 w-8 opacity-20" />
            <p className="text-sm">No instances loaded. Click to list.</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

function CodePanel() {
  const code = useCodeSample()
  return (
    <Card className="border-muted bg-[#1e1e1e] text-white shadow-sm overflow-hidden">
      <CardHeader className="pb-2 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-green-400" />
          <CardTitle className="text-sm font-mono">backend/main.py</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 overflow-auto max-h-[300px] font-mono text-xs leading-relaxed opacity-90">
          <pre><code>{code || "# Loading backend implementation..."}</code></pre>
        </div>
      </CardContent>
    </Card>
  )
}

function TechSpecs() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
           Technical Specifications
        </h2>
        <div className="bg-muted/30 border-l-4 border-primary rounded-r-lg p-6 my-6">
          <p className="text-foreground/90 text-lg leading-relaxed">
            This template implements a robust architecture combining the interactivity of <strong>Next.js (React)</strong> with the data processing power of <strong>FastAPI (Python)</strong>. Designed for Databricks Apps, it offers a <strong>verified starting point</strong> for building internal tools and field engineering prototypes, integrating modern best practices with enterprise platform capabilities.
          </p>
        </div>
      </div>

      {/* Architecture Overview - Pipeline Flow */}
      <div className="relative rounded-xl border bg-gradient-to-br from-card to-muted/20 p-8 shadow-sm overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Cloud className="w-64 h-64" />
        </div>
        
        <h3 className="text-lg font-semibold mb-8 flex items-center gap-2 relative z-10">
          <Cloud className="h-5 w-5 text-primary" />
          Architecture Pipeline
        </h3>

        <div className="flex flex-col md:flex-row gap-8 items-center justify-between relative z-10 max-w-4xl mx-auto">
          {/* Node 1 */}
          <div className="flex-1 w-full group">
            <div className="bg-background border-2 border-muted group-hover:border-primary/50 transition-colors rounded-xl p-6 text-center shadow-sm relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Frontend</div>
              <Layout className="h-10 w-10 mx-auto mb-3 text-blue-500" />
              <div className="font-bold text-lg">Next.js</div>
              <div className="text-muted-foreground text-xs mt-1">Static Export to backend/static</div>
            </div>
          </div>

          {/* Connector 1 */}
          <div className="hidden md:flex flex-col items-center text-muted-foreground/40">
            <div className="h-0.5 w-12 bg-current relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 bg-current rounded-full" />
            </div>
          </div>
          <div className="md:hidden text-muted-foreground/40 rotate-90 my-[-10px]">
            <ArrowRight className="h-6 w-6" />
          </div>

          {/* Node 2 */}
          <div className="flex-1 w-full group">
             <div className="bg-background border-2 border-muted group-hover:border-primary/50 transition-colors rounded-xl p-6 text-center shadow-sm relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Backend</div>
              <Server className="h-10 w-10 mx-auto mb-3 text-green-500" />
              <div className="font-bold text-lg">FastAPI</div>
              <div className="text-muted-foreground text-xs mt-1">API & SDK</div>
            </div>
          </div>

          {/* Connector 2 */}
          <div className="hidden md:flex flex-col items-center text-muted-foreground/40">
             <div className="h-0.5 w-12 bg-current relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 bg-current rounded-full" />
            </div>
          </div>
          <div className="md:hidden text-muted-foreground/40 rotate-90 my-[-10px]">
            <ArrowRight className="h-6 w-6" />
          </div>

          {/* Node 3 */}
          <div className="flex-1 w-full group">
             <div className="bg-background border-2 border-muted group-hover:border-primary/50 transition-colors rounded-xl p-6 text-center shadow-sm relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Platform</div>
              <Cloud className="h-10 w-10 mx-auto mb-3 text-orange-500" />
              <div className="font-bold text-lg">Databricks Apps</div>
              <div className="text-muted-foreground text-xs mt-1">Hosting & Auth</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack - Bento Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Frontend Stack */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Palette className="h-5 w-5 text-purple-500" />
              Frontend Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-2" />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">Core Framework</span>
                  <span className="text-xs text-muted-foreground">Next.js 15.5+ (App Router), React 18.2, TypeScript 5.7</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-2" />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">UI System</span>
                  <span className="text-xs text-muted-foreground">Tailwind CSS 3.4, shadcn/ui, Lucide React</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-2" />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">State & Viz</span>
                  <span className="text-xs text-muted-foreground">SWR 2.2, Chart.js</span>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Backend Stack */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Cpu className="h-5 w-5 text-blue-500" />
              Backend Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
             <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2" />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">Server Framework</span>
                  <span className="text-xs text-muted-foreground">FastAPI 0.124+, Uvicorn/Gunicorn</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2" />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">Data Processing</span>
                  <span className="text-xs text-muted-foreground">Pandas 2.2.3+</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2" />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">Databricks Integration</span>
                  <span className="text-xs text-muted-foreground">Official SDK (databricks-sdk), WorkspaceClient</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2" />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">API Features</span>
                  <span className="text-xs text-muted-foreground">Auto-docs (Swagger), Header-based Auth</span>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Infrastructure */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Container className="h-5 w-5 text-orange-500" />
              Infrastructure
            </CardTitle>
          </CardHeader>
          <CardContent>
             <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-2" />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">Infrastructure as Code</span>
                  <span className="text-xs text-muted-foreground">Databricks Asset Bundles (DABs)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-2" />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">Deployment Strategy</span>
                  <span className="text-xs text-muted-foreground">Multi-env (dev/staging/prod)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-2" />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">Resource Management</span>
                  <span className="text-xs text-muted-foreground">Lakebase (Postgres), Unity Catalog Sync</span>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Key Features */}
      <div className="grid sm:grid-cols-3 gap-6 pt-4">
        <Card className="bg-muted/30 border-none shadow-none">
          <CardContent className="pt-6">
            <div className="mb-4 bg-background w-10 h-10 rounded-lg flex items-center justify-center border shadow-sm">
               <Shield className="h-5 w-5 text-primary" />
            </div>
            <h4 className="font-semibold text-sm mb-1">Enterprise Security</h4>
            <p className="text-xs text-muted-foreground">Zero-config authentication via Databricks Apps Proxy Headers.</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/30 border-none shadow-none">
          <CardContent className="pt-6">
            <div className="mb-4 bg-background w-10 h-10 rounded-lg flex items-center justify-center border shadow-sm">
               <Zap className="h-5 w-5 text-primary" />
            </div>
            <h4 className="font-semibold text-sm mb-1">Developer Experience</h4>
            <p className="text-xs text-muted-foreground">Hot reload (Frontend 3000, Backend 8000) with local dev fallback.</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/30 border-none shadow-none">
          <CardContent className="pt-6">
            <div className="mb-4 bg-background w-10 h-10 rounded-lg flex items-center justify-center border shadow-sm">
               <Terminal className="h-5 w-5 text-primary" />
            </div>
            <h4 className="font-semibold text-sm mb-1">Type Safety</h4>
            <p className="text-xs text-muted-foreground">End-to-end TypeScript strict mode for robust development.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function InspirationPanel() {
  return (
    <div className="w-full bg-primary text-primary-foreground py-12 px-6 rounded-xl mt-16 text-center">
      <h3 className="text-2xl font-bold mb-3">
        Ready to Build More?
      </h3>
      <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
        Explore the Databricks Apps Gallery for reference architectures, community examples, and advanced patterns.
      </p>
      <Button asChild size="lg" variant="secondary" className="font-semibold">
        <a 
          href="https://apps-cookbook.dev/gallery" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          Explore Gallery
          <ArrowRight className="h-4 w-4" />
        </a>
      </Button>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-20">
        
        {/* Hero Section */}
        <div className="relative pt-20 pb-12 text-center">
          <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          
          <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-medium border-primary/20 bg-primary/5 text-primary rounded-full">
            v0.1.0 Enterprise Template
          </Badge>
          
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-6">
            FE Builder Stack <span className="text-primary">Template</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            A full-stack Databricks application template designed for Field Engineers to rapidly build scalable, enterprise-grade solutions.
          </p>
        </div>
        {/* Tech Specs Section */}
        <section id="specs" className="scroll-mt-20">
          <TechSpecs />
        </section>
        
        {/* Interactive Demo Section */}
        <section id="demo" className="scroll-mt-20">
          <div className="relative rounded-2xl border bg-muted/30 p-8 lg:p-12">
            <div className="flex flex-col gap-2 mb-8">
              <div className="flex items-center gap-2">
                 <Terminal className="h-6 w-6 text-primary" />
                 <h2 className="text-2xl font-bold tracking-tight">API Sample</h2>
              </div>
              <p className="text-muted-foreground">
                Live interaction with the backend API and Lakebase database.
              </p>
            </div>
            
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Database Interface</div>
                <DataPanel />
              </div>
              <div className="space-y-4">
                 <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Implementation Code</div>
                <CodePanel />
              </div>
            </div>
          </div>
        </section>

        <InspirationPanel />
      </div>
    </main>
  )
}