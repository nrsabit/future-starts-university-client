import { Button, Col, Flex } from "antd";
import FsForm from "../../../components/form/FsForm";
import FsInput from "../../../components/form/FsInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import FsSelectWithWatch from "../../../components/form/FsSelectWithWatch";
import { useState } from "react";

const CreateOfferedCourse = () => {
  const [id, setId] = useState("");
  console.log("from parent", id);

  const { data: academicFaculties } = useGetAcademicFacultiesQuery(undefined);

  const academicFacultiesOptions = academicFaculties?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <FsForm onSubmit={onSubmit}>
          <FsSelectWithWatch
            onValueChange={setId}
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultiesOptions}
          ></FsSelectWithWatch>
          <FsInput type="text" name="test" label="Test" disabled={!id}></FsInput>
          <Button htmlType="submit">Submit</Button>
        </FsForm>
      </Col>
    </Flex>
  );
};

export default CreateOfferedCourse;
