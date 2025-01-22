// EditOrDeleteProjectModal.jsx
import ProjectContext from "../contexts/ProjectsContext.jsx";
import { Modal, Form, Input, Checkbox, Button } from "antd";
import { useContext } from "react";

const EditOrDeleteProjectModal = () => {
  const {
    actionTypeOnProject,
    handleCancelForEditOrDeleteProject,
    editOrDeleteProjectModal,
    handleEditProjectFormSubmit,
    handleDeleteProject,
  } = useContext(ProjectContext);

  return (
    <Modal
      title={actionTypeOnProject === "edit" ? "Edit Project" : "Delete Project"}
      // visible={isVisible}
      open={editOrDeleteProjectModal.isVisible}
      onCancel={handleCancelForEditOrDeleteProject}
      footer={null}
    >
      {actionTypeOnProject === "edit" ? (
        <Form
          form={editOrDeleteProjectModal.form}
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
