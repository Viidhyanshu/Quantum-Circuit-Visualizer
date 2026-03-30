"use client";
import { motion } from "framer-motion";
import { X, Zap } from "lucide-react";

interface CircuitGateProps {
  type: string;
  onRemove?: () => void;
  isDraggable?: boolean;
}

const gateStyles: Record<string, string> = {
  H: "bg-purple-600 border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)] text-white",
  X: "bg-blue-600 border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)] text-white",
  Y: "bg-green-600 border-green-500 shadow-[0_0_15px_rgba(22,163,74,0.3)] text-white",
  Z: "bg-teal-600 border-teal-500 shadow-[0_0_15px_rgba(13,148,136,0.3)] text-white",
  I: "bg-zinc-600 border-zinc-500 shadow-[0_0_15px_rgba(82,82,91,0.3)] text-white",
  S: "bg-amber-500 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] text-white",
  T: "bg-orange-500 border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)] text-white",
  Sdg: "bg-amber-700 border-amber-600 shadow-[0_0_15px_rgba(180,83,9,0.3)] text-white",
  Tdg: "bg-orange-700 border-orange-600 shadow-[0_0_15px_rgba(194,65,12,0.3)] text-white",
  Swap: "bg-indigo-600 border-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.3)] text-white",
  CNOT: "bg-rose-600 border-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.3)] text-white",
};



export default function CircuitGate({ type, onRemove, isDraggable }: CircuitGateProps) {
  return (
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className={`relative group w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold text-sm backdrop-blur-md cursor-pointer transition-all ${gateStyles[type] || "bg-muted/10 border-muted/50 text-muted"}`}
    >
      {type}
      
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X size={12} className="text-white" />
        </button>
      )}

      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-foreground/5 pointer-events-none" />
    </motion.div>
  );
}

