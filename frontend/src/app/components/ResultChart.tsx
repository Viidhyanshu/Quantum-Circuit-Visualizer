"use client";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

interface ResultChartProps {
  data: Record<string, number>;
}

export default function ResultChart({ data }: ResultChartProps) {
  const values = Object.values(data);
  const total = values.reduce((a, b) => a + b, 0);
  const maxValue = Math.max(...values, 1);

  return (
    <div className="flex flex-col gap-8 w-full bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <BarChart3 size={120} />
      </div>

      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="text-2xl font-black italic tracking-tight text-white uppercase flex items-center gap-3">
          <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-teal-400 rounded-full" />
          Quantum Measurement Result
        </h3>
        <p className="text-zinc-500 text-sm font-medium">Visualization of the computational basis state probabilities after 1024 shots.</p>
      </div>

      <div className="relative z-10 flex items-end justify-around h-64 gap-6 pt-12 pb-4">
        {Object.entries(data).map(([state, count]) => {
          const probability = count / total;
          const height = (count / maxValue) * 100;
          return (
            <div key={state} className="flex-1 flex flex-col items-center gap-4 group">
              <div className="relative w-full flex items-end justify-center h-full">
                {/* Glow effect for high bars */}
                {probability > 0.4 && (
                    <div className="absolute bottom-0 w-16 h-1/2 bg-purple-500/20 blur-2xl rounded-full" />
                )}
                
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                  className="w-16 bg-gradient-to-t from-purple-600 to-teal-400 rounded-2xl relative flex items-start justify-center shadow-[0_0_20px_rgba(192,132,252,0.3)] hover:shadow-[0_0_30px_rgba(192,132,252,0.5)] transition-shadow cursor-default"
                >
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: -40 }}
                        className="absolute whitespace-nowrap text-sm font-black text-white font-mono"
                    >
                        {(probability * 100).toFixed(1)}%
                    </motion.div>
                </motion.div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg font-black font-mono text-zinc-300">|{state}⟩</span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">{count} shots</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
