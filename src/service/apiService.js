import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_TODOIST_BACKEND_API,
    withCredentials: true
});

/** --- Users --- */
export const validateTokenViaApi = async () => {
    try {
        const tokenResponse = await API.get('/users/validate');
        if (!tokenResponse.data) {
            throw new Error('No user data received');
        }
        return tokenResponse.data;
    } catch (error) {
        console.error('Token validation failed:', error.response?.data || error.message);
        throw error;
    }
};

export const registerUserViaApi = async (userData) => {
    try {
        console.log('registering user in frontend.')
        const response = await API.post('/users/register', userData);
        return response.data;
    } catch (err) {
        console.error('error registering user in frontend:', err)
        throw err;
    }
}

export const loginUserViaApi = async (credentials) => {
    try {
        const response = await API.post('/users/login', credentials);
        if (!response.data?.user) {
            throw new Error('No user data received from login');
        }
        return response.data;
    } catch (err) {
        console.error('Login error:', err.response?.data || err.message);
        throw err;
    }
}


export const logoutUserViaApi = async () => {
    try {
        console.log('logging out of frontend...')
        const response = await API.post('/users/logout');
        console.log('api hit from frontend.', response)
    } catch (err) {
        console.error('error during logout in frontend', err)
        throw err;
    }
}

/** --- Projects --- */
export const getProjectsViaApi = async () => {
    try {
        const response = await API.get('/projects');
        console.log("Result from inside getProjectsViaAapi:", response);
        return response.data;
    } catch (err) {
        console.error('Error fetching projects:', err);
        throw err;
    }
};

export const addProjectViaApi = async (projectData) => {
    try {
        console.log("---------------add-------", projectData)
        const response = await API.post('/projects/', projectData);
        return response.data;
    } catch (err) {
        console.error('Error adding project:', err);
        throw err;
    }
};

export const updateProjectViaApi = async (projectId, projectData) => {
    try {
        console.log("-------------update----------------", projectData)
        const response = await API.put(`/projects/${projectId}`, projectData);
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
        const response = await API.patch(`/projects/${projectId}`, projectData);
        return response.data;
    } catch (err) {
        console.error('Error updating favorite project:', err);
        throw err;
    }
};

export const deleteProjectViaApi = async (projectId) => {
    console.log("deleting proj:", projectId)
    try {
        const response = await API.delete(`/projects/${projectId}`);
        return response.data;
    } catch (err) {
        console.error('Error deleting project:', err);
        throw err;
    }
};

/** --- Tasks --- */
export const getTasksViaApi = async () => {
    try {
        const response = await API.get('/tasks');
        return response.data;
    } catch (err) {
        console.error('Error fetching tasks:', err);
        throw err;
    }
};

export const addTaskViaApi = async (taskData) => {
    console.log("adding task:", taskData)
    try {
        const response = await API.post('/tasks', taskData);
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
        const response = await API.put(`/tasks/${taskId}`, taskData);
        return response.data;
    } catch (err) {
        console.error('Error updating task:', err);
        throw err;
    }
};

export const deleteTaskViaApi = async (taskId) => {
    console.log("deleting task:", taskId)
    try {
        const response = await API.delete(`/tasks/${taskId}`);
        return response.data;
    } catch (err) {
        console.error('Error deleting task:', err);
        throw err;
    }
};

