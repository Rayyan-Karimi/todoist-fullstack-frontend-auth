import PropTypes from "prop-types";
import { Menu } from "antd";
import AddProjectIcon from "../../assets/AddProjectIcon.svg";

const SiderMenu = ({ menuItems, navigate, showAddProjectModal }) => {
  // Add a new item for "Add Project" to the menu
  const menuData = [
    {
      key: "add-project",
      label: "Add Project",
      icon: (
        <img
          src={AddProjectIcon}
          alt="Add Project Icon"
          style={{ width: 16, height: 16 }}
        />
      ),
      onClick: showAddProjectModal, // Handle "Add Project" action
    },
    ...menuItems, // Transform existing items to new structure
  ];

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["my-favorites"]}
      defaultOpenKeys={["my-favorites"]}
      onClick={({ key }) => {
        const selectedItem = menuData.find((item) => item.key === key);
        selectedItem?.onClick?.(); // Call the action if available
        if (!selectedItem?.onClick) navigate(key);
      }}
      style={getSiderMenuStyle()}
      items={menuData} // Use the new `items` prop
    />
  );
};

SiderMenu.propTypes = {
  menuItems: PropTypes.array.isRequired,
  navigate: PropTypes.func.isRequired,
  showAddProjectModal: PropTypes.func.isRequired,
};

const getSiderMenuStyle = () => ({
  marginTop: "3vh",
  padding: 0,
  background: "inherit",
  border: "none",
});

export default SiderMenu;
