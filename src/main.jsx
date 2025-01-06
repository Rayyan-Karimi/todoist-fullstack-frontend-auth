import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProjectsAndTasksProvider } from "./ProjectsAndTasksProvider.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProjectsAndTasksProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProjectsAndTasksProvider>
  </StrictMode>
);
