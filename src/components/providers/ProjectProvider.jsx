// library imports
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { message } from "antd";

// internal imports
import ProjectContext from "../contexts/ProjectsContext";
import { useModal } from "../../hooks/useModal";

import {
  getProjectsViaApi,
  addProjectViaApi,
  updateProjectViaApi,
  deleteProjectViaApi,
  updateProjectFavoriteViaApi,
} from "../../service/apiService";

import {
  setProjects,
  addProject,
  updateProjects,
  deleteProject,
} from "../../store/projectsSlice";

// component
const ProjectProvider = ({ children }) => {
  const { projects } = useSelector(
    (state) => state.projects
  );

  const dispatch = useDispatch();

  const addProjectModal = useModal();

  const editOrDeleteProjectModal = useModal();

  const [selectedProject, setSelectedProject] = useState(null);

  const [actionTypeOnProject, setActionTypeOnProject] = useState("");

  /* Project state handlers */
  const handleFormSubmitForAddProject = async (values) => {
    const { projectTitle, isFavorite } = values;
    try {
      const newProject = await addProjectViaApi({
        name: projectTitle,
        isFavorite,
      });
      dispatch(addProject(newProject));
      message.success("Added project successfully.");
      addProjectModal.hideModal();
      addProjectModal.form.resetFields();
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  const handleEditProjectFormSubmit = async (values) => {
    try {
      console.log("handle edit project for form submit");
      const updatedProject = await updateProjectViaApi(selectedProject.id, {
        id: selectedProject.id,
        name: values.name,
        isFavorite: values.isFavorite,
      });
      console.log("--------------", updatedProject);
      dispatch(updateProjects(updatedProject));
      editOrDeleteProjectModal.form.resetFields();
      message.success("Updated project successfully.");
    } catch (err) {
      message.error("Error updating project:", err);
    } finally {
      handleCancelForEditOrDeleteProject();
    }
  };

  const updateProjectFavorite = async () => {
    // const handleUpdateFavoriteProjectStatus = async () => {
    console.log("trying to change favotire");
    try {
      const updatedProject = {
        ...selectedProject,
        isFavorite: !selectedProject.isFavorite,
      };
      console.log("here reached.", updatedProject);
      await updateProjectFavoriteViaApi(selectedProject.id, updatedProject); //========================
      dispatch(updateProjects(updatedProject));
      message.success("Updated favorite successfully.");
    } catch (err) {
      message.error("Error updating favorite:", err);
    } finally {
      handleCancelForEditOrDeleteProject();
    }
  };

  const editProjectTitle = async (value) => {
    try {
      const updatedProject = {
        ...selectedProject,
        name: value,
      };
      await updateProjectViaApi(selectedProject.id, updatedProject);
      dispatch(updateProjects(updatedProject));
      message.success("Updated project name successfully.");
    } catch (err) {
      message.error("Error updating project name:", err);
    } finally {
      handleCancelForEditOrDeleteProject();
    }
  };

  const handleDeleteProject = async () => {
    try {
      await deleteProjectViaApi(selectedProject.id);
      dispatch(deleteProject(selectedProject.id));
      message.success("Deleted project successfully.");
    } catch (err) {
      message.error("Error deleting project:", err);
    } finally {
      handleCancelForEditOrDeleteProject();
    }
  };

  const handleCancelForEditOrDeleteProject = () => {
    editOrDeleteProjectModal.hideModal();
    setSelectedProject(null);
    setActionTypeOnProject("");
    // editOrDeleteProjectModal.form.resetFields();
  };

  const showAddProjectModal = () => {
    addProjectModal.showModal();
  };

  const handleModalCancelForAddProject = () => {
    addProjectModal.hideModal();
    addProjectModal.form.resetFields();
  };

  const showProjectActionsModal = (project, type) => {
    setSelectedProject(project);
    setActionTypeOnProject(type); // 'edit' or 'delete'
    editOrDeleteProjectModal.showModal();
    if (type === "edit") {
      editOrDeleteProjectModal.form.setFieldsValue({
        name: selectedProject.name,
        isFavorite: selectedProject.isFavorite,
      });
    }
  };

  useEffect(() => {
    console.log("inside project provider use effect.");
    getProjectsViaApi()
      .then((fetchedProjects) => {
        dispatch(setProjects(fetchedProjects));
      })
      .catch((error) => {
        console.error(
          "Error while fetching data from project provider use effect:",
          error
        );
      });
  }, [dispatch]);

  // main jsx
  return (
    <ProjectContext.Provider
      value={{
        projects,
        dispatch,
        addProjectModal,
        editOrDeleteProjectModal,
        selectedProject,
        setSelectedProject,
        actionTypeOnProject,
        handleFormSubmitForAddProject,
        handleEditProjectFormSubmit,
        handleCancelForEditOrDeleteProject,
        // handleUpdateFavoriteProjectStatus,
        updateProjectFavorite,
        handleDeleteProject,
        showAddProjectModal,
        handleModalCancelForAddProject,
        showProjectActionsModal,
        editProjectTitle,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;

ProjectProvider.propTypes = {
  children: PropTypes.any,
};
