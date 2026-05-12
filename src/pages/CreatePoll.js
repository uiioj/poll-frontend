import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://5f7ogy3fbj.execute-api.us-east-1.amazonaws.com/dev";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const createPoll = async () => {
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
        setError(data.message || "Error creating poll");
        setLoading(false);
        return;
      }

      // 🔥 أهم خطوة: نروح لصفحة التصويت مباشرة
      navigate(`/vote/${data.pollId}`);
    } catch (err) {
      setError("Network error");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
      <h2>Create Poll</h2>

      <input
        placeholder="Enter question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      {options.map((opt, i) => (
        <input
          key={i}
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={(e) => handleOptionChange(i, e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />
      ))}

      <button onClick={addOption}>Add Option</button>

      <br />
      <br />

      <button onClick={createPoll} disabled={loading}>
        {loading ? "Creating..." : "Create Poll"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
