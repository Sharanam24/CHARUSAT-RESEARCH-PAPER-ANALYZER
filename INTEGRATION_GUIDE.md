# 🔗 Frontend-Backend Integration Guide

## Quick Integration (3 Steps)

### Step 1: Update Frontend API URL

**File:** `js/api.js` (Line 10)

**Change from:**
```javascript
const API_BASE_URL = '/api';
```

**Change to:**
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

### Step 2: Start Backend

```bash
cd backend
python main.py
```

Server runs at: http://localhost:8000

### Step 3: Start Frontend

```bash
# From project root
python -m http.server 3000
```

Frontend runs at: http://localhost:3000

---

## ✅ Your Integration is Already 95% Complete!

### Backend (Already Done ✅)

1. **CORS Configured** - `main.py` line 35-42
2. **JSON Responses** - All endpoints return JSON
3. **Error Handling** - Try/catch in all routes
4. **Sample Data** - Auto-inserted on first run

### Frontend (Already Done ✅)

1. **API Module** - `js/api.js` with all functions
2. **Error Handling** - Try/catch with fallback to mock data
3. **Async/Await** - Proper async handling
4. **DOM Manipulation** - Dynamic content rendering

### Only 1 Change Needed ⚠️

Update `API_BASE_URL` in `js/api.js` to point to backend!

---

## Testing Integration

### Test 1: Backend Health Check

```bash
curl http://localhost:8000/health
```

Expected: `{"status":"healthy"}`

### Test 2: Get Papers

```bash
curl http://localhost:8000/api/papers
```

Expected: JSON array of papers

### Test 3: Frontend Dashboard

1. Open http://localhost:3000
2. Check dashboard cards show numbers
3. Open console (F12) - should be no errors

---

## Common Errors & Solutions

### Error: CORS Policy

**Symptom:** Console shows "blocked by CORS policy"

**Solution:** Backend already has CORS configured. Just restart backend.

### Error: Failed to Fetch

**Symptom:** "TypeError: Failed to fetch"

**Cause:** Backend not running

**Solution:**
```bash
cd backend
python main.py
```

### Error: 404 Not Found

**Symptom:** "GET http://localhost:8000/api/papers 404"

**Solution:** Check API docs at http://localhost:8000/docs

---

## API Endpoints Reference

| Endpoint | Description |
|----------|-------------|
| `GET /api/papers` | All papers |
| `GET /api/papers/search?q=query` | Search |
| `GET /api/authors/duplicates` | AI/ML detection |
| `GET /api/analytics` | Analytics data |
| `GET /api/dashboard/stats` | Dashboard stats |

---

## For Viva: How It Works

### 1. Frontend Sends Request

```javascript
// js/api.js
const response = await fetch('http://localhost:8000/api/papers');
const data = await response.json();
```

### 2. Backend Processes Request

```python
# backend/routes/papers.py
@router.get("/api/papers")
async def get_papers():
    papers = await db.get_all_papers()
    return papers  # Auto-converts to JSON
```

### 3. Frontend Displays Data

```javascript
// js/dashboard.js
papers.forEach(paper => {
    // Create table row
    // Add to DOM
});
```

---

## Complete Integration Checklist

- [ ] Update `API_BASE_URL` in `js/api.js`
- [ ] Start MongoDB: `mongod`
- [ ] Start Backend: `python main.py`
- [ ] Start Frontend: `python -m http.server 3000`
- [ ] Open http://localhost:3000
- [ ] Test dashboard loads
- [ ] Test search works
- [ ] Test papers page
- [ ] Test authors page (AI/ML)
- [ ] No console errors

---

## 🎉 You're Ready!

Your code is already production-quality. Just update the API URL and start both servers!
