import { Button, Col, Flex } from "antd";
import FsForm from "../../../components/form/FsForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FsSelect from "../../../components/form/FsSelect";
import { toast } from "sonner";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester, TResponseWithRedux } from "../../../types";
import { semesterStatusOptions } from "../../../constants/semesters";
import FsDatePicker from "../../../components/form/FsDatePicket";
import FsInput from "../../../components/form/FsInput";
import { useCreateSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";

const CreateSemesterRegistration = () => {
  const [createSemesterRegistration] = useCreateSemesterRegistrationMutation();

  const { data: academicSemesters } = useGetAllAcademicSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const semesterOptions = academicSemesters?.data?.map(
    (item: TAcademicSemester) => ({
      value: item._id,
      label: `${item.name} ${item.year}`,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating");
    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    try {
      const res = (await createSemesterRegistration(
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
        <FsForm onSubmit={onSubmit}>
          <FsSelect
            label="Academic Semester"
            name="academicSemester"
            options={semesterOptions}
          ></FsSelect>
          <FsSelect
            label="Status"
            name="status"
            options={semesterStatusOptions}
          ></FsSelect>
          <FsDatePicker name="startDate" label="Start Date"></FsDatePicker>
          <FsDatePicker name="endDate" label="End Date"></FsDatePicker>
          <FsInput type="text" name="minCredit" label="Min. Credit"></FsInput>
          <FsInput type="text" name="maxCredit" label="Max. Credit"></FsInput>
          <Button htmlType="submit">Submit</Button>
        </FsForm>
      </Col>
    </Flex>
  );
};

export default CreateSemesterRegistration;
