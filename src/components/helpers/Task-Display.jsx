// Library imports
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { List, Typography, Checkbox, Tooltip, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

// Internal imports
import TaskContext from "../contexts/TasksContext.jsx";
import ProjectContext from "../contexts/ProjectsContext.jsx";
import AddTaskModal from "./AddTaskModal";
import Index from "./Task-Empty";

/* Component */
export default function TaskDisplay() {
  // states for tasks
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  // import projects and tasks
  const { tasks, handleTaskEdit, handleDeleteTask } = useContext(TaskContext);
  const { projects } = useContext(ProjectContext);
  // take project id from params
  let { id } = useParams();
  id = Number.parseInt(id);
  // filter relevant tasks and project
  const filteredTasks = tasks.filter((task) => task.projectId === id);
  const filteredProject = projects.find((project) => project.id === id);
  // add handlers for editing and saving
  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsEditing(true);
  };
  const handleEditSave = async (updatedTask) => {
    handleTaskEdit(updatedTask);
    setIsEditing(false);
    setEditingTask(null);
  };
  // return jsx
  return (
    <div
      style={{
        padding: "20px",
        margin: "auto",
        height: "80vh",
        overflowY: "auto",
        maxWidth: "600px",
      }}
    >
      {/* Project title */}
      <Title level={5}>
        <Button
          block={true}
          size="large"
          style={{ marginBottom: "20px" }}
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          {filteredProject && filteredProject.name}
        </Button>
      </Title>
      {/* List tasks */}
      {filteredTasks.length > 0 ? (
        <List
          dataSource={filteredTasks}
          renderItem={(task) => (
            <List.Item
              style={{
                padding: "10px 0px",
                alignItems: "flex-start",
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                width: "100%",
              }}
              className="task-item"
            >
              <Tooltip title="Delete Task?">
                <Checkbox
                  style={{
                    padding: "0px",
                    minWidth: "2rem",
                  }}
                  checked={task.isCompleted}
                  onClick={() => handleDeleteTask(task.id)}
                />
              </Tooltip>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  position: "relative",
                }}
              >
                <div>
                  <Text strong>{task.content}</Text>
                  <Tooltip title="Edit Task?">
                    <EditOutlined
                      className="edit-icon"
                      onClick={() => handleEditClick(task)}
                      style={{
                        marginLeft: "10px",
                        cursor: "pointer",
                        color: "#1890ff",
                      }}
                    />
                  </Tooltip>
                </div>
                <Text type="secondary">{task.description || ""}</Text>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <Text>No tasks found for this project.</Text>
      )}
      {/* Edit task */}
      {isEditing && (
        <AddTaskModal
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          task={editingTask}
          onSave={handleEditSave}
          projectId={id}
        />
      )}
      {/* Add task */}
      {!isEditing && (
        <AddTaskModal setIsEditing={setIsEditing} projectId={id} />
      )}
      {/* Fallback -> tasks empty */}
      {filteredTasks.length === 0 && <Index />}
    </div>
  );
}
