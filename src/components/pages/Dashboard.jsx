// React & antd imports
import { useState, useContext } from "react";
import { ProjectOutlined, ProfileOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";

// Imports of self made items
import ProjectLabel from "../helpers/ProjectLabel.jsx";
import AddProjectModal from "../helpers/AddProjectModal.jsx";
import EditOrDeleteProjectModal from "../helpers/EditOrDeleteProjectModal.jsx";
import ProjectActionsDropdown from "../helpers/ProjectActionsDropdown.jsx";
import LeftSider from "../ui/Sider.jsx";
import TheRightLayout from "../ui/Right-Layout.jsx";
import LeftSiderToggle from "../ui/Sider-Toggle.jsx";
import ProjectContext from "../contexts/ProjectsContext.jsx";

// Component
const UserDashboard = ({ setUserData }) => {
  const { setSelectedProject, isLoading, projects, hasError } =
    useContext(ProjectContext);
  const isLargeScreen = useMediaQuery({ minWidth: 751 });
  const [collapsed, setCollapsed] = useState(false);

  if (isLoading) {
    return <>Loading...</>;
  } else if (hasError) {
    return <>Error loading data. Please check Login Token. API fetch error.</>;
  } else {
    const menuItems = [
      {
        key: "my-favorites",
        label: "My Favorites",
        icon: <ProjectOutlined />,
        children: projects
          .filter((project) => project.isFavorite)
          .map((project) => ({
            label: <ProjectLabel onClick={() => setSelectedProject(project)} />,
            key: `/my-favorites/${project.id}`,
          })),
      },
      {
        key: "my-projects",
        label: "My Projects",
        icon: <ProfileOutlined />,
        children: projects.map((project) => ({
          label: (
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
          ),
          key: `/my-projects/${project.id}`,
        })),
      },
    ];

    return (
      <div className="App">
        <Layout>
          <LeftSider
            setUserData={setUserData}
            collapsed={collapsed}
            isLargeScreen={isLargeScreen}
            setCollapsed={setCollapsed}
            menuItems={menuItems}
          />
          {collapsed && (
            <LeftSiderToggle
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
          )}

          {/* Right side Layout */}
          <TheRightLayout />
        </Layout>

        {/* Modals */}
        <EditOrDeleteProjectModal />
        <AddProjectModal />
      </div>
    );
  }
};

UserDashboard.propTypes = {
  setUserData: PropTypes.func.isRequired,
};

export default UserDashboard;
