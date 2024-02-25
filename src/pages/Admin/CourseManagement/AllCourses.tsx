import { Button, Modal, Table } from "antd";
import {
  useAsignFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import {
  TCourse,
  TResponseWithRedux,
  TResponseWithReduxAndBaseQuery,
} from "../../../types";
import { useState } from "react";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import FsSelect from "../../../components/form/FsSelect";
import FsForm from "../../../components/form/FsForm";
import { toast } from "sonner";

const AllCourses = () => {
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = (courses as TResponseWithRedux<TCourse[]>)?.data?.map(
    ({ _id, title, prefix, code }) => ({
      key: _id,
      title,
      code: `${prefix}${code}`,
    })
  );

  const columns = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item: TCourse) => {
        return <AsignFacultyModal courseInfo={item}></AsignFacultyModal>;
      },
    },
  ];

  // const onChange: TableProps<TTableData>['onChange'] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === 'filter') {
  //     const queryParams: TQueryParam[] = [];
  //     setParams(queryParams);
  //   }
  // };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
    />
  );
};

const AsignFacultyModal = ({ courseInfo }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: faculties } = useGetAllFacultiesQuery(undefined);
  const [asignFaculties] = useAsignFacultiesMutation();

  const facultiesOptions = faculties?.data?.map((item: any) => ({
    value: item?._id,
    label: `${item?.name?.firstName} ${item?.name?.middleName} ${item?.name?.lastName}`,
  }));

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
    const toastId = toast.loading("Adding Faculties");
    const facultyData = {
      courseId: courseInfo.key,
      data,
    };
    try {
      const res = (await asignFaculties(
        facultyData
      )) as TResponseWithReduxAndBaseQuery<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
      }
      handleOk();
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
      handleCancel();
    }
  };

  return (
    <>
      <Button onClick={showModal}>Asign Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <FsForm onSubmit={handleSubmit}>
          <FsSelect
            mode="multiple"
            label="Faculties"
            name="faculties"
            options={facultiesOptions}
          ></FsSelect>
          <Button htmlType="submit">Submit</Button>
        </FsForm>
      </Modal>
    </>
  );
};

export default AllCourses;
