import express from "express";
import cors from "cors";
import routes from "../routes";
import { db } from "../db/client";
import { sql } from "drizzle-orm";
import { users } from "../db/schema/user"; // <-- change path if your schema location is different

const app = express();

// =========================
// Middlewares
// =========================

app.use(cors());
app.use(express.json());

// =========================
// Health check route
// =========================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running successfully 🚀",
  });
});

// =========================
// Database connection test
// =========================

app.get("/db-test", async (req, res) => {
  try {
    const result = await db.execute(sql`SELECT NOW()`);

    res.status(200).json({
      success: true,
      database: "connected",
      time: result,
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// =========================
// User table test
// =========================

app.get("/user-test", async (req, res) => {
  try {
    const result = await db.select().from(users);

    res.status(200).json({
      success: true,
      table: "user",
      data: result,
    });
  } catch (error) {
    console.error("User table error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user table",
      error,
    });
  }
});

// =========================
// API routes
// =========================

app.use("/api", routes);

// =========================
// 404 handler
// =========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

export default app;
