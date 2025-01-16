import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { message } from "antd";

// Internal imports
import { useModal } from "./hooks/useModal";

import {
  getProjectsViaApi,
  addProjectViaApi,
  updateProjectViaApi,
  deleteProjectViaApi,
  getTasksViaApi,
  updateTaskViaApi,
  deleteTaskViaApi,
} from "./service/apiService";

import { useSelector, useDispatch } from "react-redux";

import {
  setProjects,
  addProject,
  updateProjects,
  deleteProject,
  setIsLoading,
  setHasError,
} from "./features/projectsSlice";

import { setTasks, updateTask, deleteTask } from "./features/tasksSlice";

export const ProjectsAndTasksContext = createContext();

export const ProjectsAndTasksProvider = ({ children }) => {
  // Redux-ing
  const { projects, isLoading, hasError } = useSelector(
    (state) => state.projects
  );

  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const addProjectModal = useModal();

  const editOrDeleteProjectModal = useModal();

  const [selectedProject, setSelectedProject] = useState(null);

  const [actionTypeOnProject, setActionTypeOnProject] = useState("");


  /**
   * Project state handlers
   */
  const handleFormSubmitForAddProject = async (values) => {
    const { projectTitle, isFavorite } = values;
    try {
      const newProject = await addProjectViaApi({
        name: projectTitle,
        isFavorite,
      });
      dispatch(addProject(newProject));
      addProjectModal.hideModal();
      addProjectModal.form.resetFields();
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  const handleEditProjectFormSubmit = async (values) => {
    try {
      const updatedProject = await updateProjectViaApi(selectedProject.id, {
        id: selectedProject.id,
        name: values.name,
        isFavorite: values.isFavorite,
      });
      dispatch(updateProjects(updatedProject));
      editOrDeleteProjectModal.form.resetFields();
      message.success("Updated project successfully.");
    } catch (err) {
      message.error("Error updating project:", err);
    } finally {
      handleCancelForEditOrDeleteProject();
    }
  };

  const handleUpdateFavoriteProjectStatus = async () => {
    try {
      const updatedProject = {
        ...selectedProject,
        isFavorite: !selectedProject.isFavorite,
      };
      await updateProjectViaApi(selectedProject.id, updatedProject);
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
    editOrDeleteProjectModal.form.resetFields();
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
    dispatch(setIsLoading(true));
    Promise.all([getProjectsViaApi(), getTasksViaApi()])
      .then(([fetchedProjects, fetchedTasks]) => {
        dispatch(setProjects(fetchedProjects));
        dispatch(setTasks(fetchedTasks));
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        message.error("Error while fetching data from API:", error);
        dispatch(setHasError(true));
        dispatch(setIsLoading(false));
      });
  }, [dispatch]);
// import tasksReducer from "./store/TasksReducer";


  /**
   * Task Handlers
   */
  const handleTaskEdit = async (updatedTask) => {
    try {
      await updateTaskViaApi(updatedTask.id, {
        content: updatedTask.content,
        description: updatedTask.description,
        due_date: updatedTask.due_date,
        priority: updatedTask.priority,
      });
      dispatch(updateTask(updatedTask));
      message.success("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };


  const handleDeleteTask = async (theId) => {
    await deleteTaskViaApi(theId)
      .then(() => {
        dispatch(deleteTask(theId));
        message.success("Task deleted.");
      })
      .catch((error) => message.error("Error deleting task:", error));
  };


  return (
    <ProjectsAndTasksContext.Provider
      value={{
        handleTaskEdit,
        handleDeleteTask,
        projects,
        isLoading,
        hasError,
        tasks,
        dispatch,
        addProjectModal,
        editOrDeleteProjectModal,
        selectedProject,
        setSelectedProject,
        actionTypeOnProject,
        handleFormSubmitForAddProject,
        handleEditProjectFormSubmit,
        handleCancelForEditOrDeleteProject,
        handleUpdateFavoriteProjectStatus,
        handleDeleteProject,
        showAddProjectModal,
        handleModalCancelForAddProject,
        showProjectActionsModal,
        editProjectTitle,
      }}
    >
      {children}
    </ProjectsAndTasksContext.Provider>
  );
};

ProjectsAndTasksProvider.propTypes = {
  children: PropTypes.any,
};
