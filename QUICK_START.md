# Quick Start Guide

Get your Digital Signature app running in 10 minutes!

## Prerequisites

- Node.js (v14+) installed
- MongoDB account (MongoDB Atlas) OR local MongoDB
- npm (comes with Node.js)

## 1️⃣ Clone and Setup (2 minutes)

```bash
# Navigate to project
cd "Digital Signature"

# Run setup script (Windows)
setup.bat

# OR on macOS/Linux
bash setup.sh
```

**Manual setup if scripts don't work:**
```bash
# Backend setup
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and secrets

# Frontend setup
cd ../client
npm install
```

## 2️⃣ Configure Environment (2 minutes)

**Edit `server/.env`:**
```
MONGODB_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/digital-signature
JWT_SECRET=your_secret_key_here_make_it_long_and_random
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

## 3️⃣ Start Backend (2 minutes)

```bash
cd server
npm run dev
```

✅ Backend runs on `http://localhost:5000`

Check health: `http://localhost:5000/api/health`

## 4️⃣ Start Frontend (2 minutes)

Open another terminal:
```bash
cd client
npm start
```

✅ Frontend runs on `http://localhost:3000`

App opens automatically in your browser!

## 5️⃣ Test It Out (2 minutes)

1. Click **Register**
2. Fill in your details
3. Click **Register** button
4. Redirect to Dashboard
5. Try uploading a PDF (or just test the UI)

🎉 **You're all set!**

## 📚 What's Ready to Use

✅ User authentication (Register/Login)  
✅ JWT tokens for security  
✅ Dashboard with document list  
✅ File upload form  
✅ Responsive design with Tailwind CSS  
✅ Complete API structure  
✅ Database models set up  

## 📁 Project Structure

```
Digital Signature/
├── server/              # Express backend
├── client/              # React frontend
├── README.md            # Full documentation
├── SETUP_DAY1.md        # Day 1 setup details
├── GUIDE_DAY2.md        # Day 2 auth guide
├── ROADMAP.md           # 14-day development plan
├── Postman_Collection.json
├── setup.bat / setup.sh
└── .gitignore
```

## 🧪 Test API with Postman

1. Download and open Postman
2. Import `Postman_Collection.json`
3. Set variables:
   - `token` - Copy from login response
   - `documentId` - Copy from upload response
4. Test endpoints

## 🐛 Troubleshooting

**Port 5000 already in use?**
```bash
# Change PORT in server/.env to 5001
# Or kill process: lsof -i :5000 | kill (macOS/Linux)
```

**MongoDB connection error?**
- Check MONGODB_URI is correct
- Verify IP is whitelisted in MongoDB Atlas
- Check username/password

**Frontend won't load?**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

**CORS error?**
- Verify FRONTEND_URL in server/.env matches http://localhost:3000

## 📖 Documentation Files

- **README.md** - Complete project documentation
- **SETUP_DAY1.md** - Detailed Day 1 setup
- **GUIDE_DAY2.md** - Auth system implementation guide
- **ROADMAP.md** - Full 14-day development plan

## 🚀 Next Steps

1. **Complete Day 2**: Full auth testing
2. **Move to Day 3**: Implement file upload
3. **Day 4+**: Add signature features
4. **Week 2**: Deploy to production

See `ROADMAP.md` for detailed timeline.

## 💬 Support

- Check the README.md for detailed documentation
- Review GUIDE_DAY2.md for auth implementation
- Look at Postman Collection for API examples
- Check browser console for JavaScript errors
- Check server logs for API errors

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Mongoose](https://mongoosejs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JWT Documentation](https://jwt.io/)

---

**Happy coding! 🚀**

Questions? Check the README.md or review the code comments!
