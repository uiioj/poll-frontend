import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePoll from "./pages/CreatePoll";
import VotePage from "./pages/VotePage";
import ResultsPage from "./pages/ResultsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* الصفحة الرئيسية: إنشاء تصويت */}
        <Route path="/" element={<CreatePoll />} />

        {/* صفحة التصويت */}
        <Route path="/vote/:id" element={<VotePage />} />

        {/* صفحة النتائج */}
        <Route path="/results/:id" element={<ResultsPage />} />

        {/* أي رابط غلط يرجع للصفحة الرئيسية */}
        <Route path="*" element={<CreatePoll />} />
      </Routes>
    </BrowserRouter>
  );
}
