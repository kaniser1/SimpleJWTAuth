import express from "express";
import authRoutes from "./routes/authRoutes";
import dotenv from 'dotenv';

// Init env
dotenv.config();
const PORT = process.env.PORT || 3000;

// Init app
export const app = express();

// Middleware for body parsing
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

