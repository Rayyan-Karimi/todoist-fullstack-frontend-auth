import { Routes, Route } from "react-router-dom";
import Index from "../pages/Index";
import IndividualProject from "../pages/IndividualProject";

function ContentDisplay() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/my-projects/:id" element={<IndividualProject />} />
      <Route path="/my-favorites/:id" element={<IndividualProject />} />
      <Route path="/test" element={<h3>Test</h3>} />
      <Route
        path="*"
        element={<div>404 - Page Not Found</div>} // Fallback route
      />
    </Routes>
  );
}

export default ContentDisplay;
