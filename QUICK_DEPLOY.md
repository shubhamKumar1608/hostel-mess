# 🚀 Quick Deployment Guide

## ✅ Fastest: Render.com (Recommended for FREE hosting)

### Deploy Backend (5 mins):
1. Go to https://render.com → Sign up
2. "New +" → "Web Service"
3. Connect your GitHub repo
4. Settings:
   - Name: `hostel-mess-backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment: Node
5. Click "Create Web Service"
6. ✅ Your backend URL: `https://hostel-mess-backend.onrender.com`

### Deploy Frontend (5 mins):
1. Still on Render.com
2. "New +" → "Static Site"
3. Connect same GitHub repo
4. Settings:
   - Name: `hostel-mess-frontend`
   - Build Command: `cd client && npm install && npm run build`
   - Publish Directory: `client/build`
5. Add Environment Variable:
   - Key: `REACT_APP_API_URL`
   - Value: `https://hostel-mess-backend.onrender.com/api`
6. Click "Create Static Site"

**🎉 Done! Your app will be live in 5-10 minutes!**

---

## Alternative: Vercel + Railway

### Railway (Backend):
1. https://railway.app → Sign up
2. "New Project" → "Deploy from GitHub"
3. Select repo → Add service
4. Set Start Command: `node server.js`
5. Get your URL: `https://your-app.railway.app`

### Vercel (Frontend):
1. https://vercel.com → Sign up
2. "Add New" → "Import Git Repository"
3. Select repo
4. Settings:
   - Framework: Create React App
   - Root Directory: `client`
   - Environment Variable:
     - `REACT_APP_API_URL` = Your Railway URL + `/api`
5. Deploy!

---

## 🧪 Test Locally First

Your app is NOW running on:
- **Frontend**: http://localhost:3001
- **Backend**: http://localhost:5000

**Login:**
- Admin: admin@hostel.com / admin123
- Student: student1@hostel.com / student123

---

## 📝 After Deployment

1. Update CORS in `server/server.js`:
```javascript
app.use(cors({
  origin: 'https://your-frontend-url.vercel.app',
  credentials: true
}));
```

2. Test your API:
```bash
curl https://your-backend.com/api/menu
```

---

## 🎯 One Command Deploy

Want to test build locally?

```bash
# Build frontend
cd client && npm run build

# Test production build
npm install -g serve
serve -s build
```

---

## 💡 Tips

- Render gives **FREE** tier with persistent storage
- Auto-deploys on git push
- SSL certificates included
- Perfect for MVP/production

**Need help?** Check `DEPLOYMENT_GUIDE.md` for detailed instructions!

