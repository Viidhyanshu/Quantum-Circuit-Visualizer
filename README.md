# ⚛️ Quantum Circuit Visualizer

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Tailwind4](https://img.shields.io/badge/Tailwind--CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Qiskit](https://img.shields.io/badge/Qiskit-Aer-6929C4?style=for-the-badge&logo=qiskit)
![Framer Motion](https://img.shields.io/badge/Framer--Motion-Animation-FF0055?style=for-the-badge&logo=framer)

A high-performance, interactive quantum circuit simulation environment designed for the quantum-native era. Build, visualize, and analyze quantum states in real-time with pixel-perfect precision and a stunning dark aesthetic.

---

## ✨ Key Features
- ** Interactive Circuit Builder**: A reactive drag-and-drop-style gate editor with real-time feedback and smooth animations.
- ** Advanced Result Visualization**: Dynamic, animated probability charts illustrating measurement counts and basis state distributions.
- ** Qiskit Powered**: Leverages the power of Qiskit's `qasm_simulator` for high-fidelity quantum hardware emulation.
- ** Minimalist Developer Experience**: Fully typed with TypeScript, styled with Tailwind CSS 4, and powered by Next.js 15.

---

##  Project Architecture

```bash
.
├── frontend/                # Next.js Application
│   ├── src/
│   │   ├── components/      # Visual building blocks (CircuitGate, ResultChart)
│   │   ├── app/             # Main dashboard logic and styling
│   ├── public/
│   └── package.json
│
├── backend/                 # Python Flask API
│   ├── app.py               # Circuit execution endpoints
│   ├── requirements.txt
│   └── quantum/
│       └── simulator.py     # Qiskit simulation core
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+** (v18 minimum)
- **Python 3.9+** (v3.11 recommended for Qiskit performance)

### 1. Launch the Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
*The backend will start at http://localhost:5001*

### 2. Launch the Frontend

```bash
cd frontend
npm install
npm run dev
```
*Open http://localhost:3000 to see the interface.*

---

## 🧬 Quantum Simulation Logic

The engine currently supports a robust set of universal quantum gates:
- **H**: Hadamard (Create superposition)
- **X**: Pauli-X (Quantum NOT)
- **Y**: Pauli-Y
- **Z**: Pauli-Z
- **CNOT**: Controlled-NOT (Create entanglement)

Simulations are executed across **1024 shots** to provide statistically significant probability distributions.

---

## 🛠️ Built With

- **Frontend**: Next.js, Framer Motion, Lucide React, Tailwind CSS 4.
- **Backend**: Flask (Python), Flask-CORS.
- **Simulation Layer**: Qiskit, Qiskit-Aer.

---

<p align="center">
  Built with ❤️ for the future of computation.
</p>
