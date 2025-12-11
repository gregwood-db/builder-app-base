# FE Builder Base Template

> **A ready-to-use FE Builder template for Next.js (Frontend) + Python FastAPI (Backend) applications.**

A clean starter template for building Full-Stack Databricks Apps with Next.js, React, and Python FastAPI.

## 📂 Project Structure
```
builder-stack-app-sample/
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Dashboard with tech specs, live API demo & code examples
│   ├── catalog/page.tsx   # Example data explorer page with instructions
│   └── globals.css        # Databricks theme colors
├── components/            # Reusable React components
│   ├── header.tsx         # Top header with user info & theme toggle
│   ├── sidebar-nav.tsx    # Left navigation sidebar with backend status
│   ├── layout-wrapper.tsx # Main layout structure
│   └── ui/                # shadcn/ui components (button, badge, etc.)
├── hooks/                 # Custom React hooks
│   └── useUserInfo.ts     # Fetch user info from backend
├── lib/                   # Utility functions
│   └── utils.ts           # Tailwind class merger
├── backend/               # Python FastAPI backend
│   └── main.py            # API endpoints (health, user-info, demo)
├── app.yaml              # Databricks Apps runtime config
├── databricks.yml        # Infrastructure configuration
└── requirements.txt      # Python dependencies
```

## 🚀 Quick Start

First, enter the app directory:
```bash
cd builder-stack-app-sample
```

### 1. Setup
```bash
pip install -r requirements.txt  # Backend dependencies
npm install                      # Frontend dependencies
```

### 2. Develop
**Development Mode (Recommended)** - Hot reload for UI & API:
```bash
# Terminal 1: Backend
uvicorn backend.main:app --reload --port 8000

# Terminal 2: Frontend
npm run dev
```
*   Frontend: `http://localhost:3000`
*   API Docs: `http://localhost:8000/docs`

**Simulate App Build** - Test built artifacts with Gunicorn:
```bash
npm run build                                           # Build Next.js app
gunicorn backend.main:app -w 4 \
  --worker-class uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000
```
Frontend files are exported to `backend/static/` directory.

## 📦 Deployment
This app is configured for **Databricks Apps**.
-   `app.yaml`: App runtime configuration
-   `databricks.yml`: Infrastructure resources

Ensure you are in the `builder-stack-app-sample` directory:
```bash
databricks bundle deploy -t dev
databricks bundle run main_app -t dev
```

## ✨ Features
- **Databricks Theme**: Light & dark mode with official Databricks colors
- **User Authentication**: Reads user info from HTTP headers (`X-Forwarded-Email`, `X-Forwarded-Preferred-Username`)
- **Sidebar Navigation**: Mobile-responsive sidebar with backend status indicator
- **Backend Integration**: FastAPI with health check, user info, and Databricks SDK examples
- **Live Demo**: Interactive Lakebase instances table with live data fetching & code view
- **shadcn/ui Components**: Pre-configured UI component library
- **Type Safety**: Full TypeScript support
- **Apps Gallery Link**: Direct link to Databricks Apps showcase for inspiration

## 💡 How to Extend
1.  **Add New Pages**: Create files in `app/` directory (e.g., `app/settings/page.tsx`)
2.  **Add Backend APIs**: Define new endpoints in `backend/main.py` using `databricks-sdk`
3.  **Customize Components**: Edit components in `components/` folder
4.  **Update Navigation**: Modify `navigationItems` in `components/sidebar-nav.tsx`
5.  **Infrastructure**: Define cloud resources in `databricks.yml`