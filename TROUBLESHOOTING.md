# 🔧 Troubleshooting Guide

Common issues and solutions for the Digital Signature application.

## Installation Issues

### Issue: npm install fails
**Error**: `npm ERR! code ERESOLVE`

**Solutions**:
```bash
# Option 1: Use legacy peer deps
npm install --legacy-peer-deps

# Option 2: Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Option 3: Use Node v16
nvm use 16
npm install
```

### Issue: Node modules missing
**Error**: `Cannot find module 'express'`

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## Backend Issues

### Issue: Port 5000 already in use
**Error**: `listen EADDRINUSE :::5000`

**Solutions**:
```bash
# macOS/Linux - Find and kill process
lsof -i :5000
kill -9 <PID>

# Windows - Use different port
# Edit server/.env:
PORT=5001

# Then restart server
npm run dev
```

### Issue: MongoDB connection fails
**Error**: `MongooseError: Unable to connect`

**Solutions**:
```
1. Check connection string format:
   mongodb+srv://username:password@cluster.mongodb.net/database

2. Verify credentials:
   - Username and password are URL encoded
   - Use correct database name

3. Whitelist IP in MongoDB Atlas:
   - Go to Network Access
   - Add your IP (or 0.0.0.0 for all)

4. Check connection string variables:
   - ${MONGODB_URI} in server.js
   - Check .env file exists
   - Verify MONGODB_URI is set

5. Test connection:
   mongosh "your_connection_string"
```

### Issue: JWT errors
**Error**: `JsonWebTokenError: invalid token`

**Solutions**:
```
1. Check JWT_SECRET is same:
   - Backend .env
   - Server restart needed after change

2. Verify token format:
   - Should include "Bearer " prefix in requests
   - Authorization: Bearer <token>

3. Check token expiration:
   - See server logs for "TokenExpiredError"
   - User needs to login again
```

### Issue: CORS errors
**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solutions**:
```
1. Update FRONTEND_URL in server/.env:
   FRONTEND_URL=http://localhost:3000

2. Check exact URL matches:
   - Must include http:// or https://
   - Must match exact port
   - No trailing slashes

3. Restart backend after changes:
   npm run dev
```

### Issue: File upload fails
**Error**: `File not found` or `Cannot POST /api/documents/upload`

**Solutions**:
```
1. Check uploads folder exists:
   mkdir -p server/uploads
   chmod 755 server/uploads

2. Verify file is PDF:
   - Only .pdf files accepted
   - Check MIME type

3. Check file size:
   - Max 50MB
   - Verify file size < limit

4. Check Multer middleware:
   - Verify in documentRoutes.js
   - Check uploadMiddleware.js config
```

### Issue: Database doesn't show data
**Error**: No collections in MongoDB

**Solutions**:
```
1. Verify database name matches:
   - .env: digital-signature
   - MongoDB Atlas console

2. Try creating a user:
   POST /api/auth/register
   - Should create collections automatically

3. Check MongoDB Atlas connection:
   - Ensure connected to right cluster
   - Check selected database in connection string
```

---

## Frontend Issues

### Issue: Blank page after npm start
**Error**: White/blank screen

**Solutions**:
```bash
# 1. Check browser console (F12)
# Look for JavaScript errors

# 2. Clear cache and restart
rm -rf node_modules package-lock.json
npm install
npm start

# 3. Check React version compatibility
npm list react

# 4. Kill port 3000 and restart
lsof -i :3000
kill -9 <PID>
npm start
```

### Issue: Cannot connect to backend
**Error**: `Failed to fetch` or `Network Error`

**Solutions**:
```
1. Verify backend is running:
   - Check terminal: "Server running on port 5000"
   - Test: curl http://localhost:5000/api/health

2. Check CORS configuration:
   - Backend .env FRONTEND_URL=http://localhost:3000
   - Restart backend

3. Check API URLs in frontend:
   - Verify in client/src/services/api.js
   - API_BASE_URL should be http://localhost:5000/api

4. Check browser console for details
```

### Issue: Login button not working
**Error**: Form submits but nothing happens

**Solutions**:
```
1. Check browser console (F12):
   - Look for JavaScript errors
   - Look for network errors (Network tab)

2. Verify backend is running:
   - Check port 5000

3. Check credentials:
   - User must exist in database
   - Password must be exact match (case-sensitive)

4. Check auth context:
   - Verify AuthProvider wraps entire app in App.js
   - Check localStorage has 'token' after login
```

### Issue: Token not persisting
**Error**: Logged out after page refresh

**Solutions**:
```
1. Check localStorage:
   - Open DevTools
   - Application tab → localStorage
   - Should have 'token' and 'user'

2. Verify AuthContext initializes token:
   - Check: localStorage.getItem('token')
   - Should restore on page load

3. Check browser privacy settings:
   - Some browsers block localStorage
   - Check incognito mode
```

### Issue: Route not found (404)
**Error**: "Cannot GET /dashboard"

**Solutions**:
```
1. Verify routes in App.js:
   - Check path exactly matches
   - Case-sensitive

2. Check routing library:
   - react-router-dom should be installed
   - v6 syntax used

3. Restart frontend:
   npm start
```

