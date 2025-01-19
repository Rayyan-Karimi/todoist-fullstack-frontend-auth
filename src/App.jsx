// React & antd imports
import { useState, useContext } from "react";
import { ProjectOutlined, ProfileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { useMediaQuery } from "react-responsive";

// Imports of self made items
import ProjectLabel from "./components/elements/ProjectLabel";
import AddProjectModal from "./components/elements/AddProjectModal";
import EditOrDeleteProjectModal from "./components/elements/EditOrDeleteProjectModal";
import ProjectActionsDropdown from "./components/elements/ProjectActionsDropdown";
import LeftSiderSmall from "./components/ui/LeftSider";
import RightLayout from "./components/ui/RightLayout";
import LeftSiderToggle from "./components/ui/LeftSider-ToggleForLeftSider";
import { ProjectsAndTasksContext } from "./ProjectsAndTasksProvider";

// App function
function App() {
  const navigate = useNavigate();
  const {
    projects,
    isLoading,
    hasError,
    setSelectedProject,
    handleUpdateFavoriteProjectStatus,
    showAddProjectModal,
    showProjectActionsModal,
  } = useContext(ProjectsAndTasksContext);

  const isLargeScreen = useMediaQuery({ minWidth: 751 });
  const [collapsed, setCollapsed] = useState(false);

  if (isLoading) {
    return <>Loading...</>;
  } else if (hasError) {
    return <>Error loading data. Please check Login Token. API fetch error.</>;
  }

  const menuItems = [
    {
      key: "my-favorites",
      label: "My Favorites",
      icon: <ProjectOutlined />,
      children: projects
        .filter((project) => project.isFavorite)
        .map((project) => ({
          label: (
            <ProjectLabel
              project={project}
              setSelectedProject={setSelectedProject}
              handleUpdateFavoriteProjectStatus={
                handleUpdateFavoriteProjectStatus
              }
              showProjectActionsModal={showProjectActionsModal}
              onClick={() => setSelectedProject(project)}
            />
          ),
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
              <ProjectActionsDropdown
                project={project}
                handleUpdateFavoriteProjectStatus={
                  handleUpdateFavoriteProjectStatus
                }
                showProjectActionsModal={showProjectActionsModal}
              />
            </div>
          </div>
        ),
        key: `/my-projects/${project.id}`,
      })),
    },
  ];

  // Returning HTML
  return (
    <div className="App">
      <Layout>
        {/* Left side Sider */}
        <LeftSiderSmall
          collapsed={collapsed}
          isLargeScreen={isLargeScreen}
          setCollapsed={setCollapsed}
          menuItems={menuItems}
          navigate={navigate}
          showAddProjectModal={showAddProjectModal}
        />
        {collapsed && (
          <LeftSiderToggle collapsed={collapsed} setCollapsed={setCollapsed} />
        )}

        {/* Right side Layout */}
        <RightLayout />
      </Layout>

      {/* Project actions modal */}
      <EditOrDeleteProjectModal />

      {/* Add Project Modal */}
      <AddProjectModal />
    </div>
  );
}

export default App;
