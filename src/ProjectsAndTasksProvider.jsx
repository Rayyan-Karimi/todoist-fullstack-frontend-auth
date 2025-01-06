import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, message } from "antd";
import { TodoistApi } from "@doist/todoist-api-typescript";

// API setup
const apiToken = import.meta.env.VITE_TODOIST_API_TOKEN;
const api = new TodoistApi(apiToken);

export const ProjectsAndTasksContext = createContext();

export const ProjectsAndTasksProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [isAddProjectModalVisible, setIsAddProjectModalVisible] =
    useState(false);
  const [
    isEditOrDeleteProjectModalVisible,
    setIsEditOrDeleteProjectModalVisible,
  ] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [actionTypeOnProject, setActionTypeOnProject] = useState("");
  const addProjectForm = Form.useForm();
  const [editOrDeleteProjectForm] = Form.useForm();

  /**
   * Project state handlers
   */

  const handleFormSubmitForAddProject = async (values) => {
    const { projectTitle, isFavorite } = values;
    try {
      const newProject = await api.addProject({
        name: projectTitle,
        isFavorite,
      });
      setProjects((prev) => [...prev, newProject]);
      setIsAddProjectModalVisible(false);
      // addProjectForm.resetFields();
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  const handleEditProjectFormSubmit = async (values) => {
    try {
      const updatedProject = await api.updateProject(selectedProject.id, {
        name: values.name,
        isFavorite: values.isFavorite,
      });
      setProjects((prev) =>
        prev.map((project) =>
          project.id !== updatedProject.id ? project : updatedProject
        )
      );

      editOrDeleteProjectForm.resetFields();
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
      await api.updateProject(selectedProject.id, updatedProject);
      setProjects((prev) =>
        prev.map((project) =>
          project.id !== updatedProject.id ? project : updatedProject
        )
      );
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
      await api.updateProject(selectedProject.id, updatedProject);
      setProjects((prev) =>
        prev.map((project) =>
          project.id !== updatedProject.id ? project : updatedProject
        )
      );
      message.success("Updated project name successfully.");
    } catch (err) {
      message.error("Error updating project name:", err);
    } finally {
      handleCancelForEditOrDeleteProject();
    }
  };

  const handleDeleteProject = async () => {
    try {
      await api.deleteProject(selectedProject.id);
      setProjects((prev) =>
        prev.filter((project) => project.id !== selectedProject.id)
      );
      message.success("Deleted project successfully.");
    } catch (err) {
      message.error("Error deleting project:", err);
    } finally {
      handleCancelForEditOrDeleteProject();
    }
  };

  const handleCancelForEditOrDeleteProject = () => {
    setIsEditOrDeleteProjectModalVisible(false);
    setSelectedProject(null);
    setActionTypeOnProject("");
    // editOrDeleteProjectForm.resetFields();
  };

  const showAddProjectModal = () => {
    setIsAddProjectModalVisible(true);
  };

  const handleModalCancelForAddProject = () => {
    setIsAddProjectModalVisible(false);
  };

  const showProjectActionsModal = (project, type) => {
    setSelectedProject(project);
    setActionTypeOnProject(type); // 'edit' or 'delete'
    setIsEditOrDeleteProjectModalVisible(true);
    if (type === "edit") {
      editOrDeleteProjectForm.setFieldsValue({
        name: project.name,
        isFavorite: project.isFavorite,
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getProjects(), api.getTasks()])
      .then(([fetchedProjects, fetchedTasks]) => {
        setProjects(fetchedProjects);
        setTasks(fetchedTasks);
        setIsLoading(false);
      })
      .catch((error) => {
        message.error("Error while fetching data from API:", error);
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  const handleTaskEdit = async (updatedTask) => {
    try {
      await api.updateTask(updatedTask.id, {
        content: updatedTask.content,
        description: updatedTask.description,
        due_date: updatedTask.due_date,
        priority: updatedTask.priority,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
      console.log("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = (theId) => {
    api
      .deleteTask(theId)
      .then((isSuccess) => {
        if (isSuccess) {
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== theId)
          );
          message.success("Task deleted.");
        }
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
        setTasks,
        isAddProjectModalVisible,
        isEditOrDeleteProjectModalVisible,
        selectedProject,
        setSelectedProject,
        actionTypeOnProject,
        handleFormSubmitForAddProject,
        handleEditProjectFormSubmit,
        handleCancelForEditOrDeleteProject,
        addProjectForm,
        editOrDeleteProjectForm,
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
