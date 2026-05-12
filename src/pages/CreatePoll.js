import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const API = "https://5f7ogy3fbj.execute-api.us-east-1.amazonaws.com/dev";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  const createPoll = async () => {
    const res = await fetch(`${API}/poll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        options: options.filter((o) => o.trim() !== ""),
      }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Poll</h2>

        <input
          style={styles.input}
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        {options.map((opt, i) => (
          <input
            key={i}
            style={styles.input}
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => {
              const copy = [...options];
              copy[i] = e.target.value;
              setOptions(copy);
            }}
          />
        ))}

        <button
          style={styles.grayBtn}
          onClick={() => setOptions([...options, ""])}
        >
          + Add Option
        </button>

        <button style={styles.mainBtn} onClick={createPoll}>
          Create Poll
        </button>

        {result && (
          <div style={styles.resultBox}>
            <p>ID: {result.pollId}</p>

            <QRCodeCanvas
              value={`http://localhost:3000/vote/${result.pollId}`}
              size={140}
            />

            <button
              style={styles.mainBtn}
              onClick={() => navigate(`/vote/${result.pollId}`)}
            >
              Go Vote
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6fb",
    fontFamily: "Arial",
  },
  card: {
    width: 420,
    background: "white",
    padding: 25,
    borderRadius: 15,
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },
  title: { textAlign: "center", marginBottom: 20 },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    border: "1px solid #ddd",
    borderRadius: 8,
  },
  mainBtn: {
    width: "100%",
    padding: 12,
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: 8,
    marginTop: 10,
    cursor: "pointer",
  },
  grayBtn: {
    width: "100%",
    padding: 10,
    background: "#e5e7eb",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  resultBox: {
    marginTop: 20,
    textAlign: "center",
  },
};
