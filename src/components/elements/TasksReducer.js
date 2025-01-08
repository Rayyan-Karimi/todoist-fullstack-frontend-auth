const tasksReducer = (tasks, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return action.payload;
        case 'ADD_TASK':
            return [...tasks, action.payload];
        case 'UPDATE_TASK':
            return tasks.map((project) => project.id === action.payload.id ? action.payload : project);
        case 'DELETE_TASK':
            return tasks.filter((project) => project.id !== action.payload);
        default:
            throw new Error('Unknown action:', action.type);
    }
}

export default tasksReducer
