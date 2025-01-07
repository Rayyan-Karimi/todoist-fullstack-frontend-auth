const projectsReducer = (projects, action) => {
  console.log("Action", action)
  switch (action.type) {
    case 'SET_PROJECTS':
      return action.payload;
    case 'ADD_PROJECT':
      return [...projects, action.payload];
    case 'UPDATE_PROJECT':
      return projects.map((project) => project.id === action.payload.id ? action.payload : project);
    case 'DELETE_PROJECT':
      return projects.filter((project) => project.id !== action.payload);
    default:
      throw new Error('Unknown action:', action.type);
  }
}

export default projectsReducer
