IdeaBoard - React & MongoDB Web Application

A modern web application where users can share ideas, vote on favorites, and discover community suggestions. Built with React, Express.js, and MongoDB.

Features

- 🔐 **User Authentication**: Secure registration and login system
- 💡 **Idea Management**: Submit, view, and manage ideas
- 👍 **Voting System**: Like and unlike ideas to show community preference
- 📱 **Responsive Design**: Beautiful UI that works on all devices

Frontend
- React 18
- CSS3 with modern features (Grid, Flexbox, Animations)
- Google Fonts (Inter & Poppins)
- Responsive design
Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled

Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MongoDB installed locally or access to MongoDB Atlas
- Git

Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd WT_MP2
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/ideaboard
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
PORT=5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
mongod
```

### 5. Run the Application

Start the backend server:
```bash
cd backend
npm run dev
```

In a new terminal, start the frontend:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

Usage

1. **Registration**: Create a new account with your name, email, and password
2. **Login**: Sign in with your credentials
3. **Browse Ideas**: View all community ideas on the home page
4. **Submit Ideas**: Click "Submit" to share your own ideas
5. **Vote**: Like ideas you find interesting
6. **Logout**: Use the logout button when finished

API Endpoints

#Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

#Ideas
- `GET /api/ideas` - Get all ideas (public)
- `POST /api/ideas` - Create new idea (auth required)
- `GET /api/ideas/:id` - Get single idea
- `POST /api/ideas/:id/like` - Like/unlike idea (auth required)
- `DELETE /api/ideas/:id` - Delete idea (author only)

## Project Structure

```
WT_MP2/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Idea.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── ideas.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Header.js
│   │   │   ├── IdeaForm.js
│   │   │   ├── IdeaList.js
│   │   │   └── *.css files
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please contact the development team.