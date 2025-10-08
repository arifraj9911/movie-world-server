# 🎬 Movie World Backend

This is a backend server built with **Express.js** and **MongoDB (Mongoose)**.  
It provides a REST API for performing CRUD operations on movies and managing their **watch list status**.

---

## 🚀 Live Server
👉 [Movie World Backend Live](https://movie-world-server.onrender.com)

---

## 📌 Features
- Create, Read, Update, Delete (CRUD) operations on movies
- Manage **watch list status** (update)
- Built using **Express.js** and **Mongoose**
- RESTful API structure

---

## 🛠️ Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **Render** (for deployment)

---

## 📂 API Endpoints

### Movies
| Method | Endpoint                          | Description                 |
|--------|-----------------------------------|-----------------------------|
| GET    | `/api/v1/movies/get`              | Get all movies              |
| POST   | `/api/v1/movies/create`           | Create a new movie          |
| GET    | `/api/v1/movies/get/:id`          | Get a single movie by ID    |
| DELETE | `/api/v1/movies/delete/:id`       | Delete a movie by ID        |
| PUT    | `/api/v1/movies/update/:id`       | Update a movie by ID        |
| PATCH  | `/api/v1/movies/watch-status/:id` | Change watch list status    |

---

