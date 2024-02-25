import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type FSInputType = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
};

const FsInput = ({ type, name, label, disabled }: FSInputType) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} disabled={disabled} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default FsInput;
