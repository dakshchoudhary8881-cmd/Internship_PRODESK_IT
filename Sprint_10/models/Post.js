const mongoose = require("mongoose");
const slugify = require("slugify");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author ID is required"],
    },

    likes: {
      type: Number,
      default: 0,
      min: [0, "Likes cannot be negative"],
    },

    readingTime: {
      type: Number,
      default: 1,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, 
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    }) + "-" + Date.now().toString(36);
  }

  if (this.isModified("content")) {
    const wordCount = this.content.split(/\s+/).filter(Boolean).length;
    this.readingTime = Math.max(1, Math.ceil(wordCount / 200));
  }

  next();
});

postSchema.index({ title: "text", content: "text", category: "text" });

module.exports = mongoose.model("Post", postSchema);
