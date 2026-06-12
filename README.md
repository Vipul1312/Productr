# Productr

A full-stack product listing application where users can login via OTP, add products, publish/unpublish them, edit and delete. Built with React, Node.js, Express and MongoDB.

## Tech Stack
- Frontend: React.js (Vite), React Router, Axios
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- File Upload: Multer

## Folder Structure
\`\`\`
productr/
├── client/    (React frontend)
└── server/    (Express backend)
\`\`\`

## Getting Started

### Backend
\`\`\`bash
cd server
npm install
npm run dev
\`\`\`
Create a \`.env\` file in /server:
\`\`\`
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
\`\`\`

### Frontend
\`\`\`bash
cd client
npm install
npm run dev
\`\`\`
Create a \`.env\` file in /client:
\`\`\`
VITE_API_URL=http://localhost:5000/api
VITE_SERVER_URL=http://localhost:5000
\`\`\`

## Features
- OTP based login flow
- Add / Edit / Delete products
- Publish & Unpublish products
- Image upload (multiple)
- Form validation and error handling
- Responsive design

## Live Demo
- Frontend: https://productr.vercel.app
- Backend: https://productr-api.onrender.com
