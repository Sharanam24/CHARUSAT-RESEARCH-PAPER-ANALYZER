"""
Data Models for CHARUSAT Research Analyzer
Defines Pydantic models for request/response validation
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime


class Author(BaseModel):
    """Author information model"""
    name: str
    affiliation: Optional[str] = None


class Paper(BaseModel):
    """Research paper model"""
    paper_id: Optional[str] = Field(None, alias="_id")
    title: str
    authors: List[Author]
    affiliations: List[str] = []
    abstract: Optional[str] = None
    year: int
    venue: Optional[str] = None  # Journal or Conference name
    doi: Optional[str] = None
    source: str  # "Semantic Scholar", "CrossRef", "Manual"
    
    class Config:
        populate_by_name = True


class PaperResponse(BaseModel):
    """Response model for paper data"""
    id: str
    title: str
    authors: List[str]  # Simplified to just names
    year: int
    journal: str
    department: str
    abstract: Optional[str] = None
    keywords: List[str] = []
    doi: Optional[str] = None


class AuthorGroup(BaseModel):
    """Model for grouped duplicate authors"""
    groupId: str
    primaryName: str
    variations: List[Dict]  # [{name: str, similarityScore: float}]
    status: str = "Identified as same author"
    
    class Config:
        arbitrary_types_allowed = True


class DashboardStats(BaseModel):
    """Dashboard statistics model"""
    totalPapers: int
    totalAuthors: int
    totalDepartments: int


class AnalyticsData(BaseModel):
    """Analytics data model"""
    publicationsByYear: List[Dict]
    topDomains: List[Dict]
    departmentCounts: List[Dict]
    
    class Config:
        arbitrary_types_allowed = True


class FetchPapersRequest(BaseModel):
    """Request model for fetching papers"""
    query: str = "CHARUSAT"
    limit: int = 50
    source: str = "semantic_scholar"  # or "crossref"


class ErrorResponse(BaseModel):
    """Error response model"""
    error: str
    detail: Optional[str] = None
