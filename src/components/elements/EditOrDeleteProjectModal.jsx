// EditOrDeleteProjectModal.jsx
import { Modal, Form, Input, Checkbox, Button } from "antd";
import { ProjectsAndTasksContext } from "../../ProjectsAndTasksProvider";
import { useContext } from "react";

const EditOrDeleteProjectModal = () => {
  const {
    actionTypeOnProject,
    handleCancelForEditOrDeleteProject,
    isEditOrDeleteProjectModalVisible,
    handleEditProjectFormSubmit,
    handleDeleteProject,
    editOrDeleteProjectForm,
  } = useContext(ProjectsAndTasksContext);

  return (
    <Modal
      title={actionTypeOnProject === "edit" ? "Edit Project" : "Delete Project"}
      // visible={isVisible}
      open={isEditOrDeleteProjectModalVisible}
      onCancel={handleCancelForEditOrDeleteProject}
      footer={null}
    >
      {actionTypeOnProject === "edit" ? (
        <Form
          form={editOrDeleteProjectForm}
          layout="vertical"
          onFinish={handleEditProjectFormSubmit}
        >
          <Form.Item
            label="Project Title"
            name="name"
            rules={[
              { required: true, message: "Please input your project name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="isFavorite" valuePropName="checked">
            <Checkbox>Mark as Favorite</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Save Changes
            </Button>
            <Button onClick={handleCancelForEditOrDeleteProject}>Cancel</Button>
          </Form.Item>
        </Form>
      ) : (
        <div>
          <p>Are you sure you want to delete this project?</p>
          <Button
            type="primary"
            danger
            onClick={handleDeleteProject}
            style={{ marginRight: 8 }}
          >
            Delete
          </Button>
          <Button onClick={handleCancelForEditOrDeleteProject}>Cancel</Button>
        </div>
      )}
    </Modal>
  );
};

export default EditOrDeleteProjectModal;
