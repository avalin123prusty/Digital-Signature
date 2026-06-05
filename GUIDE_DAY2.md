# Day 2: Auth System (JWT) - Implementation Guide

## Overview
Complete the authentication system with JWT tokens, secure password hashing, and protected routes.

## ✅ What's Already Done

From Day 1 setup, you have:
- ✅ User model with bcryptjs hashing
- ✅ Auth controller with register and login functions
- ✅ Auth middleware for protecting routes
- ✅ JWT token generation
- ✅ Login and Register UI pages
- ✅ Auth context for state management

## 🎯 Day 2 Tasks

### 1. Test Backend Authentication

**Start backend:**
```bash
cd server
npm run dev
```

**Test with Postman or curl:**

```bash
# Test Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'

# Test Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Expected response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

### 2. Test Frontend Authentication

**Start frontend:**
```bash
cd client
npm start
```

**Test flow:**
1. Navigate to http://localhost:3000
2. Click "Register"
3. Fill in form and submit
4. Should redirect to Dashboard
5. Click Logout
6. Navigate to Login
7. Use same credentials to login
8. Should redirect to Dashboard

### 3. Verify Token Storage

Check browser localStorage:
- Open DevTools (F12)
- Go to Application tab
- Check localStorage for `token` and `user` keys

### 4. Test Protected Routes

**Manually verify protection:**
1. Try accessing `/dashboard` without logging in
2. Should redirect to `/login`
3. Login and try accessing `/dashboard`
4. Should load successfully

### 5. Test JWT Expiration

**Current setup:** Tokens expire in 7 days

To test expiration:
1. Modify `expiresIn: '1s'` in `controllers/authController.js`
2. Wait 2 seconds
3. Try making an API call
4. Should return 401 Unauthorized

**Change back to:** `expiresIn: '7d'` for production

### 6. Add Refresh Token (Optional Enhancement)

If you want to implement token refresh:

```javascript
// In controllers/authController.js
const refreshToken = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: '30d' }
);
```

Store refresh token in httpOnly cookie (more secure than localStorage).

## 📋 Authentication Flow Diagram

```
User Registration
    ↓
Validate input (name, email, password)
    ↓
Check if email exists
    ↓
Hash password with bcryptjs
    ↓
Save to MongoDB
    ↓
Generate JWT token
    ↓
Return token + user data
    ↓
Store in localStorage
    ↓
Redirect to Dashboard

User Login
    ↓
Validate input (email, password)
    ↓
Find user by email
    ↓
Compare password with bcrypt
    ↓
Generate JWT token
    ↓
Return token + user data
    ↓
Store in localStorage
    ↓
Redirect to Dashboard
```

## 🔐 Security Best Practices Already Implemented

✅ **Password Hashing**
- Using bcryptjs with salt rounds (10)
- Never storing plain passwords
- Automatic hashing before save

✅ **JWT Authentication**
- Tokens expire after 7 days
- Secret key in environment variables
- Token required for protected routes

✅ **Protected Routes**
- Frontend: ProtectedRoute component checks authentication
- Backend: authMiddleware validates JWT on protected endpoints

✅ **CORS Configuration**
- Only allows requests from frontend URL
- Credentials included in requests

## 🧪 Testing Checklist

- [ ] Register with new email
- [ ] Register with duplicate email (should fail)
- [ ] Register with mismatched passwords (should fail)
- [ ] Login with correct credentials
- [ ] Login with wrong password (should fail)
- [ ] Login with non-existent email (should fail)
- [ ] Token stored in localStorage after login
- [ ] Cannot access protected routes without login
- [ ] Logout clears localStorage
- [ ] Can login again after logout
- [ ] API calls include Authorization header with token

## 🐛 Common Issues & Solutions

**Issue: Registration fails with "Email already exists"**
- Solution: Use a different email address

**Issue: Login fails even with correct credentials**
- Solution: Check password is typed correctly (case-sensitive)
- Verify user exists in MongoDB
- Check JWT_SECRET is same in .env

**Issue: Token not being sent with API requests**
- Solution: Check axios interceptor in `services/api.js`
- Verify token is stored in localStorage
- Check Authorization header format: `Bearer <token>`

**Issue: Protected routes show blank page**
- Solution: Check browser console for errors
- Verify token is valid and not expired
- Check FRONTEND_URL in backend .env

## 📚 Key Files for Day 2

**Backend:**
- `server/models/User.js` - User schema with bcryptjs
- `server/controllers/authController.js` - Register/Login logic
- `server/middleware/authMiddleware.js` - JWT verification
- `server/routes/authRoutes.js` - Auth endpoints

**Frontend:**
- `client/src/context/AuthContext.js` - Auth state management
- `client/src/pages/Login.js` - Login page
- `client/src/pages/Register.js` - Register page
- `client/src/components/ProtectedRoute.js` - Route protection
- `client/src/services/api.js` - API interceptor with token

## ✅ Day 2 Completion Checklist

- [ ] Backend auth endpoints working
- [ ] Frontend registration form working
- [ ] Frontend login form working
- [ ] Token stored in localStorage
- [ ] Protected routes working
- [ ] Logout functionality working
- [ ] Auth context managing state properly
- [ ] All tests passing
- [ ] No console errors
- [ ] README documentation updated

## 🎉 Next Steps

After Day 2 completion, you'll be ready for:
- **Day 3**: File Upload API
- **Day 4**: Document viewing and listing
- **Day 5**: Signature schema and storage

## Advanced Topics (Optional)

### Social Authentication
Consider adding Google/GitHub OAuth:
```bash
npm install passport passport-google-oauth20
```

### Email Verification
Add email confirmation before account activation:
- Generate verification token
- Send email with verification link
- Mark email as verified

### Password Reset
Implement forgot password flow:
- Generate reset token
- Send reset link via email
- Allow password change with token

### Two-Factor Authentication
Add 2FA for enhanced security:
- Generate TOTP code
- User scans QR code
- Verify code on login

---

**Day 2 Status**: Ready to implement and test! 🚀

For questions, check the main README.md or create a GitHub issue.
