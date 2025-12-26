# 🎥 PulseGen – Multi-Tenant Video Processing & Streaming Platform

PulseGen is a **full-stack, multi-tenant video platform** that allows users to upload videos, process them, and stream them securely with **role-based access control (RBAC)** and **tenant isolation**.

The system is built with **Node.js, Express, MongoDB, React (Vite)** and supports **secure video streaming using HTTP range requests**.

---

## 🧱 Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- Multer (file uploads)
- JWT Authentication
- Role-Based Access Control (RBAC)
- Multi-tenant architecture
- Video streaming with HTTP range requests

### Frontend

- React (Vite)
- React Router
- Axios
- Context API for Auth
- HTML5 `<video>` streaming

---

## 📁 Project Structure

```
pulsegen/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── uploads/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── context/
    │   ├── components/
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
```

---

## 🔐 Core Features

- User authentication using JWT
- Multi-tenant data isolation
- Role-based permissions:

  - **viewer** – view & stream videos
  - **editor** – upload videos
  - **admin** – full access

- Secure video upload
- Disk-based video storage
- HTTP range-based video streaming
- Frontend dashboard & player

---

## 🚀 Backend Setup

### 1️⃣ Prerequisites

- Node.js **v20+**
- MongoDB (local)
- npm

---

### 2️⃣ Install dependencies

```bash
cd backend
npm install
```

---

### 3️⃣ Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/pulsegen
JWT_SECRET=supersecretkey
```

---

### 4️⃣ Start MongoDB

In a separate terminal:

```bash
mongod
```

> Make sure MongoDB is running before starting the backend.

---

### 5️⃣ Start Backend Server

```bash
npm run dev
```

Expected output:

```
MongoDB connected
Server running on port 5000
```

---

### 6️⃣ Upload Directory

Uploaded videos are stored at:

```
backend/src/uploads/
```

This folder is auto-created if missing.

---

## 🎨 Frontend Setup

### 1️⃣ Install dependencies

```bash
cd frontend
npm install
```

---

### 2️⃣ Start Frontend Dev Server

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔑 Authentication Flow

1. Register a user
2. Login
3. JWT token is stored in context
4. Token is attached to API calls
5. Video streaming uses token via query param

---

## 🎬 Video Upload Flow

1. Login as **editor** or **admin**
2. Upload video using Upload page
3. Video metadata saved in MongoDB
4. File saved to disk via Multer
5. Video listed under **My Videos**

---

## ▶️ Video Streaming Flow

- Frontend uses `<video>` tag
- Backend supports HTTP Range requests
- Streaming endpoint:

```
GET /videos/stream/:id?token=JWT
```

- Backend validates:

  - JWT
  - Tenant ownership
  - File existence
