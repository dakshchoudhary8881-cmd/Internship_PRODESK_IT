import React from 'react';
import { Layers, Code2, Bell } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-primary-500/20 p-2 rounded-xl group-hover:bg-primary-500/30 transition-colors">
              <Layers className="text-primary-400 w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Sprint<span className="text-primary-400">11</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
              <Bell className="w-5 h-5" />
            </button>
            <div className="h-8 w-px bg-white/10 mx-2"></div>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all border border-white/5 hover:border-white/20"
            >
              <Code2 className="w-4 h-4" />
              <span>Star on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
