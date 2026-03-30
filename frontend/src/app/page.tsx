"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Play, Trash2, Cpu, BarChart3, Binary, RotateCcw, Info } from "lucide-react";
import CircuitGate from "./components/CircuitGate";
import ResultChart from "./components/ResultChart";
import Navbar from "./components/Navbar";

export default function Home() {
  const [gates, setGates] = useState<string[]>([]);
  const [result, setResult] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(false);

  const addGate = (gate: string) => {
    setGates([...gates, gate]);
  };

  const removeGate = (index: number) => {
    setGates(gates.filter((_, i) => i !== index));
  };

  const clearCircuit = () => {
    setGates([]);
    setResult(null);
  };

  const runCircuit = async () => {
    if (gates.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gates: gates,
        }),
      });

      const data = await res.json();
      setResult(data.probabilities || data); 
    } catch (error) {
      console.error("Failed to run circuit:", error);
    } finally {
      setLoading(false);
    }
  };

  const availableGates = ["H", "X", "Y", "Z", "CNOT"];

  return (
    <main className="min-h-screen p-8 lg:p-12 max-w-7xl mx-auto flex flex-col gap-10">
      <Navbar />

      {/* Editor Section */}
      <section className="grid lg:grid-cols-3 gap-8 relative z-10">
        {/* Sidebar: Gate Selector */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="glass p-8 flex flex-col gap-6 shadow-2xl">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted flex items-center gap-3">
              <Binary size={14} className="text-purple-500" /> Available Gates
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {availableGates.map((gate) => (
                <button
                  key={gate}
                  onClick={() => addGate(gate)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <CircuitGate type={gate} />
                  <span className="text-[10px] text-muted font-bold font-mono group-hover:text-purple-400 transition-colors uppercase tracking-widest">{gate}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="glass p-8 flex flex-col gap-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted flex items-center gap-3">
               <Info size={14} className="text-teal-400" /> Control Panel
            </h2>
            <div className="flex flex-col gap-4">
              <button
                onClick={runCircuit}
                disabled={gates.length === 0 || loading}
                className="w-full h-14 bg-foreground text-background font-bold uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 transition-all active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed group shadow-lg"
              >
                {loading ? <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" /> : <Play size={18} fill="currentColor" />}
                Execute Circuit
              </button>
              <button
                onClick={clearCircuit}
                className="w-full h-12 border border-border hover:bg-foreground/5 text-muted hover:text-foreground font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <RotateCcw size={20} /> Clear Circuit
              </button>
            </div>
          </div>
        </div>

        {/* Board: Circuit Editor */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass min-h-[400px] relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-foreground/[0.02] bg-[radial-gradient(var(--foreground)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-20" />
            
            <div className="p-6 border-b border-border flex items-center justify-between relative z-10">
               <h2 className="text-lg font-bold flex items-center gap-2 text-foreground">
                 <div className="w-2 h-2 rounded-full bg-teal-500 quantum-pulse" />
                 Interactive Circuit Editor
               </h2>
               <div className="text-xs font-mono text-muted">
                 {gates.length} Gates Active
               </div>
            </div>

            <div className="flex-1 p-10 flex flex-col gap-12 overflow-x-auto relative z-10">
              <div className="relative flex items-center min-w-max gap-6 py-10">
                 {/* Qubit line background */}
                 <div className="absolute left-0 right-0 h-px bg-border circuit-line top-1/2 -translate-y-1/2" />
                 <div className="w-12 h-12 glass shadow-lg flex items-center justify-center text-xs font-mono font-bold text-teal-600 border-teal-500/30 relative z-20">
                   q[0]
                 </div>
                 
                 <div className="flex items-center gap-3 relative z-20">
                   <AnimatePresence>
                     {gates.length === 0 ? (
                       <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-muted font-mono italic text-sm py-4"
                       >
                         Drop a gate on the circuit to begin...
                       </motion.div>
                     ) : (
                       gates.map((gate, i) => (
                         <div key={i} className="flex items-center gap-3">
                           <CircuitGate type={gate} onRemove={() => removeGate(i)} />
                           {i < gates.length - 1 && <div className="w-6 h-px bg-border" />}
                         </div>
                       ))
                     )}
                   </AnimatePresence>
                 </div>
                 
                 {gates.length > 0 && (
                   <div className="w-12 h-6 flex items-center justify-center">
                     <div className="w-full h-px border-t border-dashed border-border" />
                   </div>
                 )}
              </div>
            </div>
          </div>

          {/* Result Section */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col gap-6"
              >
                <ResultChart data={result} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-10 border-t border-border flex flex-col md:flex-row items-center justify-between text-muted text-sm">
        <p>&copy; 2026 Quantum Circuit Visualizer. Built for the quantum-native era.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
          <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
        </div>
      </footer>
    </main>
  );
}

