import { Button, Col, Flex } from "antd";
import FsForm from "../../../components/form/FsForm";
import FsInput from "../../../components/form/FsInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import FsSelectWithWatch from "../../../components/form/FsSelectWithWatch";
import { useState } from "react";
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllSemesterRegistrationsQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import {
  TCourse,
  TResponseWithRedux,
  TSemesterRegistration,
} from "../../../types";
import FsSelect from "../../../components/form/FsSelect";
import { weekDaysOptions } from "../../../constants/globals";
import FsTimePicker from "../../../components/form/FsTimePicker";
import moment from "moment";
import { toast } from "sonner";

const CreateOfferedCourse = () => {
  const [courseId, setCourseId] = useState("");

  const [addOfferedCourse] = useCreateOfferedCourseMutation();

  const { data: semesterRegistrationData } =
    useGetAllSemesterRegistrationsQuery([
      { name: "sort", value: "year" },
      { name: "status", value: "UPCOMING" },
    ]);

  const { data: academicFaculties } = useGetAcademicFacultiesQuery(undefined);

  const { data: academicDepartmentData } =
    useGetAcademicDepartmentsQuery(undefined);

  const { data: coursesData } = useGetAllCoursesQuery([
    { name: "limit", value: 0 },
  ]);

  const { data: facultiesData, isFetching: facultiesFetching } =
    useGetCourseFacultiesQuery(courseId);

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item: TSemesterRegistration) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  const academicFacultiesOptions = academicFaculties?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  const courseOptions = coursesData?.data?.map((item: TCourse) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.data?.faculties?.map((item: any) => ({
    value: item._id,
    label: `${item.name.firstName} ${item.name.middleName} ${item.name.lastName}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Offering the course");
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };

    try {
      const res = (await addOfferedCourse(
        offeredCourseData
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
            name="semesterRegistration"
            label="Semester Registrations"
            options={semesterRegistrationOptions}
          />
          <FsSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultiesOptions}
          />
          <FsSelect
            name="academicDepartment"
            label="Academic Department"
            options={academicDepartmentOptions}
          />
          <FsSelectWithWatch
            onValueChange={setCourseId}
            options={courseOptions}
            name="course"
            label="Course"
          />
          <FsSelect
            disabled={!courseId || facultiesFetching}
            name="faculty"
            label="Faculty"
            options={facultiesOptions}
          />
          <FsInput type="text" name="section" label="Section" />
          <FsInput type="text" name="maxCapacity" label="Max Capacity" />
          <FsSelect
            mode="multiple"
            options={weekDaysOptions}
            name="days"
            label="Days"
          />
          <FsTimePicker name="startTime" label="Start Time" />
          <FsTimePicker name="endTime" label="End Time" />

          <Button htmlType="submit">Submit</Button>
        </FsForm>
      </Col>
    </Flex>
  );
};

export default CreateOfferedCourse;
