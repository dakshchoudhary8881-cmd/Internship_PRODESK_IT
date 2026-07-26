import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative isolate overflow-hidden mb-16 pt-8 pb-12 sm:pt-12 sm:pb-16 text-center">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-8">
          <Sparkles size={14} />
          <span>v2.0 Beta is now live</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
          The new standard in <span className="text-gradient">content management.</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl leading-8 text-slate-300 max-w-2xl mx-auto mb-10">
          Transform your workflow with our premium MERN stack architecture. Designed for speed, scalability, and absolute elegance.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-dark-900 font-semibold px-6 py-3 rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2">
            Get Started
            <ArrowRight size={16} />
          </button>
          <button className="glass font-semibold px-6 py-3 rounded-xl hover:bg-dark-800/80 transition-colors text-white">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
