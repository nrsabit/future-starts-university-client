import AdminDashboard from "../pages/Admin/AdminDashboard";
import CreateAdmin from "../pages/Admin/UserManagement/CreateAdmin";
import CreateFaculty from "../pages/Admin/UserManagement/CreateFaculty";
import CreateStudent from "../pages/Admin/UserManagement/CreateStudent";
import { NavLink } from "react-router-dom";
import { TSidebarItems } from "../types";
import AcademicSemesters from "../pages/Admin/AcademicManagement/AcademicSemesters";
import CreateAcademicSemester from "../pages/Admin/AcademicManagement/CreateAcademicSemester";
import CreateAcademicFaculty from "../pages/Admin/AcademicManagement/CreateAcademicFaculty";
import AcademicFaculties from "../pages/Admin/AcademicManagement/AcademicFaculties";
import CreateAcademicDepartment from "../pages/Admin/AcademicManagement/CreateAcademicDepartment";
import AcademicDepartments from "../pages/Admin/AcademicManagement/AcademicDepartments";
import AllStudents from "../pages/Admin/UserManagement/AllStudents";
import StudentDetails from "../pages/Admin/UserManagement/StudentDetails";
import SemesterRegistrations from "../pages/Admin/CourseManagement/SemesterRegistrations";
import CreateSemesterRegistration from "../pages/Admin/CourseManagement/CreateSemesterRegistration";
import AllCourses from "../pages/Admin/CourseManagement/AllCourses";
import CreateOfferedCourse from "../pages/Admin/CourseManagement/CreateOfferedCourse";
import OfferedCourses from "../pages/Admin/CourseManagement/OfferedCourses";
import CreateCourse from "../pages/Admin/CourseManagement/CreateCourse";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester></CreateAcademicSemester>,
      },
      {
        name: "Academic Semesters",
        path: "academic-semesters",
        element: <AcademicSemesters></AcademicSemesters>,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty></CreateAcademicFaculty>,
      },
      {
        name: "Academic Faculties",
        path: "academic-faculties",
        element: <AcademicFaculties></AcademicFaculties>,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment></CreateAcademicDepartment>,
      },
      {
        name: "Academic Departments",
        path: "academic-departments",
        element: <AcademicDepartments></AcademicDepartments>,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        path: "student-details/:studentId",
        element: <StudentDetails />,
      },
      {
        name: "All Students",
        path: "all-students",
        element: <AllStudents />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Semester Registration",
        path: "semester-registration",
        element: <CreateSemesterRegistration />,
      },
      {
        name: "Registered Semesters",
        path: "registered-semesters",
        element: <SemesterRegistrations />,
      },
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "All Courses",
        path: "courses",
        element: <AllCourses />,
      },
      {
        name: "Offer Course",
        path: "offer-course",
        element: <CreateOfferedCourse />,
      },
      {
        name: "Offered Courses",
        path: "offered-courses",
        element: <OfferedCourses />,
      },
    ],
  },
];

export const adminSidebarItems = adminPaths.reduce(
  (acc: TSidebarItems[], item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }
    return acc;
  },
  []
);
