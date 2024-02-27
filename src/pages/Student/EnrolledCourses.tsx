import { Col, Row } from "antd";
import { useGetMyEnrolledCoursesQuery } from "../../redux/features/student/studentCourses.api";

const EnrolledCourses = () => {
  const { data: enrolledCourses } = useGetMyEnrolledCoursesQuery(undefined);

  if (!enrolledCourses?.data?.length) {
    return <p>You don't have any enrolled courses yet.</p>;
  }

  return (
    <Row gutter={[0, 20]}>
      {enrolledCourses?.data?.map((item: any) => {
        return (
          <Col
            span={24}
            style={{ border: "solid #d4d4d4 2px", borderRadius: "5px" }}
          >
            <div>
              <Row
                justify="space-between"
                align="middle"
                style={{
                  padding: "10px",
                }}
              >
                <Col span={5}>
                  <b>Course: {item?.course?.title} </b>{" "}
                </Col>
                <Col span={5}>Section: {item?.offeredCourse?.section} </Col>
                <Col span={5}>
                  days:{" "}
                  {item?.offeredCourse?.days?.map((day: string[]) => (
                    <span> {day} </span>
                  ))}
                </Col>
                <Col span={5}>Start Time: {item?.offeredCourse?.endTime} </Col>
                <Col span={4}>End Time: {item?.offeredCourse?.endTime} </Col>
              </Row>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default EnrolledCourses;
