import React, { useState, useEffect } from "react";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import Hero from "../components/Hero";
import { getPosts, createPost, deletePost } from "../services/api";
import { AlertCircle, FileX, RefreshCw, Search, Filter, BarChart3, Users, FileText } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const StatCard = ({ icon: Icon, label, value, trend }) => (
  <div className="glass-card rounded-2xl p-6 flex flex-col justify-between h-32 relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-10">
      <Icon size={64} />
    </div>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
        <Icon size={20} className="text-primary-400" />
      </div>
      <span className="text-slate-300 font-medium">{label}</span>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-bold text-white">{value}</span>
      <span className="text-xs text-emerald-400 font-medium">+{trend}% this week</span>
    </div>
  </div>
);

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError("404: Endpoint not found");
        } else if (err.response.status === 500) {
          setError("500: Internal server error");
        } else {
          setError(`Error: ${err.response.status} - ${err.response.data.message || 'Something went wrong'}`);
        }
      } else if (err.request) {
        setError("Backend offline or unreachable. Please check your connection.");
      } else {
        setError("Error setting up the request.");
      }
      toast.error("Failed to load posts.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (formData) => {
    setIsSubmitting(true);
    try {
      const newPost = await createPost(formData);
      setPosts([newPost, ...posts]);
      toast.success("Post published successfully!");
    } catch (err) {
      console.error("Error creating post:", err);
      toast.error("Failed to create post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
      toast.success("Post deleted.");
    } catch (err) {
      console.error("Error deleting post:", err);
      toast.error("Failed to delete post.");
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <Toaster position="bottom-right" toastOptions={{
        style: { background: '#1e293b', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.1)' }
      }} />
      
      <Hero />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard icon={FileText} label="Total Content" value={posts.length} trend="12" />
        <StatCard icon={Users} label="Active Authors" value={Math.max(1, new Set(posts.map(p => p.author)).size)} trend="8" />
        <StatCard icon={BarChart3} label="Total Views" value={posts.length * 42} trend="24" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4 xl:sticky xl:top-24 h-fit">
          <PostForm onSubmit={handleCreatePost} isLoading={isSubmitting} />
        </div>

        <div className="xl:col-span-8">
          <div className="glass rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search posts..." 
                className="w-full bg-dark-900/50 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary-500"
              />
            </div>
            <div className="flex w-full sm:w-auto items-center gap-3">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-dark-900/50 border border-white/10 px-4 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-dark-800 transition-colors">
                <Filter size={16} />
                Filters
              </button>
              <button 
                onClick={fetchPosts}
                className="flex-1 sm:flex-none text-slate-400 hover:text-white bg-dark-800 px-4 py-2.5 rounded-xl border border-white/5 hover:border-white/20 transition-all flex items-center justify-center gap-2 text-sm"
                disabled={isLoading}
              >
                <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6 px-1">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              All Posts
            </h2>
          </div>

          {error ? (
            <div className="glass rounded-2xl p-10 text-center border-red-500/30 bg-red-500/5">
              <div className="bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} className="text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Connection Error</h3>
              <p className="text-red-300/80 mb-6 max-w-md mx-auto">{error}</p>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors" onClick={fetchPosts}>
                Try Again
              </button>
            </div>
          ) : isLoading && posts.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="glass-card rounded-2xl p-6 h-80 flex flex-col animate-pulse">
                  <div className="w-full h-32 bg-white/5 rounded-xl mb-4"></div>
                  <div className="w-3/4 h-6 bg-white/5 rounded-md mb-2"></div>
                  <div className="w-full h-4 bg-white/5 rounded-md mb-2"></div>
                  <div className="w-5/6 h-4 bg-white/5 rounded-md mt-auto"></div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="glass rounded-2xl p-16 text-center">
              <div className="bg-primary-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary-500/20">
                <FileX size={36} className="text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">No posts found</h2>
              <p className="text-slate-400 max-w-sm mx-auto">Be the first to create a post using the form on the left!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
