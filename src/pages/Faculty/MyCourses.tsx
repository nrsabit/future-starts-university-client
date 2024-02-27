import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourses.api";
import { Button, Col, Flex } from "antd";
import FsForm from "../../components/form/FsForm";
import FsSelect from "../../components/form/FsSelect";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const navigate = useNavigate();
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);

  const semesterOptions = facultyCoursesData?.data?.map((item: any) => ({
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    value: item.semesterRegistration._id,
  }));

  const courseOptions = facultyCoursesData?.data?.map((item: any) => ({
    label: item.course.title,
    value: item.course._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    navigate(
      `/faculty/my-courses/${data?.semesterRegistration}/${data?.course}`
    );
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <FsForm onSubmit={onSubmit}>
          <FsSelect
            options={semesterOptions}
            name="semesterRegistration"
            label="Semester"
          />
          <FsSelect options={courseOptions} name="course" label="Course" />
          <Button htmlType="submit">Submit</Button>
        </FsForm>
      </Col>
    </Flex>
  );
};

export default MyCourses;
