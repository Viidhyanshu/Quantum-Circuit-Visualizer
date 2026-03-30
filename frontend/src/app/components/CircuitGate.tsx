"use client";
import { motion } from "framer-motion";
import { X, Zap } from "lucide-react";

interface CircuitGateProps {
  type: string;
  onRemove?: () => void;
  isDraggable?: boolean;
}

const gateStyles: Record<string, string> = {
  H: "bg-purple-500/10 border-purple-500/40 text-purple-700",
  X: "bg-blue-500/10 border-blue-500/40 text-blue-700",
  Y: "bg-green-500/10 border-green-500/40 text-green-700",
  Z: "bg-teal-500/10 border-teal-500/40 text-teal-700",
  CNOT: "bg-rose-500/10 border-rose-500/40 text-rose-700",
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

