import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = "https://5f7ogy3fbj.execute-api.us-east-1.amazonaws.com/dev";

export default function VotePage() {
  const { id } = useParams();

  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${API}/poll/${id}`)
      .then((res) => res.json())
      .then((data) => setPoll(data));
  }, [id]);

  const vote = async () => {
    const res = await fetch(`${API}/vote/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ option: selected }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  if (!poll) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{poll.question}</h2>

      {poll.options.map((opt, i) => (
        <div key={i}>
          <label>
            <input
              type="radio"
              name="vote"
              value={opt.text}
              onChange={(e) => setSelected(e.target.value)}
            />
            {opt.text}
          </label>
        </div>
      ))}

      <button onClick={vote}>Vote</button>

      <p>{message}</p>
    </div>
  );
}
