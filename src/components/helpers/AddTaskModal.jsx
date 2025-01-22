import { useState, useEffect, useContext } from "react";
import { Button, Modal, Form, Input, DatePicker, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import ProjectContext from "../contexts/ProjectsContext.jsx";
import { useDispatch } from "react-redux";

const { Option } = Select;
import { addTask } from "../../store/tasksSlice";
import { addTaskViaApi } from "../../service/apiService";

export default function AddTaskModal({
  projectId,
  isEditing = false,
  setIsEditing,
  task = null,
  onSave,
}) {
  const { projects } = useContext(ProjectContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleAddTask = async (values) => {
    const { content, description, dueDate, priority, formSelectedProject } =
      values;
    console.log("adding.", values);
    if (isEditing && task) {
      console.log("editing. values", values, "to task", task);
      onSave({
        ...task,
        content,
        description,
        dueDate: dueDate ? dueDate.format("YYYY-MM-DD") : undefined,
        priority,
        projectId: task.projectId || projectId,
      });
      form.resetFields();
      return;
    }
    try {
      console.log("adding task in add task modal");
      const newTask = await addTaskViaApi({
        content,
        description,
        dueDate: dueDate ? dueDate.format("YYYY-MM-DD") : undefined,
        priority,
        projectId: formSelectedProject ? formSelectedProject : projectId,
      });
      console.log("attempted addition of task. new task on attempt :", newTask);
      message.success("Task added successfully!");

      dispatch(addTask(newTask.addition));
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
        dueDate: task.dueDate ? task.dueDate : null,
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
  projectId: PropTypes.number,
  isEditing: PropTypes.bool,
  setIsEditing: PropTypes.func,
  onSave: PropTypes.func,
  task: PropTypes.object,
};
