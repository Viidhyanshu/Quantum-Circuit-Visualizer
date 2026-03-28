from flask import Flask, request, jsonify
from flask_cors import CORS
from quantum.simulator import run_circuit

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/run", methods=["POST"])
def run():
    data = request.json
    gates = data.get("gates", [])

    result = run_circuit(gates)
    return jsonify(result)

if __name__ == "__main__":
    app.run(port=5001, debug=True)