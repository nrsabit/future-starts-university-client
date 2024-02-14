import { Layout, Menu } from "antd";
import { sidebarItemsGeneratior } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const { Sider } = Layout;

const SidebarLayout = () => {
  const roles = {
    ADMIN: "admin",
    FACULTY: "faculty",
    STUDENT: "student",
  };

  const user = useAppSelector(selectCurrentUser);
  const userRole = user?.role;

  let sidebarItems;

  switch (userRole) {
    case roles.ADMIN:
      sidebarItems = sidebarItemsGeneratior(adminPaths, userRole);
      break;
    case roles.FACULTY:
      sidebarItems = sidebarItemsGeneratior(facultyPaths, userRole);
      break;
    case roles.STUDENT:
      sidebarItems = sidebarItemsGeneratior(studentPaths, userRole);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        className="demo-logo-vertical"
        style={{
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ color: "white", fontWeight: "bold" }}>FS_UNI</p>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default SidebarLayout;