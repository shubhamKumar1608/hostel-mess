# Deployment Guide

## Quick Deploy (Recommended: Vercel + Railway)

### Step 1: Deploy Backend to Railway (Free)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository
5. Add service → "Empty Project"
6. Connect your `server` folder
7. Set environment variable: `PORT=5000`
8. Deploy!

**Backend URL**: Get it from Railway (e.g., `https://your-app.railway.app`)

### Step 2: Deploy Frontend to Vercel (Free)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Import Project"
4. Select your repository
5. Set build settings:
   - Framework Preset: Create React App
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`

6. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-app.railway.app/api
   ```

7. Deploy!

## Option 2: Deploy Both on Render (Free)

### Backend
1. Go to [render.com](https://render.com)
2. Create account
3. New → Web Service
4. Connect GitHub repo
5. Settings:
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && node server.js`
   - Environment: Node
6. Deploy

### Frontend  
1. New → Static Site
2. Connect same repo
3. Settings:
   - Build Command: `cd client && npm install && npm run build`
   - Publish Directory: `client/build`
4. Add Environment:
   - `REACT_APP_API_URL=https://your-backend.onrender.com/api`
5. Deploy

## Option 3: Manual Deployment

### Build the app

```bash
# Build client
cd client
npm run build

# Test build
npm run start
```

### Deploy to Netlify

1. Drag and drop `client/build` folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or use Netlify CLI:
```bash
npm install -g netlify-cli
cd client
netlify deploy --prod --dir=build
```

### Deploy Backend to Heroku

```bash
# Install Heroku CLI
heroku login
heroku create your-app-name

# Deploy
git subtree push --prefix server heroku main

# Or
cd server
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a your-app-name
git push heroku master
```

## Environment Variables

### For Client (Frontend)
Create `client/.env.production`:
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

### For Server (Backend)
Create `server/.env`:
```
PORT=5000
NODE_ENV=production
```

## Testing Your Deployment

After deployment, test these URLs:

- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.railway.app/api/menu`

## Troubleshooting

### CORS Issues
Update `server/server.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

### API Not Working
Check if your API URL is correct:
- Use HTTPS for production
- Check environment variables
- Verify CORS settings

## Quick Start Local

```bash
# Run locally
npm run dev

# Or separately
npm run start:server  # Terminal 1
npm run start:client  # Terminal 2 (http://localhost:3001)
```

## Credentials

- Admin: admin@hostel.com / admin123
- Student: student1@hostel.com / student123

