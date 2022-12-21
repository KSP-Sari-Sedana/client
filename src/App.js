import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LandingPage } from "./pages/landingPage";
import { NotFoundPage } from "./pages/notFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
