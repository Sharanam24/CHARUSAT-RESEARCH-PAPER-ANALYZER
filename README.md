# CHARUSAT Research Analyzer

A web-based research analysis portal designed for CHARUSAT University to collect, analyze, and manage research papers with AI/ML-powered duplicate author detection.

## Overview

The CHARUSAT Research Analyzer is a comprehensive research management system that provides:

- **Research Dashboard**: View aggregate statistics and search for papers
- **Papers Management**: Browse and filter research papers by various criteria
- **Duplicate Author Detection**: AI/ML-powered identification of author name variations
- **Analytics**: Visual insights into research trends and productivity
- **About**: Project information and technology details

## Features

### Core Functionality

1. **Dashboard Statistics**: Display total papers, authors, and departments
2. **Search Capability**: Find papers by title, author, or year
3. **Advanced Filtering**: Filter papers by year, department, and author
4. **Paper Details**: View comprehensive information about each paper
5. **Author Grouping**: AI-powered detection of duplicate author entries with similarity scores
6. **Analytics Visualizations**: Charts showing publications by year, research domains, and department-wise counts

### AI/ML Innovation

The system's primary innovation is its **duplicate author detection** capability, which:
- Identifies different name spellings and formats (e.g., "John Smith", "J. Smith", "Smith, J.")
- Calculates similarity scores (0-100) indicating confidence levels
- Automatically groups author name variations for accurate attribution

## Technology Stack

### Frontend
- **HTML5**: Semantic markup for structure
- **CSS3**: Flexbox and Grid for responsive layouts
- **Vanilla JavaScript (ES6+)**: Modular code with no frameworks
- **Canvas API**: For data visualizations
- **Fetch API**: For backend communication

### Backend
- **Python 3.8+**: Core programming language
- **FastAPI**: Modern, fast web framework for building APIs
- **MongoDB**: NoSQL database for flexible data storage
- **Motor**: Async MongoDB driver for Python
- **Pydantic**: Data validation using Python type annotations
- **Uvicorn**: ASGI server for running FastAPI

### AI/ML Components
- **scikit-learn**: TF-IDF Vectorization and Cosine Similarity
- **python-Levenshtein**: Edit distance calculation
- **NumPy**: Numerical computations



