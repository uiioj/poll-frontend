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

  if (!result) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{result.question}</h2>
      <h4>Total Votes: {result.totalVotes}</h4>

      {result.results.map((opt, i) => (
        <p key={i}>
          {opt.text} - {opt.votes} votes
        </p>
      ))}
    </div>
  );
}
