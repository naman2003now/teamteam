import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  attendees: {
    type: [String],
    default: [],
  },
});

export default model("Event", eventSchema);
