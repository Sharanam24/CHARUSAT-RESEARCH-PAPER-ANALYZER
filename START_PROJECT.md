# 🚀 Quick Start - CHARUSAT Research Analyzer

## Start Everything in 3 Commands

### Terminal 1: Start MongoDB
```bash
mongod
```

### Terminal 2: Start Backend
```bash
cd backend
python main.py
```

### Terminal 3: Start Frontend
```bash
python -m http.server 3000
```

## Open in Browser

- **Frontend:** http://localhost:3000
- **Backend API Docs:** http://localhost:8000/docs
- **Integration Test:** http://localhost:3000/test_integration.html

## That's It! ✅

Your application is now running and fully integrated!

---

## Quick Test

1. Open http://localhost:3000
2. Dashboard should show numbers (not 0)
3. Try searching for "machine learning"
4. Navigate to Authors page to see AI/ML duplicate detection

---

## Stop Everything

Press `Ctrl+C` in each terminal to stop the servers.

---

## Troubleshooting

**Backend won't start?**
```bash
cd backend
pip install -r requirements.txt
python main.py
```

**MongoDB won't start?**
- Make sure MongoDB is installed
- Check if it's already running

**Frontend shows 0 in dashboard?**
- Check backend is running: http://localhost:8000/health
- Check browser console for errors (F12)

---

## For Viva

**Demo Flow:**
1. Start all servers (show commands)
2. Open http://localhost:3000/test_integration.html
3. Click "Test All Endpoints" - show all green
4. Navigate to main app
5. Demo AI/ML duplicate detection on Authors page
6. Explain the algorithm

**Key Points:**
- FastAPI backend with MongoDB
- Vanilla JavaScript frontend (no frameworks)
- AI/ML using TF-IDF, Cosine Similarity, Levenshtein Distance
- RESTful API with JSON
- CORS configured for cross-origin requests

---

**You're ready to go! 🎉**
