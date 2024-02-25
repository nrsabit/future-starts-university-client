import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type FsSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
};

const FsSelectWithWatch = ({
  label,
  name,
  options,
  disabled,
  mode,
  onValueChange,
}: FsSelectProps) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue]);

  return (
    <Controller
      name={name}
      disabled={disabled}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            {...field}
            style={{ width: "100%" }}
            options={options}
          />
          {!!error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default FsSelectWithWatch;
