import { Schema, model } from "mongoose";

const AttendeeModel = new Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
  },
});

export default model("Attendee", AttendeeModel);
