from qiskit import QuantumCircuit, transpile
from qiskit_aer import Aer

def run_circuit(gates):
    qc = QuantumCircuit(2)

    for gate in gates:
        if gate == "H":
            qc.h(0)
        elif gate == "X":
            qc.x(0)
        elif gate == "CNOT":
            qc.cx(0, 1)

    qc.measure_all()

    simulator = Aer.get_backend('qasm_simulator')
    qc_compiled = transpile(qc, simulator)
    job = simulator.run(qc_compiled, shots=1024)
    result = job.result()


    return result.get_counts()