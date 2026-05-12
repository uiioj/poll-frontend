import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://5f7ogy3fbj.execute-api.us-east-1.amazonaws.com/dev";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const validate = () => {
    const clean = options.filter((o) => o.trim() !== "");

    if (!question.trim()) {
      setError("Question is required");
      return false;
    }

    if (clean.length < 2) {
      setError("At least 2 options required");
      return false;
    }

    setError("");
    return true;
  };

  const createPoll = async () => {
    if (!validate()) return;

    setLoading(true);

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

      setResult(data);

      // نروح مباشرة لصفحة التصويت
      navigate(`/vote/${data.pollId}`);
    } catch (err) {
      setError("Network error");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h2 className="title">Create Poll</h2>

      <input
        className="input"
        placeholder="Enter question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {options.map((opt, i) => (
        <input
          key={i}
          className="input"
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={(e) => handleOptionChange(i, e.target.value)}
        />
      ))}

      <button className="btn secondary" onClick={addOption}>
        + Add Option
      </button>

      {error && <p className="error">{error}</p>}

      <button className="btn primary" onClick={createPoll} disabled={loading}>
        {loading ? "Creating..." : "Create Poll"}
      </button>

      {result && (
        <div className="box">
          <b>Poll Created 🎉</b>
          <p>ID: {result.pollId}</p>
        </div>
      )}
    </div>
  );
}
