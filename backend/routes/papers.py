"""
Papers API Routes
Handles all paper-related endpoints
"""

from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from models import PaperResponse, ErrorResponse, FetchPapersRequest
from database import db
from fetcher import PaperFetcher

router = APIRouter(prefix="/api/papers", tags=["Papers"])


@router.get("/", response_model=List[PaperResponse])
async def get_all_papers(limit: int = Query(100, ge=1, le=1000)):
    """
    Get all research papers
    
    Args:
        limit: Maximum number of papers to return (1-1000)
        
    Returns:
        List of papers
    """
    try:
        papers = await db.get_all_papers(limit=limit)
        
        # Transform to response format
        response = []
        for paper in papers:
            response.append(PaperResponse(
                id=paper.get('_id', ''),
                title=paper.get('title', 'Unknown'),
                authors=[a.get('name', 'Unknown') if isinstance(a, dict) else str(a) 
                        for a in paper.get('authors', [])],
                year=paper.get('year', 2023),
                journal=paper.get('venue', 'Unknown'),
                department=paper.get('department', 'Unknown'),
                abstract=paper.get('abstract'),
                keywords=paper.get('keywords', []),
                doi=paper.get('doi')
            ))
        
        return response
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching papers: {str(e)}")


@router.get("/search", response_model=List[PaperResponse])
async def search_papers(q: str = Query(..., min_length=1)):
    """
    Search papers by title, author, or year
    
    Args:
        q: Search query string
        
    Returns:
        List of matching papers
    """
    try:
        papers = await db.search_papers(q)
        
        # Transform to response format
        response = []
        for paper in papers:
            response.append(PaperResponse(
                id=paper.get('_id', ''),
                title=paper.get('title', 'Unknown'),
                authors=[a.get('name', 'Unknown') if isinstance(a, dict) else str(a) 
                        for a in paper.get('authors', [])],
                year=paper.get('year', 2023),
                journal=paper.get('venue', 'Unknown'),
                department=paper.get('department', 'Unknown'),
                abstract=paper.get('abstract'),
                keywords=paper.get('keywords', []),
                doi=paper.get('doi')
            ))
        
        return response
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching papers: {str(e)}")


@router.get("/filter", response_model=List[PaperResponse])
async def filter_papers(
    year: Optional[str] = None,
    department: Optional[str] = None,
    author: Optional[str] = None
):
    """
    Filter papers by year, department, and/or author
    
    Args:
        year: Publication year
        department: Department name
        author: Author name
        
    Returns:
        List of filtered papers
    """
    try:
        papers = await db.filter_papers(year=year, department=department, author=author)
        
        # Transform to response format
        response = []
        for paper in papers:
            response.append(PaperResponse(
                id=paper.get('_id', ''),
                title=paper.get('title', 'Unknown'),
                authors=[a.get('name', 'Unknown') if isinstance(a, dict) else str(a) 
                        for a in paper.get('authors', [])],
                year=paper.get('year', 2023),
                journal=paper.get('venue', 'Unknown'),
                department=paper.get('department', 'Unknown'),
                abstract=paper.get('abstract'),
                keywords=paper.get('keywords', []),
                doi=paper.get('doi')
            ))
        
        return response
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error filtering papers: {str(e)}")


@router.get("/{paper_id}", response_model=PaperResponse)
async def get_paper_by_id(paper_id: str):
    """
    Get a single paper by ID
    
    Args:
        paper_id: Paper ID
        
    Returns:
        Paper details
    """
    try:
        paper = await db.get_paper_by_id(paper_id)
        
        if not paper:
            raise HTTPException(status_code=404, detail="Paper not found")
        
        return PaperResponse(
            id=paper.get('_id', ''),
            title=paper.get('title', 'Unknown'),
            authors=[a.get('name', 'Unknown') if isinstance(a, dict) else str(a) 
                    for a in paper.get('authors', [])],
            year=paper.get('year', 2023),
            journal=paper.get('venue', 'Unknown'),
            department=paper.get('department', 'Unknown'),
            abstract=paper.get('abstract'),
            keywords=paper.get('keywords', []),
            doi=paper.get('doi')
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching paper: {str(e)}")


@router.post("/fetch", response_model=dict)
async def fetch_papers_from_api(request: FetchPapersRequest):
    """
    Fetch papers from external APIs (Semantic Scholar or CrossRef)
    and insert them into the database
    
    Args:
        request: Fetch request with query, limit, and source
        
    Returns:
        Status message with count of fetched papers
    """
    try:
        fetcher = PaperFetcher()
        
        # Fetch papers based on source
        if request.source == "semantic_scholar":
            papers = fetcher.fetch_from_semantic_scholar(
                query=request.query,
                limit=request.limit
            )
        elif request.source == "crossref":
            papers = fetcher.fetch_from_crossref(
                query=request.query,
                limit=request.limit
            )
        else:
            raise HTTPException(
                status_code=400,
                detail="Invalid source. Use 'semantic_scholar' or 'crossref'"
            )
        
        if not papers:
            return {
                "status": "success",
                "message": "No papers found",
                "count": 0
            }
        
        # Insert papers into database
        paper_ids = await db.insert_papers_bulk(papers)
        
        return {
            "status": "success",
            "message": f"Successfully fetched and inserted {len(paper_ids)} papers",
            "count": len(paper_ids),
            "source": request.source
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching papers: {str(e)}")
