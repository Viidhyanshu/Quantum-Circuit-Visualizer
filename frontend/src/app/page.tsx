"use client";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(null);

  const runCircuit = async () => {
    const res = await fetch("http://localhost:5001/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gates: ["H", "CNOT"],
      }),
    });

    const data = await res.json();
    console.log(data);
    setResult(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Quantum Circuit Visualizer </h1>

      <button onClick={runCircuit}>
        Run Circuit
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>Result:</h3>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
}
