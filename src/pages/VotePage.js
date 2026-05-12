import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = "https://5f7ogy3fbj.execute-api.us-east-1.amazonaws.com/dev";

export default function VotePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetch(`${API}/poll/${id}`)
      .then((res) => res.json())
      .then((data) => setPoll(data));
  }, [id]);

  const vote = async () => {
    await fetch(`${API}/vote/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ option: selected }),
    });
  };

  if (!poll) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>{poll.question}</h2>

        {poll.options.map((o, i) => (
          <label key={i} style={styles.option}>
            <input
              type="radio"
              name="vote"
              value={o.text}
              onChange={(e) => setSelected(e.target.value)}
            />
            {o.text}
          </label>
        ))}

        <button style={styles.mainBtn} onClick={vote} disabled={!selected}>
          Vote
        </button>

        <button
          style={styles.grayBtn}
          onClick={() => navigate(`/results/${id}`)}
        >
          View Results
        </button>
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
    width: 400,
    background: "white",
    padding: 25,
    borderRadius: 15,
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },
  option: {
    display: "block",
    marginBottom: 10,
  },
  mainBtn: {
    width: "100%",
    padding: 12,
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: 8,
    marginTop: 10,
  },
  grayBtn: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    background: "#e5e7eb",
    border: "none",
    borderRadius: 8,
  },
};
