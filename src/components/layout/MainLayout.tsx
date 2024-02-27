import { Button, Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarLayout from "./SidebarLayout";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
    toast.success("Logged Out");
  };
  return (
    <Layout style={{ height: "100%" }}>
      <SidebarLayout></SidebarLayout>
      <Layout>
        <Header style={{ padding: 0 }}>
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Future Stars University ©{new Date().getFullYear()} Created by NRS
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
