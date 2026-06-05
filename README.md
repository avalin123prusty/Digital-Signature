# Digital Signature Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for secure digital document signing with audit trails and signature management.

## Features

✅ **User Authentication** - JWT-based secure registration and login  
✅ **PDF Upload** - Upload documents with Multer  
✅ **Digital Signatures** - Draw or type signatures on documents  
✅ **Signature Management** - Accept/Reject signatures with reasons  
✅ **Audit Trail** - Track all document actions with timestamps and IP addresses  
✅ **Dashboard** - Filter documents by status (Pending, Signed, Rejected)  
✅ **Responsive UI** - Built with React and Tailwind CSS  
✅ **Secure** - Password hashing with bcryptjs, JWT authentication  

## Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT + bcryptjs for security
- Multer for file uploads
- PDF-Lib for PDF processing

**Frontend:**
- React 18
- React Router v6
- Tailwind CSS
- Axios for API calls
- react-dropzone for file uploads
- react-pdf for PDF viewing

## Project Structure

```
Digital Signature/
├── server/
│   ├── models/              # Mongoose schemas
│   │   ├── User.js
│   │   ├── Document.js
│   │   ├── Signature.js
│   │   └── Audit.js
│   ├── routes/              # API routes
│   ├── controllers/         # Business logic
│   ├── middleware/          # Auth & upload middleware
│   ├── uploads/             # Uploaded PDFs
│   ├── server.js            # Main server file
│   ├── package.json
│   └── .env.example
├── client/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context (Auth)
│   │   ├── services/       # API service layer
│   │   ├── App.js
│   │   └── index.js
│   ├── public/             # Static files
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14+) and npm
- MongoDB (local or Atlas)
- Git

### Backend Setup

1. **Navigate to server folder:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Update .env with your values:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/digital-signature
   JWT_SECRET=your_secret_key_here
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

5. **Start backend server:**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client folder:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start React development server:**
   ```bash
   npm start
   ```
   App runs on `http://localhost:3000`

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

## Usage Flow

1. **Register/Login** - Create account or sign in
2. **Upload Document** - Drag & drop PDF on dashboard
3. **View Document** - Click "View & Sign" to open document
4. **Add Signature** - Draw or type signature on the document
5. **Track Changes** - View audit trail of all actions
6. **Manage Signatures** - Accept or reject signatures with reasons

## Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Document
```javascript
{
  userId: ObjectId (ref: User),
  fileName: String,
  filePath: String,
  fileSize: Number,
  status: String (pending/signed/rejected),
  uploadedAt: Date
}
```

### Signature
```javascript
{
  documentId: ObjectId (ref: Document),
  signerId: ObjectId (ref: User),
  coordinates: { x, y, page },
  signatureText: String,
  signatureImage: String (Base64),
  status: String (pending/signed/rejected),
  reason: String,
  signedAt: Date
}
```

### Audit
```javascript
{
  documentId: ObjectId (ref: Document),
  userId: ObjectId (ref: User),
  action: String (uploaded/signed/rejected/viewed),
  ipAddress: String,
  userAgent: String,
  timestamp: Date
}
```

## Key Features Implementation

### JWT Authentication
All protected routes require Bearer token in Authorization header:
```
Authorization: Bearer <token>
```

### File Upload
- Only PDF files accepted
- Max file size: 50MB
- Files stored in `server/uploads/` directory

### Signature Storage
Signatures are stored as Base64 encoded images or text and positioned using x, y coordinates relative to the PDF page.

### Audit Trail
Every action (upload, sign, reject) is logged with:
- User email
- Action type
- Timestamp
- IP address
- User agent

## Testing with Postman

1. **Register User:**
   - POST `http://localhost:5000/api/auth/register`
   - Body (JSON):
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123",
     "confirmPassword": "password123"
   }
   ```

2. **Login:**
   - POST `http://localhost:5000/api/auth/login`
   - Body (JSON):
   ```json
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

3. **Upload Document:**
   - POST `http://localhost:5000/api/documents/upload`
   - Header: `Authorization: Bearer <token>`
   - Form Data: Select PDF file

## Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Connect GitHub repo to Vercel/Netlify
2. Set `REACT_APP_API_URL=https://your-backend-api.com`
3. Deploy

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Get connection string
3. Add to `.env` as `MONGODB_URI`

## Troubleshooting

**CORS Errors:**
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL

**File Upload Fails:**
- Check `uploads/` folder exists and is writable
- Verify file is PDF format
- Check file size < 50MB

**Token Expired:**
- Clear localStorage and login again
- Check JWT_SECRET is same in .env

**MongoDB Connection Error:**
- Verify connection string in .env
- Check MongoDB Atlas IP whitelist
- Ensure credentials are correct

## Future Enhancements

- [ ] Email notifications for signature requests
- [ ] Real PDF rendering with annotation tools
- [ ] Multiple signature fields per page
- [ ] Signature templates and autofill
- [ ] Advanced PDF processing with PDF-Lib
- [ ] SSO integration (Google, Microsoft)
- [ ] Biometric signature support
- [ ] Advanced analytics dashboard
- [ ] Batch document signing
- [ ] API rate limiting

## License

MIT License

## Support

For issues or questions, please create a GitHub issue or contact support.

---

**Happy Signing! 🔐✍️**
