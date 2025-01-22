import { Routes, Route } from "react-router-dom";
import Index from "./Task-Empty";
import TaskDisplay from "./Task-Display";

function TaskRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/my-projects/:id" element={<TaskDisplay />} />
      <Route path="/my-favorites/:id" element={<TaskDisplay />} />
      <Route
        path="*"
        element={<div>404 - Page Not Found</div>} // Fallback route
      />
    </Routes>
  );
}

export default TaskRoutes;
