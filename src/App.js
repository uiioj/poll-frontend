import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePoll from "./pages/CreatePoll";
import VotePage from "./pages/VotePage";
import ResultsPage from "./pages/ResultsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePoll />} />
        <Route path="/vote/:id" element={<VotePage />} />
        <Route path="/results/:id" element={<ResultsPage />} />
        <Route path="*" element={<CreatePoll />} />
      </Routes>
    </BrowserRouter>
  );
}
