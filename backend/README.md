# CHARUSAT Research Analyzer - Backend

FastAPI-based backend system for analyzing research papers from CHARUSAT University with AI/ML-powered duplicate author detection.

## 🎯 Features

- **RESTful API** with FastAPI
- **MongoDB** database for paper storage
- **AI/ML Duplicate Detection** using TF-IDF, Cosine Similarity, and Levenshtein Distance
- **External API Integration** (Semantic Scholar, CrossRef)
- **Analytics Engine** for statistical insights
- **CORS Enabled** for frontend access
- **Auto-generated API Documentation** (Swagger UI)

## 📋 Prerequisites

- Python 3.8 or higher
- MongoDB (local or cloud instance)
- pip (Python package manager)

## 🚀 Installation

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# MongoDB Configuration
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=charusat_research

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
```

### 3. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**MongoDB Atlas (Cloud):**
- Create a free cluster at https://www.mongodb.com/cloud/atlas
- Get connection string and update `MONGODB_URL` in `.env`

## ▶️ Running the Server

### Development Mode (with auto-reload)

```bash
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

The server will start at: **http://localhost:8000**

## 📚 API Documentation

Once the server is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔌 API Endpoints

### Papers

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/papers` | Get all papers |
| GET | `/api/papers/search?q={query}` | Search papers |
| GET | `/api/papers/filter?year={year}&department={dept}` | Filter papers |
| GET | `/api/papers/{id}` | Get paper by ID |
| POST | `/api/papers/fetch` | Fetch papers from external APIs |

### Authors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/authors` | Get all authors |
| GET | `/api/authors/duplicates` | Detect duplicate authors (AI/ML) |
| GET | `/api/authors/groups` | Get author groups |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Get dashboard statistics |
| GET | `/api/analytics` | Get analytics data |
| GET | `/api/analytics/summary` | Get comprehensive summary |
| GET | `/api/filters/years` | Get available years |
| GET | `/api/filters/departments` | Get available departments |

## 🧪 Testing the API

### Using cURL

**Get all papers:**
```bash
curl http://localhost:8000/api/papers
```

**Search papers:**
```bash
curl "http://localhost:8000/api/papers/search?q=machine+learning"
```

**Detect duplicate authors:**
```bash
curl http://localhost:8000/api/authors/duplicates
```

**Fetch papers from Semantic Scholar:**
```bash
curl -X POST http://localhost:8000/api/papers/fetch \
  -H "Content-Type: application/json" \
  -d '{"query": "CHARUSAT", "limit": 10, "source": "semantic_scholar"}'
```

### Using Postman

1. Import the API into Postman using the OpenAPI spec: http://localhost:8000/openapi.json
2. Create requests for each endpoint
3. Test with different parameters

### Using Python

```python
import requests

# Get all papers
response = requests.get("http://localhost:8000/api/papers")
papers = response.json()
print(f"Found {len(papers)} papers")

# Detect duplicate authors
response = requests.get("http://localhost:8000/api/authors/duplicates")
groups = response.json()
print(f"Found {len(groups)} duplicate author groups")
```

## 🤖 AI/ML Duplicate Detection

The system uses three techniques to detect duplicate authors:

### 1. Text Preprocessing
- Converts names to lowercase
- Removes titles (Dr., Prof., etc.)
- Removes punctuation
- Normalizes whitespace

### 2. TF-IDF Vectorization
- Converts names to numerical vectors using character n-grams
- Captures partial name matches

### 3. Similarity Calculation
- **Levenshtein Distance**: Measures edit distance between names
- **Cosine Similarity**: Measures angle between TF-IDF vectors
- **Combined Score**: Weighted average (60% Levenshtein + 40% Cosine)

### Similarity Threshold
- Default: **85%** (configurable in `author_similarity.py`)
- Names with similarity ≥ 85% are grouped as duplicates

### Example
```
"Dr. John Smith" → "john smith"
"J. Smith" → "j smith"
Similarity: 92% → Identified as same author
```

## 📁 Project Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── models.py              # Pydantic data models
├── database.py            # MongoDB connection and queries
├── fetcher.py             # External API data fetching
├── author_similarity.py   # AI/ML duplicate detection
├── analytics.py           # Analytics engine
├── routes/
│   ├── __init__.py
│   ├── papers.py          # Papers endpoints
│   ├── authors.py         # Authors endpoints
│   └── analytics.py       # Analytics endpoints
├── requirements.txt       # Python dependencies
├── .env.example          # Environment template
└── README.md             # This file
```

## 🔧 Configuration

### MongoDB Connection

**Local MongoDB:**
```env
MONGODB_URL=mongodb://localhost:27017
```

**MongoDB Atlas:**
```env
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/
```

### CORS Settings

Edit `main.py` to configure allowed origins:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Specify frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error:** `MongoDB connection failed`

**Solution:**
1. Ensure MongoDB is running: `mongod`
2. Check connection string in `.env`
3. Verify network access (for MongoDB Atlas)

### Module Not Found Error

**Error:** `ModuleNotFoundError: No module named 'fastapi'`

**Solution:**
```bash
pip install -r requirements.txt
```

### Port Already in Use

**Error:** `Address already in use`

**Solution:**
```bash
# Find process using port 8000
lsof -i :8000

# Kill the process
kill -9 <PID>

# Or use a different port
uvicorn main:app --port 8001
```

## 📊 Sample Data

The system automatically inserts sample data on first run if the database is empty. Sample data includes:
- 6 research papers
- Multiple authors with variations (for testing duplicate detection)
- Different departments and years

## 🎓 Academic Notes

This project is designed for university-level demonstration with:
- **Clear code comments** for easy understanding
- **Modular architecture** for maintainability
- **AI/ML techniques** explained in detail
- **Academic-friendly** complexity (not over-engineered)

Perfect for viva presentations and project demonstrations!

## 📝 License

This project is for educational purposes at CHARUSAT University.

## 👥 Contributors

Developed as part of the CHARUSAT Research Analyzer project.
