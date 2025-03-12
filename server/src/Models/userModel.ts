import mongoose, { Document, Schema } from "mongoose";

// Define an interface for TypeScript
export interface IUser extends Document {
  name: string;
  email: string;
}

// Define the Mongoose schema
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true } // Adds createdAt & updatedAt fields
);

// Create Mongoose model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
