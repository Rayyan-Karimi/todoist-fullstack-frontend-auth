// AddProjectModal.jsx
import { Modal, Form, Input, Checkbox, Button } from "antd";
import { useContext } from "react";
import { ProjectsAndTasksContext } from "../../ProjectsAndTasksProvider";

const AddProjectModal = () => {
  const {
    addProjectForm,
    isAddProjectModalVisible,
    handleModalCancelForAddProject,
    handleFormSubmitForAddProject,
  } = useContext(ProjectsAndTasksContext);

  return (
    <Modal
      title="Add New Project"
      open={isAddProjectModalVisible}
      onCancel={handleModalCancelForAddProject}
      footer={null} // Use Form buttons instead
    >
      <Form
        name={"addProjectForm"}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={handleFormSubmitForAddProject}
        onFinishFailed={handleModalCancelForAddProject}
        autoComplete="off"
      >
        <Form.Item
          label="Project Title"
          name="projectTitle"
          rules={[
            { required: true, message: "Please input your project title!" },
          ]}
        >
          <Input placeholder="Enter project title" />
        </Form.Item>

        <Form.Item
          name="isFavorite"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Mark as Favorite</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            Add Project
          </Button>
          <Button onClick={handleModalCancelForAddProject}>Cancel</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProjectModal;
