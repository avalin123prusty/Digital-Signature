# Spring Boot Backend - Quick Start

## Prerequisites

- Java 17+ installed ([Download](https://www.oracle.com/java/technologies/downloads/#java17))
- Maven 3.8+ installed ([Download](https://maven.apache.org/))
- MongoDB URI from MongoDB Atlas

## 1️⃣ Configure Database (1 minute)

Edit `server-springboot/src/main/resources/application.yml`:

```yaml
spring:
  data:
    mongodb:
      uri: mongodb+srv://your_username:your_password@cluster.mongodb.net/digital-signature?retryWrites=true&w=majority

jwt:
  secret: your_secret_key_here
```

## 2️⃣ Build Project (2 minutes)

```bash
cd server-springboot
mvn clean install
```

## 3️⃣ Run Application (1 minute)

```bash
mvn spring-boot:run
```

Or run as JAR:
```bash
mvn clean package -DskipTests
java -jar target/digital-signature-springboot-1.0.0.jar
```

✅ Server runs on `http://localhost:5000`

## 4️⃣ Test It

### Check Health
```bash
curl http://localhost:5000/api/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## ✨ Features

✅ JWT Authentication  
✅ MongoDB Integration  
✅ File Upload (PDF)  
✅ Signature Management  
✅ Audit Trail  
✅ CORS Enabled  
✅ Swagger Documentation  

## 📚 Endpoints

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | /api/auth/register | ❌ |
| POST | /api/auth/login | ❌ |
| POST | /api/documents/upload | ✅ |
| GET | /api/documents | ✅ |
| GET | /api/documents/:id | ✅ |
| POST | /api/signatures | ✅ |
| GET | /api/signatures/:documentId | ✅ |
| GET | /api/audit/:documentId | ✅ |

## 🔄 Switch from Node.js

If you were using the Node.js backend:

```bash
# Stop Node.js
Ctrl+C

# Start Spring Boot
cd server-springboot
mvn spring-boot:run
```

Frontend works with both! No changes needed.

## 📦 Build JAR for Production

```bash
mvn clean package -DskipTests
# JAR created: target/digital-signature-springboot-1.0.0.jar
```

Deploy to any Java server.

## 🐛 Troubleshooting

**Port 5000 in use?**
- Change in `application.yml`: `server.port: 5001`

**MongoDB error?**
- Verify connection string in `application.yml`
- Check IP is whitelisted in MongoDB Atlas

**Build fails?**
```bash
mvn clean
mvn install
```

## 📖 Documentation

- Full guide: `server-springboot/README.md`
- Migration guide: `SPRING_BOOT_MIGRATION.md`
- Main README: `README.md`

---

**Ready to go! 🚀**
