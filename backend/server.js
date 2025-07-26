import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

// Routes
import busRoutes from "./routes/busRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Load .env variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.send("🚀 University Bus Tracker API is Running...");
});

// Routes
app.use("/api/buses", busRoutes); // ✅ Mounted properly
app.use("/api/users", userRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bus-tracker";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// WebSocket Events
io.on("connection", (socket) => {
  console.log("🔗 New client connected");

  // Listen for location updates from bus drivers
  socket.on("updateLocation", (data) => {
    console.log("📍 Bus location received:", data);
    io.emit("busLocationUpdated", data); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

// Graceful Shutdown
const gracefulShutdown = () => {
  console.log("⏹️ Shutting down gracefully...");
  mongoose.connection.close(() => {
    console.log("✅ MongoDB connection closed");
    httpServer.close(() => {
      console.log("✅ HTTP server closed");
      process.exit(0);
    });
  });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

// Start Server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📡 WebSocket server listening on port ${PORT}`);
});
