// routes/busRoutes.js
import express from "express";
import Bus from "../models/Bus.js";

const router = express.Router();

// GET all buses
router.get("/", async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST to add a bus
router.post("/", async (req, res) => {
  const newBus = new Bus(req.body);
  try {
    const savedBus = await newBus.save();
    res.status(201).json(savedBus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
