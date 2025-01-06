// Single project's view
import Index from "./Index";
import AddTaskModal from "../util/AddTaskModal";

import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { List, Typography, Checkbox, Tooltip, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { ProjectsAndTasksContext } from "../../ProjectsAndTasksProvider";

const { Title, Text } = Typography;

export default function IndividualProject() {
  const { projects, tasks, handleTaskEdit, handleDeleteTask } = useContext(
    ProjectsAndTasksContext
  );
  const { id } = useParams();
  const filteredTasks = tasks.filter((task) => task.projectId === id);
  const filteredProject = projects.find((project) => project.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsEditing(true);
  };

  const handleEditSave = async (updatedTask) => {
    handleTaskEdit(updatedTask);
    setIsEditing(false);
    setEditingTask(null);
  };

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
      <Title level={5}>
        <Button
          block={true}
          size="large"
          // onClick={editProjectTitle(filteredProject?.name)}
          style={{ marginBottom: "20px" }}
        >
          {filteredProject && filteredProject.name}
        </Button>
      </Title>

      {filteredTasks.length > 0 ? (
        <List
          dataSource={filteredTasks}
          renderItem={(task) => (
            <List.Item
              style={{
                padding: "10px 0",
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

      {isEditing && (
        <AddTaskModal
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          task={editingTask}
          onSave={handleEditSave}
          projectId={id}
        />
      )}
      {!isEditing && (
        <AddTaskModal setIsEditing={setIsEditing} projectId={id} />
      )}
      {filteredTasks.length === 0 && <Index />}
    </div>
  );
}
