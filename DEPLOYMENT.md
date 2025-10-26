# Deployment Guide

## Local Development

### Running the Application

The application is now running! You can access:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Login Credentials

**Admin:**
- Email: admin@hostel.com
- Password: admin123

**Student:**
- Email: student1@hostel.com or student2@hostel.com
- Password: student123

## What Was Fixed

### Bugs Fixed:

1. ✅ **Server Routes**: Fixed all API endpoints to match frontend calls
2. ✅ **User Authentication**: Added proper token and userId storage
3. ✅ **API Services**: Created menuService and bookingService
4. ✅ **Dashboard Integration**: Fixed StudentDashboard and AdminDashboard to use proper API calls
5. ✅ **CORS Issues**: Configured proper CORS headers
6. ✅ **Tailwind CSS**: Added proper configuration files
7. ✅ **Login Flow**: Fixed authentication flow for both admin and student

### Improvements Made:

1. ✅ **Better UI**: Modern Tailwind CSS styling
2. ✅ **Error Handling**: Added error states and messages
3. ✅ **Loading States**: Added loading indicators
4. ✅ **Responsive Design**: Mobile-friendly layout
5. ✅ **API Integration**: Proper service layer architecture

## Deployment Options

### Option 1: Deploy to Heroku (Backend)

```bash
# Create Heroku app
heroku create your-app-name

# Set config
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Option 2: Deploy to Netlify (Frontend)

```bash
cd client
npm run build

# Upload 'build' folder to Netlify
# Or use Netlify CLI
netlify deploy --prod --dir=build
```

### Option 3: Deploy Both Together (Vercel)

Vercel can handle both frontend and backend:
1. Push code to GitHub
2. Import to Vercel
3. Configure build settings

## Running Locally

Stop the current servers and restart using:

```bash
# Terminal 1 - Start server
npm run start:server

# Terminal 2 - Start client
npm run start:client

# Or both together
npm run dev
```

## Testing

Test the application by:

1. **Admin Login**: Login and add menu items
2. **Student Login**: Login and book meals
3. **Check Bookings**: Verify bookings are saved correctly

## Troubleshooting

If you encounter issues:

1. Make sure both server (port 5000) and client (port 3000) are running
2. Check browser console for errors
3. Verify API is accessible at http://localhost:5000/api/menu

## Production Checklist

- [ ] Configure environment variables
- [ ] Set up database (MongoDB/PostgreSQL)
- [ ] Add authentication middleware
- [ ] Enable HTTPS
- [ ] Set up error logging
- [ ] Add rate limiting
- [ ] Configure CORS for production domain

