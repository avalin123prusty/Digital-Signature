# Spring Boot Backend - Setup Guide

## Prerequisites

- Java 17+ (Download from [oracle.com](https://www.oracle.com/java/technologies/downloads/#java17))
- Maven 3.8+ (Download from [maven.apache.org](https://maven.apache.org/download.cgi))
- MongoDB (local or MongoDB Atlas)
- IDE: IntelliJ IDEA, Eclipse, or VS Code with Java Extension Pack

## Project Structure

```
server-springboot/
├── src/main/
│   ├── java/com/digitalsignature/
│   │   ├── DigitalSignatureApplication.java    # Main entry point
│   │   ├── config/                             # Configuration classes
│   │   │   ├── SecurityConfig.java
│   │   │   └── CorsConfig.java
│   │   ├── controllers/                        # REST endpoints
│   │   │   ├── AuthController.java
│   │   │   ├── DocumentController.java
│   │   │   ├── SignatureController.java
│   │   │   ├── AuditController.java
│   │   │   └── HealthController.java
│   │   ├── services/                           # Business logic
│   │   │   ├── AuthService.java
│   │   │   ├── DocumentService.java
│   │   │   ├── SignatureService.java
│   │   │   └── AuditService.java
│   │   ├── models/                             # Data models
│   │   │   ├── User.java
│   │   │   ├── Document.java
│   │   │   ├── Signature.java
│   │   │   └── Audit.java
│   │   ├── repositories/                       # MongoDB repositories
│   │   │   ├── UserRepository.java
│   │   │   ├── DocumentRepository.java
│   │   │   ├── SignatureRepository.java
│   │   │   └── AuditRepository.java
│   │   ├── security/                           # JWT security
│   │   │   ├── JwtTokenProvider.java
│   │   │   └── JwtAuthenticationFilter.java
│   │   └── dto/                                # Data transfer objects
│   │       ├── RegisterRequest.java
│   │       ├── LoginRequest.java
│   │       ├── AuthResponse.java
│   │       ├── UserDTO.java
│   │       ├── SignatureRequest.java
│   │       └── ApiResponse.java
│   └── resources/
│       └── application.yml                     # Application configuration
├── pom.xml                                     # Maven dependencies
└── README.md                                   # This file
```

## Installation & Setup

### Step 1: Install Java 17

Verify installation:
```bash
java -version
```

### Step 2: Install Maven

Verify installation:
```bash
mvn -version
```

### Step 3: Configure Application

Edit `src/main/resources/application.yml`:

```yaml
spring:
  data:
    mongodb:
      uri: mongodb+srv://your_username:your_password@cluster.mongodb.net/digital-signature?retryWrites=true&w=majority

jwt:
  secret: your_jwt_secret_key_here_change_in_production
  expiration: 604800000
```

### Step 4: Build the Project

```bash
mvn clean install
```

### Step 5: Run the Application

```bash
mvn spring-boot:run
```

Or build and run JAR:
```bash
mvn clean package
java -jar target/digital-signature-springboot-1.0.0.jar
```

Server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Documents
- `POST /api/documents/upload` - Upload PDF (protected)
- `GET /api/documents` - Get user's documents (protected)
- `GET /api/documents/:id` - Get document details (protected)
- `GET /api/documents/:id/download` - Download document (protected)

### Signatures
- `POST /api/signatures` - Save signature (protected)
- `GET /api/signatures/:documentId` - Get document signatures (protected)
- `PATCH /api/signatures/:signatureId` - Update signature status (protected)

### Audit
- `GET /api/audit/:documentId` - Get audit trail (protected)
- `GET /api/audit/user/trail` - Get user's audit trail (protected)

### Health
- `GET /api/health` - Health check

## Testing with Postman

1. Import `Postman_Collection.json`
2. Set `{{base_url}}` to `http://localhost:5000/api`
3. Test endpoints

## Key Technologies

- **Spring Boot 3.1.0** - Application framework
- **Spring Data JPA** - Database access
- **H2** - In-memory relational database
- **Spring Security** - Authentication & Authorization
- **JWT** - Token-based authentication
- **Lombok** - Code generation
- **Swagger/OpenAPI** - API documentation

## Dependencies

See `pom.xml` for complete list. Key dependencies:

```xml
- spring-boot-starter-web
- spring-boot-starter-data-jpa
- com.h2database:h2
- spring-boot-starter-security
- jjwt (JWT library)
- lombok
- pdfbox (PDF processing)
```

## Development Tips

### Reload on Changes
Maven DevTools automatically reload changes during development:
```bash
mvn spring-boot:run
```

### View Swagger Documentation
Once running, visit: `http://localhost:5000/swagger-ui.html`

### Enable Debug Mode
Add to `application.yml`:
```yaml
logging:
  level:
    root: DEBUG
```

## Build a JAR for Deployment

```bash
mvn clean package -DskipTests
```

JAR file will be created at: `target/digital-signature-springboot-1.0.0.jar`

Deploy to any Java-enabled server (Heroku, AWS EC2, Azure App Service, etc.)

## Database Setup (MongoDB Atlas)

1. Create MongoDB Atlas account
2. Create cluster
3. Create database user
4. Whitelist your IP
5. Get connection string
6. Update `application.yml` with your connection string

## Environment Variables (Production)

Instead of hardcoding, use environment variables:

```bash
export MONGODB_URI=mongodb+srv://...
export JWT_SECRET=your_secret_key
export PORT=8080

java -jar app.jar
```

Or in Docker environment file `.env`:
```
MONGODB_URI=...
JWT_SECRET=...
```

## Troubleshooting

### Port 5000 already in use
```bash
# Change port in application.yml
server:
  port: 5001
```

### MongoDB Connection Error
- Check connection string format
- Verify credentials are URL encoded
- Ensure IP is whitelisted in MongoDB Atlas

### JWT Error
- Verify JWT_SECRET is same as in .env
- Check token format in Authorization header
- Ensure token hasn't expired

## Next Steps

1. Replace Node.js backend references with Spring Boot
2. Update frontend API URLs if needed
3. Test all endpoints with Postman
4. Deploy to production platform
5. Configure monitoring and logging

## Useful Commands

```bash
# Build
mvn clean package

# Run tests
mvn test

# Run application
mvn spring-boot:run

# Generate JAR
mvn clean package -DskipTests

# View dependencies
mvn dependency:tree

# Format code
mvn com.spotify.fmt:fmt-maven-plugin:format
```

## Deployment Options

- **Heroku**: Easy deployment with `Procfile`
- **AWS EC2**: Deploy JAR on EC2 instance
- **Azure App Service**: Native Spring Boot support
- **Google Cloud Run**: Containerized deployment
- **DigitalOcean**: Simple VPS deployment
- **Railway**: Simple deploy from GitHub

## Documentation

- [Spring Boot Official Docs](https://spring.io/projects/spring-boot)
- [Spring Data MongoDB](https://spring.io/projects/spring-data-mongodb)
- [Spring Security](https://spring.io/projects/spring-security)
- [JWT (jjwt)](https://github.com/jwtk/jjwt)

---

**Spring Boot backend is ready! 🚀**
