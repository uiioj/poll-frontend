import { useState } from "react";

const API = "https://5f7ogy3fbj.execute-api.us-east-1.amazonaws.com/dev";
export default function App() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [result, setResult] = useState(null);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const createPoll = async () => {
    try {
      const res = await fetch(`${API}/poll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          options: options.filter((o) => o !== ""),
        }),
      });

      console.log("STATUS:", res.status);

      const data = await res.json();
      console.log("DATA:", data);

      setResult(data);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Poll</h2>

      <input
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <h4>Options</h4>

      {options.map((opt, i) => (
        <input
          key={i}
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={(e) => handleOptionChange(i, e.target.value)}
        />
      ))}

      <br />

      <button onClick={addOption}>Add Option</button>

      <br />
      <br />

      <button onClick={createPoll}>Create Poll</button>

      {result && (
        <div>
          <h3>Poll Created 🎉</h3>
          <p>ID: {result.pollId}</p>
        </div>
      )}
    </div>
  );
}
