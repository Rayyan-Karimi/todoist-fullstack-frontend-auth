// Library imports
import { useContext } from "react";
import { Layout } from "antd";
import PropTypes from "prop-types";
import { Footer } from "antd/es/layout/layout";
const { Sider } = Layout;
import { useNavigate } from "react-router-dom";

// Internal imports
import SiderHeader from "./Sider-Header";
import SiderMenu from "./Sider-Menu";
import ProjectContext from "../contexts/ProjectsContext.jsx";

// Component
const LeftSider = ({
  isLargeScreen,
  setCollapsed,
  menuItems,
  collapsed,
  setUserData,
}) => {
  const { showAddProjectModal } = useContext(ProjectContext);
  const navigate = useNavigate();

  console.log("Menu items:", menuItems);

  return (
    <Sider
      width={isLargeScreen ? (collapsed ? 0 : 325) : 325}
      style={{
        ...getLeftSiderStyle(isLargeScreen, collapsed),
      }}
    >
      <>
        <SiderHeader
          setUserData={setUserData}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <SiderMenu
          menuItems={menuItems}
          navigate={navigate}
          showAddProjectModal={showAddProjectModal}
        />
      </>
      <Footer style={{ ...getFooterStyle() }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M10.241 4.004h3.513c.554 0 1.004.448 1.004 1v9.638l-5.52-7.855V5.004c0-.552.449-1 1.003-1Zm4.844 15.4.048-.074a3.772 3.772 0 0 1-6.218.074L1.863 9.37a1.995 1.995 0 0 1 .493-2.786l2.878-2.007a2.012 2.012 0 0 1 2.795.49l.205.292v-.355c0-1.105.899-2 2.007-2h3.513c1.109 0 2.007.895 2.007 2v.361l.21-.298a2.012 2.012 0 0 1 2.796-.492l2.877 2.008a1.995 1.995 0 0 1 .493 2.785l-7.052 10.035Zm.676-12.295v9.589l5.554-7.903a.998.998 0 0 0-.247-1.393l-2.877-2.007a1.006 1.006 0 0 0-1.398.245L15.761 7.11ZM5.81 5.396 2.932 7.403a.998.998 0 0 0-.247 1.393L9.737 18.83a2.766 2.766 0 0 0 3.844.675 2.744 2.744 0 0 0 .678-3.83L7.207 5.64a1.006 1.006 0 0 0-1.398-.245Zm6.189 12.983a1.002 1.002 0 0 1-1.004-1c0-.552.45-1 1.004-1s1.003.448 1.003 1-.45 1-1.003 1Z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span>Browse templates</span>
      </Footer>
    </Sider>
  );
};

// Helper
const getLeftSiderStyle = (isLargeScreen, collapsed) => ({
  background: "rgb(255, 255, 245)",
  minHeight: "100vh",
  transform: collapsed ? "translateX(-100%)" : "translateX(0)",
  position: isLargeScreen ? "relative" : "fixed",
  zIndex: isLargeScreen ? "auto" : 1000,
  transition: "transform 0.3s ease-in-out",
});

const getFooterStyle = () => ({
  position: "absolute",
  bottom: 0,
  width: "100%",
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  background: "inherit",
  fontWeight: "bold",
});

LeftSider.propTypes = {
  setUserData: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
  isLargeScreen: PropTypes.bool.isRequired,
  menuItems: PropTypes.array.isRequired,
};

export default LeftSider;
