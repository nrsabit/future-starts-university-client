import {
  Button,
  Dropdown,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import {
  TQueryParam,
  TResponseWithRedux,
  TResponseWithReduxAndBaseQuery,
  TSemesterRegistration,
} from "../../../types";
import { useState } from "react";
import {
  useGetAllSemesterRegistrationsQuery,
  useUpdateSemesterRegistrationMutation,
} from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { toast } from "sonner";

type TTableData = {
  name: string;
  status: string;
  startDate: string;
  endDate: string;
};

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const SemesterRegistrations = () => {
  const [updateSemesterStatus] = useUpdateSemesterRegistrationMutation();

  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const [semesterId, setSemesterId] = useState("");

  const { data: semesterRegistrationData, isFetching } =
    useGetAllSemesterRegistrationsQuery(params);

  const tableData = (
    semesterRegistrationData as TResponseWithRedux<TSemesterRegistration[]>
  )?.data?.map(({ _id, academicSemester, status, startDate, endDate }) => ({
    key: _id,
    name: `${academicSemester.name} ${academicSemester.year}`,
    startDate: moment(new Date(startDate)).format("MMMM"),
    endDate: moment(new Date(endDate)).format("MMMM"),
    status,
  }));

  const handleStatusUpdate = async (data: any) => {
    const toastId = toast.loading("Updating Status");
    const updateData = {
      id: semesterId,
      data: { status: data?.key },
    };

    try {
      const res = (await updateSemesterStatus(
        updateData
      )) as TResponseWithReduxAndBaseQuery<any>;
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

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters?.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters?.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };

  return (
    <Table
      columns={columns}
      loading={isFetching}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default SemesterRegistrations;
