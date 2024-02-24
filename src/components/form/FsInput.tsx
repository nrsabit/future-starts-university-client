import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type FSInputType = {
  type: string;
  name: string;
  label?: string;
};

const FsInput = ({ type, name, label }: FSInputType) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default FsInput;
