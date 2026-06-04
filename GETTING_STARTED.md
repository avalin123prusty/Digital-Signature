# 🚀 Your Digital Signature Project - Getting Started Guide

## ⚡ Quick Start (Choose One)

### Option A: Node.js Backend (DEFAULT - Recommended for most users)

```bash
# 1. Navigate to Node.js directory
cd server

# 2. Install dependencies
npm install

# 3. Configure MongoDB (create .env file)
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

# 4. Run
npm run dev

# ✅ Backend runs on http://localhost:5000
```

**Benefits:**
- Default startup path for the project
- Lower resource usage
- Faster startup
- JavaScript everywhere
- Rapid development

### Option B: Spring Boot Backend (Optional - Enterprise-grade)

```bash
# 1. Navigate to Spring Boot directory
cd server-springboot

# 2. Configure MongoDB (edit src/main/resources/application.yml)
# Set: MONGODB_URI and JWT_SECRET

# 3. Build
mvn clean install

# 4. Run
mvn spring-boot:run

# ✅ Backend runs on http://localhost:5000
```

**Benefits:**
- Enterprise-grade performance
- Type-safe Java code
- Better scalability
- Production-proven

### React Frontend (Works with Both)

```bash
# In new terminal window
cd client
npm install
npm start

# ✅ Frontend runs on http://localhost:3000
```

---

## 📊 Quick Comparison

| Task | Spring Boot | Node.js |
|------|-----------|---------|
| Navigate | `cd server-springboot` | `cd server` |
| Install | `mvn clean install` | `npm install` |
| Configure | Edit `application.yml` | Create `.env` |
| Run | `mvn spring-boot:run` | `npm run dev` |
| Port | 5000 | 5000 |
| Language | Java | JavaScript |

---

## ✅ Verify It Works

### 1. Check Backend Health
```bash
curl http://localhost:5000/api/health
```

Expected Response:
```json
{
  "status": "Backend is running"
}
```

### 2. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test123!",
    "confirmPassword": "Test123!"
  }'
```

### 3. Open Frontend
Visit: `http://localhost:3000`

---

## 📁 Project Structure

```
Digital Signature/
├── server/                    # Node.js backend (17 files)
├── server-springboot/         # Spring Boot backend (30 Java files)
├── client/                    # React frontend (18 files)
├── Documentation/
│   ├── README.md              # Main documentation
│   ├── SPRING_BOOT_QUICK_START.md
│   ├── SPRING_BOOT_MIGRATION.md
│   ├── TROUBLESHOOTING.md
│   └── ... (7 more docs)
└── Configuration files        # .gitignore, Postman collection, etc.
```

---

## 🎯 Features Available

✅ User Registration & Login  
✅ JWT Authentication  
✅ PDF File Upload  
✅ Digital Signatures  
✅ Signature Verification  
✅ Audit Trail  
✅ Document Status Tracking  
✅ User Dashboard  
✅ Signature Management  

---

## 📚 Documentation

| Document | Purpose | Time |
|----------|---------|------|
| `SPRING_BOOT_QUICK_START.md` | Quick setup (Spring Boot) | 5 min |
| `QUICK_START.md` | Quick setup (Node.js) | 10 min |
| `server-springboot/README.md` | Spring Boot guide | 20 min |
| `server/README.md` | Node.js guide | 20 min |
| `SPRING_BOOT_MIGRATION.md` | Backend comparison | 10 min |
| `README.md` | Full documentation | 30 min |
| `ROADMAP.md` | 14-day development plan | 10 min |
| `TROUBLESHOOTING.md` | Common issues | 5 min |

---

## 🔄 Switching Backends

Want to try the other backend?

### Stop Current Backend
```bash
Ctrl+C
```

### Start Other Backend

**From Node.js to Spring Boot:**
```bash
cd ../server-springboot
mvn clean install
mvn spring-boot:run
```

**From Spring Boot to Node.js:**
```bash
cd ../server
npm install
npm run dev
```

**Frontend automatically works!** No changes needed.

---

## 🧪 Testing with Postman

1. Open Postman
2. Import: `Postman_Collection.json`
3. Set environment variable:
   ```
   base_url = http://localhost:5000/api
   ```
4. Test endpoints

All endpoints work identically for both backends!

---

## ⚙️ Configuration

### Spring Boot (application.yml)
```yaml
spring:
  data:
    mongodb:
      uri: mongodb+srv://username:password@cluster.mongodb.net/digital-signature

jwt:
  secret: your-secret-key
  expiration: 604800000  # 7 days
```

