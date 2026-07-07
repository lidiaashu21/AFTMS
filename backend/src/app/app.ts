import express from "express";
import cors from "cors";
import routes from "../routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running successfully 🚀",
  });
});

// API routes
app.use("/api", routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

export default app;
