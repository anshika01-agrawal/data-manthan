# 🚀 Data Manthan Deployment Guide

## MongoDB Atlas Setup (Always Connected)

### 1. IP Whitelist Configuration
```
MongoDB Atlas Dashboard → Network Access → Add IP Address
```

**Add these IPs:**
- `0.0.0.0/0` (Allow access from anywhere - for cloud deployment)
- Your specific production IPs if known

### 2. Connection Pool Settings
The production MongoDB URI includes connection pooling for always-on connectivity:

```
maxPoolSize=10     # Maximum 10 concurrent connections
minPoolSize=5      # ALWAYS keep 5 connections active
maxIdleTimeMS=60000 # Keep connections alive for 60 seconds
serverSelectionTimeoutMS=30000 # 30 second timeout
connectTimeoutMS=30000 # 30 second connection timeout
socketTimeoutMS=45000  # 45 second socket timeout
```

## Vercel Deployment

### 1. Environment Variables
Go to **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these variables:

```bash
MONGODB_URI=mongodb+srv://23btc108_db_user:asdfghjkl123A@data-manthan.mhkalju.mongodb.net/data-manthan?retryWrites=true&w=majority&appName=data-manthan&ssl=true&authSource=admin&serverSelectionTimeoutMS=30000&maxPoolSize=10&minPoolSize=5&maxIdleTimeMS=60000&connectTimeoutMS=30000&socketTimeoutMS=45000

DATABASE_URL=mongodb+srv://23btc108_db_user:asdfghjkl123A@data-manthan.mhkalju.mongodb.net/data-manthan?retryWrites=true&w=majority&appName=data-manthan&ssl=true&authSource=admin&serverSelectionTimeoutMS=30000&maxPoolSize=10&minPoolSize=5&maxIdleTimeMS=60000&connectTimeoutMS=30000&socketTimeoutMS=45000

MONGODB_ATLAS_SQL_URI=mongodb://atlas-sql-68dbc5ba43584e7b625d8fd9-lxv40f.a.query.mongodb.net/data-manthan?ssl=true&authSource=admin

NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app

NODE_ENV=production

NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=9cd3330557c899a03194a9a0797abbd9235d839bdbfb798c470f940eb65fc0c5
JWT_SECRET=fb761b9f02d1ab373664109ebcf6cdb20d48cecfd9f44b44bcd09f07f60fd6c4

NCBI_BLAST_FTP=https://ftp.ncbi.nlm.nih.gov/blast/db/
NCBI_18S_FUNGAL_URL=https://ftp.ncbi.nlm.nih.gov/blast/db/18S_fungal_sequences.tar.gz
```

### 2. Deploy Commands
```bash
# Build the project
pnpm build

# Deploy to Vercel
npx vercel --prod

# Or connect GitHub repository for auto-deployment
```

## Other Deployment Platforms

### Netlify
```bash
# Environment Variables in Netlify Dashboard
Site Settings → Build & Deploy → Environment Variables
```

### Railway
```bash
# Add variables in Railway Dashboard
Project Settings → Variables
```

### Heroku
```bash
# Set config vars
heroku config:set MONGODB_URI="your-mongodb-uri"
heroku config:set NEXTAUTH_SECRET="your-nextauth-secret"
# ... add all other variables
```

## Always-Connected Database Features

### Connection Pooling Benefits:
- ✅ **Minimum 5 connections always active**
- ✅ **No cold start delays**
- ✅ **Faster response times**
- ✅ **Better performance under load**
- ✅ **Automatic connection recovery**

### Monitoring:
- MongoDB Atlas → Monitoring tab
- Set up alerts for connection issues
- Monitor connection pool usage

## Post-Deployment Checklist

- [ ] MongoDB Atlas IP whitelist updated
- [ ] All environment variables set correctly
- [ ] NEXTAUTH_URL points to production domain
- [ ] Database connection tested
- [ ] Authentication system working
- [ ] File upload functionality tested
- [ ] Sample data uploaded successfully

## Demo User Credentials
```
Email: researcher@marine.org
Password: demo123
Role: researcher
```

## Support URLs
- Production App: https://your-app-name.vercel.app
- MongoDB Atlas: https://cloud.mongodb.com
- Vercel Dashboard: https://vercel.com/dashboard

---

**Note:** Replace `your-app-name` with your actual Vercel app name in all URLs.