import { useState, useEffect, useContext } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TodoistApi } from "@doist/todoist-api-typescript";
import PropTypes from "prop-types";
import { ProjectsAndTasksContext } from "../../ProjectsAndTasksProvider";

const { Option } = Select;
const apiToken = import.meta.env.VITE_TODOIST_API_TOKEN;
const api = new TodoistApi(apiToken);

export default function AddTaskModal({
  projectId,
  isEditing = false,
  setIsEditing,
  task = null,
  onSave,
}) {
  const { setTasks, projects } = useContext(ProjectsAndTasksContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAddTask = async (values) => {
    const { content, description, due_date, priority, formSelectedProject } =
      values;
    if (isEditing && task) {
      onSave({
        ...task,
        content,
        description,
        due_date: due_date ? due_date.format("YYYY-MM-DD") : undefined,
        priority,
      });
      form.resetFields();
      return;
    }
    try {
      const newTask = await api.addTask({
        content,
        description,
        due_date: due_date ? due_date.format("YYYY-MM-DD") : undefined,
        priority,
        project_id: formSelectedProject ? formSelectedProject : projectId,
      });
      message.success("Task added successfully!");
      setTasks((prev) => [...prev, newTask]);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Failed to add task. Please try again.");
    }
  };

  useEffect(() => {
    if (isEditing && task) {
      form.setFieldsValue({
        content: task.content,
        description: task.description,
        due_date: task.due_date ? task.due_date : null,
        priority: task.priority || 1,
      });
    }
  }, [isEditing, task, form]);

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditing?.(false);
    form.resetFields();
  };

  return (
    <div>
      {!isEditing && (
        <Button
          type="text"
          block={true}
          style={{ display: "flex", justifyContent: "start" }}
          icon={<PlusOutlined />}
          onClick={() => {
            setIsModalVisible(true);
            console.log("Projects", projects);
          }}
          // onClick={() => setIsEditing(true)}
        >
          Add Task
        </Button>
      )}
      <Modal
        title={isEditing ? "Edit Task" : "Add Task"}
        open={isEditing || isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddTask}>
          <Form.Item
            label="Task Content"
            name="content"
            rules={[{ required: true, message: "Please enter task content!" }]}
          >
            <Input placeholder="Enter task content" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Enter task description" rows={3} />
          </Form.Item>
          <Form.Item label="Due Date" name="due_date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Priority" name="priority">
            <Select placeholder="Select priority">
              <Option value={1}>Low</Option>
              <Option value={2}>Medium</Option>
              <Option value={3}>High</Option>
              <Option value={4}>Urgent</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Project" name="formSelectedProject">
            <Select placeholder="Select project">
              {projects.map((project) => (
                <Option key={project.id} value={project.id}>
                  {project.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Save Changes" : "Add Task"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

AddTaskModal.propTypes = {
  projectId: PropTypes.string.isRequired,
  isEditing: PropTypes.bool,
  onSave: PropTypes.func,
  task: PropTypes.object,
  setTasks: PropTypes.func,
  setIsEditing: PropTypes.func.isRequired,
};
