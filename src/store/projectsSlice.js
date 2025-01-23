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
            state.projects = state.projects.map(project => {
                return project.id === action.payload.id ? action.payload : project
            }
            );
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