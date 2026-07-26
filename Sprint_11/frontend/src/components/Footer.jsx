import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-dark-900/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-slate-400 text-sm">
          © {new Date().getFullYear()} Sprint11 Inc. All rights reserved.
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          Made with <Heart className="w-4 h-4 text-red-500 fill-red-500/20" /> by Premium Team
        </div>
        <div className="flex gap-6 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-primary-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-primary-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