### Node.js (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/digital-signature
JWT_SECRET=your-secret-key
PORT=5000
```

---

## 🚀 What's Included

### Spring Boot Backend (NEW)
- 30 Java files
- Complete REST API (11 endpoints)
- MongoDB integration
- JWT security
- File upload handling
- Audit logging
- Production-ready

### Node.js Backend (ORIGINAL)
- 17 JavaScript files
- Complete REST API (11 endpoints)
- MongoDB integration
- JWT security
- File upload handling
- Audit logging
- Production-ready

### React Frontend (UNCHANGED)
- 18 React components
- User interface
- Authentication flows
- Document management
- Signature application
- Dashboard views

---

## 💡 Recommendations

### For Production
→ Use **Spring Boot** backend
- Better performance
- Enterprise features
- Scalability
- Type safety

### For Learning
→ Try **Both**
- Understand different approaches
- Learn multiple frameworks
- Compare architectures

### For Quick Start
→ Either one works!
- Same API
- Same features
- Same database
- Same frontend

---

## 🔍 API Endpoints (Both Backends)

### Public Endpoints
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/health
```

### Protected Endpoints (Require JWT Token)
```
POST   /api/documents/upload
GET    /api/documents
GET    /api/documents/:id
GET    /api/documents/:id/download

POST   /api/signatures
GET    /api/signatures/:documentId
PATCH  /api/signatures/:signatureId

GET    /api/audit/:documentId
GET    /api/audit/user/trail
```

---

## 🛠️ Troubleshooting

### Port Already in Use
**Spring Boot:**
- Edit `application.yml`
- Change `server.port: 5001`

**Node.js:**
- Run: `PORT=5001 npm run dev`

### MongoDB Connection Error
- Check connection string
- Verify credentials are URL-encoded
- Whitelist IP in MongoDB Atlas

### JWT Error
- Check JWT secret matches config
- Verify token format: `Authorization: Bearer {token}`
- Ensure token hasn't expired

See `TROUBLESHOOTING.md` for more issues.

---

## 📊 Performance

| Metric | Node.js | Spring Boot |
|--------|---------|-----------|
| Startup | 2-3 sec | 5-10 sec |
| Memory | 50-100 MB | 200-300 MB |
| Throughput | Good | Excellent |
| Under Load | Good | Better |
| Scalability | Event-driven | Thread-based |

---

## 🚀 Deployment

Both backends can deploy to:

- Heroku
- Railway
- Render
- AWS EC2
- Azure App Service
- Google Cloud Run
- DigitalOcean
- Docker/Kubernetes

See `README.md` for deployment guides.

---

## 🎓 Learning Path

1. **Day 1**: Setup and run application
   - Choose backend (Spring Boot recommended)
   - Configure database
   - Build and run

2. **Day 2-3**: Test API endpoints
   - Use Postman collection
   - Test registration/login
   - Test file upload

3. **Day 4-5**: Understand codebase
   - Review models
   - Review services
   - Review controllers

4. **Day 6+**: Extend features
   - Add new endpoints
   - Implement advanced features
   - Deploy to production

---

## 🎯 Next Steps

1. **Choose Backend**
   - Spring Boot (recommended) OR Node.js

2. **Setup Database**
   - Create MongoDB Atlas account
   - Get connection string
   - Update config file

3. **Build & Run**
   - Follow quick start above
   - Verify health endpoint
   - Run frontend

4. **Test Features**
   - Register user
   - Upload document
   - Apply signature

5. **Deploy**
   - Build production package
   - Choose hosting platform
   - Deploy application

---

## 📞 Need Help?

1. Check `TROUBLESHOOTING.md` for common issues
2. Read `README.md` for full documentation
3. Review code comments in source files
4. Check documentation in `server/` or `server-springboot/`

---

## ✨ What You Have

✅ **Two Complete Backends** - Choose your preference  
✅ **Modern React Frontend** - Ready to use  
✅ **Complete Documentation** - 8 guides  
✅ **Production-Ready Code** - Deploy anytime  
✅ **Identical APIs** - No frontend changes  

---

## 🎉 You're Ready!

Pick a backend and run:

**Spring Boot:**
```bash
cd server-springboot && mvn clean install && mvn spring-boot:run
```

**Node.js:**
```bash
cd server && npm install && npm run dev
```

**Frontend (separate terminal):**
```bash
cd client && npm install && npm start
```

Then visit: **http://localhost:3000**

---

**Happy coding! 🚀**

Questions? Check the documentation or review code comments.
