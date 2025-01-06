import PropTypes from "prop-types";
import { useContext } from "react";
import ProjectActionsDropdown from "./ProjectActionsDropdown";
import { ProjectsAndTasksContext } from "../../ProjectsAndTasksProvider";

const ProjectLabel = ({ project }) => {
  const { setSelectedProject } = useContext(ProjectsAndTasksContext);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "12px",
      }}
      onClick={() => setSelectedProject(project)}
    >
      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: 120,
        }}
        title={project.name}
      >
        {project.name}
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <ProjectActionsDropdown project={project} />
      </div>
    </div>
  );
};

ProjectLabel.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
  setSelectedProject: PropTypes.func.isRequired,
  showProjectActionsModal: PropTypes.func.isRequired,
  handleUpdateFavoriteProjectStatus: PropTypes.func.isRequired,
};

export default ProjectLabel;
