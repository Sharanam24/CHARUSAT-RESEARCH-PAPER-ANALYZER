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

## Project Structure

```
charusat-research-analyzer/
├── frontend/
│   ├── index.html              # Home/Dashboard page
│   ├── papers.html             # Papers listing and filtering page
│   ├── authors.html            # Duplicate Author Analyzer page
│   ├── analytics.html          # Analytics and charts page
│   ├── about.html              # About page
│   ├── css/
│   │   └── styles.css          # Main stylesheet
│   └── js/
│       ├── api.js              # API communication module
│       ├── dashboard.js        # Dashboard functionality
│       ├── papers.js           # Papers page functionality
│       ├── authors.js          # Author analyzer functionality
│       └── analytics.js        # Analytics page functionality
├── backend/
│   ├── main.py                 # FastAPI application entry point
│   ├── models.py               # Pydantic data models
│   ├── database.py             # MongoDB connection and queries
│   ├── fetcher.py              # External API data fetching
│   ├── author_similarity.py    # AI/ML duplicate detection
│   ├── analytics.py            # Analytics engine
│   ├── routes/
│   │   ├── papers.py           # Papers endpoints
│   │   ├── authors.py          # Authors endpoints
│   │   └── analytics.py        # Analytics endpoints
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example            # Environment template
│   ├── README.md               # Backend documentation
│   ├── QUICKSTART.md           # Quick start guide
│   └── CHARUSAT_API_Collection.json  # Postman collection
└── README.md                   # This file
```

## Getting Started

### Prerequisites

**Frontend:**
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local web server (optional, for development)

**Backend:**
- Python 3.8 or higher
- MongoDB (local or cloud instance)
- pip (Python package manager)

### Installation

#### Frontend Setup

1. Open `index.html` in your web browser, or
2. Serve the files using a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

3. Navigate to `http://localhost:8000` in your browser

#### Backend Setup

1. Install Python dependencies:

```bash
cd backend
pip install -r requirements.txt
```

2. Configure environment:

```bash
cp .env.example .env
# Edit .env with your MongoDB connection string
```

3. Start MongoDB:

```bash
mongod
```

4. Run the FastAPI server:

```bash
python main.py
```

The backend API will be available at `http://localhost:8000`

**For detailed backend setup instructions, see [backend/README.md](backend/README.md)**

## Usage

### Navigating the Application

- **Home**: View dashboard statistics and search for papers
- **Papers**: Browse all papers with filtering options
- **Authors**: View AI-detected author groups with similarity scores
- **Analytics**: Explore research trends through visualizations
- **About**: Learn about the project and technologies

### Searching Papers

1. Enter a search term (title, author, or year) in the search bar
2. Click "Search" or press Enter
3. View matching results below the search bar

### Filtering Papers

1. Navigate to the Papers page
2. Select filter criteria (Year, Department, Author)
3. Click "Apply Filters"
4. View filtered results in the table
5. Click "View" to see detailed information about a paper

### Viewing Author Groups

1. Navigate to the Authors page
2. View grouped author name variations
3. Check similarity scores for each variation
4. See the status message confirming duplicate detection

## Design Principles

### Color Scheme

- **Primary Color**: Dark Blue (#0B3C5D)
- **Accent Color**: Light Blue (#328CC1)
- **Background**: White (#FFFFFF) and Light Grey (#F5F5F5)

### Typography

- **Primary Font**: Times New Roman (academic style)
- **Secondary Font**: Roboto (modern readability)

### Layout

- **Responsive Design**: Optimized for desktop and tablet devices
- **Flexbox**: For flexible component layouts
- **CSS Grid**: For structured page layouts
- **Semantic HTML**: For improved accessibility and SEO

## API Integration

The application integrates with a FastAPI backend. All API calls are centralized in `js/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000'; // Backend URL
```

### API Endpoints

**Papers:**
- `GET /api/papers` - Get all papers
- `GET /api/papers/search?q={query}` - Search papers
- `GET /api/papers/filter?year={year}&department={dept}&author={author}` - Filter papers
- `GET /api/papers/{id}` - Get paper by ID
- `POST /api/papers/fetch` - Fetch papers from external APIs

**Authors:**
- `GET /api/authors` - Get all authors
- `GET /api/authors/duplicates` - Detect duplicate authors (AI/ML)
- `GET /api/authors/groups` - Get author groups

**Analytics:**
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/analytics` - Get analytics data
- `GET /api/analytics/summary` - Get comprehensive summary
- `GET /api/filters/years` - Get available years
- `GET /api/filters/departments` - Get available departments

**Interactive API Documentation:**
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Testing the API

**Using cURL:**
```bash
curl http://localhost:8000/api/papers
curl http://localhost:8000/api/authors/duplicates
```

**Using Postman:**
Import the collection: `backend/CHARUSAT_API_Collection.json`

**Using Browser:**
Visit: `http://localhost:8000/docs` for interactive testing

## Development

### Code Organization

- **Separation of Concerns**: HTML (structure), CSS (presentation), JavaScript (behavior)
- **Modular JavaScript**: Each page has its own module
- **Error Handling**: All API calls include try/catch blocks
- **Input Sanitization**: User input is sanitized to prevent XSS attacks

### Best Practices

- Semantic HTML5 tags for improved accessibility
- CSS custom properties for maintainable theming
- Async/await for clean asynchronous code
- JSDoc comments for function documentation
- Consistent naming conventions

## Browser Compatibility

The application is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Export functionality for papers and analytics
- Advanced search with boolean operators
- User authentication and personalization
- Real-time collaboration features
- Mobile responsive design
- Dark mode theme option
- Internationalization support

## Academic Context

This project is developed as a **student academic project** for CHARUSAT University. It demonstrates the application of modern web technologies and AI/ML concepts in solving real-world research management challenges.

**Institution**: CHARUSAT University  
**Project Type**: Academic Research Portal  
**Year**: 2024

## License

This project is developed for academic purposes at CHARUSAT University.

## Contact

For questions or feedback about this project, please contact the development team at CHARUSAT University.

---

© 2024 CHARUSAT University. All rights reserved.
