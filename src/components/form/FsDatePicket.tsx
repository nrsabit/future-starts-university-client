import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type FSDatePickerType = {
  name: string;
  label?: string;
};

const FsDatePicker = ({ name, label }: FSDatePickerType) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker
              {...field}
              id={name}
              style={{ width: "100%" }}
            ></DatePicker>
          </Form.Item>
        )}
      />
    </div>
  );
};

export default FsDatePicker;
