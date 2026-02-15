"""
Authors API Routes
Handles author-related endpoints including duplicate detection
"""

from fastapi import APIRouter, HTTPException
from typing import List
from models import AuthorGroup
from database import db
from author_similarity import AuthorSimilarityDetector

router = APIRouter(prefix="/api/authors", tags=["Authors"])


@router.get("/", response_model=List[dict])
async def get_all_authors():
    """
    Get all unique authors from papers
    
    Returns:
        List of authors with their details
    """
    try:
        # Get unique author names from papers
        author_names = await db.get_unique_author_names()
        
        # Count papers per author
        papers = await db.get_all_papers(limit=1000)
        author_paper_count = {}
        
        for paper in papers:
            for author in paper.get('authors', []):
                name = author.get('name', 'Unknown') if isinstance(author, dict) else str(author)
                author_paper_count[name] = author_paper_count.get(name, 0) + 1
        
        # Build response
        response = []
        for i, name in enumerate(author_names):
            response.append({
                "id": str(i + 1),
                "name": name,
                "department": "Unknown",  # Would need to infer from papers
                "paperCount": author_paper_count.get(name, 0)
            })
        
        return response
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching authors: {str(e)}")


@router.get("/duplicates", response_model=List[AuthorGroup])
async def detect_duplicate_authors():
    """
    Detect duplicate authors using AI/ML techniques
    
    This endpoint uses:
    - Text preprocessing (normalization)
    - TF-IDF vectorization
    - Cosine similarity
    - Levenshtein distance
    
    Returns:
        List of author groups with similarity scores
    """
    try:
        # Get all unique author names
        author_names = await db.get_unique_author_names()
        
        if not author_names:
            return []
        
        # Initialize AI/ML detector
        detector = AuthorSimilarityDetector(similarity_threshold=0.85)
        
        # Detect duplicates
        groups = detector.detect_duplicates(author_names)
        
        # Convert to response format
        response = []
        for group in groups:
            response.append(AuthorGroup(
                groupId=group['groupId'],
                primaryName=group['primaryName'],
                variations=group['variations'],
                status=group['status']
            ))
        
        return response
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error detecting duplicates: {str(e)}")


@router.get("/groups", response_model=List[AuthorGroup])
async def get_author_groups():
    """
    Alias for /duplicates endpoint (for frontend compatibility)
    """
    return await detect_duplicate_authors()
