import OfferedCourses from "../pages/Admin/CourseManagement/OfferedCourses";
import EnrolledCourses from "../pages/Student/EnrolledCourses";
import StudentDashboard from "../pages/Student/StudentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Offered Course",
    path: "offered-courses",
    element: <OfferedCourses />,
  },
  {
    name: "Enrolled Course",
    path: "enrolled-courses",
    element: <EnrolledCourses />,
  },
];
