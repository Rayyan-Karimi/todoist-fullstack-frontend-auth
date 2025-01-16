import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    projects: [],
    isLoading: false,
    hasError: null,
}

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects(state, action) {
            state.projects = action.payload
        },
        addProject(state, action) {
            state.projects.push(action.payload)
        },
        updateProjects(state, action) {
            const index = state.projects.findIndex((project) => project.id === action.payload.id)
            if (index !== -1) {
                state.projects[index] = action.payload
            }
        },
        deleteProject(state, action) {
            state.projects = state.projects.filter((project) => project.id !== action.payload)
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
        setHasError(state, action) {
            state.hasError = action.payload
        }
    }
});

export const { setProjects, addProject, updateProjects, deleteProject, setIsLoading, setHasError } = projectsSlice.actions;
export default projectsSlice.reducer;