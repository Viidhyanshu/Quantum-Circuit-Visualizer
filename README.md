
## Project Structure

```bash
.
├── frontend/                # Next.js app (App Router, TS, Tailwind)
│   ├── src/
│   │   ├── components/
│   │   ├── app/
│   ├── public/
│   ├── package.json
│
├── backend/                # Python + Qiskit
│   ├── app.py              # Flask API
│   ├── requirements.txt
│   ├── quantum/
│   │   ├── simulator.py    # Quantum simulation logic
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+

### Running the Frontend
```bash
cd frontend
npm install
npm run dev
```

### Running the Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
