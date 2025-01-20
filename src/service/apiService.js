// import { TodoistApi } from "@doist/todoist-api-typescript";

import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_TODOIST_BACKEND_API,
});

export const fetchData = async () => {
    try {
        const response = await API.get('/data');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getProjectsViaApi = async () => {
    try {
        console.log('fetching projects')
        const response = await API.get('/api/projects');
        return response.data;
    } catch (err) {
        console.error('Error fetching projects:', err);
        throw err;
    }
};
export const addProjectViaApi = async (projectData) => {
    try {
        console.log("---------------add-------", projectData)
        const response = await API.post('/api/projects/', projectData);
        return response.data;
    } catch (err) {
        console.error('Error adding project:', err);
        throw err;
    }
};
export const updateProjectViaApi = async (projectId, projectData) => {
    try {
        console.log("-------------update----------------", projectData)
        const response = await API.put(`/api/projects/${projectId}`, projectData);
        console.log("response-----------------", response)
        return response.data;
    } catch (err) {
        console.error('Error updating favorite project:', err);
        throw err;
    }
};
export const updateProjectFavoriteViaApi = async (projectId, projectData) => {
    try {
        console.log('update fav in frontend api service', projectId, projectData)
        const response = await API.patch(`/api/projects/${projectId}`, projectData);
        return response.data;
    } catch (err) {
        console.error('Error updating favorite project:', err);
        throw err;
    }
};
export const deleteProjectViaApi = async (projectId) => {
    console.log("deleting proj:", projectId)
    try {
        const response = await API.delete(`/api/projects/${projectId}`);
        return response.data;
    } catch (err) {
        console.error('Error deleting project:', err);
        throw err;
    }
};


export const getTasksViaApi = async () => {
    try {
        console.log('fetching tasks')
        const response = await API.get('/api/tasks');
        return response.data;
    } catch (err) {
        console.error('Error fetching tasks:', err);
        throw err;
    }
};

export const addTaskViaApi = async (taskData) => {
    console.log("adding task:", taskData)
    try {
        const response = await API.post('/api/tasks', taskData);
        console.log('logging response data on addition', response)
        return response.data;
    } catch (err) {
        console.error('Error adding task:', err);
        throw err;
    }
};

export const updateTaskViaApi = async (taskId, taskData) => {
    console.log("updating task:", taskId, taskData)
    try {
        console.log('update task via api', taskData)
        const response = await API.put(`/api/tasks/${taskId}`, taskData);
        return response.data;
    } catch (err) {
        console.error('Error updating task:', err);
        throw err;
    }
};

export const deleteTaskViaApi = async (taskId) => {
    console.log("deleting task:", taskId)
    try {
        const response = await API.delete(`/api/tasks/${taskId}`);
        return response.data;
    } catch (err) {
        console.error('Error deleting task:', err);
        throw err;
    }
};


// const apiToken = import.meta.env.VITE_TODOIST_API_TOKEN;
// const api = new TodoistApi(apiToken);

// // export const getProjectsViaApi = () => api.getProjects();
// export const addProjectViaApi = (projectData) => api.addProject(projectData);
// export const updateProjectViaApi = (projectId, projectData) =>
//     api.updateProject(projectId, projectData);
// export const deleteProjectViaApi = (projectId) => api.deleteProject(projectId);

// export const getTasksViaApi = () => api.getTasks();
// export const addTaskViaApi = (taskData) => api.addTask(taskData);
// export const updateTaskViaApi = (taskId, taskData) => api.updateTask(taskId, taskData);
// export const deleteTaskViaApi = (taskId) => api.deleteTask(taskId);

