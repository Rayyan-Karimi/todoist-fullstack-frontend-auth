import { Layout } from "antd";
const { Header, Content, Footer } = Layout;
import PropTypes from "prop-types";
import { useContext } from "react";

import ContentDisplay from "./RightLayout-ContentDisplay.jsx";
import { ProjectsAndTasksContext } from "../../ProjectsAndTasksProvider.jsx";

// RightLayout Component
const RightLayout = () => {
  const { selectedProject, tasks, projects, setTasks, editProjectTitle } =
    useContext(ProjectsAndTasksContext);
  return (
    <Layout style={{ background: "white" }}>
      <HeaderComponent selectedProject={selectedProject} />
      <Content style={{ minHeight: "70vh" }}>
        <ContentDisplay
          editProjectTitle={editProjectTitle}
          tasks={tasks}
          projects={projects}
          setTasks={setTasks}
        />
      </Content>
      <FooterComponent />
    </Layout>
  );
};


// HeaderComponent
const HeaderComponent = ({ selectedProject }) => (
  <Header
    style={{
      background: "#fff",
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <>
      {selectedProject && selectedProject.isFavorite
        ? `My Favorites /`
        : `My Projects /`}
      <div style={{ display: "flex", gap: "1rem", marginTop: "1.2rem" }}>
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
            d="M11 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.427 3.62C16.803 14.196 14.323 13.5 11 13.5c-3.323 0-5.803.697-7.427 2.12A2.5 2.5 0 0 0 5.22 20h11.56a2.5 2.5 0 0 0 1.647-4.38Zm-14.195.752C5.647 15.133 7.898 14.5 11 14.5s5.354.633 6.768 1.872A1.5 1.5 0 0 1 16.78 19H5.22a1.5 1.5 0 0 1-.988-2.628ZM14 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm2.5 2a.5.5 0 1 1 0-1H19V6.5a.5.5 0 0 1 1 0V9h2.5a.5.5 0 0 1 0 1H20v2.5a.5.5 0 1 1-1 0V10h-2.5Z"
            clipRule="evenodd"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="nonzero"
            d="M15 14.5a2 2 0 0 1 1.936 1.498L19.5 16a.5.5 0 0 1 0 1l-2.563.001a2.001 2.001 0 0 1-3.874 0L4.5 17a.5.5 0 0 1 0-1l8.564-.002A2 2 0 0 1 15 14.5zm-.982 1.81.005-.025-.005.026-.003.014-.004.025-.007.061A.897.897 0 0 0 14 16.5l.008.125.007.047-.001.002.003.014.006.024h-.001l.004.018.016.058.007.021.004.013.009.026.013.033.012.027-.011-.026.019.043-.008-.017.029.06-.018-.037.048.09a1 1 0 0 0 1.784-.155l.015-.039.006-.018-.015.039.022-.06-.001-.001.016-.057.004-.018.005-.024.001-.006v-.001l.005-.033.008-.06A.877.877 0 0 0 16 16.5l-.008-.124-.007-.051-.001-.001-.003-.014-.01-.047-.004-.016-.007-.024-.01-.034-.004-.012-.01-.03-.006-.013-.007-.017-.01-.026a.998.998 0 0 0-1.843.043l-.014.034-.007.022-.014.047-.002.009v.001l-.005.016-.01.047zM9 9.5a2 2 0 0 1 1.936 1.498L19.5 11a.5.5 0 0 1 0 1l-8.563.001a2.001 2.001 0 0 1-3.874 0L4.5 12a.5.5 0 0 1 0-1l2.564-.002A2 2 0 0 1 9 9.5zm0 1a.998.998 0 0 0-.93.634l-.014.034-.007.022-.014.047-.002.009v.001l-.005.016-.01.047.005-.025-.005.026-.003.014-.004.025-.007.061C8 11.441 8 11.471 8 11.5l.008.125.007.047-.001.002.003.014.006.024h-.001l.004.018.016.058.007.021.004.013.009.026.013.033.012.027-.011-.026.019.043-.008-.017.029.06-.018-.037.048.09a1 1 0 0 0 1.784-.155l.015-.039.006-.018-.015.039.022-.06-.001-.001.016-.057.004-.018.005-.024.001-.006v-.001l.005-.033.008-.06A.877.877 0 0 0 10 11.5l-.008-.124-.007-.051-.001-.001-.003-.014-.01-.047-.004-.016-.007-.024-.01-.034-.004-.012-.01-.03-.006-.013-.007-.017-.01-.026A1.002 1.002 0 0 0 9 10.5zm6-6a2 2 0 0 1 1.936 1.498L19.5 6a.5.5 0 0 1 0 1l-2.563.001a2.001 2.001 0 0 1-3.874 0L4.5 7a.5.5 0 0 1 0-1l8.564-.002A2 2 0 0 1 15 4.5zm0 1a.998.998 0 0 0-.93.634l-.014.034-.007.022-.014.047-.002.009v.001l-.005.016-.01.047.005-.025-.005.026-.003.014-.004.025-.007.061C14 6.441 14 6.471 14 6.5l.008.125.007.047-.001.002.003.014.006.024h-.001l.004.018.016.058.007.021.004.013.009.026.013.033.012.027-.011-.026.019.043-.008-.017.029.06-.018-.037.048.09a1 1 0 0 0 1.784-.155l.015-.039.006-.018-.015.039.022-.06-.001-.001.016-.057.004-.018.005-.024.001-.006v-.001l.005-.033.008-.06C16 6.557 16 6.528 16 6.5l-.008-.124-.007-.051-.001-.001-.003-.014-.01-.047-.004-.016-.007-.024-.01-.034-.004-.012-.01-.03-.006-.013-.007-.017-.01-.026A1.002 1.002 0 0 0 15 5.5z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          data-svgs-path="sm1/comments.svg"
        >
          <path
            fill="currentColor"
            fillRule="nonzero"
            d="M11.707 20.793A1 1 0 0 1 10 20.086V18H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4.5l-2.793 2.793zM11 20.086L14.086 17H19a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h6v3.086z"
          ></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            transform="translate(3 10)"
          >
            <circle cx="2" cy="2" r="2"></circle>
            <circle cx="9" cy="2" r="2"></circle>
            <circle cx="16" cy="2" r="2"></circle>
          </g>
        </svg>
      </div>
    </>
  </Header>
);

HeaderComponent.propTypes = {
  selectedProject: PropTypes.object,
};

// FooterComponent
const FooterComponent = () => (
  <Footer
    style={{ background: "white" }}
  >{`Rayyan's Todoist Clone ©2024`}</Footer>
);

export default RightLayout;