---

## API Issues

### Issue: 401 Unauthorized errors
**Error**: `{ error: 'No token provided' }`

**Solutions**:
```
1. Verify token exists:
   - Login first
   - Check localStorage

2. Check Authorization header:
   - Should be: Bearer <token>
   - In Postman: Authorization tab → Bearer token

3. Verify token not expired:
   - Default: 7 days
   - Check server logs
```

### Issue: 400 Bad Request
**Error**: `{ error: 'All fields are required' }`

**Solutions**:
```
1. Check request body:
   - Verify all required fields present
   - Check spelling of field names
   - Verify JSON format

2. Check Content-Type header:
   - Should be "application/json"
   - For file upload: "multipart/form-data"

3. Verify field types:
   - Strings should be quoted
   - Numbers should not be quoted
   - Booleans should be lowercase
```

### Issue: 500 Internal Server Error
**Error**: `{ error: 'Something went wrong!' }`

**Solutions**:
```
1. Check backend logs:
   - Terminal where npm run dev running
   - Look for error message

2. Check database connection:
   - Verify MongoDB is running
   - Check connection string

3. Try again:
   - Sometimes temporary issue
   - Check server logs for pattern

4. Add console.log for debugging:
   - Add to controller function
   - Restart server
   - Repeat request
```

---

## Postman Issues

### Issue: Postman requests fail
**Error**: Cannot connect

**Solutions**:
```
1. Verify backend running:
   npm run dev

2. Check URL:
   - Should be http://localhost:5000/api/...
   - Not https://

3. Check authorization:
   - Type: Bearer Token
   - Paste token from login response

4. Check request body:
   - Type: raw
   - Format: JSON
```

### Issue: Token variable not working
**Error**: {{token}} shows literally

**Solutions**:
```
1. Set variable in collection:
   - Postman window
   - Variables tab
   - Set token value

2. Or use environment:
   - Create environment
   - Set token variable
   - Select environment

3. Use pre-request script:
   - Automatically extract token
   - See Postman docs
```

---

## Performance Issues

### Issue: App loads slowly
**Solutions**:
```
1. Check network tab:
   - DevTools F12 → Network
   - Look for large files

2. Check bundle size:
   npm run build
   - See size of components

3. Optimize images/PDFs:
   - Compress before upload
   - Use next-gen formats

4. Add code splitting:
   - React.lazy() for components
   - See React docs
```

### Issue: API responses slow
**Solutions**:
```
1. Check database indexes:
   - Especially on User.email
   - Check queries with .lean()

2. Add caching:
   - Redis for frequently accessed data

3. Optimize queries:
   - Limit fields with .select()
   - Use .populate() carefully

4. Check network:
   - Network tab in DevTools
   - Database logs
```

---

## Security Issues

### Issue: Credentials exposed
**If accidentally committed to GitHub:**

```bash
# Remove from history
git rm --cached server/.env
git commit --amend

# Rotate credentials:
# 1. Change MongoDB password
# 2. Change JWT_SECRET
# 3. Regenerate all tokens
```

### Issue: CORS allows all origins
**Fix:**
```
In server/.env:
FRONTEND_URL=https://yourdomain.com

In server.js:
origin: process.env.FRONTEND_URL || 'http://localhost:3000'
```

---

## Database Issues

### Issue: Can't reset database
**Solutions**:
```
1. Delete collection:
   - MongoDB Atlas console
   - Select database
   - Delete collections

2. Or drop database:
   - MongoDB Atlas console
   - Delete entire database
   - Will recreate on next connect

3. Or use MongoDB Compass:
   - Visual tool for managing data
```

---

## Deployment Issues

### Issue: Works locally, fails on Render/Vercel
**Solutions**:
```
1. Check environment variables:
   - Set all .env vars in platform settings
   - Verify values are correct

2. Check database access:
   - Render: Can connect to MongoDB Atlas?
   - Add Render IP to MongoDB whitelist

3. Check logs:
   - Platform console
   - Look for errors
   - Backend logs on Render
   - Frontend logs in browser

4. Check build output:
   - npm run build
   - Look for errors
```

---

## Getting Help

1. **Check logs first**
   - Terminal logs (backend)
   - Browser console (F12)
   - Network tab (API calls)

2. **Search in code**
   - Search for error message
   - Check related files

3. **Review documentation**
   - README.md
   - SETUP_DAY1.md
   - Inline code comments

4. **Create test case**
   - Isolate issue
   - Test with curl
   - Test with Postman

5. **Ask AI assistant**
   - Share error message
   - Share code snippet
   - Share what you've tried

---

## Quick Reference

| Issue | Quick Fix |
|-------|-----------|
| Port in use | Change port in .env |
| MongoDB error | Update .env, check whitelist |
| CORS error | Restart backend |
| Token error | Login again |
| File upload fails | Check /uploads folder exists |
| API returns 401 | Token missing or expired |
| Blank page | Check console F12 |
| Can't connect to API | Backend not running |

---

**Still stuck? Review the error message carefully and check relevant logs!**

Last updated: 2026-06-04
