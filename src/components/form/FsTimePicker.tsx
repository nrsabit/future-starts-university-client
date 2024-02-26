import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

type FSDatePickerType = {
  name: string;
  label?: string;
};

const FsTimePicker = ({ name, label }: FSDatePickerType) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <TimePicker
              {...field}
              id={name}
              style={{ width: "100%" }}
              format={"HH:mm"}
            ></TimePicker>
          </Form.Item>
        )}
      />
    </div>
  );
};

export default FsTimePicker;
