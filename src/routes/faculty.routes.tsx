import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
import MyCourses from "../pages/Faculty/MyCourses";
import MyStudents from "../pages/Faculty/MyStudents";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "My Courses",
    path: "my-courses",
    element: <MyCourses />,
  },
  {
    path: "my-courses/:semesterId/:courseId",
    element: <MyStudents />,
  },
];
