import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /\S+@\S+\.\S+/ },
  password: { type: String, required: true, minlength: 6 },
});

export default mongoose.model("User", UserSchema);
