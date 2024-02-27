import { Button, Col, Row } from "antd";
import {
  useEnrollCourseMutation,
  useGetMyOfferedCoursesQuery,
} from "../../../redux/features/student/studentCourses.api";
import { toast } from "sonner";
import { TResponseWithReduxAndBaseQuery } from "../../../types";

type TOfferedCourse = {
  [index: string]: any;
};

type TOfferedCourseTable = {
  courseTitle: string;
  sections: TOfferedCourseSections[];
};

type TOfferedCourseSections = {
  section: number;
  _id: string;
  days: string[];
  startTime: string;
  endTime: string;
};

const OfferedCourses = () => {
  const { data: offredCourses } = useGetMyOfferedCoursesQuery(undefined);
  const [enroll] = useEnrollCourseMutation();

  const singleObject = offredCourses?.data?.reduce(
    (acc: TOfferedCourse, item: TOfferedCourse) => {
      const key = item?.course?.title;
      acc[key] = acc[key] || { courseTitle: key, sections: [] };
      acc[key].sections.push({
        section: item.section,
        _id: item._id,
        days: item.days,
        startTime: item.startTime,
        endTime: item.endTime,
      });

      return acc;
    },
    {}
  );

  const modifiedData: TOfferedCourseTable[] = Object.values(
    singleObject ? singleObject : {}
  );

  const handleSubmit = async (data: string) => {
    const toastId = toast.loading("Enrolling to the course");
    const enrollDadta = {
      offeredCourse: data,
    };

    try {
      const res = (await enroll(
        enrollDadta
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

  if (!modifiedData.length) {
    return <p>No Courses Available</p>;
  }

  return (
    <Row gutter={[0, 20]}>
      {modifiedData?.map((item) => {
        return (
          <Col
            span={24}
            style={{ border: "solid #d4d4d4 2px", borderRadius: "5px" }}
          >
            <div style={{ padding: "10px" }}>
              <h2>{item?.courseTitle}</h2>
            </div>
            <div>
              {item?.sections?.map((section) => {
                return (
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{
                      borderTop: "solid #d4d4d4 2px",
                      padding: "10px",
                    }}
                  >
                    <Col span={5}>Section: {section.section} </Col>
                    <Col span={5}>
                      days:{" "}
                      {section?.days?.map((day) => (
                        <span> {day} </span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section?.startTime} </Col>
                    <Col span={5}>End Time: {section?.endTime} </Col>
                    <Button onClick={() => handleSubmit(section._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourses;
