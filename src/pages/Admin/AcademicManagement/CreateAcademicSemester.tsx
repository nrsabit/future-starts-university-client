import { Button, Col, Flex } from "antd";
import FsForm from "../../../components/form/FsForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FsSelect from "../../../components/form/FsSelect";
import { semesterOptions } from "../../../constants/semesters";
import { monthOptions } from "../../../constants/globals";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/AcademicManagement.schema";
import { useCreateAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponseWithRedux } from "../../../types/global";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4, 5, 6].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useCreateAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating");
    const semesterData = {
      name: semesterOptions[Number(data?.name) - 1]?.label,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      console.log(semesterData);
      const res = (await addAcademicSemester(
        semesterData
      )) as TResponseWithRedux<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
      }
      console.log(res);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <FsForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <FsSelect
            label="Name"
            name="name"
            options={semesterOptions}
          ></FsSelect>
          <FsSelect label="Year" name="year" options={yearOptions}></FsSelect>
          <FsSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          ></FsSelect>
          <FsSelect
            label="End Month"
            name="endMonth"
            options={monthOptions}
          ></FsSelect>
          <Button htmlType="submit">Submit</Button>
        </FsForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
