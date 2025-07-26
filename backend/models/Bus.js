// models/Bus.js
import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  BusNumber: Number,
  Route: String,
  Destination: String,
  Driver: String,
  Time: String,
});

export default mongoose.model("Bus", busSchema);
