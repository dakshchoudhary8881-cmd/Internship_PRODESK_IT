// ============================================
// models/Post.js — Post Mongoose Schema
// ============================================
// Defines the Post schema with title, content, category,
// tags, image, authorId (ref → User), likes, slug,
// readingTime, soft-delete flag, and automatic timestamps.
// ============================================

const mongoose = require("mongoose");
const slugify = require("slugify");

const postSchema = new mongoose.Schema(
  {
    // Post title
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },

    // URL-friendly slug auto-generated from the title
    slug: {
      type: String,
      unique: true,
      index: true,
    },

    // Full post body
    content: {
      type: String,
      required: [true, "Content is required"],
    },

    // Post category
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    // Array of tag strings
    tags: {
      type: [String],
      default: [],
    },

    // Optional cover image URL
    image: {
      type: String,
      default: "",
      trim: true,
    },

    // Reference to the User who authored this post
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author ID is required"],
    },

    // Like counter
    likes: {
      type: Number,
      default: 0,
      min: [0, "Likes cannot be negative"],
    },

    // Estimated reading time in minutes (auto-calculated)
    readingTime: {
      type: Number,
      default: 1,
    },

    // Soft delete flag — true means the post is "trashed"
    isDeleted: {
      type: Boolean,
      default: false,
    },

    // When the post was soft-deleted
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt + updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ============================================
// Pre-save hook: generate slug + reading time
// ============================================
postSchema.pre("save", function (next) {
  // Generate slug from title
  if (this.isModified("title")) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    }) + "-" + Date.now().toString(36);
  }

  // Calculate estimated reading time (average 200 words per minute)
  if (this.isModified("content")) {
    const wordCount = this.content.split(/\s+/).filter(Boolean).length;
    this.readingTime = Math.max(1, Math.ceil(wordCount / 200));
  }

  next();
});

// ============================================
// Index for text search across title, content, and category
// ============================================
postSchema.index({ title: "text", content: "text", category: "text" });

module.exports = mongoose.model("Post", postSchema);
