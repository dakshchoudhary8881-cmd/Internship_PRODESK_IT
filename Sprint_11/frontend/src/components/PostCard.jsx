import React from "react";
import { Trash2, User, Calendar, Clock, Image as ImageIcon } from "lucide-react";

const PostCard = ({ post, onDelete }) => {
  const backendUrl = "http://localhost:5000";

  return (
    <div className="group relative flex flex-col glass-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-dark-900/50">
        {post.imageUrl ? (
          <img
            src={`${backendUrl}${post.imageUrl}`}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500/50 bg-gradient-to-br from-dark-800 to-dark-900">
            <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
            <span className="text-sm font-medium">No cover image</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-xs font-medium text-white shadow-sm">
            Article
          </span>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-primary-400 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
          {post.description}
        </p>
        
        <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-purple-500 flex items-center justify-center shadow-inner">
              <User size={14} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-200">{post.author}</span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar size={10} />
                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
          
          <button 
            className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" 
            onClick={() => onDelete(post.id)}
            title="Delete post"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
