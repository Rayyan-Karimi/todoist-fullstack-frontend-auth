import { TodoistApi } from "@doist/todoist-api-typescript";

const apiToken = import.meta.env.VITE_TODOIST_API_TOKEN;
const api = new TodoistApi(apiToken);

export const getProjectsViaApi = () => api.getProjects();
export const addProjectViaApi = (projectData) => api.addProject(projectData);
export const updateProjectViaApi = (projectId, projectData) =>
    api.updateProject(projectId, projectData);
export const deleteProjectViaApi = (projectId) => api.deleteProject(projectId);

export const getTasksViaApi = () => api.getTasks();
export const addTaskViaApi = (taskData) => api.addTask(taskData);
export const updateTaskViaApi = (taskId, taskData) => api.updateTask(taskId, taskData);
export const deleteTaskViaApi = (taskId) => api.deleteTask(taskId);
