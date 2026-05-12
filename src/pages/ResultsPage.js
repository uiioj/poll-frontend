import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = "https://5f7ogy3fbj.execute-api.us-east-1.amazonaws.com/dev";

export default function ResultsPage() {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(`${API}/results/${id}`)
      .then((res) => res.json())
      .then((data) => setResult(data));
  }, [id]);

  if (!result) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>{result.question}</h2>
        <p>Total Votes: {result.totalVotes}</p>

        {result.results.map((r, i) => (
          <p key={i}>
            {r.text} - {r.votes}
          </p>
        ))}
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
};
