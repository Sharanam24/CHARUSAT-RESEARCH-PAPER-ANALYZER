"""
Analytics Module for CHARUSAT Research Analyzer
Provides statistical analysis and insights from research data
"""

from typing import List, Dict
from collections import Counter
import re


class ResearchAnalytics:
    """Analytics engine for research data"""
    
    def __init__(self, papers: List[Dict]):
        """
        Initialize analytics with paper data
        
        Args:
            papers: List of paper documents from database
        """
        self.papers = papers
    
    def get_publications_by_year(self) -> List[Dict[str, int]]:
        """
        Count publications grouped by year
        
        Returns:
            List of {year, count} dictionaries sorted by year
            
        Example:
            [
                {"year": 2021, "count": 5},
                {"year": 2022, "count": 8},
                {"year": 2023, "count": 12}
            ]
        """
        year_counts = Counter()
        
        for paper in self.papers:
            year = paper.get('year', 2023)
            year_counts[year] += 1
        
        # Convert to list of dictionaries and sort by year
        result = [
            {"year": year, "count": count}
            for year, count in sorted(year_counts.items())
        ]
        
        return result
    
    def get_top_authors(self, limit: int = 10) -> List[Dict[str, any]]:
        """
        Get top authors by publication count
        
        Args:
            limit: Number of top authors to return
            
        Returns:
            List of {author, count} dictionaries
            
        Example:
            [
                {"author": "Dr. John Smith", "count": 5},
                {"author": "Prof. Jane Doe", "count": 4}
            ]
        """
        author_counts = Counter()
        
        for paper in self.papers:
            authors = paper.get('authors', [])
            for author in authors:
                if isinstance(author, dict):
                    name = author.get('name', 'Unknown')
                else:
                    name = str(author)
                author_counts[name] += 1
        
        # Get top N authors
        top_authors = author_counts.most_common(limit)
        
        result = [
            {"author": author, "count": count}
            for author, count in top_authors
        ]
        
        return result
    
    def get_department_counts(self) -> List[Dict[str, any]]:
        """
        Count papers by department
        
        Returns:
            List of {department, count} dictionaries
            
        Example:
            [
                {"department": "Computer Science", "count": 15},
                {"department": "Information Technology", "count": 10}
            ]
        """
        dept_counts = Counter()
        
        for paper in self.papers:
            dept = paper.get('department', 'Unknown')
            dept_counts[dept] += 1
        
        # Sort by count (descending)
        result = [
            {"department": dept, "count": count}
            for dept, count in dept_counts.most_common()
        ]
        
        return result
    
    def extract_keywords_from_abstracts(self, top_n: int = 10) -> List[Dict[str, any]]:
        """
        Extract frequent keywords from paper abstracts using simple NLP
        
        This is a basic keyword extraction using word frequency.
        In production, you could use more advanced NLP techniques like:
        - TF-IDF
        - Named Entity Recognition (NER)
        - Topic Modeling (LDA)
        
        Args:
            top_n: Number of top keywords to return
            
        Returns:
            List of {keyword, count} dictionaries
        """
        # Common stop words to ignore
        stop_words = {
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
            'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
            'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
            'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those',
            'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who',
            'when', 'where', 'why', 'how', 'all', 'each', 'every', 'both', 'few',
            'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only',
            'own', 'same', 'so', 'than', 'too', 'very', 'paper', 'study', 'research',
            'using', 'based', 'approach', 'method', 'system', 'analysis', 'results'
        }
        
        word_counts = Counter()
        
        for paper in self.papers:
            abstract = paper.get('abstract', '')
            if not abstract:
                continue
            
            # Convert to lowercase and extract words
            words = re.findall(r'\b[a-z]{4,}\b', abstract.lower())
            
            # Count words (excluding stop words)
            for word in words:
                if word not in stop_words:
                    word_counts[word] += 1
        
        # Get top N keywords
        top_keywords = word_counts.most_common(top_n)
        
        result = [
            {"keyword": keyword, "count": count}
            for keyword, count in top_keywords
        ]
        
        return result
    
    def get_research_domains(self) -> List[Dict[str, any]]:
        """
        Identify research domains from keywords
        
        Returns:
            List of {domain, count} dictionaries
        """
        # Extract keywords from papers
        if self.papers and 'keywords' in self.papers[0]:
            # If papers have keywords field
            domain_counts = Counter()
            for paper in self.papers:
                keywords = paper.get('keywords', [])
                for keyword in keywords:
                    domain_counts[keyword] += 1
            
            result = [
                {"domain": domain, "count": count}
                for domain, count in domain_counts.most_common(10)
            ]
            return result
        else:
            # Fallback: use department as domain
            return self.get_department_counts()
    
    def get_summary_statistics(self) -> Dict:
        """
        Get comprehensive summary statistics
        
        Returns:
            Dictionary with various statistics
        """
        total_papers = len(self.papers)
        
        # Count unique authors
        unique_authors = set()
        for paper in self.papers:
            authors = paper.get('authors', [])
            for author in authors:
                if isinstance(author, dict):
                    name = author.get('name', '')
                else:
                    name = str(author)
                if name:
                    unique_authors.add(name)
        
        # Count unique departments
        unique_departments = set(
            paper.get('department', 'Unknown')
            for paper in self.papers
        )
        
        # Year range
        years = [paper.get('year', 2023) for paper in self.papers]
        year_range = f"{min(years)}-{max(years)}" if years else "N/A"
        
        return {
            "totalPapers": total_papers,
            "totalAuthors": len(unique_authors),
            "totalDepartments": len(unique_departments),
            "yearRange": year_range,
            "avgAuthorsPerPaper": round(sum(len(p.get('authors', [])) for p in self.papers) / total_papers, 2) if total_papers > 0 else 0
        }


# Example usage
if __name__ == "__main__":
    # Sample data for testing
    sample_papers = [
        {
            "title": "ML in Healthcare",
            "authors": [{"name": "Dr. John Smith"}, {"name": "Dr. Jane Doe"}],
            "year": 2023,
            "department": "Computer Science",
            "abstract": "Machine learning applications in healthcare diagnostics and treatment.",
            "keywords": ["Machine Learning", "Healthcare", "AI"]
        },
        {
            "title": "Blockchain Systems",
            "authors": [{"name": "Prof. Alice Johnson"}],
            "year": 2023,
            "department": "Information Technology",
            "abstract": "Blockchain technology for secure data management systems.",
            "keywords": ["Blockchain", "Security"]
        },
        {
            "title": "IoT Applications",
            "authors": [{"name": "Dr. John Smith"}, {"name": "Dr. Bob Williams"}],
            "year": 2022,
            "department": "Electronics",
            "abstract": "Internet of Things applications in smart home automation.",
            "keywords": ["IoT", "Smart Home"]
        }
    ]
    
    analytics = ResearchAnalytics(sample_papers)
    
    print("=== Analytics Test ===\n")
    
    print("Publications by Year:")
    print(analytics.get_publications_by_year())
    
    print("\nTop Authors:")
    print(analytics.get_top_authors())
    
    print("\nDepartment Counts:")
    print(analytics.get_department_counts())
    
    print("\nSummary Statistics:")
    print(analytics.get_summary_statistics())
