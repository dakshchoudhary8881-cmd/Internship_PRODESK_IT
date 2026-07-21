// ============================================
// models/User.js — User Mongoose Schema
// ============================================
// Defines the User schema with name, email, password,
// avatar, role, and automatic timestamps. Email has a
// unique constraint to prevent duplicate registrations.
// ============================================

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Full name of the user
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    // Unique email address
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ],
    },

    // Password (stored as-is; hashing is out of scope for this sprint)
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Exclude from query results by default
    },

    // Optional avatar URL
    avatar: {
      type: String,
      default: "https://api.dicebear.com/7.x/initials/svg?seed=User",
      trim: true,
    },

    // User role for access control
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: populate posts authored by this user
userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "authorId",
  justOne: false,
});

module.exports = mongoose.model("User", userSchema);
