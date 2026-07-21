// ============================================
// utils/ApiFeatures.js — Reusable Query Builder
// ============================================
// Encapsulates filtering, searching, sorting, and
// pagination logic into a chainable class so that
// controllers stay clean and database queries stay DRY.
// ============================================

class ApiFeatures {
  /**
   * @param {import("mongoose").Query} query — Mongoose query object
   * @param {Object} queryString — req.query from Express
   */
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // ============================================
  // Filter by category, author, or any direct field match
  // ============================================
  filter() {
    const queryObj = { ...this.queryString };

    // Fields to exclude from direct filtering
    const excludedFields = ["sort", "page", "limit", "search", "fields"];
    excludedFields.forEach((field) => delete queryObj[field]);

    // Always exclude soft-deleted posts
    queryObj.isDeleted = false;

    this.query = this.query.find(queryObj);
    return this;
  }

  // ============================================
  // Full-text keyword search across title, content, category
  // Uses regex for partial matching
  // ============================================
  search() {
    if (this.queryString.search) {
      const keyword = this.queryString.search.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );
      const regex = new RegExp(keyword, "i");

      this.query = this.query.find({
        $or: [
          { title: { $regex: regex } },
          { content: { $regex: regex } },
          { category: { $regex: regex } },
        ],
      });
    }
    return this;
  }

  // ============================================
  // Sort by query parameter or default to newest first
  // Supports: ?sort=latest | oldest | likes
  // ============================================
  sort() {
    if (this.queryString.sort) {
      switch (this.queryString.sort) {
        case "latest":
          this.query = this.query.sort({ createdAt: -1 });
          break;
        case "oldest":
          this.query = this.query.sort({ createdAt: 1 });
          break;
        case "likes":
          this.query = this.query.sort({ likes: -1 });
          break;
        default:
          // Accept raw MongoDB sort strings: e.g. "-createdAt,title"
          this.query = this.query.sort(this.queryString.sort.split(",").join(" "));
      }
    } else {
      // Default: newest first
      this.query = this.query.sort({ createdAt: -1 });
    }
    return this;
  }

  // ============================================
  // Paginate: ?page=1&limit=10
  // Returns pagination metadata alongside the query
  // ============================================
  async paginate() {
    const page = Math.max(1, parseInt(this.queryString.page, 10) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(this.queryString.limit, 10) || 10));
    const skip = (page - 1) * limit;

    // Count total documents matching the current filter
    const totalDocuments = await this.query.model.countDocuments(this.query.getFilter());
    const totalPages = Math.ceil(totalDocuments / limit);

    this.query = this.query.skip(skip).limit(limit);

    this.pagination = {
      currentPage: page,
      totalPages,
      totalDocuments,
      resultsPerPage: limit,
    };

    return this;
  }
}

module.exports = ApiFeatures;
