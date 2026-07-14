let blogs = [];
let currentId = 1;

const getAllBlogs = () => {
  return blogs;
};

const getBlogById = (id) => {
  return blogs.find((blog) => blog.id === id);
};

const createBlog = ({ title, content, author }) => {
  const newBlog = {
    id: currentId++,
    title,
    content,
    author,
    createdAt: new Date().toISOString(),
  };
  blogs.push(newBlog);
  return newBlog;
};

const updateBlog = (id, { title, content, author }) => {
  const index = blogs.findIndex((blog) => blog.id === id);
  if (index === -1) return null;

  blogs[index] = {
    ...blogs[index],
    title: title || blogs[index].title,
    content: content || blogs[index].content,
    author: author || blogs[index].author,
  };

  return blogs[index];
};

const deleteBlog = (id) => {
  const index = blogs.findIndex((blog) => blog.id === id);
  if (index === -1) return null;

  const deleted = blogs.splice(index, 1);
  return deleted[0];
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
