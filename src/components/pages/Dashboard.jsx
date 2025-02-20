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
import LeftSider from "../ui/Sider.jsx";
import TheRightLayout from "../ui/Right-Layout.jsx";
import LeftSiderToggle from "../ui/Sider-Toggle.jsx";
import ProjectContext from "../contexts/ProjectsContext.jsx";

// Component
const UserDashboard = ({ setUserData }) => {
  const { setSelectedProject, projects } = useContext(ProjectContext);
  const isLargeScreen = useMediaQuery({ minWidth: 751 });
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: "my-favorites",
      label: "My Favorites",
      icon: <ProjectOutlined />,
      children:
        projects &&
        Array.isArray(projects) &&
        projects.length !== 0 &&
        projects.some((project) => project.isFavorite)
          ? projects
              .filter((project) => project.isFavorite)
              .map((project) => ({
                label: (
                  <ProjectLabel
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                ),
                key: `dashboard/my-favorites/${project.id}`,
              }))
          : undefined,
    },
    {
      key: "my-projects",
      label: "My Projects",
      icon: <ProfileOutlined />,
      children:
        projects && Array.isArray(projects) && projects.length !== 0
          ? projects.map((project) => ({
              label: (
                <ProjectLabel
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ),
              key: `dashboard/my-projects/${project.id}`,
            }))
          : undefined,
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
          <LeftSiderToggle collapsed={collapsed} setCollapsed={setCollapsed} />
        )}
        {/* Right side Layout */}
        <TheRightLayout />
      </Layout>

      {/* Modals */}
      <EditOrDeleteProjectModal />
      <AddProjectModal />
    </div>
  );
};

UserDashboard.propTypes = {
  setUserData: PropTypes.func.isRequired,
};

export default UserDashboard;
