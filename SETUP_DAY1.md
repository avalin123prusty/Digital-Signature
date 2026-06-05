# Setup Guide - Day 1: Project Setup & Repo Initialization

## Objective
Set up a complete MERN project structure with all necessary dependencies and folder organization.

## What's Included

### Backend Setup
✅ Express.js server with CORS support  
✅ MongoDB connection with Mongoose  
✅ JWT authentication middleware  
✅ Multer file upload configuration  
✅ Environment variables setup (.env)  
✅ API routes structure (auth, documents, signatures, audit)  

### Frontend Setup
✅ React 18 with React Router v6  
✅ Tailwind CSS for styling  
✅ Axios for API calls  
✅ Context API for state management  
✅ Protected routes  
✅ Reusable components  

### Database Models
✅ User model with password hashing  
✅ Document model with status tracking  
✅ Signature model with coordinates  
✅ Audit model for logging  

## Quick Start

### 1. Backend Installation & Setup

```bash
cd server
npm install
cp .env.example .env
```

**Edit .env file** with your values:
```
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/digital-signature
JWT_SECRET=your_super_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

**Start backend:**
```bash
npm run dev
```

### 2. Frontend Installation & Setup

```bash
cd client
npm install
npm start
```

### 3. Verify Installation

- Backend: Visit `http://localhost:5000/api/health`
- Frontend: Visit `http://localhost:3000`

## Project Structure

```
server/
├── models/
│   ├── User.js          # User schema with password hashing
│   ├── Document.js      # Document upload tracking
│   ├── Signature.js     # Signature data with coordinates
│   └── Audit.js         # Action logging
├── routes/              # API endpoints
├── controllers/         # Business logic
├── middleware/          # Auth & file upload
├── uploads/             # Uploaded PDFs storage
├── server.js            # Express server
├── package.json
└── .env.example

client/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page-level components
│   ├── context/        # React Context (Auth)
│   ├── services/       # API service layer
│   ├── index.css       # Tailwind CSS imports
│   ├── App.js          # Main app with routing
│   └── index.js        # React entry point
├── public/             # Static files
├── tailwind.config.js  # Tailwind configuration
└── package.json
```

## Key Features Ready

1. **User Authentication**
   - Register with email/password
   - Login with JWT token
   - Secure password hashing with bcryptjs

2. **API Structure**
   - Clean separation of concerns
   - Auth middleware on protected routes
   - Audit logging on all actions

3. **Frontend Navigation**
   - Public pages: Home, Login, Register
   - Protected pages: Dashboard, Document Viewer
   - Auth context for state management

## Next Steps

- **Day 2**: Implement full auth system with JWT
- **Day 3**: Complete file upload API
- **Day 4**: Build document viewing with PDF rendering
- **Day 5+**: Add signature functionality and final features

## Common Issues & Solutions

**MongoDB Connection Error:**
- Check your connection string in .env
- Ensure IP is whitelisted in MongoDB Atlas
- Verify username/password are correct

**CORS Error:**
- Update FRONTEND_URL in backend .env
- Match exactly with frontend URL

**Port Already in Use:**
- Change PORT in .env (e.g., 5001)
- Or kill process using the port

**Dependencies Not Installing:**
- Delete `node_modules` folder
- Run `npm cache clean --force`
- Run `npm install` again

## Testing the Setup

### 1. Test Backend Health Check
```bash
curl http://localhost:5000/api/health
```

Expected response: `{ "status": "Backend is running" }`

### 2. Test Auth Registration (Postman)
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### 3. Test Frontend
- Navigate to `http://localhost:3000`
- Click Register
- Fill in form and submit

## Deployment Checklist

- [ ] Change JWT_SECRET to secure random string
- [ ] Set NODE_ENV=production for backend
- [ ] Use MongoDB Atlas for production database
- [ ] Deploy backend to Render/Railway
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Update FRONTEND_URL and API URLs for production

---

**You're all set! Your MERN Digital Signature application is ready. Start building! 🚀**
