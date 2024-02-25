import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type FsSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
};

const FsSelect = ({ label, name, options, disabled }: FsSelectProps) => {
  return (
    <Controller
      name={name}
      disabled={disabled}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select {...field} style={{ width: "100%" }} options={options} />
          {!!error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default FsSelect;
