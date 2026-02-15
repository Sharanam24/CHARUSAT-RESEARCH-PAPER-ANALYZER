# Quick Start Guide - CHARUSAT Research Analyzer Backend

Get the backend running in 5 minutes!

## ⚡ Quick Setup

### Step 1: Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Setup Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env if needed (default settings work for local MongoDB)
```

### Step 3: Start MongoDB

**Option A - Local MongoDB:**
```bash
mongod
```

**Option B - MongoDB Atlas (Cloud):**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Update `MONGODB_URL` in `.env`

### Step 4: Run the Server

```bash
python main.py
```

✅ Server running at: **http://localhost:8000**

## 🧪 Test the API

### Open API Documentation
Visit: http://localhost:8000/docs

### Test with cURL

```bash
# Health check
curl http://localhost:8000/health

# Get all papers
curl http://localhost:8000/api/papers

# Detect duplicate authors (AI/ML)
curl http://localhost:8000/api/authors/duplicates

# Get analytics
curl http://localhost:8000/api/analytics
```

### Test with Browser
- Papers: http://localhost:8000/api/papers
- Authors: http://localhost:8000/api/authors
- Dashboard Stats: http://localhost:8000/api/dashboard/stats

## 📱 Connect Frontend

Update frontend `js/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000';
```

## 🎯 Key Features to Demo

1. **AI/ML Duplicate Detection**
   - Endpoint: `/api/authors/duplicates`
   - Uses TF-IDF, Cosine Similarity, Levenshtein Distance
   - 85% similarity threshold

2. **External API Integration**
   - Fetch from Semantic Scholar or CrossRef
   - POST to `/api/papers/fetch`

3. **Analytics Engine**
   - Publications by year
   - Top authors
   - Department distribution

## 🐛 Common Issues

**MongoDB not running?**
```bash
# Start MongoDB
mongod
```

**Port 8000 in use?**
```bash
# Use different port
uvicorn main:app --port 8001
```

**Module not found?**
```bash
# Reinstall dependencies
pip install -r requirements.txt
```

## 📚 Next Steps

- Read full documentation: `README.md`
- Explore API docs: http://localhost:8000/docs
- Test all endpoints with Postman
- Connect to frontend application

## 🎓 For Viva/Presentation

Key points to explain:
1. **Architecture**: FastAPI + MongoDB + AI/ML
2. **AI/ML Component**: Duplicate author detection algorithm
3. **API Design**: RESTful endpoints with proper HTTP methods
4. **Data Flow**: External APIs → Database → Analytics → Frontend
5. **Scalability**: Async operations, modular design

Good luck! 🚀
