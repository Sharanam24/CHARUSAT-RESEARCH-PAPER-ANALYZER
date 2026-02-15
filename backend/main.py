"""
Main FastAPI Application for CHARUSAT Research Analyzer
Entry point for the backend server
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn

# Import database
from database import db, insert_sample_data

# Import routes
from routes import papers, authors, analytics


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan events
    Handles startup and shutdown operations
    """
    # Startup: Connect to database
    print("\n🚀 Starting CHARUSAT Research Analyzer Backend...")
    await db.connect()
    
    # Insert sample data if database is empty
    papers_count = len(await db.get_all_papers(limit=1))
    if papers_count == 0:
        print("📝 Database is empty. Inserting sample data...")
        await insert_sample_data()
    else:
        print(f"✓ Database has {papers_count}+ papers")
    
    print("✓ Backend ready!\n")
    
    yield
    
    # Shutdown: Close database connection
    print("\n🛑 Shutting down...")
    await db.close()


# Initialize FastAPI app
app = FastAPI(
    title="CHARUSAT Research Analyzer API",
    description="Backend API for analyzing research papers from CHARUSAT University",
    version="1.0.0",
    lifespan=lifespan
)


# Configure CORS (Cross-Origin Resource Sharing)
# This allows the frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Register API routes
app.include_router(papers.router)
app.include_router(authors.router)
app.include_router(analytics.router)


# Root endpoint
@app.get("/")
async def root():
    """
    Root endpoint - API health check
    """
    return {
        "message": "CHARUSAT Research Analyzer API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
        "endpoints": {
            "papers": "/api/papers",
            "authors": "/api/authors",
            "analytics": "/api/analytics",
            "dashboard": "/api/dashboard/stats"
        }
    }


# Health check endpoint
@app.get("/health")
async def health_check():
    """
    Health check endpoint for monitoring
    """
    return {"status": "healthy"}


# Run the application
if __name__ == "__main__":
    """
    Run the FastAPI server using Uvicorn
    
    Usage:
        python main.py
    
    Or:
        uvicorn main:app --reload
    """
    uvicorn.run(
        "main:app",
        host="0.0.0.0",  # Listen on all network interfaces
        port=8000,       # Port number
        reload=True      # Auto-reload on code changes (development only)
    )
