# 📝 Collaborative Storytelling Platform  
**Empowering Writers to Create, Connect & Collaborate in Real Time**

<br>

## 🚀 Built for Code-For-Bharat-Season-2

A powerful, interactive platform where users co-author stories in real time, join clubs, participate in challenges, and gamify their creative journey.

<br>

## 🌐 Live Demo

🔗 [**View Live Project**] 

🔑 **Test Login Credentials**  
- **Email**:   
- **Password**: 

<br>

## 🎯 Problem Statement

**Writers lack real-time collaborative tools tailored for storytelling.**  
We built a platform that:
- Encourages co-writing through live editing and version control
- Fosters community through clubs and creative challenges
- Enables content moderation, gamification, and user growth

<br>

## ✨ Key Features

### 💡 Collaboration
- Real-time story editing with Socket.IO
- Forking, merging, and versioning stories
- Draft auto-save and recovery

### 🛡️ Moderation & Roles
- Role-based access: User, Editor, Admin
- Flagging, merging, and reviewing content

### 🧑‍🤝‍🧑 Community
- Clubs, story challenges, and discussion boards
- Messaging, notifications, and leaderboards

### 🏆 Gamification
- Earn points, badges, and maintain writing streaks

<br>

## 🛠️ Tech Stack

| Layer     | Tech Used |
|-----------|-----------|
| **Frontend** | React, React Router, Axios, Socket.IO Client, i18next |
| **Backend**  | Node.js, Express, MongoDB, Mongoose, Socket.IO, JWT |
| **Auth**     | JWT, Passport.js, bcrypt |
| **Dev Tools** | ESLint, Prettier, Nodemon |

<br>

## ⚙️ Setup & Installation

### 🔧 Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/storyapp
JWT_SECRET=your_jwt_secret
PORT=3000
```

Start MongoDB, then run the backend:

```bash
nodemon src/app.js
```

### 🎨 Frontend

```bash
cd frontend
npm install
npm start
```


## 🔐 Environment Variables

Set the following in your `.env` file:

```env
MONGO_URI=
JWT_SECRET=
PORT=
```

<br>

## 📱 API Reference

All routes are RESTful. Authenticated routes require a `Bearer <token>` in the `Authorization` header.
Use Postman or the frontend interface to test.

### Sample Endpoints

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/story/:id`
* `POST /api/story/create`
* `PUT /api/story/:id/fork`
* `PATCH /api/story/:id/merge`
* `GET /api/clubs`
* `GET /api/user/profile`

<br>

## 👥 Team

Names:

Bhagya Vardhan

Anushka Verma

Anirudh Phophalia

Ishwinder Kaur
<br>

## 🗣️ Pitch

In a world full of noise, **collaborative storytelling is the next big frontier**.
Our platform bridges solo writers and global teams with tools to co-create, grow, and tell stories together — live, fun, and gamified.

<br>

## 🤝 Contributing (Post-Hackathon)

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am "Add new feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a Pull Request

<br>


**Made with ❤️ by Team Blue Spies **

> *“Stories are best told together — one chapter at a time.”* ✍️🌍

