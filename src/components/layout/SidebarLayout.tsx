import { Layout, Menu } from "antd";
import { sidebarItemsGeneratior } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import {
  TUserPayload,
  selectCurrentToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";

const { Sider } = Layout;

const SidebarLayout = () => {
  const roles = {
    ADMIN: "admin",
    FACULTY: "faculty",
    STUDENT: "student",
  };

  const token = useAppSelector(selectCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token) as TUserPayload;
  }

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
      style={{ height: "100vh", position: "sticky", top: 0, left: 0 }}
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
        items={sidebarItems as ItemType<MenuItemType>[]}
      />
    </Sider>
  );
};

export default SidebarLayout;
