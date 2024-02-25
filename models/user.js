import mongooose from "mongoose";
const userSchema = mongooose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

export default mongooose.model("User", userSchema);
