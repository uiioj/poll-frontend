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
    <div className="container">
      <h2 className="title">{result.question}</h2>

      <p>
        <b>Total Votes:</b> {result.totalVotes}
      </p>

      {result.results.map((opt, i) => (
        <div key={i} className="box">
          {opt.text} — <b>{opt.votes}</b> votes
        </div>
      ))}
    </div>
  );
}
