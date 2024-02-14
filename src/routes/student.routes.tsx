import EnrolledCourses from "../pages/Student/EnrolledCourses";
import StudentDashboard from "../pages/Student/StudentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Enrolled Course",
    path: "enrolled-course",
    element: <EnrolledCourses />,
  },
];
