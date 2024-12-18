import express from 'express';
import connectDB from './config.js';
import dotenv from 'dotenv';
import cors from'cors'
import cookieParser from "cookie-parser";
import userRoutes from './routes/users.route.js';
import authRoutes from './routes/auth.route.js'
import resourceRoutes from './routes/resource.route.js'
import { fileURLToPath } from "url";
import path from "path";




const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
    origin: "https://resource-manager1.onrender.com", // Replace with your frontend URL
    credentials: true, // Enable cookies if needed
}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });
app.options('*', cors()); // Handle preflight requests

app.use(express.json());
app.use(cookieParser())
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://resource-manager1.onrender.com"); // Your frontend URL
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS"); // Allowed HTTP methods
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization"); // Allowed headers
  next();
});
app.use((req, res, next) => {
  console.log("Incoming Cookies:", req.cookies);
  next();
});

app.use('/api/auth',authRoutes)
app.use('/api/user', userRoutes);
app.use('/api/resources',resourceRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    });
  }
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
