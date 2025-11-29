// server.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
require("dotenv").config();

// DEBUG CHECK
console.log("🔍 ENVIRONMENT VARIABLES CHECK:");
console.log("EMAIL_USER loaded:", process.env.EMAIL_USER ? "✅ YES" : "❌ NO");
console.log("EMAIL_PASSWORD loaded:", process.env.EMAIL_PASSWORD ? "✅ YES" : "❌ NO");
console.log("ADMIN_EMAIL loaded:", process.env.ADMIN_EMAIL ? "✅ YES" : "❌ NO");
console.log("FRONTEND_URL:", process.env.FRONTEND_URL || "not set (add your deployed frontend URL)");
console.log("LOCAL_DEV_ORIGIN:", "http://localhost:5173");

// Use Render / host provided port if available
const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

// Simple request logger to help debug deployed requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - origin: ${req.headers.origin} - from ${req.ip}`);
  next();
});

// CORS configuration (supports credentials - explicit origins)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL, // set this in Render env as e.g. https://your-frontend.com
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        const msg = `CORS for origin ${origin} not allowed`;
        return callback(new Error(msg), false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// handle preflight for all routes (helpful)
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", req.headers.origin || "");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.sendStatus(204);
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/internship", require("./routes/internRoutes"));
app.use("/api/achievements", require("./routes/achievementRoutes"));
app.use("/api/activities", require("./routes/activitiesRoutes"));
app.use("/api/semesterInfo", require("./routes/semInfoRoutes"));
app.use("/api/admission", require("./routes/admissionRoutes"));
app.use("/api/placement", require("./routes/PlacementRoutes"));
app.use("/api/higherStudies", require("./routes/HigherStudiesRoutes"));
app.use("/api/student", require("./routes/StudentRoutes"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Helpful 404 for unknown API endpoints
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "Not Found - check the path. Try GET / or /api/whatever",
    path: req.originalUrl,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
