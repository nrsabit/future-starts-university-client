import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import FsForm from "../components/form/FsForm";
import FsInput from "../components/form/FsInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { error }] = useLoginMutation();
  if (error) {
    console.log(error);
  }

  const defaultValues = {
    id: "A-0001",
    password: "hello hablu",
  };

  const onSubmit = async (data: FieldValues) => {
    console.log("Inside the form : ", data);
    try {
      const toastId = toast.loading("logging in");
      const res = await login(data).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Logged In", { duration: 2000, id: toastId });
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error("Something went wrong", { duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <FsForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <div>
          <FsInput type="text" name="id" label="ID:"></FsInput>
        </div>
        <div>
          <FsInput type="text" name="password" label="Password:"></FsInput>
        </div>
        <Button htmlType="submit">Submit</Button>
      </FsForm>
    </Row>
  );
};

export default Login;
