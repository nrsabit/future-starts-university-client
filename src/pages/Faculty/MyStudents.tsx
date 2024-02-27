import { useParams } from "react-router-dom";
import {
  useGetAllFacultyCoursesQuery,
  useUpdateCourseMarksMutation,
} from "../../redux/features/faculty/facultyCourses.api";
import { Button, Modal, Table } from "antd";
import { useState } from "react";
import FsForm from "../../components/form/FsForm";
import FsInput from "../../components/form/FsInput";
import { TResponseWithReduxAndBaseQuery } from "../../types";
import { toast } from "sonner";

const MyStudents = () => {
  const { semesterId, courseId } = useParams();

  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery([
    { name: "semesterRegistration", value: semesterId },
    { name: "course", value: courseId },
  ]);

  const tableData = facultyCoursesData?.data?.map(
    ({
      _id,
      student,
      semesterRegistration,
      offeredCourse,
    }: Record<string, any>) => ({
      key: _id,
      name: `${student?.name?.firstName} ${student?.name?.middleName} ${student?.name?.lastName}`,
      roll: student?.id,
      semesterRegistration: semesterRegistration?._id,
      student: student?._id,
      offeredCourse: offeredCourse?._id,
    })
  );

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Roll",
      key: "roll",
      dataIndex: "roll",
    },
    {
      title: "Action",
      key: "x",
      render: (item: any) => {
        return <UpdateMarksModal studentInfo={item}></UpdateMarksModal>;
      },
    },
  ];

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <h1>{facultyCoursesData?.data[0]?.course?.title}</h1>
      </div>
      <Table pagination={false} columns={columns} dataSource={tableData} />
    </>
  );
};

const UpdateMarksModal = ({ studentInfo }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateMarks] = useUpdateCourseMarksMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (data: any) => {
    const toastId = toast.loading("Updating Marks");

    const marksData = {
      semesterRegistration: studentInfo?.semesterRegistration,
      offeredCourse: studentInfo?.offeredCourse,
      student: studentInfo?.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };

    try {
      const res = (await updateMarks(
        marksData
      )) as TResponseWithReduxAndBaseQuery<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
        console.log(res);
      }
      handleOk();
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
      handleCancel();
    }
  };

  return (
    <>
      <Button onClick={showModal}>Update Marks</Button>
      <Modal
        title="Update Marks"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <FsForm onSubmit={handleSubmit}>
          <FsInput
            name="classTest1"
            label="Class Test 1"
            type="number"
          ></FsInput>
          <FsInput name="midTerm" label="Mid Term" type="number"></FsInput>
          <FsInput
            name="classTest2"
            label="Class Test 2"
            type="number"
          ></FsInput>
          <FsInput name="finalTerm" label="Final Term" type="number"></FsInput>
          <Button htmlType="submit">Submit</Button>
        </FsForm>
      </Modal>
    </>
  );
};

export default MyStudents;
