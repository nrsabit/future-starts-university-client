import { Button, Row } from "antd";
import FsForm from "../components/form/FsForm";
import FsInput from "../components/form/FsInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../redux/features/auth/authApi";
import { TResponseWithRedux } from "../types";
import { logOut } from "../redux/features/auth/authSlice";

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [changePassword] = useChangePasswordMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Password is Updating");
    try {
      const res = (await changePassword(data)) as TResponseWithRedux<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
        dispatch(logOut());
        navigate("/login");
      }
      console.log(res);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <FsForm onSubmit={onSubmit}>
        <div>
          <FsInput
            type="text"
            name="oldPassword"
            label="Old Password"
          ></FsInput>
        </div>
        <div>
          <FsInput
            type="text"
            name="newPassword"
            label="New Password"
          ></FsInput>
        </div>
        <Button htmlType="submit">Submit</Button>
      </FsForm>
    </Row>
  );
};

export default ChangePassword;
