"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 px-2">
      <div className="flex flex-col gap-2">
        <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Cpu className="text-black" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Quantum <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">Circuit</span>
          </h1>
        </motion.div>
        <p className="text-muted font-medium max-w-xl text-sm md:text-base">
          Visualizing the future of computation. Design, simulate, and analyze quantum states in real-time.
        </p>
      </div>
    </header>
  );
}

