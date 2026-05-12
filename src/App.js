import { useState } from "react";

const API = "https://5f7ogy3fbj.execute-api.us-east-1.amazonaws.com/dev";

export default function App() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const validateForm = () => {
    const cleanOptions = options.filter((o) => o.trim() !== "");

    if (!question.trim()) {
      setError("Question is required");
      return false;
    }

    if (cleanOptions.length < 2) {
      setError("At least 2 options are required");
      return false;
    }

    setError("");
    return true;
  };

  const createPoll = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/poll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          options: options.filter((o) => o.trim() !== ""),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      setResult(data);
      setLoading(false);
    } catch (err) {
      setError("Network error");
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}> Create Poll</h2>

        <input
          style={styles.input}
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <h4>Options</h4>

        {options.map((opt, i) => (
          <input
            key={i}
            style={styles.input}
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(i, e.target.value)}
          />
        ))}

        <button style={styles.secondaryBtn} onClick={addOption}>
          + Add Option
        </button>

        {error && <p style={styles.error}>{error}</p>}

        <button
          style={styles.primaryBtn}
          onClick={createPoll}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Poll"}
        </button>

        {result && (
          <div style={styles.resultBox}>
            <h3> Poll Created Successfully</h3>
            <p>
              <b>ID:</b> {result.pollId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/*  Styles */
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: 40,
    fontFamily: "Arial",
    backgroundColor: "#f5f6fa",
    minHeight: "100vh",
  },
  card: {
    width: 400,
    backgroundColor: "white",
    padding: 25,
    borderRadius: 12,
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },
  primaryBtn: {
    width: "100%",
    padding: 12,
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    marginTop: 10,
  },
  secondaryBtn: {
    width: "100%",
    padding: 10,
    backgroundColor: "#e5e7eb",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontSize: 14,
  },
  resultBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ecfdf5",
    borderRadius: 10,
    border: "1px solid #10b981",
  },
};
