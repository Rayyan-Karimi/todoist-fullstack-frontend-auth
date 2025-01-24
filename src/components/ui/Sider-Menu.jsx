import PropTypes from "prop-types";
import { Flex, Menu } from "antd";
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

  console.log("Menu in SIdEr MEnu:", menuData);

  return (
    <>
      <Flex align="end">
        <Menu
          mode="inline"
          defaultSelectedKeys={["my-projects"]}
          defaultOpenKeys={["my-projects"]}
          onClick={({ key }) => {
            const selectedItem = menuData.find((item) => item.key === key);
            selectedItem?.onClick?.(); // Call the action if available
            if (!selectedItem?.onClick) navigate(`/${key}`);
          }}
          style={getSiderMenuStyle()}
          items={menuData} // Use the new `items` prop
          className="bg-white"
        />
      </Flex>
    </>
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
  maxHeight: "80vh" /* Set your desired max height */,
  overflowY: "auto",
});

export default SiderMenu;
