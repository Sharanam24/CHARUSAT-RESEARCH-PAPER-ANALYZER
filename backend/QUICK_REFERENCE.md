# 🚀 Quick Reference Card

## Start Server (One Command)

```bash
python main.py
```

Server: http://localhost:8000

---

## Test API (Quick Commands)

```bash
# Health check
curl http://localhost:8000/health

# Get papers
curl http://localhost:8000/api/papers

# AI/ML Duplicate Detection ⭐
curl http://localhost:8000/api/authors/duplicates

# Analytics
curl http://localhost:8000/api/analytics

# Dashboard stats
curl http://localhost:8000/api/dashboard/stats
```

---

## API Documentation

**Interactive Docs:** http://localhost:8000/docs

**ReDoc:** http://localhost:8000/redoc

---

## Key Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/papers` | All papers |
| `GET /api/papers/search?q=query` | Search |
| `GET /api/authors/duplicates` | **AI/ML Detection** |
| `GET /api/analytics` | Analytics data |
| `GET /api/dashboard/stats` | Dashboard |

---

## AI/ML Algorithm (For Viva)

**Problem:** Same author, different names

**Solution:**
1. Preprocess (remove titles, normalize)
2. TF-IDF vectorization
3. Cosine similarity + Levenshtein distance
4. Group if similarity ≥ 85%

**Example:**
- "Dr. John Smith" + "J. Smith" → 92% similar → Same author

---

## File Structure

```
backend/
├── main.py              # FastAPI app
├── models.py            # Data models
├── database.py          # MongoDB
├── fetcher.py           # External APIs
├── author_similarity.py # AI/ML ⭐
├── analytics.py         # Analytics
└── routes/              # API endpoints
```

---

## MongoDB Setup

**Local:**
```bash
mongod
```

**Cloud:** Use MongoDB Atlas (free tier)

---

## Troubleshooting

**Port in use?**
```bash
python main.py --port 8001
```

**Missing packages?**
```bash
pip install -r requirements.txt
```

**MongoDB not running?**
```bash
mongod
```

---

## Demo Flow (5 min)

1. Start: `python main.py`
2. Open: http://localhost:8000/docs
3. Show: Papers API
4. Demo: AI/ML duplicate detection ⭐
5. Show: Analytics

---

## Key Features

✅ FastAPI + MongoDB
✅ AI/ML duplicate detection
✅ External API integration
✅ Analytics engine
✅ Auto-generated docs
✅ Sample data included

---

## For Viva

**Q: How does AI/ML work?**
**A:** TF-IDF + Cosine Similarity + Levenshtein Distance

**Q: Why FastAPI?**
**A:** Auto docs, async, validation, modern

**Q: Why MongoDB?**
**A:** Flexible schema, nested docs, scalable

---

## Status: ✅ COMPLETE

All features implemented and tested!

**Good luck! 🎓**
