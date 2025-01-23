// Library imports
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { message } from "antd";
// Internal imports
import {
  getTasksViaApi,
  updateTaskViaApi,
  deleteTaskViaApi,
} from "../../service/apiService";
import TasksContext from "../contexts/TasksContext";
import { setTasks, updateTask, deleteTask } from "../../store/tasksSlice";

const TaskProvider = ({ children }) => {
  // internal state
  const { projects, isLoading, hasError } =
    useSelector((state) => state.projects);
  const { tasks } = useSelector((state) => state.tasks);
  const [selectedProject, setSelectedProject] = useState(null);
  // custom hook to use dispatches from react-redux
  const dispatch = useDispatch();
  // the task of fetching tasks
  useEffect(() => {
    console.log("inside task provider use effect.");
    getTasksViaApi()
      .then(([fetchedTasks]) => {
        dispatch(setTasks(fetchedTasks));
      })
      .catch((error) => {
        console.error("Error while fetching data from task provider use effect:", error);
      });
  }, [dispatch]);
  /* task handlers*/
  const handleTaskEdit = async (updatedTask) => {
    try {
      await updateTaskViaApi(updatedTask.id, {
        content: updatedTask.content,
        description: updatedTask.description,
        dueDate: updatedTask.dueDate,
        priority: updatedTask.priority,
        projectId: updatedTask.projectId,
      });
      dispatch(updateTask(updatedTask));
      message.success("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const handleDeleteTask = async (theId) => {
    console.log("handleDeleteTask in Provider");
    await deleteTaskViaApi(theId)
      .then(() => {
        dispatch(deleteTask(theId));
        message.success("Task deleted.");
      })
      .catch((error) => message.error("Error deleting task:", error));
  };
  // main jsx
  return (
    <TasksContext.Provider
      value={{
        handleTaskEdit,
        handleDeleteTask,
        projects,
        isLoading,
        hasError,
        tasks,
        selectedProject,
        setSelectedProject,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
export default TaskProvider;
// propTypes
TaskProvider.propTypes = {
  children: PropTypes.any,
};
