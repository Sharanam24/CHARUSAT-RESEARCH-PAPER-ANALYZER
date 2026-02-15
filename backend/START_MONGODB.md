# How to Start MongoDB on Windows

## Option 1: Start MongoDB as a Service (Easiest)

If MongoDB is installed as a Windows service:

```bash
# Open Command Prompt as Administrator
net start MongoDB
```

## Option 2: Start MongoDB Manually

```bash
# Open Command Prompt
mongod
```

## Option 3: Check if MongoDB is Already Running

```bash
# Check if MongoDB service is running
sc query MongoDB

# Or try connecting
mongosh
```

## If MongoDB is Not Installed

### Install MongoDB on Windows:

1. Download MongoDB Community Server from:
   https://www.mongodb.com/try/download/community

2. Run the installer (choose "Complete" installation)

3. During installation, select "Install MongoDB as a Service"

4. After installation, MongoDB should start automatically

## Verify MongoDB is Running

```bash
# Try connecting with mongosh
mongosh

# You should see:
# Current Mongosh Log ID: ...
# Connecting to: mongodb://127.0.0.1:27017/
# Using MongoDB: ...
```

## Alternative: Use MongoDB Atlas (Cloud - Free)

If you don't want to install MongoDB locally:

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster
4. Get connection string
5. Update backend/.env:
   ```
   MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/
   ```

---

**After starting MongoDB, run the backend again:**
```bash
cd backend
python main.py
```
