"""
Data Collection Module for CHARUSAT Research Analyzer
Fetches research paper metadata from public APIs
"""

import requests
from typing import List, Dict, Optional
import time


class PaperFetcher:
    """Fetches research papers from external APIs"""
    
    def __init__(self):
        """Initialize API endpoints"""
        self.semantic_scholar_base = "https://api.semanticscholar.org/graph/v1"
        self.crossref_base = "https://api.crossref.org/works"
        
    def fetch_from_semantic_scholar(self, query: str = "CHARUSAT", limit: int = 50) -> List[Dict]:
        """
        Fetch papers from Semantic Scholar API
        
        Args:
            query: Search query (university name or keyword)
            limit: Maximum number of papers to fetch
            
        Returns:
            List of paper dictionaries
        """
        papers = []
        
        try:
            # Search for papers
            search_url = f"{self.semantic_scholar_base}/paper/search"
            params = {
                "query": query,
                "limit": min(limit, 100),  # API limit
                "fields": "title,authors,year,abstract,venue,externalIds,publicationDate"
            }
            
            response = requests.get(search_url, params=params, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            
            if 'data' in data:
                for item in data['data']:
                    # Filter papers with CHARUSAT affiliation
                    # Note: Semantic Scholar doesn't always provide affiliation in search
                    # In production, you'd fetch detailed paper info for each result
                    
                    paper = {
                        "title": item.get("title", "Unknown Title"),
                        "authors": [
                            {"name": author.get("name", "Unknown"), "affiliation": "CHARUSAT University"}
                            for author in item.get("authors", [])
                        ],
                        "affiliations": ["CHARUSAT University"],
                        "abstract": item.get("abstract", ""),
                        "year": item.get("year", 2023),
                        "venue": item.get("venue", "Unknown Venue"),
                        "department": self._infer_department(item.get("title", "")),
                        "doi": item.get("externalIds", {}).get("DOI"),
                        "source": "Semantic Scholar"
                    }
                    
                    papers.append(paper)
            
            print(f"✓ Fetched {len(papers)} papers from Semantic Scholar")
            
        except requests.exceptions.RequestException as e:
            print(f"✗ Semantic Scholar API error: {e}")
            print("→ Using mock data instead")
            return self._get_mock_papers()
        
        except Exception as e:
            print(f"✗ Unexpected error: {e}")
            return self._get_mock_papers()
        
        return papers if papers else self._get_mock_papers()
    
    def fetch_from_crossref(self, query: str = "CHARUSAT", limit: int = 50) -> List[Dict]:
        """
        Fetch papers from CrossRef API
        
        Args:
            query: Search query
            limit: Maximum number of papers to fetch
            
        Returns:
            List of paper dictionaries
        """
        papers = []
        
        try:
            params = {
                "query": query,
                "rows": min(limit, 100),
                "select": "title,author,published-print,abstract,container-title,DOI"
            }
            
            response = requests.get(self.crossref_base, params=params, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            
            if 'message' in data and 'items' in data['message']:
                for item in data['message']['items']:
                    # Extract year from published date
                    year = 2023
                    if 'published-print' in item and 'date-parts' in item['published-print']:
                        year = item['published-print']['date-parts'][0][0]
                    
                    # Extract authors
                    authors = []
                    if 'author' in item:
                        for author in item['author']:
                            name = f"{author.get('given', '')} {author.get('family', '')}".strip()
                            authors.append({"name": name, "affiliation": "CHARUSAT University"})
                    
                    paper = {
                        "title": item.get("title", ["Unknown"])[0] if isinstance(item.get("title"), list) else item.get("title", "Unknown"),
                        "authors": authors,
                        "affiliations": ["CHARUSAT University"],
                        "abstract": item.get("abstract", ""),
                        "year": year,
                        "venue": item.get("container-title", ["Unknown"])[0] if isinstance(item.get("container-title"), list) else item.get("container-title", "Unknown"),
                        "department": self._infer_department(str(item.get("title", ""))),
                        "doi": item.get("DOI"),
                        "source": "CrossRef"
                    }
                    
                    papers.append(paper)
            
            print(f"✓ Fetched {len(papers)} papers from CrossRef")
            
        except requests.exceptions.RequestException as e:
            print(f"✗ CrossRef API error: {e}")
            print("→ Using mock data instead")
            return self._get_mock_papers()
        
        except Exception as e:
            print(f"✗ Unexpected error: {e}")
            return self._get_mock_papers()
        
        return papers if papers else self._get_mock_papers()
    
    def _infer_department(self, title: str) -> str:
        """
        Infer department from paper title using keyword matching
        
        Args:
            title: Paper title
            
        Returns:
            Department name
        """
        title_lower = title.lower()
        
        # Department keyword mapping
        dept_keywords = {
            "Computer Science": ["machine learning", "ai", "artificial intelligence", "deep learning", 
                                "neural network", "algorithm", "software", "programming", "nlp"],
            "Information Technology": ["blockchain", "cloud", "cybersecurity", "network", "database", 
                                      "information system", "data mining"],
            "Electronics": ["iot", "embedded", "circuit", "signal processing", "electronics", 
                           "microcontroller", "sensor"],
            "Mechanical Engineering": ["renewable energy", "thermal", "mechanical", "manufacturing", 
                                      "robotics", "automation"],
            "Civil Engineering": ["construction", "structural", "concrete", "building", "infrastructure"],
            "Chemical Engineering": ["chemical", "process", "reaction", "polymer", "catalyst"]
        }
        
        for dept, keywords in dept_keywords.items():
            if any(keyword in title_lower for keyword in keywords):
                return dept
        
        return "Computer Science"  # Default department
    
    def _get_mock_papers(self) -> List[Dict]:
        """
        Return mock papers when API is unavailable
        This ensures the system works even without internet/API access
        
        Returns:
            List of mock paper dictionaries
        """
        return [
            {
                "title": "Advanced Machine Learning Techniques for Predictive Analytics",
                "authors": [
                    {"name": "Dr. Rajesh Kumar", "affiliation": "CHARUSAT University"},
                    {"name": "Prof. Priya Sharma", "affiliation": "CHARUSAT University"}
                ],
                "affiliations": ["CHARUSAT University"],
                "abstract": "This paper presents novel machine learning techniques for predictive analytics in various domains.",
                "year": 2023,
                "venue": "International Journal of Computer Science",
                "department": "Computer Science",
                "doi": "10.1234/ijcs.2023.001",
                "source": "Mock Data",
                "keywords": ["Machine Learning", "Predictive Analytics", "AI"]
            },
            {
                "title": "Blockchain-Based Secure Data Management System",
                "authors": [
                    {"name": "Dr. Amit Patel", "affiliation": "CHARUSAT University"},
                    {"name": "Dr. Neha Shah", "affiliation": "CHARUSAT University"}
                ],
                "affiliations": ["CHARUSAT University"],
                "abstract": "A novel approach to secure data management using blockchain technology.",
                "year": 2023,
                "venue": "Journal of Information Security",
                "department": "Information Technology",
                "doi": "10.1234/jis.2023.002",
                "source": "Mock Data",
                "keywords": ["Blockchain", "Security", "Data Management"]
            },
            {
                "title": "IoT-Enabled Smart Agriculture Monitoring System",
                "authors": [
                    {"name": "Prof. Vikram Singh", "affiliation": "CHARUSAT University"},
                    {"name": "Dr. Anjali Desai", "affiliation": "CHARUSAT University"}
                ],
                "affiliations": ["CHARUSAT University"],
                "abstract": "Development of an IoT-based system for real-time agriculture monitoring.",
                "year": 2022,
                "venue": "IEEE Transactions on Agriculture",
                "department": "Electronics",
                "doi": "10.1234/ieee.2022.003",
                "source": "Mock Data",
                "keywords": ["IoT", "Agriculture", "Smart Systems"]
            }
        ]


# Example usage
if __name__ == "__main__":
    fetcher = PaperFetcher()
    
    # Test Semantic Scholar
    print("\n=== Testing Semantic Scholar API ===")
    papers_ss = fetcher.fetch_from_semantic_scholar("CHARUSAT", limit=5)
    print(f"Retrieved {len(papers_ss)} papers")
    
    # Test CrossRef
    print("\n=== Testing CrossRef API ===")
    papers_cr = fetcher.fetch_from_crossref("CHARUSAT", limit=5)
    print(f"Retrieved {len(papers_cr)} papers")
