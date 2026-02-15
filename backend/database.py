"""
Database Module for CHARUSAT Research Analyzer
Handles MongoDB connection and CRUD operations
"""

from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from typing import List, Dict, Optional
import os
from datetime import datetime


class Database:
    """MongoDB database handler"""
    
    def __init__(self):
        """Initialize database connection"""
        self.mongodb_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
        self.database_name = os.getenv("DATABASE_NAME", "charusat_research")
        self.client: Optional[AsyncIOMotorClient] = None
        self.db = None
        
    async def connect(self):
        """Connect to MongoDB"""
        try:
            self.client = AsyncIOMotorClient(self.mongodb_url)
            self.db = self.client[self.database_name]
            # Test connection
            await self.client.admin.command('ping')
            print(f"✓ Connected to MongoDB: {self.database_name}")
        except Exception as e:
            print(f"✗ MongoDB connection failed: {e}")
            raise
    
    async def close(self):
        """Close MongoDB connection"""
        if self.client:
            self.client.close()
            print("✓ MongoDB connection closed")
    
    # ==================== PAPERS COLLECTION ====================
    
    async def insert_paper(self, paper: Dict) -> str:
        """
        Insert a single paper into the database
        
        Args:
            paper: Paper document dictionary
            
        Returns:
            Inserted paper ID
        """
        paper['created_at'] = datetime.utcnow()
        result = await self.db.papers.insert_one(paper)
        return str(result.inserted_id)
    
    async def insert_papers_bulk(self, papers: List[Dict]) -> List[str]:
        """
        Insert multiple papers at once
        
        Args:
            papers: List of paper documents
            
        Returns:
            List of inserted paper IDs
        """
        for paper in papers:
            paper['created_at'] = datetime.utcnow()
        
        result = await self.db.papers.insert_many(papers)
        return [str(id) for id in result.inserted_ids]
    
    async def get_all_papers(self, limit: int = 100) -> List[Dict]:
        """
        Fetch all papers from database
        
        Args:
            limit: Maximum number of papers to return
            
        Returns:
            List of paper documents
        """
        cursor = self.db.papers.find().limit(limit)
        papers = await cursor.to_list(length=limit)
        
        # Convert ObjectId to string
        for paper in papers:
            paper['_id'] = str(paper['_id'])
        
        return papers
    
    async def get_paper_by_id(self, paper_id: str) -> Optional[Dict]:
        """
        Fetch a single paper by ID
        
        Args:
            paper_id: Paper ID
            
        Returns:
            Paper document or None
        """
        from bson import ObjectId
        
        try:
            paper = await self.db.papers.find_one({"_id": ObjectId(paper_id)})
            if paper:
                paper['_id'] = str(paper['_id'])
            return paper
        except:
            return None
    
    async def search_papers(self, query: str) -> List[Dict]:
        """
        Search papers by title, author, or year
        
        Args:
            query: Search query string
            
        Returns:
            List of matching papers
        """
        # Create text search or regex search
        search_filter = {
            "$or": [
                {"title": {"$regex": query, "$options": "i"}},
                {"authors.name": {"$regex": query, "$options": "i"}},
                {"year": {"$regex": query, "$options": "i"}}
            ]
        }
        
        cursor = self.db.papers.find(search_filter).limit(100)
        papers = await cursor.to_list(length=100)
        
        for paper in papers:
            paper['_id'] = str(paper['_id'])
        
        return papers
    
    async def filter_papers(self, year: Optional[str] = None, 
                           department: Optional[str] = None,
                           author: Optional[str] = None) -> List[Dict]:
        """
        Filter papers by year, department, and/or author
        
        Args:
            year: Publication year
            department: Department name
            author: Author name
            
        Returns:
            List of filtered papers
        """
        filter_query = {}
        
        if year:
            filter_query['year'] = int(year)
        
        if department:
            filter_query['department'] = department
        
        if author:
            filter_query['authors.name'] = author
        
        cursor = self.db.papers.find(filter_query).limit(100)
        papers = await cursor.to_list(length=100)
        
        for paper in papers:
            paper['_id'] = str(paper['_id'])
        
        return papers
    
    # ==================== AUTHORS COLLECTION ====================
    
    async def insert_author(self, author: Dict) -> str:
        """
        Insert an author into the database
        
        Args:
            author: Author document
            
        Returns:
            Inserted author ID
        """
        result = await self.db.authors.insert_one(author)
        return str(result.inserted_id)
    
    async def get_all_authors(self) -> List[Dict]:
        """
        Fetch all authors from database
        
        Returns:
            List of author documents
        """
        cursor = self.db.authors.find()
        authors = await cursor.to_list(length=1000)
        
        for author in authors:
            author['_id'] = str(author['_id'])
        
        return authors
    
    async def get_unique_author_names(self) -> List[str]:
        """
        Get all unique author names from papers collection
        
        Returns:
            List of unique author names
        """
        pipeline = [
            {"$unwind": "$authors"},
            {"$group": {"_id": "$authors.name"}},
            {"$project": {"name": "$_id", "_id": 0}}
        ]
        
        cursor = self.db.papers.aggregate(pipeline)
        results = await cursor.to_list(length=10000)
        
        return [r['name'] for r in results if 'name' in r]
    
    # ==================== ANALYTICS QUERIES ====================
    
    async def get_papers_by_year(self) -> List[Dict]:
        """
        Get paper count grouped by year
        
        Returns:
            List of {year, count} dictionaries
        """
        pipeline = [
            {"$group": {"_id": "$year", "count": {"$sum": 1}}},
            {"$sort": {"_id": 1}},
            {"$project": {"year": "$_id", "count": 1, "_id": 0}}
        ]
        
        cursor = self.db.papers.aggregate(pipeline)
        return await cursor.to_list(length=100)
    
    async def get_top_authors(self, limit: int = 10) -> List[Dict]:
        """
        Get top authors by publication count
        
        Args:
            limit: Number of top authors to return
            
        Returns:
            List of {author, count} dictionaries
        """
        pipeline = [
            {"$unwind": "$authors"},
            {"$group": {"_id": "$authors.name", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": limit},
            {"$project": {"author": "$_id", "count": 1, "_id": 0}}
        ]
        
        cursor = self.db.papers.aggregate(pipeline)
        return await cursor.to_list(length=limit)
    
    async def get_department_counts(self) -> List[Dict]:
        """
        Get paper count grouped by department
        
        Returns:
            List of {department, count} dictionaries
        """
        pipeline = [
            {"$group": {"_id": "$department", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$project": {"department": "$_id", "count": 1, "_id": 0}}
        ]
        
        cursor = self.db.papers.aggregate(pipeline)
        return await cursor.to_list(length=100)
    
    async def get_years_list(self) -> List[int]:
        """Get list of unique years"""
        years = await self.db.papers.distinct("year")
        return sorted(years)
    
    async def get_departments_list(self) -> List[str]:
        """Get list of unique departments"""
        return await self.db.papers.distinct("department")


# Global database instance
db = Database()


# ==================== SAMPLE DATA INSERTION ====================

async def insert_sample_data():
    """
    Insert sample research papers for testing
    This function demonstrates how to populate the database
    """
    sample_papers = [
        {
            "title": "Machine Learning Applications in Healthcare",
            "authors": [
                {"name": "Dr. John Smith", "affiliation": "CHARUSAT University"},
                {"name": "Dr. Jane Doe", "affiliation": "CHARUSAT University"}
            ],
            "affiliations": ["CHARUSAT University"],
            "abstract": "This paper explores the application of machine learning algorithms in healthcare diagnostics.",
            "year": 2023,
            "venue": "International Journal of AI",
            "department": "Computer Science",
            "doi": "10.1234/ijai.2023.001",
            "source": "Manual",
            "keywords": ["Machine Learning", "Healthcare", "AI"]
        },
        {
            "title": "Blockchain Technology in Supply Chain Management",
            "authors": [
                {"name": "Prof. Alice Johnson", "affiliation": "CHARUSAT University"},
                {"name": "Dr. Bob Williams", "affiliation": "CHARUSAT University"}
            ],
            "affiliations": ["CHARUSAT University"],
            "abstract": "An analysis of blockchain implementation in modern supply chain systems.",
            "year": 2023,
            "venue": "Journal of Information Technology",
            "department": "Information Technology",
            "doi": "10.1234/jit.2023.002",
            "source": "Manual",
            "keywords": ["Blockchain", "Supply Chain", "Technology"]
        },
        {
            "title": "IoT-Based Smart Home Automation Systems",
            "authors": [
                {"name": "Dr. J. Smith", "affiliation": "CHARUSAT University"},
                {"name": "Prof. Carol Davis", "affiliation": "CHARUSAT University"}
            ],
            "affiliations": ["CHARUSAT University"],
            "abstract": "Design and implementation of IoT-based smart home automation.",
            "year": 2022,
            "venue": "IEEE Transactions on Electronics",
            "department": "Electronics",
            "doi": "10.1234/ieee.2022.003",
            "source": "Manual",
            "keywords": ["IoT", "Smart Home", "Automation"]
        },
        {
            "title": "Renewable Energy Systems for Sustainable Development",
            "authors": [
                {"name": "Dr. David Brown", "affiliation": "CHARUSAT University"},
                {"name": "Dr. Emma Wilson", "affiliation": "CHARUSAT University"}
            ],
            "affiliations": ["CHARUSAT University"],
            "abstract": "Study of renewable energy systems and their impact on sustainability.",
            "year": 2022,
            "venue": "Journal of Mechanical Engineering",
            "department": "Mechanical Engineering",
            "doi": "10.1234/jme.2022.004",
            "source": "Manual",
            "keywords": ["Renewable Energy", "Sustainability", "Engineering"]
        },
        {
            "title": "Deep Learning for Natural Language Processing",
            "authors": [
                {"name": "John Smith", "affiliation": "CHARUSAT University"},
                {"name": "Prof. Frank Miller", "affiliation": "CHARUSAT University"}
            ],
            "affiliations": ["CHARUSAT University"],
            "abstract": "Comprehensive survey of deep learning techniques in NLP.",
            "year": 2021,
            "venue": "ACM Computing Surveys",
            "department": "Computer Science",
            "doi": "10.1234/acm.2021.005",
            "source": "Manual",
            "keywords": ["Deep Learning", "NLP", "AI"]
        },
        {
            "title": "Cybersecurity Threats in Cloud Computing",
            "authors": [
                {"name": "Dr. Grace Lee", "affiliation": "CHARUSAT University"},
                {"name": "Dr. Henry Taylor", "affiliation": "CHARUSAT University"}
            ],
            "affiliations": ["CHARUSAT University"],
            "abstract": "Analysis of security threats and mitigation strategies in cloud environments.",
            "year": 2021,
            "venue": "Journal of Information Technology",
            "department": "Information Technology",
            "doi": "10.1234/jit.2021.006",
            "source": "Manual",
            "keywords": ["Cybersecurity", "Cloud Computing", "Security"]
        }
    ]
    
    try:
        ids = await db.insert_papers_bulk(sample_papers)
        print(f"✓ Inserted {len(ids)} sample papers")
        return ids
    except Exception as e:
        print(f"✗ Error inserting sample data: {e}")
        return []
