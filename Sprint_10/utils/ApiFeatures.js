class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };

    const excludedFields = ["sort", "page", "limit", "search", "fields"];
    excludedFields.forEach((field) => delete queryObj[field]);

    queryObj.isDeleted = false;

    this.query = this.query.find(queryObj);
    return this;
  }

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
          this.query = this.query.sort(this.queryString.sort.split(",").join(" "));
      }
    } else {
      this.query = this.query.sort({ createdAt: -1 });
    }
    return this;
  }

  async paginate() {
    const page = Math.max(1, parseInt(this.queryString.page, 10) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(this.queryString.limit, 10) || 10));
    const skip = (page - 1) * limit;

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
