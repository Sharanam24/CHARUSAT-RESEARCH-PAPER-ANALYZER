"""
Analytics API Routes
Provides statistical analysis and insights
"""

from fastapi import APIRouter, HTTPException
from typing import List, Dict
from models import AnalyticsData, DashboardStats
from database import db
from analytics import ResearchAnalytics

router = APIRouter(prefix="/api", tags=["Analytics"])


@router.get("/dashboard/stats", response_model=DashboardStats)
async def get_dashboard_stats():
    """
    Get dashboard statistics
    
    Returns:
        Total papers, authors, and departments count
    """
    try:
        papers = await db.get_all_papers(limit=10000)
        
        # Count unique authors
        unique_authors = set()
        for paper in papers:
            for author in paper.get('authors', []):
                name = author.get('name', '') if isinstance(author, dict) else str(author)
                if name:
                    unique_authors.add(name)
        
        # Count unique departments
        unique_departments = set(
            paper.get('department', 'Unknown')
            for paper in papers
        )
        
        return DashboardStats(
            totalPapers=len(papers),
            totalAuthors=len(unique_authors),
            totalDepartments=len(unique_departments)
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching dashboard stats: {str(e)}")


@router.get("/analytics", response_model=AnalyticsData)
async def get_analytics_data():
    """
    Get comprehensive analytics data
    
    Returns:
        Publications by year, top domains, and department counts
    """
    try:
        papers = await db.get_all_papers(limit=10000)
        
        # Initialize analytics engine
        analytics = ResearchAnalytics(papers)
        
        # Get analytics data
        publications_by_year = analytics.get_publications_by_year()
        top_domains = analytics.get_research_domains()
        department_counts = analytics.get_department_counts()
        
        return AnalyticsData(
            publicationsByYear=publications_by_year,
            topDomains=top_domains,
            departmentCounts=department_counts
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching analytics: {str(e)}")


@router.get("/analytics/summary", response_model=Dict)
async def get_analytics_summary():
    """
    Get summary statistics
    
    Returns:
        Comprehensive summary of research data
    """
    try:
        papers = await db.get_all_papers(limit=10000)
        
        analytics = ResearchAnalytics(papers)
        summary = analytics.get_summary_statistics()
        
        # Add additional analytics
        summary['publicationsByYear'] = analytics.get_publications_by_year()
        summary['topAuthors'] = analytics.get_top_authors(limit=5)
        summary['departmentCounts'] = analytics.get_department_counts()
        summary['topKeywords'] = analytics.extract_keywords_from_abstracts(top_n=10)
        
        return summary
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching summary: {str(e)}")


@router.get("/filters/years", response_model=List[int])
async def get_available_years():
    """
    Get list of available years for filtering
    
    Returns:
        List of years
    """
    try:
        years = await db.get_years_list()
        return years
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching years: {str(e)}")


@router.get("/filters/departments", response_model=List[str])
async def get_available_departments():
    """
    Get list of available departments for filtering
    
    Returns:
        List of department names
    """
    try:
        departments = await db.get_departments_list()
        return departments
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching departments: {str(e)}")
