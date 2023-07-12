import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  userlocations: [
    {
      placename: { type: String },
      description: { type: String },
      location: {
        lat: { type: String },
        lng: { type: String },
      },
    },
  ],
});

export default mongoose.model("users", userSchema);
