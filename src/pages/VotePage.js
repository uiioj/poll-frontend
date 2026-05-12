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
    <div className="container">
      <h2 className="title">{poll.question}</h2>

      {poll.options.map((opt, i) => (
        <label key={i} style={{ display: "block", marginBottom: 10 }}>
          <input
            type="radio"
            name="vote"
            value={opt.text}
            onChange={(e) => setSelected(e.target.value)}
          />{" "}
          {opt.text}
        </label>
      ))}

      <button className="btn primary" onClick={vote} disabled={!selected}>
        Vote
      </button>

      {message && <p className="box">{message}</p>}
    </div>
  );
}
