# FastAPI backend with user info, health check, and Databricks SDK integration
import os
import logging
from typing import Optional
from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from databricks.sdk import WorkspaceClient
from databricks.sdk.service.sql import StatementState

# --- Logging Setup ---
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Builder Stack Template App")

# --- Data Models ---
class UserInfoResponse(BaseModel):
    """Response model for user information endpoint."""
    email: Optional[str] = None
    username: Optional[str] = None

# --- API Routes ---

# User info endpoint - extracts user from headers
@app.get("/api/user-info", response_model=UserInfoResponse)
async def get_user_info(request: Request):
    """Get user information from request headers."""
    logger.info("Received request for user information")
    
    # Extract user info from headers (set by Databricks Apps proxy)
    email = request.headers.get("X-Forwarded-Email")
    username = request.headers.get("X-Forwarded-Preferred-Username")
    
    logger.info(f"Headers - Email: {email}, Username: {username}")
    
    # Default to local_user for development
    if not email and not username:
        logger.info("Headers not found, using default local_user")
        email = "local_user@example.com"
        username = "local_user"
    
    return UserInfoResponse(
        email=email,
        username=username
    )

# Simple hello endpoint
@app.get("/api/hello")
async def hello():
    return {"message": "Hello from FastAPI!"}

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

# Get code sample for frontend display
@app.get("/api/code-sample")
async def get_code_sample():
    return {
        "code": """# Backend Logic (Python / Databricks SDK)
from databricks.sdk import WorkspaceClient

def list_lakebase_instances():
    # 1. Initialize SDK (Auto-Auth inside Databricks Apps)
    w = WorkspaceClient()
    
    # 2. List Database Instances (Lakebase)
    # Correct service: w.database_instances
    instances_iter = w.database.list_database_instances()
    
    # 3. Collect first 10 results
    results = []
    for db in instances_iter:
        results.append(db.as_dict())
        if len(results) >= 10: break
            
    return results
"""
    }

# Demo: List Database Instances via SDK
@app.get("/api/lakebase-instance-info")
async def list_database_instances():
    logger.info("Listing database instances...")
    try:
        w = WorkspaceClient()
        
        # List instances using the SDK
        # Note: The service is accessed via w.database_instances, not w.database
        instances_iter = w.database.list_database_instances()
        
        results = []
        # Iterate and limit to 10
        for i, db in enumerate(instances_iter):
            if i >= 10: break
            results.append(db.as_dict())
            
        logger.info(f"Found {len(results)} instances.")
        return {"data": results}
        
    except Exception as e:
        logger.error(f"Error listing databases: {e}")
        return {"error": str(e), "fallback_message": "Failed to list database instances."}

# --- Static Files Setup ---
static_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")
os.makedirs(static_dir, exist_ok=True)

app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")

# --- Catch-all for React Routes ---
@app.get("/{full_path:path}")
async def serve_react(full_path: str):
    index_html = os.path.join(static_dir, "index.html")
    if os.path.exists(index_html):
        return FileResponse(index_html)
    raise HTTPException(status_code=404, detail="Frontend not built.")
