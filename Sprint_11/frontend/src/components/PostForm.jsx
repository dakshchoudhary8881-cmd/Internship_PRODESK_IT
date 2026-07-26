import React, { useState, useRef } from "react";
import { PlusCircle, Loader, UploadCloud, Image as ImageIcon, X } from "lucide-react";

const PostForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
  });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("author", formData.author);
    if (image) {
      data.append("image", image);
    }
    onSubmit(data);
    
    setFormData({ title: "", description: "", author: "" });
    removeImage();
  };

  return (
    <div className="glass rounded-3xl p-8 mb-12 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Create New Post</h2>
        <p className="text-slate-400">Share your latest thoughts or updates with the team.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1" htmlFor="title">Title</label>
            <input
              className="w-full bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-300"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="E.g., Q3 Launch Strategy"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1" htmlFor="author">Author</label>
            <input
              className="w-full bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-300"
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 ml-1" htmlFor="description">Description</label>
          <textarea
            className="w-full bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-300 resize-none"
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Write the details here..."
          ></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 ml-1">Cover Image</label>
          <div 
            className={`border-2 border-dashed rounded-xl transition-all duration-300 ${previewUrl ? 'border-primary-500/50 bg-primary-500/5' : 'border-white/10 bg-dark-900/30 hover:border-white/30 hover:bg-dark-900/50'}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {previewUrl ? (
              <div className="relative p-2 h-48 w-full flex justify-center">
                <img src={previewUrl} alt="Preview" className="h-full object-contain rounded-lg" />
                <button 
                  type="button" 
                  onClick={removeImage}
                  className="absolute top-4 right-4 bg-dark-900/80 backdrop-blur text-slate-300 hover:text-white p-1.5 rounded-full hover:bg-red-500/80 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 px-4 cursor-pointer" onClick={() => fileInputRef.current.click()}>
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                  <UploadCloud className="text-slate-400 w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-slate-300 mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="pt-2">
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-medium py-3.5 px-6 rounded-xl shadow-lg shadow-primary-500/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5" />
                <span>Publish Post</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
