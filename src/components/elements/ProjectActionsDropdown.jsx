// Project Actions Dropdown
import PropTypes from "prop-types";
import { Dropdown } from "antd";
import { useContext } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  FrownOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { ProjectsAndTasksContext } from "../../ProjectsAndTasksProvider";

const ProjectActionsDropdown = ({ project }) => {
  const { handleUpdateFavoriteProjectStatus, showProjectActionsModal } =
    useContext(ProjectsAndTasksContext);
  const menu = {
    items: [
      {
        key: "edit",
        label: (
          <>
            <EditOutlined style={{ marginRight: "8px" }} />
            Edit Project
          </>
        ),
        onClick: () => showProjectActionsModal(project, "edit"),
      },
      {
        key: "delete",
        label: (
          <>
            <DeleteOutlined style={{ marginRight: "8px" }} />
            Delete Project
          </>
        ),
        onClick: () => showProjectActionsModal(project, "delete"),
      },
      {
        key: "favorite",
        label: (
          <>
            {project.isFavorite ? (
              <FrownOutlined style={{ marginRight: "8px" }} />
            ) : (
              <HeartOutlined style={{ marginRight: "8px" }} />
            )}
            {project.isFavorite ? `Remove From Favorites` : `Add To Favorites`}
          </>
        ),
        onClick: () => handleUpdateFavoriteProjectStatus(project),
      },
    ],
  };

  return (
    <Dropdown
      menu={menu}
      // overlay={menu}
      trigger={["click"]}
      overlayStyle={{
        boxShadow:
          "0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
      }}
    >
      <MoreOutlined style={{ cursor: "pointer" }} />
    </Dropdown>
  );
};

ProjectActionsDropdown.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ProjectActionsDropdown;
