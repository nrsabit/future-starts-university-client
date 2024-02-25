import { Button, Col, Flex } from "antd";
import FsForm from "../../../components/form/FsForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FsSelect from "../../../components/form/FsSelect";
import FsInput from "../../../components/form/FsInput";
import {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TCourse, TResponseWithRedux } from "../../../types";
import { toast } from "sonner";

const CreateCourse = () => {
  const { data: courseData } = useGetAllCoursesQuery([
    { name: "limit", value: 20 },
  ]);
  const [createCourse] = useCreateCourseMutation();

  const preRequisiteCoursesOptions = courseData?.data?.map((item: TCourse) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Course is being created..!");

    const courseDetails = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data?.preRequisiteCourses
        ? data?.preRequisiteCourses?.map((item: string) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    console.log(courseDetails);

    try {
      const res = (await createCourse(
        courseDetails
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
          <FsInput type="text" name="title" label="Title"></FsInput>
          <FsInput type="text" name="prefix" label="Prefix"></FsInput>
          <FsInput type="text" name="code" label="Code"></FsInput>
          <FsInput type="text" name="credits" label="Credits"></FsInput>
          <FsSelect
            options={preRequisiteCoursesOptions}
            mode="multiple"
            name="preRequisiteCourses"
            label="Pre Requisite Courses"
          ></FsSelect>
          <Button htmlType="submit">Submit</Button>
        </FsForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
