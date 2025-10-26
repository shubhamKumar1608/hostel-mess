# Deploy to Vercel - Step by Step

## ✅ Your App Status

Your app is running locally at http://localhost:3001! 

Now let's deploy it to Vercel for free hosting.

---

## 🚀 Step 1: Deploy Backend First (Choose One)

### Option A: Railway.app (Recommended - Free & Fast)

1. Go to https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Click "Add Service" → "Empty Service"
6. Connect to `server` folder
7. Add these settings:
   - **Start Command**: `node server.js`
   - **Build Command**: (leave empty or `npm install`)
8. Click "Deploy"
9. Wait 2-3 minutes
10. ✅ Copy your backend URL (e.g., `https://your-app.railway.app`)

### Option B: Render.com (Alternative)

1. Go to https://render.com
2. "New +" → "Web Service"
3. Connect GitHub repo
4. Settings:
   - Name: hostel-mess-api
   - Root Directory: `server`
   - Build: `npm install`
   - Start: `node server.js`
5. Deploy and get URL

### Option C: Keep Local (For Testing)

If you want to test with local backend, just keep your local server running at port 5000.

---

## 🎯 Step 2: Deploy Frontend to Vercel

### Via Vercel Dashboard (Easiest):

1. **Go to https://vercel.com**
2. **Sign up** with GitHub account
3. **Click "Add New"** → **"Import Git Repository"**
4. **Select your repository**
5. **Configure Project**:
   
   **Settings:**
   - Framework Preset: **Create React App**
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`
   
   **Environment Variables:**
   - Click "Add" to add variable:
     - Name: `REACT_APP_API_URL`
     - Value: Your backend URL + `/api`
     - Example: `https://your-app.railway.app/api`
     - Or for local: `http://localhost:5000/api`

6. **Click "Deploy"**
7. **Wait 2-3 minutes**
8. **✅ Your app is live!** Get your URL

### Via Vercel CLI (Alternative):

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Go to client folder
cd client

# Deploy
vercel

# Follow prompts:
# - Which scope? Your email
# - Link to existing project? No
# - What's your project's name? hostel-mess-client
# - Which directory? ./
```

---

## 🎉 Step 3: You're Done!

**Your app will be live at:** `https://your-app.vercel.app`

---

## 🧪 Test Your Deployment

1. Visit your Vercel URL
2. Try admin login: `admin@hostel.com` / `admin123`
3. Try student login: `student1@hostel.com` / `student123`

---

## 🔧 Troubleshooting

### CORS Error?

Update `server/server.js`:

```javascript
app.use(cors({
  origin: 'https://your-app.vercel.app',
  credentials: true
}));
```

### API Not Working?

1. Check your backend is running
2. Verify `REACT_APP_API_URL` is set correctly
3. Check browser console for errors
4. Test API directly: `https://your-backend.railway.app/api/menu`

---

## 📝 Quick Summary

1. ✅ Deploy backend to Railway/Render
2. ✅ Copy backend URL
3. ✅ Deploy frontend to Vercel
4. ✅ Add environment variable `REACT_APP_API_URL`
5. ✅ Done!

---

## 💡 Pro Tips

- **Railway** gives you a static URL (free tier)
- **Render** might spin down after 15 min (free tier)
- Both platforms auto-deploy on git push
- You can use Heroku too if you prefer

**Need help?** Check your deployment status in Vercel dashboard!

